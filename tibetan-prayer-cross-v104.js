(()=>{
  function getLetter(){
    return document.querySelector('#letter,.letter-sheet,.letter-paper,.letter-main,.letter');
  }
  function makeFlag(cls){
    const el=document.createElement('span');
    el.className='flag '+cls;
    el.innerHTML='<span class="seal"></span><span class="detail">༄༅།།\nༀ\n༄༅།།</span>';
    return el;
  }
  function makeStrand(extra){
    const s=document.createElement('div');
    s.className='strand '+extra;
    s.innerHTML='<span class="pin left"></span><span class="pin right"></span><span class="rope"></span>';
    ['f1','f2','f3','f4','f5'].forEach(c=>s.appendChild(makeFlag(c)));
    return s;
  }
  function mount(){
    const letter=getLetter();
    if(!letter)return false;
    letter.querySelector('.tibetan-travel-flag-v101')?.remove();
    letter.querySelector('.tibetan-prayer-flags-v102')?.remove();
    letter.querySelector('.tibetan-prayer-flags-v103')?.remove();
    if(letter.querySelector('.tibetan-prayer-cross-v104'))return true;
    const wrap=document.createElement('div');
    wrap.className='tibetan-prayer-cross-v104';
    wrap.setAttribute('aria-hidden','true');
    wrap.append(makeStrand('strand-a'),makeStrand('strand-b'));
    const pin=document.createElement('span');
    pin.className='cross-pin';
    wrap.appendChild(pin);
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