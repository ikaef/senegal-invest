import { createAdminClient } from '../../../../../lib/supabase'
import { NextResponse } from 'next/server'

// PATCH /api/admin/users/[id] — modifier rôle ou statut
export async function PATCH(req, { params }) {
  const { id } = params
  const body = await req.json()
  const admin = createAdminClient()

  const updates = {}
  if (body.role !== undefined) updates.role = body.role
  if (body.actif !== undefined) updates.actif = body.actif

  const { error } = await admin
    .from('profiles')
    .update(updates)
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

// DELETE /api/admin/users/[id] — supprimer un compte
export async function DELETE(req, { params }) {
  const { id } = params
  const admin = createAdminClient()

  const { error } = await admin.auth.admin.deleteUser(id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
