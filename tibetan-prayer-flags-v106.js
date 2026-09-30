(()=>{
  function getLetter(){return document.querySelector('#letter,.letter-sheet,.letter-paper,.letter-main,.letter')}
  function buildFlag(cls){
    const el=document.createElement('span');
    el.className='flag '+cls;
    el.innerHTML='<span class="seal"></span><span class="detail">༄༅།།\nༀ\n༄༅།།</span><span class="fray"></span>';
    return el;
  }
  function mount(){
    const letter=getLetter();if(!letter)return false;
    ['.tibetan-travel-flag-v101','.tibetan-prayer-flags-v102','.tibetan-prayer-flags-v103','.tibetan-prayer-cross-v104','.tibetan-prayer-flags-v105']
      .forEach(sel=>letter.querySelector(sel)?.remove());
    if(letter.querySelector('.tibetan-prayer-flags-v106'))return true;
    const wrap=document.createElement('div');
    wrap.className='tibetan-prayer-flags-v106';
    wrap.setAttribute('aria-hidden','true');
    const strand=document.createElement('div');
    strand.className='strand';
    strand.innerHTML='<span class="rope"></span><span class="pin start"></span><span class="pin end"></span>';
    ['f1','f2','f3','f4','f5'].forEach(c=>strand.appendChild(buildFlag(c)));
    wrap.appendChild(strand);
    letter.appendChild(wrap);
    return true;
  }
  function start(){
    if(mount())return;
    const mo=new MutationObserver(()=>{if(mount())mo.disconnect()});
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>mo.disconnect(),20000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();