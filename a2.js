// ===== VIEWS 1: home, course, grammar, vocab, flash, test =====
const WEEK=[["sun","Пробный тест или отдых","#reading"],["mon","Listening","#listening"],["tue","Writing Task 1 (письмо)","#writing"],["wed","Reading","#reading"],["thu","Speaking","#speaking"],["fri","Writing Task 2 (эссе по частям)","#writing"],["sat","Медицинский английский","#medical"]];
function nextGrammar(){for(const lv of LEVELS.slice(LEVELS.indexOf(S.level))){const g=GRAMMAR.find(x=>x.lvl===lv&&!(S.done[x.id]>=0.8));if(g)return g;}return GRAMMAR.find(x=>!(S.done[x.id]>=0.8))||GRAMMAR[0];}
function nextVocab(){for(const lv of LEVELS.slice(LEVELS.indexOf(S.level))){const v=VOCAB.find(x=>x.lvl===lv&&!x.words.every(w=>S.srs[key(x.id,w.en)]));if(v)return v;}return VOCAB[0];}

VIEWS.home=()=>{const due=srsDue().length,e=estimate(),wd=WEEK[new Date().getDay()],g=nextGrammar(),v=nextVocab(),p=S.plan[today()]||{};
  const items=[["srs","5 мин",`Повтор карточек: ${due} к повторению`,"#flash"],["main","15 мин",`Главный блок: ${wd[1]}`,wd[2]],["ear","5 мин","Аудирование или пересказ по карточке","#listening"],["new","5 мин",`Новое: ${g.t} · слова «${v.t}»`,"#"+g.id]];
  return `<section class="hero"><div class="stack"><span class="small" style="opacity:.85">${new Date().toLocaleDateString("ru-RU",{weekday:"long",day:"numeric",month:"long"})} · уровень ${S.level} · цель IELTS GT 6.5</span>
  <h1>Занятие на сегодня — 25 минут</h1>
  <div class="plan">${items.map(([k,m,t,h])=>`<a href="${h}" class="${p[k]?"done":""}" onclick="markPlan('${k}')"><b>${m}</b><span>${esc(t)}</span></a>`).join("")}</div></div>
  <div class="stack" style="justify-content:space-between"><div class="card" style="background:rgba(255,255,255,.12);border:0;color:#fff;box-shadow:none">
   <div class="small" style="opacity:.85">Прогноз балла сейчас</div><div style="font-family:var(--f-display);font-size:2.6rem">${e.O.toFixed(1)}</div>
   <div class="row small">L ${e.L} · R ${e.R} · W ${e.W} · S ${e.S}</div><div class="bar mt" style="background:rgba(255,255,255,.25)"><i style="width:${Math.min(100,e.O/6.5*100)}%;background:#fff"></i></div>
   <div class="small" style="opacity:.85;margin-top:6px">до 6.5: ${Math.max(0,6.5-e.O).toFixed(1)}</div></div>
   ${S.placed?"":`<a class="btn pri" href="#test">Пройти входной тест (15 мин)</a>`}</div></section>
  <div class="grid g4 mt">
   <div class="card tile"><span class="muted small">Серия дней</span><span class="num">${streak()}</span></div>
   <div class="card tile"><span class="muted small">Минут за неделю</span><span class="num">${weekMin()}</span></div>
   <div class="card tile"><span class="muted small">Слов выучено</span><span class="num">${learned()}</span><span class="muted small">в повторении: ${Object.keys(S.srs).length}</span></div>
   <div class="card tile"><span class="muted small">Тем грамматики пройдено</span><span class="num">${GRAMMAR.filter(x=>S.done[x.id]>=0.8).length}<span class="muted small"> / ${GRAMMAR.length}</span></span></div>
  </div>
  <h2 class="mt">Разделы</h2>
  <div class="grid g3 mt">${[["course","Курс A1–C1","Карта уровней и что пройти дальше"],["grammar","Грамматика",GRAMMAR.length+" тем с объяснениями и упражнениями"],["vocab","Лексика",VOCAB.filter(x=>!x.med).length+" тем, карточки и тесты"],["medical","Медицинский трек","Анатомия, симптомы, анамнез, ролевые игры"],["listening","Listening","Тексты с озвучкой, вопросы, диктант, пересказ"],["reading","Reading","Задания в формате GT, True/False/Not Given"],["writing","Writing","Письма и эссе с проверкой ИИ"],["speaking","Speaking","Part 1–3, карточки, разговор с ИИ"],["videos","Видео","YouTube-каналы и ролики к каждой теме"],["tips","Методички","Стратегии и шаблоны для экзамена"],["mistakes","Тетрадь ошибок",S.mistakes.length+" ошибок для повторения"],["flash","Карточки",due+" слов ждут повторения"]].map(([h,t,d])=>`<a class="card" href="#${h}"><h3>${t}</h3><div class="muted small">${d}</div></a>`).join("")}</div>`;};

function lvlStats(lv){const gs=GRAMMAR.filter(x=>x.lvl===lv),vs=VOCAB.filter(x=>x.lvl===lv);const gd=gs.filter(x=>S.done[x.id]>=0.8).length;
  const tw=vs.reduce((a,v)=>a+v.words.length,0),lw=vs.reduce((a,v)=>a+v.words.filter(w=>{const c=S.srs[key(v.id,w.en)];return c&&c.i>=3;}).length,0);
  return {gs,vs,gd,tw,lw,pct:Math.round(((gs.length?gd/gs.length:0)*0.6+(tw?lw/tw:0)*0.4)*100)};}
VIEWS.course=()=>`<h1>Курс A1–C1</h1><p class="muted prose">Каждый уровень — грамматика и лексика. Уровень считается пройденным при 80%+ в упражнениях и выученных словах. Основная цель — B2 (IELTS 5.5–6.5), C1 — запас сверху.</p>
  <div class="levelmap mt">${LEVELS.map(lv=>{const s=lvlStats(lv);return `<a href="#lv-${lv}" class="lvbox lv${lv}" onclick="S.level='${lv}';save()"><b style="font-family:var(--f-display)">${lv}</b><span class="small">IELTS ≈ ${{A1:"до 2.5",A2:"3.0–3.5",B1:"4.0–5.0",B2:"5.5–6.5",C1:"7.0–8.0"}[lv]}</span><div class="bar"><i style="width:${s.pct}%"></i></div><span class="small">${s.pct}% · ${s.gd}/${s.gs.length} тем</span></a>`}).join("")}</div>
  ${LEVELS.map(lv=>{const s=lvlStats(lv);return `<section class="mt" id="lv-${lv}"><div class="row between"><h2>${lv}</h2><span class="chip lv lv${lv}">${s.pct}%</span></div>
  <div class="grid g2 mt"><div class="card"><h3>Грамматика</h3><div class="stack small mt">${s.gs.map(g=>`<a href="#${g.id}" class="row between" style="text-decoration:none;color:inherit"><span>${esc(g.t)}</span>${S.done[g.id]!=null?`<span class="chip ${S.done[g.id]>=0.8?"ok":""}">${Math.round(S.done[g.id]*100)}%</span>`:""}</a>`).join("")}</div></div>
  <div class="card"><h3>Лексика</h3><div class="stack small mt">${s.vs.map(v=>{const n=v.words.filter(w=>S.srs[key(v.id,w.en)]).length;return `<a href="#${v.id}" class="row between" style="text-decoration:none;color:inherit"><span>${esc(v.t)} ${v.med?'<span class="chip med">мед</span>':""}</span><span class="muted">${n}/${v.words.length}</span></a>`}).join("")||'<span class="muted">—</span>'}</div></div></div></section>`}).join("")}`;
LEVELS.forEach(lv=>VIEWS["lv-"+lv]=()=>{AFTER=()=>{const el=document.getElementById("lv-"+lv);el&&el.scrollIntoView();};return VIEWS.course();});

// ----- quiz engine -----
const QS={};
function quizHTML(ns,list,src){QS[ns]=QS[ns]||{list,ans:{},src};QS[ns].list=list;
  return `<div class="stack" id="qz-${ns}">${list.map((q,i)=>qItem(ns,q,i)).join("")}</div><div id="qr-${ns}" class="mt"></div>`;}
function qItem(ns,q,i){const a=QS[ns].ans[i];return `<div class="q" id="q-${ns}-${i}"><div class="row between"><span><span class="muted small">${i+1}.</span> ${esc(q[0])}</span>${sayBtn(q[0].replace(/_+/g,"blank"))}</div>
  <div class="opts">${q[1].map((o,j)=>`<button class="opt ${a!=null?(j===q[2]?"right":(j===a?"wrong":"")):""}" ${a!=null?"disabled":""} onclick="qAns('${ns}',${i},${j})">${esc(o)}</button>`).join("")}</div>
  ${a!=null?`<div class="fb ${a===q[2]?"ok":"no"}">${a===q[2]?"Верно":"Неверно"}${q[3]?" — "+esc(q[3]):""}</div>`:""}</div>`;}
function qAns(ns,i,j){const Q=QS[ns];if(Q.ans[i]!=null)return;Q.ans[i]=j;const q=Q.list[i];
  if(j!==q[2])addMistake(q[0],q[1][q[2]],Q.src);document.getElementById(`q-${ns}-${i}`).outerHTML=qItem(ns,q,i);
  const n=Object.keys(Q.ans).length;if(n===Q.list.length){const ok=Q.list.filter((x,k)=>Q.ans[k]===x[2]).length,p=ok/Q.list.length;
    if(Q.onDone)Q.onDone(p);document.getElementById("qr-"+ns).innerHTML=`<div class="card row between"><b>Результат: ${ok} из ${Q.list.length} (${Math.round(p*100)}%)</b><button class="btn sm" onclick="qReset('${ns}')">Пройти заново</button></div>`;}}
function qReset(ns){QS[ns].ans={};const Q=QS[ns];document.getElementById("qz-"+ns).innerHTML=Q.list.map((q,i)=>qItem(ns,q,i)).join("");document.getElementById("qr-"+ns).innerHTML="";}

// ----- grammar -----
VIEWS.grammar=()=>`<h1>Грамматика</h1><p class="muted prose">${GRAMMAR.length} тем от A1 до C1: объяснение на русском, примеры с озвучкой, видео и упражнения. Кнопка «Ещё упражнения» просит ИИ составить новые задания по теме.</p>
 ${LEVELS.map(lv=>`<h2 class="mt">${lv}</h2><div class="grid g3 mt">${GRAMMAR.filter(g=>g.lvl===lv).map(g=>`<a class="card" href="#${g.id}"><div class="row between"><span class="chip lv lv${lv}">${lv}</span>${g.med?'<span class="chip med">мед / USMLE</span>':""}${S.done[g.id]!=null?`<span class="chip ${S.done[g.id]>=0.8?"ok":""}">${Math.round(S.done[g.id]*100)}%</span>`:""}</div><h3 class="mt" style="margin-top:10px">${esc(g.t)}</h3><div class="muted small">${g.q.length} упражнений</div></a>`).join("")}</div>`).join("")}`;
const EXTRA={};
function viewGrammarTopic(id){const g=ALLTOPICS[id];const i=GRAMMAR.findIndex(x=>x.id===id),nx=GRAMMAR[i+1];
  QS[id]=null;setTimeout(()=>{if(QS[id])QS[id].onDone=p=>{setDone(id,p);}},0);
  return `<div class="crumbs"><a href="#grammar">Грамматика</a> / ${g.lvl}</div><div class="row between"><h1>${esc(g.t)}</h1><span class="chip lv lv${g.lvl}">${g.lvl}</span></div>
  <div class="grid split mt">
   <div class="stack"><div class="card prose">${g.ex}</div>
    <div class="stack">${g.eg.map(e=>`<div class="eg"><span>${esc(e)}</span>${sayBtn(e)}</div>`).join("")}</div>
    <h2 class="mt">Упражнения</h2>${quizHTML(id,g.q,g.t)}
    <h2 class="mt">Тренировка как в Quizlet</h2>${modeBar([id],g.t)}<div id="qzbox"></div>
    <div id="extra-${id}" class="stack">${EXTRA[id]?quizHTML(id+"x",EXTRA[id],g.t):""}</div>
    <div class="row">${AI?`<button class="btn" id="moreBtn" onclick="moreEx('${id}')">Ещё 10 упражнений от ИИ</button><button class="btn" onclick="openAssist('Объясни подробнее тему «${esc(g.t)}» (уровень ${g.lvl}) простыми словами с примерами из медицины и жизни.')">Спросить ИИ по теме</button>`:noAI()}</div>
    ${nx?`<a class="btn pri" href="#${nx.id}" style="align-self:flex-start">Следующая тема: ${esc(nx.t)} →</a>`:""}</div>
   <div class="stack"><div class="card"><h3>Посмотрите ролик</h3><p class="muted small">Перед упражнениями — короткое видео по теме.</p>${ytLinks(g.yt,"g")}</div>
   <div class="card"><h3>Совет</h3><p class="small muted">Ошибки автоматически попадают в <a href="#mistakes">тетрадь ошибок</a>. Тема засчитывается при 80%+.</p></div></div></div>`;}
async function moreEx(id){const g=ALLTOPICS[id];const b=$("#moreBtn");b.disabled=true;b.textContent="ИИ составляет задания…";
  try{const arr=await askJSON(`You are an English teacher. Create 10 NEW multiple-choice exercises on the grammar topic "${g.t}" (CEFR ${g.lvl}). Mix everyday, IELTS and medical contexts. Each item: a sentence with a gap shown as ___ (or a short question), 3 options, exactly one correct. Give a very short explanation in Russian. Format: [{"q":"...","o":["a","b","c"],"c":0,"e":"пояснение"}]`,"quick");
    const list=arr.map(x=>[x.q,x.o,x.c,x.e]).filter(x=>x[0]&&x[1]&&x[1].length>1);EXTRA[id]=(EXTRA[id]||[]).concat(list);QS[id+"x"]=null;
    $("#extra-"+id).innerHTML=`<h3>Задания от ИИ</h3>`+quizHTML(id+"x",EXTRA[id],g.t);}
  catch(e){toast(e.message==="noai"?"ИИ недоступен":"Не получилось: "+e.message);}b.disabled=false;b.textContent="Ещё 10 упражнений от ИИ";}

// ----- vocab -----
function vocabGrid(list){return `<div class="grid g3 mt">${list.map(v=>{const n=v.words.filter(w=>S.srs[key(v.id,w.en)]).length;return `<a class="card" href="#${v.id}"><div class="row between"><span class="chip lv lv${v.lvl}">${v.lvl}</span>${v.usm?'<span class="chip med">USMLE '+v.usm+'</span>':v.med?'<span class="chip med">медицина</span>':""}</div><h3 style="margin-top:10px">${esc(v.t)}</h3><div class="muted small">${v.words.length} слов · в повторении ${n}</div><div class="bar mt"><i style="width:${n/v.words.length*100}%"></i></div></a>`}).join("")}</div>`;}
VIEWS.vocab=()=>`<h1>Лексика</h1><p class="muted prose">${VOCAB.reduce((a,v)=>a+v.words.length,0)} слов и фраз в ${VOCAB.length} темах. В каждой теме: список с озвучкой, карточки, тест и написание. Добавленные слова повторяются по интервалам в разделе <a href="#flash">Карточки</a>.</p>
 ${LEVELS.map(lv=>{const l=VOCAB.filter(v=>v.lvl===lv&&!v.med);return l.length?`<h2 class="mt">${lv}</h2>${vocabGrid(l)}`:""}).join("")}
 <h2 class="mt">Медицинская лексика и USMLE</h2><p class="muted small">Вся медицинская лексика — в разделе <a href="#medical">Медицина</a>: ${VOCAB.filter(v=>v.med).length} тем, ${VOCAB.filter(v=>v.med).reduce((a,v)=>a+v.words.length,0)} терминов.</p>${vocabGrid(VOCAB.filter(v=>v.med&&!v.usm))}`;
let VT="list",VCARD=0,VFLIP=false;
function viewVocabTopic(id){const v=ALLTOPICS[id];const inS=v.words.filter(w=>S.srs[key(id,w.en)]).length;
  return `<div class="crumbs"><a href="#${v.med?"medical":"vocab"}">${v.med?"Медицина":"Лексика"}</a> / ${v.lvl}</div><div class="row between"><h1>${esc(v.t)}</h1><div class="row"><span class="chip lv lv${v.lvl}">${v.lvl}</span>${v.med?'<span class="chip med">медицина</span>':""}</div></div>
  <div class="row mt"><button class="btn pri" onclick="const n=srsAdd('${id}',ALLTOPICS['${id}'].words);toast(n?('Добавлено в повторение: '+n):'Все слова уже в повторении');route(true)">${inS===v.words.length?"Все слова в повторении ✓":"Добавить все слова в повторение"}</button><span class="muted small">${inS}/${v.words.length} в повторении</span></div>
  <div class="grid split mt"><div>
  <div class="card stack" style="margin-bottom:16px"><h3>Режимы тренировки</h3>${modeBar([id],v.t)}<div id="qzbox"></div></div><div class="tabs">${[["list","Список"],["spell","Написание"]].map(([k,n])=>`<button class="${VT===k?"on":""}" onclick="VT='${k}';VCARD=0;VFLIP=false;route(true)">${n}</button>`).join("")}</div>
  <div id="vbody">${vocabBody(id)}</div></div>
  <div class="stack"><div class="card"><h3>Видео по теме</h3>${ytLinks(v.yt,v.med?"med":"v")}</div>
  ${AI?`<div class="card stack"><h3>ИИ-практика</h3><p class="small muted">Расширяйте тему и тренируйтесь в контексте.</p><button class="btn sm" id="mwBtn" onclick="moreWords('${id}')">+20 новых слов по теме</button><button class="btn sm" onclick="vocabStory('${id}')">Текст со словами темы</button>${v.med?`<button class="btn sm" onclick="usmleQ('${id}')">Вопрос-виньетка в стиле USMLE</button>`:""}<div id="vstory"></div></div>`:""}</div></div>`;}
function vocabBody(id){const v=ALLTOPICS[id],W=v.words;
  if(VT==="list")return `<div class="tw"><table class="vtable">${W.map(w=>`<tr><td>${esc(w.en)} ${sayBtn(w.en)}</td><td>${esc(w.ru)}<div class="muted small">${esc(w.ex)} ${w.ex?sayBtn(w.ex):""}</div></td></tr>`).join("")}</table></div>`;
  if(VT==="cards"){const w=W[VCARD%W.length];return `<div class="flash" onclick="VFLIP=!VFLIP;$('#vbody').innerHTML=vocabBody('${id}')"><div>${VFLIP?`${esc(w.ru)}<small>${esc(w.ex)}</small>`:`<b>${esc(w.en)}</b><small>нажмите, чтобы перевернуть</small>`}</div></div>
   <div class="row between mt"><button class="btn" onclick="VCARD=(VCARD-1+${W.length})%${W.length};VFLIP=false;$('#vbody').innerHTML=vocabBody('${id}')">← Назад</button><span class="muted">${VCARD%W.length+1} / ${W.length}</span>${sayBtn(w.en)}<button class="btn" onclick="VCARD++;VFLIP=false;$('#vbody').innerHTML=vocabBody('${id}')">Дальше →</button></div>`;}
  if(VT==="quiz"){const ns="vq-"+id;if(!QS[ns]){const sh=[...W].sort(()=>Math.random()-.5).slice(0,12);QS[ns]=null;
     const list=sh.map(w=>{const others=W.filter(x=>x!==w).sort(()=>Math.random()-.5).slice(0,3).map(x=>x.ru);const o=[w.ru,...others].sort(()=>Math.random()-.5);return [w.en,o,o.indexOf(w.ru),w.ex];});
     const html=quizHTML(ns,list,v.t);QS[ns].onDone=p=>setDone(id,p);return html+`<button class="btn mt" onclick="QS['${ns}']=null;$('#vbody').innerHTML=vocabBody('${id}')">Новый тест</button>`;}
    return quizHTML(ns,QS[ns].list,v.t)+`<button class="btn mt" onclick="QS['${ns}']=null;$('#vbody').innerHTML=vocabBody('${id}')">Новый тест</button>`;}
  if(VT==="spell"){const w=W[VCARD%W.length];return `<div class="card stack"><div class="muted small">Напишите по-английски (${VCARD%W.length+1}/${W.length})</div><div style="font-size:1.3rem">${esc(w.ru)}</div>
   <input type="text" id="spIn" autocomplete="off" placeholder="Ваш ответ" onkeydown="if(event.key==='Enter')spCheck('${id}')"><div class="row"><button class="btn pri" onclick="spCheck('${id}')">Проверить</button><button class="btn" onclick="VCARD++;$('#vbody').innerHTML=vocabBody('${id}')">Пропустить</button></div><div id="spFb"></div></div>`;}
  return "";}
function spCheck(id){const v=ALLTOPICS[id],w=v.words[VCARD%v.words.length];const a=$("#spIn").value.trim().toLowerCase(),r=w.en.toLowerCase().replace(/[.,!?]$/,"");
  const ok=a.replace(/[.,!?]$/,"")===r||r.split(" / ").includes(a);
  $("#spFb").innerHTML=`<div class="fb ${ok?"ok":"no"}">${ok?"Верно!":"Правильно: <b>"+esc(w.en)+"</b>"}</div>`;if(!ok)addMistake(w.ru,w.en,v.t);else{setTimeout(()=>{VCARD++;$("#vbody").innerHTML=vocabBody(id);$("#spIn")&&$("#spIn").focus();},700);}say(w.en);}
async function vocabStory(id){const v=ALLTOPICS[id];const box=$("#vstory");box.innerHTML='<span class="muted small">Пишу текст…</span>';
  const words=v.words.slice().sort(()=>Math.random()-.5).slice(0,10).map(w=>w.en).join(", ");
  try{let txt=await ask(`Write a short, natural text (90-130 words, CEFR ${v.lvl}) for an adult Russian learner who studies medicine, using these words/phrases in bold with **: ${words}. Then on a new line write "Вопрос для пересказа:" and one question in English. No title.`,t=>box.innerHTML=`<div class="ai-out small">${md(t)}</div>`,"quick");
    box.innerHTML=`<div class="ai-out small">${md(txt)}</div><div class="row mt">${TTS?`<button class="btn sm" onclick='say(${JSON.stringify(txt.split("Вопрос")[0].replace(/\*/g,""))})'>🔊 Слушать</button>`:""}</div>`;}catch(e){box.innerHTML=`<div class="notice">${esc(e.message==="noai"?"ИИ недоступен":e.message)}</div>`;}}

// ----- flashcards (SRS) -----
let FQ=null,FI=0,FF=false;
VIEWS.flash=()=>{if(!FQ){FQ=srsDue().sort(()=>Math.random()-.5);FI=0;FF=false;}
  if(!Object.keys(S.srs).length)return `<h1>Карточки</h1><div class="card mt"><p>Пока нет слов в повторении. Откройте любую тему в <a href="#vocab">Лексике</a> и нажмите «Добавить все слова в повторение».</p></div>`;
  if(FI>=FQ.length){const nextD=Math.min(...Object.values(S.srs).map(v=>v.d));return `<h1>Карточки</h1><div class="card mt stack"><h2>На сегодня всё ✓</h2><p class="muted">Повторено: ${FQ.length}. Следующие карточки: ${new Date(nextD).toLocaleString("ru-RU",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}.</p><div class="row"><a class="btn pri" href="#home" onclick="markPlan('srs')">На главную</a><button class="btn" onclick="FQ=null;route()">Проверить снова</button></div></div>`;}
  const w=wordByKey(FQ[FI]);if(!w){FI++;return VIEWS.flash();}
  return `<h1>Карточки</h1><p class="muted">${FI+1} из ${FQ.length} · интервальное повторение</p>
  <div class="flash mt" onclick="FF=true;route(true)"><div><b>${esc(w.en)}</b>${FF?`<small style="font-size:1.1rem;color:var(--ink)">${esc(w.ru)}</small><small>${esc(w.ex)}</small><small>${esc(w.tt)}</small>`:"<small>вспомните перевод и нажмите</small>"}</div></div>
  <div class="row mt" style="justify-content:center">${sayBtn(w.en)}</div>
  ${FF?`<div class="grid g4 mt">${[[1,"Не помню","bad"],[3,"Трудно",""],[4,"Помню",""],[5,"Легко","good"]].map(([g,n])=>`<button class="btn" style="justify-content:center" onclick="srsGrade(FQ[FI],${g});${g<3?"FQ.push(FQ[FI]);":""}FI++;FF=false;route(true)">${n}</button>`).join("")}</div>`:""}`;};
addEventListener("keydown",e=>{if(curView!=="flash"||/INPUT|TEXTAREA/.test(document.activeElement.tagName))return;if(e.key===" "){e.preventDefault();FF=true;route(true);}});

// ----- placement test -----
let PT={i:0,a:[]};
VIEWS.test=()=>{if(PT.i>=PLACEMENT.length){const sc={};LEVELS.forEach(l=>sc[l]=0);PLACEMENT.forEach((q,i)=>{if(PT.a[i]===q[3])sc[q[0]]++;});
   let lv="A1";for(const l of LEVELS){if(sc[l]>=4)lv=l;else break;}
   return `<h1>Результат теста</h1><div class="card mt stack"><h2>Ваш уровень: ${lv}</h2><div class="grid g4">${LEVELS.map(l=>`<div class="tile"><span class="muted small">${l}</span><span class="num">${sc[l]}/6</span></div>`).join("")}</div>
   <p class="muted small">Уровень засчитывается, если верно 4 из 6 вопросов этого и всех уровней ниже. Тест проверяет грамматику и лексику; навыки уточнятся по мере занятий.</p>
   <div class="row"><button class="btn pri" onclick="S.level='${lv}';S.placed={lv:'${lv}',d:today()};save();PT={i:0,a:[]};location.hash='course'">Установить уровень ${lv}</button><button class="btn" onclick="PT={i:0,a:[]};route()">Пройти заново</button></div></div>`;}
  const q=PLACEMENT[PT.i];return `<h1>Входной тест</h1><p class="muted">Вопрос ${PT.i+1} из ${PLACEMENT.length}. Если не знаете — выберите наугад, это нормально.</p><div class="bar"><i style="width:${PT.i/PLACEMENT.length*100}%"></i></div>
  <div class="card mt"><div style="font-size:1.2rem">${esc(q[1])}</div><div class="opts row mt">${q[2].map((o,j)=>`<button class="opt" onclick="PT.a[PT.i]=${j};PT.i++;route(true)">${esc(o)}</button>`).join("")}</div></div>`;};

async function moreWords(id){const v=ALLTOPICS[id],b=$("#mwBtn");b.disabled=true;b.textContent="ИИ подбирает слова…";
  try{const have=v.words.map(w=>w.en).join("; ");
    const arr=await askJSON(`Topic: "${v.t}" (${v.med?"medical English"+(v.usm?" for USMLE "+v.usm:""):"English for IELTS"}), CEFR ${v.lvl}. Give 20 NEW useful words/phrases for this topic that are NOT in this list: ${have}. For each: English term, Russian translation, one short natural example sentence${v.usm?" in USMLE vignette style":""}. Format: [{"en":"...","ru":"...","ex":"..."}]`,"quick");
    const add=arr.filter(w=>w&&w.en&&w.ru);S.xw[id]=(S.xw[id]||[]).concat(add);mergeXW();save();toast("Добавлено слов: "+add.length);route(true);}
  catch(e){toast("Не получилось: "+e.message);b.disabled=false;b.textContent="+20 новых слов по теме";}}
async function usmleQ(id){const v=ALLTOPICS[id],box=$("#vstory");box.innerHTML='<span class="muted small">Составляю виньетку…</span>';
  try{const o=await askJSON(`Write one USMLE-style ${v.usm&&v.usm.includes("2")?"Step 2 CK":"Step 1"} multiple-choice question related to the topic "${v.t}". Realistic clinical vignette (5-8 sentences: age/sex, presentation, history, exam, labs), question line, 5 options (A-E), one correct. Then an explanation in Russian (why correct, why others wrong) and 5 key English terms from the stem with Russian translations. Format: {"stem":"...","question":"...","o":["...","...","...","...","..."],"c":0,"ru":"...","terms":[["term","перевод"]]}`);
    const ns="uq-"+id+Date.now();box.innerHTML=`<div class="q"><p class="small">${esc(o.stem)}</p><p><b>${esc(o.question)}</b></p></div>`+quizHTML(ns,[[ "Выберите ответ:",o.o,o.c,""]],"USMLE: "+v.t)+`<div id="uqx" class="hide ai-out small mt">${md(o.ru)}<h4>Термины</h4><ul>${(o.terms||[]).map(t=>`<li><b>${esc(t[0])}</b> — ${esc(t[1])}</li>`).join("")}</ul></div>`;
    QS[ns].onDone=()=>$("#uqx").classList.remove("hide");}
  catch(e){box.innerHTML=errBox(e);}}
