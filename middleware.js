import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const ROLE_PERMISSIONS = {
  admin: ['comparaison', 'marche', 'businessplan', 'pitch', 'fournisseurs', 'admin'],
  'super-user': ['comparaison', 'marche', 'businessplan', 'pitch', 'fournisseurs'],
  user: ['pitch'],
}

export async function middleware(req) {
  const { pathname } = req.nextUrl
  const res = NextResponse.next()

  // Routes publiques — laisser passer
  if (pathname === '/login' || pathname.startsWith('/_next') || pathname.startsWith('/api/auth')) {
    return res
  }

  // Récupérer le token de session depuis les cookies
  const accessToken = req.cookies.get('sb-access-token')?.value
  const refreshToken = req.cookies.get('sb-refresh-token')?.value

  // Pas de session → rediriger vers login
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )

    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    if (error || !user) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Récupérer le profil et le rôle
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, actif')
      .eq('id', user.id)
      .single()

    if (!profile || !profile.actif) {
      return NextResponse.redirect(new URL('/login?reason=suspended', req.url))
    }

    const role = profile.role

    // Vérifier accès route admin
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Vérifier accès à un document spécifique
    const docMatch = pathname.match(/^\/documents\/([a-z]+)/)
    if (docMatch) {
      const slug = docMatch[1]
      const allowed = ROLE_PERMISSIONS[role]?.includes(slug)
      if (!allowed) {
        return NextResponse.redirect(new URL('/dashboard?denied=1', req.url))
      }
    }

    // Injecter le rôle dans le header pour utilisation côté serveur
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-user-role', role)
    requestHeaders.set('x-user-id', user.id)

    return NextResponse.next({ request: { headers: requestHeaders } })
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/documents/:path*', '/admin/:path*'],
}
