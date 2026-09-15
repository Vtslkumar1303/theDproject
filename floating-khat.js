(()=>{
  const ready=()=>{
    const audio=document.getElementById('audio');
    if(!audio){setTimeout(ready,120);return;}
    if(document.querySelector('.floating-khat-control'))return;

    const btn=document.createElement('button');
    btn.type='button';
    btn.className='floating-khat-control';
    btn.setAttribute('aria-label','Play Khat');
    btn.setAttribute('title','Play / Pause Khat');
    btn.dataset.state=audio.paused?'paused':'playing';
    btn.innerHTML='<span class="fk-icon" aria-hidden="true"></span>';
    document.body.appendChild(btn);

    const sync=()=>{
      const playing=!audio.paused&&!audio.ended;
      btn.dataset.state=playing?'playing':'paused';
      btn.setAttribute('aria-label',playing?'Pause Khat':'Play Khat');
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
  };
  ready();
})();
