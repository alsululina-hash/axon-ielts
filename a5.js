// ===== QUIZLET-STYLE: Заучивание, Тест, Подбор, Карточки =====
// item: {q, a, alts[], d[] (дистракторы), e (пояснение), kind:'v'|'g', src, ex}
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
function vItems(t){return t.words.map(w=>({kind:"v",q:w.en,a:w.ru,ex:w.ex,src:t.t,tid:t.id}));}
function gItems(g){return g.q.map(x=>({kind:"g",q:x[0],a:x[1][x[2]],d:x[1].filter((o,j)=>j!==x[2]),e:x[3]||"",src:g.t,tid:g.id}));}
function itemsFor(ids){let r=[];ids.forEach(id=>{const t=ALLTOPICS[id];if(!t)return;r=r.concat(t.kind==="g"?gItems(t):vItems(t));});return r;}
const nrm=s=>String(s).toLowerCase().replace(/ё/g,"е").replace(/\(.*?\)/g," ").replace(/[.,!?;:"«»'’]/g," ").replace(/\s+/g," ").trim();
function variants(s){const out=new Set([nrm(s)]);String(s).split(/\s[\/–—→]\s|;|,|\//).forEach(p=>{const n=nrm(p);if(n.length>1)out.add(n);});return [...out];}
function lev(a,b){if(Math.abs(a.length-b.length)>2)return 9;const d=[...Array(b.length+1)].map((_,i)=>i);for(let i=1;i<=a.length;i++){let p=d[0];d[0]=i;for(let j=1;j<=b.length;j++){const t=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,p+(a[i-1]===b[j-1]?0:1));p=t;}}return d[b.length];}
const writable=it=>it.kind!=="g"||(/_{2,}/.test(it.q)&&it.a.split(/\s+/).length<=5);
function checkWritten(input,answer,g){const a=nrm(input).replace(/\s*\/\s*/g," ");if(!a)return 0;const vs=g?[nrm(answer).replace(/\s*\/\s*/g," ")]:variants(answer);if(vs.includes(a))return 2;if(vs.some(v=>v.length>4&&lev(a,v)<=1))return 1;return 0;} // 2 верно, 1 почти (опечатка), 0 нет
// направление для лексики: prompt/answer
function pa(it,dir){if(it.kind==="g")return {p:it.q,ans:it.a};return dir==="en"?{p:it.a,ans:it.q}:{p:it.q,ans:it.a};}
function mcOptions(it,pool,dir){if(it.kind==="g")return shuf([it.a,...it.d].slice(0,4));
  const key=dir==="en"?"q":"a";const right=it[key];const others=shuf(pool.filter(x=>x!==it&&x[key]!==right)).slice(0,3).map(x=>x[key]);return shuf([right,...others]);}

let QZ=null; // {mode,items,title,...}
function qzBox(){return document.getElementById("qzbox");}
function qzRender(){const b=qzBox();if(!b||!QZ)return;b.innerHTML=QZ.mode==="learn"?learnHTML():QZ.mode==="test"?(QZ.graded?testResultHTML():testHTML()):QZ.mode==="match"?matchHTML():QZ.mode==="cards"?cardsHTML():"";if(QZ.mode==="learn"){const i=document.getElementById("lrnIn");i&&i.focus();}}
function qzStart(mode,items,title,opts){if(!items.length){toast("Нет карточек для этого режима");return;}
  QZ=Object.assign({mode,items,title,pool:items},opts||{});
  if(mode==="learn")learnInit();if(mode==="test")testInit();if(mode==="match")matchInit();if(mode==="cards"){QZ.i=0;QZ.flip=false;QZ.order=shuf(items);QZ.known=0;QZ.unknown=[];}
  if(qzBox()){QZ.page=curView;qzRender();setTimeout(()=>{const b=qzBox();b&&b.scrollIntoView({block:"nearest"});},30);}else{QZ.page="quiz";if(location.hash==="#quiz")route(true);else location.hash="quiz";}}
const MB=[];
function modeBar(ids,title){MB.push({ids,title});const k=MB.length-1;
  return `<div class="grid g4">${[["cards","Карточки","Перевернуть и отметить «знаю»"],["learn","Заучивание","Выбор ответа → написание, пока не запомните"],["test","Тест","Смешанные вопросы с оценкой"],["match","Подбор","Соедините пары на время"]].map(([m,n,d])=>`<button class="card" style="text-align:left;cursor:pointer" onclick="qzStart('${m}',itemsFor(MB[${k}].ids),MB[${k}].title)"><h3>${n}</h3><div class="muted small">${d}</div></button>`).join("")}</div>`;}
// ---------- Карточки ----------
function cardsHTML(){const o=QZ.order;if(QZ.i>=o.length){return `<div class="card stack"><h2>Готово</h2><p>Знаю: <b>${QZ.known}</b> · Ещё учу: <b>${QZ.unknown.length}</b></p><div class="row">${QZ.unknown.length?`<button class="btn pri" onclick="qzStart('cards',QZ.unknown,QZ.title)">Повторить «ещё учу» (${QZ.unknown.length})</button><button class="btn" onclick="qzStart('learn',QZ.unknown,QZ.title)">Заучивание по ним</button>`:""}<button class="btn" onclick="qzStart('cards',QZ.items,QZ.title)">Сначала</button></div></div>`;}
  const it=o[QZ.i];const front=it.kind==="g"?it.q:it.q,back=it.kind==="g"?`<b>${esc(it.a)}</b><small>${esc(it.e)}</small>`:`${esc(it.a)}<small>${esc(it.ex||"")}</small>`;
  return `<div class="row between"><span class="muted small">${QZ.i+1} / ${o.length} · знаю ${QZ.known} · учу ${QZ.unknown.length}</span><button class="btn sm" onclick="QZ.order=shuf(QZ.order);QZ.i=0;qzRender()">Перемешать</button></div><div class="bar mt"><i style="width:${QZ.i/o.length*100}%"></i></div>
  <div class="flash mt" onclick="QZ.flip=!QZ.flip;qzRender()"><div>${QZ.flip?back:`<b>${esc(front)}</b><small>нажмите, чтобы перевернуть</small>`}</div></div>
  <div class="row mt" style="justify-content:center">${it.kind==="v"?sayBtn(it.q):""}</div>
  <div class="grid g2 mt"><button class="btn" style="justify-content:center;border-color:var(--bad);color:var(--bad)" onclick="QZ.unknown.push(QZ.order[QZ.i]);QZ.i++;QZ.flip=false;qzRender()">Ещё учу</button><button class="btn" style="justify-content:center;border-color:var(--good);color:var(--good)" onclick="QZ.known++;QZ.i++;QZ.flip=false;qzRender()">Знаю</button></div>`;}

// ---------- Заучивание (Learn) ----------
function learnInit(){QZ.L=shuf(QZ.items).map(it=>({it,st:0,miss:0}));QZ.round=[];QZ.ri=0;QZ.ans=null;QZ.rn=0;learnNextRound();}
function learnNextRound(){const left=QZ.L.filter(x=>x.st<2).sort((a,b)=>a.st-b.st);QZ.round=left.slice(0,7);QZ.ri=0;QZ.ans=null;QZ.rn++;QZ.roundEnd=false;
  QZ.round.forEach(x=>{if(x.st===0)x.opts=mcOptions(x.it,QZ.pool,"ru");});}
function learnHTML(){const done=QZ.L.filter(x=>x.st>=2).length,N=QZ.L.length;
  const head=`<div class="row between"><span class="small"><b>Освоено ${done} из ${N}</b> · раунд ${QZ.rn}</span><span class="muted small">выбор → написание</span></div><div class="bar mt"><i style="width:${done/N*100}%;background:var(--good)"></i></div>`;
  if(done===N){const hard=QZ.L.filter(x=>x.miss>0).sort((a,b)=>b.miss-a.miss);return head+`<div class="card mt stack"><h2>Всё освоено!</h2><p class="muted">${hard.length?`Сложнее всего далось: ${hard.slice(0,8).map(x=>`<b>${esc(x.it.kind==="g"?x.it.a:x.it.q)}</b>`).join(", ")}`:"Без единой ошибки."}</p><div class="row"><button class="btn pri" onclick="qzStart('test',QZ.items,QZ.title)">Пройти тест</button><button class="btn" onclick="qzStart('learn',QZ.items,QZ.title)">Заново</button>${QZ.items[0].kind==="v"?`<button class="btn" onclick="const n=[...new Set(QZ.items.map(i=>i.tid))].reduce((a,t)=>a+srsAdd(t,ALLTOPICS[t].words.filter(w=>QZ.items.some(i=>i.q===w.en))),0);toast('В интервальное повторение: +'+n)">Добавить в повторение</button>`:""}</div></div>`;}
  if(QZ.roundEnd){return head+`<div class="card mt stack"><h2>Раунд ${QZ.rn} завершён</h2><div class="stack small">${QZ.round.map(x=>`<div class="row between"><span>${esc(x.it.kind==="g"?x.it.q:x.it.q)}</span><span class="chip ${x.st>=2?"ok":""}">${x.st>=2?"освоено":x.st===1?"знакомо":"учим"}</span></div>`).join("")}</div><button class="btn pri" onclick="learnNextRound();qzRender()">Следующий раунд →</button></div>`;}
  const x=QZ.round[QZ.ri],it=x.it;const written=x.st===1;
  let prompt,body;
  if(it.kind==="g"){prompt=`<div class="muted small">${written?((it.q.match(/_{2,}/g)||[]).length>1?"Впишите пропуски через пробел":"Впишите пропущенное"):"Выберите правильный вариант"}</div><div style="font-size:1.2rem">${esc(it.q)}</div>`;}
  else prompt=written?`<div class="muted small">Напишите по-английски</div><div style="font-size:1.3rem">${esc(it.a)}</div>`:`<div class="muted small">Выберите перевод</div><div style="font-size:1.3rem"><b>${esc(it.q)}</b> ${sayBtn(it.q)}</div>`;
  if(!written){body=`<div class="grid g2 mt">${x.opts.map((o,j)=>{let cls="";if(QZ.ans){const right=it.kind==="g"?it.a:it.a;if(o===right)cls="right";else if(j===QZ.ans.j)cls="wrong";}return `<button class="opt ${cls}" style="text-align:left;padding:12px" ${QZ.ans?"disabled":""} onclick="learnMC(${j})"><span class="muted small">${j+1}</span> ${esc(o)}</button>`}).join("")}</div>`;}
  else body=`<div class="row mt"><input type="text" id="lrnIn" autocomplete="off" placeholder="Ваш ответ" ${QZ.ans?"disabled":""} onkeydown="if(event.key==='Enter'){QZ.ans?learnNext():learnWrite()}" style="flex:1"><button class="btn pri" ${QZ.ans?"disabled":""} onclick="learnWrite()">Ответить</button>${QZ.ans?"":`<button class="btn" onclick="learnWrite(true)">Не знаю</button>`}</div>`;
  let fb="";if(QZ.ans){const right=written?(it.kind==="g"?it.a:it.q):it.a;
    fb=QZ.ans.ok?`<div class="fb ok">${QZ.ans.ok===1?"Почти! Опечатка, засчитано. ":"Верно! "}${QZ.ans.ok===1?"Правильно: <b>"+esc(right)+"</b>":""}</div>`
     :`<div class="fb no">Правильный ответ: <b>${esc(right)}</b>${QZ.ans.v?` · ваш: <s>${esc(QZ.ans.v)}</s>`:""}</div>${written&&QZ.ans.v?`<button class="btn sm" onclick="learnOverride()">Я ответила верно</button>`:""}`;
    if(it.e)fb+=`<div class="muted small mt">${esc(it.e)}</div>`;if(it.kind==="v"&&it.ex)fb+=`<div class="muted small">${esc(it.ex)}</div>`;
    fb+=`<button class="btn pri mt" id="lrnNext" onclick="learnNext()">Продолжить →</button>`;}
  return head+`<div class="card mt stack">${prompt}${body}${fb}</div>`;}
function learnMC(j){if(QZ.ans)return;const x=QZ.round[QZ.ri];const ok=x.opts[j]===x.it.a;QZ.ans={j,ok:ok?2:0};learnMark(ok);qzRender();if(ok)setTimeout(()=>{if(QZ&&QZ.ans&&QZ.ans.j===j)learnNext();},700);}
function learnWrite(skip){if(QZ.ans)return;const x=QZ.round[QZ.ri],it=x.it;const v=skip?"":($("#lrnIn").value||"");const right=it.kind==="g"?it.a:it.q;const r=skip?0:checkWritten(v,right,it.kind==="g");QZ.ans={ok:r,v};learnMark(r>0);qzRender();setTimeout(()=>{const b=$("#lrnNext");b&&b.focus();},50);}
function learnMark(ok){const x=QZ.round[QZ.ri];if(ok){x.st++;if(!writable(x.it))x.st=2;}else{x.st=0;x.miss++;x.opts=mcOptions(x.it,QZ.pool,"ru");addMistake(x.it.q,x.it.kind==="g"?x.it.a:x.it.a+" — "+x.it.q,(x.it.kind==="g"?"Грамматика: ":"Лексика: ")+x.it.src);}}
function learnOverride(){const x=QZ.round[QZ.ri];x.st=Math.min(2,x.st+1);x.miss=Math.max(0,x.miss-1);S.mistakes.shift();save();QZ.ans.ok=2;learnNext();}
function learnNext(){QZ.ans=null;QZ.ri++;if(QZ.ri>=QZ.round.length)QZ.roundEnd=true;qzRender();}
addEventListener("keydown",e=>{if(!QZ||QZ.mode!=="learn"||!qzBox()||/INPUT|TEXTAREA|SELECT|BUTTON/.test(e.target.tagName)||/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;
  if(!QZ.ans&&!QZ.roundEnd){const x=QZ.round[QZ.ri];if(x&&x.st===0&&/^[1-4]$/.test(e.key))learnMC(+e.key-1);}else if(e.key==="Enter"){QZ.roundEnd?(learnNextRound(),qzRender()):learnNext();}});

// ---------- Тест ----------
function testInit(){QZ.cfg=QZ.cfg||{n:Math.min(20,QZ.items.length),types:{w:1,mc:1,tf:1,m:1},dir:"mix"};QZ.graded=false;QZ.setup=true;}
function testHTML(){const c=QZ.cfg;
  if(QZ.setup)return `<div class="card stack"><h2>Настройки теста</h2>
   <label class="row">Вопросов: <input type="number" id="tN" min="4" max="${QZ.items.length}" value="${c.n}" style="width:90px;border:1px solid var(--line);border-radius:8px;padding:6px"> <span class="muted small">из ${QZ.items.length}</span></label>
   <div class="row">${[["w","Письменные"],["mc","Выбор ответа"],["tf","Верно / неверно"],["m","Сопоставление"]].map(([k,n])=>`<label class="row small" style="gap:6px;border:1px solid var(--line);padding:6px 10px;border-radius:10px"><input type="checkbox" id="tt-${k}" ${c.types[k]?"checked":""}> ${n}</label>`).join("")}</div>
   ${QZ.items[0].kind==="v"?`<label class="row small">Отвечать: <select id="tDir" style="width:auto"><option value="mix" ${c.dir==="mix"?"selected":""}>и так, и так</option><option value="ru" ${c.dir==="ru"?"selected":""}>по-русски</option><option value="en" ${c.dir==="en"?"selected":""}>по-английски</option></select></label>`:""}
   <button class="btn pri" style="align-self:flex-start" onclick="testBuild()">Создать тест</button></div>`;
  return `<div class="row between"><h2>Тест: ${esc(QZ.title)}</h2><span class="muted small">${QZ.Q.length} вопросов</span></div><div class="stack mt">${QZ.sections.map(s=>`<h3 class="mt">${s.name} <span class="muted small">(${s.qs.length})</span></h3>${s.qs.map(qi=>testQ(qi)).join("")}`).join("")}</div>
   <div class="row mt"><button class="btn pri" onclick="testGrade()">Проверить тест</button><button class="btn" onclick="QZ.setup=true;qzRender()">Изменить настройки</button></div>`;}
function testBuild(){const c=QZ.cfg;c.n=Math.max(4,Math.min(QZ.items.length,+$("#tN").value||20));["w","mc","tf","m"].forEach(k=>c.types[k]=$("#tt-"+k).checked?1:0);if($("#tDir"))c.dir=$("#tDir").value;
  let types=["w","mc","tf","m"].filter(k=>c.types[k]);if(!types.length)types=["mc"];
  const pick=shuf(QZ.items).slice(0,c.n);const per={};types.forEach(t=>per[t]=[]);pick.forEach((it,i)=>per[types[i%types.length]].push(it));
  if(per.m&&per.m.length<3&&types.length>1){per.mc=(per.mc||[]).concat(per.m);delete per.m;}
  const Q=[];const dirOf=()=>c.dir==="mix"?(Math.random()<.5?"ru":"en"):c.dir;
  (per.w||[]).forEach(it=>{if(writable(it))Q.push({t:"w",it,dir:it.kind==="v"?"en":"ru"});else{const dir="ru";Q.push({t:"mc",it,dir,opts:mcOptions(it,QZ.pool,dir)});}}); // письменно: по-английски
  (per.mc||[]).forEach(it=>{const dir=dirOf();Q.push({t:"mc",it,dir,opts:mcOptions(it,QZ.pool,dir)});});
  (per.tf||[]).forEach(it=>{const truth=Math.random()<.5;let shown;if(it.kind==="g")shown=truth?it.a:shuf(it.d)[0];else{const o=shuf(QZ.pool.filter(x=>x.a!==it.a))[0];shown=truth||!o?it.a:o.a;}Q.push({t:"tf",it,shown,truth:shown===it.a});});
  const ms=per.m||[];for(let i=0;i<ms.length;i+=5){const grp=ms.slice(i,i+5);if(!grp.length)break;const dir=dirOf();Q.push({t:"m",grp,dir,opts:shuf(grp.map(g=>pa(g,dir).ans))});}
  QZ.Q=Q;const nm={w:"Письменные ответы",mc:"Выбор ответа",tf:"Верно или неверно",m:"Сопоставление"};
  QZ.sections=["w","mc","tf","m"].map(t=>({name:nm[t],qs:Q.map((q,i)=>q.t===t?i:-1).filter(i=>i>=0)})).filter(s=>s.qs.length);QZ.A={};QZ.setup=false;qzRender();}
function testQ(i){const q=QZ.Q[i],it=q.it,no=`<span class="muted small">${i+1}.</span>`;
  if(q.t==="w"){const p=it.kind==="g"?it.q:it.a;return `<div class="q"><div>${no} ${esc(p)} <span class="muted small">${it.kind==="g"?((it.q.match(/_{2,}/g)||[]).length>1?"— впишите пропуски через пробел":"— впишите пропуск"):"— по-английски"}</span></div><input type="text" class="mt" autocomplete="off" oninput="QZ.A[${i}]=this.value" value="${esc(QZ.A[i]||"")}"></div>`;}
  if(q.t==="mc"){const p=pa(it,q.dir).p;return `<div class="q"><div>${no} ${esc(p)}</div><div class="opts">${q.opts.map((o,j)=>`<button class="opt" id="tm${i}-${j}" style="${QZ.A[i]===j?"outline:2px solid var(--accent)":""}" onclick="QZ.A[${i}]=${j};document.querySelectorAll('[id^=tm${i}-]').forEach(b=>b.style.outline='');this.style.outline='2px solid var(--accent)'">${esc(o)}</button>`).join("")}</div></div>`;}
  if(q.t==="tf"){const txt=it.kind==="g"?esc(it.q).replace(/_{2,}/,`<u><b>${esc(q.shown)}</b></u>`):`<b>${esc(it.q)}</b> = ${esc(q.shown)}`;
    return `<div class="q"><div>${no} ${txt}</div><div class="opts">${[["Верно",true],["Неверно",false]].map(([n,v])=>`<button class="opt" id="tf${i}-${v}" onclick="QZ.A[${i}]=${v};document.querySelectorAll('[id^=tf${i}-]').forEach(b=>b.style.outline='');this.style.outline='2px solid var(--accent)'">${n}</button>`).join("")}</div></div>`;}
  if(q.t==="m"){QZ.A[i]=QZ.A[i]||{};const L="ABCDE";return `<div class="q"><div>${no} Сопоставьте</div><div class="grid g2 mt"><div class="stack">${q.grp.map((g,k)=>`<div class="row" style="flex-wrap:nowrap"><select style="width:70px" onchange="QZ.A[${i}][${k}]=this.value"><option value="">—</option>${q.opts.map((o,j)=>`<option value="${j}">${L[j]}</option>`).join("")}</select><span>${esc(pa(g,q.dir).p)}</span></div>`).join("")}</div><div class="stack">${q.opts.map((o,j)=>`<div><b>${L[j]}.</b> ${esc(o)}</div>`).join("")}</div></div></div>`;}
  return "";}
function testGrade(){let ok=0,tot=0;QZ.res=QZ.Q.map((q,i)=>{const a=QZ.A[i];
  if(q.t==="m"){return q.grp.map((g,k)=>{tot++;const right=pa(g,q.dir).ans;const got=a&&a[k]!==undefined&&a[k]!==""?q.opts[+a[k]]:"";const good=got===right;if(good)ok++;else addMistake(pa(g,q.dir).p,right,"Тест: "+g.src);return {q,good,p:pa(g,q.dir).p,right,got};});}
  tot++;let good,right,got,p;const it=q.it;
  if(q.t==="w"){right=it.kind==="g"?it.a:it.q;got=a||"";good=checkWritten(got,right,it.kind==="g")>0;p=it.kind==="g"?it.q:it.a;}
  if(q.t==="mc"){right=pa(it,q.dir).ans;got=a!=null?q.opts[a]:"";good=got===right;p=pa(it,q.dir).p;}
  if(q.t==="tf"){right=q.truth?"Верно":"Неверно";got=a===true?"Верно":a===false?"Неверно":"";good=got===right;p=it.kind==="g"?it.q.replace(/_{2,}/,"["+q.shown+"]"):it.q+" = "+q.shown;if(!q.truth)right+=" (правильно: "+it.a+")";}
  if(good)ok++;else addMistake(p,q.t==="tf"?it.a:right,"Тест: "+it.src);return [{q,good,p,right,got,i}];}).flat();
  QZ.score={ok,tot};QZ.graded=true;S.tests=(S.tests||[]);S.tests.push({d:today(),t:QZ.title,ok,tot});save();qzRender();scrollTo(0,(qzBox().offsetTop||0)-80);}
function testResultHTML(){const {ok,tot}=QZ.score,p=Math.round(ok/tot*100);const wrong=QZ.res.filter(r=>!r.good);
  const col=p>=80?"var(--good)":p>=50?"var(--warn)":"var(--bad)";
  return `<div class="card stack"><div class="row" style="gap:24px"><div style="width:110px;height:110px;border-radius:50%;background:conic-gradient(${col} ${p*3.6}deg,var(--line) 0);display:grid;place-items:center"><div style="width:84px;height:84px;border-radius:50%;background:var(--surface);display:grid;place-items:center;font-family:var(--f-display);font-size:1.5rem">${p}%</div></div>
   <div class="stack" style="gap:4px"><h2>${p>=90?"Отлично!":p>=70?"Хороший результат":p>=50?"Неплохо, есть что подтянуть":"Нужно повторить"}</h2><div>Верно: <b style="color:var(--good)">${ok}</b> · Ошибок: <b style="color:var(--bad)">${tot-ok}</b></div></div></div>
   <div class="row">${wrong.length?`<button class="btn pri" onclick="qzStart('learn',[...new Set(QZ.res.filter(r=>!r.good).map(r=>r.q.it||r.q.grp.find(g=>pa(g,r.q.dir).p===r.p)))],QZ.title+' — ошибки')">Заучить ошибки (${wrong.length})</button>`:""}<button class="btn" onclick="QZ.setup=false;testBuild2()">Новый тест</button><button class="btn" onclick="qzStart('match',QZ.items,QZ.title)">Подбор</button></div></div>
   <h3 class="mt">Разбор</h3><div class="stack mt">${QZ.res.map((r,k)=>`<div class="q" style="border-left:4px solid ${r.good?"var(--good)":"var(--bad)"}"><div>${esc(r.p)}</div><div class="small mt">${r.good?`<span style="color:var(--good)">✓ ${esc(r.got)}</span>`:`<span style="color:var(--bad)">✗ ${esc(r.got||"нет ответа")}</span> · правильно: <b>${esc(r.right)}</b>`}</div>${!r.good&&r.q.it&&r.q.it.e?`<div class="muted small">${esc(r.q.it.e)}</div>`:""}</div>`).join("")}</div>`;}
function testBuild2(){QZ.graded=false;QZ.setup=true;qzRender();}

// ---------- Подбор (Match) ----------
function matchInit(){const uniq=[];const seenA=new Set(),seenQ=new Set();shuf(QZ.items).forEach(it=>{const L=it.kind==="g"?it.q.replace(/_{2,}/,"___"):it.q,R=it.a;if(seenA.has(R)||seenQ.has(L)||uniq.length>=6)return;seenA.add(R);seenQ.add(L);uniq.push({L,R});});
  QZ.tiles=shuf(uniq.flatMap((p,k)=>[{k,txt:p.L,side:"L"},{k,txt:p.R,side:"R"}]));QZ.sel=null;QZ.gone=new Set();QZ.t0=null;QZ.pen=0;QZ.bad=null;QZ.done=false;QZ.pairs=uniq.length;
  clearInterval(QZ.tm);}
function matchHTML(){const key="best:"+QZ.title;const best=S.best&&S.best[key];
  if(QZ.done){const t=QZ.final;return `<div class="card stack" style="text-align:center;align-items:center"><h2>Готово за ${t.toFixed(1)} с</h2><p class="muted">${best&&best<t?`Ваш рекорд: ${best.toFixed(1)} с`:"Новый рекорд!"}${QZ.pen?` · штраф за ошибки: +${QZ.pen} с`:""}</p><button class="btn pri" onclick="matchInit();qzRender()">Играть снова</button></div>`;}
  if(!QZ.t0)return `<div class="card stack" style="text-align:center;align-items:center"><h2>Подбор</h2><p class="muted">Соедините все пары как можно быстрее. Неверная пара — +1 секунда.${best?` Рекорд: ${best.toFixed(1)} с.`:""}</p><button class="btn pri" onclick="QZ.t0=Date.now();QZ.tm=setInterval(()=>{const e=$('#mtT');if(e&&QZ.t0)e.textContent=((Date.now()-QZ.t0)/1000+QZ.pen).toFixed(1)},100);qzRender()">Начать игру</button></div>`;
  return `<div class="row between"><span class="muted small">Пар осталось: ${QZ.pairs-QZ.gone.size/2}</span><span class="timer" id="mtT">${((Date.now()-QZ.t0)/1000+QZ.pen).toFixed(1)}</span></div>
  <div class="grid mt" style="grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px">${QZ.tiles.map((t,i)=>QZ.gone.has(i)?`<div style="min-height:90px"></div>`:`<button class="card" style="min-height:90px;cursor:pointer;font-size:.95rem;${QZ.sel===i?"border-color:var(--accent);background:var(--accent-soft)":""}${QZ.bad&&QZ.bad.includes(i)?"border-color:var(--bad);background:var(--bad-soft)":""}" onclick="matchClick(${i})">${esc(t.txt)}</button>`).join("")}</div>`;}
function matchClick(i){if(QZ.sel===null){QZ.sel=i;QZ.bad=null;qzRender();return;}if(QZ.sel===i){QZ.sel=null;qzRender();return;}
  const a=QZ.tiles[QZ.sel],b=QZ.tiles[i];if(a.k===b.k&&a.side!==b.side){QZ.gone.add(QZ.sel);QZ.gone.add(i);QZ.sel=null;
    if(QZ.gone.size===QZ.tiles.length){clearInterval(QZ.tm);QZ.final=(Date.now()-QZ.t0)/1000+QZ.pen;QZ.done=true;S.best=S.best||{};const k="best:"+QZ.title;if(!S.best[k]||QZ.final<S.best[k])S.best[k]=QZ.final;save();}}
  else{QZ.pen+=1;QZ.bad=[QZ.sel,i];QZ.sel=null;setTimeout(()=>{if(QZ)QZ.bad=null;qzRender();},450);}qzRender();}

// ---------- Страница «Тесты» ----------
let QB={kind:"v",lv:"B1",med:false,sel:new Set()};
VIEWS.quiz=()=>{const run=QZ?`<div class="card mt" style="border-color:var(--accent)"><div class="row between"><h2>${{learn:"Заучивание",test:"Тест",match:"Подбор",cards:"Карточки"}[QZ.mode]}: ${esc(QZ.title)}</h2><button class="btn sm" onclick="QZ=null;route(true)">Закрыть</button></div><div class="row mt">${["cards","learn","test","match"].map(m=>`<button class="btn sm ${QZ.mode===m?"pri":""}" onclick="qzStart('${m}',QZ.items,QZ.title)">${{learn:"Заучивание",test:"Тест",match:"Подбор",cards:"Карточки"}[m]}</button>`).join("")}</div><div id="qzbox" class="mt"></div></div>`:"";
  const list=QB.kind==="v"?VOCAB.filter(v=>(QB.med?v.med:!v.med)&&(QB.lv==="all"||v.lvl===QB.lv)):GRAMMAR.filter(g=>(QB.lv==="all"||g.lvl===QB.lv)&&(!QB.med||g.med));
  const selIds=[...QB.sel];const n=itemsFor(selIds).length;const due=srsDue();
  return `<h1>Тесты</h1><p class="muted prose">Режимы как в Quizlet: карточки, заучивание (выбор → написание, пока не запомните), тест со смешанными вопросами и подбор пар на время. Выберите темы — можно несколько сразу.</p>${run}
  <div class="card mt stack"><div class="row"><div class="tabs" style="margin:0;border:0">${[["v","Лексика"],["g","Грамматика"]].map(([k,nm])=>`<button class="${QB.kind===k?"on":""}" onclick="QB.kind='${k}';QB.sel=new Set();route(true)">${nm}</button>`).join("")}</div>
   <div class="row">${["A1","A2","B1","B2","C1","all"].map(l=>`<button class="btn sm ${QB.lv===l?"pri":""}" onclick="QB.lv='${l}';route(true)">${l==="all"?"Все":l}</button>`).join("")}<label class="row small" style="gap:6px"><input type="checkbox" ${QB.med?"checked":""} onchange="QB.med=this.checked;QB.sel=new Set();route(true)"> медицина / USMLE</label></div></div>
   <div class="row"><button class="btn sm" onclick="${list.map(t=>`QB.sel.add('${t.id}')`).join(";")||"0"};route(true)">Выбрать все (${list.length})</button><button class="btn sm" onclick="QB.sel=new Set();route(true)">Снять выбор</button><span class="muted small">Выбрано тем: ${QB.sel.size} · карточек: ${n}</span></div>
   <div class="grid g3" style="max-height:380px;overflow-y:auto;padding:2px">${list.map(t=>`<label class="row small" style="gap:8px;border:1px solid ${QB.sel.has(t.id)?"var(--accent)":"var(--line)"};border-radius:10px;padding:8px 10px;flex-wrap:nowrap;cursor:pointer;background:${QB.sel.has(t.id)?"var(--accent-soft)":"var(--surface)"}"><input type="checkbox" ${QB.sel.has(t.id)?"checked":""} onchange="this.checked?QB.sel.add('${t.id}'):QB.sel.delete('${t.id}');route(true)"><span style="flex:1">${esc(t.t)}</span><span class="chip lv lv${t.lvl}">${t.lvl}</span><span class="muted">${t.kind==="g"||!t.words?t.q.length:t.words.length}</span></label>`).join("")||'<span class="muted">Нет тем для этого фильтра.</span>'}</div>
   ${n?modeBar(selIds,selIds.length===1?ALLTOPICS[selIds[0]].t:`${QB.kind==="v"?"Лексика":"Грамматика"}: ${selIds.length} тем`):'<div class="notice">Отметьте одну или несколько тем.</div>'}</div>
  <h2 class="mt">Быстрый старт</h2><div class="grid g3 mt">
   <button class="card" style="text-align:left;cursor:pointer" onclick="qzStart('learn',srsDue().map(k=>{const w=wordByKey(k);return w&&{kind:'v',q:w.en,a:w.ru,ex:w.ex,src:w.tt,tid:w.tid}}).filter(Boolean),'Слова к повторению')"><h3>Слова к повторению</h3><div class="muted small">${due.length} слов из интервального повторения</div></button>
   <button class="card" style="text-align:left;cursor:pointer" onclick="qzStart('test',VOCAB.filter(v=>!v.med&&v.lvl===S.level).flatMap(vItems),'Лексика ${S.level}',{cfg:{n:30,types:{w:1,mc:1,tf:1,m:1},dir:'mix'}})"><h3>Тест по лексике ${S.level}</h3><div class="muted small">30 вопросов из всех тем уровня</div></button>
   <button class="card" style="text-align:left;cursor:pointer" onclick="qzStart('test',GRAMMAR.filter(g=>g.lvl===S.level).flatMap(gItems),'Грамматика ${S.level}',{cfg:{n:25,types:{w:1,mc:1,tf:1,m:0},dir:'ru'}})"><h3>Тест по грамматике ${S.level}</h3><div class="muted small">25 вопросов по всем темам уровня</div></button>
  </div>
  ${(S.tests||[]).length?`<h2 class="mt">История тестов</h2><div class="card mt tw"><table class="vtable small">${S.tests.slice(-10).reverse().map(t=>`<tr><td class="muted">${t.d}</td><td>${esc(t.t)}</td><td><b>${Math.round(t.ok/t.tot*100)}%</b> (${t.ok}/${t.tot})</td></tr>`).join("")}</table></div>`:""}`;};
route();
