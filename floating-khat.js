(()=>{
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
    btn.setAttribute('aria-label','Play Khat background song');
    btn.setAttribute('title','Play / Pause Khat');
    btn.dataset.state=audio.paused?'paused':'playing';
    btn.innerHTML='<span class="fk-icon" aria-hidden="true"></span><span class="fk-copy"><span class="fk-title">Khat ♫</span><span class="fk-sub">bg song</span></span>';
    document.body.appendChild(btn);

    const sync=()=>{
      const playing=!audio.paused&&!audio.ended;
      btn.dataset.state=playing?'playing':'paused';
      btn.setAttribute('aria-label',playing?'Pause Khat background song':'Play Khat background song');
      const sub=btn.querySelector('.fk-sub');
      if(sub)sub.textContent=playing?'playing softly':'bg song';
    };

    btn.addEventListener('click',async()=>{
      try{
        if(audio.paused||audio.ended){await audio.play();}
        else{audio.pause();}
      }catch(e){}
      sync();
    });

    ['play','pause','ended','loadedmetadata'].forEach(ev=>audio.addEventListener(ev,sync));
    sync();

    const observer=new MutationObserver(()=>removeEditorUI());
    observer.observe(document.body,{childList:true,subtree:true});
    setTimeout(()=>observer.disconnect(),5000);
  };
  ready();
})();