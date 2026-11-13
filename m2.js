// WRITING prompts (GT)
const WRITING = {
t1:[
{type:"Formal",t:"You recently bought a piece of medical equipment online, but it arrived damaged. Write a letter to the company. In your letter: describe what you bought; explain what the problem is; say what you would like the company to do."},
{type:"Formal",t:"You want to do a short summer course at a British university. Write a letter to the course administrator. In your letter: say which course you are interested in; explain why you want to do it; ask about accommodation and fees."},
{type:"Semi-formal",t:"Your neighbour's dog barks every night and keeps your child awake. Write a letter to your neighbour. In your letter: explain the situation; describe how it affects your family; suggest a solution."},
{type:"Informal",t:"A friend from abroad is coming to visit your city. Write a letter to your friend. In your letter: suggest the best time to come; describe places you will visit together; tell them what to bring."},
{type:"Formal",t:"You recently stayed in a hotel and left a valuable item in your room. Write a letter to the hotel manager. In your letter: give details of your stay; describe the item; say what you want the manager to do."},
{type:"Semi-formal",t:"You work part-time and want to change your working hours. Write a letter to your manager. In your letter: explain why you want to change; say what hours you would prefer; explain how this will not affect your work."},
{type:"Informal",t:"You have just passed an important exam. Write a letter to an English-speaking friend. In your letter: tell them about the exam; explain how you prepared; invite them to a celebration."},
{type:"Formal",t:"You attended a medical conference and were disappointed with the organisation. Write a letter to the organisers. In your letter: say which event you attended; describe the problems; suggest improvements."},
{type:"Informal",t:"A friend wants to start learning English and has asked for your advice. Write a letter to your friend. In your letter: describe how you learn English; recommend some resources; give advice about motivation."},
{type:"Formal",t:"You saw an advertisement for a part-time job as a medical interpreter. Write a letter of application. In your letter: explain why you are writing; describe your relevant experience and skills; say when you are available for an interview."},
{type:"Semi-formal",t:"You are unhappy with the cleanliness of the local park where you walk your dog. Write a letter to the local council. In your letter: describe the problem; explain why it matters; suggest what the council should do."},
{type:"Informal",t:"You recently got a puppy. Write a letter to a friend. In your letter: describe the puppy; explain how your life has changed; ask for advice about training."}
],
t2:[
{type:"Opinion",t:"Some people believe that healthcare should be completely free for everyone, while others think people should pay for it. Discuss both views and give your own opinion."},
{type:"Opinion",t:"In many countries, people are living longer than ever before. Is this a positive or negative development?"},
{type:"Problem/Solution",t:"Obesity among children is increasing in many countries. What are the causes of this problem, and what measures could be taken to solve it?"},
{type:"Opinion",t:"Some people think that the best way to improve public health is to increase the number of sports facilities. Others think other measures are needed. Discuss both views and give your opinion."},
{type:"Advantages/Disadvantages",t:"More and more people are working from home. Do the advantages of this outweigh the disadvantages?"},
{type:"Opinion",t:"Governments should spend more money on preventing illnesses than on treating them. To what extent do you agree or disagree?"},
{type:"Problem/Solution",t:"Many people today suffer from stress. What are the causes, and how can this problem be reduced?"},
{type:"Opinion",t:"Some people say that children should learn a foreign language from primary school. Others say it should start at secondary school. Discuss both views and give your opinion."},
{type:"Two-part",t:"Nowadays, many people search for medical information online instead of visiting a doctor. Why is this happening? Is it a positive or negative trend?"},
{type:"Opinion",t:"Smoking should be completely banned in all public places. To what extent do you agree?"},
{type:"Advantages/Disadvantages",t:"Technology is increasingly being used in medicine, for example artificial intelligence to diagnose diseases. Do the advantages outweigh the disadvantages?"},
{type:"Opinion",t:"Some people believe that university education should be free. Others think students should pay. Discuss both views and give your opinion."},
{type:"Problem/Solution",t:"In many cities, air pollution is a serious problem. What are the causes and what can be done about it?"},
{type:"Two-part",t:"More people are choosing to move from rural areas to big cities. Why is this happening? What problems does it cause?"},
{type:"Opinion",t:"Doctors and nurses should be paid more than other professions because their work is more important. To what extent do you agree?"}
]};

// READING passages
const READING = [
{lvl:"B1",type:"GT Section 1 — объявление",t:"Riverside Health Centre — Opening Hours",txt:`<p><b>Riverside Health Centre</b> is open Monday to Friday from 8 a.m. to 6.30 p.m. On Saturdays, the centre is open from 9 a.m. to 12 noon for urgent appointments only. The centre is closed on Sundays and public holidays.</p><p>To book an appointment, call 020 7946 0321 or use our online booking system. Routine appointments can be booked up to four weeks in advance. Please arrive ten minutes before your appointment time. If you are more than 15 minutes late, you may be asked to rebook.</p><p>Repeat prescriptions should be requested at least 48 hours before you need them. Requests can be made online or by placing the form in the box at reception. We do not accept prescription requests by phone.</p><p>Outside opening hours, call 111 for medical advice. In an emergency, always call 999.</p>`,
q:[{type:"tfng",s:"The centre is open every Saturday morning for all types of appointments.",a:"FALSE"},{type:"tfng",s:"Routine appointments can be booked a month in advance.",a:"TRUE"},{type:"tfng",s:"Patients who are 10 minutes late will have to rebook.",a:"FALSE"},{type:"tfng",s:"Prescription requests can be made by telephone.",a:"FALSE"},{type:"tfng",s:"The centre has a pharmacy on site.",a:"NOT GIVEN"},{type:"gap",s:"Repeat prescriptions need at least ___ hours' notice.",a:"48"},{type:"gap",s:"For medical advice outside opening hours, call ___.",a:"111"}]},
{lvl:"B2",type:"GT Section 2 — рабочий документ",t:"New Staff Induction: Infection Control",txt:`<p>All new members of staff must complete infection control training within their first week of employment. The training consists of a two-hour online module followed by a practical session on the ward.</p><p><b>Hand hygiene</b> is the single most important way to prevent the spread of infection. Staff must clean their hands before and after every patient contact, after removing gloves and after touching patient surroundings. Alcohol-based gel is suitable in most situations; however, hands must be washed with soap and water if they are visibly dirty or after caring for patients with diarrhoea.</p><p><b>Personal protective equipment (PPE)</b> such as gloves and aprons should be worn when there is a risk of contact with bodily fluids. PPE is single-use and must be disposed of in the correct waste bin immediately after use. Masks are only required in specific clinical areas or when instructed by the infection control team.</p><p>Any staff member who develops symptoms of vomiting or diarrhoea must not return to work until 48 hours after their symptoms have stopped.</p>`,
q:[{type:"tfng",s:"Infection control training must be completed within the first month.",a:"FALSE"},{type:"tfng",s:"Alcohol gel can be used in most situations.",a:"TRUE"},{type:"tfng",s:"Masks must be worn in all areas of the hospital.",a:"FALSE"},{type:"tfng",s:"The online module is available in several languages.",a:"NOT GIVEN"},{type:"gap",s:"The training includes an online module and a ___ session.",a:"practical"},{type:"gap",s:"Hands must be washed with soap and water if they are visibly ___.",a:"dirty"},{type:"gap",s:"Staff with vomiting must wait ___ hours after symptoms stop.",a:"48"}]}
];

// YouTube channels
const CHANNELS = [
{n:"BBC Learning English",d:"Грамматика, лексика, произношение, новости простым языком",u:"https://www.youtube.com/@bbclearningenglish",tag:"Общий"},
{n:"engVid",d:"Сотни уроков от разных преподавателей по всем темам",u:"https://www.youtube.com/@engvidenglish",tag:"Грамматика"},
{n:"English with Lucy",d:"Британский английский, лексика, произношение",u:"https://www.youtube.com/@EnglishwithLucy",tag:"Лексика"},
{n:"mmmEnglish",d:"Разговорный английский, грамматика, произношение",u:"https://www.youtube.com/@mmmEnglish_Emma",tag:"Speaking"},
{n:"IELTS Liz",d:"Стратегии всех частей IELTS, разборы ответов",u:"https://www.youtube.com/@ieltsliz",tag:"IELTS"},
{n:"E2 IELTS",d:"Подробные разборы заданий IELTS, включая General",u:"https://www.youtube.com/@E2IELTS",tag:"IELTS"},
{n:"IELTS Advantage",d:"Writing Task 2, структура эссе, band 7+",u:"https://www.youtube.com/@IELTSAdvantage",tag:"IELTS"},
{n:"Rachel's English",d:"Произношение американского английского",u:"https://www.youtube.com/@rachelsenglish",tag:"Произношение"},
{n:"Learn English with TV Series",d:"Лексика и аудирование по сериалам",u:"https://www.youtube.com/@LearnEnglishWithTVSeries",tag:"Аудирование"},
{n:"Osmosis from Elsevier",d:"Медицина: анатомия, физиология, болезни — коротко и наглядно",u:"https://www.youtube.com/@osmosis",tag:"Медицина"},
{n:"Ninja Nerd",d:"Подробные лекции по физиологии, биохимии, фармакологии",u:"https://www.youtube.com/@NinjaNerdScience",tag:"Медицина"},
{n:"Armando Hasudungan",d:"Медицина в рисунках: биохимия, микробиология",u:"https://www.youtube.com/@ArmandoHasudungan",tag:"Медицина"},
{n:"Geeky Medics",d:"Сбор анамнеза, осмотр, коммуникация с пациентом (OSCE)",u:"https://www.youtube.com/@geekymedics",tag:"Медицина"},
{n:"TED-Ed",d:"Короткие анимированные лекции на научные темы",u:"https://www.youtube.com/@TEDEd",tag:"Аудирование"}
];

// STRATEGIES
const TIPS = [
{t:"Формат экзамена (компьютерный GT)",b:`<p><b>Listening</b> — 30 мин, 4 части, 40 вопросов; на компьютере ответы вводятся сразу, в конце 2 минуты на проверку.</p><p><b>Reading GT</b> — 60 мин, 3 секции, 40 вопросов: 1 — бытовые тексты, 2 — рабочие документы, 3 — длинный текст общего характера.</p><p><b>Writing GT</b> — 60 мин: Task 1 — письмо 150+ слов (≈20 мин), Task 2 — эссе 250+ слов (≈40 мин; весит вдвое больше).</p><p><b>Speaking</b> — 11–14 мин, живой экзаменатор: Part 1 (вопросы о себе), Part 2 (монолог 2 мин, 1 мин подготовки), Part 3 (дискуссия).</p>`},
{t:"Listening: стратегии",b:`<ul><li>Читайте вопросы заранее и подчёркивайте ключевые слова.</li><li>Предсказывайте тип ответа: число, имя, существительное?</li><li>Следите за синонимами — в записи слова почти никогда не совпадают с вопросом.</li><li>Ловушки: говорящий сначала называет один ответ, потом исправляется.</li><li>Проверяйте лимит слов (NO MORE THAN TWO WORDS) и орфографию.</li></ul>`},
{t:"Reading: True / False / Not Given",b:`<ul><li><b>TRUE</b> — текст говорит то же самое (другими словами).</li><li><b>FALSE</b> — текст говорит противоположное.</li><li><b>NOT GIVEN</b> — информации нет или её нельзя проверить.</li><li>Не используйте собственные знания — только текст!</li><li>Ответы идут по порядку текста.</li></ul>`},
{t:"Writing Task 1: структура письма",b:`<ol><li>Обращение (Dear Sir or Madam / Dear Mr Smith / Hi Kate).</li><li>Цель письма в 1–2 предложениях.</li><li>Три абзаца — по каждому пункту задания.</li><li>Заключительная фраза (I look forward to hearing from you).</li><li>Подпись (Yours faithfully / sincerely / Best wishes).</li></ol><p>Определите тон по тому, кому пишете, и держите его во всём письме.</p>`},
{t:"Writing Task 2: структура эссе",b:`<ol><li><b>Введение</b> (2 предложения): перефраз темы + ваша позиция.</li><li><b>Абзац 1</b>: главная идея → объяснение → пример.</li><li><b>Абзац 2</b>: вторая идея → объяснение → пример.</li><li><b>Заключение</b>: повтор позиции другими словами.</li></ol><p>Критерии: Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy — по 25%.</p>`},
{t:"Speaking: как говорить свободно",b:`<ul><li>Расширяйте ответы: ответ → причина → пример (Part 1: 2–3 предложения).</li><li>Используйте филлеры вместо пауз: <i>Well, let me think… That's an interesting question…</i></li><li>Не заучивайте ответы — экзаменатор это слышит.</li><li>Part 2: за минуту запишите 4–5 ключевых слов, не предложения.</li><li>Ошиблись — просто исправьтесь и продолжайте.</li><li>Беглость важнее идеальной грамматики: Fluency & Coherence = 25%.</li></ul>`},
{t:"Что значит 6.5",b:`<p>Overall — среднее по 4 навыкам, округляется до 0.5. Например, L 7.0, R 6.5, W 6.0, S 6.5 → 6.5.</p><p>Listening/Reading GT: примерно 6.5 ≈ 30/40 в Listening и ≈ 34/40 в Reading GT (у GT порог по Reading выше, чем у Academic).</p><p>Writing/Speaking 6.5 означает: в основном чёткая структура, достаточный словарный запас с попытками использовать менее распространённую лексику, смесь простых и сложных предложений, ошибки не мешают пониманию.</p>`}
];
