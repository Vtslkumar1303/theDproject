(()=>{
  const enhance=()=>{
    const section=document.querySelector('.tdp-hidden-dream-notes');
    if(!section || section.classList.contains('tdp-wishlist-magic')) return !!section;

    section.classList.add('tdp-wishlist-magic');

    const toggle=document.createElement('button');
    toggle.type='button';
    toggle.className='tdp-wishlist-master-toggle';
    toggle.setAttribute('aria-expanded','false');
    toggle.innerHTML='Tap to open the wishlist<span class="tdp-toggle-sub">a few little futures, folded away</span>';

    const sparkles=document.createElement('span');
    sparkles.className='tdp-wishlist-sparkles';
    sparkles.setAttribute('aria-hidden','true');
    sparkles.innerHTML='<i></i><i></i><i></i><i></i><i></i>';

    const children=[...section.children];
    const shell=document.createElement('div');
    shell.className='tdp-wishlist-magic-shell';
    const inner=document.createElement('div');
    inner.className='tdp-wishlist-magic-inner';
    children.forEach(node=>inner.appendChild(node));
    shell.appendChild(inner);

    section.append(toggle,sparkles,shell);

    toggle.addEventListener('click',()=>{
      const open=section.classList.toggle('is-wishlist-open');
      toggle.setAttribute('aria-expanded',open?'true':'false');
      toggle.innerHTML=open
        ? 'Tap to close the wishlist<span class="tdp-toggle-sub">fold these little futures back away</span>'
        : 'Tap to open the wishlist<span class="tdp-toggle-sub">a few little futures, folded away</span>';

      if(!open){
        section.querySelectorAll('.tdp-dreamnote.is-open').forEach(note=>{
          note.classList.remove('is-open');
          const btn=note.querySelector('.tdp-dreamnote-toggle');
          if(btn) btn.setAttribute('aria-expanded','false');
        });
      }

      if(window.tdpTrack){
        window.tdpTrack(open?'wishlist_magic_open':'wishlist_magic_close');
      }
    });
    return true;
  };

  const start=()=>{
    if(enhance()) return;
    const mo=new MutationObserver(()=>{ if(enhance()) mo.disconnect(); });
    mo.observe(document.documentElement,{childList:true,subtree:true});
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
