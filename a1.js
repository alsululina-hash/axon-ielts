// ===== CORE =====
const LEVELS=["A1","A2","B1","B2","C1"];
const BAND={A1:2.5,A2:3.5,B1:4.5,B2:6.0,C1:7.5};
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const today=()=>new Date().toISOString().slice(0,10);
const DAY=86400000;
VOCAB.forEach(v=>{v.words=v.w.trim().split("\n").map(l=>{const [en,ru,ex]=l.split("|");return {en:en.trim(),ru:(ru||"").trim(),ex:(ex||"").trim()}});});
const ALLTOPICS={}; GRAMMAR.forEach(g=>ALLTOPICS[g.id]={...g,kind:"g"}); VOCAB.forEach(v=>ALLTOPICS[v.id]={...v,kind:"v"});

// ----- state -----
const DEF={xw:{},level:"B1",placed:null,done:{},srs:{},mistakes:[],days:{},minutes:{},essays:[],speaks:[],quiz:{L:[],R:[]},plan:{},drafts:{},ts:0};
let S=JSON.parse(JSON.stringify(DEF));
const LS="axon-ielts-v1";
function loadLocal(){try{const r=localStorage.getItem(LS);if(r)S=Object.assign(JSON.parse(JSON.stringify(DEF)),JSON.parse(r));}catch(e){}}
let saveT=null,DB=null,DBDOC=null;
function save(){S.ts=Date.now();try{localStorage.setItem(LS,JSON.stringify(S));}catch(e){}
  clearTimeout(saveT);saveT=setTimeout(()=>{if(DBDOC){DBDOC.set({json:JSON.stringify(S),ts:S.ts}).catch(()=>{});}},1500);}
loadLocal();
function mergeXW(){Object.entries(S.xw||{}).forEach(([id,arr])=>{const t=VOCAB.find(v=>v.id===id);if(!t)return;arr.forEach(w=>{if(!t.words.some(x=>x.en.toLowerCase()===w.en.toLowerCase()))t.words.push(w);});ALLTOPICS[id]&&(ALLTOPICS[id].words=t.words);});}
mergeXW();

// ----- capabilities -----
let AI=null,DICT=null,TTS=null;
function cap(name){try{return (window.claude&&window.claude.use)?window.claude.use(name):Promise.resolve(null);}catch(e){return Promise.resolve(null);}}
cap("sample").then(x=>{AI=x;rerenderSoft();});
cap("dictation").then(x=>{DICT=x;if(DICT){DICT.onPartial(({text})=>MIC.partial&&MIC.partial(text));DICT.onFinal(({text})=>MIC.final&&MIC.final(text));DICT.onState(({state})=>{MIC.state=state;MIC.onstate&&MIC.onstate(state);});}rerenderSoft();});
cap("tts").then(x=>{TTS=x;rerenderSoft();});
Promise.all([cap("db"),cap("user")]).then(async([db,user])=>{
  if(!db||!user)return; try{const id=await user.id();DB=db;DBDOC=db.collection("data/users/"+id).doc("state");
    const t=setTimeout(()=>{},10000);const snap=await DBDOC.get();clearTimeout(t);
    const d=snap&&(snap.data?snap.data():snap);
    if(d&&d.json&&d.ts>(S.ts||0)){S=Object.assign(JSON.parse(JSON.stringify(DEF)),JSON.parse(d.json));try{localStorage.setItem(LS,JSON.stringify(S));}catch(e){};route();}
    else if(S.ts){DBDOC.set({json:JSON.stringify(S),ts:S.ts}).catch(()=>{});}
  }catch(e){}
});
let softT=null;function rerenderSoft(){clearTimeout(softT);softT=setTimeout(()=>{if(!document.activeElement||!/TEXTAREA|INPUT/.test(document.activeElement.tagName))route("cap");},300);}

// ----- speech -----
function say(text,rate){if(!TTS)return;TTS.speak(String(text).slice(0,2000),{language:"en",rate:rate||S.rate||1}).catch(()=>{});}
function sayBtn(text){return TTS?`<button class="icon" title="Озвучить" onclick='say(${JSON.stringify(text)})'>🔊</button>`:"";}
const MIC={state:"idle",partial:null,final:null,onstate:null};
function micStart(onFinal,onPartial,onState){if(!DICT)return false;MIC.final=onFinal;MIC.partial=onPartial;MIC.onstate=onState;
  DICT.start().catch(e=>{if(e&&e.code==="not_granted")toast("Доступ к микрофону не дан — можно печатать ответ.");onState&&onState("idle");});return true;}
function micStop(){if(DICT)return DICT.stop().catch(()=>{});return Promise.resolve();}

// ----- AI helpers -----
function noAI(){return `<div class="notice">ИИ-функции работают, когда платформа открыта в Claude (в браузере или приложении). Сейчас они недоступны.</div>`;}
async function ask(prompt,onText,tier){if(!AI)throw new Error("noai");
  try{const r=await AI(prompt,{onText:onText?({text})=>onText(text):undefined,modelTier:tier||"default"});return r.text;}
  catch(e){if(e&&e.code==="rate_limited")throw new Error("Слишком много запросов — подождите минуту.");if(e&&e.code==="not_granted")throw new Error("Доступ к ИИ не разрешён.");throw e;}}
async function askJSON(prompt,tier){if(!AI)throw new Error("noai");
  const full=prompt+"\n\nReturn ONLY valid JSON, no markdown fences, no commentary.";
  try{if(AI.json){return await AI.json(full,{modelTier:tier||"default"});}}catch(e){if(e&&(e.code==="rate_limited"||e.code==="not_granted"))throw e;}
  const t=await ask(full,null,tier);const m=t.match(/[\[{][\s\S]*[\]}]/);return JSON.parse(m?m[0]:t);}
function md(t){let h=esc(t);
  h=h.replace(/^#{1,4}\s*(.+)$/gm,"<h4>$1</h4>").replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/(^|\s)\*(\S[^*]*?)\*(?=\s|$|[.,!?])/g,"$1<i>$2</i>");
  h=h.replace(/(^|\n)((?:\s*[-•]\s.+(?:\n|$))+)/g,(m,a,b)=>a+"<ul>"+b.trim().split("\n").map(l=>"<li>"+l.replace(/^\s*[-•]\s/,"")+"</li>").join("")+"</ul>");
  return h.replace(/\n{2,}/g,"<br><br>").replace(/\n/g,"<br>");}
function toast(m){const d=document.createElement("div");d.textContent=m;d.style.cssText="position:fixed;left:50%;bottom:84px;transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:10px 16px;border-radius:10px;z-index:60;max-width:90%";document.body.appendChild(d);setTimeout(()=>d.remove(),3200);}

// ----- activity / time -----
let lastAct=Date.now();["click","keydown","scroll","touchstart"].forEach(e=>addEventListener(e,()=>lastAct=Date.now(),{passive:true}));
setInterval(()=>{if(document.visibilityState==="visible"&&Date.now()-lastAct<60000){const d=today();S.minutes[d]=(S.minutes[d]||0)+0.5;S.days[d]=1;save();}},30000);
function streak(){let n=0,d=new Date();const has=x=>S.days[x.toISOString().slice(0,10)];if(!has(d))d=new Date(Date.now()-DAY);let miss=0;
  for(let i=0;i<400;i++){if(has(d)){n++;miss=0;}else{miss++;if(miss>1)break;}d=new Date(d-DAY);}return n;}
function weekMin(){let s=0;for(let i=0;i<7;i++){s+=S.minutes[new Date(Date.now()-i*DAY).toISOString().slice(0,10)]||0;}return Math.round(s);}

// ----- mistakes & results -----
function addMistake(q,right,src){S.mistakes.unshift({q,right,src,d:today()});S.mistakes=S.mistakes.slice(0,300);save();}
function setDone(id,score){const p=S.done[id];if(!p||score>=p)S.done[id]=score;save();}
function markPlan(k){S.plan[today()]=S.plan[today()]||{};S.plan[today()][k]=1;S.days[today()]=1;save();}

// ----- SRS (SM-2) -----
const key=(tid,en)=>tid+"::"+en;
function srsAdd(tid,list){let n=0;list.forEach(w=>{const k=key(tid,w.en);if(!S.srs[k]){S.srs[k]={i:0,e:2.5,d:Date.now(),n:0};n++;}});save();return n;}
function srsDue(){const now=Date.now();return Object.entries(S.srs).filter(([k,v])=>v.d<=now).map(([k])=>k);}
function srsGrade(k,g){const c=S.srs[k];if(!c)return;if(g<3){c.n=0;c.i=0;c.d=Date.now()+10*60000;}
  else{c.n++;c.i=c.n===1?1:c.n===2?3:Math.round(c.i*c.e*(g===3?0.85:g===5?1.3:1));c.e=Math.max(1.3,c.e+(0.1-(5-g)*(0.08+(5-g)*0.02)));c.d=Date.now()+c.i*DAY;}save();}
function wordByKey(k){const [tid,en]=k.split("::");const t=ALLTOPICS[tid];const w=t&&t.words.find(x=>x.en===en);return w?{...w,tid,tt:t.t}:null;}
const learned=()=>Object.values(S.srs).filter(v=>v.i>=3).length;

// ----- band estimate -----
function estimate(){const base=BAND[S.level];const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;
  const lq=avg(S.quiz.L.slice(-5)),rq=avg(S.quiz.R.slice(-5));
  const fromPct=p=>p==null?null:Math.min(9,Math.max(2,base-1+p*2.5));
  const w=avg(S.essays.slice(-3).map(e=>e.band).filter(Boolean)),s=avg(S.speaks.slice(-3).map(e=>e.band).filter(Boolean));
  const r5=x=>Math.round(x*2)/2;const L=r5(fromPct(lq)??base),R=r5(fromPct(rq)??base),W=r5(w??base-0.5),Sp=r5(s??base);
  return {L,R,W,S:Sp,O:r5((L+R+W+Sp)/4),real:{L:lq!=null,R:rq!=null,W:w!=null,S:s!=null}};}

// ----- YouTube links -----
function ytLinks(q,kind){const enc=x=>"https://www.youtube.com/results?search_query="+encodeURIComponent(x);
  const arr=kind==="med"?[["Osmosis",`osmosis ${q}`],["Ninja Nerd",`ninja nerd ${q}`],["Поиск на YouTube",q]]
   :kind==="v"?[["English with Lucy",`english with lucy ${q}`],["BBC Learning English",`bbc learning english ${q}`],["Поиск на YouTube",q+" ielts"]]
   :[["engVid",`engvid ${q}`],["BBC Learning English",`bbc learning english ${q}`],["Поиск на YouTube",q+" explained"]];
  return `<div class="yt">${arr.map(([n,s])=>`<a href="${enc(s)}" target="_blank" rel="noopener"><span><b>${esc(n)}</b> · <span class="muted small">${esc(s)}</span></span></a>`).join("")}</div>`;}

// ----- router -----
const NAV=[["home","Главная"],["course","Курс A1–C1"],["grammar","Грамматика"],["vocab","Лексика"],["quiz","Тесты"],["listening","Listening"],["reading","Reading"],["writing","Writing"],["speaking","Speaking"],["medical","Медицина"],["videos","Видео"],["progress","Прогресс"]];
function navHTML(cur){return NAV.map(([h,n])=>`<a href="#${h}" class="${cur===h?"on":""}">${n}</a>`).join("");}
let curView="";
function route(soft){const h=(location.hash||"#home").slice(1);const app=$("#app");
  let sec=h;if(h.startsWith("g-"))sec="grammar";else if(h.startsWith("v-"))sec="vocab";else if(h.startsWith("m-"))sec="medical";
  $("#nav").innerHTML=navHTML(sec);$("#lvlPill").textContent=S.level;
  if(soft==="cap"&&curView===h&&/^(writing|speaking|listening|reading|test|flash)/.test(h))return; // не сбрасывать активную работу
  curView=h;
  const V=VIEWS[h]||(ALLTOPICS[h]?(ALLTOPICS[h].kind==="g"?()=>viewGrammarTopic(h):()=>viewVocabTopic(h)):VIEWS.home);
  app.innerHTML=V();if(!soft)scrollTo(0,0);if(typeof QZ!=="undefined"&&QZ&&document.getElementById("qzbox")&&QZ.page===h)qzRender();if(AFTER){const f=AFTER;AFTER=null;f();}}
let AFTER=null;
addEventListener("hashchange",()=>{if(location.hash==="#flash"&&typeof FQ!=="undefined")FQ=null;route();});
$("#lvlPill").onclick=()=>{const i=LEVELS.indexOf(S.level);S.level=LEVELS[(i+1)%5];save();toast("Текущий уровень: "+S.level);route();};
const VIEWS={};
