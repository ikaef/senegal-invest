import { createAdminClient } from '../../../../lib/supabase'
import { NextResponse } from 'next/server'

// Vérifie que l'appelant est bien admin (via son token de session)
async function isAdmin(req) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader) return false
  const token = authHeader.replace('Bearer ', '')
  const { supabase: publicClient } = await import('../../../../lib/supabase')
  const { data: { user } } = await publicClient.auth.getUser(token)
  if (!user) return false
  const admin = createAdminClient()
  const { data } = await admin.from('profiles').select('role').eq('id', user.id).single()
  return data?.role === 'admin'
}

// GET /api/admin/users — liste tous les utilisateurs
export async function GET(req) {
  const admin = createAdminClient()
  const { data: users, error } = await admin
    .from('profiles')
    .select('id, nom, email, role, actif, created_at')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ users })
}

// POST /api/admin/users — crée un ou plusieurs utilisateurs
export async function POST(req) {
  const { users } = await req.json()
  if (!users?.length) return NextResponse.json({ error: 'Aucun utilisateur fourni' }, { status: 400 })

  const admin = createAdminClient()
  let created = 0
  const errors = []

  for (const u of users) {
    const { nom, email, mot_de_passe, role } = u

    if (!nom || !email || !mot_de_passe || !role) {
      errors.push({ email, reason: 'Champs manquants' })
      continue
    }

    if (!['admin', 'super-user', 'user'].includes(role)) {
      errors.push({ email, reason: 'Rôle invalide' })
      continue
    }

    // 1. Créer l'utilisateur dans Supabase Auth
    const { data: { user }, error: authError } = await admin.auth.admin.createUser({
      email,
      password: mot_de_passe,
      email_confirm: true, // Pas besoin de vérification email
      user_metadata: { nom },
    })

    if (authError) {
      errors.push({ email, reason: authError.message })
      continue
    }

    // 2. Mettre à jour le profil avec le bon rôle et nom
    const { error: profileError } = await admin
      .from('profiles')
      .upsert({ id: user.id, nom, email, role, actif: true })

    if (profileError) {
      errors.push({ email, reason: profileError.message })
      continue
    }

    created++
  }

  return NextResponse.json({ success: true, created, errors })
}
