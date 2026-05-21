'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getProfile, signOut } from '../../lib/auth'
import Papa from 'papaparse'

const S = {
  page: { minHeight: '100vh', background: '#0f1a10' },
  nav: { background: '#1c2b1e', borderBottom: '1px solid #2a3d2c', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px' },
  back: { background: 'transparent', border: '1px solid #2a3d2c', borderRadius: '6px', padding: '0.3rem 0.8rem', color: '#9ab59c', fontSize: '0.8rem', cursor: 'pointer' },
  navTitle: { fontSize: '0.9rem', color: '#e07a7a', fontFamily: 'Georgia, serif', fontWeight: '500' },
  main: { maxWidth: '900px', margin: '0 auto', padding: '2rem 1.25rem' },
  section: { marginBottom: '2rem' },
  h2: { fontSize: '1rem', fontWeight: '500', color: '#d4b896', fontFamily: 'Georgia, serif', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #2a3d2c' },
  card: { background: '#1c2b1e', border: '1px solid #2a3d2c', borderRadius: '8px', padding: '1.25rem', marginBottom: '1rem' },
  label: { display: 'block', fontSize: '0.72rem', color: '#9ab59c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem', fontFamily: 'monospace' },
  input: { width: '100%', background: '#162018', border: '1px solid #2a3d2c', borderRadius: '6px', padding: '0.6rem 0.85rem', color: '#e8ede9', fontSize: '0.9rem', marginBottom: '0.75rem', outline: 'none' },
  select: { width: '100%', background: '#162018', border: '1px solid #2a3d2c', borderRadius: '6px', padding: '0.6rem 0.85rem', color: '#e8ede9', fontSize: '0.9rem', marginBottom: '0.75rem', outline: 'none' },
  textarea: { width: '100%', background: '#162018', border: '1px solid #2a3d2c', borderRadius: '6px', padding: '0.6rem 0.85rem', color: '#e8ede9', fontSize: '0.82rem', marginBottom: '0.75rem', outline: 'none', resize: 'vertical', minHeight: '160px', fontFamily: 'monospace' },
  btn: (c) => ({ background: c || '#c8893a', border: 'none', borderRadius: '6px', padding: '0.65rem 1.25rem', color: '#0f1a10', fontSize: '0.88rem', fontWeight: '500', cursor: 'pointer', marginRight: '0.5rem' }),
  btnSecondary: { background: 'transparent', border: '1px solid #2a3d2c', borderRadius: '6px', padding: '0.6rem 1.1rem', color: '#9ab59c', fontSize: '0.88rem', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' },
  th: { padding: '0.5rem 0.75rem', borderBottom: '1px solid #2a3d2c', color: '#9ab59c', textAlign: 'left', fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em' },
  td: { padding: '0.6rem 0.75rem', borderBottom: '1px solid #162018', color: '#e8ede9', verticalAlign: 'middle' },
  roleBadge: (role) => ({
    display: 'inline-block', fontSize: '0.68rem', fontFamily: 'monospace', padding: '2px 8px', borderRadius: '20px',
    background: role === 'admin' ? '#2a0d0d' : role === 'super-user' ? '#2a1e08' : '#0d2010',
    color: role === 'admin' ? '#e07a7a' : role === 'super-user' ? '#c8893a' : '#6dbf7e',
  }),
  actifDot: (a) => ({ width: '8px', height: '8px', borderRadius: '50%', background: a ? '#6dbf7e' : '#e07a7a', display: 'inline-block' }),
  success: { background: '#0d2010', border: '1px solid #6dbf7e44', borderRadius: '6px', padding: '0.7rem 0.9rem', color: '#6dbf7e', fontSize: '0.85rem', marginBottom: '1rem' },
  error: { background: '#2a0d0d', border: '1px solid #e07a7a55', borderRadius: '6px', padding: '0.7rem 0.9rem', color: '#e07a7a', fontSize: '0.85rem', marginBottom: '1rem' },
  preview: { background: '#162018', border: '1px solid #2a3d2c', borderRadius: '6px', padding: '0.75rem', marginBottom: '0.75rem', fontSize: '0.82rem' },
  previewRow: { display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 0.8fr', gap: '0.5rem', padding: '0.3rem 0', borderBottom: '1px solid #2a3d2c22', color: '#9ab59c', fontFamily: 'monospace' },
}

const CSV_TEMPLATE = `nom,email,mot_de_passe,role
Dupont Jean,jean.dupont@email.com,TempPass123!,super-user
Martin Sophie,sophie.martin@email.com,TempPass456!,user
Traoré Mamadou,mamadou.traore@email.com,TempPass789!,super-user`

export default function AdminPage() {
  const router = useRouter()
  const [profile, setProfile] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState({ type: '', text: '' })

  // Formulaire nouveau user
  const [newUser, setNewUser] = useState({ nom: '', email: '', mot_de_passe: '', role: 'user' })
  const [creating, setCreating] = useState(false)

  // Import CSV
  const [csvContent, setCsvContent] = useState('')
  const [csvPreview, setCsvPreview] = useState([])
  const [importing, setImporting] = useState(false)

  // Chargement du profil et des users
  useEffect(() => {
    getProfile().then(p => {
      if (!p || p.role !== 'admin') { router.push('/dashboard'); return }
      setProfile(p)
      fetchUsers()
    })
  }, [])

  async function fetchUsers() {
    const res = await fetch('/api/admin/users')
    const data = await res.json()
    setUsers(data.users || [])
    setLoading(false)
  }

  // Créer un seul utilisateur
  async function handleCreateUser(e) {
    e.preventDefault()
    setCreating(true)
    setMsg({ type: '', text: '' })

    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ users: [newUser] }),
    })
    const data = await res.json()

    if (data.success) {
      setMsg({ type: 'success', text: `Compte créé pour ${newUser.email}` })
      setNewUser({ nom: '', email: '', mot_de_passe: '', role: 'user' })
      fetchUsers()
    } else {
      setMsg({ type: 'error', text: data.error || 'Erreur lors de la création' })
    }
    setCreating(false)
  }

  // Parser le CSV et afficher la prévisualisation
  function handleCsvParse() {
    if (!csvContent.trim()) return
    const result = Papa.parse(csvContent.trim(), { header: true, skipEmptyLines: true })
    setCsvPreview(result.data)
  }

  // Importer tous les users du CSV
  async function handleCsvImport() {
    if (csvPreview.length === 0) return
    setImporting(true)
    setMsg({ type: '', text: '' })

    const usersToCreate = csvPreview.map(row => ({
      nom: row.nom?.trim() || '',
      email: row.email?.trim() || '',
      mot_de_passe: row.mot_de_passe?.trim() || '',
      role: row.role?.trim() || 'user',
    }))

    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ users: usersToCreate }),
    })
    const data = await res.json()

    if (data.success) {
      setMsg({ type: 'success', text: `${data.created} compte(s) créé(s) sur ${usersToCreate.length}. ${data.errors?.length ? `${data.errors.length} erreur(s).` : ''}` })
      setCsvContent('')
      setCsvPreview([])
      fetchUsers()
    } else {
      setMsg({ type: 'error', text: data.error || 'Erreur import' })
    }
    setImporting(false)
  }

  // Changer le statut d'un user
  async function toggleUser(userId, actif) {
    await fetch(`/api/admin/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actif: !actif }),
    })
    fetchUsers()
  }

  // Changer le rôle d'un user
  async function changeRole(userId, newRole) {
    await fetch(`/api/admin/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    })
    fetchUsers()
  }

  if (loading) return <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#7a9b7d' }}>Chargement...</span></div>

  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button style={S.back} onClick={() => router.push('/dashboard')}>← Tableau de bord</button>
          <span style={S.navTitle}>⚙️ Administration</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#e07a7a', fontFamily: 'monospace' }}>{profile?.nom} (admin)</span>
          <button style={S.back} onClick={signOut}>Déconnexion</button>
        </div>
      </nav>

      <main style={S.main}>

        {msg.text && (
          <div style={msg.type === 'success' ? S.success : S.error}>{msg.text}</div>
        )}

        {/* ── LISTE DES UTILISATEURS ── */}
        <div style={S.section}>
          <div style={S.h2}>Utilisateurs actifs — {users.length} compte(s)</div>
          <div style={S.card}>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Statut</th>
                  <th style={S.th}>Nom</th>
                  <th style={S.th}>Email</th>
                  <th style={S.th}>Rôle</th>
                  <th style={S.th}>Créé le</th>
                  <th style={S.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td style={S.td}><span style={S.actifDot(u.actif)} /></td>
                    <td style={S.td}>{u.nom}</td>
                    <td style={{ ...S.td, color: '#9ab59c', fontFamily: 'monospace', fontSize: '0.8rem' }}>{u.email}</td>
                    <td style={S.td}>
                      <span style={S.roleBadge(u.role)}>{u.role}</span>
                    </td>
                    <td style={{ ...S.td, color: '#7a9b7d', fontSize: '0.78rem' }}>
                      {new Date(u.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td style={S.td}>
                      {u.email !== profile?.email && (
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                          <select
                            value={u.role}
                            onChange={e => changeRole(u.id, e.target.value)}
                            style={{ ...S.select, marginBottom: 0, padding: '0.2rem 0.5rem', fontSize: '0.75rem', width: 'auto' }}
                          >
                            <option value="admin">admin</option>
                            <option value="super-user">super-user</option>
                            <option value="user">user</option>
                          </select>
                          <button
                            onClick={() => toggleUser(u.id, u.actif)}
                            style={{ ...S.btn(u.actif ? '#e07a7a' : '#6dbf7e'), padding: '0.2rem 0.6rem', fontSize: '0.72rem', marginRight: 0 }}
                          >
                            {u.actif ? 'Suspendre' : 'Réactiver'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── CRÉER UN UTILISATEUR ── */}
        <div style={S.section}>
          <div style={S.h2}>Créer un compte manuellement</div>
          <div style={S.card}>
            <form onSubmit={handleCreateUser} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
              <div>
                <label style={S.label}>Nom complet</label>
                <input style={S.input} value={newUser.nom} onChange={e => setNewUser(p => ({ ...p, nom: e.target.value }))} placeholder="Dupont Jean" required />
              </div>
              <div>
                <label style={S.label}>Email</label>
                <input style={S.input} type="email" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} placeholder="jean@email.com" required />
              </div>
              <div>
                <label style={S.label}>Mot de passe temporaire</label>
                <input style={S.input} value={newUser.mot_de_passe} onChange={e => setNewUser(p => ({ ...p, mot_de_passe: e.target.value }))} placeholder="Min. 8 caractères" required minLength={8} />
              </div>
              <div>
                <label style={S.label}>Rôle</label>
                <select style={S.select} value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value }))}>
                  <option value="user">user — Pitch seulement</option>
                  <option value="super-user">super-user — Tous les documents</option>
                  <option value="admin">admin — Administration complète</option>
                </select>
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <button type="submit" style={S.btn()} disabled={creating}>
                  {creating ? 'Création...' : 'Créer le compte'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── IMPORT CSV DEPUIS EXCEL ── */}
        <div style={S.section}>
          <div style={S.h2}>Import depuis Excel (CSV)</div>
          <div style={S.card}>
            <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: '#9ab59c', lineHeight: '1.7' }}>
              1. Dans Excel : <strong style={{ color: '#e8ede9' }}>Fichier → Enregistrer sous → CSV (séparateur point-virgule)</strong><br />
              2. Colonnes obligatoires : <code style={{ background: '#162018', padding: '1px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.82rem' }}>nom, email, mot_de_passe, role</code><br />
              3. Rôles autorisés : <code style={{ background: '#162018', padding: '1px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.82rem' }}>admin</code>, <code style={{ background: '#162018', padding: '1px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.82rem' }}>super-user</code>, <code style={{ background: '#162018', padding: '1px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.82rem' }}>user</code>
            </div>

            <label style={S.label}>Modèle CSV (copier dans Excel)</label>
            <textarea
              style={{ ...S.textarea, minHeight: '100px', color: '#6dbf7e', fontSize: '0.78rem' }}
              readOnly
              value={CSV_TEMPLATE}
              onClick={e => e.target.select()}
            />

            <label style={S.label}>Coller votre CSV ici</label>
            <textarea
              style={S.textarea}
              value={csvContent}
              onChange={e => { setCsvContent(e.target.value); setCsvPreview([]) }}
              placeholder="nom,email,mot_de_passe,role&#10;..."
            />

            <div style={{ marginBottom: '1rem' }}>
              <button style={S.btn('#5a9eff')} onClick={handleCsvParse} disabled={!csvContent.trim()}>
                Analyser le CSV
              </button>
            </div>

            {csvPreview.length > 0 && (
              <>
                <div style={{ fontSize: '0.82rem', color: '#9ab59c', marginBottom: '0.5rem' }}>
                  {csvPreview.length} utilisateur(s) détecté(s) — vérifier avant d'importer :
                </div>
                <div style={S.preview}>
                  <div style={{ ...S.previewRow, color: '#7a9b7d', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    <span>Nom</span><span>Email</span><span>Rôle</span>
                  </div>
                  {csvPreview.map((row, i) => (
                    <div key={i} style={S.previewRow}>
                      <span style={{ color: '#e8ede9' }}>{row.nom}</span>
                      <span style={{ color: '#9ab59c' }}>{row.email}</span>
                      <span style={S.roleBadge(row.role)}>{row.role}</span>
                    </div>
                  ))}
                </div>
                <button style={S.btn('#6dbf7e')} onClick={handleCsvImport} disabled={importing}>
                  {importing ? 'Import en cours...' : `Importer ${csvPreview.length} compte(s)`}
                </button>
              </>
            )}
          </div>
        </div>

      </main>
    </div>
  )
}
