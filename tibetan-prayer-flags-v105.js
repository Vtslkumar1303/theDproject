(()=>{
  function getLetter(){return document.querySelector('#letter,.letter-sheet,.letter-paper,.letter-main,.letter')}
  function buildFlag(cls){
    const el=document.createElement('span');el.className='flag '+cls;
    el.innerHTML='<span class="seal"></span><span class="detail">༄༅།།\nༀ\n༄༅།།</span><span class="fray"></span>';
    return el;
  }
  function mount(){
    const letter=getLetter();if(!letter)return false;
    letter.querySelector('.tibetan-travel-flag-v101')?.remove();
    letter.querySelector('.tibetan-prayer-flags-v102')?.remove();
    letter.querySelector('.tibetan-prayer-flags-v103')?.remove();
    letter.querySelector('.tibetan-prayer-cross-v104')?.remove();
    if(letter.querySelector('.tibetan-prayer-flags-v105'))return true;
    const wrap=document.createElement('div');wrap.className='tibetan-prayer-flags-v105';wrap.setAttribute('aria-hidden','true');
    wrap.innerHTML='<span class="pin-left"></span><span class="pin-right"></span><span class="rope"></span><span class="travel-tag">traveller\'s corner</span>';
    ['f1','f2','f3','f4','f5'].forEach(c=>wrap.appendChild(buildFlag(c)));
    letter.appendChild(wrap);return true;
  }
  function start(){
    if(mount())return;
    const mo=new MutationObserver(()=>{if(mount())mo.disconnect()});
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>mo.disconnect(),20000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();