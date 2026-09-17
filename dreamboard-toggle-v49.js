(()=>{
  const mount=()=>{
    const shell=document.querySelector('.tdp-dreamboard-shell');
    if(!shell || shell.dataset.magicalToggle==='1') return !!shell;
    const cover=shell.querySelector('.tdp-memory-cover');
    const stage=shell.querySelector('.tdp-dreamboard-stage');
    const tap=cover?.querySelector('.tdp-cover-tap');
    if(!cover || !stage) return false;
    shell.dataset.magicalToggle='1';

    const setLabel=(open)=>{
      cover.setAttribute('aria-expanded',open?'true':'false');
      stage.setAttribute('aria-hidden',open?'false':'true');
      if(tap) tap.textContent=open?'tap to close':'tap to open';
      const title=cover.querySelector('strong');
      if(title) title.textContent=open?'Tap to close these little futures…':'Tap to open a few little futures…';
    };

    const open=()=>{
      shell.classList.remove('is-closing');
      shell.classList.add('is-opening','is-open','magic-burst');
      setLabel(true);
      requestAnimationFrame(()=>requestAnimationFrame(()=>shell.classList.add('is-revealed')));
      setTimeout(()=>shell.classList.remove('is-opening','magic-burst'),1200);
    };

    const close=()=>{
      shell.classList.remove('is-opening','magic-burst','is-revealed');
      shell.classList.add('is-closing');
      setLabel(false);
      setTimeout(()=>{
        shell.classList.remove('is-open','is-closing');
      },780);
    };

    const toggle=(e)=>{
      e.preventDefault();
      e.stopImmediatePropagation();
      if(shell.classList.contains('is-open') && !shell.classList.contains('is-closing')) close();
      else if(!shell.classList.contains('is-opening')) open();
    };

    cover.addEventListener('click',toggle,true);
    cover.addEventListener('keydown',(e)=>{
      if(e.key==='Enter'||e.key===' '){toggle(e);}
    },true);
    setLabel(shell.classList.contains('is-open'));
    return true;
  };

  const start=()=>{
    if(mount()) return;
    const mo=new MutationObserver(()=>{if(mount()) mo.disconnect();});
    mo.observe(document.documentElement,{childList:true,subtree:true});
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
})();
