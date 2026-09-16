(()=>{
  const POS_KEY='tdp-khat-floating-position-v1';

  const removeEditorUI=()=>{
    document.body?.classList.remove('live-editing');
    document.querySelectorAll('.live-editor-toggle,.editor-panel,.sel-ui,.move-handle,.resize-handle,.sel-label').forEach(el=>el.remove());
    document.querySelectorAll('[contenteditable="true"]').forEach(el=>el.removeAttribute('contenteditable'));
    document.querySelectorAll('[data-selected]').forEach(el=>el.removeAttribute('data-selected'));
  };

  const ready=()=>{
    removeEditorUI();
    const audio=document.getElementById('audio');
    if(!audio){setTimeout(ready,120);return;}
    if(document.querySelector('.floating-khat-control'))return;

    const btn=document.createElement('button');
    btn.type='button';
    btn.className='floating-khat-control';
    btn.setAttribute('aria-label','Play Khat');
    btn.setAttribute('title','Play / Pause Khat — drag to move');
    btn.dataset.state=audio.paused?'paused':'playing';
    btn.innerHTML='<span class="fk-icon" aria-hidden="true"></span><span class="fk-copy"><span class="fk-title">Khat</span></span>';
    document.body.appendChild(btn);

    const sync=()=>{
      const playing=!audio.paused&&!audio.ended;
      btn.dataset.state=playing?'playing':'paused';
      btn.setAttribute('aria-label',playing?'Pause Khat':'Play Khat');
    };

    const clamp=(v,min,max)=>Math.min(Math.max(v,min),max);
    const applyPosition=(x,y)=>{
      const margin=6;
      const maxX=Math.max(margin,window.innerWidth-btn.offsetWidth-margin);
      const maxY=Math.max(margin,window.innerHeight-btn.offsetHeight-margin);
      const nx=clamp(x,margin,maxX);
      const ny=clamp(y,margin,maxY);
      btn.classList.add('fk-dragged');
      btn.style.setProperty('left',nx+'px','important');
      btn.style.setProperty('top',ny+'px','important');
      btn.style.setProperty('right','auto','important');
      btn.style.setProperty('bottom','auto','important');
      btn.style.setProperty('transform','none','important');
      return {x:nx,y:ny};
    };

    let drag=null;
    let dragged=false;
    let suppressClick=false;

    btn.addEventListener('pointerdown',e=>{
      if(e.button!==undefined&&e.button!==0)return;
      const r=btn.getBoundingClientRect();
      drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,left:r.left,top:r.top};
      dragged=false;
      try{btn.setPointerCapture(e.pointerId);}catch(err){}
    });

    btn.addEventListener('pointermove',e=>{
      if(!drag||e.pointerId!==drag.id)return;
      const dx=e.clientX-drag.startX;
      const dy=e.clientY-drag.startY;
      if(!dragged&&Math.hypot(dx,dy)<5)return;
      dragged=true;
      btn.classList.add('fk-dragging');
      applyPosition(drag.left+dx,drag.top+dy);
      e.preventDefault();
    });

    const finishDrag=e=>{
      if(!drag||e.pointerId!==drag.id)return;
      if(dragged){
        const r=btn.getBoundingClientRect();
        const p=applyPosition(r.left,r.top);
        try{localStorage.setItem(POS_KEY,JSON.stringify(p));}catch(err){}
        suppressClick=true;
        setTimeout(()=>{suppressClick=false;},0);
      }
      btn.classList.remove('fk-dragging');
      try{btn.releasePointerCapture(e.pointerId);}catch(err){}
      drag=null;
    };

    btn.addEventListener('pointerup',finishDrag);
    btn.addEventListener('pointercancel',finishDrag);

    btn.addEventListener('click',async e=>{
      if(suppressClick){e.preventDefault();e.stopPropagation();return;}
      try{
        if(audio.paused||audio.ended){await audio.play();}
        else{audio.pause();}
      }catch(err){}
      sync();
    });

    try{
      const saved=JSON.parse(localStorage.getItem(POS_KEY)||'null');
      if(saved&&Number.isFinite(saved.x)&&Number.isFinite(saved.y)){
        requestAnimationFrame(()=>applyPosition(saved.x,saved.y));
      }
    }catch(err){}

    window.addEventListener('resize',()=>{
      if(!btn.classList.contains('fk-dragged'))return;
      const r=btn.getBoundingClientRect();
      const p=applyPosition(r.left,r.top);
      try{localStorage.setItem(POS_KEY,JSON.stringify(p));}catch(err){}
    },{passive:true});

    ['play','pause','ended','loadedmetadata'].forEach(ev=>audio.addEventListener(ev,sync));
    sync();

    const observer=new MutationObserver(()=>removeEditorUI());
    observer.observe(document.body,{childList:true,subtree:true});
    setTimeout(()=>observer.disconnect(),5000);
  };
  ready();
})();
