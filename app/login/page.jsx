'use client'
import { useState, Suspense } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'

const S = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1a10', padding: '1rem' },
  card: { background: '#1c2b1e', border: '1px solid #2a3d2c', borderRadius: '16px', padding: 'clamp(1.5rem, 5vw, 2.5rem)', width: '100%', maxWidth: '440px' },
  logo: { textAlign: 'center', marginBottom: '2rem' },
  flag: { fontSize: 'clamp(2rem, 5vw, 2.5rem)', display: 'block', marginBottom: '0.75rem' },
  title: { fontSize: 'clamp(1rem, 3vw, 1.25rem)', fontWeight: '500', color: '#e8ede9', fontFamily: 'Georgia, serif', marginBottom: '0.25rem', lineHeight: 1.3 },
  sub: { fontSize: '0.82rem', color: '#7a9b7d' },
  label: { display: 'block', fontSize: '0.75rem', color: '#9ab59c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem', fontFamily: 'monospace' },
  input: { width: '100%', background: '#162018', border: '1px solid #2a3d2c', borderRadius: '8px', padding: '0.75rem 1rem', color: '#e8ede9', fontSize: '1rem', outline: 'none', marginBottom: '1.2rem', boxSizing: 'border-box' },
  btn: { width: '100%', background: '#c8893a', border: 'none', borderRadius: '8px', padding: '0.9rem', color: '#0f1a10', fontSize: '1rem', fontWeight: '500', cursor: 'pointer' },
  error: { background: '#2a0d0d', border: '1px solid #e07a7a55', borderRadius: '8px', padding: '0.75rem 1rem', color: '#e07a7a', fontSize: '0.85rem', marginBottom: '1rem' },
  divider: { height: '1px', background: '#2a3d2c', margin: '1.75rem 0' },
  contact: { display: 'flex', alignItems: 'center', gap: '1rem' },
  avatar: { width: '56px', height: '56px', borderRadius: '50%', border: '2px solid #4a9e5c', flexShrink: 0, overflow: 'hidden' },
  contactText: { flex: 1 },
  contactTitle: { fontSize: '0.72rem', color: '#7a9b7d', marginBottom: '0.25rem' },
  contactName: { fontSize: '0.92rem', fontWeight: '500', color: '#d4b896', fontFamily: 'Georgia, serif', marginBottom: '0.2rem' },
  contactDetail: { fontSize: '0.78rem', color: '#9ab59c', lineHeight: 1.6 },
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const params = useSearchParams()
  const reason = params.get('reason')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
      return
    }
    router.push('/dashboard')
  }

  return (
    <div style={S.card}>
      <div style={S.logo}>
        <span style={S.flag}>🇸🇳</span>
        <div style={S.title}>Étude de projet AgroBusiness Sénégal</div>
        <div style={S.sub}>Espace documentaire — Accès privé</div>
      </div>

      {reason === 'suspended' && <div style={S.error}>Compte suspendu. Contacter Ibrahima.</div>}
      {error && <div style={S.error}>{error}</div>}

      <form onSubmit={handleLogin}>
        <label style={S.label}>Email</label>
        <input style={S.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" required autoComplete="email" />
        <label style={S.label}>Mot de passe</label>
        <input style={S.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required autoComplete="current-password" />
        <button type="submit" style={{ ...S.btn, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }} disabled={loading}>
          {loading ? 'Connexion...' : 'Accéder aux documents'}
        </button>
      </form>

      <div style={S.divider} />

      <div style={S.contact}>
        <div style={S.avatar}>
          <img src="/ibrahima.jpg" alt="Ibrahima Khalil FALL" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={S.contactText}>
          <div style={S.contactTitle}>Pour plus d'informations</div>
          <div style={S.contactName}>Ibrahima Khalil FALL</div>
          <div style={S.contactDetail}>
            📞 07 88 46 33 27<br />
            ✉️ ibrahimakh.fall@gmail.com
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div style={S.page}>
      <Suspense fallback={<div style={{ color: '#7a9b7d' }}>Chargement...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
