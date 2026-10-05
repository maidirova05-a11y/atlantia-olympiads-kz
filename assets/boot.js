document.documentElement.classList.add('lock');
setTimeout(function(){document.documentElement.classList.remove('intro','lock')},10000);
if('scrollRestoration' in history)history.scrollRestoration='manual';
window.scrollTo(0,0);
