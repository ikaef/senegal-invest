import { useState } from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";

const C = {
  bg:"#0f1a10", surface:"#162018", card:"#1c2b1e", border:"#2a3d2c",
  accent:"#c8893a", accentLight:"#e8a84a",
  green:"#4a9e5c", greenLight:"#6dbf7e",
  sand:"#d4b896", muted:"#7a9b7d", text:"#e8ede9", textMuted:"#9ab59c",
  red:"#e07a7a", cyan:"#5ecfb8", blue:"#5a9eff", gold:"#d4a820",
  p15:"#e07a7a", p30:"#6dbf7e", p50:"#e8a84a", p80:"#5ecfb8", p120:"#b07adf",
};
const F = { d:"'Georgia','Times New Roman',serif", m:"'Courier New',monospace" };
const fmt = n => n.toLocaleString("fr-FR");
const fmtM = n => (n/1000000).toFixed(1)+"M";
const isDark = true;
const gridC = "rgba(255,255,255,0.06)";
const textC = "#7a9b7d";

const S = {
  wrap:{ background:C.bg, minHeight:"100vh", fontFamily:F.d, color:C.text, lineHeight:1.6 },
  header:{ background:"linear-gradient(135deg,#0a1a0c,#1a2e1c 50%,#0f2010)", borderBottom:`1px solid ${C.border}`, padding:"2rem 2rem 1.6rem" },
  nav:{ display:"flex", overflowX:"auto", background:C.surface, borderBottom:`1px solid ${C.border}`, scrollbarWidth:"none" },
  navBtn:(a)=>({ background:a?C.card:"transparent", border:"none", borderBottom:a?`2px solid ${C.accent}`:"2px solid transparent", color:a?C.accentLight:C.muted, padding:"0.8rem 1.05rem", fontSize:"0.78rem", fontFamily:F.m, cursor:"pointer", whiteSpace:"nowrap", textTransform:"uppercase" }),
  main:{ maxWidth:"980px", margin:"0 auto", padding:"2rem 1.25rem" },
  h2:{ fontSize:"1.2rem", color:C.accentLight, borderBottom:`1px solid ${C.border}`, paddingBottom:"0.45rem", marginBottom:"1.4rem", fontFamily:F.d, marginTop:0 },
  h3:{ fontSize:"0.68rem", color:C.greenLight, marginBottom:"0.65rem", marginTop:"1.2rem", fontFamily:F.m, textTransform:"uppercase", letterSpacing:"0.1em" },
  card:{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"6px", padding:"1.2rem", marginBottom:"1.2rem" },
  alert:(c)=>({ background:(c||C.accent)+"18", border:`1px solid ${(c||C.accent)}44`, borderLeft:`3px solid ${c||C.accent}`, borderRadius:"0 5px 5px 0", padding:"0.85rem 1rem", marginBottom:"1rem", fontSize:"0.88rem", color:C.text, lineHeight:1.6 }),
  th:{ background:"#1e2f20", color:C.accent, padding:"0.5rem 0.7rem", textAlign:"left", fontFamily:F.m, fontSize:"0.68rem", letterSpacing:"0.08em", textTransform:"uppercase", borderBottom:`1px solid ${C.border}` },
  thR:{ background:"#1e2f20", color:C.accent, padding:"0.5rem 0.7rem", textAlign:"right", fontFamily:F.m, fontSize:"0.68rem", textTransform:"uppercase", borderBottom:`1px solid ${C.border}` },
  td:{ padding:"0.5rem 0.7rem", borderBottom:`1px solid ${C.border}`, color:C.text, verticalAlign:"top" },
  tdR:{ padding:"0.5rem 0.7rem", borderBottom:`1px solid ${C.border}`, textAlign:"right", fontFamily:F.m, fontSize:"0.82rem", verticalAlign:"top" },
  tdM:{ padding:"0.5rem 0.7rem", borderBottom:`1px solid ${C.border}`, color:C.muted, fontSize:"0.82rem", verticalAlign:"top" },
  pill:(c)=>({ display:"inline-block", background:(c||C.accent)+"22", color:c||C.accent, border:`1px solid ${(c||C.accent)}44`, padding:"0.18rem 0.6rem", borderRadius:"20px", fontSize:"0.7rem", fontFamily:F.m, fontWeight:"bold" }),
  kpi:(c)=>({ background:C.card, border:`1px solid ${C.border}`, borderTop:`2px solid ${c}`, borderRadius:"4px", padding:"0.85rem", textAlign:"center" }),
  kpiV:(c)=>({ fontSize:"1.25rem", fontWeight:"bold", color:c, fontFamily:F.m, display:"block" }),
  kpiL:{ fontSize:"0.62rem", color:C.muted, fontFamily:F.m, textTransform:"uppercase", letterSpacing:"0.07em", marginTop:"0.2rem" },
};

// ─── DONNÉES PALIERS (coûts construction corrigés bottom-up 2026) ─────────────
const PALIERS = [
  {
    id:0, label:"15 M", icon:"🌱", color:C.p15, tag:"DÉMARRAGE",
    capital:15, zone:"Thiès (0,5 ha — bail 1 M FCFA) — nappe 40m", surface:"0,5 ha",
    filières:["Maraîchage 0,5 ha","Ovin 8 brebis"],
    bat_detail:"Bergerie basique 40m² (1,5M) + Clôture partielle (0,8M) = 2,3M",
    bat_total:2300000,
    budget:[
      {k:"Foncier 0,5 ha Thiès",v:1000000}, {k:"Forage 40m (50K/ml) + pompe basique",v:2000000},
      {k:"Irrigation aspersion basique",v:500000}, {k:"Bergerie 40m² + clôture (rural)",v:2300000},
      {k:"Cheptel 8 brebis Peulh",v:640000}, {k:"Semences + intrants",v:500000},
      {k:"Admin + assurances",v:200000}, {k:"Fonds de roulement",v:2000000},
    ],
    revenus:[
      {fili:"🥬 Maraîchage",a1:2800000,a2:3800000,a3:5000000},
      {fili:"🐑 Ovin",a1:500000,a2:1200000,a3:2200000},
    ],
    charges:[
      {ch:"Intrants + aliments",a1:800000,a2:1100000,a3:1400000},
      {ch:"Salaires (3 permanents)",a1:2400000,a2:2700000,a3:3000000},
      {ch:"Transport + divers",a1:300000,a2:400000,a3:500000},
      {ch:"Assurances + fixes",a1:200000,a2:250000,a3:300000},
    ],
    emplois:3, payback:7.5, recommande:false,
    verdict:"Seule option sans aviculture — bâtiment avicole seul (4,5–5M) dépasserait le budget. Revenu annuel modeste (~2,1M net An3). Pertinent comme première exploitation test ou dans une zone à foncier très bas.",
    forceA:"Budget accessible", forceB:"Risque minimal", forceC:"Courbe d'apprentissage douce",
    faibA:"Revenu absolu faible", faibB:"Pas d'aviculture", faibC:"Payback long (7,5 ans)",
  },
  {
    id:1, label:"30 M", icon:"✅", color:C.p30, tag:"OPTIMAL ROI",
    capital:30, zone:"Niayes — Mboro intérieur (1 ha — bail 3,5 M FCFA)", surface:"1 ha",
    filières:["Maraîchage 1 ha","Aviculture 2 000 poulets","Ovin 15 brebis"],
    bat_detail:"Avicole 200m² rural basique (5M) + Bergerie 80m² (2,5M) + Hangar 50m² (1,5M) + Logement 30m² (2,2M) + Clôture 400ml (1,3M) = 12,5M",
    bat_total:12500000,
    budget:[
      {k:"Foncier 1 ha Niayes (Mboro intérieur)",v:3500000}, {k:"Forage 12m (50K/ml) + pompe Lorentz + panneaux",v:3900000},
      {k:"Irrigation goutte-à-goutte 1ha",v:1500000}, {k:"Avicole 200m² (rural basique)",v:5000000},
      {k:"Bergerie 80m²",v:2500000}, {k:"Hangar 50m²",v:1500000},
      {k:"Logement gardien + bureau 30m²",v:2200000}, {k:"Clôture 400ml",v:1300000},
      {k:"Tricycle occasion",v:800000}, {k:"Cheptel ovin 15 brebis + 1 bélier",v:1200000},
      {k:"Lot 2 000 poulets + aliment démarrage",v:2200000},
      {k:"Semences + intrants 2 cycles",v:1000000}, {k:"Admin + assurances",v:400000},
      {k:"Fonds de roulement (4 mois)",v:3800000},
    ],
    revenus:[
      {fili:"🥬 Maraîchage",a1:9000000,a2:14000000,a3:18000000},
      {fili:"🐓 Aviculture",a1:3500000,a2:4800000,a3:5500000},
      {fili:"🐑 Ovin",a1:2500000,a2:5000000,a3:7500000},
    ],
    charges:[
      {ch:"Intrants + aliment avicole + vét.",a1:5000000,a2:6900000,a3:8200000},
      {ch:"Salaires (7 permanents)",a1:5500000,a2:6300000,a3:7200000},
      {ch:"Transport + commercialisation",a1:900000,a2:1200000,a3:1500000},
      {ch:"Énergie + maintenance",a1:500000,a2:600000,a3:700000},
      {ch:"Assurances + fixes",a1:600000,a2:700000,a3:800000},
    ],
    emplois:10, payback:3.7, recommande:true,
    verdict:"Meilleur ROI. Zone Niayes Mboro intérieur : forage 12m (600K) compense le foncier plus cher. 3 filières complètes. Net An3 ~11,8M FCFA. Capital réel recommandé : 32–33M FCFA.",
    forceA:"Forage court (12m) en Niayes", forceB:"ROI le plus élevé (71%)", forceC:"Meilleur sol maraîcher Sénégal",
    faibA:"Foncier Niayes (3,5M vs 2M Thiès)", faibB:"Capital réel ~32M (légèrement > 30M)", faibC:"Pas d'export ni hôtels An 1",
  },
  {
    id:2, label:"50 M", icon:"⭐", color:C.p50, tag:"CONFORT",
    capital:50, zone:"Niayes (1,5 ha — bail 4,5 M FCFA)", surface:"1,5 ha",
    filières:["Maraîchage 1,5 ha","Aviculture 2 500 poulets","Ovin 20 brebis Peulh+Ladoum"],
    bat_detail:"Avicole 200m² standard (7,5M) + Bergerie 100m² (3,5M) + Hangar 60m² (1,8M) + Logement+bureau 35m² (3M) + Clôture 500ml (1,8M) = 17,6M",
    bat_total:17600000,
    budget:[
      {k:"Foncier 1,5 ha Niayes",v:4500000}, {k:"Forage 60m + pompe Lorentz",v:5500000},
      {k:"Irrigation goutte-à-goutte 1,5ha",v:2000000}, {k:"Avicole 200m² standard",v:7500000},
      {k:"Bergerie 100m²",v:3500000}, {k:"Hangar 60m²",v:1800000},
      {k:"Logement+bureau 35m²",v:3000000}, {k:"Clôture 500ml",v:1800000},
      {k:"Tricycle neuf",v:1500000}, {k:"Cheptel 20 brebis + 2 béliers Ladoum ×",v:1700000},
      {k:"Lot 2 500 poulets + aliment",v:2700000},
      {k:"Semences + intrants",v:1200000}, {k:"Admin + assurances",v:500000},
      {k:"Fonds de roulement",v:6000000},
    ],
    revenus:[
      {fili:"🥬 Maraîchage",a1:11000000,a2:17000000,a3:22000000},
      {fili:"🐓 Aviculture",a1:4200000,a2:5500000,a3:6500000},
      {fili:"🐑 Ovin",a1:3000000,a2:6500000,a3:10000000},
    ],
    charges:[
      {ch:"Intrants + aliment avicole + vét.",a1:6500000,a2:8500000,a3:10000000},
      {ch:"Salaires (10 permanents)",a1:7200000,a2:8400000,a3:9600000},
      {ch:"Transport + commercialisation",a1:1200000,a2:1500000,a3:1800000},
      {ch:"Énergie + maintenance",a1:700000,a2:800000,a3:900000},
      {ch:"Assurances + fixes",a1:700000,a2:800000,a3:900000},
    ],
    emplois:13, payback:3.2, recommande:true,
    verdict:"Confort opérationnel. Infrastructure standard, accès marchés restaurant possible. Ovin Ladoum croisé = niche haut de gamme. Net An3 ~16,3M FCFA. ROI 66% sur 3 ans.",
    forceA:"Qualité construction standard", forceB:"Niayes = nappe < 15m", forceC:"Croisé Ladoum = premium",
    faibA:"Foncier Niayes (3M/ha)", faibB:"Fonds roulement serré si problème An1", faibC:"Chambre froide hors budget",
  },
  {
    id:3, label:"80 M", icon:"🏭", color:C.p80, tag:"AGRIBUSINESS",
    capital:80, zone:"Niayes (2 ha — bail 6 M FCFA)", surface:"2 ha",
    filières:["Maraîchage 2 ha + hors-saison","Aviculture 3 000 poulets","Ovin 30 brebis Ladoum","Embouche intensive"],
    bat_detail:"Avicole 300m² standard (10,5M) + Bergerie 120m² (5M) + Hangar 80m² (2,8M) + Bureau+Logements 50m² amélioré (6M) + Clôture 600ml (2,5M) = 26,8M",
    bat_total:26800000,
    budget:[
      {k:"Foncier 2 ha Niayes",v:6000000}, {k:"2 forages + pompes Lorentz",v:9000000},
      {k:"Irrigation goutte-à-goutte 2ha",v:3000000}, {k:"Avicole 300m² standard",v:10500000},
      {k:"Bergerie 120m²",v:5000000}, {k:"Hangar 80m²",v:2800000},
      {k:"Bureau+Logements 50m² amélioré",v:6000000}, {k:"Clôture 600ml",v:2500000},
      {k:"Pickup 4x4 occasion",v:5000000}, {k:"Tricycle neuf",v:1500000},
      {k:"Cheptel 30 brebis Ladoum + 3 béliers",v:2500000},
      {k:"Lot 3 000 poulets + aliment",v:3300000},
      {k:"Semences + intrants",v:1500000}, {k:"Admin + assurances + SARL",v:700000},
      {k:"Fonds de roulement",v:9000000},
    ],
    revenus:[
      {fili:"🥬 Maraîchage 2ha",a1:15000000,a2:24000000,a3:32000000},
      {fili:"🐓 Aviculture",a1:5500000,a2:7500000,a3:9000000},
      {fili:"🐑 Ovin + embouche",a1:5000000,a2:10000000,a3:16000000},
    ],
    charges:[
      {ch:"Intrants + aliment + vét.",a1:10000000,a2:13000000,a3:15500000},
      {ch:"Salaires (14 permanents)",a1:10800000,a2:12600000,a3:14400000},
      {ch:"Transport + logistique",a1:2000000,a2:2500000,a3:3000000},
      {ch:"Énergie + maintenance",a1:1000000,a2:1200000,a3:1400000},
      {ch:"Assurances + fixes",a1:1000000,a2:1100000,a3:1200000},
    ],
    emplois:18, payback:3.0, recommande:false,
    verdict:"Revenu absolu très solide (~25,7M net An3). Accès marchés restaurants haut de gamme et hôtels Saly. Complexité opérationnelle nécessitant un chef d'exploitation à plein temps (150-200K/mois).",
    forceA:"Volume export CEDEAO possible", forceB:"Net An3 > 25M FCFA", forceC:"Pickup = logistique professionnelle",
    faibA:"Nécessite chef exploitation", faibB:"Foncier Niayes 6M one-shot", faibC:"Capital élevé → ROI % moindre",
  },
  {
    id:4, label:"120 M", icon:"👑", color:C.p120, tag:"PLATEFORME",
    capital:120, zone:"Niayes (3 ha — bail 9 M FCFA)", surface:"3 ha",
    filières:["Maraîchage 3 ha + export CEDEAO","Aviculture 5 000 poulets","Ovin 50 brebis Ladoum","Transformation basique"],
    bat_detail:"Avicole 400m² amélioré (16M) + Bergerie 150m² (9M) + Hangar transfo 100m² (5M) + Bureau+Logements 60m² amélioré (8M) + Clôture 700ml (3,5M) = 41,5M",
    bat_total:41500000,
    budget:[
      {k:"Foncier 3 ha Niayes",v:9000000}, {k:"2 forages Grundfos + panneaux",v:12000000},
      {k:"Irrigation goutte-à-goutte 3ha",v:4500000}, {k:"Avicole 400m² amélioré",v:16000000},
      {k:"Bergerie 150m² amélioré",v:9000000}, {k:"Hangar transformation 100m²",v:5000000},
      {k:"Bureau+Logements 60m² amélioré",v:8000000}, {k:"Clôture 700ml",v:3500000},
      {k:"Chambre froide 10m³",v:5000000}, {k:"Véhicule réfrigéré occasion",v:7000000},
      {k:"Tricycle neuf",v:1500000}, {k:"Cheptel 50 brebis Ladoum pures",v:4500000},
      {k:"Lot 5 000 poulets + aliment",v:5500000},
      {k:"Semences + intrants 3ha",v:2500000}, {k:"Admin + certifications + SARL",v:1200000},
      {k:"Fonds de roulement",v:15000000},
    ],
    revenus:[
      {fili:"🥬 Maraîchage 3ha + export",a1:22000000,a2:36000000,a3:50000000},
      {fili:"🐓 Aviculture",a1:8000000,a2:11000000,a3:13000000},
      {fili:"🐑 Ovin Ladoum + reproducteurs",a1:8000000,a2:16000000,a3:25000000},
      {fili:"🏭 Transformation + conditionnement",a1:1000000,a2:3000000,a3:5000000},
    ],
    charges:[
      {ch:"Intrants + aliment + vét.",a1:14000000,a2:18000000,a3:22000000},
      {ch:"Salaires (22 permanents)",a1:16800000,a2:19200000,a3:21600000},
      {ch:"Transport + logistique réfrigérée",a1:3500000,a2:4500000,a3:5500000},
      {ch:"Énergie + maintenance",a1:1500000,a2:1800000,a3:2000000},
      {ch:"Assurances + frais fixes + certifications",a1:1500000,a2:1800000,a3:2100000},
    ],
    emplois:28, payback:2.9, recommande:false,
    verdict:"PME agro-industrielle complète. Accès marchés institutionnels (hôtels 5*, restauration collective). Net An3 ~40M FCFA. Nécessite équipe de direction (directeur + commercial + comptable).",
    forceA:"Net An3 ~ 40M FCFA", forceB:"Export CEDEAO + hôtels 5*", forceC:"Chambre froide → accès premium",
    faibA:"Complexité managériale maximale", faibB:"Capital immobilisé 120M", faibC:"Besoin équipe direction",
  },
];

// ─── MARCHÉ ───────────────────────────────────────────────────────────────────
const MARCHE_DATA = {
  oignon:{
    prix:[{mois:"Nov",min:150,max:250},{mois:"Déc",min:200,max:350},{mois:"Jan",min:180,max:300},{mois:"Fév",min:160,max:280},{mois:"Mar",min:150,max:250},{mois:"Avr",min:200,max:350},{mois:"Mai",min:300,max:500},{mois:"Juin",min:450,max:700},{mois:"Juil",min:500,max:800},{mois:"Aoû",min:550,max:850},{mois:"Sep",min:400,max:650},{mois:"Oct",min:250,max:400}],
    importations:"100 000 tonnes/an importées (Pakistan, Maroc, Pays-Bas) malgré production locale. Prix local Nov-Avr (récolte) : 150-350 FCFA/kg. Hors-saison juin-sept : 500-850 FCFA/kg (+200 à 300%). Stratégie de stockage = levier ×3 sur le même produit.",
    clients:["Marchés locaux (bana-bana)", "Grossistes Dakar (Sandaga, Tilène)", "Restaurants et traiteurs", "Exportateurs CEDEAO (Guinée, Mali)"],
    opportunite:"Stockage 3 mois dans hangar ventilé sec = vente en juin–août à 3× le prix de récolte. C'est le levier financier le plus puissant de l'exploitation.",
  },
  tomate:{
    prix:[{mois:"Oct",min:150,max:300},{mois:"Nov",min:200,max:400},{mois:"Déc",min:200,max:350},{mois:"Jan",min:180,max:320},{mois:"Fév",min:150,max:280},{mois:"Mar",min:150,max:250},{mois:"Avr",min:200,max:400},{mois:"Mai",min:300,max:600},{mois:"Juin",min:400,max:700},{mois:"Juil",min:300,max:550},{mois:"Aoû",min:250,max:500},{mois:"Sep",min:200,max:400}],
    importations:"Tomate concentrée importée (Italie, Chine) : 35 000 tonnes/an. Tomate fraîche = 100% locale. Prix très saisonniers — saison sèche (fév–avr) = abondance et prix plancher.",
    clients:["Grossistes Dakar", "Restaurants", "Ménages (consommation directe)", "Transformateurs locaux (purée artisanale)"],
    opportunite:"Cultures hors-saison en irrigué (juillet–septembre) quand la production pluviale s'arrête = prix 3× supérieurs. Restaurants = prix stables sur contrat.",
  },
  volaille:{
    prix:[{mois:"Jan",min:1800,max:2200},{mois:"Mar",min:1700,max:2000},{mois:"Mai",min:1800,max:2200},{mois:"Juil",min:2000,max:2600},{mois:"Sep",min:1900,max:2400},{mois:"Oct",min:2000,max:2500},{mois:"Nov",min:2200,max:2800},{mois:"Déc",min:2500,max:3500}],
    importations:"Cuisses de poulet congelées Brésil/EU : 40 000 t/an. Poulet frais local = pas de concurrence directe (marchés différents). SEDIMA (leader) = 35% du marché industriel.",
    clients:["Grossistes vivants (marché de Thiaroye)", "Restaurants mid-range", "Particuliers (livraison directe)", "Chaînes restauration (Sodexo, cantines)"],
    opportunite:"Poulet fermier (élevage non industriel) = +35% prix vs SEDIMA. Pic décembre (fêtes) = 3 500 FCFA/kg. Caler fin de cycle pour coïncider avec les fêtes.",
  },
  ovin:{
    prix:[{mois:"Normal",min:120000,max:200000},{mois:"Avant Tabaski",min:200000,max:400000},{mois:"Tabaski",min:250000,max:500000},{mois:"Post-Tabaski",min:80000,max:150000},{mois:"Mariage/Baptême",min:130000,max:220000}],
    importations:"200 000–300 000 têtes/an importées (Mali, Mauritanie, Burkina) = bas de gamme seulement. Mouton Ladoum = 100% local, pas de concurrence à l'import.",
    clients:["Familles (Tabaski direct)", "Éleveurs naisseurs (reproducteurs)", "Abattoirs + boucheries", "Cadres + classe moyenne (Ladoum premium)"],
    opportunite:"Bélier Ladoum reproducteur = 500K–2M FCFA. Instagram élevage = canal de vente premium à coût zéro. Embouche 60–90j avant Tabaski : +15–25 kg → ×2,5 le prix d'achat.",
  },
};

const SEGMENTS = [
  {nom:"Marchés locaux & bana-bana",marge:"Faible",accessibilite:5,marge_s:1,volume:5,timing:"Immédiat",desc:"Volume maximal, prix minimal. Écoulement de surplus uniquement.",color:C.muted},
  {nom:"Grossistes Dakar (Sandaga, Tilène)",marge:"Moyenne",accessibilite:4,marge_s:2,volume:4,timing:"Immédiat",desc:"Contrat hebdomadaire. Volume important mais négociation serrée.",color:C.accentLight},
  {nom:"Restaurants mid-range",marge:"Haute",accessibilite:3,marge_s:3,volume:3,timing:"3–6 mois",desc:"Prix +25–35% vs grossiste. Contrat annuel. Cœur de la stratégie.",color:C.p30},
  {nom:"WhatsApp B2C (familles aisées)",marge:"Très haute",accessibilite:3,marge_s:4,volume:2,timing:"3–6 mois",desc:"Marge +50–80%. Paiement Wave immédiat. Zéro intermédiaire.",color:C.p50},
  {nom:"Tabaski (ovins directs)",marge:"Très haute",accessibilite:4,marge_s:5,volume:3,timing:"Annuel",desc:"3–7M FCFA en 2 semaines. Instagram = carnet de commandes pré-rempli.",color:C.gold},
  {nom:"Hôtels Saly / Dakar",marge:"Maximale",accessibilite:2,marge_s:5,volume:2,timing:"12–24 mois",desc:"Prix +40–60%. Contrat annuel stable. Exige chambre froide + traçabilité.",color:C.cyan},
  {nom:"Export CEDEAO (Guinée, Mali)",marge:"Haute",accessibilite:2,marge_s:4,volume:4,timing:"24+ mois",desc:"Volume massif (camion complet = 5t min). Prix +40% vs local. Certificat phyto requis.",color:C.p80},
];

// ─── UTILS ───────────────────────────────────────────────────────────────────
function computePL(p) {
  const ca = k => p.revenus.reduce((s,r)=>s+r[k],0);
  const ch = k => p.charges.reduce((s,c)=>s+c[k],0);
  const net = k => ca(k)-ch(k);
  return {
    ca1:ca("a1"),ca2:ca("a2"),ca3:ca("a3"),
    ch1:ch("a1"),ch2:ch("a2"),ch3:ch("a3"),
    net1:net("a1"),net2:net("a2"),net3:net("a3"),
  };
}

const ttip = { contentStyle:{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"5px"}, labelStyle:{color:C.accentLight,fontFamily:F.m}, formatter:(v)=>[fmtM(v)+" FCFA",""] };

// ─── TAB 1 : COMPARAISON ROI ──────────────────────────────────────────────────
function TabROI() {
  const [sel, setSel] = useState(1);
  const lv = PALIERS[sel];
  const pl = computePL(lv);
  const cumul3 = pl.net1+pl.net2+pl.net3;
  const roi3 = Math.round(cumul3/lv.capital/1000000*100);

  const chartData = PALIERS.map(p=>{
    const pl_ = computePL(p);
    const c3 = pl_.net1+pl_.net2+pl_.net3;
    return {
      label:p.label,
      roi:Math.round(c3/p.capital/1000000*100),
      net3:pl_.net3/1000000,
      payback:p.payback,
      capital:p.capital,
      marge:Math.round(pl_.net3/(pl_.ca3)*100),
    };
  });

  return (
    <div>
      <h2 style={S.h2}>Comparaison ROI — 5 Paliers de Capital</h2>
      <div style={S.alert(C.cyan)}>
        <strong>Zone révisée : Niayes Mboro intérieur (palier 30M).</strong> Forage 50 000 FCFA/ml — nappe Niayes 12m = 600K (vs Thiès 45m = 2,25M). Foncier Niayes 3,5M/ha compensé par économie forage. Capital cible 30M révisé à 32–33M. Construction rurale bottom-up ANSD fév. 2026.
      </div>

      {/* Charts */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1.25rem"}}>
        <div style={S.card}>
          <h3 style={S.h3}>ROI cumulé 3 ans (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridC} />
              <XAxis dataKey="label" tick={{fill:textC,fontSize:11,fontFamily:F.m}} />
              <YAxis tick={{fill:textC,fontSize:11,fontFamily:F.m}} tickFormatter={v=>v+"%"} />
              <Tooltip {...ttip} formatter={(v)=>[v+"%",""]} />
              <Bar dataKey="roi" name="ROI 3 ans" fill={C.accent} radius={[3,3,0,0]}
                label={{position:"top",fill:C.accentLight,fontSize:10,fontFamily:F.m,formatter:v=>v+"%"}} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={S.card}>
          <h3 style={S.h3}>Résultat Net An 3 (M FCFA)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridC} />
              <XAxis dataKey="label" tick={{fill:textC,fontSize:11,fontFamily:F.m}} />
              <YAxis tick={{fill:textC,fontSize:11,fontFamily:F.m}} tickFormatter={v=>v+"M"} />
              <Tooltip {...ttip} formatter={(v)=>[v.toFixed(1)+"M FCFA",""]} />
              <Bar dataKey="net3" name="Net An 3" fill={C.greenLight} radius={[3,3,0,0]}
                label={{position:"top",fill:C.greenLight,fontSize:10,fontFamily:F.m,formatter:v=>v.toFixed(1)+"M"}} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tableau comparatif */}
      <div style={S.card}>
        <h3 style={S.h3}>Tableau synthétique — tous paliers</h3>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.83rem",minWidth:"750px"}}>
            <thead>
              <tr>
                {["Palier","Tag","Surface","Construction","CA An3","Net An3","Marge","Payback","ROI 3ans","Emplois"].map(h=>(
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PALIERS.map((p,i)=>{
                const pl_=computePL(p);
                const c3_=pl_.net1+pl_.net2+pl_.net3;
                const roi_=Math.round(c3_/p.capital/1000000*100);
                const marge_=Math.round(pl_.net3/pl_.ca3*100);
                return (
                  <tr key={p.id} style={{background:sel===p.id?"#1e2f20":i%2===0?C.card:C.surface,cursor:"pointer"}} onClick={()=>setSel(p.id)}>
                    <td style={{...S.td,color:p.color,fontWeight:"bold"}}>{p.icon} {p.label}</td>
                    <td style={S.td}><span style={S.pill(p.color)}>{p.tag}</span></td>
                    <td style={S.tdM}>{p.surface}</td>
                    <td style={{...S.tdR,color:p.bat_total>p.capital*1000000*0.5?C.red:C.text}}>{fmtM(p.bat_total)}</td>
                    <td style={{...S.tdR,color:C.cyan}}>{fmtM(pl_.ca3)}</td>
                    <td style={{...S.tdR,color:p.color,fontWeight:"bold"}}>{fmtM(pl_.net3)}</td>
                    <td style={{...S.tdR,color:marge_>=40?C.greenLight:marge_>=35?C.accentLight:C.muted}}>{marge_}%</td>
                    <td style={{...S.tdR,color:p.payback<=3.5?C.greenLight:p.payback<=5?C.accentLight:C.red}}>{p.payback} ans</td>
                    <td style={{...S.tdR,color:roi_>=65?C.greenLight:roi_>=40?C.accentLight:C.muted,fontWeight:"bold"}}>{roi_}%</td>
                    <td style={{...S.tdR,color:C.muted}}>{p.emplois}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sélecteur détail */}
      <div style={{display:"flex",gap:"0.5rem",marginBottom:"1rem",flexWrap:"wrap"}}>
        {PALIERS.map(p=>(
          <button key={p.id} onClick={()=>setSel(p.id)} style={{
            padding:"0.45rem 0.9rem",border:`1px solid ${sel===p.id?p.color:C.border}`,
            background:sel===p.id?p.color+"22":C.card,color:sel===p.id?p.color:C.muted,
            fontFamily:F.m,fontSize:"0.78rem",cursor:"pointer",borderRadius:"4px",fontWeight:sel===p.id?"bold":"normal",
          }}>{p.icon} {p.label}</button>
        ))}
      </div>

      <div style={{...S.card,borderTop:`3px solid ${lv.color}`}}>
        <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom:"1rem"}}>
          <div>
            {lv.recommande&&<span style={{...S.pill(C.greenLight),marginBottom:"0.35rem",display:"block"}}>Recommandé</span>}
            <div style={{fontSize:"1.4rem",fontWeight:"bold",color:lv.color,fontFamily:F.m}}>{lv.label}</div>
            <div style={{fontSize:"0.85rem",color:C.muted,fontFamily:F.m}}>{lv.zone}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.6rem"}}>
            {[{l:"Net An 3",v:fmtM(pl.net3)+" FCFA",c:lv.color},{l:"ROI 3 ans",v:roi3+"%",c:C.accentLight},{l:"Payback",v:lv.payback+" ans",c:C.cyan}].map(k=>(
              <div key={k.l} style={S.kpi(k.c)}>
                <span style={S.kpiV(k.c)}>{k.v}</span>
                <span style={S.kpiL}>{k.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
          <div>
            <h3 style={S.h3}>Forces</h3>
            {[lv.forceA,lv.forceB,lv.forceC].map(f=><div key={f} style={{display:"flex",gap:"0.5rem",marginBottom:"0.35rem"}}><span style={{color:C.greenLight,flexShrink:0}}>+</span><span style={{fontSize:"0.85rem",color:C.textMuted}}>{f}</span></div>)}
            <h3 style={{...S.h3,color:C.red}}>Faiblesses</h3>
            {[lv.faibA,lv.faibB,lv.faibC].map(f=><div key={f} style={{display:"flex",gap:"0.5rem",marginBottom:"0.35rem"}}><span style={{color:C.red,flexShrink:0}}>−</span><span style={{fontSize:"0.85rem",color:C.textMuted}}>{f}</span></div>)}
          </div>
          <div>
            <h3 style={S.h3}>P&L simplifié (M FCFA)</h3>
            {[["CA An 1",pl.ca1],[" Net An 1",pl.net1],["CA An 2",pl.ca2],[" Net An 2",pl.net2],["CA An 3",pl.ca3],[" Net An 3",pl.net3],["Cumul net 3 ans",cumul3]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"0.28rem 0",borderBottom:`1px solid ${C.border}`,fontSize:"0.82rem"}}>
                <span style={{color:k.includes("Net")||k.includes("Cumul")?C.textMuted:C.muted,paddingLeft:k.startsWith(" ")?"1rem":"0"}}>{k.trim()}</span>
                <strong style={{color:k.includes("Net")||k.includes("Cumul")?lv.color:C.cyan,fontFamily:F.m}}>{fmtM(v)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div style={{...S.alert(lv.color),marginTop:"0.85rem",marginBottom:0}}>
          <strong>Verdict : </strong>{lv.verdict}
        </div>
      </div>
    </div>
  );
}

// ─── TAB 2 : MARCHÉ MARAÎCHAGE ────────────────────────────────────────────────
function TabMara() {
  const [culture, setCulture] = useState("oignon");
  const d = MARCHE_DATA[culture];
  const cultures = [{id:"oignon",label:"🧅 Oignon"},{id:"tomate",label:"🍅 Tomate"},{id:"volaille",label:"🐓 Volaille"},{id:"ovin",label:"🐑 Ovin"}];
  const maxPrice = Math.max(...d.prix.map(p=>p.max));

  return (
    <div>
      <h2 style={S.h2}>Étude de Marché — Demande & Prix par Filière</h2>

      {/* Macro */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"0.75rem",marginBottom:"1.4rem"}}>
        {[
          {v:"200 Mds FCFA",l:"Marché légumes Dakar/an",c:C.greenLight},
          {v:"100 000 t",l:"Oignons importés/an",c:C.accentLight},
          {v:"+8%/an",l:"Croissance marché volaille",c:C.cyan},
          {v:"700 000+",l:"Ovins Tabaski/an",c:C.gold},
          {v:"+7%/an",l:"PIB Sénégal 2026",c:C.p80},
          {v:"130 Mds",l:"Subventions intrants 2025-26",c:C.p30},
        ].map(k=>(
          <div key={k.l} style={S.kpi(k.c)}>
            <span style={S.kpiV(k.c)}>{k.v}</span>
            <span style={S.kpiL}>{k.l}</span>
          </div>
        ))}
      </div>

      {/* Selector culture */}
      <div style={{display:"flex",gap:"0.5rem",marginBottom:"1.25rem"}}>
        {cultures.map(c=>(
          <button key={c.id} onClick={()=>setCulture(c.id)} style={{
            flex:1,padding:"0.5rem",border:`1px solid ${culture===c.id?C.accentLight:C.border}`,
            background:culture===c.id?"#1e2f20":C.card,color:culture===c.id?C.accentLight:C.muted,
            fontFamily:F.m,fontSize:"0.82rem",cursor:"pointer",borderRadius:"4px",
          }}>{c.label}</button>
        ))}
      </div>

      <div style={S.card}>
        <h3 style={S.h3}>Saisonnalité des prix (FCFA/{culture==="ovin"?"tête":"kg"})</h3>
        <div style={{display:"flex",gap:"3px",alignItems:"flex-end",height:"110px",marginBottom:"0.6rem"}}>
          {d.prix.map(({mois,min,max})=>(
            <div key={mois} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
              <div style={{width:"100%",background:max/maxPrice>0.65?C.accent:C.green,height:`${max/maxPrice*100}%`,borderRadius:"3px 3px 0 0",minHeight:"4px"}}/>
              <div style={{width:"100%",background:C.border,height:"2px"}}/>
              <span style={{fontSize:"0.58rem",color:C.muted,fontFamily:F.m,textAlign:"center",lineHeight:1.1}}>{mois}</span>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:"1rem",fontSize:"0.75rem",color:C.muted,marginBottom:"0.85rem"}}>
          <span>Min : <strong style={{color:C.greenLight}}>{fmt(Math.min(...d.prix.map(p=>p.min)))} FCFA</strong></span>
          <span>Max : <strong style={{color:C.accent}}>{fmt(Math.max(...d.prix.map(p=>p.max)))} FCFA</strong></span>
          <span>Rapport max/min : <strong style={{color:C.accentLight}}>×{(Math.max(...d.prix.map(p=>p.max))/Math.min(...d.prix.map(p=>p.min))).toFixed(1)}</strong></span>
        </div>

        <h3 style={S.h3}>Contexte marché</h3>
        <p style={{fontSize:"0.87rem",color:C.textMuted,lineHeight:1.7,marginBottom:"0.85rem"}}>{d.importations}</p>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
          <div>
            <h3 style={S.h3}>Clients prioritaires</h3>
            {d.clients.map(c=><div key={c} style={{display:"flex",gap:"0.5rem",marginBottom:"0.3rem"}}><span style={{color:C.accent,flexShrink:0}}>→</span><span style={{fontSize:"0.84rem",color:C.textMuted}}>{c}</span></div>)}
          </div>
          <div style={{...S.alert(C.accentLight),alignSelf:"start",marginBottom:0}}>
            <strong>Opportunité clé : </strong>{d.opportunite}
          </div>
        </div>
      </div>

      {/* Segments clients */}
      <div style={S.card}>
        <h3 style={S.h3}>Analyse des segments — Accessibilité vs Marge</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"0.75rem"}}>
          {SEGMENTS.map(s=>(
            <div key={s.nom} style={{background:C.surface,border:`1px solid ${C.border}`,borderTop:`3px solid ${s.color}`,borderRadius:"6px",padding:"0.85rem"}}>
              <div style={{fontWeight:"bold",color:C.sand,fontSize:"0.88rem",marginBottom:"0.25rem"}}>{s.nom}</div>
              <span style={S.pill(s.color)}>{s.timing}</span>
              <div style={{marginTop:"0.6rem"}}>
                {[["Accessibilité",s.accessibilite],["Marge",s.marge_s],["Volume",s.volume]].map(([l,v])=>(
                  <div key={l} style={{marginBottom:"0.3rem"}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.7rem",marginBottom:"0.1rem"}}>
                      <span style={{color:C.muted,fontFamily:F.m}}>{l}</span>
                      <span style={{color:s.color}}>{"★".repeat(v)}{"☆".repeat(5-v)}</span>
                    </div>
                    <div style={{height:"4px",background:C.border,borderRadius:"2px"}}>
                      <div style={{height:"100%",width:`${v/5*100}%`,background:s.color,borderRadius:"2px"}}/>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{fontSize:"0.78rem",color:C.muted,marginTop:"0.5rem",lineHeight:1.4,marginBottom:0}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TAB 3 : ZONES & FONCIER ─────────────────────────────────────────────────
function TabZones() {
  const zones = [
    {nom:"Niayes — Mboro intérieur (5–10km côte)", score:94, foncier:"3–3,5 M FCFA/ha", eau:"Nappe 8–15m · forage 12m = 600K", dakar:"80–110 km", infra:"Route nationale + électricité + réseau maraîchers", color:C.greenLight,
      avantages:["Forage très court (12m) = 600K FCFA — économie 1,3–2,3M vs Thiès","Meilleur sol maraîcher du Sénégal","Nappe sub-permanente = autonomie eau garantie","Microclimat frais favorable","Réseau d'éleveurs Ladoum sur place"],
      inconvenients:["Foncier élevé (3–3,5M/ha) — choisir Mboro ou Lompoul, pas bord de mer","Salinisation côtière à éviter (parcelles basses)","Pression foncière croissante"],
      ideal:["✅ Recommandé pour 30M — forage court compense foncier","Maraîchage export CEDEAO An 3","Ovin Ladoum (écosystème local)"],
    },
    {nom:"Sindia / Mbour arrière-pays", score:84, foncier:"2–3 M FCFA/ha", eau:"Nappe 20–40m · forage 30m = 1,5M", dakar:"70–85 km via A1", infra:"Autoroute A1 + hôtels Saly 15 km", color:C.accentLight,
      avantages:["Foncier moins cher (+1,5M d'économie vs Niayes)","Autoroute A1 = Dakar en 1h","Hôtels Saly 10–15 km = B2B premium An 2","Total foncier+eau équivalent aux Niayes"],
      inconvenients:["Forage 30m = 1,5M (vs 600K en Niayes)","Sol sableux — amendement organique nécessaire","Pas d'écosystème maraîcher structuré"],
      ideal:["✅ Bon choix si hôtels Saly priorité An 2","Coût total foncier+eau identique aux Niayes","Autoroute A1 = logistique Dakar simplifiée"],
    },
    {nom:"Thiès / axe Tivaouane", score:68, foncier:"1,5–2,5 M FCFA/ha", eau:"Nappe 30–60m · forage 45m = 2,25M", dakar:"70–90 km", infra:"Route nationale + ville Thiès (300 000 hab)", color:C.accent,
      avantages:["Foncier le moins cher","Marché local Thiès","Artisans et MO abondants"],
      inconvenients:["Forage 45m (médiane) = 2,25M → annule l'avantage foncier","Pire cas 60m = 3M → total foncier+eau = 9,5M (le plus cher)","Sol moins fertile que Niayes","Réseau maraîchers peu développé"],
      ideal:["⚠️ Réévalué à la baisse : avantage foncier annulé par forage profond","Pertinent uniquement aviculture/ovin intensif (moins d'eau)","Éviter pour maraîchage premium"],
    },
  ];
  return (
    <div>
      <h2 style={S.h2}>Zones d'Implantation & Foncier 2026</h2>
      <div style={S.alert(C.red)}>
        <strong>Rappel légal :</strong> Au Sénégal, la terre agricole rurale ne se vend pas (Loi sur le Domaine National 1964). Le seul titre sécurisé est le <strong>bail emphytéotique notarié</strong> (25–50 ans). Les prix ci-dessous correspondent au marché des droits d'affectation — confirmés par les annonces Expat-Dakar, CoinAfrique et Keur-Immo.
      </div>
      {zones.map(z=>(
        <div key={z.nom} style={{...S.card,borderLeft:`4px solid ${z.color}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"0.5rem",marginBottom:"0.85rem"}}>
            <div>
              <div style={{fontWeight:"bold",color:C.sand,fontSize:"1rem",fontFamily:F.d}}>{z.nom}</div>
              <div style={{color:C.muted,fontSize:"0.82rem",marginTop:"0.2rem"}}>
                Foncier : <strong style={{color:z.color}}>{z.foncier}</strong> · Eau : {z.eau} · Dakar : {z.dakar}
              </div>
            </div>
            <div style={{background:z.color+"22",border:`1px solid ${z.color}44`,borderRadius:"4px",padding:"0.4rem 0.8rem",textAlign:"center"}}>
              <div style={{fontSize:"1.3rem",fontWeight:"bold",color:z.color,fontFamily:F.m}}>{z.score}/100</div>
              <div style={{fontSize:"0.65rem",color:C.muted,fontFamily:F.m,textTransform:"uppercase"}}>Score global</div>
            </div>
          </div>
          <div style={{height:"6px",background:C.border,borderRadius:"3px",marginBottom:"1rem"}}>
            <div style={{height:"100%",width:`${z.score}%`,background:z.color,borderRadius:"3px"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"1rem"}}>
            <div>
              <h3 style={S.h3}>Avantages</h3>
              {z.avantages.map(a=><div key={a} style={{display:"flex",gap:"0.5rem",marginBottom:"0.35rem"}}><span style={{color:C.greenLight,flexShrink:0,fontSize:"0.8rem"}}>+</span><span style={{fontSize:"0.82rem",color:C.textMuted}}>{a}</span></div>)}
            </div>
            <div>
              <h3 style={{...S.h3,color:C.red}}>Inconvénients</h3>
              {z.inconvenients.map(a=><div key={a} style={{display:"flex",gap:"0.5rem",marginBottom:"0.35rem"}}><span style={{color:C.red,flexShrink:0,fontSize:"0.8rem"}}>−</span><span style={{fontSize:"0.82rem",color:C.textMuted}}>{a}</span></div>)}
            </div>
            <div>
              <h3 style={S.h3}>Idéal pour</h3>
              {z.ideal.map(a=><div key={a} style={{display:"flex",gap:"0.5rem",marginBottom:"0.35rem"}}><span style={{color:z.color,flexShrink:0,fontSize:"0.8rem"}}>→</span><span style={{fontSize:"0.82rem",color:C.textMuted}}>{a}</span></div>)}
            </div>
          </div>
        </div>
      ))}
      <div style={S.card}>
        <h3 style={S.h3}>Impact du foncier sur chaque palier de capital</h3>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.83rem",minWidth:"600px"}}>
            <thead><tr>
              <th style={S.th}>Capital</th>
              <th style={S.th}>Zone recommandée</th>
              <th style={S.thR}>Foncier (surface)</th>
              <th style={S.thR}>% du capital</th>
              <th style={S.th}>Impact</th>
            </tr></thead>
            <tbody>
              {[
                ["15M",C.p15,"Thiès (0,5 ha)","1M","7%","Thiès reste pertinent à 15M — forage 40m = 2M, total foncier+eau = 3M, tolérable."],
                ["30M",C.p30,"Niayes Mboro (1 ha)","3,5M","11%","Forage 12m (600K) compense le foncier élevé. Total foncier+eau = 7,4M ≈ Thiès médiane."],
                ["50M",C.p50,"Niayes (1,5 ha)","4,5M","9%","Raisonnable. Nappe courte + qualité agronomique Niayes = ROI supérieur."],
                ["80M",C.p80,"Niayes (2 ha)","6M","7,5%","Bon ratio. Deux forages courts (2×12m) vs un profond."],
                ["120M",C.p120,"Niayes (3 ha)","9M","7,5%","Économies d'échelle foncière (2,5–3M/ha en volume)."],
              ].map(([cap,col,zone,fon,pct,imp])=>(
                <tr key={cap}>
                  <td style={{...S.td,color:col,fontWeight:"bold"}}>{cap}</td>
                  <td style={S.tdM}>{zone}</td>
                  <td style={{...S.tdR,color:C.accentLight}}>{fon}</td>
                  <td style={{...S.tdR,color:C.muted}}>{pct}</td>
                  <td style={S.tdM}>{imp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── TAB 4 : MEILLEUR INVESTISSEMENT PAR CAPITAL ──────────────────────────────
function TabMeilleur() {
  const [sel, setSel] = useState(1);
  const lv = PALIERS[sel];
  const totalBudget = lv.budget.reduce((s,b)=>s+b.v,0);
  const pl = computePL(lv);

  return (
    <div>
      <h2 style={S.h2}>Meilleur Investissement par Capital — Détail Complet</h2>

      <div style={{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",flexWrap:"wrap"}}>
        {PALIERS.map(p=>(
          <button key={p.id} onClick={()=>setSel(p.id)} style={{
            padding:"0.5rem 1rem",border:`1px solid ${sel===p.id?p.color:C.border}`,
            background:sel===p.id?p.color+"22":C.card,color:sel===p.id?p.color:C.muted,
            fontFamily:F.m,fontSize:"0.82rem",cursor:"pointer",borderRadius:"4px",fontWeight:sel===p.id?"bold":"normal",
          }}>{lv.id===p.id?<strong>{p.icon} {p.label}</strong>:`${p.icon} ${p.label}`}</button>
        ))}
      </div>

      <div style={{...S.card,borderTop:`3px solid ${lv.color}`}}>
        {lv.recommande&&<div style={{...S.alert(C.greenLight),marginBottom:"0.85rem"}}><strong style={{color:C.greenLight}}>✅ Recommandé — Meilleur ROI de la gamme</strong> — {lv.verdict}</div>}
        {!lv.recommande&&<div style={{...S.alert(lv.color)}}><strong style={{color:lv.color}}>Verdict :</strong> {lv.verdict}</div>}

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
          {/* Budget */}
          <div>
            <h3 style={S.h3}>Budget investissement détaillé</h3>
            {lv.budget.map(b=>(
              <div key={b.k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.32rem 0",borderBottom:`1px solid ${C.border}`,fontSize:"0.82rem",gap:"0.5rem"}}>
                <span style={{color:C.muted,flex:1}}>{b.k}</span>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem",flexShrink:0}}>
                  <div style={{width:"50px",height:"4px",background:C.border,borderRadius:"2px"}}>
                    <div style={{height:"100%",width:`${b.v/totalBudget*100}%`,background:lv.color,borderRadius:"2px"}}/>
                  </div>
                  <strong style={{color:lv.color,fontFamily:F.m,fontSize:"0.8rem",minWidth:"50px",textAlign:"right"}}>{fmtM(b.v)}</strong>
                </div>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",padding:"0.45rem 0",fontWeight:"bold",fontSize:"0.88rem"}}>
              <span style={{color:C.accentLight}}>Total</span>
              <span style={{color:lv.color,fontFamily:F.m}}>{fmtM(totalBudget)}</span>
            </div>
          </div>

          {/* P&L */}
          <div>
            <h3 style={S.h3}>Compte de résultat — 3 ans</h3>
            {[
              {k:"CA An 1",v:pl.ca1,c:C.cyan,bold:false},{k:" Net An 1",v:pl.net1,c:lv.color,bold:false},
              {k:"CA An 2",v:pl.ca2,c:C.cyan,bold:false},{k:" Net An 2",v:pl.net2,c:lv.color,bold:false},
              {k:"CA An 3",v:pl.ca3,c:C.cyan,bold:true},{k:" Net An 3",v:pl.net3,c:lv.color,bold:true},
              {k:"Marge An 3",v:Math.round(pl.net3/pl.ca3*100)+"%",c:C.accentLight,bold:false,str:true},
              {k:"Cumul net 3 ans",v:pl.net1+pl.net2+pl.net3,c:C.greenLight,bold:true},
            ].map(r=>(
              <div key={r.k} style={{display:"flex",justifyContent:"space-between",padding:"0.3rem 0",borderBottom:`1px solid ${C.border}`,fontSize:r.bold?"0.9rem":"0.82rem",fontWeight:r.bold?"bold":"normal"}}>
                <span style={{color:C.muted,paddingLeft:r.k.startsWith(" ")?"1rem":"0"}}>{r.k.trim()}</span>
                <strong style={{color:r.c,fontFamily:F.m}}>{r.str?r.v:fmtM(r.v)}</strong>
              </div>
            ))}

            <h3 style={S.h3}>Filières</h3>
            {lv.filières.map(f=><div key={f} style={{...S.pill(lv.color),marginRight:"0.3rem",marginBottom:"0.3rem",display:"inline-block"}}>{f}</div>)}

            <h3 style={S.h3}>Infrastructure</h3>
            <p style={{fontSize:"0.82rem",color:C.textMuted,lineHeight:1.5,margin:0}}>{lv.bat_detail}</p>
          </div>
        </div>
      </div>

      {/* Bar chart revenus par filière */}
      <div style={S.card}>
        <h3 style={S.h3}>Évolution CA par filière — 3 ans</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={["An 1","An 2","An 3"].map((an,i)=>({an,...Object.fromEntries(lv.revenus.map(r=>[r.fili,r[["a1","a2","a3"][i]]/1000000]))}))} margin={{right:10}}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridC}/>
            <XAxis dataKey="an" tick={{fill:textC,fontSize:11,fontFamily:F.m}}/>
            <YAxis tick={{fill:textC,fontSize:11,fontFamily:F.m}} tickFormatter={v=>v+"M"}/>
            <Tooltip {...ttip} formatter={(v)=>[v.toFixed(1)+"M FCFA",""]}/>
            <Legend wrapperStyle={{fontSize:"0.78rem",fontFamily:F.m,color:textC}}/>
            {lv.revenus.map((r,i)=>(
              <Bar key={r.fili} dataKey={r.fili} stackId="a" fill={[C.greenLight,C.accent,C.gold,C.cyan][i]} radius={i===lv.revenus.length-1?[3,3,0,0]:[0,0,0,0]}/>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const TABS = [
  {label:"Comparaison ROI",C:TabROI},
  {label:"Marché & Demande",C:TabMara},
  {label:"Zones & Foncier",C:TabZones},
  {label:"Meilleur par capital",C:TabMeilleur},
];

export default function Comparaison() {
  const [active, setActive] = useState(0);
  const {C:Comp} = TABS[active];
  return (
    <div style={S.wrap}>
      <div style={S.header}>
        <div style={{display:"inline-block",background:C.accent,color:"#0f1a10",fontSize:"0.62rem",fontFamily:F.m,fontWeight:"bold",letterSpacing:"0.14em",padding:"0.2rem 0.7rem",borderRadius:"2px",marginBottom:"0.7rem",textTransform:"uppercase"}}>
          ROI & Marché · Sénégal 2026 · Coûts Ruraux Corrigés
        </div>
        <h1 style={{fontSize:"clamp(1.4rem,3.5vw,2rem)",fontWeight:"bold",color:C.text,margin:"0 0 0.4rem",fontFamily:F.d}}>
          Comparaison ROI & Étude de Marché 🇸🇳
        </h1>
        <p style={{color:C.muted,fontSize:"0.88rem",fontFamily:F.m,margin:"0 0 0.85rem"}}>
          5 paliers · Construction rurale bottom-up 2026 · Maraîchage · Aviculture · Élevage Ovin · Vision Sénégal 2050
        </p>
        <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
          {["30M = meilleur ROI (71%)","Avicole rural = 5–8M (corrigé)","Oignon hors-saison ×3","Tabaski 700 000+ ovins/an","Sources ANSD fév. 2026"].map(t=>(
            <span key={t} style={{background:"rgba(74,158,92,0.15)",border:"1px solid rgba(74,158,92,0.3)",color:C.greenLight,padding:"0.18rem 0.6rem",borderRadius:"20px",fontSize:"0.7rem",fontFamily:F.m}}>{t}</span>
          ))}
        </div>
      </div>
      <nav style={S.nav}>
        {TABS.map((t,i)=>(
          <button key={t.label} style={S.navBtn(i===active)} onClick={()=>setActive(i)}>{t.label}</button>
        ))}
      </nav>
      <div style={S.main}><Comp/></div>
    </div>
  );
}
