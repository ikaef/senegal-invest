'use client'
import { useState } from "react";

const C = {
  bg:"#0f1a10", surface:"#162018", card:"#1c2b1e", border:"#2a3d2c",
  accent:"#c8893a", accentLight:"#e8a84a",
  green:"#4a9e5c", greenLight:"#6dbf7e",
  sand:"#d4b896", muted:"#7a9b7d", text:"#e8ede9", textMuted:"#9ab59c",
  red:"#e07a7a", cyan:"#5ecfb8", blue:"#5a9eff", gold:"#d4a820",
};
const F = { d:"'Georgia','Times New Roman',serif", m:"'Courier New',monospace" };
const fmt = n => n.toLocaleString("fr-FR");

const SLIDES = [
  {
    id:0, title:"Couverture",
    render:()=>(
      <div style={{minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#0a1a0c,#1a2e1c 50%,#0f2010)",borderRadius:"12px",padding:"3rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"4px",background:`linear-gradient(90deg,${C.greenLight},${C.accent},${C.gold})`}}/>
        <div>
          <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🇸🇳</div>
          <div style={{fontSize:"0.72rem",fontFamily:F.m,color:C.accent,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"1rem"}}>Document Confidentiel — Investisseurs</div>
          <h1 style={{fontSize:"clamp(2rem,5vw,3.2rem)",fontWeight:"bold",color:C.text,fontFamily:F.d,lineHeight:1.1,margin:"0 0 1rem"}}>
            Exploitation Agri-Élevage<br/><span style={{color:C.accentLight}}>Sénégal 2026</span>
          </h1>
          <p style={{color:C.sand,fontSize:"1.1rem",fontFamily:F.d,fontStyle:"italic",marginBottom:"2rem"}}>
            Maraîchage irrigué · Aviculture · Élevage Ovin<br/>Zone Niayes (Mboro intérieur) · 1 hectare · Modèle intégré
          </p>
          <div style={{display:"flex",justifyContent:"center",gap:"2rem",flexWrap:"wrap",marginBottom:"2rem"}}>
            {[{v:"30M FCFA",l:"Capital total"},{v:"71%",l:"ROI 3 ans"},{v:"3,7 ans",l:"Payback"},{v:"0",l:"Emprunt bancaire"}].map(k=>(
              <div key={k.l} style={{background:C.card,border:`1px solid ${C.accent}44`,borderRadius:"8px",padding:"1rem 1.5rem",minWidth:"120px"}}>
                <div style={{fontSize:"1.8rem",fontWeight:"bold",color:C.accentLight,fontFamily:F.m}}>{k.v}</div>
                <div style={{fontSize:"0.7rem",color:C.muted,fontFamily:F.m,textTransform:"uppercase",letterSpacing:"0.1em"}}>{k.l}</div>
              </div>
            ))}
          </div>
          <div style={{color:C.muted,fontSize:"0.85rem",fontFamily:F.m}}>Vision Sénégal 2050 · Données terrain 2026</div>
        </div>
      </div>
    )
  },
  {
    id:1, title:"01 — L'Opportunité",
    render:()=>(
      <div>
        <SlideHeader n="01" title="Une opportunité structurelle" sub="Marché sénégalais en sous-offre qualitative chronique"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem",marginBottom:"1.5rem"}}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderLeft:`4px solid ${C.red}`,borderRadius:"6px",padding:"1.5rem"}}>
            <div style={{fontSize:"0.72rem",fontFamily:F.m,color:C.red,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"0.75rem"}}>Le problème</div>
            {[
              "85% des exploitants font moins de 1 ha — qualité irrégulière, impossibilité de servir les B2B",
              "100 000 tonnes d'oignons importées/an malgré un potentiel local immense",
              "Hôtels et restaurants de Dakar achètent en import faute d'offre locale structurée",
              "Rares exploitations combinent les 3 filières : maraîchage + aviculture + élevage ovin",
            ].map((p,i)=>(
              <div key={i} style={{display:"flex",gap:"0.75rem",marginBottom:"0.65rem"}}>
                <div style={{width:"20px",height:"20px",borderRadius:"50%",background:C.red+"22",border:`1px solid ${C.red}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.65rem",color:C.red,flexShrink:0}}>✗</div>
                <span style={{fontSize:"0.87rem",color:C.textMuted,lineHeight:1.5}}>{p}</span>
              </div>
            ))}
          </div>
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderLeft:`4px solid ${C.greenLight}`,borderRadius:"6px",padding:"1.5rem"}}>
            <div style={{fontSize:"0.72rem",fontFamily:F.m,color:C.greenLight,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"0.75rem"}}>Le marché</div>
            {[
              {v:"200 Mds FCFA",l:"Marché légumes Dakar / an"},
              {v:"+8%/an",l:"Croissance marché volaille"},
              {v:"700 000+",l:"Ovins Tabaski sacrifiés / an"},
              {v:"+7%",l:"PIB Sénégal 2026 (pétrole Sangomar)"},
            ].map(k=>(
              <div key={k.l} style={{display:"flex",justifyContent:"space-between",padding:"0.45rem 0",borderBottom:`1px solid ${C.border}`}}>
                <span style={{fontSize:"0.85rem",color:C.muted}}>{k.l}</span>
                <strong style={{color:C.accentLight,fontFamily:F.m}}>{k.v}</strong>
              </div>
            ))}
            <div style={{background:C.accent+"18",border:`1px solid ${C.accent}44`,borderRadius:"4px",padding:"0.65rem",marginTop:"0.85rem",fontSize:"0.82rem",color:C.text}}>
              <strong style={{color:C.accentLight}}>Vision Sénégal 2050 :</strong> souveraineté alimentaire = priorité nationale explicite du gouvernement Diomaye Faye. Subventions intrants : 130 Mds FCFA (campagne 2025-26).
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem"}}>
          {[
            {icon:"💧",t:"Déficit offre qualitative",d:"Un exploitant irrigué avec 3 filières dispose d'un avantage structurel immédiat sur 85% de la concurrence locale."},
            {icon:"📱",t:"Révolution Wave / WhatsApp",d:"Paiement instantané + canal de vente direct premium = marge +50–80% sans intermédiaire. Inexistant dans l'agriculture traditionnelle."},
            {icon:"🌍",t:"Import direct accessible",d:"Équipements Chine direct (-60% vs local) = économie 1–2M FCFA sur l'investissement initial. Avantage diaspora unique."},
          ].map(s=>(
            <div key={s.t} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"6px",padding:"1rem"}}>
              <div style={{fontSize:"1.5rem",marginBottom:"0.4rem"}}>{s.icon}</div>
              <div style={{fontWeight:"bold",color:C.sand,marginBottom:"0.3rem",fontSize:"0.9rem"}}>{s.t}</div>
              <div style={{fontSize:"0.82rem",color:C.textMuted,lineHeight:1.5}}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id:2, title:"02 — Notre Solution",
    render:()=>(
      <div>
        <SlideHeader n="02" title="Exploitation intégrée 3 filières" sub="Niayes — Mboro intérieur · 1 hectare · Forage corrigé 50K/ml · 2026"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",marginBottom:"1.5rem"}}>
          {[
            {icon:"🥬",color:C.greenLight,t:"Maraîchage irrigué",surf:"1 hectare",details:["Oignon, tomate, poivron","3 cycles / an","Irrigation goutte-à-goutte solaire","Stockage hors-saison ×3 prix oignon"],ca:"9M → 18M FCFA/an"},
            {icon:"🐓",color:C.accent,t:"Aviculture moderne",surf:"2 000 poulets / cycle",details:["6 cycles de 45 jours / an","Cash-flow le plus régulier","Fumier → engrais maraîchage","Label fermier : +35% prix"],ca:"3,5M → 5,5M FCFA/an"},
            {icon:"🐑",color:C.gold,t:"Élevage ovin",surf:"15 brebis → croissance",details:["Races Peulh + croisé Ladoum","Tabaski : 150–350K FCFA/tête","Instagram = vente premium","Reproducteurs An 4+ : 500K+"],ca:"2,5M → 7,5M FCFA/an"},
          ].map(f=>(
            <div key={f.t} style={{background:C.card,border:`1px solid ${C.border}`,borderTop:`4px solid ${f.color}`,borderRadius:"6px",padding:"1.25rem"}}>
              <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>{f.icon}</div>
              <div style={{fontWeight:"bold",color:f.color,fontSize:"1rem",fontFamily:F.d,marginBottom:"0.2rem"}}>{f.t}</div>
              <div style={{fontSize:"0.78rem",color:C.muted,fontFamily:F.m,marginBottom:"0.75rem"}}>{f.surf}</div>
              {f.details.map(d=>(
                <div key={d} style={{display:"flex",gap:"0.4rem",marginBottom:"0.3rem"}}>
                  <span style={{color:f.color,flexShrink:0,fontSize:"0.78rem"}}>→</span>
                  <span style={{fontSize:"0.82rem",color:C.textMuted}}>{d}</span>
                </div>
              ))}
              <div style={{background:f.color+"22",border:`1px solid ${f.color}44`,borderRadius:"4px",padding:"0.4rem 0.65rem",marginTop:"0.75rem",fontSize:"0.82rem",fontWeight:"bold",color:f.color,fontFamily:F.m}}>
                {f.ca}
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"#1e2f20",border:`1px solid ${C.accent}44`,borderRadius:"6px",padding:"1.25rem",display:"flex",gap:"1rem",alignItems:"center"}}>
          <div style={{fontSize:"2rem",flexShrink:0}}>⚙️</div>
          <div>
            <strong style={{color:C.accentLight,display:"block",marginBottom:"0.25rem"}}>Synergie intégrée — L'avantage du modèle 3 filières</strong>
            <div style={{fontSize:"0.87rem",color:C.sand,lineHeight:1.6}}>
              Fumier avicole → engrais maraîchage (économie 600K–1,2M FCFA/an) · Ovin Ladoum → revenus Tabaski stables · Maraîchage → cash-flow mensuel régulier · 3 filières = amortissement du risque climatique
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id:3, title:"03 — Construction & Budget",
    render:()=>(
      <div>
        <SlideHeader n="03" title="Budget réel 30M FCFA" sub="Coûts construction ruraux corrigés — méthode bottom-up artisans locaux 2026"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem",marginBottom:"1.25rem"}}>
          <div>
            <div style={{fontSize:"0.7rem",fontFamily:F.m,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.75rem"}}>Répartition du capital</div>
            {[
              {l:"Foncier + frais juridiques (Niayes Mboro, 1ha)",v:4050000,c:C.accentLight},
              {l:"Forage 12m (50K/ml) + tubage + pompe Lorentz",v:3750000,c:C.blue},
              {l:"Irrigation 1ha (import Chine direct)",v:650000,c:C.blue},
              {l:"Avicole 200m² (rural basique)",v:6500000,c:C.accent},
              {l:"Bergerie 80m²",v:3000000,c:C.accent},
              {l:"Hangar stockage 50m²",v:1400000,c:C.accent},
              {l:"Logement + bureau 30m²",v:2200000,c:C.accent},
              {l:"Clôture 400ml",v:1300000,c:C.accent},
              {l:"Tricycle + cheptel ovin + avicole",v:3830000,c:C.gold},
              {l:"Semences + intrants + admin",v:1100000,c:C.greenLight},
              {l:"Fonds de roulement (4 mois)",v:4200000,c:C.cyan},
            ].map(r=>{
              const total=29230000;
              const pct=Math.round(r.v/total*100);
              return (
                <div key={r.l} style={{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.28rem 0",borderBottom:`1px solid ${C.border}`,fontSize:"0.8rem"}}>
                  <span style={{flex:1,color:C.muted}}>{r.l}</span>
                  <div style={{width:"40px",height:"4px",background:C.border,borderRadius:"2px"}}>
                    <div style={{height:"100%",width:`${Math.min(pct*2.5,100)}%`,background:r.c,borderRadius:"2px"}}/>
                  </div>
                  <strong style={{color:r.c,fontFamily:F.m,fontSize:"0.78rem",minWidth:"45px",textAlign:"right"}}>{(r.v/1000000).toFixed(1)}M</strong>
                </div>
              );
            })}
            <div style={{display:"flex",justifyContent:"space-between",padding:"0.5rem 0",fontWeight:"bold"}}>
              <span style={{color:C.accentLight}}>TOTAL</span>
              <strong style={{color:C.accentLight,fontFamily:F.m}}>29,2M FCFA</strong>
            </div>
          </div>
          <div>
            <div style={{fontSize:"0.7rem",fontFamily:F.m,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.75rem"}}>Construction rurale corrigée (bottom-up)</div>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"6px",padding:"1rem",marginBottom:"0.85rem"}}>
              <div style={{fontSize:"0.8rem",color:C.textMuted,lineHeight:1.7}}>
                Zone <strong style={{color:C.text}}>Niayes — Mboro intérieur</strong> (5–10km côte). Forage corrigé à <strong style={{color:C.text}}>50 000 FCFA/ml</strong> — nappe 8–15m → forage 12m = 600K FCFA (vs 2,25M pour Thiès 45m). L'économie forage compense le surcoût foncier. Budget total : ~<strong style={{color:C.text}}>32–33M FCFA</strong> capital recommandé. Bâtiments ruraux bottom-up ANSD 2026.
              </div>
            </div>
            {[
              {bat:"Bâtiment avicole 200m²",v:"6,5M FCFA",note:"~32 500/m²"},
              {bat:"Bergerie 80m²",v:"3,0M FCFA",note:"~37 500/m²"},
              {bat:"Hangar 50m²",v:"1,4M FCFA",note:"~28 000/m²"},
              {bat:"Logement gardien 30m²",v:"2,2M FCFA",note:"~73 000/m² (finitions)"},
              {bat:"Clôture 400ml",v:"1,3M FCFA",note:"~3 250/ml"},
              {bat:"Total 5 bâtiments",v:"14,4M FCFA",note:"48% du capital total",bold:true},
            ].map(r=>(
              <div key={r.bat} style={{display:"flex",justifyContent:"space-between",padding:"0.35rem 0",borderBottom:`1px solid ${C.border}`,fontSize:"0.82rem",fontWeight:r.bold?"bold":"normal"}}>
                <span style={{color:r.bold?C.accentLight:C.muted}}>{r.bat}</span>
                <div style={{textAlign:"right"}}>
                  <strong style={{color:r.bold?C.accentLight:C.text,fontFamily:F.m,display:"block"}}>{r.v}</strong>
                  <span style={{fontSize:"0.7rem",color:C.muted}}>{r.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id:4, title:"04 — Performance Financière",
    render:()=>(
      <div>
        <SlideHeader n="04" title="Performance financière" sub="P&L 3 ans + projection 10 ans — positif dès l'An 1"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:"0.75rem",marginBottom:"1.5rem"}}>
          {[
            {v:"+2,5M",l:"Net An 1",c:C.greenLight},{v:"+11,8M",l:"Net An 3",c:C.accentLight},
            {v:"38%",l:"Marge An 3",c:C.cyan},{v:"71%",l:"ROI 3 ans",c:C.gold},
            {v:"3,7 ans",l:"Payback",c:C.accent},{v:"~228M",l:"Cumul net 10 ans",c:C.greenLight},
          ].map(k=>(
            <div key={k.l} style={{background:C.card,border:`1px solid ${C.border}`,borderTop:`2px solid ${k.c}`,borderRadius:"4px",padding:"0.85rem",textAlign:"center"}}>
              <div style={{fontSize:"1.3rem",fontWeight:"bold",color:k.c,fontFamily:F.m}}>{k.v}</div>
              <div style={{fontSize:"0.62rem",color:C.muted,fontFamily:F.m,textTransform:"uppercase",letterSpacing:"0.07em",marginTop:"0.2rem"}}>{k.l} FCFA</div>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1.25rem"}}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"6px",padding:"1.25rem"}}>
            <div style={{fontSize:"0.7rem",fontFamily:F.m,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.75rem"}}>P&L simplifié — 3 ans (M FCFA)</div>
            {[
              {l:"CA An 1",v:"15,0M",c:C.cyan},{l:"Net An 1",v:"+2,5M",c:C.greenLight},
              {l:"CA An 2",v:"23,8M",c:C.cyan},{l:"Net An 2",v:"+7,0M",c:C.greenLight},
              {l:"CA An 3",v:"31,0M",c:C.cyan,bold:true},{l:"Net An 3",v:"+11,8M",c:C.accentLight,bold:true},
            ].map(r=>(
              <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"0.3rem 0",borderBottom:`1px solid ${C.border}`,fontSize:r.bold?"0.9rem":"0.82rem",fontWeight:r.bold?"bold":"normal"}}>
                <span style={{color:C.muted}}>{r.l}</span>
                <strong style={{color:r.c,fontFamily:F.m}}>{r.v}</strong>
              </div>
            ))}
          </div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"6px",padding:"1.25rem"}}>
            <div style={{fontSize:"0.7rem",fontFamily:F.m,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.75rem"}}>Projection 10 ans — jalons</div>
            {[
              {an:"An 1",ca:"15M",net:"+2,5M",event:"Démarrage"},
              {an:"An 3",ca:"31M",net:"+11,8M",event:"Payback proche"},
              {an:"An 4",ca:"41M",net:"+16M",event:"Extension 3e ha"},
              {an:"An 5",ca:"52M",net:"+22M",event:"🎯 Payback atteint"},
              {an:"An 10",ca:"101M",net:"+40M",event:"Cumul ~228M FCFA"},
            ].map(r=>(
              <div key={r.an} style={{display:"flex",gap:"0.5rem",padding:"0.3rem 0",borderBottom:`1px solid ${C.border}`,fontSize:"0.82rem"}}>
                <span style={{color:C.muted,fontFamily:F.m,minWidth:"35px"}}>{r.an}</span>
                <span style={{color:C.cyan,fontFamily:F.m,minWidth:"45px"}}>{r.ca}</span>
                <span style={{color:C.greenLight,fontFamily:F.m,fontWeight:"bold",minWidth:"55px"}}>{r.net}</span>
                <span style={{color:C.muted,flex:1}}>{r.event}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:"#1e2f20",border:`1px solid ${C.greenLight}44`,borderRadius:"6px",padding:"1rem",fontSize:"0.85rem",color:C.text}}>
          <strong style={{color:C.greenLight}}>Comparaison patrimoine 10 ans : </strong>
          30M FCFA investis → cumul net ~228M FCFA en 10 ans. Valorisation exploitation à ×9 EBITDA An 10 = ~360M FCFA de valeur de cession. <strong>Total richesse créée : 400–500M FCFA</strong> sur un capital initial de 30M.
        </div>
      </div>
    )
  },
  {
    id:5, title:"05 — Distribution & Canaux",
    render:()=>(
      <div>
        <SlideHeader n="05" title="Stratégie commerciale" sub="5 canaux de distribution — marge croissante par ordre de déploiement"/>
        <div style={{marginBottom:"1.25rem"}}>
          {[
            {n:1,nom:"Marchés locaux & Grossistes Dakar",timing:"Immédiat",marge:"Faible",mc:C.muted,pct:15,desc:"Écoulement volume + liquidité immédiate. Canal An 1 obligatoire."},
            {n:2,nom:"Restaurants mid-range Dakar / Niayes/Mbour",timing:"Mois 3–6",marge:"Haute (+30%)",mc:C.greenLight,pct:60,desc:"Contrat annuel. Prix stables. Cœur de la stratégie B2B."},
            {n:3,nom:"Paniers légumes WhatsApp B2C",timing:"Mois 3–6",marge:"Très haute (+60%)",mc:C.cyan,pct:80,desc:"Wave immédiat. Marge maximale. Zéro intermédiaire."},
            {n:4,nom:"Tabaski — vente directe ovins (Instagram)",timing:"Annuel",marge:"Très haute",mc:C.gold,pct:90,desc:"3–7M FCFA en 2 semaines. Carnet pré-rempli Instagram."},
            {n:5,nom:"Hôtels Saly / Dakar (An 2+)",timing:"12–24 mois",marge:"Maximale (+55%)",mc:C.accent,pct:100,desc:"Contrat annuel stable. Exige régularité + chambre froide."},
          ].map(c=>(
            <div key={c.n} style={{display:"flex",gap:"1rem",padding:"0.75rem",marginBottom:"0.5rem",background:C.card,border:`1px solid ${C.border}`,borderLeft:`4px solid ${c.mc}`,borderRadius:"6px",alignItems:"center",flexWrap:"wrap"}}>
              <div style={{width:"28px",height:"28px",borderRadius:"50%",background:c.mc+"22",border:`1px solid ${c.mc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",color:c.mc,fontFamily:F.m,fontWeight:"bold",flexShrink:0}}>{c.n}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:"bold",color:C.sand,fontSize:"0.9rem"}}>{c.nom}</div>
                <div style={{fontSize:"0.8rem",color:C.textMuted}}>{c.desc}</div>
              </div>
              <div style={{display:"flex",gap:"0.5rem",alignItems:"center",flexShrink:0}}>
                <span style={{fontSize:"0.72rem",fontFamily:F.m,color:C.muted}}>{c.timing}</span>
                <div style={{background:`linear-gradient(90deg,${c.mc} ${c.pct}%,${C.border} ${c.pct}%)`,height:"6px",width:"80px",borderRadius:"3px"}}/>
                <span style={{fontSize:"0.78rem",fontFamily:F.m,color:c.mc,fontWeight:"bold",minWidth:"80px"}}>{c.marge}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:C.accent+"18",border:`1px solid ${C.accent}44`,borderRadius:"6px",padding:"1rem",fontSize:"0.85rem",color:C.text}}>
          <strong style={{color:C.accentLight}}>Principe de triangulation :</strong> 1 canal volume (grossiste) + 1 canal marge (restaurant) + 1 canal premium (WhatsApp). Ne jamais dépendre d'un seul acheteur. Jamais un seul acheteur &gt; 30% du CA.
        </div>
      </div>
    )
  },
  {
    id:6, title:"06 — Proposition Investisseur",
    render:()=>(
      <div>
        <SlideHeader n="06" title="Proposition aux investisseurs" sub="Trois niveaux de participation — sans emprunt bancaire"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",marginBottom:"1.5rem"}}>
          {[
            {lbl:"OPTION A",titre:"Investisseur Minoritaire",montant:"5–10M FCFA",part:"15–25%",color:C.blue,
             avs:["Participation aux bénéfices annuels","Reporting trimestriel complet","Visite exploitation bi-annuelle","Pas de gestion opérationnelle"],
             retour:"ROI estimé An 5 : 120–180%",
             calendrier:["An 1 : 0 (montée en charge)","An 2 : 15–25% × 7M = 1,05–1,75M","An 3 : 15–25% × 11,8M = 1,77–2,95M"]},
            {lbl:"OPTION B ★",titre:"Investisseur Associé",montant:"10–15M FCFA",part:"30–40%",color:C.accent,recommended:true,
             avs:["Dividendes + siège comité directeur","Participation aux décisions stratégiques","Priorité sur extension Phase 2","Reporting mensuel + tableaux de bord"],
             retour:"ROI estimé An 5 : 150–220%",
             calendrier:["An 1 : 0 (montée en charge)","An 2 : 30% × 7M = 2,1M","An 3 : 30% × 11,8M = 3,54M"]},
            {lbl:"OPTION C",titre:"Co-Fondateur",montant:"15–20M FCFA",part:"45–50%",color:C.gold,
             avs:["Co-décision sur toutes les orientations","Valorisation maximale à la revente","Priorité 2e site An 8","Risques ET bénéfices à égalité"],
             retour:"ROI estimé An 5 : 180–260%",
             calendrier:["An 1 : 0 (montée en charge)","An 2 : 45% × 7M = 3,15M","An 3 : 45% × 11,8M = 5,31M"]},
          ].map(o=>(
            <div key={o.lbl} style={{background:C.card,border:`2px solid ${o.color}`,borderTop:`4px solid ${o.color}`,borderRadius:"6px",padding:"1.25rem",position:"relative"}}>
              {o.recommended&&<div style={{position:"absolute",top:"-12px",left:"50%",transform:"translateX(-50%)",background:C.accent,color:"#0f1a10",fontSize:"0.65rem",fontFamily:F.m,fontWeight:"bold",padding:"0.15rem 0.6rem",borderRadius:"20px",letterSpacing:"0.1em"}}>RECOMMANDÉ</div>}
              <div style={{fontSize:"0.68rem",fontFamily:F.m,color:o.color,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.3rem"}}>{o.lbl}</div>
              <div style={{fontWeight:"bold",color:C.sand,fontSize:"0.95rem",fontFamily:F.d,marginBottom:"0.5rem"}}>{o.titre}</div>
              <div style={{fontSize:"1.4rem",fontWeight:"bold",color:o.color,fontFamily:F.m,marginBottom:"0.15rem"}}>{o.montant}</div>
              <div style={{fontSize:"0.8rem",color:C.muted,marginBottom:"0.85rem"}}>Part : {o.part}</div>
              {o.avs.map(a=><div key={a} style={{display:"flex",gap:"0.4rem",marginBottom:"0.3rem"}}><span style={{color:o.color,flexShrink:0,fontSize:"0.75rem"}}>+</span><span style={{fontSize:"0.8rem",color:C.textMuted}}>{a}</span></div>)}
              <div style={{background:o.color+"22",borderRadius:"4px",padding:"0.5rem 0.65rem",marginTop:"0.75rem"}}>
                <div style={{fontSize:"0.7rem",fontFamily:F.m,color:o.color,fontWeight:"bold",marginBottom:"0.25rem"}}>Retours estimés :</div>
                {o.calendrier.map(c=><div key={c} style={{fontSize:"0.78rem",color:C.textMuted}}>{c}</div>)}
              </div>
              <div style={{background:o.color,padding:"0.4rem",borderRadius:"4px",marginTop:"0.75rem",textAlign:"center",fontSize:"0.82rem",fontWeight:"bold",color:"#0f1a10"}}>{o.retour}</div>
            </div>
          ))}
        </div>
        <div style={{background:"#1e2f20",border:`1px solid ${C.greenLight}44`,borderRadius:"6px",padding:"1rem",fontSize:"0.85rem",color:C.text}}>
          <strong style={{color:C.greenLight}}>Garanties structurelles :</strong> Zéro emprunt bancaire (0 risque dette) · Bail emphytéotique notarié (sécurité foncière) · Assurances CNAAS cheptel · Reporting transparent Wave/WhatsApp · Acte associé notarié obligatoire
        </div>
      </div>
    )
  },
  {
    id:7, title:"07 — Roadmap & Risques",
    render:()=>(
      <div>
        <SlideHeader n="07" title="Plan d'exécution & Risques" sub="Roadmap 36 mois — tous les risques identifiés et mitigés"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem",marginBottom:"1.25rem"}}>
          <div>
            <div style={{fontSize:"0.7rem",fontFamily:F.m,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.85rem"}}>Roadmap 36 mois</div>
            {[
              {phase:"Phase 0 (M1–4)",color:C.muted,items:["Bail notarié signé","SARL + NINEA","Recrutement chef culture","Commandes semences"]},
              {phase:"Phase 1 (M4–8)",color:C.accent,items:["Construction 5 bâtiments","Puits + pompe opérationnels","Premier cycle avicole","Premiers semis"]},
              {phase:"Phase 2 (M8–18)",color:C.greenLight,items:["Première récolte → commercialisation","3 contrats restaurants signés","Tabaski An 1 via Instagram","Stockage oignon hors-saison"]},
              {phase:"Phase 3 (M18–36)",color:C.accentLight,items:["Extension 3e hectare (cash-flow)","2 hôtels approchés","Ladoum croisé reproducteurs","Test export CEDEAO"]},
            ].map(p=>(
              <div key={p.phase} style={{display:"flex",gap:"0.75rem",marginBottom:"0.75rem"}}>
                <div style={{width:"4px",background:p.color,borderRadius:"2px",flexShrink:0,minHeight:"60px"}}/>
                <div>
                  <div style={{fontWeight:"bold",color:p.color,fontSize:"0.85rem",marginBottom:"0.3rem"}}>{p.phase}</div>
                  {p.items.map(it=><div key={it} style={{fontSize:"0.8rem",color:C.textMuted,marginBottom:"0.15rem"}}>◆ {it}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{fontSize:"0.7rem",fontFamily:F.m,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.85rem"}}>Risques & Mitigation</div>
            {[
              {r:"Sécheresse / eau",niv:"Moyen",mit:"Forage 12m + pompe Lorentz. Nappe Niayes < 15m sub-permanente. Réserve 20m³.",c:C.accent},
              {r:"Épizootie aviaire",niv:"Moyen",mit:"Vaccination J7+J14+J21. Vide sanitaire. CNAAS.",c:C.accent},
              {r:"Chute prix oignon",niv:"Élevé",mit:"Stockage hors-saison ×3. Contrats restaurants.",c:C.red},
              {r:"Litige foncier",niv:"Critique",mit:"Bail notarié AVANT construction.",c:C.red},
              {r:"Vols / Insécurité",niv:"Élevé",mit:"Clôture + gardien nuit + éclairage solaire.",c:C.accent},
              {r:"Épidémie PPR ovins",niv:"Moyen",mit:"Vaccination annuelle. Vétérinaire local.",c:C.accent},
            ].map(r=>(
              <div key={r.r} style={{background:C.card,border:`1px solid ${C.border}`,borderLeft:`3px solid ${r.c}`,borderRadius:"4px",padding:"0.65rem",marginBottom:"0.5rem"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.2rem"}}>
                  <strong style={{color:C.sand,fontSize:"0.83rem"}}>{r.r}</strong>
                  <span style={{fontSize:"0.7rem",fontFamily:F.m,color:r.c,fontWeight:"bold"}}>{r.niv}</span>
                </div>
                <div style={{fontSize:"0.78rem",color:C.textMuted}}>🛡 {r.mit}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:C.accent+"18",border:`1px solid ${C.accent}44`,borderRadius:"6px",padding:"1rem",fontSize:"0.85rem",color:C.text}}>
          <strong style={{color:C.accentLight}}>Conclusion :</strong> Aucun risque n'est bloquant. Chaque risque dispose d'un plan de mitigation opérationnel déployable immédiatement. La combinaison 3 filières + irrigation solaire + construction rurale corrigée fait de ce modèle <strong>le meilleur ratio ROI/risque de la gamme</strong> (71% sur 3 ans, payback 3,7 ans).
        </div>
      </div>
    )
  },
  {
    id:8, title:"08 — Prochaines Étapes",
    render:()=>(
      <div>
        <SlideHeader n="08" title="Prochaines étapes" sub="4 jalons pour lancer l'exploitation"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem",marginBottom:"1.5rem"}}>
          {[
            {n:"01",t:"Réunion de présentation",d:"Discussion autour de ce dossier. Visite virtuelle du projet (photos terrain Niayes-Mboro, devis artisans). Réponse à toutes les questions."},
            {n:"02",t:"Due diligence & Term Sheet",d:"Remise du business plan complet (budget détaillé, P&L, projection 10 ans, analyse fournisseurs). Définition de la structure (Option A, B ou C). Signature term sheet."},
            {n:"03",t:"Formalisation juridique",d:"Constitution SARL (APIX). Acte associé notarié. Ouverture compte professionnel. Définition des modalités de reporting (fréquence, format, outils)."},
            {n:"04",t:"Lancement opérationnel",d:"Voyage reconnaissance terrain. Signature bail emphytéotique. Démarrage chantier bâtiments. Recrutement chef de culture. Premier cycle avicole."},
          ].map(s=>(
            <div key={s.n} style={{display:"flex",gap:"1rem",background:C.card,border:`1px solid ${C.border}`,borderRadius:"6px",padding:"1.25rem",alignItems:"flex-start"}}>
              <div style={{width:"42px",height:"42px",borderRadius:"50%",background:C.accent+"22",border:`2px solid ${C.accent}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",fontFamily:F.m,fontWeight:"bold",color:C.accent,flexShrink:0}}>{s.n}</div>
              <div>
                <div style={{fontWeight:"bold",color:C.sand,fontFamily:F.d,marginBottom:"0.3rem"}}>{s.t}</div>
                <div style={{fontSize:"0.85rem",color:C.textMuted,lineHeight:1.6}}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"linear-gradient(135deg,#0a1a0c,#1a2e1c)",border:`1px solid ${C.accentLight}33`,borderRadius:"8px",padding:"2rem",textAlign:"center"}}>
          <div style={{fontSize:"1.6rem",marginBottom:"0.75rem"}}>🇸🇳</div>
          <div style={{fontSize:"1.3rem",fontWeight:"bold",color:C.accentLight,fontFamily:F.d,marginBottom:"0.5rem"}}>
            Rejoignez une opportunité agricole à fort rendement
          </div>
          <div style={{color:C.sand,fontSize:"0.9rem",marginBottom:"1.25rem",fontFamily:F.d,fontStyle:"italic"}}>
            30M FCFA · Zéro emprunt bancaire · ROI 71% sur 3 ans · Payback 3,7 ans · Vision Sénégal 2050
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:"1rem",flexWrap:"wrap"}}>
            {["✅ Dossier technique complet disponible","✅ Bail foncier en cours de négociation","✅ Devis construction obtenus","✅ Contrats restaurants en prospection"].map(t=>(
              <span key={t} style={{background:C.greenLight+"22",border:`1px solid ${C.greenLight}44`,color:C.greenLight,padding:"0.3rem 0.75rem",borderRadius:"20px",fontSize:"0.78rem",fontFamily:F.m}}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    )
  },
];

function SlideHeader({n,title,sub}) {
  return (
    <div style={{marginBottom:"1.5rem"}}>
      <div style={{fontSize:"0.68rem",fontFamily:F.m,color:C.accent,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:"0.4rem"}}>
        {n} — {sub}
      </div>
      <h2 style={{fontSize:"clamp(1.3rem,3vw,1.8rem)",fontWeight:"bold",color:C.text,fontFamily:F.d,margin:0,lineHeight:1.15}}>{title}</h2>
      <div style={{height:"2px",background:`linear-gradient(90deg,${C.accent},transparent)`,marginTop:"0.65rem"}}/>
    </div>
  );
}

export default function Pitch() {
  const [active,setActive]=useState(0);
  const slide=SLIDES[active];
  return (
    <div style={{background:C.bg,minHeight:"100vh",fontFamily:F.d,color:C.text}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#0a1a0c,#1a2e1c)",borderBottom:`1px solid ${C.border}`,padding:"1.25rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.75rem"}}>
        <div>
          <div style={{fontSize:"0.62rem",fontFamily:F.m,color:C.accent,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:"0.25rem"}}>04 · Pitch Investisseurs · 30M FCFA · 2026</div>
          <div style={{fontWeight:"bold",color:C.text,fontFamily:F.d,fontSize:"1.1rem"}}>Exploitation Agri-Élevage Sénégal 🇸🇳</div>
        </div>
        <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
          {["30M FCFA","ROI 71%","Payback 3,7 ans","0 emprunt"].map(t=>(
            <span key={t} style={{background:"rgba(200,137,58,0.15)",border:"1px solid rgba(200,137,58,0.3)",color:C.accentLight,padding:"0.18rem 0.6rem",borderRadius:"20px",fontSize:"0.7rem",fontFamily:F.m}}>{t}</span>
          ))}
        </div>
      </div>
      {/* Nav slides */}
      <div style={{display:"flex",overflowX:"auto",background:C.surface,borderBottom:`1px solid ${C.border}`,scrollbarWidth:"none"}}>
        {SLIDES.map((s,i)=>(
          <button key={s.id} onClick={()=>setActive(i)} style={{background:i===active?C.card:"transparent",border:"none",borderBottom:i===active?`2px solid ${C.accent}`:"2px solid transparent",color:i===active?C.accentLight:C.muted,padding:"0.7rem 1rem",fontSize:"0.75rem",fontFamily:F.m,cursor:"pointer",whiteSpace:"nowrap",textTransform:"uppercase"}}>
            {s.title}
          </button>
        ))}
      </div>
      {/* Contenu */}
      <div style={{maxWidth:"960px",margin:"0 auto",padding:"2rem 1.25rem"}}>
        {slide.render()}
      </div>
      {/* Navigation précédent/suivant */}
      <div style={{display:"flex",justifyContent:"center",gap:"1rem",padding:"1.5rem",borderTop:`1px solid ${C.border}`}}>
        <button onClick={()=>setActive(Math.max(0,active-1))} disabled={active===0} style={{background:active===0?C.surface:C.card,border:`1px solid ${C.border}`,color:active===0?C.muted:C.accentLight,padding:"0.5rem 1.5rem",borderRadius:"4px",cursor:active===0?"not-allowed":"pointer",fontFamily:F.m,fontSize:"0.82rem"}}>← Précédent</button>
        <span style={{color:C.muted,fontFamily:F.m,fontSize:"0.82rem",alignSelf:"center"}}>{active+1} / {SLIDES.length}</span>
        <button onClick={()=>setActive(Math.min(SLIDES.length-1,active+1))} disabled={active===SLIDES.length-1} style={{background:active===SLIDES.length-1?C.surface:C.accent,border:`1px solid ${C.accent}`,color:active===SLIDES.length-1?C.muted:"#0f1a10",padding:"0.5rem 1.5rem",borderRadius:"4px",cursor:active===SLIDES.length-1?"not-allowed":"pointer",fontFamily:F.m,fontSize:"0.82rem",fontWeight:"bold"}}>Suivant →</button>
      </div>
    </div>
  );
}
