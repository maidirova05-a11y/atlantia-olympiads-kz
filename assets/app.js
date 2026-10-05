/* Registration link.
   Paste the PUBLIC Google Form link here (…/viewform or forms.gle/…).
   Never paste the /edit link — it gives edit access to anyone who opens the site. */
const REG_URL='https://docs.google.com/forms/d/e/1FAIpQLSfF8_fUPFQGo9sUSuAPn2UjY1lyZDHb0lZazsxzeZyiAot3hg/viewform';
(function(){
  const ok=/^https:\/\/(docs\.google\.com\/forms\/|forms\.gle\/|az-group\.kz)/.test(REG_URL)&&!/\/edit/.test(REG_URL);
  if(!ok){console.warn('REG_URL is not a public Google Form link');return}
  document.querySelectorAll('a[data-reg]').forEach(a=>{a.href=REG_URL});
})();

/* ================= i18n ================= */
// key: [kk, en]; Russian comes from the HTML itself
const T={
"title":["Atlantia STEM Olympiads — Қазақстан","Atlantia STEM Olympiads — Kazakhstan"],
"nav.subj":["Пәндер","Subjects"],"nav.stages":["Кезеңдер","Stages"],"nav.format":["Формат","Format"],"nav.prizes":["Жүлделер","Prizes"],"nav.faq":["Сұрақтар","FAQ"],"nav.reg":["Тіркелу","Register"],
"hero.tag":["3–11(12) сыныптарға арналған математика, физика, информатика, химия және биология бойынша халықаралық олимпиадалар","International olympiads in maths, physics, computer science, chemistry and biology for grades 3–11(12)"],
"hero.cta":["Қатыс","Take part"],"o1.r":["Ұйымдастырушы","Organiser"],"o1.p":["Өкілдігі Барселонада (Испания) орналасқан халықаралық компания.","An international company with a representative office in Barcelona, Spain."],"nav.doc":["Ереже","Regulations"],"doc.t":["Олимпиадалар туралы ереже","Olympiad regulations"],"doc.s":["Ресми құжат · 2026–2027 маусымы","Official document · 2026–2027 season"],"pay.btn":["Kaspi арқылы төлеу","Pay via Kaspi"],"pay.link":["Kaspi-де төлеу","Pay in Kaspi"],"foot.offer":["Қоғамдық ұсыныс","Public offer"],"price.offer":["Қатысуды төлеу арқылы сіз <a href=\"/oferta\">қоғамдық ұсыныс</a> талаптарын қабылдайсыз.","By paying for participation you accept the terms of the <a href=\"/oferta\">public offer</a>."],"wa.label":["Кеңес алу","Get a consultation"],"wa.sub":["WhatsApp арқылы","on WhatsApp"],"hero.rep":["Қазақстандағы ресми өкіл","Official representative in Kazakhstan"],"hero.scroll":["Тереңге","Dive in"],"hero.skip":["Өткізіп жіберу","Skip"],
"m.n":["Математика","Mathematics"],"p.n":["Физика","Physics"],"i.n":["Информатика","Computer Science"],"c.n":["Химия","Chemistry"],"b.n":["Биология","Biology"],"mq.f":["Әлемдік финал","World Final"],
"m.d":["Логика, алгебра, геометрия және стандартты емес есептер","Logic, algebra, geometry and non-standard problems"],
"p.d":["Табиғат заңдары, эксперимент және дәл есептеу","Laws of nature, experiment and precise calculation"],
"i.d":["Алгоритмдер, логика және есептеуіш ойлау","Algorithms, logic and computational thinking"],
"c.d":["Заттар, реакциялар және олардың заңдылықтары","Substances, reactions and their patterns"],
"b.d":["Тірі жүйелер — жасушадан экожүйеге дейін","Living systems — from the cell to the ecosystem"],
"about.eye":["Олимпиадалар туралы","About"],"about.h":["Бес ғылым. <em>Бір үлкен мақсат.</em>","Five sciences. <em>One big goal.</em>"],
"about.p1":["Atlantia STEM Olympiads — әлемнің 30-дан астам елінде өтетін беделді халықаралық пәндік олимпиадалар. Қазақстанда олар екі кезеңнен тұрады: республикалық кезең — еліміздің қалаларында, әлемдік финал — Түркияда немесе Испанияда.","Atlantia STEM Olympiads are prestigious international subject olympiads held in more than 30 countries. In Kazakhstan they run in two stages: the national round in cities across the country and the World Final in Türkiye or Spain."],
"about.p2":["Мақсаты — оқушылардың зияткерлік және шығармашылық әлеуетін дамыту, олардың ғылым мен білім саласында өзін-өзі жүзеге асыруына жағдай жасау.","The goal is to develop students’ intellectual and creative potential and help them realise themselves in science and education."],
"about.badge":["ел Atlantia олимпиадаларын өткізеді","countries host Atlantia olympiads"],
"st.1":["пән","subjects"],"st.2":["ел","countries"],"st.3":["санат","categories"],"st.4":["тапсырма","problems"],"st.5":["минут","minutes"],
"subj.eye":["Пәндер","Subjects"],"subj.h":["Өз <em>тереңдігіңді</em> таңда","Choose <em>your depth</em>"],
"subj.p":["Бір немесе бірнеше пәнді тапсыруға болады — бірақ бір күнде екіден артық емес. Әр түрлі пәндер бойынша жүлделі орындар бірнеше марапатқа құқық береді.","Take one subject or several — but no more than two per day. Prize places in different subjects entitle you to several awards."],
"goals.t":["Олимпиадалардың міндеттері","Our mission"],"ben.eye":["Артықшылықтар","Why join"],"ben.h":["Неге <em>қатысу</em> керек","Why <em>take part</em>"],
"stmt":["Ғылым — мұхит. Әр пән — жаңа тереңдік, әр олимпиада — жаңа жаңалық.","Science is an ocean. Every subject is a new depth, every olympiad a new discovery."],
"g1":["Жаратылыстану ғылымдарына қызығушылықты арттыру","Spark interest in the natural sciences"],
"g2":["Дарынды оқушыларды анықтау және қолдау","Discover and support gifted students"],
"g3":["Бәсекеге қабілетті портфолио қалыптастыру","Build a competitive portfolio"],
"g4":["Білім берудегі халықаралық ынтымақтастықты дамыту","Develop international cooperation in education"],
"b1.h":["Әлемдік финалға жол","A path to the World Final"],"b1.p":["Республикалық кезеңде 50%-дан астам дұрыс жауап берсеңіз — шетелдегі әлемдік финалға өтесіз.","Score more than 50% on the national round and you qualify for the World Final abroad."],
"b2.h":["Халықаралық дипломдар","International diplomas"],"b2.p":["Жоғары білім деңгейін растайтын және шетелдік мектептер мен университеттерге түсуге көмектесетін сертификаттар мен дипломдар.","Certificates and diplomas that confirm a high level of knowledge and help with admission to schools and universities abroad."],
"b3.h":["Бірнеше марапат","Multiple awards"],"b3.p":["Әр түрлі пәндерді тапсырып, әрқайсысы бойынша жүлдеге үміткер болыңыз.","Take different subjects and compete for a prize in each of them."],
"stg.eye":["Кезеңдер","Stages"],"stg.h":["Туған қаладан — <em>әлемдік финалға</em>","From your home city — <em>to the World Final</em>"],
"s1.lbl":["01-кезең","Stage 01"],"s1.h":["Республикалық","National round"],
"s1.p":["Қазақстан қалаларында күндізгі форматта өтеді. Мектеп базасында тек сол мектептің оқушылары үшін өткізуге болады.","Held in person in cities across Kazakhstan. A school may also host it exclusively for its own students."],
"mo.10":["Қазан","October"],"mo.11":["Қараша","November"],"mo.12":["Желтоқсан","December"],"mo.2":["Ақпан","February"],
"s1.l1":["Орны мен уақыты кемінде 3 күн бұрын e-mail арқылы және AZ GROUP әлеуметтік желілерінде хабарланады","Venue and time are announced at least 3 days ahead by e-mail and on AZ GROUP social media"],
"s1.l2":["Пәнді қайта тапсыруға болады — ең жақсы нәтиже есептеледі","You can retake a subject — your best score counts"],
"s1.l3":["Ұпайлар 15 жұмыс күні ішінде atlantia-olympiads.kz сайтында жарияланады","Scores are published on atlantia-olympiads.kz within 15 working days"],
"pass":["дұрыс жауап — әлемдік финалға өту шегі","correct answers — the qualifying score for the World Final"],
"s2.lbl":["02-кезең","Stage 02"],"s2.h":["Әлемдік финал","World Final"],
"s2.p":["Финалистер елді өздері таңдайды. Қазақстандық қатысушылардың сапарын AZ GROUP LLC ұйымдастырады.","Finalists choose the host country. AZ GROUP LLC organises the trip for participants from Kazakhstan."],
"tr":["Түркия","Türkiye"],"es":["Испания","Spain"],"jan":["2027 жылғы қаңтар","January 2027"],"apr":["2027 жылғы сәуір","April 2027"],"may":["2027 жылғы мамыр","May 2027"],
"s2.note":["Финалға тек AZ GROUP LLC арқылы қатысуға болады; шығындарды қатысушылар ұйымдастырушылардың бағдарламасына сәйкес өздері көтереді.","Participation in the final is only through AZ GROUP LLC; participants cover their own costs according to the organisers’ programme."],
"tl1.d":["Қазан — Наурыз","Oct — Mar"],"mo.range":["2026 жылғы қазан — 2027 жылғы наурыз","October 2026 — March 2027"],"tl1.t":["Қазақстан қалаларында республикалық кезең","National round in cities of Kazakhstan"],
"tl2.t":["Әлемдік финал — Түркия","World Final — Türkiye"],"tl3.t":["Жалпы нәтижелер atlantia-olympiads.kz сайтында · Астанада марапаттау","Overall results on atlantia-olympiads.kz · Awards ceremony in Astana"],"tl4.t":["Әлемдік финал — Испания","World Final — Spain"],
"cat.eye":["Қатысушылар","Participants"],"cat.h":["Бес <em>тереңдік</em> деңгейі","Five levels of <em>depth</em>"],
"cat.p":["Қазақстандағы мемлекеттік және жеке мектептердің оқушыларына арналған. Әркім тек өз санатында жарысады.","For students of public and private schools in Kazakhstan. Everyone competes strictly within their own category."],
"g34":["3–4 сынып","Grades 3–4"],"g56":["5–6 сынып","Grades 5–6"],"g78":["7–8 сынып","Grades 7–8"],"g910":["9–10 сынып","Grades 9–10"],"g1112":["11(12) сынып","Grade 11(12)"],
"c1":["Бірінші санат","First category"],"c2":["Екінші санат","Second category"],"c3":["Үшінші санат","Third category"],"c4":["Төртінші санат","Fourth category"],"c5":["Бесінші санат","Fifth category"],
"fmt.eye":["Формат","Format"],"fmt.h":["Олимпиада <em>қалай өтеді</em>","How the <em>olympiad works</em>"],
"fmt.p":["Күндізгі форматта, бір күнде екі ағынмен өтеді. Тапсырмалар ресми халықаралық олимпиадалардың бағдарламаларына сәйкес келеді және Еуропа мен Қазақстанның академиктері мен оқытушыларының қатысуымен әзірленген.","In person, in two sessions on a single day. Problems follow the programmes of official international olympiads and are developed with academics and teachers from Europe and Kazakhstan."],
"f1":["4–5 жауап нұсқасы бар тапсырма","problems with 4–5 answer options"],"f2":["минут орындауға","minutes to complete"],"f3":["тіл: қазақ, орыс, ағылшын","languages: Kazakh, Russian, English"],"f4":["бір күнде ең көбі пән саны","subjects max per day"],
"ok.h":["Алуға болады","You may bring"],"ok.1":["Қара немесе көк түсті шарикті қалам","A black or blue ballpoint pen"],"ok.2":["Мөлдір бөтелкедегі су","Water in a clear bottle"],
"no.h":["Тыйым салынады","Not allowed"],"no.1":["Жоба қағаздар, кітаптар мен оқулықтар","Scratch paper, books and textbooks"],"no.2":["Телефондар, планшеттер, калькуляторлар және кез келген гаджеттер","Phones, tablets, calculators and any gadgets"],"no.3":["Тапсырмаларды көшіру және суретке түсіру — дисквалификация","Copying or photographing problems — disqualification"],
"inf.h":["Маңызды","Important"],"inf.1":["Басталуына 30 минут қалғанда келіңіз","Arrive 30 minutes before the start"],"inf.2":["30 минутқа дейін кешіксеңіз — тек қалған уақытқа жіберіледі","Up to 30 minutes late — admitted for the remaining time only"],"inf.3":["Жауаптар бланкіде анық әрі толық боялады","Answers are shaded clearly and fully on the answer sheet"],
"pr.eye":["Марапаттар","Awards"],"pr.h":["Республикалық кезеңнің <em>жүлделері</em>","National round <em>prizes</em>"],
"pr.p":["Барлық қатысушылар электронды сертификат алады, жеңімпаздар мен жүлдегерлер — диплом. Салтанатты марапаттау 2027 жылғы сәуірде Астанада өтеді.","All participants receive an electronic certificate; winners and prize-winners receive diplomas. The awards ceremony takes place in Astana in April 2027."],
"p1":["Планшет","Tablet"],"p2":["Велосипед","Bicycle"],"p3":["Смарт білезік","Smart band"],
"d1":["I дәрежелі диплом","1st-degree diploma"],"d2":["II дәрежелі диплом","2nd-degree diploma"],"d3":["III дәрежелі диплом","3rd-degree diploma"],
"th.c":["Санат","Category"],"th.1":["1-орын","1st place"],"th.2":["2-орын","2nd place"],"th.3":["3-орын","3rd place"],
"pn1":["Жүлделі орынға қажетті ең төменгі ұпай — әр пән бойынша өз санатыңызда. Жүлделі орындар саны қатысушылар санына байланысты.","The minimum score for a prize applies per subject within your category. The number of prize places depends on the number of participants."],
"pn2":["Ұпайлар тең болса, бір сынып төмен оқитын қатысушыға басымдық беріледі.","In case of a tie, priority goes to the participant in the lower grade."],
"pn3":["Жүлделер ақшаға айырбасталмайды және бір ай ішінде алынуы тиіс.","Prizes cannot be exchanged for cash and must be collected within one month."],
"reg.eye":["Тіркелу","Registration"],"reg.h":["Олимпиадаға дейін <em>үш қадам</em>","Three steps <em>to the olympiad</em>"],
"r1.h":["Осы сайтта тіркелу","Register on this site"],"r1.p":["«Қатыс» батырмасын басыңыз — форма ашылады; санатты, пәндерді және қаланы таңдаңыз","Click “Take part” to open the form; choose your category, subjects and city"],
"r2.h":["Kaspi арқылы төлеу","Pay via Kaspi"],"r2.p":["AZ GROUP LLC шотына қолма-қолсыз аударым, Астана қ.","Bank transfer to AZ GROUP LLC, Astana"],
"r3.h":["Олимпиада","The olympiad"],"r3.p":["Орны мен уақыты кемінде 3 күн бұрын e-mail-ге келеді","Venue and time will be emailed at least 3 days ahead"],
"calc.h":["Құнын есептеңіз","Calculate your fee"],"calc.total":["Барлығы","Total"],
"price.p":["Әр пән үшін 25 000 ₸. Төлем олимпиаданы өткізуге, тапсырмаларды әзірлеуге, марапаттау рәсіміне және жүлде қорына жұмсалады. Олимпиада өткеннен кейін төлем қайтарылмайды.","25,000 ₸ per subject. The fee covers running the olympiad, problem development, the awards ceremony and the prize fund. Fees are non-refundable after the olympiad."],
"price.cta":["Тіркелуге өту","Go to registration"],
"org.eye":["Ұйымдастырушылар","Organisers"],"org.h":["Олимпиадаларды <em>кім өткізеді</em>","Who <em>runs the olympiads</em>"],
"o2.r":["ҚР-дағы ресми өкіл","Official representative in Kazakhstan"],"o2.p":["Қазақстандағы олимпиадалардың үйлестірушісі: республикалық кезеңге жалпы басшылық және әлемдік финалға сапарды ұйымдастыру.","Coordinator of the olympiads in Kazakhstan: overall management of the national round and organisation of the trip to the World Final."],
"o3.r":["Серіктес ұйымдастырушы","Co-organiser"],"o3.h":["«Астана дарыны»","“Astana Daryny”"],"o3.p":["Дарынды балалар мен талантты жастарды анықтау және қолдау орталығы.","Centre for identifying and supporting gifted children and talented youth."],
"faq.eye":["Сұрақтар","FAQ"],"faq.h":["Жиі қойылатын <em>сұрақтар</em>","Frequently asked <em>questions</em>"],
"q1":["Қанша пән тапсыруға болады?","How many subjects can I take?"],"a1":["Қалағаныңызша — әр пән бөлек төленеді, бірақ ашық тіркеу аясында бір күнде екі пәннен артық емес.","As many as you like — each subject is paid separately, but no more than two subjects per day while registration is open."],
"q2":["Сол пәнді қайта тапсыруға бола ма?","Can I retake the same subject?"],"a2":["Иә, бөлек төлем арқылы. Ең жоғары ұпай есептеледі; бір пән бойынша тек бір жүлделі орын алуға болады.","Yes, for a separate fee. Your highest score counts; you can win only one prize place per subject."],
"q3":["Бірнеше жүлде алуға бола ма?","Can I win several prizes?"],"a3":["Иә — егер әр түрлі пәндер бойынша жүлделі орын алсаңыз.","Yes — if you win prize places in different subjects."],
"q4":["Олимпиада қай тілде өтеді?","What language is the olympiad in?"],"a4":["Қатысушының таңдауы бойынша: қазақ, орыс немесе ағылшын тілінде.","Participant’s choice: Kazakh, Russian or English."],
"q5":["Апелляция беруге бола ма?","Can I appeal my result?"],"a5":["Жоқ. Нәтижелердің толық талдауы берілмейді, апелляция қарастырылмаған.","No. Detailed breakdowns are not provided and there is no appeal procedure."],
"q6":["Төлем қайтарыла ма?","Is the fee refundable?"],"a6":["Олимпиада өткеннен кейін — жоқ. Форс-мажор жағдайында ашық тіркеу аясында басқа күні немесе басқа қалада тапсыруға болады.","Not after the olympiad has taken place. In case of force majeure you can sit it on another date or in another city while registration is open."],
"fin.h":["Ғылымға <em>тереңірек</em> сүңгі","Dive <em>deeper</em> into science"],
"fin.p":["Пәнді таңдап, республикалық кезеңге тіркел және әлемдік финалға жолыңды баста.","Choose a subject, register for the national round and start your journey to the World Final."],
"foot.rep":["Қазақстан Республикасындағы ресми өкіл — AZ GROUP LLC, Астана қ.","Official representative in the Republic of Kazakhstan — AZ GROUP LLC, Astana"],
"foot.photo":["Фото: Unsplash","Photos: Unsplash"]
};
const RU={};
document.querySelectorAll('[data-i]').forEach(el=>{RU[el.dataset.i]??=el.innerHTML});
RU.title=document.title;
function setLang(l){
  if(!['ru','kk','en'].includes(l))l='ru';
  const idx=l==='kk'?0:1;
  document.querySelectorAll('[data-i]').forEach(el=>{
    const k=el.dataset.i;
    el.innerHTML=l==='ru'?RU[k]:(T[k]?T[k][idx]:RU[k]);
  });
  document.title=l==='ru'?RU.title:T.title[idx];
  document.documentElement.lang=l;
  document.querySelectorAll('.lang button').forEach(b=>b.classList.toggle('on',b.dataset.lang===l));
  if(window.onLang)onLang(l);
  try{localStorage.setItem('atl-lang',l)}catch(e){}
  if(window.ScrollTrigger)ScrollTrigger.refresh();
}
document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
(function(){
  let l=new URLSearchParams(location.search).get('lang');
  if(!l){try{l=localStorage.getItem('atl-lang')}catch(e){}}
  if(l&&l!=='ru')setLang(l);
})();

/* ================= nav ================= */
const hdr=document.getElementById('hdr'),burger=document.getElementById('burger'),links=document.getElementById('links');
addEventListener('scroll',()=>hdr.classList.toggle('solid',scrollY>40),{passive:true});
burger.addEventListener('click',()=>{links.classList.toggle('open');burger.classList.toggle('x')});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');burger.classList.remove('x')}));

/* ================= wordmark split ================= */
const word=document.getElementById('word');
word.innerHTML=[...word.textContent].map(c=>`<span class="ch"><span>${c}</span></span>`).join('')+'<i class="waterline" aria-hidden="true"></i>';

/* ================= subjects accordion ================= */
(function(){
  const ps=[...document.querySelectorAll('#acc .panel')];
  const open=p=>ps.forEach(x=>x.classList.toggle('on',x===p));
  ps.forEach(p=>{
    p.addEventListener('mouseenter',()=>{if(matchMedia('(hover: hover)').matches)open(p)});
    p.addEventListener('click',()=>open(p));
    p.addEventListener('focus',()=>open(p));
  });
})();

/* ================= price calculator ================= */
(function(){
  const chips=[...document.querySelectorAll('#chips .chip')],out=document.getElementById('sum');
  let cur=25000;
  const fmt=n=>n.toLocaleString('ru-RU').replace(/ /g,' ');
  function update(){
    const n=Math.max(chips.filter(c=>c.getAttribute('aria-pressed')==='true').length,0),target=n*25000;
    if(window.gsap){const o={v:cur};gsap.to(o,{v:target,duration:.6,ease:'power2.out',onUpdate:()=>out.textContent=fmt(Math.round(o.v/1000)*1000)})}
    else out.textContent=fmt(target);
    cur=target;
  }
  chips.forEach(c=>c.addEventListener('click',()=>{c.setAttribute('aria-pressed',c.getAttribute('aria-pressed')==='true'?'false':'true');update()}));
})();

/* ================= bubbles ================= */
const Bubbles=(function(){
  const c=document.getElementById('bubbles');
  const x=c.getContext('2d');let w,h,B=[],boost=0;
  function size(){const r=Math.min(devicePixelRatio||1,2);w=c.offsetWidth;h=c.offsetHeight;c.width=w*r;c.height=h*r;x.setTransform(r,0,0,r,0,0)}
  size();addEventListener('resize',size);
  const N=Math.min(70,Math.round(innerWidth/20));
  const mk=(y)=>({x:Math.random()*w,y:y??Math.random()*h,r:Math.random()*3.2+.6,s:Math.random()*.6+.25,p:Math.random()*6.28});
  for(let i=0;i<N;i++)B.push(mk());
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return{burst(){}};
  (function f(){
    x.clearRect(0,0,w,h);
    const k=1+boost*5;boost*=.985;
    for(const b of B){
      b.y-=b.s*k;b.p+=.025;if(b.y<-10){Object.assign(b,mk(h+10))}
      const bx=b.x+Math.sin(b.p)*7;
      x.beginPath();x.arc(bx,b.y,b.r,0,6.283);
      x.fillStyle=`rgba(150,235,255,${.06+b.r*.03})`;x.fill();
      x.lineWidth=.6;x.strokeStyle=`rgba(190,245,255,${.18+b.r*.04})`;x.stroke();
    }
    requestAnimationFrame(f);
  })();
  return{burst(){boost=1;for(let i=0;i<40;i++)B.push(mk(h+Math.random()*120));setTimeout(()=>B.splice(N),9000)}};
})();

/* ================= animations ================= */
(function(){
  const root=document.documentElement;
  // Windows "Animation effects: off" also reports reduced motion — we still play a gentle
  // fade-in intro there, but skip the big movements.
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!window.gsap){root.classList.remove('intro','lock');document.querySelectorAll('[data-count]').forEach(e=>e.textContent=e.dataset.count);return}
  gsap.registerPlugin(ScrollTrigger);
  scrollTo(0,0);
  // re-measure trigger positions once webfonts and lazy images settle
  document.fonts&&document.fonts.ready.then(()=>ScrollTrigger.refresh());
  document.querySelectorAll('img[loading=lazy]').forEach(i=>i.addEventListener('load',()=>ScrollTrigger.refresh(),{once:true}));

  const orbit=document.getElementById('orbit'),em=document.getElementById('emblem');
  const strokes=document.getElementById('embImg'),glow=em.querySelector('.glow'),pulse=em.querySelector('.pulse');
  const sats=orbit.querySelectorAll('.sat'),ring=orbit.querySelector('.ring');
  const letters=[...word.querySelectorAll('.ch>span')],water=word.querySelector('.waterline');
  const sub=document.querySelector('.word-sub');
  const rest=['.hero-tag','#ctaMain','.hero-rep'].map(s=>document.querySelector(s));

  // light sweep across the wordmark: each letter shows its own slice of one word-wide highlight
  const shine=()=>{const n=letters.length,o={k:-.8};return gsap.to(o,{k:.8,duration:1.5,ease:'power2.inOut',
    onUpdate:()=>letters.forEach((l,i)=>l.style.backgroundPosition=`${(i/(n-1)+o.k)*100}% 0, 0 0`)})};

  gsap.set(rest,{autoAlpha:0,y:24});
  gsap.set(sub,{autoAlpha:0,letterSpacing:reduce?'.5em':'1.3em'});
  gsap.set([hdr,'.scroll-cue'],{autoAlpha:0});
  gsap.set(strokes,{autoAlpha:0,scale:.6,filter:'blur(12px)',transformOrigin:'50% 50%'});
  gsap.set(glow,{autoAlpha:0});
  gsap.set(pulse,{autoAlpha:0,transformOrigin:'50% 50%'});
  gsap.set(ring,{scale:.3,autoAlpha:0});
  gsap.set(water,{scaleX:0,autoAlpha:0});
  gsap.set('.hero-bg img',{autoAlpha:0,scale:reduce?1:1.25});
  if(reduce){gsap.set(letters,{autoAlpha:0});gsap.set(sats,{autoAlpha:0});gsap.set(ring,{scale:1})}
  else{
    gsap.set(letters,{yPercent:130,scaleY:1.35,autoAlpha:0,filter:'blur(10px)',transformOrigin:'50% 100%'});
    gsap.set('.waves',{yPercent:100});
    // satellites start scattered outside and fly into orbit
    sats.forEach((s,i)=>{const a=i/sats.length*Math.PI*2;gsap.set(s,{x:Math.cos(a)*innerWidth*.6,y:Math.sin(a)*innerHeight*.6,autoAlpha:0,scale:.4})});
    const r=orbit.getBoundingClientRect();
    const s=Math.min(innerWidth*.55/r.width,innerHeight*.45/r.height,2.2);
    gsap.set(orbit,{x:innerWidth/2-(r.left+r.width/2),y:innerHeight/2-(r.top+r.height/2),scale:s,transformOrigin:'50% 50%'});
  }
  root.classList.remove('intro');

  const done=()=>{
    root.classList.remove('lock');document.getElementById('skip').style.display='none';ScrollTrigger.refresh();
    em.classList.add('alive');
    if(!reduce)gsap.delayedCall(6,function loop(){shine();gsap.delayedCall(7,loop)});
  };
  const tl=gsap.timeline({paused:true,onComplete:done});
  if(reduce){
    tl.to([glow,ring],{autoAlpha:1,duration:.6})
      .to(strokes,{autoAlpha:1,scale:1,filter:'blur(0px)',duration:.8},'<')
      .to('.hero-bg img',{autoAlpha:.55,duration:1},'<')
      .to(sats,{autoAlpha:1,duration:.5,stagger:.06})
      .to(letters,{autoAlpha:1,duration:.5,stagger:.05})
      .to(sub,{autoAlpha:1,duration:.5},'<')
      .to(rest,{autoAlpha:1,y:0,duration:.5,stagger:.08})
      .to([hdr,'.scroll-cue'],{autoAlpha:1,duration:.4});
  }else{
    tl.to('.ripples i',{scale:1,autoAlpha:1,duration:2.2,stagger:.35,ease:'power2.out'})
      .to('.ripples i',{autoAlpha:0,duration:1.2,stagger:.35},'<.9')
      .add(()=>Bubbles.burst(),.1)
      .to(glow,{autoAlpha:1,duration:1},.2)
      .to(strokes,{autoAlpha:1,scale:1,filter:'blur(0px)',duration:1.4,ease:'expo.out'},.35)
      .to('.hero-bg img',{autoAlpha:.55,scale:1,duration:2.4,ease:'power2.out'},.5)
      .to(ring,{scale:1,autoAlpha:1,duration:1,ease:'expo.out'},1.1)
      .to(sats,{x:0,y:0,autoAlpha:1,scale:1,duration:1.2,stagger:.08,ease:'expo.out'},1.1)
      .to(orbit,{x:0,y:0,scale:1,duration:1.1,ease:'expo.inOut'},2.1)
      .to('.waves',{yPercent:0,duration:1.4,ease:'power3.out'},2.2)
      // the emblem lands: sonar pulse, then the name surfaces through a glowing waterline
      .fromTo(pulse,{autoAlpha:.9,scale:1},{autoAlpha:0,scale:1.9,duration:1.2,ease:'power2.out'},3.05)
      .to(em,{scale:1.08,duration:.18,yoyo:true,repeat:1,ease:'power2.out',transformOrigin:'50% 50%'},3.05)
      .to(water,{scaleX:1,autoAlpha:1,duration:.7,ease:'expo.out'},3.1)
      .add(()=>Bubbles.burst(),3.3)
      .to(letters,{yPercent:0,scaleY:1,autoAlpha:1,filter:'blur(0px)',duration:1.2,stagger:{each:.07,from:'center'},ease:'back.out(1.6)'},3.3)
      .to(water,{autoAlpha:0,scaleX:1.25,duration:1.2,ease:'power2.in'},4.1)
      .add(shine(),4.2)
      .to(sub,{autoAlpha:1,letterSpacing:'.5em',duration:1.2,ease:'expo.out'},3.9)
      .to(rest,{autoAlpha:1,y:0,duration:.8,stagger:.12,ease:'power3.out'},4.3)
      .fromTo('#ctaMain',{scale:.8},{scale:1,duration:.9,ease:'elastic.out(1,.55)'},4.5)
      .to([hdr,'.scroll-cue'],{autoAlpha:1,duration:.6},4.7);
  }
  // start once the webfont is in, so the letters animate in their real shape (max wait 1.5s)
  Promise.race([document.fonts?document.fonts.ready:Promise.resolve(),new Promise(r=>setTimeout(r,1500))]).then(()=>tl.play());

  // only an explicit click or Esc skips — scrolling no longer kills the intro
  const skip=()=>{if(tl.progress()<1)tl.progress(1)};
  document.getElementById('skip').addEventListener('click',skip);
  addEventListener('keydown',e=>{if(e.key==='Escape')skip()});

  // hero exit: sink down into the deep
  gsap.to('.lockup',{yPercent:-16,autoAlpha:0,scale:.94,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom 30%',scrub:true}});
  gsap.to('.hero-bg',{yPercent:20,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});

  ScrollTrigger.batch('[data-r]',{start:'top 88%',once:true,
    onEnter:b=>gsap.fromTo(b,{autoAlpha:0,y:46},{autoAlpha:1,y:0,duration:1,stagger:.09,ease:'power3.out',overwrite:true})});
  gsap.set('[data-r]',{autoAlpha:0});

  document.querySelectorAll('[data-clip]').forEach(el=>{
    gsap.fromTo(el,{clipPath:'inset(18% 10% 18% 10% round 30px)'},{clipPath:'inset(0% 0% 0% 0% round 30px)',ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',end:'top 35%',scrub:1}});
  });
  document.querySelectorAll('[data-par]').forEach(img=>{
    gsap.fromTo(img,{yPercent:-7},{yPercent:7,ease:'none',scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:true}});
  });
  document.querySelectorAll('[data-par2]').forEach(img=>{
    gsap.fromTo(img,{yPercent:-10,scale:1.05},{yPercent:10,scale:1.15,ease:'none',scrollTrigger:{trigger:img.closest('section'),start:'top bottom',end:'bottom top',scrub:true}});
  });


  const vertical=matchMedia('(max-width:1080px)').matches;
  gsap.to('#tlFill',{[vertical?'scaleY':'scaleX']:1,ease:'none',scrollTrigger:{trigger:'#tline',start:'top 80%',end:'bottom 55%',scrub:true}});

  document.querySelectorAll('[data-count]').forEach(el=>{
    const n=+el.dataset.count,o={v:0};
    ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:()=>gsap.to(o,{v:n,duration:1.6,ease:'power2.out',onUpdate:()=>el.textContent=Math.round(o.v)})});
  });

  gsap.from('.pod',{y:90,autoAlpha:0,stagger:.12,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.podium',start:'top 85%'}});
  gsap.from('.table-wrap .bar i',{scaleX:0,duration:1.2,stagger:.03,ease:'power3.out',scrollTrigger:{trigger:'.table-wrap',start:'top 80%'}});
  gsap.from('.lvl .bar i.f',{scaleY:0,transformOrigin:'bottom',duration:.6,stagger:.04,ease:'back.out(2)',scrollTrigger:{trigger:'.depth',start:'top 75%'}});

  document.querySelectorAll('.cta-main').forEach(b=>{
    if(matchMedia('(hover: none)').matches)return;
    b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.35,duration:.4})});
    b.addEventListener('mouseleave',()=>gsap.to(b,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'}));
  });
})();

/* ================= WhatsApp consultation ================= */
const WA_PHONE='77770888844';
const WA_MSG={
  ru:'Здравствуйте! Хочу получить консультацию по олимпиаде Atlantia.',
  kk:'Сәлеметсіз бе! Atlantia олимпиадасы бойынша кеңес алғым келеді.',
  en:'Hello! I would like a consultation about the Atlantia olympiad.'
};
window.onLang=l=>document.querySelectorAll('a[data-wa]').forEach(a=>{a.href=`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MSG[l]||WA_MSG.ru)}`});
onLang(document.documentElement.lang||'ru');
// on phones the hero stays clean: icon only until the visitor scrolls
(function(){
  const w=document.querySelector('.wa');if(!w)return;
  const f=()=>w.classList.toggle('mini',innerWidth<=680&&scrollY<innerHeight*.6);
  f();addEventListener('scroll',f,{passive:true});addEventListener('resize',f);
})();
