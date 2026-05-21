# Sénégal Invest — Guide de déploiement

Site web privé pour l'espace investisseurs du projet agri-élevage Sénégal.
Stack : Next.js 14 + Supabase + Vercel — 100% gratuit.

---

## Étape 1 — Créer le compte Supabase (5 min)

1. Aller sur [supabase.com](https://supabase.com) → Créer un compte gratuit
2. Créer un nouveau projet ("senegal-invest", choisir une région proche : `eu-west-2` London)
3. Attendre que le projet s'initialise (~2 min)
4. Dans le menu gauche : **Settings → API**
5. Copier ces 3 valeurs (tu en auras besoin plus tard) :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

---

## Étape 2 — Créer la base de données (2 min)

1. Dans Supabase : **SQL Editor → New query**
2. Copier-coller le contenu du fichier `supabase-schema.sql`
3. Cliquer **Run**
4. Vérifier que les tables `profiles` et `connexion_logs` ont été créées

---

## Étape 3 — Configurer le projet localement

```bash
# 1. Cloner / créer le projet
cd senegal-invest
npm install

# 2. Copier le fichier d'environnement
cp .env.local.example .env.local

# 3. Editer .env.local et remplir les 3 valeurs Supabase
nano .env.local  # ou ouvrir avec VS Code
```

---

## Étape 4 — Adapter les documents (10 min)

Pour chaque document JSX existant :

```bash
# Copier le fichier dans le dossier documents
cp /chemin/vers/01-comparaison-budgets.jsx components/documents/Comparaison.jsx
cp /chemin/vers/02-etude-marche-30m.jsx    components/documents/Marche.jsx
cp /chemin/vers/03-business-plan-30m.jsx   components/documents/BusinessPlan.jsx
cp /chemin/vers/04-pitch-investisseur.jsx  components/documents/Pitch.jsx
cp /chemin/vers/05-fournisseurs.jsx        components/documents/Fournisseurs.jsx
```

Ensuite, dans chaque fichier, changer **une seule ligne** :
```jsx
// Avant
export default function App() {

// Après (nom différent par fichier)
export default function Comparaison() {  // ou Marche, BusinessPlan, Pitch, Fournisseurs
```

---

## Étape 5 — Tester en local

```bash
npm run dev
# Ouvrir http://localhost:3000
```

---

## Étape 6 — Déployer sur Vercel (5 min)

### Méthode recommandée : GitHub + Vercel

```bash
# 1. Pousser le code sur GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TON_USER/senegal-invest.git
git push -u origin main
```

2. Aller sur [vercel.com](https://vercel.com) → Se connecter avec GitHub
3. **Add New Project** → Sélectionner `senegal-invest`
4. Dans **Environment Variables**, ajouter les 3 variables de `.env.local` :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Cliquer **Deploy**
6. Ton site est en ligne sur `senegal-invest.vercel.app` 🎉

---

## Étape 7 — Créer ton compte administrateur

1. Aller sur `https://senegal-invest.vercel.app/login`
2. Te connecter — cela crée automatiquement un compte `user`
3. Dans Supabase → **SQL Editor → New query** :

```sql
UPDATE public.profiles
SET role = 'admin', nom = 'Ibrahima'
WHERE email = 'ton-email@gmail.com';
```

4. Rafraîchir le site → tu as maintenant accès à l'administration

---

## Utilisation quotidienne — Créer des comptes

### Option A : Interface admin (recommandée)

1. Connecte-toi sur `senegal-invest.vercel.app/login`
2. Cliquer sur **Administration** dans le dashboard
3. Section **Créer un compte** : remplir le formulaire
4. OU Section **Import CSV** : coller le CSV exporté depuis Excel

### Option B : Import depuis Excel

**Format du fichier Excel :**

| nom | email | mot_de_passe | role |
|-----|-------|--------------|------|
| Dupont Jean | jean@email.com | TempPass123! | super-user |
| Martin Sophie | sophie@email.com | TempPass456! | user |

**Étapes :**
1. Remplir ton fichier Excel avec ces colonnes exactes
2. Fichier → Enregistrer sous → **CSV (séparateur point-virgule)**
3. Ouvrir le CSV avec un éditeur texte, copier le contenu
4. Coller dans la section "Import CSV" de la page admin
5. Cliquer "Analyser" puis "Importer"

---

## Niveaux d'accès

| Rôle | Documents accessibles |
|------|-----------------------|
| `admin` | Tout + gestion des comptes |
| `super-user` | Les 5 documents |
| `user` | Pitch investisseur uniquement |

---

## Mises à jour des documents

Pour mettre à jour un document :
1. Modifier le fichier JSX correspondant dans `components/documents/`
2. `git add . && git commit -m "update doc" && git push`
3. Vercel redéploie automatiquement en 1 minute

---

## Structure du projet

```
senegal-invest/
├── app/
│   ├── login/page.jsx          # Page de connexion
│   ├── dashboard/page.jsx      # Tableau de bord
│   ├── documents/[slug]/       # Affichage des documents
│   ├── admin/page.jsx          # Interface d'administration
│   └── api/admin/users/        # API création/gestion users
├── components/documents/       # Les 5 documents JSX (à copier)
├── lib/
│   ├── supabase.js             # Clients Supabase
│   └── auth.js                 # Helpers auth + permissions
├── middleware.js               # Protection des routes
├── supabase-schema.sql         # Schéma base de données
└── .env.local.example          # Variables d'environnement
```

---

## Dépannage

**"Invalid login credentials"** → Vérifier que l'utilisateur a bien été créé dans Supabase Authentication → Users

**"Supabase URL not found"** → Vérifier les variables d'environnement dans Vercel (Settings → Environment Variables)

**Le document ne s'affiche pas** → Vérifier que le fichier existe dans `components/documents/` et que le nom de la fonction exportée est correct

**Erreur 500 sur l'API admin** → Vérifier que `SUPABASE_SERVICE_ROLE_KEY` est bien configurée dans Vercel
