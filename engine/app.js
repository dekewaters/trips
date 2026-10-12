/* Trip site engine. Reads window.TRIP (see _template/trip.js for the schema) and renders the whole app.
   Keep this file backward compatible: every published trip loads it. */
(function(){
"use strict";
const T=window.TRIP;if(!T){document.body.textContent="Missing trip.js";return}
const DAYS=T.days, HOTEL=T.hotel||{};
const K=(T.slug||"trip")+"-";
const UA=navigator.userAgent||"";
const IOS=/iPhone|iPad|iPod/.test(UA)||(/Macintosh/.test(UA)&&navigator.maxTouchPoints>1);
const ANDROID=/Android/.test(UA);
const PHONE=IOS||ANDROID;

/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const enc=encodeURIComponent;
const store={get(k,d){try{const v=localStorage.getItem(K+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(K+k,JSON.stringify(v))}catch(e){}}};
const loc=o=>o.local??o.zh;          /* address/name in the local language, shown to drivers */
const qry=o=>o.q??o.rn;              /* best search term for local apps */
function tzNow(){const p=new Intl.DateTimeFormat("en-CA",{timeZone:T.tz,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date());const g=t=>p.find(x=>x.type===t).value;return{date:`${g("year")}-${g("month")}-${g("day")}`,min:+g("hour")*60+ +g("minute")}}
const homeTime=()=>new Intl.DateTimeFormat("en-US",{timeZone:T.homeTz||"America/Los_Angeles",hour:"numeric",minute:"2-digit",weekday:"short"}).format(new Date());
const toMin=t=>{const[h,m]=t.split(":").map(Number);return h*60+m};
const fmtM=m=>{let h=Math.floor(m/60)%24,mm=m%60;const ap=h>=12?"pm":"am";h=h%12||12;return `${h}:${String(mm).padStart(2,"0")}<small style="font-size:10px">${ap}</small>`};
const fmtTxt=m=>{let h=Math.floor(m/60)%24,mm=m%60;const ap=h>=12?"pm":"am";h=h%12||12;return `${h}:${String(mm).padStart(2,"0")}${ap}`};
const mon=d=>new Date(d+"T12:00:00").toLocaleDateString("en-US",{month:"short"});
const ext=PHONE?"":` target="_blank" rel="noopener"`;

/* ---------- link providers ----------
   Each returns a URL or null. Add new ones here; trips pick them with T.links = [...]. */
const P={
 google:o=>o.pid?"https://www.google.com/maps/place/?q=place_id:"+o.pid:(o.g||o.name)?"https://www.google.com/maps/search/?api=1&query="+enc(o.g||`${o.name} ${T.city||""}`):null,
 apple:o=>(loc(o)||o.name)?"https://maps.apple.com/?q="+enc(loc(o)||`${o.name} ${T.city||""}`)+(o.ll?`&sll=${o.ll[0]},${o.ll[1]}`:""):null,
 amap:o=>{const q=qry(o)||loc(o);if(!q)return null;return amap(q,o.ll)},
 dianping:o=>qry(o)?"dianping://searchshoplist?keyword="+enc(qry(o)):null,
 naver:o=>{const q=qry(o)||loc(o)||o.name;return PHONE?`nmap://search?query=${enc(q)}&appname=${enc(T.slug||"trip")}`:"https://map.naver.com/p/search/"+enc(q)},
 yelp:o=>"https://www.yelp.com/search?find_desc="+enc(o.name)+"&find_loc="+enc(T.city||"")
};
const PLABEL={google:"Google",apple:"Apple Maps",amap:"Amap",dianping:"Dianping",naver:"Naver Map",yelp:"Yelp"};
function amap(q,ll){const k=enc(q),d=0.02,src=enc(T.slug||"trip");
 if(IOS)return `iosamap://poi?sourceApplication=${src}&name=${k}${ll?`&lat1=${(ll[0]+d).toFixed(4)}&lon1=${(ll[1]-d).toFixed(4)}&lat2=${(ll[0]-d).toFixed(4)}&lon2=${(ll[1]+d).toFixed(4)}`:""}&dev=0`;
 if(ANDROID)return `androidamap://poi?sourceApplication=${src}&keywords=${k}&dev=0`;
 return `https://uri.amap.com/search?keyword=${k}${ll?`&center=${ll[1]},${ll[0]}`:""}${T.amapCity?`&city=${T.amapCity}`:""}&view=list&src=${src}&callnative=1`}
const NEARP={
 google:(q,ll)=>`https://www.google.com/maps/search/${enc(q)}/@${ll[0]},${ll[1]},16z`,
 apple:(q,ll)=>`https://maps.apple.com/?q=${enc(q)}&sll=${ll[0]},${ll[1]}&z=16`,
 amap:(q,ll)=>amap(q,ll),
 naver:(q,ll)=>PHONE?`nmap://search?query=${enc(q)}&appname=${enc(T.slug||"trip")}`:"https://map.naver.com/p/search/"+enc(q)
};
const DRV=T.driver||{};
function links(o){const out=[];
 if(loc(o))out.push(`<button class="drv" data-zh="${esc(loc(o))}" data-en="${esc(o.name)}">${esc(DRV.button||"Show driver")}</button>`);
 (T.links||["google","apple"]).forEach(k=>{const u=P[k]&&P[k](o);if(u)out.push(`<a href="${esc(u)}"${/^https?:/.test(u)?ext:""}>${PLABEL[k]||k}</a>`)});
 return out.join("")}
const NEAR=T.near||{provider:"google",coffee:"coffee",food:"food",restroom:"restroom"};
const near=ll=>{if(!ll||!NEAR.provider)return "";const f=NEARP[NEAR.provider];const a=(q,l)=>`<a href="${esc(f(q,ll))}"${ext}>${l}</a>`;
 return `<div class="near">${a(NEAR.coffee,"☕ Coffee near here")}${a(NEAR.food,"Food near here")}${NEAR.restroom?a(NEAR.restroom,"Restroom"):""}</div>`};
/* "More info" expander: stop.more = {w:"blurb", s:[{name, local, note, q}]} (spots with q get map buttons) */
const moreHtml=(s)=>{const m=s.more;if(!m)return "";
 const sp=(m.s||[]).map(x=>{const acts=x.q?links({name:x.name,local:x.local,q:x.q,ll:s.ll}):"";
  return `<li><b>${esc(x.name)}</b>${x.local?`<span class="zh">${esc(x.local)}</span>`:""}${x.note?`<div class="note">${esc(x.note)}</div>`:""}${acts?`<div class="actions">${acts}</div>`:""}</li>`}).join("");
 return `<details class="more"><summary>${esc(T.moreLabel||"More info")}</summary><div class="mbody">${m.w?`<p>${esc(m.w)}</p>`:""}${sp?`<div class="mlabel">Don't miss</div><ul>${sp}</ul>`:""}</div></details>`};
const badge=t=>{if(!t)return "";const b=(T.badges||{})[t]||t;return `<span class="badge ${t==="food"?"food":t==="val"?"val":"tag"}">${esc(b)}</span>`};

/* ---------- shell markup ---------- */
const CUR=T.currency||{code:"USD",symbol:"$",home:"USD",homeSymbol:"$",rate:1};
document.getElementById("app").innerHTML=`
<div class="wrap">
 <header class="top">
  <div class="brand">${esc(T.title)}<small>${esc(T.subtitle||"")}${T.updated?` · updated ${esc(T.updated)}`:""}</small></div>
  <div class="hdr-right">
   <div class="clock"><b id="clk">--:--</b>${esc(T.city||"Local")} · <span id="clkHome">${esc(T.homeLabel||"Home")} --:--</span></div>
   ${CUR.code!==CUR.home?`<button class="fxbtn" id="fxToggle" aria-expanded="false" aria-controls="fx">${esc(CUR.symbol)} ⇄ ${esc(CUR.homeSymbol)}</button>`:""}
  </div>
 </header>
 <div class="fx" id="fx" hidden>
  <label for="fxL">${esc(CUR.name||CUR.code)} (${esc(CUR.symbol)})<input id="fxL" inputmode="decimal" value="100"></label>
  <label for="fxH">${esc(CUR.homeName||CUR.home)} (${esc(CUR.homeSymbol)})<input id="fxH" inputmode="decimal"></label>
  <div class="rate"><label for="fxRate" style="flex-direction:row;align-items:center;gap:6px">${esc(CUR.symbol)} per ${esc(CUR.homeSymbol)}1 <input id="fxRate" inputmode="decimal"></label><span>${esc(CUR.rateHint||"Check today's rate and update it here.")}</span></div>
 </div>
 <section class="page on" id="p-sched"><nav class="days" id="days" aria-label="Trip days"></nav><div id="banner"></div><div id="now"></div><div id="warn"></div><div id="day"></div></section>
 <section class="page" id="p-food">
  <h2 class="dayhead">${esc((T.food&&T.food.title)||"Coffee & quick bites")}</h2>
  <p class="daysub">${esc((T.food&&T.food.sub)||"Near the hotel. Every stop on the schedule also has \"near here\" buttons.")}</p>
  <div class="list" id="coffee"></div><h3 class="sec">Lunch picks by day</h3><div id="lunchAll"></div>
 </section>
 <section class="page" id="p-taxi">
  <h2 class="dayhead">${esc(DRV.title||"Show the driver")}</h2>
  <p class="daysub">Tap a card to show it full screen. Every stop on the schedule also has a "${esc(DRV.button||"Show driver")}" button.</p>
  <div class="list" id="taxi"></div>${(T.phrases||[]).length?`<h3 class="sec">Phrases</h3><div class="phr" id="phr"></div>`:""}
 </section>
 <section class="page" id="p-info">
  <h2 class="dayhead">Trip info</h2>
  ${(T.sos||[]).length?`<h3 class="sec" style="margin-top:0">Emergency</h3><div class="sos">${T.sos.map(s=>`<a href="tel:${esc(s.num)}"><b>${esc(s.num)}</b>${esc(s.label)}</a>`).join("")}</div>`:""}
  ${T.sosNote?`<p class="daysub">${T.sosNote}</p>`:""}
  <div class="list" id="emer"></div>
  <h3 class="sec">Trip details</h3><dl class="kv" id="kv"></dl>
  <div id="extras"></div>
  ${(T.tips||[]).length?`<h3 class="sec">Good to know</h3><ul class="tips">${T.tips.map(t=>`<li>${t}</li>`).join("")}</ul>`:""}
 </section>
</div>
${HOTEL.name?`<button class="fab" id="fab" aria-label="Show the driver the hotel address">Hotel${HOTEL.fab?` <span class="zh">${esc(HOTEL.fab)}</span>`:""}</button>`:""}
<div class="tabs" role="tablist"><div class="in">
 <button data-p="p-sched" aria-current="true"><b>◷</b>Schedule</button>
 <button data-p="p-food"><b>☕</b>Food</button>
 <button data-p="p-taxi"><b>⇄</b>${esc(DRV.tab||"Driver")}</button>
 <button data-p="p-info"><b>i</b>Info</button>
</div></div>
<div class="driver" id="driver" hidden role="dialog" aria-modal="true" aria-labelledby="drvZh">
 <div class="ask">${esc(DRV.ask||"Please take me to")}</div><div class="big" id="drvZh"></div><div class="en" id="drvEn"></div><div class="tip" id="drvTip"></div>
 <div class="row"><button id="drvCopy">Copy address</button><button id="drvClose">Close</button></div>
</div>
<div class="toast" id="toast" hidden></div>`;

/* ---------- state ---------- */
let done=store.get("done",{}),late=store.get("late",{}),evT=store.get("event",{});
let sel=null;
const evOf=day=>day.event||(day.match?{label:"Match",time:day.mt,early:45}:null);
const evTime=day=>{const e=evOf(day);return e?(evT[day.d]||e.time):null};
const isAnchor=s=>s.anchor||s.arena;

function plan(day){const off=late[day.d]||0;const e=evOf(day),m=evTime(day);
 const stops=day.stops.map(s=>{let base=toMin(s.t);let note=s.note||"";
  if(isAnchor(s)&&m){const early=e.early??45;base=toMin(m)-early;note=`${e.label} at ${fmtTxt(toMin(m))}. Arrive ${early} min early. `+(note.startsWith("Placeholder")?"":note)}
  const eff=s.fixed?base:base+off;return{...s,base,eff,note,shifted:!s.fixed&&off>0}});
 stops.forEach((s,i)=>{if(s.fixed)return;const f=stops.slice(i+1).find(x=>x.fixed);if(!f)return;const leave=f.eff-(f.go?f.go[0]:0);s.atrisk=off>0&&s.eff>=leave-10});
 return stops}

function pickDefaultDay(){const n=tzNow();const i=DAYS.findIndex(d=>d.d===n.date);if(i>=0)return i;if(n.date<DAYS[0].d)return Math.min(1,DAYS.length-1);return DAYS.length-1}
function renderDays(){const n=tzNow();$("#days").innerHTML=DAYS.map((d,i)=>`<button class="daybtn${d.d===n.date?" today":""}" aria-current="${i===sel}" data-i="${i}">${esc(d.lbl)}<span>${+d.d.slice(8)}</span></button>`).join("");
 $("#days").querySelectorAll(".daybtn").forEach(b=>b.onclick=()=>{sel=+b.dataset.i;store.set("day",sel);renderAll();window.scrollTo({top:0})});
 const cur=$("#days").querySelector('[aria-current="true"]');if(cur)cur.scrollIntoView({inline:"center",block:"nearest"})}
function currentIndex(stops,day,n){if(day.d!==n.date)return -1;let idx=-1;stops.forEach((s,i)=>{if(s.eff<=n.min)idx=i});return idx}
function renderBanner(){const n=tzNow();const first=DAYS[0].d,last=DAYS[DAYS.length-1].d;let h="";
 if(n.date<first){const days=Math.round((new Date(first)-new Date(n.date))/864e5);h=`<div class="banner"><b>${days} day${days===1?"":"s"} to go.</b> You're previewing the plan. In ${esc(T.city||"town")} this opens on today automatically.</div>`}
 else if(n.date>last)h=`<div class="banner"><b>Trip complete.</b> Safe travels home.</div>`;
 $("#banner").innerHTML=h}
function renderNow(){const n=tzNow();const day=DAYS[sel];if(day.d!==n.date){$("#now").innerHTML="";return}
 const stops=plan(day);const ci=currentIndex(stops,day,n);const cur=stops[ci],nxt=stops.slice(ci+1).find(s=>!done[day.d+"|"+s.t]);
 let rows="";
 if(cur)rows+=`<div class="row"><div class="tag n">Now</div><div><div class="title">${esc(cur.name)}</div><div class="meta">Since ${fmtM(cur.eff)}</div>${near(cur.ll)}</div></div>`;
 if(nxt){const leave=nxt.eff-(nxt.go?nxt.go[0]:0);const mins=leave-n.min;const when=mins<=0?`<b style="color:var(--accent)">Leave now</b>`:`Leave in ${mins>=60?Math.floor(mins/60)+"h "+(mins%60)+"m":mins+" min"}`;
  rows+=`<div class="row"><div class="tag x">Next</div><div><div class="title">${esc(nxt.name)}</div><div class="meta">${fmtM(nxt.eff)} · ${nxt.go?`${when} (by ${fmtM(leave)}) · ${esc(nxt.go[1])}, ~${nxt.go[0]} min`:when}</div>${loc(nxt)?`<div class="zh" style="font-size:15px;margin-top:4px">${esc(loc(nxt))}</div>`:""}<div class="actions">${links(nxt)}</div></div></div>`}
 else if(cur)rows+=`<div class="row"><div class="tag x">Next</div><div class="meta">That's the last stop today.</div></div>`;
 const off=late[day.d]||0;
 rows+=`<div class="late">Running late?${[0,15,30,45,60].map(v=>`<button data-late="${v}" aria-pressed="${off===v}">${v?"+"+v:"On time"}</button>`).join("")}</div>`;
 $("#now").innerHTML=`<div class="now">${rows}</div>`;
 $("#now").querySelectorAll("[data-late]").forEach(b=>b.onclick=()=>{const v=+b.dataset.late;if(v)late[day.d]=v;else delete late[day.d];store.set("late",late);renderAll()})}
function renderWarn(){const day=DAYS[sel];const off=late[day.d]||0;const stops=plan(day);const risky=stops.filter(s=>s.atrisk&&!done[day.d+"|"+s.t]);
 if(!off){$("#warn").innerHTML="";return}
 const fixed=stops.find(s=>s.fixed&&stops.indexOf(s)>stops.findIndex(x=>!x.fixed));
 const cuts=stops.filter(s=>s.cut&&!done[day.d+"|"+s.t]).map(s=>s.name);
 let msg=`<b>Running ${off} min late.</b> Flexible stops moved back ${off} min.`;
 if(risky.length&&fixed)msg+=` ${risky.map(s=>esc(s.name)).join(", ")} ${risky.length>1?"no longer fit":"no longer fits"} before ${esc(fixed.name)} at ${fmtTxt(fixed.eff)}.`;
 if(cuts.length)msg+=` Easiest to drop: ${cuts.map(esc).join(", ")}.`;
 $("#warn").innerHTML=`<div class="warn">${msg}</div>`}
const optHtml=list=>(list||[]).map(o=>`<div class="opt"><div class="name">${esc(o.name)}</div>${loc(o)?`<div class="zh">${esc(loc(o))}</div>`:""}${o.note?`<div class="note">${esc(o.note)}</div>`:""}${o.near?near(o.near):`<div class="actions">${o.tel?`<a href="tel:${esc(o.tel)}">Call</a>`:""}${links(o)}</div>`}</div>`).join("");
function renderDay(){const n=tzNow();const day=DAYS[sel];const stops=plan(day);const ci=currentIndex(stops,day,n);
 const chips=[];if(day.sunset)chips.push(`<span class="chip">Sunset <b>${esc(day.sunset)}pm</b></span>`);if(day.carry)chips.push(`<span class="chip">Carry: ${esc(day.carry)}</span>`);
 const e=evOf(day),m=evTime(day),anc=stops.find(isAnchor);
 const evBox=e?`<div class="match"><label for="ev-${day.d}"><b>${esc(e.label)} time</b></label><input type="time" id="ev-${day.d}" value="${esc(m||"")}"><span>${m&&anc?`Leave by <b>${fmtTxt(toMin(m)-(e.early??45)-((anc.go||[0])[0]))}</b>. Change it if the schedule slips.`:"Set it and the schedule updates."}</span></div>`:"";
 const items=stops.map((s,i)=>{const key=day.d+"|"+s.t;const isDone=!!done[key];
  const goLine=s.go&&i>0?`<div class="go">↳ ${esc(s.go[1])} · ~${s.go[0]} min · <span class="lb">leave by ${fmtM(s.eff-s.go[0])}</span></div>`:"";
  const acts=links(s);
  return `<li class="stop${i===ci?" current":""}${isDone?" isdone":""}${s.atrisk?" atrisk":""}"><div class="t">${fmtM(s.eff)}${s.shifted?`<span class="shift">+${late[day.d]}</span>`:""}</div><span class="dot" aria-hidden="true"></span><div class="card">${goLine}<div class="head"><div class="name">${esc(s.name)}${badge(s.tag)}</div><button class="chk" aria-pressed="${isDone}" aria-label="Mark ${esc(s.name)} done" data-k="${esc(key)}">✓</button></div>${loc(s)?`<span class="zh">${esc(loc(s))}</span>`:""}${s.note?`<div class="note">${esc(s.note)}</div>`:""}${acts?`<div class="actions">${acts}</div>`:""}${near(s.ll)}${moreHtml(s)}</div></li>`}).join("");
 $("#day").innerHTML=`<h2 class="dayhead">${esc(day.lbl)} ${+day.d.slice(8)} ${mon(day.d)} · ${esc(day.title)}</h2><p class="daysub">${esc(day.sub||"")}</p><div class="brief">${chips.join("")}</div>${evBox}<ol class="stops">${items}</ol>${day.lunch?`<details class="lunch"${store.get("lunchOpen",false)?" open":""}><summary>Lunch picks for ${esc(day.lbl)}</summary>${optHtml(day.lunch)}</details>`:""}`;
 const det=$("#day details.lunch");if(det)det.addEventListener("toggle",()=>store.set("lunchOpen",det.open));
 const mt=$("#day input[type=time]");if(mt)mt.addEventListener("change",()=>{if(mt.value)evT[day.d]=mt.value;else delete evT[day.d];store.set("event",evT);renderAll()});
 $("#day").querySelectorAll(".chk").forEach(b=>b.onclick=()=>{const k=b.dataset.k;if(done[k])delete done[k];else done[k]=1;store.set("done",done);renderAll()})}
function renderStatic(){
 $("#coffee").innerHTML=optHtml(T.coffee);
 $("#lunchAll").innerHTML=DAYS.filter(d=>d.lunch).map(d=>`<details class="lunch"><summary>${esc(d.lbl)} ${+d.d.slice(8)} · ${esc(d.title)}</summary>${optHtml(d.lunch)}</details>`).join("");
 $("#emer").innerHTML=optHtml(T.emergency);
 $("#extras").innerHTML=(T.extras||[]).map(x=>`<h3 class="sec">${esc(x.title)}</h3><div class="list">${optHtml(x.items)}</div>`).join("");
 $("#taxi").innerHTML=(T.taxi||[]).map(t=>`<div class="opt"><div class="name">${esc(t.name)}</div><div class="zh" style="font-size:18px">${esc(loc(t))}</div><div class="actions"><button class="drv" data-zh="${esc(loc(t))}" data-en="${esc(t.name)}">${esc(DRV.button||"Show driver")}</button></div></div>`).join("");
 if($("#phr"))$("#phr").innerHTML=T.phrases.map(p=>`<div class="zh">${esc(p[0])}</div><div>${esc(p[2])}<div class="say">${esc(p[1])}</div></div>`).join("");
 $("#kv").innerHTML=(T.kv||[]).map(k=>`<dt>${esc(k[0])}</dt><dd>${esc(k[1])}</dd>`).join("")}
function renderClock(){const n=tzNow();$("#clk").textContent=fmtTxt(n.min);$("#clkHome").textContent=(T.homeLabel||"Home")+" "+homeTime()}
function renderAll(){renderClock();renderDays();renderBanner();renderNow();renderWarn();renderDay()}

/* ---------- currency ---------- */
if($("#fxToggle")){
 let rate=store.get("rate",CUR.rate||1);
 const fxL=$("#fxL"),fxH=$("#fxH"),fxR=$("#fxRate");fxR.value=rate;
 const num=v=>parseFloat(String(v).replace(/[^0-9.]/g,""));
 const fromL=()=>{const c=num(fxL.value);fxH.value=isFinite(c)&&rate>0?(c/rate).toFixed(2):""};
 const fromH=()=>{const u=num(fxH.value);fxL.value=isFinite(u)?(u*rate).toFixed(rate>=50?0:2):""};
 fxL.addEventListener("input",fromL);fxH.addEventListener("input",fromH);
 fxR.addEventListener("input",()=>{const r=num(fxR.value);if(r>0){rate=r;store.set("rate",r);fromL()}});
 fromL();
 $("#fxToggle").onclick=()=>{const fx=$("#fx");fx.hidden=!fx.hidden;$("#fxToggle").setAttribute("aria-expanded",String(!fx.hidden));if(!fx.hidden)fxL.focus()};
}

/* ---------- driver overlay ---------- */
let lastZh="";
function showDriver(zh,en,tip){lastZh=zh;$("#drvZh").textContent=zh;$("#drvEn").textContent=en||"";$("#drvTip").textContent=tip||"";$("#driver").hidden=false;$("#drvClose").focus()}
document.addEventListener("click",e=>{const b=e.target.closest(".drv");if(!b)return;showDriver(b.dataset.zh,b.dataset.en)});
if($("#fab"))$("#fab").onclick=()=>showDriver(loc(HOTEL),`${HOTEL.name}${HOTEL.phone?` · hotel phone ${HOTEL.phone}`:""}`,HOTEL.tip||"");
$("#drvClose").onclick=()=>{$("#driver").hidden=true};
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#driver").hidden=true});
function toast(t,ms){const el=$("#toast");el.textContent=t;el.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>el.hidden=true,ms||1800)}
function copyText(t){return new Promise((res,rej)=>{const fb=()=>{try{const ta=document.createElement("textarea");ta.value=t;ta.setAttribute("readonly","");ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,t.length);const ok=document.execCommand("copy");ta.remove();ok?res():rej()}catch(e){rej()}};if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(res).catch(fb);else fb()})}
$("#drvCopy").onclick=()=>copyText(lastZh).then(()=>toast(DRV.copied||"Copied")).catch(()=>toast("Press and hold the address to copy",3000));

/* ---------- tabs + boot ---------- */
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs button").forEach(x=>x.setAttribute("aria-current",x===b));document.querySelectorAll("section.page").forEach(p=>p.classList.toggle("on",p.id===b.dataset.p));store.set("tab",b.dataset.p);window.scrollTo({top:0})});
const savedDay=store.get("day",null);const n=tzNow();const def=pickDefaultDay();
const inTrip=n.date>=DAYS[0].d&&n.date<=DAYS[DAYS.length-1].d;
sel=inTrip?def:(Number.isInteger(savedDay)&&savedDay>=0&&savedDay<DAYS.length?savedDay:def);
renderStatic();renderAll();
const t=store.get("tab","p-sched");const tb=document.querySelector(`.tabs button[data-p="${t}"]`);if(tb&&t!=="p-sched")tb.click();
setInterval(()=>{renderClock();if(tzNow().date===DAYS[sel].d){renderNow();renderDay()}},60000);
document.addEventListener("visibilitychange",()=>{if(!document.hidden){const d=pickDefaultDay();if(DAYS[d].d===tzNow().date)sel=d;renderAll()}});
})();
