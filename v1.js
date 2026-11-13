// VOCAB general. w: "слово|перевод|пример" по строкам
const VOCAB = [
{id:"v-family",lvl:"A1",t:"Семья и люди",yt:"family members vocabulary english",w:`husband|муж|My husband works in IT.
wife|жена|His wife is a teacher.
son|сын|Our son is three years old.
daughter|дочь|She has two daughters.
parents|родители|My parents live in Ufa.
grandmother|бабушка|My grandmother makes great pies.
relative|родственник|We visit our relatives at New Year.
mother-in-law|свекровь / тёща|My mother-in-law is very kind.
twins|близнецы|They are identical twins.
married|замужем / женат|I've been married for five years.
single|не замужем / холост|He is still single.
childhood|детство|I had a happy childhood.
neighbour|сосед|Our neighbour has a dog.
friendly|дружелюбный|The staff are very friendly.
shy|застенчивый|I was shy as a child.
hard-working|трудолюбивый|She is a hard-working student.
look after|заботиться, присматривать|I look after my son in the evenings.
get on with|ладить с|I get on well with my colleagues.
grow up|вырастать|I grew up in a small town.
take after|быть похожим (на родственника)|My son takes after his father.`},

{id:"v-routine",lvl:"A1",t:"Распорядок дня",yt:"daily routine vocabulary english",w:`wake up|просыпаться|I wake up at 6:30.
get up|вставать|I get up straight away.
have a shower|принимать душ|I have a shower every morning.
get dressed|одеваться|I get dressed quickly.
have breakfast|завтракать|We have breakfast together.
commute|добираться на работу/учёбу|My commute takes 40 minutes.
go to bed|ложиться спать|I go to bed at 11.
fall asleep|засыпать|I fall asleep easily.
take a nap|вздремнуть|I sometimes take a nap after lunch.
do the housework|делать работу по дому|We share the housework.
do the washing-up|мыть посуду|My husband does the washing-up.
cook dinner|готовить ужин|I cook dinner at 7.
walk the dog|выгуливать собаку|I walk the dog twice a day.
busy|занятой|Mondays are always busy.
free time|свободное время|I don't have much free time.
schedule|расписание|My schedule is very tight.
on time|вовремя|The train arrived on time.
in a hurry|в спешке|I'm always in a hurry in the morning.
weekday|будний день|On weekdays I study.
weekend|выходные|At the weekend I relax.`},

{id:"v-food",lvl:"A1",t:"Еда и питание",yt:"food vocabulary english",w:`meal|приём пищи|Breakfast is the most important meal.
vegetables|овощи|Eat more vegetables.
fruit|фрукты|I eat fruit every day.
meat|мясо|I don't eat red meat.
dairy products|молочные продукты|Dairy products contain calcium.
wholegrain|цельнозерновой|Choose wholegrain bread.
snack|перекус|Nuts are a healthy snack.
homemade|домашний|I prefer homemade food.
takeaway|еда навынос|We order a takeaway on Fridays.
diet|рацион; диета|A balanced diet is important.
healthy|здоровый, полезный|Fish is healthy.
junk food|вредная еда|Junk food is high in fat.
sugar|сахар|Too much sugar is bad for your teeth.
salty|солёный|This soup is too salty.
spicy|острый|I don't like spicy food.
portion|порция|The portions are huge here.
recipe|рецепт (блюда)|Can you share the recipe?
ingredient|ингредиент|Fresh ingredients matter.
vegetarian|вегетарианец|My friend is vegetarian.
starving|умирающий от голода|I'm starving — let's eat.`},

{id:"v-home",lvl:"A1",t:"Дом и жильё",yt:"house rooms furniture vocabulary",w:`flat|квартира|We live in a two-room flat.
house|дом|They bought a house.
living room|гостиная|The living room is bright.
bedroom|спальня|The bedroom faces south.
kitchen|кухня|The kitchen is small.
bathroom|ванная|The bathroom needs repairs.
balcony|балкон|We have a balcony.
furniture|мебель|We need new furniture.
sofa|диван|The dog sleeps on the sofa.
wardrobe|шкаф для одежды|The wardrobe is full.
floor|этаж; пол|I live on the fifth floor.
rent|аренда; снимать|The rent is high in Moscow.
landlord|арендодатель|The landlord fixed the heating.
spacious|просторный|The flat is spacious.
cosy|уютный|Our home is small but cosy.
noisy|шумный|The street is very noisy.
move house|переезжать|We moved house last year.
neighbourhood|район, округа|It's a quiet neighbourhood.
suburbs|пригород|Many families live in the suburbs.
city centre|центр города|I work in the city centre.`},

{id:"v-shopping",lvl:"A2",t:"Покупки и деньги",yt:"shopping vocabulary english",w:`price|цена|The price is reasonable.
discount|скидка|There's a 20% discount.
receipt|чек|Keep the receipt.
refund|возврат денег|I asked for a refund.
cash|наличные|Do you accept cash?
card|карта|I'll pay by card.
expensive|дорогой|London is expensive.
cheap|дешёвый|It was surprisingly cheap.
afford|позволить себе|I can't afford a new car.
bargain|выгодная покупка|This coat was a real bargain.
on sale|со скидкой, в распродаже|These shoes are on sale.
try on|примерять|Can I try it on?
fit|подходить по размеру|The dress fits perfectly.
suit|идти, быть к лицу|Blue suits you.
budget|бюджет|We're on a tight budget.
save money|копить деньги|I'm saving money for the exam.
spend|тратить|How much do you spend on food?
online shopping|покупки онлайн|Online shopping saves time.
delivery|доставка|Delivery is free.
customer|покупатель, клиент|The customer is always right.`},

{id:"v-travel",lvl:"A2",t:"Путешествия и транспорт",yt:"travel vocabulary english airport",w:`journey|поездка, путь|The journey took five hours.
trip|поездка (короткая)|We went on a trip to Kazan.
flight|рейс, перелёт|My flight was delayed.
departure|отправление|Departure is at 9:15.
arrival|прибытие|Arrival time is 12:00.
boarding pass|посадочный талон|Show your boarding pass.
luggage|багаж|I only have hand luggage.
book|бронировать|I booked a hotel online.
accommodation|жильё (при поездке)|Accommodation is included.
sightseeing|осмотр достопримечательностей|We went sightseeing.
tourist attraction|достопримечательность|The Kremlin is a popular tourist attraction.
abroad|за границей|I've never been abroad.
passport|паспорт|My passport expires next year.
visa|виза|You need a visa for the UK.
public transport|общественный транспорт|Public transport is cheap here.
traffic jam|пробка|We got stuck in a traffic jam.
delay|задержка|Sorry for the delay.
return ticket|билет туда-обратно|A return ticket, please.
destination|пункт назначения|Our destination is London.
get lost|заблудиться|We got lost in the old town.`},

{id:"v-weather",lvl:"A2",t:"Погода и времена года",yt:"weather vocabulary english",w:`sunny|солнечный|It's sunny today.
cloudy|облачный|It was cloudy all day.
rainy|дождливый|Autumn is rainy here.
windy|ветреный|It's too windy to cycle.
foggy|туманный|It's foggy this morning.
freezing|морозный, ледяной|It's freezing outside!
mild|мягкий (о климате)|The winter was mild.
humid|влажный|Summer is hot and humid.
temperature|температура|The temperature dropped.
degree|градус|It's minus ten degrees.
forecast|прогноз|What's the forecast?
shower|кратковременный дождь|Showers are expected.
storm|буря, шторм|A storm hit the coast.
heatwave|аномальная жара|The heatwave lasted a week.
snowfall|снегопад|Heavy snowfall closed the roads.
climate|климат|Russia has a continental climate.
season|время года|Which season do you like?
pour (with rain)|лить (о дожде)|It's pouring with rain.
chilly|прохладный, зябкий|It's a bit chilly tonight.
umbrella|зонт|Don't forget your umbrella.`},

{id:"v-hobbies",lvl:"A2",t:"Хобби и свободное время",yt:"hobbies free time vocabulary",w:`hobby|хобби|My hobby is photography.
take up|начать заниматься|I took up yoga last year.
give up|бросить|I gave up running.
be keen on|увлекаться|I'm keen on cooking.
be into|увлекаться (разг.)|She's into podcasts.
relax|расслабляться|I relax by reading.
spare time|свободное время|What do you do in your spare time?
go hiking|ходить в походы|We go hiking in summer.
board games|настольные игры|We play board games with friends.
gardening|садоводство|My mum loves gardening.
handmade|ручной работы|I sell handmade cards.
outdoor|на открытом воздухе|I prefer outdoor activities.
indoor|в помещении|Chess is an indoor game.
series|сериал|I'm watching a medical series.
podcast|подкаст|I listen to podcasts on the bus.
exhibition|выставка|We went to an art exhibition.
concert|концерт|The concert was amazing.
unwind|расслабиться, отдохнуть|Music helps me unwind.
get into|увлечься|I got into painting during lockdown.
pastime|времяпрепровождение|Reading is my favourite pastime.`},

{id:"v-jobs",lvl:"A2",t:"Профессии",yt:"jobs occupations vocabulary",w:`job|работа (конкретная)|She has a good job.
occupation|род занятий|What's your occupation?
colleague|коллега|My colleagues are friendly.
boss|начальник|My boss is strict.
employee|сотрудник|The company has 50 employees.
employer|работодатель|My employer pays for training.
salary|зарплата (оклад)|The salary is fixed.
full-time|полный рабочий день|I work full-time.
part-time|неполный день|She has a part-time job.
shift|смена|Nurses work night shifts.
apply for|подавать заявку на|I applied for a scholarship.
interview|собеседование|The interview went well.
experience|опыт|Do you have any experience?
skills|навыки|Communication skills are vital.
retire|выходить на пенсию|He retired at 60.
self-employed|самозанятый|I'm self-employed.
lawyer|юрист|My friend is a lawyer.
accountant|бухгалтер|We hired an accountant.
engineer|инженер|He's a software engineer.
pharmacist|фармацевт|Ask the pharmacist.`},

{id:"v-work",lvl:"B1",t:"Работа и карьера",yt:"work career vocabulary ielts",w:`career|карьера|She has a successful career.
promotion|повышение|He got a promotion.
deadline|крайний срок|The deadline is Friday.
workload|нагрузка|My workload is heavy.
meet a deadline|уложиться в срок|We met the deadline.
job satisfaction|удовлетворённость работой|Job satisfaction matters more than money.
work-life balance|баланс работы и жизни|Remote work improves work-life balance.
remote work|удалённая работа|Remote work is popular now.
qualification|квалификация|You need a medical qualification.
be responsible for|отвечать за|I'm responsible for marketing.
in charge of|руководить|She's in charge of the department.
day off|выходной|I took a day off.
sick leave|больничный|He's on sick leave.
burnout|выгорание|Burnout is common among doctors.
career ladder|карьерная лестница|She climbed the career ladder fast.
resign|уволиться (по собств.)|He resigned last month.
fire|уволить|She was fired for being late.
contract|контракт, договор|I signed a one-year contract.
benefits|льготы|The job offers good benefits.
earn a living|зарабатывать на жизнь|It's hard to earn a living as an artist.`},

{id:"v-edu",lvl:"B1",t:"Образование",yt:"education vocabulary ielts",w:`degree|степень (вуз)|She has a degree in biology.
graduate|выпускник; окончить|I'll graduate in 2028.
undergraduate|студент бакалавриата|Undergraduate courses last 4 years.
tuition fees|плата за обучение|Tuition fees are rising.
scholarship|стипендия, грант|She won a scholarship.
lecture|лекция|The lecture was boring.
seminar|семинар|We discuss cases at seminars.
term|семестр, четверть|The term starts in September.
assignment|задание|I submitted the assignment.
revise|повторять (к экзамену)|I'm revising for my exams.
pass an exam|сдать экзамен|I passed the exam.
fail|провалить|He failed chemistry.
retake|пересдавать|I had to retake the test.
curriculum|учебная программа|Anatomy is part of the curriculum.
distance learning|дистанционное обучение|Distance learning is flexible.
literacy|грамотность|Literacy rates are high.
compulsory|обязательный|School is compulsory until 16.
academic performance|успеваемость|Sleep affects academic performance.
lifelong learning|обучение всю жизнь|Doctors need lifelong learning.
tutor|репетитор, наставник|I have an English tutor.`},

{id:"v-health",lvl:"B1",t:"Здоровье и образ жизни",yt:"health lifestyle vocabulary ielts",w:`well-being|благополучие|Exercise improves well-being.
lifestyle|образ жизни|A sedentary lifestyle is harmful.
sedentary|малоподвижный|Office jobs are sedentary.
work out|тренироваться|I work out three times a week.
get in shape|прийти в форму|I want to get in shape.
balanced diet|сбалансированное питание|Eat a balanced diet.
obesity|ожирение|Obesity is a global problem.
stress|стресс|Stress affects sleep.
mental health|психическое здоровье|Mental health matters.
recover|выздоравливать|She recovered quickly.
prevention|профилактика|Prevention is better than cure.
check-up|осмотр (профилактический)|I have a check-up every year.
side effect|побочный эффект|Drowsiness is a side effect.
addiction|зависимость|Smoking is an addiction.
life expectancy|ожидаемая продолжительность жизни|Life expectancy has increased.
fit|в хорошей форме|She's very fit.
quit smoking|бросить курить|He quit smoking last year.
sleep deprivation|недосыпание|Sleep deprivation is dangerous.
immune system|иммунная система|Vitamins support the immune system.
healthcare|здравоохранение|Healthcare should be free.`},

{id:"v-environment",lvl:"B1",t:"Окружающая среда",yt:"environment vocabulary ielts",w:`pollution|загрязнение|Air pollution causes asthma.
climate change|изменение климата|Climate change is a threat.
global warming|глобальное потепление|Global warming melts ice.
greenhouse gases|парниковые газы|Cars emit greenhouse gases.
carbon footprint|углеродный след|Reduce your carbon footprint.
renewable energy|возобновляемая энергия|Solar is renewable energy.
fossil fuels|ископаемое топливо|We depend on fossil fuels.
recycle|перерабатывать|We recycle plastic.
waste|отходы|Food waste is a problem.
endangered species|вымирающие виды|Tigers are an endangered species.
deforestation|вырубка лесов|Deforestation destroys habitats.
habitat|среда обитания|Animals lose their habitats.
sustainable|устойчивый, экологичный|We need sustainable transport.
emissions|выбросы|Emissions must be cut.
eco-friendly|экологичный|Use eco-friendly bags.
natural resources|природные ресурсы|Natural resources are limited.
drought|засуха|The drought ruined crops.
flood|наводнение|Floods are more frequent.
conservation|охрана природы|Wildlife conservation is vital.
single-use plastic|одноразовый пластик|Ban single-use plastic.`},

{id:"v-tech",lvl:"B1",t:"Технологии",yt:"technology vocabulary ielts",w:`device|устройство|Children use devices too much.
gadget|гаджет|He loves new gadgets.
app|приложение|I use an app to learn words.
download|скачивать|Download the file.
artificial intelligence|искусственный интеллект|AI is changing medicine.
social media|соцсети|Teenagers spend hours on social media.
screen time|время у экрана|Limit your screen time.
cutting-edge|передовой|The clinic uses cutting-edge equipment.
user-friendly|удобный в использовании|The website is user-friendly.
data|данные|Patient data must be protected.
privacy|конфиденциальность|Online privacy is a concern.
cyberbullying|кибербуллинг|Cyberbullying harms teens.
innovation|инновация|Innovation drives progress.
breakthrough|прорыв|A breakthrough in cancer research.
automation|автоматизация|Automation replaces jobs.
online|онлайн|I study online.
digital literacy|цифровая грамотность|Older people need digital literacy.
be addicted to|зависеть от|He's addicted to his phone.
keep in touch|поддерживать связь|Social media helps us keep in touch.
obsolete|устаревший|Fax machines are obsolete.`},

{id:"v-media",lvl:"B1",t:"СМИ и реклама",yt:"media advertising vocabulary ielts",w:`news|новости|I read the news online.
headline|заголовок|The headline was shocking.
journalist|журналист|Journalists must check facts.
broadcast|транслировать; передача|The match was broadcast live.
advertisement|реклама (объявление)|The advertisement was misleading.
commercial|рекламный ролик|TV commercials are annoying.
fake news|фейковые новости|Fake news spreads fast.
reliable|надёжный|Is this source reliable?
biased|предвзятый|The article was biased.
influence|влияние; влиять|Media influence public opinion.
influencer|блогер, инфлюенсер|Influencers promote products.
target audience|целевая аудитория|Teens are the target audience.
coverage|освещение (в СМИ)|The event got wide coverage.
subscribe|подписываться|I subscribe to a medical channel.
celebrity|знаменитость|Celebrities advertise cosmetics.
press|пресса|The press criticised the minister.
mislead|вводить в заблуждение|Ads can mislead children.
persuade|убеждать|Ads persuade us to buy.
consumer|потребитель|Consumers want lower prices.
brand|бренд|This brand is popular.`},

{id:"v-society",lvl:"B2",t:"Общество и государство",yt:"society government vocabulary ielts",w:`government|правительство|The government raised taxes.
policy|политика (курс)|We need a new health policy.
taxpayer|налогоплательщик|Taxpayers fund hospitals.
funding|финансирование|Research needs more funding.
inequality|неравенство|Income inequality is growing.
poverty|бедность|Poverty affects health.
the elderly|пожилые люди|The elderly need care.
ageing population|стареющее население|An ageing population strains healthcare.
unemployment|безработица|Unemployment fell.
welfare|соц. обеспечение|The welfare system supports families.
crime rate|уровень преступности|The crime rate decreased.
law enforcement|правоохранительные органы|Law enforcement must be fair.
citizen|гражданин|Every citizen has rights.
community|сообщество|Local communities matter.
volunteer|волонтёр|She volunteers at a hospice.
urbanisation|урбанизация|Urbanisation causes housing shortages.
infrastructure|инфраструктура|Rural areas lack infrastructure.
public services|гос. услуги|Public services are underfunded.
raise awareness|повышать осведомлённость|Campaigns raise awareness of HIV.
tackle|решать (проблему)|We must tackle obesity.`},

{id:"v-economy",lvl:"B2",t:"Экономика и глобализация",yt:"economy globalisation vocabulary ielts",w:`economy|экономика|The economy is growing.
economic growth|экономический рост|Economic growth creates jobs.
globalisation|глобализация|Globalisation connects markets.
multinational|транснациональная корпорация|Multinationals dominate trade.
trade|торговля|International trade increased.
import|импорт; импортировать|Russia imports medical equipment.
export|экспорт|Oil is a major export.
inflation|инфляция|Inflation reduces savings.
income|доход|Average income rose.
cost of living|стоимость жизни|The cost of living is high.
consumerism|потребительство|Consumerism harms the planet.
supply and demand|спрос и предложение|Prices depend on supply and demand.
invest in|инвестировать в|We should invest in education.
developing countries|развивающиеся страны|Developing countries need aid.
outsourcing|аутсорсинг|Outsourcing cuts costs.
standard of living|уровень жизни|The standard of living improved.
labour force|рабочая сила|Women joined the labour force.
small business|малый бизнес|Small businesses need support.
profit|прибыль|Profits doubled.
recession|рецессия, спад|The recession caused job losses.`},

{id:"v-culture",lvl:"B2",t:"Культура и искусство",yt:"culture arts vocabulary ielts",w:`heritage|наследие|Cultural heritage must be preserved.
tradition|традиция|We keep family traditions.
custom|обычай|It's a local custom.
diversity|разнообразие|Cultural diversity enriches society.
identity|идентичность|Language is part of identity.
masterpiece|шедевр|The painting is a masterpiece.
gallery|галерея|The gallery is free on Sundays.
performance|выступление|The performance was moving.
audience|зрители|The audience applauded.
contemporary|современный|I like contemporary art.
fine arts|изобразительное искусство|She studied fine arts.
funding for the arts|финансирование искусства|Funding for the arts was cut.
preserve|сохранять|We must preserve old buildings.
landmark|достопримечательность|The bridge is a city landmark.
folk|народный|Folk music is popular here.
festival|фестиваль|The festival attracts tourists.
inspiration|вдохновение|Nature is my inspiration.
creativity|креативность|Art develops creativity.
cultural exchange|культурный обмен|Students benefit from cultural exchange.
assimilate|ассимилироваться|Immigrants assimilate over time.`},

{id:"v-science",lvl:"B2",t:"Наука и исследования",yt:"science research vocabulary ielts",w:`research|исследование|Research shows that…
experiment|эксперимент|The experiment failed.
hypothesis|гипотеза|We tested the hypothesis.
evidence|доказательство|There is little evidence.
findings|результаты (иссл.)|The findings were published.
conduct research|проводить исследование|They conducted research on sleep.
laboratory|лаборатория|Samples go to the laboratory.
scientist|учёный|Scientists discovered a gene.
discovery|открытие|The discovery of insulin saved lives.
theory|теория|Darwin's theory of evolution.
data analysis|анализ данных|Data analysis took months.
peer review|рецензирование|The paper passed peer review.
sample|образец; выборка|The sample size was small.
significant|значимый|A significant difference was found.
reliable|достоверный|The results are reliable.
ethical|этичный|Animal testing raises ethical issues.
space exploration|освоение космоса|Space exploration is expensive.
genetic engineering|генная инженерия|Genetic engineering is controversial.
advance|прогресс; продвигаться|Advances in medicine extend life.
breakthrough|прорыв|A major breakthrough in vaccines.`},

{id:"v-colloc",lvl:"B2",t:"Коллокации для IELTS",yt:"ielts collocations band 7",w:`play a key role|играть ключевую роль|Diet plays a key role in health.
have a negative impact on|оказывать негативное влияние|Stress has a negative impact on sleep.
pose a threat to|представлять угрозу|Smoking poses a threat to health.
take measures|принимать меры|The state must take measures.
meet the needs|удовлетворять потребности|Hospitals must meet the needs of patients.
make progress|добиваться прогресса|I'm making progress.
draw attention to|привлекать внимание к|The report draws attention to obesity.
raise concerns|вызывать опасения|AI raises concerns.
reach a decision|принять решение|They reached a decision.
a growing number of|растущее число|A growing number of people work remotely.
widely accepted|общепринятый|It is widely accepted that…
strongly believe|твёрдо считать|I strongly believe that…
heavily rely on|сильно зависеть от|We heavily rely on technology.
vital importance|жизненная важность|Sleep is of vital importance.
a wide range of|широкий спектр|A wide range of treatments.
in the long run|в долгосрочной перспективе|In the long run, it pays off.
pay attention to|обращать внимание|Pay attention to details.
face challenges|сталкиваться с трудностями|Doctors face many challenges.
bear in mind|иметь в виду|Bear in mind the time limit.
come to the conclusion|прийти к выводу|I came to the conclusion that…`},

{id:"v-letters",lvl:"B1",t:"Фразы для писем (GT Task 1)",yt:"ielts general training letter writing phrases",w:`Dear Sir or Madam,|Уважаемые господа (формально, имя неизвестно)|Dear Sir or Madam, I am writing to complain…
I am writing to…|Пишу, чтобы… (формально)|I am writing to enquire about the course.
I would be grateful if…|Был(а) бы признательна, если…|I would be grateful if you could reply soon.
I look forward to hearing from you.|Жду ответа (формально)|I look forward to hearing from you.
Yours faithfully,|С уважением (если Sir/Madam)|Yours faithfully, Alsu Loginova
Yours sincerely,|С уважением (если имя известно)|Yours sincerely, Alsu Loginova
Dear Mr Smith,|Уважаемый мистер Смит|Dear Mr Smith, thank you for…
I am writing to complain about…|Пишу с жалобой на…|I am writing to complain about the service.
I would like to apologise for…|Хочу извиниться за…|I would like to apologise for the delay.
Could you please let me know…|Не могли бы вы сообщить…|Could you please let me know the price?
Hi Kate,|Привет, Кейт (неформально)|Hi Kate, how are you?
It was great to hear from you.|Рада была получить весточку|It was great to hear from you!
Sorry I haven't written for ages.|Прости, что долго не писала|Sorry I haven't written for ages.
I can't wait to see you.|Не могу дождаться встречи|I can't wait to see you.
Best wishes,|Всего наилучшего|Best wishes, Alsu
Take care,|Береги себя|Take care, Alsu
enclose|прилагать (к письму)|I have enclosed a copy of the receipt.
inconvenience|неудобство|I apologise for any inconvenience.
compensation|компенсация|I expect full compensation.
at your earliest convenience|при первой возможности|Please reply at your earliest convenience.`},

{id:"v-acad",lvl:"C1",t:"Продвинутая лексика для Writing",yt:"advanced vocabulary ielts band 8",w:`exacerbate|усугублять|Poverty exacerbates health problems.
mitigate|смягчать|Measures to mitigate climate change.
detrimental|вредный|Detrimental to health.
beneficial|полезный|Beneficial effects of exercise.
alleviate|облегчать|Drugs alleviate pain.
inevitable|неизбежный|Change is inevitable.
unprecedented|беспрецедентный|An unprecedented crisis.
substantial|существенный|A substantial increase.
prevalent|распространённый|Diabetes is prevalent in cities.
undermine|подрывать|Fake news undermines trust.
foster|способствовать, развивать|Schools foster creativity.
hinder|мешать|Lack of funding hinders research.
advocate|выступать за|Doctors advocate vaccination.
controversial|спорный|A controversial issue.
feasible|осуществимый|Is the plan feasible?
paramount|первостепенный|Safety is paramount.
deteriorate|ухудшаться|His condition deteriorated.
outweigh|перевешивать|The benefits outweigh the drawbacks.
comprehensive|всесторонний|A comprehensive review.
a double-edged sword|палка о двух концах|Technology is a double-edged sword.`},

{id:"v-idioms",lvl:"C1",t:"Идиомы и фразы для Speaking",yt:"idioms for ielts speaking",w:`a piece of cake|проще простого|The test was a piece of cake.
under the weather|неважно себя чувствовать|I'm a bit under the weather.
hit the books|засесть за учёбу|I need to hit the books.
once in a blue moon|очень редко|I eat fast food once in a blue moon.
on the same page|на одной волне|We're on the same page.
break the ice|растопить лёд|Jokes help break the ice.
burn the midnight oil|работать допоздна|I burned the midnight oil before exams.
get the hang of|освоить, наловчиться|I'm getting the hang of it.
in the long run|в конечном счёте|It'll pay off in the long run.
to be honest|если честно|To be honest, I prefer tea.
it depends on|зависит от|It depends on the situation.
off the top of my head|навскидку|Off the top of my head, I'd say…
that's a tricky question|сложный вопрос|That's a tricky question, but…
I've never really thought about it|никогда об этом не задумывалась|I've never really thought about it, but…
from my point of view|с моей точки зрения|From my point of view, it's useful.
a blessing in disguise|не было бы счастья…|Losing that job was a blessing in disguise.
cost an arm and a leg|стоить целое состояние|Treatment costs an arm and a leg.
keep an eye on|присматривать|Keep an eye on his temperature.
learn by heart|выучить наизусть|I learned the bones by heart.
make ends meet|сводить концы с концами|Students struggle to make ends meet.`}
];
