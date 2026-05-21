'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { getProfile, DOCUMENTS, ROLE_PERMISSIONS, signOut } from '../../lib/auth'

const S = {
  page: { minHeight: '100vh', background: '#0f1a10' },
  nav: { background: '#1c2b1e', borderBottom: '1px solid #2a3d2c', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' },
  navLogo: { fontSize: '1rem', fontWeight: '500', color: '#e8ede9', fontFamily: 'Georgia, serif', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  navRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  navUser: { fontSize: '0.82rem', color: '#7a9b7d' },
  navBtn: { background: 'transparent', border: '1px solid #2a3d2c', borderRadius: '6px', padding: '0.35rem 0.85rem', color: '#9ab59c', fontSize: '0.8rem', cursor: 'pointer' },
  main: { maxWidth: '960px', margin: '0 auto', padding: '2rem 1.25rem' },
  header: { marginBottom: '2rem' },
  headerTitle: { fontSize: '1.5rem', fontWeight: '500', color: '#e8ede9', fontFamily: 'Georgia, serif', marginBottom: '0.35rem' },
  headerSub: { fontSize: '0.85rem', color: '#7a9b7d' },
  roleBadge: (role) => ({
    display: 'inline-block',
    fontSize: '0.72rem',
    fontFamily: 'monospace',
    padding: '3px 10px',
    borderRadius: '20px',
    marginLeft: '0.75rem',
    background: role === 'admin' ? '#2a0d0d' : role === 'super-user' ? '#2a1e08' : '#0d2010',
    color: role === 'admin' ? '#e07a7a' : role === 'super-user' ? '#c8893a' : '#6dbf7e',
    border: `1px solid ${role === 'admin' ? '#e07a7a44' : role === 'super-user' ? '#c8893a44' : '#6dbf7e44'}`,
  }),
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' },
  docCard: { background: '#1c2b1e', border: '1px solid #2a3d2c', borderRadius: '10px', padding: '1.25rem', cursor: 'pointer', transition: 'border-color 0.15s' },
  docNum: { fontSize: '0.68rem', fontFamily: 'monospace', color: '#4a9e5c', letterSpacing: '0.1em', marginBottom: '0.4rem' },
  docTitle: { fontSize: '1rem', fontWeight: '500', color: '#e8ede9', fontFamily: 'Georgia, serif', marginBottom: '0.3rem' },
  docDesc: { fontSize: '0.82rem', color: '#7a9b7d', lineHeight: '1.5' },
  docArrow: { marginTop: '0.85rem', fontSize: '0.8rem', color: '#4a9e5c', fontFamily: 'monospace' },
  adminCard: { background: '#2a0d0d', border: '1px solid #e07a7a33', borderRadius: '10px', padding: '1.25rem', cursor: 'pointer' },
  adminTitle: { fontSize: '1rem', fontWeight: '500', color: '#e07a7a', fontFamily: 'Georgia, serif', marginBottom: '0.3rem' },
  adminDesc: { fontSize: '0.82rem', color: '#9ab59c', lineHeight: '1.5' },
  denied: { background: '#2a1e08', border: '1px solid #c8893a44', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#c8893a', marginBottom: '1.25rem' },
}

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getProfile().then(p => {
      if (!p) { router.push('/login'); return }
      setProfile(p)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#7a9b7d', fontFamily: 'monospace', fontSize: '0.9rem' }}>Chargement...</div>
    </div>
  )

  const accessibleDocs = DOCUMENTS.filter(d => d.roles.includes(profile.role))
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const denied = urlParams.get('denied')

  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <div style={S.navLogo}>
          🇸🇳 Sénégal Invest
          <span style={S.roleBadge(profile.role)}>{profile.role}</span>
        </div>
        <div style={S.navRight}>
          <span style={S.navUser}>{profile.nom}</span>
          <button style={S.navBtn} onClick={signOut}>Déconnexion</button>
        </div>
      </nav>

      <main style={S.main}>
        <div style={S.header}>
          <div style={S.headerTitle}>Bonjour, {profile.nom.split(' ')[0]}</div>
          <div style={S.headerSub}>
            {accessibleDocs.length} document{accessibleDocs.length > 1 ? 's' : ''} disponible{accessibleDocs.length > 1 ? 's' : ''} selon votre niveau d'accès
          </div>
        </div>

        {denied && (
          <div style={S.denied}>
            Accès refusé à ce document. Contactez l'administrateur si vous pensez avoir les droits nécessaires.
          </div>
        )}

        <div style={S.grid}>
          {accessibleDocs.map(doc => (
            <div
              key={doc.slug}
              style={S.docCard}
              onClick={() => router.push(`/documents/${doc.slug}`)}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#4a9e5c'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#2a3d2c'}
            >
              <div style={S.docNum}>{doc.numero}</div>
              <div style={S.docTitle}>{doc.titre}</div>
              <div style={S.docDesc}>{doc.description}</div>
              <div style={S.docArrow}>Ouvrir →</div>
            </div>
          ))}

          {profile.role === 'admin' && (
            <div
              style={S.adminCard}
              onClick={() => router.push('/admin')}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#e07a7a66'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e07a7a33'}
            >
              <div style={S.adminTitle}>⚙️ Administration</div>
              <div style={S.adminDesc}>Gérer les comptes utilisateurs, importer depuis Excel, voir les connexions</div>
              <div style={{ ...S.docArrow, color: '#e07a7a' }}>Accès admin →</div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
