(()=>{
  const ready=()=>{
    const wrap=document.querySelector('.verse-list');
    const cards=[...document.querySelectorAll('.verse-card')];
    if(!wrap||!cards.length){setTimeout(ready,120);return}

    [...document.querySelectorAll('div,section,article,aside')].forEach(el=>{
      const t=(el.textContent||'').replace(/\s+/g,' ').trim();
      if(t.includes('Doctor in the story')&&t.includes('always caring, healing and on call')){
        const card=el.closest('.memory-note,.side-note,.note-card,.doctor-note-card')||el;
        if(card!==document.body&&!card.classList.contains('verse-card'))card.remove();
      }
    });

    let stage=document.querySelector('.verse-stage');
    let rail=document.querySelector('.verse-side-rail');
    if(!stage){stage=document.createElement('div');stage.className='verse-stage';wrap.parentNode.insertBefore(stage,wrap);stage.appendChild(wrap)}
    if(!rail){rail=document.createElement('aside');rail.className='verse-side-rail';rail.setAttribute('aria-label','Little extras beside the letter');stage.appendChild(rail)}

    stage.querySelectorAll('.tdp-bg-decor').forEach(el=>el.remove());
    wrap.querySelectorAll('img,.decor,.side-object,.scrapbook-png,.bouquet-cluster,.cassette-scene,.vinyl').forEach(el=>el.remove());

    const isFavNote=el=>{
      if(!el)return false;
      if(el.classList.contains('memory-note')||el.classList.contains('favourite-side-note'))return true;
      const t=(el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
      return t.startsWith('her favourite songs')||t.startsWith('her favorite songs')||t.startsWith('songs that quietly sound like you');
    };
    const reconcileFavouriteNote=()=>{
      const all=[...document.querySelectorAll('div,section,article,aside')].filter(isFavNote);
      if(!all.length)return;
      const original=all.find(el=>el.classList.contains('memory-note'))||all[0];
      original.classList.add('memory-note','favourite-side-note');
      const heading=original.querySelector('h3');
      if(heading)heading.textContent='Songs that quietly sound like you';
      let sub=original.querySelector('.side-note-small');
      if(!sub){sub=document.createElement('span');sub.className='side-note-small';original.appendChild(sub)}
      sub.textContent='A few melodies my heart somehow keeps placing beside your name.';
      if(original.parentElement!==rail)rail.insertBefore(original,rail.firstChild);
      all.forEach(el=>{if(el!==original)el.remove()});
    };
    reconcileFavouriteNote();setTimeout(reconcileFavouriteNote,250);setTimeout(reconcileFavouriteNote,900);

    let video=rail.querySelector('.video-break-card');
    if(!video){
      video=document.createElement('section');video.className='video-break-card';
      video.innerHTML='<h3>A little video break</h3><p>For whenever this letter feels a little too long.</p><div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/l6E16JAk_Fs?rel=0" title="A little video break" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="video-caption">Press play, stay for a song, then come back whenever you want.</div>';
      rail.appendChild(video);
    }

    const responseKey='theDproject-verse-responses-v2';
    let saved={};try{saved=JSON.parse(localStorage.getItem(responseKey)||'{}')}catch{}
    cards.forEach((card,i)=>{
      if(card.querySelector('.verse-response'))return;
      const target=card.querySelector('.verse-copy,.verse-body,.verse-content')||card;
      const title=(card.querySelector('h2')?.textContent||('Verse '+(i+1))).trim();
      const box=document.createElement('div');box.className='verse-response';
      box.innerHTML='<button class="verse-response-toggle" type="button"><span class="response-toggle-kicker">A tiny place just for you</span><span class="response-toggle-main">Leave a little piece of your heart here</span><span class="response-toggle-hint">Tap to open</span></button><div class="verse-response-box"><div class="verse-response-inner"><label class="verse-response-label">If this verse made you pause, smile, overthink, or feel anything at all, you can leave a little note here.</label><textarea maxlength="1500" placeholder="Write something sweet, shy, honest, random... anything that feels like you."></textarea><div class="verse-response-actions"><div class="verse-response-meta"><span>Your words stay gently saved here.</span><span class="response-saved">Saved</span><span class="verse-submit-state"></span></div><button class="verse-submit" type="button">Send this little note</button></div></div></div>';
      const toggle=box.querySelector('.verse-response-toggle'),ta=box.querySelector('textarea'),submit=box.querySelector('.verse-submit'),state=box.querySelector('.verse-submit-state'),savedTag=box.querySelector('.response-saved');
      ta.value=saved[i]||'';
      const setToggle=open=>{
        toggle.classList.toggle('is-open',open);
        toggle.querySelector('.response-toggle-kicker').textContent=open?'Your little corner is open':'A tiny place just for you';
        toggle.querySelector('.response-toggle-main').textContent=open?'Write whatever your heart wants to say':'Leave a little piece of your heart here';
        toggle.querySelector('.response-toggle-hint').textContent=open?'Tap to hide':'Tap to open';
      };
      toggle.addEventListener('click',()=>{const open=box.classList.toggle('open');setToggle(open);if(open)setTimeout(()=>ta.focus(),220)});
      ta.addEventListener('input',()=>{saved[i]=ta.value;localStorage.setItem(responseKey,JSON.stringify(saved));savedTag.classList.add('show');clearTimeout(ta.__savedTimer);ta.__savedTimer=setTimeout(()=>savedTag.classList.remove('show'),1100)});
      submit.addEventListener('click',async()=>{
        const value=ta.value.trim();if(!value){state.textContent='Write a little something first.';ta.focus();return}
        submit.disabled=true;state.textContent='Sending your note...';
        try{
          const fd=new FormData();fd.append('_subject','The D Project — '+title+' response');fd.append('Verse',title);fd.append('Response',value);fd.append('_captcha','false');
          const r=await fetch('https://formsubmit.co/ajax/vtslpatel2113@gmail.com',{method:'POST',headers:{Accept:'application/json'},body:fd});
          if(!r.ok)throw new Error('send failed');
          saved[i]=value;localStorage.setItem(responseKey,JSON.stringify(saved));savedTag.classList.add('show');state.textContent='Your little note found its way.';setTimeout(()=>savedTag.classList.remove('show'),1800);
        }catch(e){state.textContent='Could not send it just yet. Please try once more.'}
        finally{submit.disabled=false}
      });
      target.appendChild(box);
    });

    const burst=card=>{
      card.classList.remove('magic-open');void card.offsetWidth;card.classList.add('magic-open');clearTimeout(card.__magicTimer);card.__magicTimer=setTimeout(()=>card.classList.remove('magic-open'),1150);
      card.querySelector('.magic-spark-layer')?.remove();const layer=document.createElement('div');layer.className='magic-spark-layer';
      for(let i=0;i<20;i++){const s=document.createElement('i');s.className='magic-spark';s.style.left=(38+Math.random()*24)+'%';s.style.top=(8+Math.random()*28)+'%';s.style.setProperty('--dx',((Math.random()*220)-110)+'px');s.style.setProperty('--dy',((Math.random()*150)-45)+'px');s.style.animationDelay=(Math.random()*.16)+'s';layer.appendChild(s)}
      card.appendChild(layer);setTimeout(()=>layer.remove(),1150);
    };
    cards.forEach(card=>{if(card.dataset.magicBound)return;card.dataset.magicBound='1';const trigger=card.querySelector('.verse-toggle,.verse-expander');if(trigger)trigger.addEventListener('click',()=>setTimeout(()=>{if(card.classList.contains('open'))burst(card)},80))});

    const download=document.getElementById('downloadEd');if(download)download.style.display='none';
    const panel=document.querySelector('.editor-panel');if(panel&&!panel.querySelector('.autosave-status')){const s=document.createElement('div');s.className='autosave-status';s.innerHTML='<span class="autosave-dot"></span><span>Auto-save is on</span>';panel.prepend(s)}
  };
  ready();
})();
