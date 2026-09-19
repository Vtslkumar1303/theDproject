(()=>{
  const mount=()=>{
    const section=document.querySelector('.tdp-hidden-dream-notes');
    if(!section || section.dataset.v49Wishlist==='1') return !!section;
    section.dataset.v49Wishlist='1';
    section.classList.add('tdp-wishlist-v49magic');

    const children=[...section.children];
    const cover=document.createElement('div');
    cover.className='tdp-wishlist-v49-cover';
    cover.setAttribute('role','button');
    cover.setAttribute('tabindex','0');
    cover.setAttribute('aria-expanded','false');
    cover.innerHTML='<span class="tdp-wishlist-v49-kicker">a few little futures, folded away</span><strong>Tap to open a few little futures…</strong><span class="tdp-wishlist-v49-tap">tap to open</span><span class="tdp-wishlist-v49-seal" aria-hidden="true"></span>';

    const stage=document.createElement('div');
    stage.className='tdp-wishlist-v49-stage';
    stage.setAttribute('aria-hidden','true');
    const inner=document.createElement('div');
    inner.className='tdp-wishlist-v49-inner';
    children.forEach(node=>inner.appendChild(node));
    stage.appendChild(inner);
    section.append(cover,stage);

    const label=()=>{
      const open=section.classList.contains('is-open')&&!section.classList.contains('is-closing');
      cover.setAttribute('aria-expanded',open?'true':'false');
      stage.setAttribute('aria-hidden',open?'false':'true');
      const title=cover.querySelector('strong');
      const tap=cover.querySelector('.tdp-wishlist-v49-tap');
      if(title) title.textContent=open?'Tap to close these little futures…':'Tap to open a few little futures…';
      if(tap) tap.textContent=open?'tap to close':'tap to open';
    };

    const open=()=>{
      section.classList.remove('is-closing');
      section.classList.add('is-opening','is-open','magic-burst');
      label();
      requestAnimationFrame(()=>requestAnimationFrame(()=>section.classList.add('is-revealed')));
      setTimeout(()=>section.classList.remove('is-opening','magic-burst'),1200);
      if(window.tdpTrack) window.tdpTrack('wishlist_magic_open');
    };

    const close=()=>{
      section.classList.remove('is-opening','magic-burst','is-revealed');
      section.classList.add('is-closing');
      section.querySelectorAll('.tdp-dreamnote.is-open').forEach(note=>{
        note.classList.remove('is-open');
        const btn=note.querySelector('.tdp-dreamnote-toggle');
        if(btn) btn.setAttribute('aria-expanded','false');
      });
      label();
      setTimeout(()=>{section.classList.remove('is-open','is-closing');label();},780);
      if(window.tdpTrack) window.tdpTrack('wishlist_magic_close');
    };

    const toggle=(e)=>{
      e.preventDefault();
      e.stopPropagation();
      if(section.classList.contains('is-open')&&!section.classList.contains('is-closing')) close();
      else if(!section.classList.contains('is-opening')) open();
    };
    cover.addEventListener('click',toggle,true);
    cover.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ') toggle(e);},true);
    label();
    return true;
  };
  const start=()=>{
    if(mount()) return;
    const mo=new MutationObserver(()=>{if(mount()) mo.disconnect();});
    mo.observe(document.documentElement,{childList:true,subtree:true});
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
})();
