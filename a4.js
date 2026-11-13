// ===== VIEWS 3: speaking, medical, videos, tips, mistakes, progress, assistant =====
let SPT="p1",SP1I=0,SP2I=0,P2T=null,P2LEFT=0,P2PH="";
VIEWS.speaking=()=>`<h1>Speaking</h1><p class="muted prose">Цель — говорить свободно. Отвечайте вслух (кнопка «Говорить» превращает речь в текст) или печатайте. ИИ разбирает беглость, лексику и грамматику и предлагает, как сказать лучше. Произношение по тексту оценить нельзя — для него слушайте озвучку и повторяйте.</p>
 <div class="row mt"><span class="chip">Наговорено всего: ${Math.round((S.speakSec||0)/60)} мин</span></div>
 <div class="tabs mt">${[["p1","Part 1"],["p2","Part 2 · карточка"],["chat","Разговор с ИИ"],["cards","Пересказ"],["tips","Как говорить свободно"]].map(([k,n])=>`<button class="${SPT===k?"on":""}" onclick="SPT='${k}';route(true)">${n}</button>`).join("")}</div>${speakBody()}`;
function speakBody(){
  if(SPT==="p1"){const s=SP1[SP1I%SP1.length];return `<div class="row between"><h2>${esc(s.t)}</h2><button class="btn sm" onclick="SP1I++;route(true)">Другая тема →</button></div>
   <p class="muted small">Отвечайте 2–3 предложениями: ответ → причина → пример.</p><div class="stack mt">${s.q.map((q,i)=>`<div class="q stack"><div class="row between"><b>${esc(q)}</b>${sayBtn(q)}</div><textarea id="p1a${i}" style="min-height:70px"></textarea><div>${recBtn("p1a"+i)}</div></div>`).join("")}</div>
   ${AI?`<button class="btn pri mt" id="spBtn" onclick="evalSpeaking('p1')">Получить разбор</button>`:noAI()}<div id="spOut" class="mt"></div>`;}
  if(SPT==="p2"){const c=SP2[SP2I%SP2.length];return `<div class="row between"><h2>Карточка</h2><button class="btn sm" onclick="SP2I++;P2PH='';route(true)">Другая карточка →</button></div>
   <div class="card mt"><b>${esc(c.t)}</b> ${sayBtn(c.t)}<div class="small muted mt">You should say:</div><ul class="small">${c.p.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
   <div class="row mt"><button class="btn" onclick="p2Timer(60,'Подготовка')">1 мин подготовки</button><button class="btn" onclick="p2Timer(120,'Говорите')">2 мин ответа</button><span class="timer" id="p2tm">${P2PH?P2PH+" "+fmt(P2LEFT):"00:00"}</span></div>
   <textarea id="p2a" class="mt" style="min-height:160px" placeholder="Ваш монолог (голосом или текстом)…"></textarea><div class="row mt">${recBtn("p2a")}</div>
   <h3 class="mt">Part 3 — дискуссия</h3><div class="stack mt">${c.p3.map((q,i)=>`<div class="q stack"><div class="row between"><b>${esc(q)}</b>${sayBtn(q)}</div><textarea id="p3a${i}" style="min-height:70px"></textarea><div>${recBtn("p3a"+i)}</div></div>`).join("")}</div>
   ${AI?`<button class="btn pri mt" id="spBtn" onclick="evalSpeaking('p2')">Получить разбор</button>`:noAI()}<div id="spOut" class="mt"></div>`;}
  if(SPT==="chat")return chatHTML();
  if(SPT==="cards")return `<p class="muted">Пересказ: прослушайте текст и перескажите его своими словами — лучший тренажёр беглости.</p><div class="grid g3 mt">${TEXTS.map((t,i)=>`<a class="card" href="#listening" onclick="LT=${i};LMODE='r';LSHOW=false;"><span class="chip lv lv${t.lvl}">${t.lvl}</span> ${t.med?'<span class="chip med">мед</span>':""}<h3 style="margin-top:10px">${esc(t.t)}</h3><div class="row small">${t.key.slice(0,4).map(k=>`<span class="chip">${esc(k)}</span>`).join(" ")}</div></a>`).join("")}</div>`;
  return `<div class="card prose">${TIPS[5].b}</div><a class="card mt" href="#v-idioms"><h3>Фразы и идиомы для Speaking →</h3></a>`;}
function p2Timer(sec,ph){clearInterval(P2T);P2LEFT=sec;P2PH=ph;const tick=()=>{const el=$("#p2tm");if(el)el.textContent=P2PH+" "+fmt(P2LEFT);};tick();
  P2T=setInterval(()=>{P2LEFT--;tick();if(P2LEFT<=0){clearInterval(P2T);toast(ph==="Подготовка"?"Начинайте говорить!":"Время вышло");if(ph==="Подготовка"){p2Timer(120,"Говорите");}}},1000);}
async function evalSpeaking(part){let qa="";
  if(part==="p1"){const s=SP1[SP1I%SP1.length];qa=s.q.map((q,i)=>`Q: ${q}\nA: ${$("#p1a"+i).value.trim()||"(no answer)"}`).join("\n\n");}
  else{const c=SP2[SP2I%SP2.length];qa=`PART 2 CUE CARD: ${c.t} (${c.p.join("; ")})\nMONOLOGUE: ${$("#p2a").value.trim()||"(no answer)"}\n\n`+c.p3.map((q,i)=>`PART 3 Q: ${q}\nA: ${$("#p3a"+i).value.trim()||"(no answer)"}`).join("\n\n");}
  if(qa.replace(/\(no answer\)/g,"").split(/\s+/).length<25){toast("Ответьте хотя бы на пару вопросов");return;}
  const out=$("#spOut"),b=$("#spBtn");b.disabled=true;
  try{const r=await ask(`You are an IELTS Speaking examiner and friendly coach. The learner is Russian, about CEFR ${S.level}, goal band 6.5 and FLUENT speaking. The answers are speech-to-text transcripts (ignore punctuation/capitalisation; you cannot judge pronunciation).
${qa}
Reply in Russian (English examples in English):
### Оценка
- Fluency & Coherence: X
- Lexical Resource: X
- Grammatical Range & Accuracy: X
- **Примерный балл (без произношения): X**
### Беглость
(length of answers, extending answers, linking, fillers — concrete advice)
### Ошибки
(up to 8: "wrong" → "correct")
### Лексика уровнем выше
(6-8 better words/collocations/idioms she could have used, with the sentence where they fit)
### Образец ответа
(model band-7 answer to ONE of the questions, natural spoken style)`,x=>out.innerHTML=`<div class="ai-out">${md(x)}</div>`);
    const m=r.match(/балл[^0-9]*([0-9](?:[.,]5)?)/i);S.speaks.push({d:today(),part,band:m?parseFloat(m[1].replace(",",".")):null});markPlan("main");save();}catch(e){out.innerHTML=errBox(e);}b.disabled=false;}

// ----- chat engine (conversation / roleplay) -----
let CHAT={title:"Свободный разговор",sys:"",msgs:[],voice:true,busy:false};
function chatStart(title,sys){CHAT={title,sys,msgs:[],voice:CHAT.voice,busy:false};}
const FREE_SYS="You are a friendly English conversation partner for a Russian woman (CEFR ~B1, goal: fluent speaking and IELTS 6.5; she studies medicine, is married, has a small son and a cocker spaniel puppy). Have a natural conversation: reply in 1-3 short sentences, then ask ONE follow-up question. Use B1-B2 English. If she makes a serious mistake, add at the end in brackets one short correction like (Tip: say \"I went\", not \"I goed\"). If she writes in Russian, kindly ask her to try in English and help with words.";
function chatHTML(){if(!AI)return noAI();if(!CHAT.sys)chatStart("Свободный разговор",FREE_SYS);
  return `<div class="row between"><h2>${esc(CHAT.title)}</h2><div class="row"><label class="small row" style="gap:6px"><input type="checkbox" ${CHAT.voice?"checked":""} onchange="CHAT.voice=this.checked"> озвучивать ответы</label><button class="btn sm" onclick="chatStart('Свободный разговор',FREE_SYS);route(true)">Новый разговор</button></div></div>
  <div class="row small mt">${["My day","Medicine","Hobbies","Travel","Food","Family","Technology","IELTS Part 3"].map(t=>`<button class="btn sm" onclick="chatSend('Let\\'s talk about ${t}.')">${t}</button>`).join("")}</div>
  <div class="card mt stack"><div class="chat" id="chatBox">${CHAT.msgs.length?CHAT.msgs.map(m=>`<div class="msg ${m.role==="user"?"me":"ai"}">${esc(m.content)}</div>`).join(""):`<div class="muted small">Напишите или скажите что-нибудь по-английски — например, «Hi! I had a busy day today».</div>`}</div>
  <div class="row"><input type="text" id="chatIn" placeholder="Ваш ответ по-английски…" onkeydown="if(event.key==='Enter')chatSend()" style="flex:1"><button class="btn sm" id="mic-chatIn" onclick="toggleRec('chatIn')" ${DICT?"":"disabled"}>🎙 Говорить</button><button class="btn pri sm" onclick="chatSend()">Отправить</button></div>
  ${CHAT.msgs.length>3?`<button class="btn sm" onclick="chatReview()" style="align-self:flex-start">Разбор разговора</button>`:""}<div id="chatRev"></div></div>`;}
async function chatSend(txt){const inp=$("#chatIn");txt=txt||(inp&&inp.value.trim());if(!txt||CHAT.busy)return;if(MIC.state==="listening")await micStop();
  CHAT.msgs.push({role:"user",content:txt});if(inp)inp.value="";CHAT.busy=true;route(true);
  const box=$("#chatBox");box.insertAdjacentHTML("beforeend",`<div class="msg ai" id="pend">…</div>`);box.scrollTop=1e6;
  const msgs=CHAT.msgs.map((m,i)=>i===0?{role:"user",content:"[Instructions for you: "+CHAT.sys+"]\n\n"+m.content}:m);
  try{const r=await AI(msgs,{cache:false,modelTier:"quick",onText:({text})=>{const p=$("#pend");if(p)p.textContent=text;box.scrollTop=1e6;}});
    CHAT.msgs.push({role:"assistant",content:r.text});if(CHAT.voice)say(r.text.replace(/\(Tip:[^)]*\)/g,""));S.speakSec=(S.speakSec||0)+txt.split(" ").length*0.5;save();}
  catch(e){CHAT.msgs.push({role:"assistant",content:"(Ошибка: "+(e.message||e.code)+")"});}
  CHAT.busy=false;route(true);const b=$("#chatBox");if(b)b.scrollTop=1e6;const i2=$("#chatIn");if(i2)i2.focus();}
async function chatReview(){const out=$("#chatRev");const mine=CHAT.msgs.filter(m=>m.role==="user").map(m=>m.content).join("\n");
  try{await ask(`Review the learner's side of this English conversation (Russian learner, ~${S.level}). Her messages:\n"""${mine}"""\nIn Russian: ### Что получилось, ### Ошибки (wrong → correct, up to 8), ### Слова и фразы, которые стоит выучить (6-8 with translation), ### Задание на завтра (one speaking task).`,x=>out.innerHTML=`<div class="ai-out mt">${md(x)}</div>`);}catch(e){out.innerHTML=errBox(e);}}

// ----- MEDICAL -----
VIEWS.medical=()=>`<h1>Медицинский английский</h1><p class="muted prose">Структура повторяет USMLE: Step 1 (фундаментальные дисциплины) и Step 2 CK (клиника), плюс язык клинических виньеток. Трек идёт параллельно IELTS: тема Health встречается в Speaking, Writing Task 2 и Reading. Лексика по уровням, ролевые игры с ИИ (пациент, коллега, преподаватель), медицинские тексты для аудирования и пересказа.</p>
 <div class="grid g4 mt"><div class="card tile"><span class="muted small">Тем</span><span class="num">${VOCAB.filter(v=>v.med).length}</span></div><div class="card tile"><span class="muted small">Терминов</span><span class="num">${VOCAB.filter(v=>v.med).reduce((a,v)=>a+v.words.length,0)}</span></div><div class="card tile"><span class="muted small">Грамматика USMLE</span><span class="num">${GRAMMAR.filter(g=>g.med).length}</span></div><div class="card tile"><span class="muted small">Ролевых игр</span><span class="num">${MEDSPEAK.length}</span></div></div>
 <h2 class="mt">Базовая медицинская лексика</h2>${vocabGrid(VOCAB.filter(v=>v.med&&!v.usm))}
 <h2 class="mt">USMLE Step 1 — фундаментальные дисциплины</h2><p class="muted small">Анатомия, физиология, биохимия, генетика, иммунология, микробиология, патология, фармакология, биостатистика, этика.</p>${vocabGrid(VOCAB.filter(v=>v.usm==="Step 1"))}
 <h2 class="mt">USMLE Step 2 CK — клинические дисциплины</h2>${vocabGrid(VOCAB.filter(v=>v.usm==="Step 2"))}
 <h2 class="mt">Язык экзамена USMLE</h2>${vocabGrid(VOCAB.filter(v=>v.usm==="Step 1–2"))}
 <h2 class="mt">Грамматика медицинского английского</h2><div class="grid g3 mt">${GRAMMAR.filter(g=>g.med).map(g=>`<a class="card" href="#${g.id}"><span class="chip lv lv${g.lvl}">${g.lvl}</span><h3 style="margin-top:10px">${esc(g.t)}</h3><div class="muted small">${g.q.length} упражнений</div></a>`).join("")}</div>
 <h2 class="mt">Ролевые игры с ИИ</h2><p class="muted small">ИИ играет роль, вы — врач или студент. Говорите голосом или пишите.</p>
 <div class="grid g3 mt">${MEDSPEAK.map((r,i)=>`<a class="card" href="#speaking" onclick="SPT='chat';chatStart(${JSON.stringify("Ролевая игра: "+r.t).replace(/"/g,"&quot;")},medSys(${i}));"><h3>${esc(r.t)}</h3><div class="muted small">${esc(r.task)}</div></a>`).join("")}</div>
 <h2 class="mt">Аудирование и пересказ</h2><div class="grid g3 mt">${TEXTS.map((t,i)=>t.med?`<a class="card" href="#listening" onclick="LT=${i};LMODE='q';LSHOW=false;QS['L-'+${i}]=null;"><span class="chip lv lv${t.lvl}">${t.lvl}</span><h3 style="margin-top:10px">${esc(t.t)}</h3></a>`:"").join("")}</div>
 <h2 class="mt">Каналы</h2><div class="grid g3 mt">${CHANNELS.filter(c=>c.tag==="Медицина").map(chCard).join("")}</div>`;
function medSys(i){const r=MEDSPEAK[i];return `ROLEPLAY. ${r.role} The learner plays the doctor/student (Russian, ~B1-B2 English). Stay in character, reply in 1-3 sentences, natural spoken English. Do not correct her during the roleplay. Start by greeting her in character if she just says hello.`;}

// ----- VIDEOS -----
function chCard(c){return `<a class="card" href="${c.u}" target="_blank" rel="noopener"><div class="row between"><h3>${esc(c.n)}</h3><span class="chip">${esc(c.tag)}</span></div><div class="muted small">${esc(c.d)}</div></a>`;}
const yq=s=>"https://www.youtube.com/results?search_query="+encodeURIComponent(s);
VIEWS.videos=()=>`<h1>Видео</h1><p class="muted prose">Каналы и ролики к каждой теме. Ссылки открываются на YouTube в новой вкладке. Совет: смотрите с английскими субтитрами, выписывайте 5 новых фраз.</p>
 <h2 class="mt">Каналы</h2><div class="grid g3 mt">${CHANNELS.map(chCard).join("")}</div>
 <h2 class="mt">Видео к темам грамматики</h2><div class="card mt tw"><table class="vtable small">${GRAMMAR.map(g=>`<tr><td><span class="chip lv lv${g.lvl}">${g.lvl}</span> <a href="#${g.id}">${esc(g.t)}</a></td><td><a target="_blank" rel="noopener" href="${yq("engvid "+g.yt)}">engVid</a> · <a target="_blank" rel="noopener" href="${yq("bbc learning english "+g.yt)}">BBC</a> · <a target="_blank" rel="noopener" href="${yq(g.yt+" explained")}">Поиск</a></td></tr>`).join("")}</table></div>
 <h2 class="mt">Видео к темам лексики</h2><div class="card mt tw"><table class="vtable small">${VOCAB.map(v=>`<tr><td><span class="chip lv lv${v.lvl}">${v.lvl}</span> <a href="#${v.id}">${esc(v.t)}</a> ${v.med?'<span class="chip med">мед</span>':""}</td><td>${v.med?`<a target="_blank" rel="noopener" href="${yq("osmosis "+v.yt)}">Osmosis</a> · <a target="_blank" rel="noopener" href="${yq("ninja nerd "+v.yt)}">Ninja Nerd</a> · <a target="_blank" rel="noopener" href="${yq("geeky medics "+v.yt)}">Geeky Medics</a>`:`<a target="_blank" rel="noopener" href="${yq("english with lucy "+v.yt)}">Lucy</a> · <a target="_blank" rel="noopener" href="${yq("bbc learning english "+v.yt)}">BBC</a> · <a target="_blank" rel="noopener" href="${yq(v.yt)}">Поиск</a>`}</td></tr>`).join("")}</table></div>
 <h2 class="mt">IELTS по частям</h2><div class="grid g4 mt">${[["Listening","ielts listening tips general training"],["Reading GT","ielts general training reading tips"],["Writing Task 1 GT","ielts general training letter writing"],["Writing Task 2","ielts writing task 2 band 7 structure"],["Speaking Part 1","ielts speaking part 1 band 7 answers"],["Speaking Part 2","ielts speaking part 2 cue card tips"],["Speaking Part 3","ielts speaking part 3 how to answer"],["Computer IELTS","computer delivered ielts walkthrough"]].map(([n,q])=>`<a class="card" target="_blank" rel="noopener" href="${yq(q)}"><h3>${n}</h3><div class="muted small">открыть подборку</div></a>`).join("")}</div>`;

// ----- TIPS / MISTAKES / PROGRESS -----
VIEWS.tips=()=>`<h1>Методички</h1><p class="muted prose">Короткие шпаргалки по формату и стратегиям IELTS General Training (компьютерный формат).</p><div class="grid g2 mt">${TIPS.map(t=>`<div class="card"><h3>${esc(t.t)}</h3><div class="small prose">${t.b}</div></div>`).join("")}</div>`;
VIEWS.mistakes=()=>`<h1>Тетрадь ошибок</h1><p class="muted">${S.mistakes.length} записей. Повторяйте их в начале занятия.</p>
 <div class="row mt">${AI&&S.mistakes.length?`<button class="btn pri" onclick="mistakeAI()">Разобрать мои ошибки с ИИ</button>`:""}${S.mistakes.length?`<button class="btn" onclick="S.mistakes=[];save();route()">Очистить</button>`:""}</div><div id="mkOut" class="mt"></div>
 <div class="card mt tw"><table class="vtable small">${S.mistakes.map(m=>`<tr><td class="muted">${m.d}</td><td>${esc(m.q)}<div><b style="color:var(--good)">${esc(m.right)}</b> <span class="muted">· ${esc(m.src||"")}</span></div></td></tr>`).join("")||"<tr><td>Ошибок пока нет.</td></tr>"}</table></div>`;
async function mistakeAI(){const out=$("#mkOut");const list=S.mistakes.slice(0,25).map(m=>`- ${m.q} → correct: ${m.right} (${m.src})`).join("\n");
  try{await ask(`These are a Russian learner's recent English mistakes (question → correct answer):\n${list}\nIn Russian: group them into 3-4 patterns, explain each pattern simply, and give 6 new practice sentences (with answers hidden at the end under "### Ответы").`,x=>out.innerHTML=`<div class="ai-out">${md(x)}</div>`);}catch(e){out.innerHTML=errBox(e);}}
VIEWS.progress=()=>{const e=estimate();const days=[...Array(14)].map((_,i)=>{const d=new Date(Date.now()-(13-i)*DAY).toISOString().slice(0,10);return [d,Math.round(S.minutes[d]||0)];});const mx=Math.max(30,...days.map(d=>d[1]));
  return `<h1>Прогресс</h1><div class="grid g4 mt">${[["Listening","L"],["Reading","R"],["Writing","W"],["Speaking","S"]].map(([n,k])=>`<div class="card tile"><span class="muted small">${n}</span><span class="num">${e[k].toFixed(1)}</span><span class="small ${e.real[k]?"":"muted"}">${e.real[k]?"по вашим результатам":"оценка по уровню"}</span><div class="bar"><i style="width:${Math.min(100,e[k]/9*100)}%;background:${e[k]>=6.5?"var(--good)":"var(--accent)"}"></i></div></div>`).join("")}</div>
  <div class="card mt"><div class="row between"><h3>Минуты занятий, 14 дней</h3><span class="muted small">цель 20–30 мин/день</span></div>
  <div style="display:flex;align-items:flex-end;gap:6px;height:140px;margin-top:14px;border-bottom:1px solid var(--line);position:relative">
  <div style="position:absolute;left:0;right:0;bottom:${25/mx*100}%;border-top:1px dashed var(--muted);opacity:.5"></div>
  ${days.map(([d,m])=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%" title="${d}: ${m} мин"><span class="small muted" style="font-variant-numeric:tabular-nums">${m||""}</span><div style="width:100%;max-width:28px;height:${m/mx*100}%;background:${m>=20?"var(--good)":"var(--accent)"};border-radius:6px 6px 0 0;min-height:${m?3:0}px"></div></div>`).join("")}</div>
  <div style="display:flex;gap:6px" class="small muted">${days.map(([d])=>`<span style="flex:1;text-align:center">${d.slice(8)}</span>`).join("")}</div></div>
  <h2 class="mt">Уровни</h2><div class="levelmap mt">${LEVELS.map(lv=>{const s=lvlStats(lv);return `<a href="#lv-${lv}" class="lvbox lv${lv}"><b style="font-family:var(--f-display)">${lv}</b><div class="bar"><i style="width:${s.pct}%"></i></div><span class="small">${s.pct}% · слов ${s.lw}/${s.tw}</span></a>`}).join("")}</div>
  <div class="grid g2 mt"><div class="card"><h3>Входной тест</h3><p class="small muted">${S.placed?`Пройден ${S.placed.d}, уровень ${S.placed.lv}`:"Ещё не пройден"}</p><a class="btn sm" href="#test" onclick="PT={i:0,a:[]}">${S.placed?"Пройти снова":"Пройти"}</a></div>
  <div class="card"><h3>Резервная копия</h3><p class="small muted">Прогресс сохраняется автоматически${DBDOC?" в вашем аккаунте и":""} в этом браузере. Копию можно сохранить себе.</p><div class="row"><button class="btn sm" onclick="navigator.clipboard.writeText(JSON.stringify(S)).then(()=>toast('Скопировано'),()=>toast('Не удалось скопировать'))">Скопировать прогресс</button><button class="btn sm" onclick="$('#imp').classList.toggle('hide')">Восстановить</button></div>
  <div id="imp" class="hide mt stack"><textarea id="impT" style="min-height:80px" placeholder="Вставьте скопированный прогресс"></textarea><button class="btn sm pri" onclick="try{S=Object.assign(JSON.parse(JSON.stringify(DEF)),JSON.parse($('#impT').value));save();toast('Восстановлено');route()}catch(e){toast('Неверный формат')}">Восстановить</button></div></div></div>`;};

// ----- ASSISTANT drawer -----
let AMSG=[];
const ASYS="You are an AI English tutor inside a personal IELTS General Training prep platform. The learner is a Russian woman, ~B1, target IELTS 6.5, wants fluent speaking and to understand medical topics (she studies medicine). Answer in Russian unless asked otherwise; keep English examples in English. Be concise and practical: rules with 2-3 examples, corrections as wrong → correct. If she pastes an essay, assess it by the 4 IELTS criteria with band scores.";
function openAssist(prefill){$("#drawer").classList.add("open");renderAssist();if(prefill){$("#aIn").value=prefill;assistSend();}}
function renderAssist(){$("#quick").innerHTML=AI?["Объясни разницу Present Perfect и Past Simple","Переведи и объясни: «у меня болит горло»","Проверь моё предложение: ","Дай 10 слов по кардиологии","Как перефразировать вопрос в эссе?"].map(q=>`<button class="btn sm" onclick='$("#aIn").value=${JSON.stringify(q)};$("#aIn").focus()'>${esc(q)}</button>`).join(""):noAI();
  $("#aChat").innerHTML=AMSG.map(m=>`<div class="msg ${m.role==="user"?"me":"ai"}">${m.role==="user"?esc(m.content):md(m.content)}</div>`).join("")||`<div class="muted small">Спросите что угодно: правило, перевод, проверка текста, медицинский термин. Можно надиктовать голосом.</div>`;
  $("#aMic").style.display=DICT?"":"none";}
async function assistSend(){const v=$("#aIn").value.trim();if(!v||!AI)return;if(MIC.state==="listening")await micStop();AMSG.push({role:"user",content:v});$("#aIn").value="";renderAssist();
  const box=$("#aChat");box.insertAdjacentHTML("beforeend",`<div class="msg ai" id="apend">…</div>`);const bd=$("#drawer .bd");bd.scrollTop=1e6;
  const msgs=AMSG.slice(-12).map((m,i)=>i===0?{role:m.role,content:"[Instructions: "+ASYS+"]\n\n"+m.content}:m);if(msgs[0].role!=="user")msgs.shift();
  try{const r=await AI(msgs,{cache:false,onText:({text})=>{const p=$("#apend");if(p)p.innerHTML=md(text);bd.scrollTop=1e6;}});AMSG.push({role:"assistant",content:r.text});}
  catch(e){AMSG.push({role:"assistant",content:"Ошибка: "+(e.message||e.code)});}renderAssist();bd.scrollTop=1e6;}
$("#fab").onclick=()=>openAssist();$("#drawerClose").onclick=()=>$("#drawer").classList.remove("open");$("#aSend").onclick=assistSend;
$("#aIn").addEventListener("keydown",e=>{if(e.key==="Enter")assistSend();});
$("#aMic").onclick=()=>{if(MIC.state==="listening"){micStop();return;}const inp=$("#aIn");let base=inp.value;micStart(f=>{base=(base?base+" ":"")+f;inp.value=base;},p=>inp.value=(base?base+" ":"")+p,st=>$("#aMic").textContent=st==="listening"?"■":"🎙");};
addEventListener("keydown",e=>{if(e.key==="Escape")$("#drawer").classList.remove("open");});

