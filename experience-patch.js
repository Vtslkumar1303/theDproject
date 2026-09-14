(()=>{
  const ready=()=>{
    const wrap=document.querySelector('.verse-list');
    const cards=[...document.querySelectorAll('.verse-card')];
    if(!wrap||!cards.length){setTimeout(ready,120);return}

    /* Build a visible right-side rail beside the centered verse list. */
    let stage=document.querySelector('.verse-stage');
    let rail=document.querySelector('.verse-side-rail');
    if(!stage){
      stage=document.createElement('div');
      stage.className='verse-stage';
      wrap.parentNode.insertBefore(stage,wrap);
      stage.appendChild(wrap);
    }
    if(!rail){
      rail=document.createElement('aside');
      rail.className='verse-side-rail';
      rail.setAttribute('aria-label','Little extras beside the letter');
      stage.appendChild(rail);
    }

    /* Pinned favourite songs note. Keep it outside every verse. */
    let note=rail.querySelector('.favourite-side-note');
    if(!note){
      note=document.createElement('section');
      note.className='favourite-side-note';
      note.innerHTML='<h3>Her Favourite Songs</h3><ul><li>Khat — Navjot Ahuja</li><li>Maahiya</li><li>Ilahi</li><li>Iktara</li><li>Ranjha</li><li>Phir Le Aaya Dil</li></ul><span class="side-note-small">Pinned quietly beside the verses.</span>';
      rail.appendChild(note);
    }

    /* Video panel beside the verses. */
    let video=rail.querySelector('.video-break-card');
    if(!video){
      video=document.createElement('section');
      video.className='video-break-card';
      video.innerHTML='<h3>A little video break</h3><p>For whenever this letter feels a little too long.</p><div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/l6E16JAk_Fs?rel=0" title="A little video break" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="video-caption">Press play, stay for a song, then come back whenever you want.</div>';
      rail.appendChild(video);
    }

    /* Magical visual burst whenever a verse is expanded. */
    const burst=card=>{
      card.classList.remove('magic-open');
      void card.offsetWidth;
      card.classList.add('magic-open');
      clearTimeout(card.__magicTimer);
      card.__magicTimer=setTimeout(()=>card.classList.remove('magic-open'),1150);

      const old=card.querySelector('.magic-spark-layer');
      if(old)old.remove();
      const layer=document.createElement('div');
      layer.className='magic-spark-layer';
      for(let i=0;i<16;i++){
        const s=document.createElement('i');
        s.className='magic-spark';
        s.style.left=(40+Math.random()*20)+'%';
        s.style.top=(10+Math.random()*22)+'%';
        s.style.setProperty('--dx',((Math.random()*190)-95)+'px');
        s.style.setProperty('--dy',((Math.random()*120)-35)+'px');
        s.style.animationDelay=(Math.random()*.15)+'s';
        layer.appendChild(s);
      }
      card.appendChild(layer);
      setTimeout(()=>layer.remove(),1100);
    };

    cards.forEach(card=>{
      if(card.dataset.magicBound)return;
      card.dataset.magicBound='1';
      const trigger=card.querySelector('.verse-toggle,.verse-expander');
      if(trigger){
        trigger.addEventListener('click',()=>{
          setTimeout(()=>{if(card.classList.contains('open'))burst(card)},80);
        });
      }
    });

    /* Preserve prior editor preference: save locally, no automatic JSON download. */
    const download=document.getElementById('downloadEd');
    if(download)download.style.display='none';
    const panel=document.querySelector('.editor-panel');
    if(panel&&!panel.querySelector('.autosave-status')){
      const s=document.createElement('div');
      s.className='autosave-status';
      s.innerHTML='<span class="autosave-dot"></span><span>Auto-save is on</span>';
      panel.prepend(s);
      const noteEl=[...panel.querySelectorAll('.editor-note')].find(x=>/downloads a JSON/i.test(x.textContent||''));
      if(noteEl)noteEl.textContent='Changes are saved automatically in this browser as you edit.';
    }
    document.addEventListener('click',e=>{
      const b=e.target.closest('#saveEd');
      if(!b)return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const toast=document.querySelector('.save-toast');
      if(toast){
        toast.textContent='Everything is saved automatically on this device.';
        toast.classList.add('show');
        clearTimeout(window.__saveToastTimer);
        window.__saveToastTimer=setTimeout(()=>toast.classList.remove('show'),2200);
      }else{
        const old=b.textContent;
        b.textContent='Saved';
        setTimeout(()=>b.textContent=old||'Save',1000);
      }
    },true);
  };
  ready();
})();
