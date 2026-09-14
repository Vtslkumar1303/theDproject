(()=>{
  const ready=()=>{
    const wrap=document.querySelector('.verse-list');
    const cards=[...document.querySelectorAll('.verse-card')];
    if(!wrap||!cards.length){setTimeout(ready,120);return}

    /* Remove the old screenshot-like Doctor in the story card. */
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

    const isFavNote=el=>{
      if(!el)return false;
      if(el.classList.contains('memory-note')||el.classList.contains('favourite-side-note'))return true;
      const t=(el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
      return t.startsWith('her favourite songs')||t.startsWith('her favorite songs');
    };
    const reconcileFavouriteNote=()=>{
      const all=[...document.querySelectorAll('div,section,article,aside')].filter(isFavNote);
      if(!all.length)return;
      const original=all.find(el=>el.classList.contains('memory-note'))||all[0];
      original.classList.add('memory-note','favourite-side-note');
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

    /* Doctor/medical sketches and sunflower bouquets live behind the centered letter, not in a card. */
    if(!stage.querySelector('.tdp-stethoscope')){
      const st=document.createElement('div');st.className='tdp-bg-decor tdp-stethoscope';
      st.innerHTML='<svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M55 26v55c0 36 22 61 53 61s53-25 53-61V26" stroke="#6f554c" stroke-width="8" stroke-linecap="round"/><path d="M38 28c0-12 9-21 21-21M178 28c0-12-9-21-21-21" stroke="#6f554c" stroke-width="8" stroke-linecap="round"/><path d="M108 142v18c0 30 21 51 48 51 21 0 39-14 45-34" stroke="#6f554c" stroke-width="8" stroke-linecap="round"/><circle cx="199" cy="164" r="17" stroke="#6f554c" stroke-width="8"/></svg>';
      const ecg=document.createElement('div');ecg.className='tdp-bg-decor tdp-ecg';ecg.innerHTML='<svg viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 48h50l14-26 21 54 24-69 21 41h31l14-23 17 23h62" stroke="#8a675a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      const cross=document.createElement('div');cross.className='tdp-bg-decor tdp-med-cross';cross.innerHTML='<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M37 8h26v29h29v26H63v29H37V63H8V37h29z" fill="#9a7467"/></svg>';
      const bouquetSvg='<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="p"><stop offset="0" stop-color="#6e4019"/><stop offset=".45" stop-color="#8d5a21"/><stop offset="1" stop-color="#3f2a17"/></radialGradient><linearGradient id="pet" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffd95d"/><stop offset=".55" stop-color="#e5a91f"/><stop offset="1" stop-color="#b87310"/></linearGradient><linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#55773b"/><stop offset="1" stop-color="#29472d"/></linearGradient></defs><g stroke="#355031" stroke-width="4" stroke-linecap="round"><path d="M112 112L103 238"/><path d="M75 139L106 240"/><path d="M154 145L110 242"/></g><g fill="url(#leaf)"><ellipse cx="91" cy="171" rx="16" ry="38" transform="rotate(-38 91 171)"/><ellipse cx="130" cy="188" rx="15" ry="35" transform="rotate(35 130 188)"/><ellipse cx="78" cy="207" rx="13" ry="30" transform="rotate(-52 78 207)"/></g><g transform="translate(112 78)"><g fill="url(#pet)">';
      let petals='';for(let i=0;i<18;i++)petals+='<ellipse cx="0" cy="-39" rx="10" ry="31" transform="rotate('+(i*20)+')"/>';
      const flower1=bouquetSvg+petals+'</g><circle r="28" fill="url(#p)"/></g><g transform="translate(62 120) scale(.78)"><g fill="url(#pet)">'+petals+'</g><circle r="28" fill="url(#p)"/></g><g transform="translate(161 128) scale(.72)"><g fill="url(#pet)">'+petals+'</g><circle r="28" fill="url(#p)"/></g><path d="M71 224 Q110 255 151 224 L139 260 H84z" fill="#d8c09b" opacity=".9"/><path d="M103 232q12 18 24 0" stroke="#9a6952" stroke-width="5" fill="none"/></svg>';
      const b1=document.createElement('div');b1.className='tdp-bg-decor tdp-sunflower-bouquet';b1.innerHTML=flower1;
      const b2=document.createElement('div');b2.className='tdp-bg-decor tdp-sunflower-bouquet second';b2.innerHTML=flower1;
      stage.append(st,ecg,cross,b1,b2);
    }

    /* Cute response box for every verse; Submit sends to the configured email and stores locally. */
    const responseKey='theDproject-verse-responses-v2';
    let saved={};try{saved=JSON.parse(localStorage.getItem(responseKey)||'{}')}catch{}
    cards.forEach((card,i)=>{
      if(card.querySelector('.verse-response'))return;
      const target=card.querySelector('.verse-copy,.verse-body,.verse-content')||card;
      const title=(card.querySelector('h2')?.textContent||('Verse '+(i+1))).trim();
      const box=document.createElement('div');box.className='verse-response';
      box.innerHTML='<button class="verse-response-toggle" type="button">Want to say something on this</button><div class="verse-response-box"><div class="verse-response-inner"><textarea maxlength="1500" placeholder="Leave a little thought here... only if your heart wants to."></textarea><div class="verse-response-actions"><div class="verse-response-meta"><span>Your words are safe here.</span><span class="response-saved">Saved</span><span class="verse-submit-state"></span></div><button class="verse-submit" type="button">Submit this thought</button></div></div></div>';
      const toggle=box.querySelector('.verse-response-toggle'),ta=box.querySelector('textarea'),submit=box.querySelector('.verse-submit'),state=box.querySelector('.verse-submit-state'),savedTag=box.querySelector('.response-saved');
      ta.value=saved[i]||'';
      toggle.addEventListener('click',()=>{const open=box.classList.toggle('open');toggle.textContent=open?'Hide your response':'Want to say something on this';if(open)setTimeout(()=>ta.focus(),220)});
      submit.addEventListener('click',async()=>{
        const value=ta.value.trim();if(!value){state.textContent='Write something first.';ta.focus();return}
        submit.disabled=true;state.textContent='Sending...';
        try{
          const fd=new FormData();fd.append('_subject','The D Project — '+title+' response');fd.append('Verse',title);fd.append('Response',value);fd.append('_captcha','false');
          const r=await fetch('https://formsubmit.co/ajax/vtslpatel2113@gmail.com',{method:'POST',headers:{Accept:'application/json'},body:fd});
          if(!r.ok)throw new Error('send failed');
          saved[i]=value;localStorage.setItem(responseKey,JSON.stringify(saved));savedTag.classList.add('show');state.textContent='Sent.';setTimeout(()=>savedTag.classList.remove('show'),1800);
        }catch(e){state.textContent='Could not send. Please try again.'}
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
