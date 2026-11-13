// ===== VIEWS 2: listening, reading, writing =====
function errBox(e){return `<div class="notice">${esc(e&&e.message==="noai"?"ИИ недоступен в этом окне.":(e&&e.message)||"Ошибка")}</div>`;}
function lvSel(id,val){return `<select id="${id}" style="width:auto">${LEVELS.map(l=>`<option ${l===val?"selected":""}>${l}</option>`).join("")}</select>`;}

// ----- LISTENING -----
let LT=null,LSHOW=false,LMODE="q",GENL=[];
VIEWS.listening=()=>{if(LT!=null)return listenOne();const all=TEXTS.concat(GENL);
  return `<h1>Listening</h1><p class="muted prose">Тексты озвучиваются голосом Claude. Сначала слушайте без текста, отвечайте на вопросы, затем — диктант по предложениям и пересказ голосом.${TTS?"":" Озвучка доступна в Chrome и приложении Claude для компьютера; здесь текст можно читать."}</p>
  ${AI?`<div class="card mt stack"><h3>Новый текст от ИИ</h3><div class="row">${lvSel("glv",S.level)}<select id="gtopic" style="width:auto"><option value="">Любая тема IELTS</option><option>health and medicine</option><option>a doctor-patient conversation</option><option>a university lecture on biology</option><option>work and careers</option><option>environment</option><option>technology</option><option>travel and booking accommodation</option><option>a phone call to book an appointment (IELTS Part 1 style)</option></select><button class="btn pri" id="genL" onclick="genListening()">Создать</button></div></div>`:""}
  <div class="grid g3 mt">${all.map((t,i)=>`<a class="card" href="#listening" onclick="LT=${i};LSHOW=false;LMODE='q';QS['L-'+${i}]=null;route(true);return false"><div class="row between"><span class="chip lv lv${t.lvl}">${t.lvl}</span>${t.med?'<span class="chip med">медицина</span>':""}${t.gen?'<span class="chip">ИИ</span>':""}</div><h3 style="margin-top:10px">${esc(t.t)}</h3><div class="muted small">${t.q.length} вопроса · пересказ</div></a>`).join("")}</div>`;};
function curL(){return TEXTS.concat(GENL)[LT];}
function listenOne(){const t=curL(),ns="L-"+LT;const sents=t.txt.match(/[^.!?]+[.!?]+/g)||[t.txt];
  const qhtml=quizHTML(ns,t.q.map(x=>[x[0],x[1],x[2]]),"Listening: "+t.t);QS[ns].onDone=p=>{S.quiz.L.push(p);save();};
  return `<div class="crumbs"><a href="#listening" onclick="LT=null;route(true);return false">Listening</a> / ${t.lvl}</div><h1>${esc(t.t)}</h1>
  <div class="card mt stack"><div class="row">${TTS?`<button class="btn pri" onclick="say(curL().txt,1)">▶ Слушать</button><button class="btn" onclick="say(curL().txt,0.8)">▶ Медленнее (0.8×)</button><button class="btn" onclick="TTS&&TTS.stop()">■ Стоп</button>`:'<span class="notice">Озвучка недоступна — читайте текст.</span>'}<button class="btn" onclick="LSHOW=!LSHOW;route(true)">${LSHOW||!TTS?"Скрыть текст":"Показать текст"}</button></div>
  ${LSHOW||!TTS?`<div class="prose">${esc(t.txt)}</div>`:""}</div>
  <div class="tabs mt">${[["q","Вопросы"],["d","Диктант"],["r","Пересказ"]].map(([k,n])=>`<button class="${LMODE===k?"on":""}" onclick="LMODE='${k}';route(true)">${n}</button>`).join("")}</div>
  ${LMODE==="q"?qhtml:LMODE==="d"?`<p class="muted small">Слушайте предложение и записывайте его. Затем сравните.</p><div class="stack">${sents.map((s,i)=>`<div class="q"><div class="row">${sayBtn(s.trim())}<input type="text" id="dc${i}" placeholder="Предложение ${i+1}"></div><div id="dcf${i}" class="fb"></div></div>`).join("")}</div><button class="btn pri mt" onclick="checkDict()">Проверить диктант</button>`
  :retellHTML(t)}`;}
function norm(s){return s.toLowerCase().replace(/[^a-z0-9' ]/g," ").replace(/\s+/g," ").trim();}
function checkDict(){const t=curL();const sents=t.txt.match(/[^.!?]+[.!?]+/g)||[t.txt];let tot=0,ok=0;
  sents.forEach((s,i)=>{const r=norm(s).split(" "),a=norm($("#dc"+i).value).split(" ");const hit=r.filter(w=>a.includes(w)).length;tot+=r.length;ok+=hit;
    $("#dcf"+i).innerHTML=`<span class="${hit/r.length>0.85?"ok":"no"}">${Math.round(hit/r.length*100)}%</span> · <span class="muted">${esc(s.trim())}</span>`;});
  S.quiz.L.push(ok/tot);save();toast("Диктант: "+Math.round(ok/tot*100)+"% слов");}
// recorder widget
let RECBOX=null;
function recBtn(boxId){return DICT?`<button class="btn sm" id="mic-${boxId}" onclick="toggleRec('${boxId}')">🎙 Говорить</button>`:`<span class="muted small">Голосовой ввод доступен в Chrome и приложении Claude для компьютера — можно печатать.</span>`;}
let recStart=0;
function toggleRec(boxId){const btn=$("#mic-"+boxId);if(MIC.state==="listening"&&RECBOX===boxId){micStop();return;}
  if(MIC.state==="listening")micStop();RECBOX=boxId;const box=$("#"+boxId);let base=box.value;recStart=Date.now();
  micStart(f=>{base=(base?base+" ":"")+f;box.value=base;box.dispatchEvent(new Event("input"));},p=>{box.value=(base?base+" ":"")+p;},st=>{const b=$("#mic-"+boxId);if(!b)return;
    if(st==="listening"){b.classList.add("rec");b.textContent="■ Стоп";}else{b.classList.remove("rec");b.textContent="🎙 Говорить";const sec=(Date.now()-recStart)/1000;if(sec>2){S.speakSec=(S.speakSec||0)+sec;save();}}});}
function retellHTML(t){return `<div class="card stack"><p class="muted small">Перескажите текст своими словами (голосом или текстом). Постарайтесь использовать ключевые слова:</p><div class="row">${(t.key||[]).map(k=>`<span class="chip">${esc(k)}</span>`).join("")}</div>
  <textarea id="rt" style="min-height:140px" placeholder="Ваш пересказ…"></textarea><div class="row">${recBtn("rt")}${AI?`<button class="btn pri" id="rtBtn" onclick="checkRetell()">Оценить пересказ</button>`:""}</div><div id="rtOut"></div></div>`;}
async function checkRetell(){const t=curL(),a=$("#rt").value.trim();if(a.split(" ").length<8){toast("Скажите хотя бы пару предложений");return;}
  const used=(t.key||[]).filter(k=>a.toLowerCase().includes(k.toLowerCase().split(" ")[0]));const out=$("#rtOut");$("#rtBtn").disabled=true;
  try{await ask(`You are an IELTS speaking coach. The learner (Russian, CEFR ${S.level}, studying medicine) listened to this text and retold it (the retelling may be a speech-to-text transcript, so ignore punctuation and capitalization).
ORIGINAL: """${t.txt}"""
RETELLING: """${a}"""
Reply in Russian, concise, with headings: ### Содержание (what was covered/missed), ### Ошибки (up to 5 grammar/vocabulary mistakes: wrong → correct), ### Как сказать лучше (a corrected improved version in English, 4-6 sentences, B2 level), ### Оценка (approximate IELTS Speaking band for fluency/lexis/grammar based on the text, one line).`,x=>out.innerHTML=`<div class="ai-out">${md(x)}</div>`);
    out.insertAdjacentHTML("afterbegin",`<p class="small muted">Ключевые слова использованы: ${used.length} из ${(t.key||[]).length}</p>`);markPlan("ear");}catch(e){out.innerHTML=errBox(e);}$("#rtBtn").disabled=false;}
async function genListening(){const b=$("#genL"),lv=$("#glv").value,tp=$("#gtopic").value;b.disabled=true;b.textContent="Создаю…";
  try{const o=await askJSON(`Create an IELTS-style listening text for CEFR ${lv}${tp?`, topic: ${tp}`:""}. ${lv<"B1"?"80-110":"150-220"} words, natural spoken English (monologue or dialogue written as prose). Then 5 multiple-choice comprehension questions with 3 options each, and 5-7 key phrases from the text for retelling. Format: {"t":"title","txt":"...","q":[["question",["a","b","c"],correctIndex]],"key":["..."]}`);
    o.lvl=lv;o.gen=1;o.med=/health|medic|doctor|biology|appointment/.test(tp)?1:0;GENL.push(o);LT=TEXTS.length+GENL.length-1;LSHOW=false;LMODE="q";route(true);}
  catch(e){toast("Не получилось: "+e.message);b.disabled=false;b.textContent="Создать";}}

// ----- READING -----
let RT=null,GENR=[],RANS={};
VIEWS.reading=()=>{if(RT!=null)return readOne();const all=READING.concat(GENR);
  return `<h1>Reading</h1><p class="muted prose">Тексты в формате IELTS General Training: объявления, рабочие документы, статьи. Ответы — True / False / Not Given и пропуски.</p>
  ${AI?`<div class="card mt stack"><h3>Новый текст от ИИ</h3><div class="row">${lvSel("rlv",S.level)}<select id="rsec" style="width:auto"><option value="Section 1 (everyday notice or advertisement)">Section 1 — бытовой текст</option><option value="Section 2 (workplace document: policy, training, job info)">Section 2 — рабочий документ</option><option value="Section 3 (longer general-interest article)">Section 3 — длинная статья</option><option value="Section 3 article on a medical or health topic">Статья о медицине</option></select><button class="btn pri" id="genR" onclick="genReading()">Создать</button></div></div>`:""}
  <div class="grid g3 mt">${all.map((t,i)=>`<a class="card" href="#reading" onclick="RT=${i};RANS={};route(true);return false"><span class="chip lv lv${t.lvl}">${t.lvl}</span> ${t.gen?'<span class="chip">ИИ</span>':""}<h3 style="margin-top:10px">${esc(t.t)}</h3><div class="muted small">${esc(t.type)} · ${t.q.length} вопросов</div></a>`).join("")}</div>
  <div class="card mt"><h3>Стратегия True / False / Not Given</h3><div class="small">${TIPS[2].b}</div></div>`;};
function readOne(){const t=READING.concat(GENR)[RT];
  return `<div class="crumbs"><a href="#reading" onclick="RT=null;route(true);return false">Reading</a> / ${esc(t.type)}</div><h1>${esc(t.t)}</h1>
  <div class="grid g2 mt"><div class="card prose small">${t.txt}</div><div class="stack">${t.q.map((q,i)=>`<div class="q"><div>${i+1}. ${esc(q.s)}</div>
  ${q.type==="tfng"?`<div class="opts">${["TRUE","FALSE","NOT GIVEN"].map(o=>`<button class="opt" id="ro${i}${o[0]}" onclick="RANS[${i}]='${o}';document.querySelectorAll('[id^=ro${i}]').forEach(b=>b.style.outline='');this.style.outline='2px solid var(--accent)'">${o}</button>`).join("")}</div>`
   :`<input type="text" class="mt" oninput="RANS[${i}]=this.value" placeholder="Ответ">`}<div class="fb" id="rf${i}"></div></div>`).join("")}
  <button class="btn pri" onclick="checkReading()">Проверить</button><div id="rRes"></div></div></div>`;}
function checkReading(){const t=READING.concat(GENR)[RT];let ok=0;t.q.forEach((q,i)=>{const a=(RANS[i]||"").trim().toLowerCase(),r=String(q.a).toLowerCase();const good=a===r;if(good)ok++;else addMistake(q.s,q.a,"Reading");
  $("#rf"+i).innerHTML=`<span class="${good?"ok":"no"}">${good?"Верно":"Ответ: "+esc(q.a)}</span>${q.why?` — <span class="muted">${esc(q.why)}</span>`:""}`;$("#rf"+i).className="fb "+(good?"ok":"no");});
  S.quiz.R.push(ok/t.q.length);save();$("#rRes").innerHTML=`<div class="card mt"><b>${ok} из ${t.q.length}</b></div>`;}
async function genReading(){const b=$("#genR");b.disabled=true;b.textContent="Создаю…";const lv=$("#rlv").value,sec=$("#rsec").value;
  try{const o=await askJSON(`Create an IELTS General Training reading task, ${sec}, CEFR ${lv}. Text ${lv<"B2"?"200-280":"320-450"} words, as simple HTML paragraphs (<p>, optional <b>). Then 8 questions: 5 True/False/Not Given (include at least one NOT GIVEN and one FALSE) and 3 gap-fill (answer = 1-2 words or a number taken from the text). Add a short Russian explanation "why" for each. Format: {"t":"title","type":"GT ...","txt":"<p>..</p>","q":[{"type":"tfng","s":"statement","a":"TRUE|FALSE|NOT GIVEN","why":"..."},{"type":"gap","s":"sentence with ___","a":"answer","why":"..."}]}`);
    o.lvl=lv;o.gen=1;GENR.push(o);RT=READING.length+GENR.length-1;RANS={};route(true);}catch(e){toast("Не получилось: "+e.message);b.disabled=false;b.textContent="Создать";}}

// ----- WRITING -----
let WT="t1",WP=0,WTIMER=null,WLEFT=0;
VIEWS.writing=()=>{const list=WRITING[WT],p=list[WP%list.length],dk=WT+"-"+WP,draft=S.drafts[dk]||"";const need=WT==="t1"?150:250;
  return `<h1>Writing</h1><p class="muted prose">Task 1 — письмо (150+ слов, ≈20 мин). Task 2 — эссе (250+ слов, ≈40 мин; можно писать по частям, черновик сохраняется). ИИ оценивает по 4 критериям IELTS.</p>
  <div class="tabs mt">${[["t1","Task 1 · письмо"],["t2","Task 2 · эссе"]].map(([k,n])=>`<button class="${WT===k?"on":""}" onclick="WT='${k}';WP=0;route(true)">${n}</button>`).join("")}</div>
  <div class="grid split"><div class="stack">
   <div class="card"><div class="row between"><span class="chip">${esc(p.type)}</span><div class="row"><button class="btn sm" onclick="WP=(WP+${list.length}-1)%${list.length};route(true)">←</button><span class="muted small">${WP%list.length+1}/${list.length}</span><button class="btn sm" onclick="WP=(WP+1)%${list.length};route(true)">→</button></div></div><p style="margin-bottom:0">${esc(p.t)}</p></div>
   <textarea id="wtx" placeholder="Начните писать…" oninput="S.drafts['${dk}']=this.value;save();$('#wc').textContent=this.value.trim()?this.value.trim().split(/\\s+/).length:0">${esc(draft)}</textarea>
   <div class="row between"><span><b id="wc">${draft.trim()?draft.trim().split(/\s+/).length:0}</b> <span class="muted">/ ${need} слов</span></span><div class="row"><span class="timer" id="wtm">${WTIMER?fmt(WLEFT):(WT==="t1"?"20:00":"40:00")}</span><button class="btn sm" onclick="wTimer()">${WTIMER?"Стоп":"Таймер"}</button></div></div>
   <div class="row">${AI?`<button class="btn pri" id="wBtn" onclick="checkWriting()">Проверить ИИ</button><button class="btn" onclick="sampleWriting()">Образец ответа на 7.0</button><button class="btn" onclick="planWriting()">Помочь с планом</button>`:noAI()}</div>
   <div id="wOut"></div></div>
   <div class="stack"><div class="card small">${WT==="t1"?TIPS[3].b:TIPS[4].b}</div><a class="card" href="#v-letters"><h3>Фразы для писем →</h3><div class="muted small">Формальные и неформальные шаблоны</div></a><a class="card" href="#g-linkers"><h3>Связки для эссе →</h3><div class="muted small">However, despite, therefore…</div></a>
   ${S.essays.length?`<div class="card"><h3>История оценок</h3><div class="stack small mt">${S.essays.slice(-6).reverse().map(e=>`<div class="row between"><span>${e.d} · ${e.task.toUpperCase()}</span><b>${e.band??"—"}</b></div>`).join("")}</div></div>`:""}</div></div>`;};
const fmt=s=>String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
function wTimer(){if(WTIMER){clearInterval(WTIMER);WTIMER=null;route(true);return;}WLEFT=WT==="t1"?1200:2400;WTIMER=setInterval(()=>{WLEFT--;const el=$("#wtm");if(el)el.textContent=fmt(WLEFT);if(WLEFT<=0){clearInterval(WTIMER);WTIMER=null;toast("Время вышло!");}},1000);route(true);}
async function checkWriting(){const txt=$("#wtx").value.trim(),p=WRITING[WT][WP%WRITING[WT].length];if(txt.split(/\s+/).length<40){toast("Напишите хотя бы 40 слов");return;}
  const out=$("#wOut"),b=$("#wBtn");b.disabled=true;b.textContent="Проверяю…";
  try{const r=await ask(`You are a strict, experienced IELTS examiner. Assess this IELTS General Training Writing ${WT==="t1"?"Task 1 (letter, min 150 words)":"Task 2 (essay, min 250 words)"} using the official band descriptors.
TASK: """${p.t}"""
ANSWER (${txt.split(/\s+/).length} words): """${txt}"""
Answer in Russian (keep English examples in English). Structure exactly:
### Оценка
- Task ${WT==="t1"?"Achievement":"Response"}: X
- Coherence & Cohesion: X
- Lexical Resource: X
- Grammatical Range & Accuracy: X
- **Overall: X**
### Что хорошо
(2-3 bullets)
### Главные проблемы
(3-5 bullets, most important first; what stops a higher band)
### Ошибки
(up to 10 bullets: "wrong" → "correct" — short reason)
### Улучшенная версия
(rewrite the answer at band 7.0-7.5, keeping the learner's ideas)
### Что тренировать
(2 concrete exercises / grammar topics)`,x=>out.innerHTML=`<div class="ai-out">${md(x)}</div>`);
    const m=r.match(/Overall[^0-9]*([0-9](?:[.,]5)?)/i);const band=m?parseFloat(m[1].replace(",",".")):null;S.essays.push({d:today(),task:WT,band,words:txt.split(/\s+/).length});markPlan("main");save();}
  catch(e){out.innerHTML=errBox(e);}b.disabled=false;b.textContent="Проверить ИИ";}
async function sampleWriting(){const p=WRITING[WT][WP%WRITING[WT].length],out=$("#wOut");
  try{await ask(`Write a model band 7.0 answer for this IELTS General Training ${WT==="t1"?"Task 1 letter (about 170 words)":"Task 2 essay (about 270 words)"}: """${p.t}""". After the answer, add in Russian a short list "### Полезные фразы" with 8 useful phrases from the answer and their translations.`,x=>out.innerHTML=`<div class="ai-out">${md(x)}</div>`);}catch(e){out.innerHTML=errBox(e);}}
async function planWriting(){const p=WRITING[WT][WP%WRITING[WT].length],out=$("#wOut");
  try{await ask(`Help a B1-B2 learner plan (not write) an answer to this IELTS GT ${WT==="t1"?"Task 1 letter":"Task 2 essay"}: """${p.t}""". In Russian: tone/type, paragraph-by-paragraph plan with 1-2 ideas each, 8 useful English phrases/collocations, and a model first sentence in English.`,x=>out.innerHTML=`<div class="ai-out">${md(x)}</div>`);}catch(e){out.innerHTML=errBox(e);}}
