import { supabase } from './supabase'
import { createClient } from '@supabase/supabase-js'

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getProfile() {
  const session = await getSession()
  if (!session) return null

  // Lecture directe via anon avec le token utilisateur
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return data
}

export async function signOut() {
  await supabase.auth.signOut()
  window.location.href = '/login'
}

export const ROLE_PERMISSIONS = {
  admin: ['comparaison', 'marche', 'businessplan', 'pitch', 'fournisseurs', 'admin'],
  'super-user': ['comparaison', 'marche', 'businessplan', 'pitch', 'fournisseurs'],
  user: ['pitch'],
}

export function canAccess(role, slug) {
  return ROLE_PERMISSIONS[role]?.includes(slug) ?? false
}

export const DOCUMENTS = [
  { slug: 'comparaison', titre: 'Comparaison ROI par capital', description: 'ROI des 5 paliers (15M → 120M FCFA), zones, meilleur investissement', roles: ['admin', 'super-user'], numero: '01' },
  { slug: 'marche', titre: 'Étude de marché complète', description: 'PESTEL Vision 2050, 5 filières, zones Niayes/Mbour, segments clients', roles: ['admin', 'super-user'], numero: '02' },
  { slug: 'businessplan', titre: 'Business plan 30M FCFA', description: 'Budget corrigé, P&L 3 ans, projection 10 ans, risques, roadmap', roles: ['admin', 'super-user'], numero: '03' },
  { slug: 'pitch', titre: 'Pitch investisseurs', description: 'Présentation complète : opportunité, solution, budget, proposition', roles: ['admin', 'super-user', 'user'], numero: '04' },
  { slug: 'fournisseurs', titre: 'Comparatif fournisseurs', description: '35+ fournisseurs, 6 catégories, notation Qualité / Prix / Dispo', roles: ['admin', 'super-user'], numero: '05' },
]
