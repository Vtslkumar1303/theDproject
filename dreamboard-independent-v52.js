(()=>{
  const makeIndependent=()=>{
    const shell=document.querySelector('.tdp-dreamboard-shell');
    if(!shell || shell.dataset.independentDreamboard==='1') return !!shell;
    shell.dataset.independentDreamboard='1';
    shell.classList.add('cover-visible');
    const cover=shell.querySelector('.tdp-memory-cover');
    const stage=shell.querySelector('.tdp-dreamboard-stage');
    if(cover){
      cover.setAttribute('aria-expanded',shell.classList.contains('is-open')?'true':'false');
    }
    if(stage){
      stage.setAttribute('aria-hidden',shell.classList.contains('is-open')?'false':'true');
    }
    return true;
  };

  const start=()=>{
    if(makeIndependent()) return;
    const mo=new MutationObserver(()=>{
      if(makeIndependent()) mo.disconnect();
    });
    mo.observe(document.documentElement,{childList:true,subtree:true});
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
