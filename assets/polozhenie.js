// Regulations page: shows the Kazakh document for KZ, the Russian one for RU/EN (no official English version)
(function(){
  const UI={"ru": {"back": "На главную", "sub": "Официальный документ на сезон 2026–2027. Согласовано с центром «Астана дарыны», утверждено AZ GROUP LLC.", "dl_ru": "Скачать PDF · русский", "dl_kk": "Скачать PDF · казахский", "page": "Страница", "note": "", "title": "Положение об олимпиадах"}, "kk": {"back": "Басты бетке", "sub": "2026–2027 маусымына арналған ресми құжат. «Астана дарыны» орталығымен келісілген, AZ GROUP LLC бекіткен.", "dl_ru": "PDF жүктеу · орыс тілі", "dl_kk": "PDF жүктеу · қазақ тілі", "page": "Бет", "note": "", "title": "Олимпиадалар туралы ереже"}, "en": {"back": "Back to home", "sub": "Official document for the 2026–2027 season, agreed with the “Astana Daryny” centre and approved by AZ GROUP LLC.", "dl_ru": "Download PDF · Russian", "dl_kk": "Download PDF · Kazakh", "page": "Page", "note": "The official document is published in Kazakh and Russian. The Russian version is shown below.", "title": "Olympiad regulations"}};
  const NAV={"ru":{"n_subj":"Предметы","n_doc":"Положение","n_stages":"Этапы","n_format":"Формат","n_prizes":"Призы","n_faq":"Вопросы"},"kk":{"n_subj":"Пәндер","n_doc":"Ереже","n_stages":"Кезеңдер","n_format":"Формат","n_prizes":"Жүлделер","n_faq":"Сұрақтар"},"en":{"n_subj":"Subjects","n_doc":"Regulations","n_stages":"Stages","n_format":"Format","n_prizes":"Prizes","n_faq":"FAQ"}};
  for(const k in NAV)Object.assign(UI[k],NAV[k]);
  const root=document.documentElement,key=root.dataset.store;
  function set(l){
    if(!UI[l])l='ru';
    const doc=l==='kk'?'kk':'ru';
    document.querySelectorAll('[data-doc]').forEach(e=>e.hidden=e.dataset.doc!==doc);
    document.querySelectorAll('[data-ui]').forEach(e=>{const v=UI[l][e.dataset.ui];e.textContent=v;if(e.dataset.ui==='note')e.hidden=!v});
    document.querySelectorAll('[data-dl]').forEach(a=>a.classList.toggle('main',a.dataset.dl===doc));
    document.querySelectorAll('.lang button').forEach(b=>b.classList.toggle('on',b.dataset.lang===l));
    root.lang=l;document.title=UI[l].title+' — '+document.title.split(' — ').slice(1).join(' — ');
    try{localStorage.setItem(key,l)}catch(e){}
  }
  document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>set(b.dataset.lang)));
  let l=new URLSearchParams(location.search).get('lang');
  if(!l){try{l=localStorage.getItem(key)}catch(e){}}
  set(l||'ru');
})();
