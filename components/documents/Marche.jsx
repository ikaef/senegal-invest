import { useState } from "react";

const C = {
  bg:"#0f1a10", surface:"#162018", card:"#1c2b1e", border:"#2a3d2c",
  accent:"#c8893a", accentLight:"#e8a84a",
  green:"#4a9e5c", greenLight:"#6dbf7e",
  sand:"#d4b896", muted:"#7a9b7d", text:"#e8ede9", textMuted:"#9ab59c",
  red:"#e07a7a", cyan:"#5ecfb8", blue:"#5a9eff", gold:"#d4a820",
};
const F = { d:"'Georgia','Times New Roman',serif", m:"'Courier New',monospace" };
const S = {
  wrap:{ background:C.bg, minHeight:"100vh", fontFamily:F.d, color:C.text, lineHeight:1.6 },
  header:{ background:"linear-gradient(135deg,#0a1a0c,#1a2e1c 50%,#0f2010)", borderBottom:`1px solid ${C.border}`, padding:"2rem 2rem 1.6rem" },
  nav:{ display:"flex", overflowX:"auto", background:C.surface, borderBottom:`1px solid ${C.border}`, scrollbarWidth:"none" },
  navBtn:(a)=>({ background:a?C.card:"transparent", border:"none", borderBottom:a?`2px solid ${C.accent}`:"2px solid transparent", color:a?C.accentLight:C.muted, padding:"0.8rem 1.05rem", fontSize:"0.78rem", fontFamily:F.m, cursor:"pointer", whiteSpace:"nowrap", textTransform:"uppercase" }),
  main:{ maxWidth:"960px", margin:"0 auto", padding:"2rem 1.25rem" },
  h2:{ fontSize:"1.2rem", color:C.accentLight, borderBottom:`1px solid ${C.border}`, paddingBottom:"0.45rem", marginBottom:"1.4rem", fontFamily:F.d, marginTop:0 },
  h3:{ fontSize:"0.68rem", color:C.greenLight, marginBottom:"0.65rem", marginTop:"1.2rem", fontFamily:F.m, textTransform:"uppercase", letterSpacing:"0.1em" },
  card:{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"6px", padding:"1.2rem", marginBottom:"1.2rem" },
  alert:(c)=>({ background:(c||C.accent)+"18", border:`1px solid ${(c||C.accent)}44`, borderLeft:`3px solid ${c||C.accent}`, borderRadius:"0 5px 5px 0", padding:"0.85rem 1rem", marginBottom:"1rem", fontSize:"0.88rem", color:C.text, lineHeight:1.6 }),
  th:{ background:"#1e2f20", color:C.accent, padding:"0.5rem 0.65rem", textAlign:"left", fontFamily:F.m, fontSize:"0.68rem", letterSpacing:"0.08em", textTransform:"uppercase", borderBottom:`1px solid ${C.border}` },
  td:{ padding:"0.5rem 0.65rem", borderBottom:`1px solid ${C.border}`, color:C.text, verticalAlign:"top", fontSize:"0.83rem" },
  tdM:{ padding:"0.5rem 0.65rem", borderBottom:`1px solid ${C.border}`, color:C.muted, fontSize:"0.82rem", verticalAlign:"top" },
  pill:(c)=>({ display:"inline-block", background:(c||C.accent)+"22", color:c||C.accent, border:`1px solid ${(c||C.accent)}44`, padding:"0.15rem 0.55rem", borderRadius:"20px", fontSize:"0.7rem", fontFamily:F.m, fontWeight:"bold" }),
  kpi:(c)=>({ background:C.card, border:`1px solid ${C.border}`, borderTop:`2px solid ${c}`, borderRadius:"4px", padding:"0.85rem", textAlign:"center" }),
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const PESTEL = [
  { l:"P", label:"Politique", color:C.accent, points:[
    { s:"+", t:"Vision Sénégal 2050", d:"Remplace officiellement le PSE. Souveraineté alimentaire = priorité nationale explicite du gouvernement Diomaye Faye / Sonko. Politique agricole intégrée en cours de finalisation (PM Sonko, 2026)." },
    { s:"+", t:"Subventions intrants 2025–2026", d:"130 milliards FCFA alloués (hausse vs 120 Mds précédent). Engrais subventionnés à 50% via coopératives agréées. Semences certifiées ISRA accessibles à prix réduit." },
    { s:"+", t:"DER/FJ — Programme Diaspora Retour", d:"Prêts sans intérêt 1–5M FCFA pour entrepreneurs de retour. Accompagnement ADEPME gratuit. Maintenu par le nouveau gouvernement." },
    { s:"–", t:"Risque réglementaire intrants", d:"Les politiques de subvention et d'interdiction d'importation peuvent changer selon la conjoncture politique. Surveiller les décrets agricoles annuels." },
  ]},
  { l:"E", label:"Économique", color:C.gold, points:[
    { s:"+", t:"PIB +7–9% en 2025–2026", d:"Démarrage exploitation pétrolière Sangomar (pétrole offshore) → hausse structurelle du pouvoir d'achat urbain. Classe moyenne en expansion rapide." },
    { s:"+", t:"Transferts diaspora 3 Mds USD/an", d:"Soit ~15% du PIB. Pouvoir d'achat additionnel captable via livraisons premium (paniers légumes, viande)." },
    { s:"+", t:"Marché maraîchage 200 Mds FCFA/an", d:"Sur Dakar seul. Croissance +6–8%/an portée par l'urbanisation. Oignon : 100 000 tonnes importées/an malgré production locale — opportunité de substitution directe." },
    { s:"–", t:"Inflation intrants +8–10%/an (cumul)", d:"Prix engrais et aliment volaille corrélés aux marchés mondiaux. Compresser les marges si pas de stratégie d'approvisionnement (fumier avicole + coopérative)." },
  ]},
  { l:"S", label:"Sociodémographique", color:C.greenLight, points:[
    { s:"+", t:"Urbanisation 45→55% d'ici 2030", d:"Demande alimentaire urbaine structurellement sous-fournie. Restauration collective, livraison à domicile et GMS en forte expansion." },
    { s:"+", t:"Valorisation culturelle de l'élevage ovin", d:"Le mouton Ladoum est un marqueur de statut social. Demande pour les races améliorées culturellement pérenne et en hausse. Instagram = canal de vente organique." },
    { s:"+", t:"Révolution Wave Mobile Money", d:"Pénétration > 80% des ménages. Paiement B2C instantané sans frais. WhatsApp + Wave = canal de vente direct à marge maximale, coût acquisition nul." },
    { s:"+", t:"Population jeune (âge médian 19 ans)", d:"Main d'œuvre agricole jeune et disponible à des salaires raisonnables. Main d'œuvre saisonnière abondante dans les zones rurales." },
  ]},
  { l:"T", label:"Technologique", color:C.blue, points:[
    { s:"+", t:"Irrigation solaire accessible", d:"Pompes solaires 3m³/h disponibles à 2,5–3,8M FCFA selon qualité. Éliminent le coût gasoil (500–700K/an) et la dépendance au réseau électrique." },
    { s:"+", t:"Import direct Chine simplifié", d:"Alibaba + transitaire Dakar = accès aux équipements agricoles à -50/65% vs retail local. Réseau irrigation 1ha : 450–700K FCFA vs 1,5–2M via PERVAL." },
    { s:"+", t:"Digitalisation filières", d:"Traçabilité, commandes WhatsApp, facturation mobile, Instagram élevage. Avantage fort pour un entrepreneur diaspora vs exploitants traditionnels." },
  ]},
  { l:"E", label:"Environnemental", color:"#5a7a3a", points:[
    { s:"–", t:"Avancée désertification Niayes", d:"Recul nappe phréatique côtière, salinisation. Irrigation goutte-à-goutte (-40% eau vs aspersion) = réponse technique obligatoire." },
    { s:"–", t:"Décalage saisons pluies (+2–3 semaines vs 1990)", d:"Calendriers culturaux à ajuster. Maraîchage irrigué annuel = réponse structurelle au risque climatique." },
    { s:"+", t:"Fumier avicole = engrais organique gratuit", d:"Synergie exploitation intégrée. 2 000 poulets × 6 cycles = 24 t fumier/an. Couvre 60–80% besoins azote sur 1 ha. Économie 600K–1,2M FCFA/an." },
  ]},
  { l:"L", label:"Légal & Réglementaire", color:C.muted, points:[
    { s:"+", t:"Code des Investissements — avantages agriculture", d:"Exonération IS pendant 5 à 8 ans. Exonération TVA sur équipements agricoles. Enregistrement SARL via APIX en 48–72h." },
    { s:"+", t:"Exonération TVA intrants agricoles", d:"Semences, engrais, aliment bétail, médicaments vétérinaires = exonérés de TVA 18%. Économie directe sur tous ces postes." },
    { s:"=", t:"Domaine National — foncier non cessible", d:"Loi 1964 : pas d'achat de terre agricole rurale possible. Seule solution sécurisée : bail emphytéotique notarié (25–50 ans). Prix marché Niayes : 3–4M/ha. Forage corrigé à 50 000 FCFA/ml — nappe Niayes (12m) = 600K vs Thiès (45m) = 2,25M." },
    { s:"=", t:"DIREL — Santé animale obligatoire", d:"Protocoles vaccination imposés (Newcastle, PPR). Contrôles DIREL périodiques. Tenir carnet de vaccination — exigé pour commercialisation officielle." },
  ]},
];

const FILIERES = [
  {
    id:"oignon", icon:"🧅", label:"Oignon", color:C.accentLight,
    marche:"100 000+ tonnes importées/an (Pakistan, Maroc, Pays-Bas) malgré production locale. Marché domestique estimé à 80+ Mds FCFA/an. Sénégal = 1er producteur CEDEAO mais en sous-offre hors-saison.",
    saison:[{m:"Nov",v:60},{m:"Déc",v:75},{m:"Jan",v:70},{m:"Fév",v:65},{m:"Mar",v:55},{m:"Avr",v:60},{m:"Mai",v:75},{m:"Juin",v:90},{m:"Juil",v:100},{m:"Aoû",v:95},{m:"Sep",v:85},{m:"Oct",v:70}],
    prix_min:150, prix_max:850, ratio_max_min:"×5,7",
    opportunite:"Stockage 3 mois hangar ventilé sec : achat récolte (150–250 FCFA/kg) → vente hors-saison juin–août (600–850 FCFA/kg). +2–4M FCFA sans production supplémentaire.",
    clients:["Marchés locaux + bana-bana","Grossistes Sandaga/Tilène Dakar","Restaurants et traiteurs","Export CEDEAO (Guinée, Mali) — An 3+"],
    rendement:"15–25 t/ha/cycle. Zone Niayes : 3 cycles/an sur 1 ha = 45–75 tonnes potentielles.",
  },
  {
    id:"tomate", icon:"🍅", label:"Tomate", color:C.red,
    marche:"Consommation nationale ~200 000 t/an. Tomate concentrée importée (Chine, Italie) : 35 000 t/an. Tomate fraîche = 100% locale mais offre irrégulière. Prix fortement saisonniers.",
    saison:[{m:"Oct",v:70},{m:"Nov",v:80},{m:"Déc",v:75},{m:"Jan",v:65},{m:"Fév",v:55},{m:"Mar",v:50},{m:"Avr",v:65},{m:"Mai",v:85},{m:"Juin",v:100},{m:"Juil",v:90},{m:"Aoû",v:80},{m:"Sep",v:70}],
    prix_min:150, prix_max:700, ratio_max_min:"×4,7",
    opportunite:"Cultures irriguées hors-saison (mai–sept) quand la production pluviale s'arrête. Prix 3× supérieurs. Restaurants = clients idéaux (prix fixes sur contrat).",
    clients:["Grossistes Dakar","Restaurants mid-range","Particuliers (consommation directe)","Transformateurs artisanaux (purée locale)"],
    rendement:"25–40 t/ha/cycle. Cycle court 75 jours. Très périssable — débouché local prioritaire.",
  },
  {
    id:"poivron", icon:"🫑", label:"Poivron / Piment", color:C.greenLight,
    marche:"Niche sous-développée au Sénégal. Peu de producteurs organisés. Demande forte des expatriés, restaurants gastronomiques, hôtels. Prix élevés et stables toute l'année.",
    saison:[{m:"Jan",v:70},{m:"Fév",v:65},{m:"Mar",v:70},{m:"Avr",v:75},{m:"Mai",v:80},{m:"Juin",v:85},{m:"Juil",v:90},{m:"Aoû",v:95},{m:"Sep",v:95},{m:"Oct",v:85},{m:"Nov",v:80},{m:"Déc",v:75}],
    prix_min:500, prix_max:1500, ratio_max_min:"×3,0",
    opportunite:"Filière peu concurrentielle avec fortes barrières à l'entrée (semences F1 spécifiques, irrigation). Prix stables et élevés toute l'année. Cœur du modèle premium.",
    clients:["Restaurants gastronomiques Dakar","Expatriés et cadres (livraison directe)","Hôtels 3–5 étoiles","Transformateurs (piment en poudre/pâte)"],
    rendement:"8–15 t/ha/cycle. Irrigation indispensable. Semences Technisem F1 = investissement clé.",
  },
  {
    id:"volaille", icon:"🐓", label:"Aviculture", color:C.accent,
    marche:"~80 000 t consommées/an. Marché estimé 320 Mds FCFA. Croissance +8%/an. SEDIMA (industriel) = 35% du marché. Poulet fermier frais = niche sous-exploitée, prix +35% vs industriel.",
    saison:[{m:"Jan",v:70},{m:"Fév",v:60},{m:"Mar",v:60},{m:"Avr",v:55},{m:"Mai",v:65},{m:"Juin",v:75},{m:"Juil",v:85},{m:"Aoû",v:90},{m:"Sep",v:80},{m:"Oct",v:75},{m:"Nov",v:80},{m:"Déc",v:100}],
    prix_min:1700, prix_max:3500, ratio_max_min:"×2,1",
    opportunite:"Poulet de chair frais vendu 2 400–3 000 FCFA/kg chez restaurants vs 1 900 FCFA/kg chez grossiste. Caler fin de cycle sur décembre (pic ×2). 6 cycles/an = cash-flow le plus régulier.",
    clients:["Grossistes (marché Thiaroye)","Restaurants mid-range","Particuliers (livraison directe)","Cantines/restauration collective (An 2+)"],
    rendement:"2 000 sujets × 6 cycles = 12 000 poulets/an. ICR cible 1,8–1,9. Poids abattage : 2,2–2,5 kg.",
  },
  {
    id:"ovin", icon:"🐑", label:"Élevage Ovin", color:C.gold,
    marche:"700 000 à 1 000 000 ovins sacrifiés à la Tabaski/an. Marché Tabaski estimé 200–400 Mds FCFA. Mouton Ladoum = niche premium, 100% local, pas de concurrence à l'import. Marché reproducteurs en forte croissance.",
    saison:[{m:"Jan",v:40},{m:"Fév",v:35},{m:"Mar",v:35},{m:"Avr",v:45},{m:"Mai",v:65},{m:"Juin",v:85},{m:"Juil",v:90},{m:"Aoû",v:95},{m:"Sep",v:100},{m:"Oct",v:70},{m:"Nov",v:55},{m:"Déc",v:45}],
    prix_min:80000, prix_max:500000, ratio_max_min:"×6,3",
    opportunite:"Bélier Ladoum reproducteur : 500K–2M FCFA. Instagram élevage = canal vente premium à coût zéro. Embouche 90j avant Tabaski : achat maigre → engraissement → ×2,5 le prix d'achat.",
    clients:["Familles (Tabaski direct)","Éleveurs naisseurs (reproducteurs Ladoum)","Boucheries + abattoirs","Cadres/classe moyenne urbaine"],
    rendement:"15 brebis → agnelage ×1,4/an = 21 sujets An 2, 30 An 3. Troupeau auto-croissant.",
  },
];

const ZONES = [
  {
    nom:"Zone des Niayes — Mboro intérieur (5–10km côte)", score:94, color:C.greenLight,
    foncier:"3–4 M FCFA/ha", nappe:"8–15m (forage très court)", dakar:"80–110 km",
    infra:"Route nationale + électricité + réseau artisans maraîchers",
    avs:["Nappe sub-permanente 8–15m → forage 12m = 600K FCFA (économie 1,3–2,3M vs Thiès)","Tradition maraîchère séculaire — meilleur sol d'AOF","Microclimat frais favorable aux légumes","Accès export CEDEAO oignon An 3","Réseau d'éleveurs Ladoum local"],
    incs:["Foncier élevé (3–4M/ha) — choisir Mboro ou Lompoul, pas bord de mer","Pression foncière croissante","Salinisation côtière sur parcelles basses (évitable en choisissant 5+ km de la côte)"],
    ideal:"✅ RECOMMANDÉ pour 30M. L'économie forage (nappe 12m) compense le surcoût foncier. Total foncier+eau quasi identique à Thiès médiane avec de meilleures conditions agronomiques et commerciales.",
  },
  {
    nom:"Sindia / Mbour arrière-pays", score:84, color:C.accentLight,
    foncier:"2–3 M FCFA/ha", nappe:"20–40m (forage 30m = 1,5M)", dakar:"70–85 km via autoroute A1",
    infra:"Autoroute A1 (péage) + hôtels Saly 10–15 km + réseau touristique",
    avs:["Foncier moins cher qu'en Niayes (+1,5M d'économie)","Autoroute A1 = Dakar en 1h","Hôtels Saly 10–15 km = clients B2B premium dès An 2","Zone touristique en développement","Total foncier+eau quasi identique aux Niayes"],
    incs:["Forage 30m = 1,5M (vs 600K en Niayes)","Sol sableux — amendement organique nécessaire","Pas d'écosystème maraîcher structuré"],
    ideal:"✅ BON CHOIX si stratégie hôtelière est priorité An 2 (Saly, Ngaparou). Coût total foncier+eau équivalent aux Niayes. Différentiateur : accès direct au marché hôtelier premium.",
  },
  {
    nom:"Thiès / axe Tivaouane", score:68, color:C.accent,
    foncier:"1,5–2,5 M FCFA/ha", nappe:"30–60m (forage 45m médiane = 2,25M)", dakar:"70–90 km (route nationale)",
    infra:"Ville Thiès (300 000 hab.) + ENSA Thiès + infrastructure correcte",
    avs:["Foncier le moins cher des 3 zones","Marché local solide (ville Thiès)","Artisans et main d'œuvre abondants","Accès ENSA Thiès pour recrutement"],
    incs:["Nappe 30–60m → forage coûteux (50 000 FCFA/ml × 45m = 2,25M, pire cas 60m = 3M)","Avantage foncier (-1,5M) annulé par surcoût forage (+1,65M)","Sol moins fertile — amendement organique nécessaire","Réseau maraîchers professionnels peu développé"],
    ideal:"⚠️ Réévalué. L'avantage foncier est annulé par le coût de forage corrigé (50K/ml). En pire cas nappe 60m, Thiès devient 2M plus cher que Niayes au total foncier+eau. Pertinent uniquement pour aviculture/ovin intensif avec budget forage maîtrisé.",
  },
];

const SEGMENTS = [
  {nom:"Marchés locaux / bana-bana",timing:"Immédiat",marge:1,access:5,vol:5,color:C.muted,
   desc:"Volume maximal, prix plancher. Outil d'écoulement d'urgence uniquement."},
  {nom:"Grossistes Sandaga / Tilène",timing:"Immédiat",marge:2,access:4,vol:4,color:C.accentLight,
   desc:"Contrat hebdomadaire. Volume important. Cœur du canal An 1."},
  {nom:"Restaurants mid-range Dakar",timing:"M3–M6",marge:3,access:3,vol:3,color:C.greenLight,
   desc:"Prix +25–35% vs grossiste. Contrat annuel. Stratégie B2B prioritaire."},
  {nom:"WhatsApp B2C (familles aisées)",timing:"M3–M6",marge:5,access:3,vol:2,color:C.cyan,
   desc:"Marge +50–80%. Wave immédiat. Zéro intermédiaire. À lancer dès le départ."},
  {nom:"Tabaski — vente directe ovins",timing:"Annuel",marge:5,access:4,vol:3,color:C.gold,
   desc:"3–7M FCFA en 2 semaines. Instagram = carnet pré-rempli avant Tabaski."},
  {nom:"Hôtels Saly / Dakar 3–5★",timing:"12–24 mois",marge:5,access:2,vol:2,color:C.blue,
   desc:"Prix +40–60%. Contrat annuel stable. Exige régularité + chambre froide."},
];

const CONCURRENCE = [
  {acteur:"Petits maraîchers (< 1 ha, 85% du marché)",force:"Coûts minimal, connaissance terrain",faiblesse:"Qualité irrégulière, pas de volume B2B, pas de stockage",menace:"Faible",mc:C.greenLight},
  {acteur:"GIE / coopératives structurées",force:"Volume groupé, accès subventions",faiblesse:"Bureaucratie, partage valeur dilué, lenteur",menace:"Modérée",mc:C.accent},
  {acteur:"SEDIMA (aviculture industrielle)",force:"Volume, réseau national, prix compétitifs (masse)",faiblesse:"Poulet standardisé, sans différenciation qualité",menace:"Faible (segment différent)",mc:C.greenLight},
  {acteur:"Importateurs oignon (Pakistan, Maroc)",force:"Prix très bas hors-saison",faiblesse:"Qualité souvent inférieure, délais, traçabilité zéro",menace:"Modérée (hors-saison uniquement)",mc:C.accent},
  {acteur:"Éleveurs Peulh transhumants",force:"Faibles coûts, grandes quantités",faiblesse:"Qualité variable, zoonoses, pas de marque",menace:"Faible (entrée de gamme uniquement)",mc:C.greenLight},
];

// ─── COMPOSANTS ──────────────────────────────────────────────────────────────
function KPIs() {
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"0.75rem",marginBottom:"1.4rem"}}>
      {[
        {v:"200 Mds",l:"Marché légumes Dakar/an",c:C.greenLight},
        {v:"100 000 t",l:"Oignons importés/an",c:C.accentLight},
        {v:"+8%/an",l:"Croissance marché volaille",c:C.cyan},
        {v:"700 000+",l:"Ovins Tabaski/an",c:C.gold},
        {v:"130 Mds",l:"Subventions intrants 2025-26",c:C.accent},
        {v:"PIB +7%",l:"Croissance Sénégal 2026",c:C.blue},
      ].map(k=>(
        <div key={k.l} style={S.kpi(k.c)}>
          <div style={{fontSize:"1.2rem",fontWeight:"bold",color:k.c,fontFamily:F.m}}>{k.v}</div>
          <div style={{fontSize:"0.62rem",color:C.muted,fontFamily:F.m,textTransform:"uppercase",letterSpacing:"0.07em",marginTop:"0.2rem"}}>{k.l}</div>
        </div>
      ))}
    </div>
  );
}

function BarChart({data, colorHigh, colorLow}) {
  const max = Math.max(...data.map(d=>d.v));
  return (
    <div style={{display:"flex",gap:"3px",alignItems:"flex-end",height:"80px",marginBottom:"0.5rem"}}>
      {data.map(({m,v})=>(
        <div key={m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
          <div style={{width:"100%",background:v/max>=0.75?colorHigh||C.accent:colorLow||C.green,height:`${v/max*100}%`,borderRadius:"3px 3px 0 0",minHeight:"4px"}}/>
          <span style={{fontSize:"0.58rem",color:C.muted,fontFamily:F.m}}>{m}</span>
        </div>
      ))}
    </div>
  );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────
function TabSynthese() {
  return (
    <div>
      <h2 style={S.h2}>Synthèse — Opportunité Marché pour 30M FCFA</h2>
      <div style={S.alert(C.greenLight)}>
        <strong>Contexte 2026 :</strong> La <strong>Vision Sénégal 2050</strong> (nouveau référentiel du gouvernement Diomaye Faye / Sonko) fait de la souveraineté alimentaire une priorité nationale. Le marché est structurellement sous-fourni en qualité. Une exploitation intégrée 1 ha (Niayes — Mboro intérieur) avec 3 filières dispose d'un avantage concurrentiel immédiat sur 85% des exploitants sénégalais.
      </div>
      <KPIs/>
      <div style={S.card}>
        <h3 style={S.h3}>Modèle 30M — Positionnement marché</h3>
        {[
          {t:"Maraîchage 1 ha — oignon + tomate + poivron",d:"3 cycles/an irrigués. Cible : grossistes Dakar + contrats restaurants + paniers WhatsApp. Oignon stocké = ×3 sur le prix sans production supplémentaire.",c:C.greenLight},
          {t:"Aviculture 2 000 poulets — 6 cycles/an",d:"Cash-flow le plus régulier de l'exploitation. Poulet fermier frais = prix +35% vs SEDIMA industriel. Caler fin de cycle sur décembre (pic ×2). Fumier → engrais maraîchage = économie 600K–1,2M FCFA/an.",c:C.accent},
          {t:"Élevage ovin — 15 brebis Peulh + 1 bélier Ladoum",d:"Troupeau auto-croissant (×1,4/an). Tabaski : 8–12 animaux vendus 150–350K chacun. Instagram = canal vente premium. An 4+ : reproducteurs Ladoum à 500K–800K/tête.",c:C.gold},
        ].map(({t,d,c})=>(
          <div key={t} style={{borderLeft:`3px solid ${c}`,paddingLeft:"1rem",marginBottom:"1rem"}}>
            <strong style={{color:c,display:"block",marginBottom:"0.25rem"}}>{t}</strong>
            <span style={{fontSize:"0.87rem",color:C.textMuted,lineHeight:1.6}}>{d}</span>
          </div>
        ))}
      </div>
      <div style={{...S.card,background:"#1e2f20"}}>
        <h3 style={{...S.h3,marginTop:0}}>Avantage compétitif clé vs 85% des exploitants</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
          {[
            {t:"Irrigation solaire autonome",d:"Production 365 j/an, indépendant des pluies. 85% des concurrents dépendent de la pluie."},
            {t:"3 filières intégrées",d:"Fumier avicole → engrais. Répartit le risque climatique. Flux de trésorerie plus stable."},
            {t:"Canal WhatsApp + Wave",d:"Vente directe familles aisées à marge +50–80%. Maîtrise digitale = avantage structurel rare en milieu rural."},
            {t:"Stockage oignon hors-saison",d:"Hangar ventilé = multiplication ×3 du prix sans production supplémentaire. Quasi inexistant chez les petits exploitants."},
          ].map(({t,d})=>(
            <div key={t} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"4px",padding:"0.75rem"}}>
              <div style={{fontWeight:"bold",color:C.sand,marginBottom:"0.25rem",fontSize:"0.88rem"}}>{t}</div>
              <div style={{fontSize:"0.82rem",color:C.textMuted}}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabPESTEL() {
  const [open,setOpen]=useState(null);
  return (
    <div>
      <h2 style={S.h2}>Macro-Environnement — Analyse PESTEL 2026</h2>
      <div style={S.alert(C.accentLight)}>
        <strong>Mise à jour critique :</strong> Le Plan Sénégal Émergent (PSE) est officiellement remplacé par la <strong>Vision Sénégal 2050</strong> (Diomaye Faye, lancé au CICAD Diamniadio). Toute référence au PSE est désormais obsolète. Le nouveau cadre est plus favorable à l'agriculture grâce à la priorité souveraineté alimentaire.
      </div>
      {PESTEL.map(b=>(
        <div key={b.l} style={{...S.card,marginBottom:"0.75rem"}}>
          <div onClick={()=>setOpen(open===b.l?null:b.l)} style={{display:"flex",alignItems:"center",gap:"1rem",cursor:"pointer"}}>
            <div style={{width:"40px",height:"40px",borderRadius:"50%",background:b.color+"22",border:`2px solid ${b.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",fontSize:"1.1rem",color:b.color,fontFamily:F.m,flexShrink:0}}>{b.l}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:"bold",color:C.sand,fontFamily:F.d}}>{b.label}</div>
              <div style={{color:C.muted,fontSize:"0.8rem"}}>{b.points.length} facteurs · {b.points.filter(p=>p.s==="+").length} favorables · {b.points.filter(p=>p.s==="–").length} risques</div>
            </div>
            <span style={{color:C.muted}}>{open===b.l?"▲":"▼"}</span>
          </div>
          {open===b.l&&(
            <div style={{marginTop:"1rem",borderTop:`1px solid ${C.border}`,paddingTop:"1rem"}}>
              {b.points.map(p=>(
                <div key={p.t} style={{display:"flex",gap:"0.75rem",marginBottom:"0.85rem",alignItems:"flex-start"}}>
                  <span style={{width:"22px",height:"22px",borderRadius:"50%",flexShrink:0,background:p.s==="+"?C.greenLight+"22":p.s==="–"?C.red+"22":C.muted+"22",color:p.s==="+"?C.greenLight:p.s==="–"?C.red:C.muted,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",fontSize:"0.9rem"}}>{p.s}</span>
                  <div>
                    <div style={{fontWeight:"bold",color:C.sand,fontSize:"0.9rem",marginBottom:"0.2rem"}}>{p.t}</div>
                    <div style={{color:C.textMuted,fontSize:"0.84rem",lineHeight:1.6}}>{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TabFilieres() {
  const [sel,setSel]=useState("oignon");
  const f=FILIERES.find(x=>x.id===sel);
  return (
    <div>
      <h2 style={S.h2}>Analyse de la Demande — Filière par Filière</h2>
      <div style={{display:"flex",gap:"0",marginBottom:"1.25rem",border:`1px solid ${C.border}`,borderRadius:"6px",overflow:"hidden"}}>
        {FILIERES.map(fi=>(
          <button key={fi.id} onClick={()=>setSel(fi.id)} style={{flex:1,padding:"0.65rem 0.5rem",border:"none",borderBottom:sel===fi.id?`3px solid ${fi.color}`:"3px solid transparent",background:sel===fi.id?fi.color+"18":C.surface,color:sel===fi.id?fi.color:C.muted,fontFamily:F.m,fontSize:"0.8rem",cursor:"pointer"}}>
            {fi.icon} {fi.label}
          </button>
        ))}
      </div>

      <div style={{...S.card,borderTop:`3px solid ${f.color}`}}>
        <h3 style={{...S.h3,marginTop:0}}>Structure du marché</h3>
        <p style={{color:C.textMuted,fontSize:"0.88rem",lineHeight:1.7,marginBottom:"1rem"}}>{f.marche}</p>

        <h3 style={S.h3}>Saisonnalité des prix (indice de rentabilité)</h3>
        <BarChart data={f.saison} colorHigh={f.color} colorLow={f.color+"66"}/>
        <div style={{display:"flex",gap:"1rem",fontSize:"0.78rem",color:C.muted,marginBottom:"0.85rem"}}>
          <span>Prix min : <strong style={{color:f.color}}>{typeof f.prix_min==="number"&&f.prix_min>1000?f.prix_min.toLocaleString("fr-FR"):f.prix_min} FCFA</strong></span>
          <span>Prix max : <strong style={{color:f.color}}>{typeof f.prix_max==="number"&&f.prix_max>1000?f.prix_max.toLocaleString("fr-FR"):f.prix_max} FCFA</strong></span>
          <span>Amplitude : <strong style={{color:C.accentLight}}>{f.ratio_max_min}</strong></span>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
          <div>
            <h3 style={S.h3}>Clients prioritaires</h3>
            {f.clients.map(c=><div key={c} style={{display:"flex",gap:"0.5rem",marginBottom:"0.3rem"}}><span style={{color:f.color,flexShrink:0}}>→</span><span style={{fontSize:"0.84rem",color:C.textMuted}}>{c}</span></div>)}
            <h3 style={S.h3}>Rendement & production</h3>
            <div style={{fontSize:"0.85rem",color:C.text}}>{f.rendement}</div>
          </div>
          <div style={{...S.alert(f.color),alignSelf:"flex-start",marginBottom:0}}>
            <strong>Opportunité clé : </strong>{f.opportunite}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabZones() {
  return (
    <div>
      <h2 style={S.h2}>Zones d'Implantation — Analyse Comparative</h2>
      <div style={S.alert(C.red)}>
        <strong>Rappel légal :</strong> Pas d'achat possible (Loi Domaine National 1964). Seule option sécurisée : <strong>bail emphytéotique notarié</strong> (25–50 ans). Prix ci-dessous = droits d'affectation marché réel 2026 (sources Expat-Dakar, CoinAfrique, Keur-Immo).
      </div>
      {ZONES.map(z=>(
        <div key={z.nom} style={{...S.card,borderLeft:`4px solid ${z.color}`}}>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem",marginBottom:"0.75rem"}}>
            <div>
              <div style={{fontWeight:"bold",color:C.sand,fontSize:"1rem",fontFamily:F.d}}>{z.nom}</div>
              <div style={{fontSize:"0.82rem",color:C.muted,marginTop:"0.2rem"}}>
                Foncier : <strong style={{color:z.color}}>{z.foncier}</strong> · Nappe : {z.nappe} · Dakar : {z.dakar}
              </div>
            </div>
            <div style={{background:z.color+"22",border:`1px solid ${z.color}44`,borderRadius:"4px",padding:"0.4rem 0.8rem",textAlign:"center"}}>
              <div style={{fontSize:"1.3rem",fontWeight:"bold",color:z.color,fontFamily:F.m}}>{z.score}/100</div>
              <div style={{fontSize:"0.62rem",color:C.muted,fontFamily:F.m,textTransform:"uppercase"}}>Score global</div>
            </div>
          </div>
          <div style={{height:"5px",background:C.border,borderRadius:"3px",marginBottom:"0.85rem"}}>
            <div style={{height:"100%",width:`${z.score}%`,background:z.color,borderRadius:"3px"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"0.75rem"}}>
            <div>
              <h3 style={S.h3}>Avantages</h3>
              {z.avs.map(a=><div key={a} style={{display:"flex",gap:"0.5rem",marginBottom:"0.3rem"}}><span style={{color:C.greenLight,flexShrink:0,fontSize:"0.8rem"}}>+</span><span style={{fontSize:"0.82rem",color:C.textMuted}}>{a}</span></div>)}
            </div>
            <div>
              <h3 style={{...S.h3,color:C.red}}>Inconvénients</h3>
              {z.incs.map(a=><div key={a} style={{display:"flex",gap:"0.5rem",marginBottom:"0.3rem"}}><span style={{color:C.red,flexShrink:0,fontSize:"0.8rem"}}>–</span><span style={{fontSize:"0.82rem",color:C.textMuted}}>{a}</span></div>)}
            </div>
          </div>
          <div style={S.alert(z.color)}><strong>Recommandation : </strong>{z.ideal}</div>
        </div>
      ))}
    </div>
  );
}

function TabSegments() {
  return (
    <div>
      <h2 style={S.h2}>Segmentation Clients & Canaux de Distribution</h2>
      <div style={S.alert(C.cyan)}>
        <strong>Stratégie multicanal :</strong> Ne jamais dépendre d'un seul canal. Triangulation recommandée : 1 canal volume (grossiste) + 1 canal marge (restaurant/hôtel) + 1 canal premium (WhatsApp B2C). Cette structure protège contre la chute des prix et maximise la rentabilité globale.
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"0.85rem",marginBottom:"1.25rem"}}>
        {SEGMENTS.map(seg=>(
          <div key={seg.nom} style={{background:C.card,border:`1px solid ${C.border}`,borderTop:`3px solid ${seg.color}`,borderRadius:"6px",padding:"1rem"}}>
            <div style={{fontWeight:"bold",color:C.sand,fontSize:"0.9rem",marginBottom:"0.35rem"}}>{seg.nom}</div>
            <span style={S.pill(seg.color)}>{seg.timing}</span>
            <div style={{marginTop:"0.65rem"}}>
              {[["Accessibilité",seg.access],["Marge",seg.marge],["Volume",seg.vol]].map(([l,v])=>(
                <div key={l} style={{marginBottom:"0.3rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.7rem",marginBottom:"0.1rem"}}>
                    <span style={{color:C.muted,fontFamily:F.m,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</span>
                    <span style={{color:seg.color}}>{"★".repeat(v)}{"☆".repeat(5-v)}</span>
                  </div>
                  <div style={{height:"4px",background:C.border,borderRadius:"2px"}}>
                    <div style={{height:"100%",width:`${v/5*100}%`,background:seg.color,borderRadius:"2px"}}/>
                  </div>
                </div>
              ))}
            </div>
            <p style={{fontSize:"0.8rem",color:C.muted,marginTop:"0.6rem",lineHeight:1.4,marginBottom:0}}>{seg.desc}</p>
          </div>
        ))}
      </div>

      <div style={S.card}>
        <h3 style={S.h3}>Analyse concurrentielle</h3>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.83rem"}}>
          <thead><tr>
            {["Concurrent","Forces","Faiblesses","Menace"].map(h=><th key={h} style={S.th}>{h}</th>)}
          </tr></thead>
          <tbody>
            {CONCURRENCE.map((c,i)=>(
              <tr key={c.acteur} style={{background:i%2===0?C.card:C.surface}}>
                <td style={{...S.td,color:C.sand,fontWeight:"bold"}}>{c.acteur}</td>
                <td style={S.tdM}>{c.force}</td>
                <td style={S.tdM}>{c.faiblesse}</td>
                <td style={S.td}><span style={S.pill(c.mc)}>{c.menace}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const TABS=[
  {l:"Synthèse",C:TabSynthese},{l:"PESTEL 2026",C:TabPESTEL},
  {l:"Filières & Prix",C:TabFilieres},{l:"Zones & Foncier",C:TabZones},{l:"Clients & Segments",C:TabSegments},
];
export default function Marche() {
  const [active,setActive]=useState(0);
  const Comp=TABS[active].C;
  return (
    <div style={S.wrap}>
      <div style={S.header}>
        <div style={{display:"inline-block",background:C.accent,color:"#0f1a10",fontSize:"0.62rem",fontFamily:F.m,fontWeight:"bold",letterSpacing:"0.14em",padding:"0.2rem 0.7rem",borderRadius:"2px",marginBottom:"0.7rem",textTransform:"uppercase"}}>
          02 · Étude de Marché Complète · 30M FCFA · 2026
        </div>
        <h1 style={{fontSize:"clamp(1.4rem,3.5vw,2rem)",fontWeight:"bold",color:C.text,margin:"0 0 0.4rem",fontFamily:F.d}}>Étude de Marché — Sénégal 🇸🇳</h1>
        <p style={{color:C.muted,fontSize:"0.88rem",fontFamily:F.m,margin:"0 0 0.85rem"}}>Vision Sénégal 2050 · PESTEL · 5 filières · 3 zones · Segments clients · Sources terrain 2026</p>
      </div>
      <nav style={S.nav}>
        {TABS.map((t,i)=><button key={t.l} style={S.navBtn(i===active)} onClick={()=>setActive(i)}>{t.l}</button>)}
      </nav>
      <div style={S.main}><Comp/></div>
    </div>
  );
}
