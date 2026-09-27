(()=>{
  function getLetter(){
    return document.querySelector('#letter,.letter-sheet,.letter-paper,.letter-main,.letter');
  }
  function mount(){
    const letter=getLetter();
    if(!letter)return false;
    letter.querySelector('.tibetan-travel-flag-v101')?.remove();
    if(letter.querySelector('.tibetan-prayer-flags-v102'))return true;

    const wrap=document.createElement('div');
    wrap.className='tibetan-prayer-flags-v102';
    wrap.setAttribute('aria-hidden','true');
    wrap.innerHTML='<span class="pin-left"></span><span class="pin-right"></span><span class="rope"></span><span class="flag f1"></span><span class="flag f2"></span><span class="flag f3"></span><span class="flag f4"></span><span class="flag f5"></span><span class="travel-tag">traveller\'s corner</span>';
    letter.appendChild(wrap);
    return true;
  }
  function start(){
    if(mount())return;
    const mo=new MutationObserver(()=>{if(mount())mo.disconnect()});
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>mo.disconnect(),20000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();