'use client'
import { useState } from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const C = {
  bg:"#0f1a10", surface:"#162018", card:"#1c2b1e", border:"#2a3d2c",
  accent:"#c8893a", accentLight:"#e8a84a",
  green:"#4a9e5c", greenLight:"#6dbf7e",
  sand:"#d4b896", muted:"#7a9b7d", text:"#e8ede9", textMuted:"#9ab59c",
  red:"#e07a7a", cyan:"#5ecfb8", blue:"#5a9eff", gold:"#d4a820",
};
const F = { d:"'Georgia','Times New Roman',serif", m:"'Courier New',monospace" };
const fmt = n => Math.abs(n).toLocaleString("fr-FR");
const fmtM = n => (n/1000000).toFixed(1)+"M";
const gridC = "rgba(255,255,255,0.06)";
const textC = "#7a9b7d";

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
  thR:{ background:"#1e2f20", color:C.accent, padding:"0.5rem 0.65rem", textAlign:"right", fontFamily:F.m, fontSize:"0.68rem", textTransform:"uppercase", borderBottom:`1px solid ${C.border}` },
  td:{ padding:"0.5rem 0.65rem", borderBottom:`1px solid ${C.border}`, color:C.text, verticalAlign:"top", fontSize:"0.83rem" },
  tdR:{ padding:"0.5rem 0.65rem", borderBottom:`1px solid ${C.border}`, textAlign:"right", fontFamily:F.m, fontSize:"0.82rem", verticalAlign:"top" },
  tdM:{ padding:"0.5rem 0.65rem", borderBottom:`1px solid ${C.border}`, color:C.muted, fontSize:"0.82rem", verticalAlign:"top" },
  pill:(c)=>({ display:"inline-block", background:(c||C.accent)+"22", color:c||C.accent, border:`1px solid ${(c||C.accent)}44`, padding:"0.15rem 0.55rem", borderRadius:"20px", fontSize:"0.7rem", fontFamily:F.m, fontWeight:"bold" }),
  kpi:(c)=>({ background:C.card, border:`1px solid ${C.border}`, borderTop:`2px solid ${c}`, borderRadius:"4px", padding:"0.85rem", textAlign:"center" }),
};

// ─── BUDGET 30M (coûts construction bottom-up corrigés 2026) ─────────────────
const BUDGET = [
  {cat:"🏛️ FONCIER & JURIDIQUE", items:[
    {l:"Bail emphytéotique 1 ha (Niayes — Mboro intérieur, notarié)", v:3500000, note:"Prix marché 2026 : 3–4M/ha zone Mboro (hors bord de mer). Choisir parcelle 5–10km de la côte (éviter salinisation). Acte notarié OBLIGATOIRE avant tout investissement."},
    {l:"Frais notaire + bornage géomètre + enregistrement", v:350000, note:"Notaire : 100–200K. Géomètre : 100–150K. Taxes : ~50K."},
    {l:"Constitution SARL + NINEA (APIX)", v:200000, note:"Guichet unique APIX. Délai 48–72h. Capital social minimum : 100 000 FCFA."},
  ]},
  {cat:"💧 EAU & IRRIGATION", items:[
    {l:"Forage 12m × 50 000 FCFA/ml (nappe Niayes < 15m)", v:600000, note:"Zone Niayes : nappe phréatique sub-permanente à 8–15m. Forage court = économie majeure vs Thiès (45m = 2,25M). Foreur agréé — 3 devis minimum."},
    {l:"Tubage PVC Ø6\" + gravier filtrant + margelle", v:350000, note:"Tubage PVC alimentaire. Gravier filtrant autour du tubage. Margelle béton en surface."},
    {l:"Pompe immergée solaire Lorentz + panneaux 1,8kWc + contrôleur + tête", v:3200000, note:"POMPE PRINCIPALE = qualité européenne obligatoire. Durée de vie 12–15 ans. JA Solar ou LONGi. Garantie 25 ans. Une panne en juillet = récolte perdue (3–5M FCFA)."},
    {l:"Tête de puits + installation + mise en service", v:200000, note:"Raccordement pompe–surface–réseau irrigation. Test débit obligatoire avant réception."},
    {l:"Irrigation goutte-à-goutte 1 ha (import Chine direct)", v:650000, note:"Kit complet importé via Alibaba : 450–700K rendu Dakar. -60% vs PERVAL. Échantillon DHL à tester avant commande volume."},
  ]},
  {cat:"🏗️ BÂTIMENTS (bottom-up rural, artisans locaux 2026)", items:[
    {l:"Bâtiment avicole 200m² (parpaings mi-haut. + tôle + charpente métal)", v:6500000, note:"Bottom-up : dalle (580K) + parpaings (420K) + charpente métal (950K) + tôle (980K) + grillage ventilation (175K) + menuiserie + MO + contingence 15% ≈ 6,5M FCFA."},
    {l:"Bergerie ovine 80m² (parpaings pleine hauteur + tôle)", v:3000000, note:"Bottom-up : dalle (230K) + parpaings (390K) + charpente+tôle (680K) + auge+cornadis (150K) + MO + contingence 15% ≈ 3M FCFA."},
    {l:"Hangar stockage oignon 50m² (poteaux métal + tôle)", v:1400000, note:"Structure légère : poteaux + tôle + sol sable tassé. 7 jours de chantier. Levier ×3 sur prix oignon hors-saison."},
    {l:"Logement gardien + bureau 30m² (parpaings + tôle + carrelage basique)", v:2200000, note:"Bottom-up : dalle (100K) + parpaings (400K) + tôle (290K) + porte+fenêtres (280K) + enduit (160K) + carrelage (185K) + électricité (100K) + MO + contingence 15%."},
    {l:"Clôture périmétrique 400ml (poteaux béton + grillage galvanisé)", v:1300000, note:"133 poteaux béton (400K) + 16 rouleaux grillage galva (500K) + portail métal 4m (230K) + fil barbelé (60K) + MO scellement + contingence 12%."},
  ]},
  {cat:"🚜 ÉQUIPEMENTS & TRANSPORT", items:[
    {l:"Tricycle motorisé cargo occasion (Dayun ou Loncin)", v:600000, note:"Marché occasion Dakar (Sandaga). 2–3 ans. Pièces disponibles partout. Charge 500–700kg."},
  ]},
  {cat:"🐑 CHEPTEL", items:[
    {l:"15 brebis Peulh-Peulh (marchés ruraux Louga/Diourbel)", v:1200000, note:"75–90K FCFA/brebis. Race rustique, très fertile (gémellité 20–30%). Base génétique saine."},
    {l:"1 bélier Ladoum croisé (ANEL ou éleveur agréé)", v:350000, note:"Amélioration génétique du troupeau en 2 générations. 250–500K selon qualité. Instagram pour sourcer."},
  ]},
  {cat:"🐓 DÉMARRAGE AVICOLE", items:[
    {l:"2 000 poussins Ross 308 ou Cobb 500 (SEDIMA)", v:1400000, note:"700 FCFA/poussin 2026. Commande 3 semaines à l'avance. Contrat annuel pour remise 5–7%."},
    {l:"Aliment démarrage (15 sacs) + croissance (10 sacs) cycle 1", v:480000, note:"SEDIMA : 19 000–21 000 FCFA/sac 50kg. Cycle 1 = ~25 sacs pour 2 000 sujets."},
    {l:"Équipements avicoles (mangeoires + abreuvoirs + ventilateurs, import Chine)", v:550000, note:"Kit 2 000 sujets importé Alibaba (Henan Longmu ou équiv.) : 450–700K. Économie 700K–1,1M vs local."},
    {l:"Vaccins cycle 1 (Newcastle J7 + Gumboro J14+J21, LANAVET)", v:50000, note:"Obligatoire. Stock 2 cycles d'avance dans réfrigérateur dédié."},
  ]},
  {cat:"🌱 INTRANTS AGRICOLES", items:[
    {l:"Semences certifiées 2 cycles (ISRA oignon + Technisem tomate/poivron)", v:600000, note:"ISRA oignon subventionné : 3 000–8 000 FCFA/kg. Technisem F1 poivron/tomate : 45 000–80 000 FCFA/100g."},
    {l:"Engrais + amendements 2 cycles (via coopérative, subventionné -50%)", v:400000, note:"NPK + urée via coopérative agréée (subvention 50%). + fumier avicole An 1 = complémentaire."},
    {l:"Produits phytosanitaires + traitements (2 cycles)", v:200000, note:"Fongicides + insecticides homologués. Budget réduit grâce à l'aviculture (fumier améliore résistance sol)."},
  ]},
  {cat:"📋 ADMINISTRATION & ASSURANCES", items:[
    {l:"Assurances CNAAS (mortalité cheptel volaille + ovin, 1 an)", v:350000, note:"CNAAS = obligatoire. ~2–3% de la valeur assurée cheptel."},
    {l:"Frais divers (déplacements reconnaissance, téléphonie, bureau)", v:150000, note:"Budget opérationnel premier mois avant démarrage production."},
  ]},
  {cat:"💰 FONDS DE ROULEMENT", items:[
    {l:"Fonds de roulement (3,5 mois de charges opérationnelles)", v:3500000, note:"Salaires (5,5M/an) + intrants récurrents + transport. 3,5 mois = 3,2–3,8M. Budget corrigé Niayes (forage + foncier plus chers) → FdR légèrement réduit vs version Thiès. Maintenir un minimum de 3M."},
  ]},
];

const totalBudget = BUDGET.flatMap(c=>c.items).reduce((s,i)=>s+i.v,0);

// ─── P&L ─────────────────────────────────────────────────────────────────────
const REVENUS = [
  {fili:"🥬 Maraîchage (oignon, tomate, poivron)", a1:9000000, a2:14000000, a3:18000000},
  {fili:"🐓 Aviculture (2 000 sujets × 5→6 cycles)", a1:3500000, a2:4800000, a3:5500000},
  {fili:"🐑 Élevage ovin (15 brebis → croissance)", a1:2500000, a2:5000000, a3:7500000},
];
const CHARGES = [
  {ch:"Intrants + aliment avicole + vétérinaire", a1:5000000, a2:6900000, a3:8200000},
  {ch:"Salaires (7 permanents + saisonniers)", a1:5500000, a2:6300000, a3:7200000},
  {ch:"Transport + commercialisation", a1:900000, a2:1200000, a3:1500000},
  {ch:"Eau + énergie + maintenance", a1:500000, a2:600000, a3:700000},
  {ch:"Assurances + frais fixes", a1:600000, a2:700000, a3:800000},
];
const ca = k=>REVENUS.reduce((s,r)=>s+r[k],0);
const ch = k=>CHARGES.reduce((s,c)=>s+c[k],0);
const net = k=>ca(k)-ch(k);
const IS = k=>Math.max(0,Math.round(net(k)*0.15));
const netA = k=>net(k)-IS(k);

// ─── PROJECTION 10 ANS ───────────────────────────────────────────────────────
const PROJ10 = [
  {an:"An 1", ca:15.0, net:2.5, cumul:2.5, event:"Démarrage"},
  {an:"An 2", ca:23.8, net:7.0, cumul:9.5, event:"Contrats B2B"},
  {an:"An 3", ca:31.0, net:11.8, cumul:21.3, event:"Payback proche"},
  {an:"An 4", ca:41.0, net:16.0, cumul:37.3, event:"Extension 3e ha"},
  {an:"An 5", ca:52.0, net:22.0, cumul:59.3, event:"Payback ✓"},
  {an:"An 6", ca:65.0, net:27.0, cumul:86.3, event:"Export CEDEAO"},
  {an:"An 7", ca:74.0, net:31.0, cumul:117.3, event:"Maturité"},
  {an:"An 8", ca:84.0, net:34.0, cumul:151.3, event:"2e site possible"},
  {an:"An 9", ca:92.0, net:37.0, cumul:188.3, event:"Consolidation"},
  {an:"An 10", ca:101.0, net:40.0, cumul:228.3, event:"~200M cumul"},
];

// ─── RH ──────────────────────────────────────────────────────────────────────
const RH = [
  {p:"Chef de culture",n:1,s:"150 000–180 000",r:"Maraîchage, irrigation, intrants, récolte. Profil ENSA Thiès ou réseau agriculteurs Niayes."},
  {p:"Ouvriers maraîchage",n:2,s:"75 000–90 000",r:"Travaux quotidiens : binage, arrosage, récolte, semis."},
  {p:"Aviculteur",n:1,s:"100 000–120 000",r:"Alimentation, hygiène bâtiment, vaccination, suivi ICR quotidien."},
  {p:"Berger / emboucheur",n:1,s:"75 000–90 000",r:"Alimentation ovins, surveillance santé, gestion Tabaski."},
  {p:"Gardien nuit (résident)",n:1,s:"60 000–75 000",r:"Sécurité permanente. Présence nocturne non négociable."},
  {p:"MO saisonnière (pics récolte)",n:"2–3",s:"50 000/mois",r:"Renfort récolte oignon et semis."},
];

// ─── RISQUES ─────────────────────────────────────────────────────────────────
const RISQUES = [
  {r:"Sécheresse / défaillance eau",prob:"Moyen",imp:"Élevé",mc:C.accent, mit:"Puits + pompe solaire = autonomie totale. Réserve eau 20m³. Cultures cycle court (75j) adaptables."},
  {r:"Épizootie aviaire (Newcastle, Gumboro)",prob:"Moyen",imp:"Élevé",mc:C.accent, mit:"Protocole vaccination strict J7+J14+J21. Vide sanitaire 15j obligatoire. Assurance CNAAS. Biosécurité totale."},
  {r:"Chute prix oignon (suroffre saisonnière)",prob:"Élevé",imp:"Moyen",mc:C.red, mit:"Stockage hors-saison ×3. Contrats restaurants (prix fixé). WhatsApp B2C = prix stable."},
  {r:"Litige foncier",prob:"Moyen",imp:"Très élevé",mc:C.red, mit:"Bail emphytéotique notarié OBLIGATOIRE avant tout investissement. Jamais de construction avant signature."},
  {r:"Vols et insécurité",prob:"Élevé",imp:"Moyen",mc:C.accent, mit:"Clôture + gardien nuit résident + chiens + éclairage solaire. Emploi local = surveillance communautaire."},
  {r:"Mortalité cheptel ovin (PPR)",prob:"Moyen",imp:"Moyen",mc:C.accent, mit:"Vaccination PPR annuelle obligatoire. Vétérinaire local (50K/mois). CNAAS mortalité bétail."},
  {r:"Impayés restaurants / retards paiement",prob:"Moyen",imp:"Moyen",mc:C.accentLight, mit:"Wave uniquement pour petits clients. Restaurants : paiement ≤ 7j + facture hebdomadaire."},
];

// ─── TAB BUDGET ───────────────────────────────────────────────────────────────
function TabBudget() {
  const [open,setOpen]=useState(null);
  return (
    <div>
      <h2 style={S.h2}>Budget d'Investissement — 32–33M FCFA</h2>
      <div style={S.alert(C.greenLight)}>
        <strong>Zone révisée : Niayes — Mboro intérieur (5–10km côte).</strong> Forage corrigé à <strong>50 000 FCFA/ml</strong> (artisans Sénégal 2026). Nappe Niayes 8–15m → forage 12m = 600K FCFA vs 2,25M pour Thiès (45m). L'économie forage compense le surcoût foncier. Budget total corrigé : ~32M FCFA → capital cible recommandé <strong>32–33M FCFA</strong>.
      </div>
      {BUDGET.map(cat=>(
        <div key={cat.cat} style={{...S.card,marginBottom:"0.75rem"}}>
          <div onClick={()=>setOpen(open===cat.cat?null:cat.cat)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
            <strong style={{color:C.sand,fontFamily:F.d}}>{cat.cat}</strong>
            <div style={{display:"flex",gap:"0.75rem",alignItems:"center"}}>
              <span style={{color:C.accentLight,fontFamily:F.m,fontWeight:"bold"}}>{fmt(cat.items.reduce((s,i)=>s+i.v,0))} FCFA</span>
              <span style={{color:C.muted}}>{open===cat.cat?"▲":"▼"}</span>
            </div>
          </div>
          {open===cat.cat&&(
            <div style={{marginTop:"0.85rem",borderTop:`1px solid ${C.border}`,paddingTop:"0.85rem"}}>
              {cat.items.map(item=>(
                <div key={item.l} style={{display:"flex",justifyContent:"space-between",gap:"1rem",padding:"0.45rem 0",borderBottom:`1px solid ${C.border}`,fontSize:"0.83rem"}}>
                  <div style={{flex:1}}>
                    <div style={{color:C.text,marginBottom:"0.15rem"}}>{item.l}</div>
                    <div style={{color:C.muted,fontSize:"0.78rem"}}>{item.note}</div>
                  </div>
                  <strong style={{color:C.accentLight,fontFamily:F.m,flexShrink:0,textAlign:"right"}}>{fmt(item.v)}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div style={{...S.card,background:"#1e2f20",borderColor:C.greenLight}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
          <div>
            <div style={{fontSize:"0.68rem",color:C.muted,fontFamily:F.m,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.3rem"}}>Total investissement</div>
            <div style={{fontSize:"1.8rem",fontWeight:"bold",color:C.accentLight,fontFamily:F.m}}>{fmt(totalBudget)} FCFA</div>
            <div style={{fontSize:"0.8rem",color:C.greenLight,marginTop:"0.25rem"}}>≈ {fmtM(totalBudget)} FCFA — Capital cible recommandé : <strong>32–33M FCFA</strong> (forage corrigé + foncier Niayes)</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.5rem"}}>
            {[
              {k:"Construction (5 bâtiments)",v:fmt(14400000)+" F",c:C.accent},
              {k:"% construction / total",v:Math.round(14400000/totalBudget*100)+"%",c:C.muted},
              {k:"Fonds de roulement",v:"4,2M FCFA",c:C.cyan},
              {k:"Cheptel total",v:"3,0M FCFA",c:C.gold},
            ].map(k=>(
              <div key={k.k} style={{background:C.card,borderRadius:"4px",padding:"0.5rem 0.75rem"}}>
                <div style={{fontSize:"0.85rem",fontWeight:"bold",color:k.c,fontFamily:F.m}}>{k.v}</div>
                <div style={{fontSize:"0.65rem",color:C.muted,fontFamily:F.m,textTransform:"uppercase"}}>{k.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB P&L ─────────────────────────────────────────────────────────────────
function TabPL() {
  const plRows = [
    ...REVENUS.map(r=>({...r,type:"rev"})),
    {fili:"CHIFFRE D'AFFAIRES",a1:ca("a1"),a2:ca("a2"),a3:ca("a3"),type:"total"},
    ...CHARGES.map(c=>({fili:c.ch,a1:-c.a1,a2:-c.a2,a3:-c.a3,type:"chg"})),
    {fili:"TOTAL CHARGES",a1:-ch("a1"),a2:-ch("a2"),a3:-ch("a3"),type:"total"},
    {fili:"Résultat avant IS",a1:net("a1"),a2:net("a2"),a3:net("a3"),type:"result"},
    {fili:"IS estimé (15%)",a1:-IS("a1"),a2:-IS("a2"),a3:-IS("a3"),type:"chg"},
    {fili:"RÉSULTAT NET",a1:netA("a1"),a2:netA("a2"),a3:netA("a3"),type:"net",hl:true},
    {fili:"Marge nette",a1:Math.round(netA("a1")/ca("a1")*100),a2:Math.round(netA("a2")/ca("a2")*100),a3:Math.round(netA("a3")/ca("a3")*100),type:"pct"},
  ];
  const rowColor=(type,val)=>{
    if(type==="net"||type==="result")return val<0?C.red:C.accentLight;
    if(type==="total")return C.accentLight;
    if(type==="pct")return val<0?C.red:C.cyan;
    if(type==="rev")return C.greenLight;
    return C.red;
  };
  const chartData=["An 1","An 2","An 3"].map((an,i)=>{
    const k=["a1","a2","a3"][i];
    return {an,...Object.fromEntries(REVENUS.map(r=>[r.fili.split(" ")[0],r[k]/1000000]))};
  });
  return (
    <div>
      <h2 style={S.h2}>Compte de Résultat — Prévisionnel 3 ans</h2>
      <div style={S.alert(C.greenLight)}>
        <strong>✅ Positif dès l'An 1 :</strong> Résultat net +{fmt(netA("a1"))} FCFA dès la première année. La structure de charges légère (3 filières, construction rurale) permet d'atteindre la rentabilité sans phase déficitaire initiale.
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:"0.75rem",marginBottom:"1.25rem"}}>
        {[{l:"CA An 3",v:fmtM(ca("a3")),c:C.cyan},{l:"Net An 3",v:fmtM(netA("a3")),c:C.accentLight},{l:"Marge An 3",v:Math.round(netA("a3")/ca("a3")*100)+"%",c:C.greenLight},{l:"Cumul net 3 ans",v:fmtM(netA("a1")+netA("a2")+netA("a3")),c:C.greenLight},{l:"ROI 3 ans",v:Math.round((netA("a1")+netA("a2")+netA("a3"))/30*100)+"%",c:C.accentLight},{l:"Payback",v:"~3,7 ans",c:C.sand}].map(k=>(
          <div key={k.l} style={S.kpi(k.c)}>
            <div style={{fontSize:"1.2rem",fontWeight:"bold",color:k.c,fontFamily:F.m}}>{k.v}</div>
            <div style={{fontSize:"0.62rem",color:C.muted,fontFamily:F.m,textTransform:"uppercase",letterSpacing:"0.07em",marginTop:"0.2rem"}}>{k.l}</div>
          </div>
        ))}
      </div>
      <div style={S.card}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.83rem"}}>
          <thead><tr>
            <th style={S.th}>Ligne</th>
            {["Année 1","Année 2","Année 3"].map(h=><th key={h} style={S.thR}>{h}</th>)}
          </tr></thead>
          <tbody>
            {plRows.map(row=>{
              const isBig=row.type==="total"||row.type==="net"||row.type==="result";
              return (
                <tr key={row.fili} style={{background:row.hl?"#1e2f20":isBig?"#182820":row.type==="rev"?C.surface+"88":C.card}}>
                  <td style={{...S.td,color:isBig?C.accentLight:row.type==="rev"?C.text:C.muted,fontWeight:isBig?"bold":"normal",paddingLeft:(row.type==="rev"||row.type==="chg")&&!row.fili.startsWith("TOTAL")?"1.5rem":"0.65rem",fontSize:isBig?"0.9rem":"0.83rem"}}>
                    {row.fili}
                  </td>
                  {["a1","a2","a3"].map(k=>{
                    const v=row[k];
                    const color=rowColor(row.type,v);
                    const display=row.type==="pct"?`${v}%`:v<0?`(${fmt(Math.abs(v))})`:fmt(v);
                    return <td key={k} style={{...S.tdR,color,fontWeight:isBig?"bold":"normal",fontSize:isBig?"0.9rem":"0.82rem"}}>{display}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={S.card}>
        <h3 style={{...S.h3,marginTop:0}}>Évolution CA par filière</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={["An 1","An 2","An 3"].map((an,i)=>{const k=["a1","a2","a3"][i];return {an,...Object.fromEntries(REVENUS.map(r=>[r.fili.substring(0,12),r[k]/1000000]))};})}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridC}/>
            <XAxis dataKey="an" tick={{fill:textC,fontSize:11,fontFamily:F.m}}/>
            <YAxis tick={{fill:textC,fontSize:11,fontFamily:F.m}} tickFormatter={v=>v+"M"}/>
            <Tooltip contentStyle={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"5px"}} labelStyle={{color:C.accentLight,fontFamily:F.m}} formatter={v=>[v.toFixed(1)+"M FCFA",""]}/>
            <Legend wrapperStyle={{fontSize:"0.75rem",fontFamily:F.m,color:textC}}/>
            {REVENUS.map((r,i)=><Bar key={r.fili} dataKey={r.fili.substring(0,12)} stackId="a" fill={[C.greenLight,C.accent,C.gold][i]} radius={i===2?[3,3,0,0]:[0,0,0,0]}/>)}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={S.card}>
        <h3 style={{...S.h3,marginTop:0}}>Plan RH — Équipe permanente</h3>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.83rem"}}>
          <thead><tr>
            <th style={S.th}>Poste</th>
            <th style={S.th}>Nb</th>
            <th style={S.thR}>Salaire/mois (FCFA)</th>
            <th style={S.th}>Rôle clé</th>
          </tr></thead>
          <tbody>
            {RH.map((r,i)=>(
              <tr key={r.p} style={{background:i%2===0?C.card:C.surface}}>
                <td style={{...S.td,color:C.sand,fontWeight:"bold"}}>{r.p}</td>
                <td style={{...S.td,color:C.greenLight,fontFamily:F.m}}>{r.n}</td>
                <td style={{...S.tdR,color:C.accentLight}}>{r.s}</td>
                <td style={S.tdM}>{r.r}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{color:C.muted,fontSize:"0.82rem",marginTop:"0.65rem"}}>Masse salariale permanents : ~460 000–555 000 FCFA/mois · ~5,5–6,7M FCFA/an</p>
      </div>
    </div>
  );
}

// ─── TAB PROJECTION 10 ANS ────────────────────────────────────────────────────
function TabProjection() {
  return (
    <div>
      <h2 style={S.h2}>Projection Financière — 10 ans</h2>
      <div style={S.alert(C.accentLight)}>
        <strong>Hypothèses :</strong> An 4 = réinvestissement ~15M sur cash-flow propre (3e hectare + 1 000 poulets sup.). An 8 = ouverture possible 2e site. Scénario base — croissance conservative.
      </div>
      <div style={S.card}>
        <h3 style={{...S.h3,marginTop:0}}>CA total et résultat net annuel (M FCFA)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={PROJ10}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridC}/>
            <XAxis dataKey="an" tick={{fill:textC,fontSize:10,fontFamily:F.m}}/>
            <YAxis tick={{fill:textC,fontSize:10,fontFamily:F.m}} tickFormatter={v=>v+"M"}/>
            <Tooltip contentStyle={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"5px"}} labelStyle={{color:C.accentLight,fontFamily:F.m}} formatter={v=>[v.toFixed(1)+"M FCFA",""]}/>
            <Legend wrapperStyle={{fontSize:"0.75rem",fontFamily:F.m,color:textC}}/>
            <Bar dataKey="ca" name="CA Total" fill={C.accent} opacity={0.7} radius={[2,2,0,0]}/>
            <Bar dataKey="net" name="Résultat Net" fill={C.greenLight} radius={[2,2,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={S.card}>
        <h3 style={{...S.h3,marginTop:0}}>Cumul net 10 ans (M FCFA) — Seuil payback à 30M</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={PROJ10}>
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.greenLight} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={C.greenLight} stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridC}/>
            <XAxis dataKey="an" tick={{fill:textC,fontSize:10,fontFamily:F.m}}/>
            <YAxis tick={{fill:textC,fontSize:10,fontFamily:F.m}} tickFormatter={v=>v+"M"}/>
            <Tooltip contentStyle={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"5px"}} formatter={v=>[v.toFixed(1)+"M FCFA",""]}/>
            <Line type="monotone" dataKey="cumul" name="Cumul net" stroke={C.greenLight} strokeWidth={2} dot={{fill:C.greenLight,r:4}}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div style={S.card}>
        <h3 style={{...S.h3,marginTop:0}}>Tableau de projection — 10 ans</h3>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem",minWidth:"600px"}}>
            <thead><tr>
              {["Année","CA (M)","Net (M)","Cumul (M)","ROI cumulé","Événement clé"].map(h=><th key={h} style={S.th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {PROJ10.map((r,i)=>{
                const roi=Math.round(r.cumul/30*100);
                const isPayback=r.cumul>=30&&PROJ10[i-1]?.cumul<30;
                return (
                  <tr key={r.an} style={{background:isPayback?"#1e2f20":i%2===0?C.card:C.surface}}>
                    <td style={{...S.td,fontWeight:"bold",color:C.accentLight,fontFamily:F.m}}>{r.an}</td>
                    <td style={{...S.td,color:C.cyan,fontFamily:F.m}}>{r.ca}</td>
                    <td style={{...S.td,color:C.greenLight,fontWeight:"bold",fontFamily:F.m}}>{r.net}</td>
                    <td style={{...S.td,color:C.accentLight,fontFamily:F.m}}>{r.cumul.toFixed(1)}</td>
                    <td style={S.td}><span style={S.pill(roi>=100?C.greenLight:roi>=50?C.accent:C.muted)}>{roi}%</span></td>
                    <td style={S.tdM}>{isPayback?"🎯 "+r.event+" — PAYBACK ATTEINT":r.event}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── TAB RISQUES ─────────────────────────────────────────────────────────────
function TabRisques() {
  return (
    <div>
      <h2 style={S.h2}>Analyse des Risques & Plan de Mitigation</h2>
      <div style={S.card}>
        {RISQUES.map(r=>(
          <div key={r.r} style={{borderBottom:`1px solid ${C.border}`,paddingBottom:"1rem",marginBottom:"1rem"}}>
            <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"0.5rem",marginBottom:"0.4rem"}}>
              <strong style={{color:C.sand}}>{r.r}</strong>
              <span style={S.pill(C.muted)}>Prob : {r.prob}</span>
              <span style={S.pill(r.mc)}>Impact : {r.imp}</span>
            </div>
            <div style={{display:"flex",gap:"0.5rem"}}>
              <span style={{color:C.greenLight,flexShrink:0}}>🛡</span>
              <span style={{fontSize:"0.86rem",color:C.textMuted,lineHeight:1.6}}>{r.mit}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={S.card}>
        <h3 style={{...S.h3,marginTop:0}}>Erreurs classiques à éviter — modèle 30M Niayes</h3>
        {[
          "Construire avant d'avoir le bail emphytéotique notarié signé — une seule erreur foncière peut tout annihiler",
          "Sous-estimer le vide sanitaire avicole (15 jours) par impatience — contamination = cycle entier perdu (1–2M FCFA)",
          "Vendre toute la récolte oignon en mars à 200 FCFA/kg au lieu de stocker pour juin à 700 FCFA/kg",
          "Ouvrir Instagram pour l'élevage ovin trop tard — le carnet de commandes Tabaski se remplit 3–4 mois avant",
          "Recruter la famille sans contrat écrit — source n°1 de conflits irrémédiables dans les exploitations diaspora",
          "Accepter un délai de paiement > 7 jours avec les premiers clients restaurants (impayés = trésorerie compromise)",
          "Utiliser le fonds de roulement pour de la construction — il doit rester intouché jusqu'à la première récolte",
        ].map((e,i)=>(
          <div key={i} style={{display:"flex",gap:"0.75rem",marginBottom:"0.6rem"}}>
            <span style={{color:C.red,flexShrink:0,fontWeight:"bold"}}>✗</span>
            <span style={{fontSize:"0.86rem",color:C.textMuted,lineHeight:1.5}}>{e}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TAB ROADMAP ─────────────────────────────────────────────────────────────
function TabRoadmap() {
  const [open,setOpen]=useState(0);
  const phases=[
    {phase:"Phase 0 — Préparation",period:"Mois 1–4",color:C.muted,icon:"🎯",tasks:[
      "Voyage reconnaissance terrain (Niayes — Mboro, Lompoul, Kayar) — 2 semaines minimum sur place",
      "Signature bail emphytéotique notarié 1 ha — AVANT toute construction",
      "Constitution SARL via APIX + NINEA + ouverture compte professionnel (BICIS, CBAO ou Ecobank)",
      "3 devis minimum : foreurs, constructeurs (bergerie, avicole, hangar, logement, clôture)",
      "Recrutement chef de culture (annonce ENSA Thiès / réseau agriculteurs Niayes). Signer avant démarrage chantier",
      "Inscription coopérative agréée pour accès subventions engrais (-50%)",
      "Commande semences ISRA (oignon, 4 mois avant) + Technisem (poivron/tomate)",
    ]},
    {phase:"Phase 1 — Construction & Lancement",period:"Mois 4–8",color:C.accent,icon:"🔧",tasks:[
      "Puits + pompe solaire opérationnels et testés (débit 3m³/h minimum vérifié)",
      "Bâtiment avicole (6,5M) + bergerie (3M) + hangar (1,4M) + logement (2,2M) + clôture (1,3M) construits",
      "Irrigation goutte-à-goutte 1 ha posée et testée (débits, raccords, filtres)",
      "Achat 15 brebis Peulh-Peulh + 1 bélier Ladoum croisé",
      "Premier cycle avicole : 2 000 poussins. Vaccination J7 (Newcastle) + J14+J21 (Gumboro)",
      "Premiers semis : oignon (0,5 ha) + tomate (0,3 ha) + poivron (0,2 ha)",
      "Création page Instagram élevage ovin + groupe WhatsApp clients légumes (objectif : 30 premiers)",
    ]},
    {phase:"Phase 2 — Montée en Régime Commercial",period:"Mois 8–18",color:C.greenLight,icon:"📈",tasks:[
      "Première récolte oignon → stocker 30–40% en hangar ventilé (vente hors-saison ×3 prix)",
      "Test commercialisation : marché local + 1 grossiste Dakar + 5 clients WhatsApp B2C",
      "Prospection active : 15 restaurants Dakar / Niayes. Offre test 4 semaines. Objectif : 3 contrats signés",
      "Cycles avicoles 2 et 3 — optimisation ICR, ajustement ration",
      "Premier agnelage : évaluation taux fertilité, ajustement alimentation",
      "Tabaski An 1 : embouche 8–10 animaux (achetés maigres 3 mois avant). Vente via Instagram + famille",
      "Bilan 12 mois avec investisseur — reporting complet CA/filière + marge réelle",
    ]},
    {phase:"Phase 3 — Consolidation & Extension",period:"Mois 18–36",color:C.accentLight,icon:"🏆",tasks:[
      "3 contrats restaurants annuels signés (prix fixé 3 mois à l'avance)",
      "Approche 1–2 hôtels Saly ou Dakar : dossier fournisseur + visite exploitation",
      "Introduction sang Ladoum : achat 1–2 béliers Ladoum purs supplémentaires (croisement)",
      "Investissement 3e hectare (sur cash-flow An 3) ou extension aviculture 3 000 sujets",
      "Test export CEDEAO : 3–5 tonnes oignon via courtier Guinée. Évaluation marge vs logistique",
      "Développement marque : sac oignon labellisé, carton tomate, compte Instagram actif 500+ abonnés",
    ]},
  ];
  return (
    <div>
      <h2 style={S.h2}>Feuille de Route — 36 mois</h2>
      <div style={{position:"relative"}}>
        <div style={{position:"absolute",left:"23px",top:"30px",bottom:"30px",width:"2px",background:`linear-gradient(to bottom,${C.muted},${C.accentLight})`,zIndex:0}}/>
        {phases.map((ph,i)=>(
          <div key={ph.phase} style={{display:"flex",gap:"1rem",marginBottom:"0.85rem",position:"relative",zIndex:1}}>
            <div onClick={()=>setOpen(open===i?null:i)} style={{width:"46px",height:"46px",borderRadius:"50%",background:ph.color+"22",border:`2px solid ${ph.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0,cursor:"pointer",boxShadow:open===i?`0 0 12px ${ph.color}66`:"none"}}>{ph.icon}</div>
            <div style={{flex:1}}>
              <div onClick={()=>setOpen(open===i?null:i)} style={{display:"flex",alignItems:"center",gap:"0.75rem",cursor:"pointer",flexWrap:"wrap",marginBottom:open===i?"0.75rem":0}}>
                <strong style={{color:ph.color,fontFamily:F.d,fontSize:"0.95rem"}}>{ph.phase}</strong>
                <span style={S.pill(C.muted)}>{ph.period}</span>
                <span style={{color:C.muted,marginLeft:"auto"}}>{open===i?"▲":"▼"}</span>
              </div>
              {open===i&&(
                <div style={{...S.card,padding:"0.85rem",marginBottom:0}}>
                  {ph.tasks.map((t,j)=>(
                    <div key={j} style={{display:"flex",gap:"0.6rem",marginBottom:"0.45rem"}}>
                      <span style={{color:ph.color,flexShrink:0,fontSize:"0.8rem"}}>◆</span>
                      <span style={{fontSize:"0.85rem",color:C.textMuted,lineHeight:1.5}}>{t}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{...S.card,background:"#1e2f20",borderColor:C.greenLight,padding:"1.5rem",textAlign:"center",marginTop:"0.5rem"}}>
        <div style={{fontSize:"0.68rem",color:C.muted,fontFamily:F.m,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.85rem"}}>Synthèse financière — Business Plan 30M FCFA · Niayes Mboro · 2026</div>
        <div style={{display:"flex",justifyContent:"center",gap:"1.5rem",flexWrap:"wrap"}}>
          {[{l:"Capital investi",v:fmt(totalBudget)+" F"},{l:"Net An 1",v:"+2,5M"},{l:"Net An 3",v:"+11,8M"},{l:"Marge An 3",v:"~38%"},{l:"Payback",v:"~3,7 ans"},{l:"Cumul 3 ans",v:"~21M"},{l:"ROI 3 ans",v:"71%"}].map(k=>(
            <div key={k.l} style={{textAlign:"center"}}>
              <div style={{fontSize:"1.05rem",fontWeight:"bold",color:C.accentLight,fontFamily:F.m}}>{k.v}</div>
              <div style={{fontSize:"0.62rem",color:C.muted,fontFamily:F.m,textTransform:"uppercase",letterSpacing:"0.07em"}}>{k.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TABS=[
  {l:"Budget 30M",C:TabBudget},{l:"P&L 3 ans",C:TabPL},
  {l:"Projection 10 ans",C:TabProjection},{l:"Risques",C:TabRisques},{l:"Roadmap",C:TabRoadmap},
];
export default function BusinessPlan() {
  const [active,setActive]=useState(0);
  const Comp=TABS[active].C;
  return (
    <div style={S.wrap}>
      <div style={S.header}>
        <div style={{display:"inline-block",background:C.greenLight,color:"#0f1a10",fontSize:"0.62rem",fontFamily:F.m,fontWeight:"bold",letterSpacing:"0.14em",padding:"0.2rem 0.7rem",borderRadius:"2px",marginBottom:"0.7rem",textTransform:"uppercase"}}>
          03 · Business Plan · 30M FCFA · Coûts Construction Corrigés 2026
        </div>
        <h1 style={{fontSize:"clamp(1.4rem,3.5vw,2rem)",fontWeight:"bold",color:C.text,margin:"0 0 0.4rem",fontFamily:F.d}}>Business Plan 30M FCFA 🇸🇳</h1>
        <p style={{color:C.muted,fontSize:"0.88rem",fontFamily:F.m,margin:"0 0 0.85rem"}}>Zone Niayes (Mboro intérieur) · 1 ha · Maraîchage + Aviculture + Ovin · Budget + P&L + Projection 10 ans</p>
        <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
          {["Budget "+fmt(totalBudget)+" FCFA","Net An3 : +11,8M","ROI 3 ans : 71%","Payback : 3,7 ans","Construction corrigée bottom-up"].map(t=>(
            <span key={t} style={{background:"rgba(74,158,92,0.15)",border:"1px solid rgba(74,158,92,0.3)",color:C.greenLight,padding:"0.18rem 0.6rem",borderRadius:"20px",fontSize:"0.7rem",fontFamily:F.m}}>{t}</span>
          ))}
        </div>
      </div>
      <nav style={S.nav}>
        {TABS.map((t,i)=><button key={t.l} style={S.navBtn(i===active)} onClick={()=>setActive(i)}>{t.l}</button>)}
      </nav>
      <div style={S.main}><Comp/></div>
    </div>
  );
}
