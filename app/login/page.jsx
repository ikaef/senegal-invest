'use client'
import { useState, Suspense } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'

const S = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1a10', padding: '1rem' },
  card: { background: '#1c2b1e', border: '1px solid #2a3d2c', borderRadius: '12px', padding: '2.5rem', width: '100%', maxWidth: '420px' },
  logo: { textAlign: 'center', marginBottom: '2rem' },
  flag: { fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' },
  title: { fontSize: '1.4rem', fontWeight: '500', color: '#e8ede9', fontFamily: 'Georgia, serif', marginBottom: '0.25rem' },
  sub: { fontSize: '0.82rem', color: '#7a9b7d' },
  label: { display: 'block', fontSize: '0.78rem', color: '#9ab59c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem', fontFamily: 'monospace' },
  input: { width: '100%', background: '#162018', border: '1px solid #2a3d2c', borderRadius: '6px', padding: '0.7rem 0.9rem', color: '#e8ede9', fontSize: '0.95rem', outline: 'none', marginBottom: '1.2rem' },
  btn: { width: '100%', background: '#c8893a', border: 'none', borderRadius: '6px', padding: '0.85rem', color: '#0f1a10', fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer' },
  error: { background: '#2a0d0d', border: '1px solid #e07a7a55', borderRadius: '6px', padding: '0.7rem 0.9rem', color: '#e07a7a', fontSize: '0.85rem', marginBottom: '1rem' },
  footer: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', color: '#3d5c3f' },
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
        <div style={S.title}>Sénégal Invest</div>
        <div style={S.sub}>Espace investisseurs — Accès privé</div>
      </div>
      {reason === 'suspended' && <div style={S.error}>Compte suspendu. Contacter l'administrateur.</div>}
      {error && <div style={S.error}>{error}</div>}
      <form onSubmit={handleLogin}>
        <label style={S.label}>Email</label>
        <input style={S.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" required autoComplete="email" />
        <label style={S.label}>Mot de passe</label>
        <input style={S.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required autoComplete="current-password" />
        <button type="submit" style={{ ...S.btn, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }} disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
      <div style={S.footer}>Document confidentiel — Accès réservé aux investisseurs</div>
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
