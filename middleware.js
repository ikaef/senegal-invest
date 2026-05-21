import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const ROLE_PERMISSIONS = {
  admin: ['comparaison', 'marche', 'businessplan', 'pitch', 'fournisseurs', 'admin'],
  'super-user': ['comparaison', 'marche', 'businessplan', 'pitch', 'fournisseurs'],
  user: ['pitch'],
}

export async function middleware(req) {
  const { pathname } = req.nextUrl
  let res = NextResponse.next({ request: req })

  if (pathname === '/login' || pathname.startsWith('/_next') || pathname.startsWith('/api/auth')) {
    return res
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() { return req.cookies.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
            res = NextResponse.next({ request: req })
            cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options))
          },
        },
      }
    )

    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return NextResponse.redirect(new URL('/login', req.url))

    // Utiliser le service role pour lire le profil (contourne le RLS)
    const adminSupabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        cookies: {
          getAll() { return req.cookies.getAll() },
          setAll() {},
        },
      }
    )

    const { data: profile } = await adminSupabase
      .from('profiles')
      .select('role, actif')
      .eq('id', user.id)
      .single()

    if (!profile || !profile.actif) {
      return NextResponse.redirect(new URL('/login?reason=suspended', req.url))
    }

    if (pathname.startsWith('/admin') && profile.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    const docMatch = pathname.match(/^\/documents\/([a-z]+)/)
    if (docMatch && !ROLE_PERMISSIONS[profile.role]?.includes(docMatch[1])) {
      return NextResponse.redirect(new URL('/dashboard?denied=1', req.url))
    }

    return res
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/documents/:path*', '/admin/:path*'],
}
