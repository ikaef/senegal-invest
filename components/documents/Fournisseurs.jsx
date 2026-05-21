'use client'
import { useState } from "react";

const C = {
  bg:"#0f1a10", surface:"#162018", card:"#1c2b1e", border:"#2a3d2c",
  accent:"#c8893a", accentLight:"#e8a84a",
  green:"#4a9e5c", greenLight:"#6dbf7e",
  sand:"#d4b896", muted:"#7a9b7d", text:"#e8ede9", textMuted:"#9ab59c",
  red:"#e07a7a", cyan:"#5ecfb8", blue:"#5a9eff", gold:"#d4a820",
  local:"#4a9e5c", europe:"#5a9eff", maroc:"#d4a820", chine:"#e07a7a", auto:"#5ecfb8",
};
const F = { d:"'Georgia','Times New Roman',serif", m:"'Courier New',monospace" };
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
  th:{ background:"#1e2f20", color:C.accent, padding:"0.5rem 0.65rem", textAlign:"left", fontFamily:F.m, fontSize:"0.67rem", letterSpacing:"0.08em", textTransform:"uppercase", borderBottom:`1px solid ${C.border}` },
  td:{ padding:"0.5rem 0.65rem", borderBottom:`1px solid ${C.border}`, color:C.text, verticalAlign:"top", fontSize:"0.83rem" },
  tdM:{ padding:"0.5rem 0.65rem", borderBottom:`1px solid ${C.border}`, color:C.muted, fontSize:"0.8rem", verticalAlign:"top" },
  pill:(c)=>({ display:"inline-block", background:(c||C.accent)+"22", color:c||C.accent, border:`1px solid ${(c||C.accent)}44`, padding:"0.15rem 0.55rem", borderRadius:"20px", fontSize:"0.7rem", fontFamily:F.m, fontWeight:"bold" }),
};

const ORIGINE_COLOR = { local:C.local, europe:C.europe, maroc:C.maroc, chine:C.chine, auto:C.auto };
const ORIGINE_LABEL = { local:"🇸🇳 Local", europe:"🇪🇺 Europe", maroc:"🇲🇦 Maroc", chine:"🇨🇳 Chine", auto:"🏭 Auto-prod." };

function Dots({ n, max=5, color }) {
  return (
    <div style={{display:"flex",gap:"3px",alignItems:"center"}}>
      {Array.from({length:max}).map((_,i)=>(
        <div key={i} style={{width:9,height:9,borderRadius:"50%",background:i<n?color:C.border,flexShrink:0}}/>
      ))}
      <span style={{color,fontFamily:F.m,fontSize:"0.72rem",marginLeft:"4px",fontWeight:"bold"}}>{n}/{max}</span>
    </div>
  );
}

const CATEGORIES = [
  {
    id:"semences", icon:"🌱", label:"Semences & Plants",
    resume:"Les semences représentent 8–12% des intrants mais conditionnent 100% du rendement. La règle : ne jamais sacrifier sur la qualité des semences. Priorité aux F1 hybrides pour les cultures premium, ISRA subventionné pour l'oignon de base.",
    fournisseurs:[
      {
        nom:"ISRA / PRACAS II", origine:"local", type:"Institution",
        produits:"Oignon Valencia 14, Yaakar, tomate Roma adaptée. Semences certifiées résistantes chaleur sénégalaise.",
        prix:"3 000–8 000 FCFA/kg (subventionné -60 à -80% vs marché). Via coopérative agréée uniquement.",
        acces:"Bureau à Saint-Louis + Dakar (Hann). Commande 4 mois avant campagne. Rupture de stock fréquente.",
        qualite:3, prix_score:5, dispo:3,
        avantages:["Prix imbattable grâce aux subventions","Adaptation locale prouvée (variétés testées 10+ ans)","Résistance conditions sahéliennes"],
        limites:["Stock limité — rupture courante","Catalogue restreint (peu de variétés F1)","Rendement inférieur aux hybrides européens"],
        conseil:"Sécuriser commande 4 mois avant campagne. Idéal pour oignon Valencia de base. Compléter avec Technisem pour les cultures premium.",
      },
      {
        nom:"Technisem / SETA", origine:"europe", type:"Bureau Dakar (France)",
        produits:"Catalogue F1 tropical complet : tomate (Caraïbo, Mongal), poivron (Kapral), oignon, melon, pastèque, aubergine. 300+ variétés.",
        prix:"Semences F1 : 35 000–120 000 FCFA/100g selon espèce. Tomate Caraïbo ≈ 45 000 FCFA/100g.",
        acces:"Bureau Dakar (Hann Maristes). Stock permanent. Livraison 48h Dakar. Paiement Wave/virement accepté.",
        qualite:5, prix_score:2, dispo:5,
        avantages:["Catalogue le plus complet d'AOF","Qualité F1 constante (germination 95%+)","Support agronomique inclus","Variétés testées au Sénégal"],
        limites:["Prix premium — le plus cher du marché","Pas de subvention accessible"],
        conseil:"RÉFÉRENCE pour poivron, tomate cerise, melon premium. ROI excellent : +40% rendement vs standard compense le coût.",
      },
      {
        nom:"Agrimaroc / SINCOMAR", origine:"maroc", type:"Import régional",
        produits:"Semences maraîchères adaptées climat méditerranéen–sahélien. Tomate, oignon, poivron, carotte. Marques leader Maroc.",
        prix:"15–35% moins cher que Technisem. Livraison Dakar avion Casablanca–Dakar (4–6j) ou camion (12–18j).",
        acces:"Via agents importateurs Dakar ou foires SIAM Meknès / FIDAGRI Dakar. Délai commande 2–4 semaines.",
        qualite:4, prix_score:4, dispo:4,
        avantages:["Bon rapport qualité/prix","Adaptation climat semi-aride prouvée","Livraison rapide (Casablanca–Dakar < 1 semaine avion)"],
        limites:["Moins de variétés F1 premium que Hollande","Réseau local Dakar moins structuré"],
        conseil:"Excellente alternative à Technisem pour oignon et carotte. Tester sur 0,5 ha avant de basculer.",
      },
      {
        nom:"Enza Zaden / Rijk Zwaan (Pays-Bas)", origine:"europe", type:"Import direct",
        produits:"Leader mondial semences maraîchères. Tomate résistante TYLCV, poivron, concombre. Standards export.",
        prix:"Import direct ou distributeur Dakar : 20–40% moins cher que Technisem pour mêmes gammes.",
        acces:"Via distributeur Dakar (Technisem les distribue partiellement) ou import direct ≥ 50 kg (MOQ). Délai 3–4 semaines avion.",
        qualite:5, prix_score:3, dispo:3,
        avantages:["Meilleure qualité génétique mondiale","Résistances maladies supérieures","Prix -30% vs revendeur local si MOQ atteint"],
        limites:["MOQ élevée pour commande directe","Documentation phytosanitaire à gérer","Délai import 3–4 semaines"],
        conseil:"Pertinent en An 2–3 quand les variétés fonctionnant sur votre sol sont identifiées. Grouper avec d'autres exploitants.",
      },
      {
        nom:"Alibaba / DHgate — Semences Chine", origine:"chine", type:"E-commerce",
        produits:"Semences génériques : tomate, laitue, radis, haricot, gombo. Volumes importants, prix très bas.",
        prix:"3–15 USD/100g soit -60 à -80% vs marché local Dakar.",
        acces:"Commande en ligne, livraison 15–30j. Paiement carte ou PayPal.",
        qualite:2, prix_score:5, dispo:4,
        avantages:["Prix très bas","Larges volumes disponibles"],
        limites:["Taux germination inconnu (risque 40–60%)","Pas de certificat phytosanitaire fiable","Interdit à l'import sans phytocertificat valide","Risque introduction maladies exotiques"],
        conseil:"⚠️ À ÉVITER pour cultures commerciales. Un taux de germination à 40% détruit la marge entière. Pour essais micro-parcelle uniquement.",
      },
    ],
    synthese:"Stratégie recommandée : ISRA subventionné pour oignon de base (≤ 50% surface) → Technisem pour cultures premium (poivron, tomate cerise) → tester Agrimaroc en An 2.",
    economie:"400K–1,2M FCFA/an vs 100% Technisem",
  },
  {
    id:"engrais", icon:"⚗️", label:"Engrais & Fertilisants",
    resume:"Le marché des engrais est dominé par l'importation (urée Russie/Biélorussie, phosphate Maroc). La grande opportunité est la combinaison fumier avicole (gratuit en exploitation intégrée) + OCP Maroc direct. L'État subventionne 50% des engrais via les coopératives agréées.",
    fournisseurs:[
      {
        nom:"Fumier avicole auto-produit", origine:"auto", type:"Auto-production",
        produits:"Fientes sèches compostées. 2 000 poulets × 6 cycles = ~24 t fumier/an. Couvre 60–80% besoins azote sur 1 ha.",
        prix:"Coût production : quasi zéro (main d'œuvre ramassage + 3 mois compostage). Valeur marchande : 5 000–8 000 FCFA/sac 40kg.",
        acces:"Production interne. Andains de compostage 90 jours. Épandage manuel ou mécanique.",
        qualite:4, prix_score:5, dispo:5,
        avantages:["Gratuit — économie 600K–1,2M FCFA/an","Améliore la structure du sol long terme","Cercle vertueux exploitation intégrée"],
        limites:["Nécessite compostage 90j obligatoire (risque pathogènes si frais)","Volume limité à la production avicole"],
        conseil:"PRIORITÉ N°1. Démarrer la filière fumier dès le premier cycle avicole. Investir 100–150K FCFA dans une aire de compostage bâchée.",
      },
      {
        nom:"Senchim / GMA (Dakar)", origine:"local", type:"Distributeur national",
        produits:"NPK 15-15-15, Urée 46%, superphosphate 46%, sulfate d'ammonium. Distribution nationale.",
        prix:"NPK 50kg : 22 000–27 000 FCFA. Urée 50kg : 18 000–22 000 FCFA. Subventionné via coopérative : -50%.",
        acces:"Dépôts dans toutes les régions. Paiement comptant ou crédit coopérative. Stock permanent.",
        qualite:4, prix_score:3, dispo:5,
        avantages:["Disponibilité immédiate partout","SAV francophone","Subventions État si coopérative agréée"],
        limites:["Prix retail élevé sans subvention","Stock limité en pointe (oct–nov)"],
        conseil:"Rejoindre une coopérative agricole pour accéder aux subventions État (50% du prix). Économie directe 500K–1M FCFA/an.",
      },
      {
        nom:"OCP Africa (Maroc)", origine:"maroc", type:"Import direct CEDEAO",
        produits:"DAP, TSP, NPK custom. OCP = 1er producteur mondial phosphate. Bureau à Dakar (OCP Africa).",
        prix:"DAP FOB Jorf : 480–520 USD/tonne. Rendu Dakar : 620–680 USD/t vs 750–900 USD retail local. -20 à 30%.",
        acces:"OCP Africa Dakar (ocpafrica.com). Achat groupé ≥ 5 tonnes. Paiement anticipé requis. Délai 3–5 semaines.",
        qualite:5, prix_score:4, dispo:4,
        avantages:["Qualité internationale certifiée","Prix direct usine -20 à 30%","Programme OCP Africa accompagnement agri"],
        limites:["MOQ 5 tonnes minimum","Paiement anticipé","Délai 3–5 semaines"],
        conseil:"Grouper commande avec 3–4 exploitants voisins. 1 camion Casablanca–Dakar amorti. Économie : 150–250K FCFA/tonne.",
      },
      {
        nom:"Yara International (via distributeurs)", origine:"europe", type:"Distributeur Dakar",
        produits:"YaraMila (NPK équilibré), YaraLiva (calcium-nitrate), YaraVita (engrais foliaires). Standard mondial horticulture.",
        prix:"YaraMila 50kg : 28 000–35 000 FCFA (+15 à 20% vs générique).",
        acces:"Distributeur officiel Dakar (Agri Dakar, SETA). Disponible en stock.",
        qualite:5, prix_score:2, dispo:4,
        avantages:["Formulations précises maraîchage intensif","Engrais foliaires = +15–25% rendement","Recommandations agronomiques disponibles"],
        limites:["Le plus cher du marché","Surqualité pour cultures standard"],
        conseil:"Réserver aux cultures haute valeur (poivron, tomate cerise). Inutile pour oignon standard.",
      },
      {
        nom:"Biostimulants acide humique — Chine (Alibaba)", origine:"chine", type:"Import direct",
        produits:"Acide humique 25kg, algues marines, acides aminés. Biostimulants non disponibles localement.",
        prix:"Acide humique : 12–18 USD/25kg vs 8 000–15 000 FCFA local. Économie 40–60%.",
        acces:"Alibaba.com, fournisseurs certifiés ISO. Min. 500 kg. Fret maritime 35–45j.",
        qualite:3, prix_score:5, dispo:3,
        avantages:["Prix -50% vs local","Gammes non disponibles au Sénégal"],
        limites:["Qualité variable selon fournisseur","Risque métaux lourds (exiger COA)","Délai 35–45j + douane"],
        conseil:"Pertinent An 2+. Exiger COA + ISO 9001. Tester 1 container avant engagement.",
      },
    ],
    synthese:"Stratégie : Fumier avicole propre (base, gratuit) + Senchim via coopérative (subventionné -50%) + OCP Maroc groupé pour phosphates. Yara uniquement sur cultures premium.",
    economie:"800K–2M FCFA/an vs 100% retail sans subvention",
  },
  {
    id:"irrigation", icon:"💧", label:"Irrigation & Pompage Solaire",
    resume:"C'est la catégorie où l'import direct génère les économies les plus massives. Un kit goutte-à-goutte 1 ha importé de Chine coûte 450K–700K FCFA vs 1,5–2M FCFA chez PERVAL. La pompe principale de forage doit rester européenne (fiabilité critique).",
    fournisseurs:[
      {
        nom:"Lorentz (Allemagne)", origine:"europe", type:"Référence mondiale",
        produits:"Pompes immergées solaires PS2/SCPS. Débit 2–8 m³/h. MPPT intégré. Garantie 3 ans.",
        prix:"Pack complet 3m³/h (pompe + panneaux 1,8kWc + câbles + contrôleur) : 2,8–3,8M FCFA livré Dakar.",
        acces:"Revendeurs agréés à Dakar. Installation par technicien certifié recommandée.",
        qualite:5, prix_score:2, dispo:4,
        avantages:["Durée de vie 12–15 ans (prouvée conditions sahéliennes)","Garantie 3 ans pièces et MO","MPPT = +20% débit vs pompes standard","Référence bancaire (CNCAS accepte en garantie)"],
        limites:["Prix premium (≈ ×2 vs Chine)","Délai remplacement pièces si import"],
        conseil:"RECOMMANDÉ pour la pompe principale de forage. Une panne en pleine campagne coûte une récolte entière (3–5M FCFA). La fiabilité justifie le surcoût.",
      },
      {
        nom:"Grundfos SQFlex (Danemark)", origine:"europe", type:"Alternative premium",
        produits:"Pompes immergées solaires SQFlex 2,5–11 L/s. Compatible solaire/éolien/réseau. Débit variable.",
        prix:"Pack 3m³/h : 2,5–3,5M FCFA. Légèrement moins cher que Lorentz.",
        acces:"Distributeur Dakar (Servelectro, ABB Sénégal). Délai 1–3 semaines.",
        qualite:5, prix_score:2, dispo:4,
        avantages:["Flexibilité multi-source énergie","Robustesse prouvée","Pièces plus disponibles localement que Lorentz"],
        limites:["Même gamme de prix que Lorentz","Installation technique requise"],
        conseil:"Alternative à Lorentz — comparer les deux devis et choisir selon disponibilité des pièces dans la zone.",
      },
      {
        nom:"PERVAL Sénégal (multi-marques)", origine:"local", type:"Distributeur Dakar",
        produits:"Tuyaux PEHD, raccords, goutteurs génériques, filtres, pompes surface. Stock permanent.",
        prix:"Tuyau PEHD 32mm : 2 800–3 500 FCFA/ml. Kit complet 1 ha (matériel seul) : 1,5–2M FCFA.",
        acces:"Zone industrielle Dakar. Livraison camion en régions. SAV francophone.",
        qualite:3, prix_score:3, dispo:5,
        avantages:["Stock immédiat — livraison 48h","Accompagnement pose disponible","SAV local francophone","Urgences couvertes"],
        limites:["Marges revendeur +30 à 50% vs import Chine","Qualité des générique variable"],
        conseil:"Utiliser pour raccords, pièces détachées urgentes et SAV. Pour matériel principal, comparer avec Chine direct.",
      },
      {
        nom:"Netafim (Israël) — via distributeurs", origine:"europe", type:"Premium mondial",
        produits:"Goutteurs Uniram, Dripline, filtres disques, vannes. Leader mondial irrigation précision.",
        prix:"Kit 1 ha posé : 2–2,8M FCFA. +30–50% vs générique Chine.",
        acces:"Distributeur agréé Dakar. Stock partiel. Délai 1–2 semaines.",
        qualite:5, prix_score:1, dispo:3,
        avantages:["Durabilité 10–15 ans garantie","Précision débit ±5%","Référence pour certifications export"],
        limites:["Le plus cher du marché","Investissement disproportionné pour cultures standard"],
        conseil:"Réserver au 3e hectare si objectif certification export ou label. En dessous, disproportionné.",
      },
      {
        nom:"Irrigation goutte-à-goutte — Chine (Alibaba)", origine:"chine", type:"Import direct 🔥",
        produits:"Tuyaux PE goutte-à-goutte, goutteurs 2–4 L/h, filtres disques, raccords PEHD. Fournisseurs : Ningbo Drip, Xinjiang Teno.",
        prix:"Kit complet 1 ha (tuyaux + goutteurs + filtres + raccords) : 450 000–700 000 FCFA rendu Dakar. -60 à -70% vs PERVAL.",
        acces:"Alibaba.com → 'drip irrigation system'. Container partagé LCL 180–250K FCFA de fret. Délai 40–55j.",
        qualite:3, prix_score:5, dispo:3,
        avantages:["Économie nette de 800K–1,5M FCFA sur 1 ha","Qualité acceptable (fournisseurs 4★+)","Très large choix"],
        limites:["Délai 40–55j (maritime)","Pas de SAV local","Risque goutteurs bouchés si qualité plastique médiocre"],
        conseil:"Commander échantillon 50m via DHL (100 USD) avant commande volume. Fournisseur ≥ 4★ + 300 transactions. Vérifier pression et débit.",
      },
      {
        nom:"Pompes solaires Leo/Franklin — Chine", origine:"chine", type:"Import direct",
        produits:"Pompes immergées solaires 3–5 m³/h. Marques Leo Pumps, QJD Solar.",
        prix:"Pack complet 3m³/h (pompe + 1,5kWc panneaux) : 850K–1,3M FCFA rendu Dakar. -55 à -65% vs Lorentz.",
        acces:"Via importateurs solaires Dakar (Baobab+, SunSen, Solaire Afrique) ou Alibaba + fret aérien.",
        qualite:3, prix_score:5, dispo:3,
        avantages:["Économie 1,5–2M vs Lorentz/Grundfos","Qualité Leo et Franklin OEM acceptable"],
        limites:["Durée de vie 5–7 ans vs 12–15 ans (européenne)","Garantie difficile à exercer","Pannes plus fréquentes en conditions extrêmes"],
        conseil:"Acceptable UNIQUEMENT pour pompe de BACKUP (non principale). La pompe forage principale doit rester européenne.",
      },
      {
        nom:"Panneaux solaires JA Solar / LONGi (via import.)", origine:"chine", type:"Standard mondial",
        produits:"Panneaux monocristallins 400–550 Wc. JA Solar et LONGi = qualité mondiale garantie (fabriqués Chine).",
        prix:"Via importateurs Dakar (Sunna Design, Baobab+) : 45 000–65 000 FCFA/unité. Import direct Alibaba : 30 000–45 000/unité.",
        acces:"Importateurs solaires Dakar en stock. Délai 1 semaine.",
        qualite:5, prix_score:4, dispo:4,
        avantages:["JA Solar / LONGi = qualité mondiale (garantie 25 ans)","Prix compétitif vs Europe","Pièces standards mondiaux"],
        limites:["Garantie difficile sans revendeur agréé","Import direct = fret maritime à organiser"],
        conseil:"Acheter JA Solar ou LONGi via importateur Dakar reconnu = meilleur compromis qualité/prix. Import direct pour > 20 panneaux.",
      },
    ],
    synthese:"Règle d'or : Pompe forage = Lorentz ou Grundfos européenne (critique). Réseau irrigation = Chine direct (économie 800K–1,5M FCFA). Panneaux = JA Solar ou LONGi via importateur Dakar.",
    economie:"1,5–2,5M FCFA sur l'investissement initial",
  },
  {
    id:"aviculture", icon:"🐓", label:"Aliment Volaille & Équipements",
    resume:"L'aliment représente 65–70% des charges variables avicoles. Chaque % d'économie a un impact direct sur la marge. L'ICR (indice de consommation réelle) est la métrique clé : un aliment légèrement plus cher avec un ICR meilleur peut être plus rentable.",
    fournisseurs:[
      {
        nom:"SEDIMA (Sénégal)", origine:"local", type:"Leader national",
        produits:"Aliment démarrage (J1–J10), croissance (J10–J28), finition (J28–abattage). Poussins Ross 308 / Cobb 500.",
        prix:"Aliment croissance 50kg : 19 000–22 000 FCFA. Poussins : 600–800 FCFA/poussin.",
        acces:"Points de vente Dakar + livraison régions. Contrat annuel possible.",
        qualite:4, prix_score:3, dispo:5,
        avantages:["Stock permanent — disponibilité garantie","Formulation adaptée climat sénégalais","Poussin qualité constante (souche Cobb)"],
        limites:["Quasi-monopole → pas de pression concurrentielle","Prix en hausse +8%/an depuis 2020"],
        conseil:"Incontournable pour les poussins. Négocier contrat annuel volume (2 000 sujets × 6 cycles = 23 t/an) pour remise 5–8%.",
      },
      {
        nom:"NMA Sanders (filiale française)", origine:"europe", type:"Premium",
        produits:"Aliment formulations françaises : starter, grower, finisher. ICR généralement meilleur que SEDIMA.",
        prix:"Légèrement plus cher : +1 500–3 000 FCFA/sac. ICR potentiel 1,7 vs 1,9 SEDIMA.",
        acces:"Dakar Ouest (Yoff). Délai 24–48h.",
        qualite:5, prix_score:2, dispo:3,
        avantages:["Formulation nutritionnelle supérieure","ICR amélioré = moins d'aliment pour même poids"],
        limites:["Prix premium","Moins disponible que SEDIMA"],
        conseil:"Tester 1 cycle complet vs SEDIMA. Si ICR passe de 1,9 à 1,7 → économie nette même à prix supérieur.",
      },
      {
        nom:"Fabrication aliment maison", origine:"auto", type:"Auto-production",
        produits:"Maïs + tourteau arachide + concentré protéique + prémix vitaminé. Coût revient 12 000–15 000 FCFA/50kg.",
        prix:"Économie 25–35% vs SEDIMA. Sur 2 000 sujets × 6 cycles → économie potentielle 1,5–2,5M FCFA/an.",
        acces:"Maïs (Casamance ou importé), tourteau (Diourbel), prémix (distributeurs Dakar). Mélangeur vertical 200kg requis (600–800K FCFA).",
        qualite:3, prix_score:5, dispo:3,
        avantages:["Économie 1,5–2,5M FCFA/an","Contrôle total de la formulation","Indépendance vis-à-vis de SEDIMA"],
        limites:["Investissement mélangeur (600–800K)","Risque mycotoxines si maïs mal stocké","Expertise nutri-volaille requise"],
        conseil:"Viable dès An 2–3 avec 3 000+ sujets. Consulter un nutritionniste volaille pour la formulation. Tester sur 1 cycle avant généralisation.",
      },
      {
        nom:"Vaccins LANAVET (Sénégal)", origine:"local", type:"Institutionnel",
        produits:"Newcastle La Sota, Gumboro D78, Bronchite H120. Prix réglementés par l'État.",
        prix:"Newcastle 1 000 doses : 5 000–8 000 FCFA. Gumboro 1 000 doses : 6 000–9 000 FCFA.",
        acces:"LANAVET Dakar (Hann) + dépôts régionaux vétérinaires. Chaîne du froid obligatoire.",
        qualite:4, prix_score:4, dispo:4,
        avantages:["Prix réglementés (pas de spéculation)","Chaîne du froid locale maîtrisée","Reconnu DIREL"],
        limites:["Rupture de stock possible en pointe — commander 2 mois avant"],
        conseil:"OBLIGATOIRE : Newcastle J7, Gumboro J14+J21. Stock 2 cycles d'avance dans réfrigérateur dédié vaccins.",
      },
      {
        nom:"Équipements avicoles — Chine (Henan Longmu)", origine:"chine", type:"Import direct 🔥",
        produits:"Mangeoires chaîne, abreuvoirs nipple, ventilateurs 50cm, éclairage LED rouge, thermomètres. OEM Big Dutchman.",
        prix:"Kit complet 2 000 sujets : 450 000–700 000 FCFA rendu Dakar vs 1,2–1,8M FCFA local.",
        acces:"Alibaba.com → 'poultry equipment'. Fret aérien recommandé pour électronique (~200kg). Délai 10–15j DHL.",
        qualite:3, prix_score:5, dispo:3,
        avantages:["Économie 700K–1,1M FCFA","Même technologie Big Dutchman (OEM)","Large catalogue"],
        limites:["Notices en chinois (traduction Google)","Pièces à anticiper (+20% en surplus)","Vérifier tension 220V/50Hz"],
        conseil:"TRÈS RECOMMANDÉ pour tout équipement non-critique. Commander 15% de pièces détachées en plus. Vérifier toujours la tension (220V 50Hz Sénégal).",
      },
    ],
    synthese:"Aliment : contrat SEDIMA négocié (-7%) + test NMA (1 cycle) + fabrication maison An 2–3. Vaccins : LANAVET obligatoire. Équipements : import Chine direct (économie 700K–1,1M).",
    economie:"1,2–3M FCFA/an selon volume",
  },
  {
    id:"ovin", icon:"🐑", label:"Génétique Ovine & Alimentation",
    resume:"L'enjeu n°1 de l'élevage ovin n'est pas le prix des intrants mais la génétique du cheptel. Un bélier Ladoum de qualité peut valoriser tout un troupeau en 2–3 générations. L'alimentation complémentaire se structure autour des ressources locales post-récolte.",
    fournisseurs:[
      {
        nom:"Éleveurs Peulh-Peulh (marchés ruraux)", origine:"local", type:"Race locale rustique",
        produits:"Brebis et agneaux Peulh-Peulh. Race rustique, très fertile (gémellité 20–30%), bonne croissance.",
        prix:"Brebis adulte : 60 000–120 000 FCFA. Bélier : 80 000–150 000 FCFA. Agnelles : 40 000–80 000 FCFA.",
        acces:"Marchés ruraux (Louga, Diourbel, Matam). Éleveurs Peulh locaux. Sans intermédiaire.",
        qualite:4, prix_score:5, dispo:5,
        avantages:["Résistance maladies supérieure aux races exotiques","Fertilité naturelle élevée","Frugalité alimentaire (pâturage)","Coût acquisition minimal"],
        limites:["Valorisation moins élevée que Ladoum sur marché premium","Croissance plus lente"],
        conseil:"BASE DU TROUPEAU pour capital 30M. 15 brebis Peulh = 1–1,8M FCFA seulement. Amélioration génétique via béliers Ladoum.",
      },
      {
        nom:"ANEL — Éleveurs Ladoum agréés", origine:"local", type:"Génétique premium",
        produits:"Béliers et brebis Ladoum avec pedigree certifié ANEL. Génétique la mieux valorisée du marché.",
        prix:"Brebis Ladoum pure : 250 000–600 000 FCFA. Bélier reproducteur lignée : 500 000–2 000 000 FCFA.",
        acces:"ANEL Dakar. Réseaux Facebook/Instagram 'Ladoum Sénégal'. Marchés Thiaroye, Dakar.",
        qualite:5, prix_score:2, dispo:3,
        avantages:["Race culturellement valorisée au maximum","Marché reproducteurs très actif","Instagram = canal de vente premium"],
        limites:["Prix élevés pour les sujets de qualité","Risque consanguinité sans pedigree suivi"],
        conseil:"Pour 30M : 1 bélier Ladoum de qualité (500K) + 15 brebis Peulh. En 2 générations, améliorer toute la valeur du troupeau.",
      },
      {
        nom:"Fane d'arachide + cosse de mil (marchés post-récolte)", origine:"local", type:"Alimentation de base",
        produits:"Fane d'arachide (fourrage riche protéines). Cosse de mil + paille de sorgho. Indispensable saison sèche.",
        prix:"Fane : 3 000–6 000 FCFA/botte 50kg. Cosse mil : 1 500–2 500 FCFA/sac. Prix plancher juste après récolte.",
        acces:"Marché rural après récolte (oct–déc). Acheter et stocker grande quantité. Prix ×2 en saison sèche.",
        qualite:4, prix_score:5, dispo:4,
        avantages:["Ressource locale abondante post-récolte","Prix très bas en bonne période","Valeur nutritive correcte pour l'entretien"],
        limites:["Disponibilité limitée juste après récolte","Qualité variable selon stockage"],
        conseil:"Acheter 3–4 mois de stock en novembre–décembre. Économie 40–50% vs achat en saison sèche.",
      },
      {
        nom:"Tourteau d'arachide (huileries Diourbel)", origine:"local", type:"Complément protéique",
        produits:"Tourteau d'arachide industriel (45–48% protéines). Sous-produit huileries Diourbel/Kaolack. Essentiel pour embouche.",
        prix:"18 000–25 000 FCFA/sac 50kg. Graine de coton : 15 000–20 000 FCFA/sac.",
        acces:"Huileries Diourbel (Suneor, Pamolive) ou marchés Kaolack. Livraison camion.",
        qualite:4, prix_score:4, dispo:4,
        avantages:["Haute densité protéique pour embouche","Locale = fret zéro"],
        limites:["Risque aflatoxines si mal stocké (contrôle avant achat)"],
        conseil:"Essentiel pour l'embouche pré-Tabaski. Ration optimale : 20% tourteau + fane + son de blé + urée 2% (attention dosage urée !).",
      },
      {
        nom:"Minéraux & blocs sel — Turquie / import", origine:"maroc", type:"Import groupé",
        produits:"Phosphate bicalcique (Ca/P), sel minéralisé blocs, prémix vitaminé ovins. Turquie = grand producteur mondial.",
        prix:"Bloc sel minéralisé importé : 1 500–2 500 FCFA/bloc 5kg vs 3 500–5 000 FCFA local. -35 à 45%.",
        acces:"Via importateurs Dakar (Biofarm, PharmaBio) ou commande directe Turquie (MOQ 500kg — grouper).",
        qualite:4, prix_score:4, dispo:3,
        avantages:["Économie 35–45% vs retail local","Qualité souvent supérieure au générique local"],
        limites:["MOQ à atteindre en groupant","Délai 3–4 semaines"],
        conseil:"Grouper commande avec 3–4 éleveurs de la zone. 1 commande 500kg → économie 300–500K FCFA/an.",
      },
      {
        nom:"Vaccins ovins — LANAVET + Ceva", origine:"local", type:"Santé animale",
        produits:"Vaccin PPR (OBLIGATOIRE), Pasteurellose, Entérotoxémie. Prix réglementés.",
        prix:"PPR 100 doses : 8 000–12 000 FCFA. Pasteurellose : 6 000–9 000/100 doses.",
        acces:"LANAVET Dakar + vétérinaires privés régionaux.",
        qualite:4, prix_score:4, dispo:4,
        avantages:["Prix réglementés","PPR partiellement subventionné certaines années"],
        limites:["Chaîne du froid strictement requise"],
        conseil:"Budget annuel vaccins 15 brebis : 150 000–250 000 FCFA. Obligatoire — épidémie PPR = troupeau entier en 2 semaines.",
      },
    ],
    synthese:"Génétique : 15 brebis Peulh-Peulh (base) + 1 bélier Ladoum de qualité (500K). Alimentation : stock fane post-récolte (nov–déc) + tourteau Diourbel. Minéraux : grouper commande Turquie.",
    economie:"250–600K FCFA/an vs approvisionnement 100% retail",
  },
  {
    id:"construction", icon:"🏗️", label:"Matériaux Construction Rurale",
    resume:"Pour les bâtiments agricoles ruraux en tôle + parpaings, la règle est l'inverse des autres catégories : utiliser les artisans locaux pour la structure (moins cher), et importer de Chine uniquement les équipements spécialisés (panneaux, ventilateurs, filets). Les matériaux de base (ciment, fer, tôle) s'achètent en gros avant la pointe de saison.",
    fournisseurs:[
      {
        nom:"Artisans locaux (maçons + forgerons Thiès/Niayes)", origine:"local", type:"Construction",
        produits:"Bâtiment avicole, bergerie, hangar, logement gardien, clôture. Prix vérifiés sources ANSD 2026 + terrain.",
        prix:"Maçon : 4 000–6 000 FCFA/j (rural). Manœuvre : 1 500–2 500/j. Chef équipe : 5 000–7 000/j. Avicole 200m² complet : 5–8M FCFA.",
        acces:"Via mairie locale pour références. Minimum 3 devis. Contrat écrit avec jalons de paiement obligatoire.",
        qualite:3, prix_score:5, dispo:5,
        avantages:["Main d'œuvre 25–35% moins chère que Dakar","Matériaux locaux (pas de fret)","Modifications faciles","Emploi local = relations communautaires"],
        limites:["Qualité variable selon l'artisan","Délai souvent dépassé","Pas de garantie formelle"],
        conseil:"Contrat écrit OBLIGATOIRE avec plan technique, jalons paiement (30% début / 40% gros œuvre / 30% réception), clause pénalité retard.",
      },
      {
        nom:"Ciment + Fer + Sable + Gravier (achat direct)", origine:"local", type:"Matériaux bruts",
        produits:"Ciment 42,5 (Dangote/Cimaf) : 3 600–4 200 FCFA/sac 50kg. Fer HA : 52 000 FCFA/100kg. Sable : 44 000/camion 16m³. Gravier : 85 000–110 000/camion 16m³.",
        prix:"Achat en gros (-15 à 20%) : ciment 58 000 FCFA/tonne. Économie vs achat détail : 20–30%.",
        acces:"Dépôts matériaux Thiès, Mbour, Mboro. Livraison chantier direct (camion 16m³).",
        qualite:4, prix_score:4, dispo:5,
        avantages:["Matériaux locaux disponibles partout","Achat en gros avant saison sèche = prix bas","Contrôle qualité visuel facile"],
        limites:["Transport peut renchérir si zone éloignée (+20–30% sur gravier)"],
        conseil:"Acheter tous les matériaux en gros AVANT le démarrage des travaux (oct–déc = prix les plus bas, avant hausse saison sèche).",
      },
      {
        nom:"Tôle ondulée acier (dépôts quincaillerie régionale)", origine:"local", type:"Couverture",
        produits:"Tôle ondulée acier galvanisé. Standard sénégalais pour toiture agricole.",
        prix:"4 000–4 500 FCFA/m² (source ANSD/prixdakar.com 2025–2026). Pour avicole 200m² (toiture 220m²) : 880 000–990 000 FCFA.",
        acces:"Quincailleries régionales (Thiès, Diourbel, Kaolack). Livraison camion.",
        qualite:3, prix_score:4, dispo:5,
        avantages:["Disponible partout","Prix stable et connu","Durée de vie 15–20 ans si galvanisé"],
        limites:["Qualité variable (vérifier épaisseur : 0,4–0,5mm minimum pour agricole)"],
        conseil:"Acheter épaisseur 0,5mm minimum pour durabilité agricole. Éviter les tôles < 0,35mm (durée de vie 5 ans).",
      },
      {
        nom:"Filets anti-oiseaux / ombrage — Chine (DHL)", origine:"chine", type:"Import direct 🔥",
        produits:"Filets ombrage 50% (protection cultures saison chaude), filets anti-insectes, bâches PE.",
        prix:"Filet ombrage 50% (1 000m²) : 80 000–120 000 FCFA import Chine vs 200 000–300 000 FCFA local. -60%.",
        acces:"Alibaba.com → 'shade net agricultural'. Fret DHL Express recommandé (léger : 20kg/100m²). Délai 10–15j.",
        qualite:4, prix_score:5, dispo:3,
        avantages:["Économie -60% vs local","Qualité textile correcte (3–5 ans de vie)","Larges formats disponibles"],
        limites:["Délai 10–15j (DHL aérien) ou 40j (maritime)"],
        conseil:"Import Chine systématiquement recommandé pour tout textile agricole. Exiger grammage minimum 80g/m² pour durabilité.",
      },
      {
        nom:"Tricycle motorisé cargo (Dayun / Loncin — marché Dakar)", origine:"chine", type:"Occasion / import",
        produits:"Tricycles cargo 200–250cc. Charge utile 500–800kg. Marques Dayun, Loncin, Zongshen (OEM Piaggio).",
        prix:"Neuf import : 750 000–1 100 000 FCFA. Occasion 2–3 ans : 400 000–700 000 FCFA. Pièces détachées très disponibles.",
        acces:"Marché Sandaga Dakar (quincaillerie + autos). Occasion dans toutes les villes.",
        qualite:3, prix_score:5, dispo:5,
        avantages:["Pièces détachées partout au Sénégal","Réparation par tout mécanicien local","Prix occasion excellent"],
        limites:["Qualité variable selon marque","Pas de garantie sur l'occasion"],
        conseil:"Marques recommandées : Dayun ou Loncin. Toujours commander avec boîte renforcée 'heavy duty'. Avoir en stock : 2 courroies, 1 jeu plaquettes, 1 kit carburation.",
      },
    ],
    synthese:"Structure bâtiments = artisans locaux (main d'œuvre -30% vs Dakar). Matériaux bruts (ciment, fer, tôle) = achat en gros avant saison sèche. Équipements spéciaux (filets, tricycle) = import Chine direct.",
    economie:"500K–1,5M FCFA sur l'investissement total",
  },
];

// ─── COMPOSANTS ──────────────────────────────────────────────────────────────
function Badge({origine}) {
  const c = ORIGINE_COLOR[origine]||C.muted;
  return <span style={S.pill(c)}>{ORIGINE_LABEL[origine]||origine}</span>;
}

function ScoreRow({label,value,color}) {
  return (
    <div style={{marginBottom:"0.35rem"}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.7rem",marginBottom:"0.1rem"}}>
        <span style={{color:C.muted,fontFamily:F.m,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</span>
      </div>
      <Dots n={value} color={color}/>
    </div>
  );
}

function CatView({cat}) {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <h2 style={S.h2}>{cat.icon} {cat.label}</h2>
      <div style={S.alert(C.cyan)}>{cat.resume}</div>

      {cat.fournisseurs.map((f,i) => {
        const c = ORIGINE_COLOR[f.origine]||C.muted;
        const isOpen = open === i;
        const isBest = f.qualite+f.prix_score+f.dispo >= 12;
        return (
          <div key={f.nom} style={{...S.card, borderLeft:`4px solid ${c}`, marginBottom:"0.75rem", ...(isBest?{borderTop:`2px solid ${C.accent}`}:{})}}>
            <div onClick={()=>setOpen(isOpen?null:i)} style={{cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:"0.75rem",flexWrap:"wrap"}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.5rem",flexWrap:"wrap",marginBottom:"0.3rem"}}>
                    <strong style={{color:C.sand,fontSize:"0.97rem",fontFamily:F.d}}>{f.nom}</strong>
                    <Badge origine={f.origine}/>
                    {isBest&&<span style={{...S.pill(C.accent),fontSize:"0.65rem"}}>⭐ Recommandé</span>}
                  </div>
                  <p style={{color:C.textMuted,fontSize:"0.82rem",margin:"0 0 0.3rem",lineHeight:1.4}}>{f.produits}</p>
                  <span style={{color:C.accentLight,fontSize:"0.82rem",fontFamily:F.m}}>💰 {f.prix}</span>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"0.4rem",minWidth:"130px",flexShrink:0}}>
                  <ScoreRow label="Qualité" value={f.qualite} color={c}/>
                  <ScoreRow label="Prix" value={f.prix_score} color={C.accentLight}/>
                  <ScoreRow label="Dispo Dakar" value={f.dispo} color={C.greenLight}/>
                  <div style={{textAlign:"right",color:C.muted,fontSize:"0.8rem",marginTop:"0.2rem"}}>{isOpen?"▲":"▼"}</div>
                </div>
              </div>
            </div>

            {isOpen && (
              <div style={{marginTop:"1rem",borderTop:`1px solid ${C.border}`,paddingTop:"1rem"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"0.75rem"}}>
                  <div>
                    <h3 style={S.h3}>Avantages</h3>
                    {f.avantages.map(a=><div key={a} style={{display:"flex",gap:"0.5rem",marginBottom:"0.35rem"}}><span style={{color:C.greenLight,flexShrink:0,fontSize:"0.8rem"}}>+</span><span style={{fontSize:"0.82rem",color:C.textMuted,lineHeight:1.5}}>{a}</span></div>)}
                  </div>
                  <div>
                    <h3 style={{...S.h3,color:C.red}}>Limites</h3>
                    {f.limites.map(l=><div key={l} style={{display:"flex",gap:"0.5rem",marginBottom:"0.35rem"}}><span style={{color:C.red,flexShrink:0,fontSize:"0.8rem"}}>−</span><span style={{fontSize:"0.82rem",color:C.textMuted,lineHeight:1.5}}>{l}</span></div>)}
                  </div>
                </div>
                <h3 style={S.h3}>Accès & disponibilité</h3>
                <p style={{fontSize:"0.82rem",color:C.textMuted,marginBottom:"0.75rem",lineHeight:1.6}}>{f.acces}</p>
                <div style={S.alert(c)}>
                  <strong style={{color:c}}>Conseil terrain : </strong>{f.conseil}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div style={{...S.card,background:"#1e2f20",borderColor:C.greenLight}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"1rem"}}>
          <div style={{flex:1}}>
            <h3 style={{...S.h3,marginTop:0}}>Stratégie recommandée</h3>
            <p style={{fontSize:"0.88rem",color:C.text,lineHeight:1.7,margin:0}}>{cat.synthese}</p>
          </div>
          <div style={{background:C.greenBg||"#0d2010",border:`1px solid ${C.greenLight}33`,borderRadius:"5px",padding:"0.75rem 1rem",textAlign:"center",minWidth:"160px"}}>
            <div style={{fontSize:"0.65rem",color:C.muted,fontFamily:F.m,textTransform:"uppercase",marginBottom:"0.3rem"}}>Économie potentielle</div>
            <div style={{fontSize:"1.05rem",fontWeight:"bold",color:C.greenLight,fontFamily:F.m}}>{cat.economie}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SyntheseView() {
  const allFourns = CATEGORIES.flatMap(cat=>cat.fournisseurs.map(f=>({...f,cat:cat.label,catIcon:cat.icon})));
  const topFourns = allFourns.filter(f=>f.qualite+f.prix_score+f.dispo>=12).sort((a,b)=>(b.qualite+b.prix_score+b.dispo)-(a.qualite+a.prix_score+a.dispo));
  return (
    <div>
      <h2 style={S.h2}>Synthèse — Grille Comparaison Globale</h2>
      <div style={S.alert(C.accentLight)}>
        <strong>Méthode de notation :</strong> Qualité produit (1–5) · Compétitivité prix (1–5, 5=moins cher) · Disponibilité depuis Dakar (1–5). Score total max = 15. Seuil recommandé ≥ 12.
      </div>

      <div style={S.card}>
        <h3 style={S.h3}>Classement global par score (Qualité + Prix + Dispo)</h3>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem",minWidth:"600px"}}>
            <thead><tr>
              {["Fournisseur","Catégorie","Origine","Qualité","Prix","Dispo","Score","Statut"].map(h=><th key={h} style={S.th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {allFourns.sort((a,b)=>(b.qualite+b.prix_score+b.dispo)-(a.qualite+a.prix_score+a.dispo)).slice(0,15).map((f,i)=>{
                const score=f.qualite+f.prix_score+f.dispo;
                const c=ORIGINE_COLOR[f.origine]||C.muted;
                return (
                  <tr key={f.nom+i} style={{background:score>=12?"#1e2f1a":i%2===0?C.card:C.surface}}>
                    <td style={{...S.td,color:C.sand,fontWeight:score>=12?"bold":"normal"}}>{f.nom.split(" (")[0].substring(0,30)}</td>
                    <td style={S.tdM}>{f.catIcon}</td>
                    <td style={S.td}><Badge origine={f.origine}/></td>
                    <td style={S.td}><Dots n={f.qualite} color={c}/></td>
                    <td style={S.td}><Dots n={f.prix_score} color={C.accentLight}/></td>
                    <td style={S.td}><Dots n={f.dispo} color={C.greenLight}/></td>
                    <td style={{...S.td,fontWeight:"bold",color:score>=12?C.greenLight:score>=9?C.accentLight:C.muted,fontFamily:F.m}}>{score}/15</td>
                    <td style={S.td}>{score>=12?<span style={S.pill(C.greenLight)}>⭐ Top</span>:score>=9?<span style={S.pill(C.accent)}>Bon</span>:<span style={S.pill(C.muted)}>Niche</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div style={S.card}>
        <h3 style={S.h3}>Règles d'or de l'approvisionnement</h3>
        {[
          {r:"Pompe forage = Europe (Lorentz/Grundfos), réseau irrigation = Chine",c:C.chine,d:"Règle immuable. Une panne de pompe principale en juillet coûte une récolte entière (3–5M FCFA). Les tuyaux en Chine peuvent tomber en panne sans conséquence fatale — pas la pompe."},
          {r:"Aliment volaille = contrat SEDIMA négocié ou fabrication maison An 2",c:C.local,d:"Représente 65–70% des charges avicoles. Négocier -7% sur contrat annuel. Fabriquer en interne dès An 2–3 avec mélangeur = économie 1,5–2,5M FCFA/an."},
          {r:"Semences = toujours échantillonner avant commande volume",c:C.accent,d:"Un taux de germination à 40% détruit la marge de toute une récolte. 1 échantillon DHL (50–200 USD) = assurance contre une commande ratée à 2 000 USD."},
          {r:"Engrais = coopérative agréée pour subvention État (-50%)",c:C.maroc,d:"Les subventions intrants 2025–2026 ont atteint 130 Mds FCFA. Passer par une coopérative agréée = accès obligatoire. Économie : 500K–1M FCFA/an."},
          {r:"Chine = équipements non-critiques uniquement (filets, mangeoires, tuyaux)",c:C.chine,d:"Tout équipement dont la panne en pleine campagne n'est pas catastrophique → Chine. Vaccins, pompe principale, semences premium → qualité certifiée uniquement."},
          {r:"Grouper les commandes avec les voisins exploitants",c:C.greenLight,d:"OCP Maroc MOQ 5 tonnes, minéraux Turquie MOQ 500kg, irrigation Chine LCL. Le groupement divise le fret par 3–4 et atteint les seuils. Les coopératives agricoles locales sont le mécanisme naturel."},
        ].map(({r,c,d})=>(
          <div key={r} style={{borderLeft:`3px solid ${c}`,paddingLeft:"1rem",marginBottom:"1rem"}}>
            <strong style={{color:c,display:"block",marginBottom:"0.25rem"}}>{r}</strong>
            <span style={{fontSize:"0.85rem",color:C.textMuted,lineHeight:1.6}}>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const TABS = [
  {label:"📊 Synthèse globale", id:"synthese"},
  ...CATEGORIES.map(c=>({label:`${c.icon} ${c.label}`, id:c.id})),
];

export default function Fournisseurs() {
  const [active, setActive] = useState("synthese");
  const cat = CATEGORIES.find(c=>c.id===active);
  return (
    <div style={S.wrap}>
      <div style={S.header}>
        <div style={{display:"inline-block",background:C.accent,color:"#0f1a10",fontSize:"0.62rem",fontFamily:F.m,fontWeight:"bold",letterSpacing:"0.14em",padding:"0.2rem 0.7rem",borderRadius:"2px",marginBottom:"0.7rem",textTransform:"uppercase"}}>
          Fournisseurs · Qualité · Prix · Disponibilité Dakar · 2026
        </div>
        <h1 style={{fontSize:"clamp(1.4rem,3.5vw,2rem)",fontWeight:"bold",color:C.text,margin:"0 0 0.4rem",fontFamily:F.d}}>
          Comparaison Complète Fournisseurs 🇸🇳🌍
        </h1>
        <p style={{color:C.muted,fontSize:"0.88rem",fontFamily:F.m,margin:"0 0 0.85rem"}}>
          Local · Maroc · Europe · Chine · 6 catégories · 35+ fournisseurs · Scores Qualité / Prix / Dispo
        </p>
        <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
          {["35+ fournisseurs","6 catégories","Notation 3 critères","Import direct guidé","Sources terrain 2026"].map(t=>(
            <span key={t} style={{background:"rgba(200,137,58,0.15)",border:"1px solid rgba(200,137,58,0.3)",color:C.accentLight,padding:"0.18rem 0.6rem",borderRadius:"20px",fontSize:"0.7rem",fontFamily:F.m}}>{t}</span>
          ))}
        </div>
      </div>
      <nav style={S.nav}>
        {TABS.map((t,i)=>(
          <button key={t.id} style={S.navBtn(t.id===active)} onClick={()=>setActive(t.id)}>{t.label}</button>
        ))}
      </nav>
      <div style={S.main}>
        {active==="synthese"?<SyntheseView/>:<CatView cat={cat}/>}
      </div>
    </div>
  );
}
