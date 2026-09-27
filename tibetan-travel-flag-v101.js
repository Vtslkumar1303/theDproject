(()=>{
  const FLAG_SRC='https://upload.wikimedia.org/wikipedia/commons/3/3c/Flag_of_Tibet.svg';
  function getLetter(){
    return document.querySelector('#letter,.letter-sheet,.letter-paper,.letter-main,.letter');
  }
  function mount(){
    const letter=getLetter();
    if(!letter)return false;
    if(letter.querySelector('.tibetan-travel-flag-v101'))return true;

    const flag=document.createElement('div');
    flag.className='tibetan-travel-flag-v101';
    flag.setAttribute('aria-hidden','true');
    flag.innerHTML='<span class="flag-pin"></span><span class="flag-pole"></span><span class="flag-cloth-wrap"><img class="flag-cloth" alt="" decoding="async" loading="eager"></span><span class="travel-pin-note">somewhere peaceful</span>';
    const img=flag.querySelector('.flag-cloth');
    img.src=FLAG_SRC;
    img.referrerPolicy='no-referrer';
    img.onerror=()=>{flag.style.display='none'};
    letter.appendChild(flag);
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