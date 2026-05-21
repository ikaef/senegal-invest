// =====================================================================
// INSTRUCTIONS — Adapter les fichiers JSX du projet dans ce dossier
// =====================================================================
//
// Pour chaque document, créer le fichier correspondant dans ce dossier
// en copiant le contenu du fichier JSX existant et en changeant :
//   export default function App()
// en :
//   export default function NomDuDocument()
//
// FICHIERS À CRÉER :
//   1. Comparaison.jsx   ← copier 01-comparaison-budgets.jsx
//      Changer : export default function App() → export default function Comparaison()
//
//   2. Marche.jsx        ← copier 02-etude-marche-30m.jsx
//      Changer : export default function App() → export default function Marche()
//
//   3. BusinessPlan.jsx  ← copier 03-business-plan-30m.jsx
//      Changer : export default function App() → export default function BusinessPlan()
//
//   4. Pitch.jsx         ← copier 04-pitch-investisseur.jsx
//      Changer : export default function App() → export default function Pitch()
//
//   5. Fournisseurs.jsx  ← copier 05-fournisseurs.jsx
//      Changer : export default function App() → export default function Fournisseurs()
//
// C'est la seule modification nécessaire dans chaque fichier.
// Les imports useState/recharts fonctionnent directement dans Next.js.
// =====================================================================

export { default as Comparaison } from './Comparaison'
export { default as Marche } from './Marche'
export { default as BusinessPlan } from './BusinessPlan'
export { default as Pitch } from './Pitch'
export { default as Fournisseurs } from './Fournisseurs'
