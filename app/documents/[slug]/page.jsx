'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getProfile, canAccess, DOCUMENTS, signOut } from '../../../lib/auth'
import dynamic from 'next/dynamic'

// Import dynamique de chaque document (lazy loading)
const DOC_COMPONENTS = {
  comparaison: dynamic(() => import('../../../components/documents/Comparaison'), { ssr: false }),
  marche: dynamic(() => import('../../../components/documents/Marche'), { ssr: false }),
  businessplan: dynamic(() => import('../../../components/documents/BusinessPlan'), { ssr: false }),
  pitch: dynamic(() => import('../../../components/documents/Pitch'), { ssr: false }),
  fournisseurs: dynamic(() => import('../../../components/documents/Fournisseurs'), { ssr: false }),
}

const S = {
  page: { minHeight: '100vh', background: '#0f1a10' },
  nav: { background: '#1c2b1e', borderBottom: '1px solid #2a3d2c', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px' },
  navLeft: { display: 'flex', alignItems: 'center', gap: '1rem' },
  backBtn: { background: 'transparent', border: '1px solid #2a3d2c', borderRadius: '6px', padding: '0.3rem 0.8rem', color: '#9ab59c', fontSize: '0.8rem', cursor: 'pointer' },
  navTitle: { fontSize: '0.9rem', color: '#d4b896', fontFamily: 'Georgia, serif' },
  navRight: { display: 'flex', gap: '0.75rem' },
  navBtn: { background: 'transparent', border: '1px solid #2a3d2c', borderRadius: '6px', padding: '0.3rem 0.8rem', color: '#9ab59c', fontSize: '0.8rem', cursor: 'pointer' },
  loader: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 52px)', color: '#7a9b7d', fontFamily: 'monospace', fontSize: '0.9rem' },
  denied: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 52px)', flexDirection: 'column', gap: '1rem' },
  deniedText: { color: '#e07a7a', fontSize: '1rem' },
  content: { /* Les documents gèrent leur propre style */ },
}

export default function DocumentPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    getProfile().then(p => {
      if (!p) { router.push('/login'); return }
      setProfile(p)
      setHasAccess(canAccess(p.role, slug))
      setLoading(false)
    })
  }, [slug])

  const doc = DOCUMENTS.find(d => d.slug === slug)
  const DocComponent = DOC_COMPONENTS[slug]

  if (loading) return (
    <div style={S.page}>
      <nav style={S.nav}><div style={S.navTitle}>Chargement...</div></nav>
      <div style={S.loader}>Chargement du document...</div>
    </div>
  )

  if (!hasAccess) return (
    <div style={S.page}>
      <nav style={S.nav}>
        <div style={S.navLeft}>
          <button style={S.backBtn} onClick={() => router.push('/dashboard')}>← Retour</button>
        </div>
      </nav>
      <div style={S.denied}>
        <div style={S.deniedText}>Accès non autorisé</div>
        <button style={S.navBtn} onClick={() => router.push('/dashboard')}>Retour au tableau de bord</button>
      </div>
    </div>
  )

  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <div style={S.navLeft}>
          <button style={S.backBtn} onClick={() => router.push('/dashboard')}>← Tableau de bord</button>
          <span style={S.navTitle}>{doc?.titre}</span>
        </div>
        <div style={S.navRight}>
          <span style={{ fontSize: '0.78rem', color: '#4a9e5c', fontFamily: 'monospace' }}>{profile?.nom}</span>
          <button style={S.navBtn} onClick={signOut}>Déconnexion</button>
        </div>
      </nav>

      <div style={S.content}>
        {DocComponent ? <DocComponent /> : (
          <div style={S.loader}>Document non trouvé</div>
        )}
      </div>
    </div>
  )
}
