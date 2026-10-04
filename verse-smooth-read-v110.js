(()=>{
  function contentFor(card){
    return card.querySelector('.verse-copy,.verse-body,.verse-content,.verse-text,.verse-inner');
  }

  function prepare(card){
    if(card.dataset.smoothReadV110==='1')return;
    const copy=contentFor(card);
    if(!copy)return;

    const items=[
      ...copy.querySelectorAll(':scope > p,:scope > blockquote,:scope > .quote,:scope > ul > li,:scope > ol > li')
    ].filter(el=>
      !el.closest('.verse-response,.response-box,.response-form,.tdp-response-wrap,.verse-audio')
    );

    items.forEach((el,i)=>{
      el.classList.add('tdp-smooth-read-v110');
      el.style.setProperty('--tdp-read-index',String(Math.min(i,8)));
    });

    card.dataset.smoothReadV110='1';
  }

  function bind(){
    document.querySelectorAll('.verse-card').forEach(prepare);

    const mo=new MutationObserver(()=>{
      document.querySelectorAll('.verse-card').forEach(prepare);
    });
    mo.observe(document.body,{childList:true,subtree:true});
    setTimeout(()=>mo.disconnect(),20000);

    document.documentElement.dataset.verseReading='v110-smooth';
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});
  else bind();
})();