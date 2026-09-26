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
      return t.startsWith('her favourite songs')||t.startsWith('her favorite songs')||t.startsWith('songs that quietly sound like you')||t.startsWith('a little soundtrack i won’t explain')||t.startsWith("a little soundtrack i won't explain");
    };
    const reconcileFavouriteNote=()=>{
      const all=[...document.querySelectorAll('div,section,article,aside')].filter(isFavNote);
      if(!all.length)return;
      const original=all.find(el=>el.classList.contains('memory-note'))||all[0];
      original.classList.add('memory-note','favourite-side-note');
      const heading=original.querySelector('h3');
      if(heading)heading.textContent='A little soundtrack I won’t explain';
      let sub=original.querySelector('.side-note-small');
      if(!sub){sub=document.createElement('span');sub.className='side-note-small';original.appendChild(sub)}
      sub.textContent='Some songs just started sounding like you. I kept the reason to myself.';
      if(original.parentElement!==rail)rail.insertBefore(original,rail.firstChild);
      all.forEach(el=>{if(el!==original)el.remove()});
    };
    reconcileFavouriteNote();setTimeout(reconcileFavouriteNote,250);setTimeout(reconcileFavouriteNote,900);

    /* A real little reading break, placed between verses so it is useful on desktop and phone. */
    rail.querySelectorAll('.video-break-card').forEach(el=>el.remove());
    let readingBreak=wrap.querySelector('.reading-break-card');
    if(!readingBreak&&cards.length){
      readingBreak=document.createElement('section');
      readingBreak.className='reading-break-card';
      readingBreak.innerHTML='<div class="reading-break-kicker">For when these words get a little too much</div><h3>A tiny pause from the letter</h3><p>Take a minute here if you get bored of reading. The next verse will wait for you.</p><div class="reading-break-frame"><video class="reading-break-video" controls playsinline preload="metadata"><source src="https://the-d-project-media.floot.app/_cdn/static/43648f0a-2d6d-44d0-afe1-e7c20249ef5d-reading-break-hq-replacement.mp4" type="video/mp4">Your browser could not play this little video break.</video></div><div class="reading-break-caption">Stay here for a while. Come back whenever you feel like reading me again.</div>';
      const anchor=cards[Math.min(2,cards.length-1)];
      anchor.insertAdjacentElement('afterend',readingBreak);
    }

    const responseKey='theDproject-verse-responses-v2';
    let saved={};try{saved=JSON.parse(localStorage.getItem(responseKey)||'{}')}catch{}
    cards.forEach((card,i)=>{
      if(card.querySelector('.verse-response'))return;
      const target=card.querySelector('.verse-copy,.verse-body,.verse-content')||card;
      const title=(card.querySelector('h2')?.textContent||('Verse '+(i+1))).trim();
      const verseText=(target.innerText||target.textContent||'').replace(/\n{3,}/g,'\n\n').trim();
      const verseTextMapKey='theDproject-verse-text-map-v1';
      try{
        const verseMap=JSON.parse(localStorage.getItem(verseTextMapKey)||'{}')||{};
        verseMap[i+1]={title,text:verseText};
        localStorage.setItem(verseTextMapKey,JSON.stringify(verseMap));
      }catch(e){}
      const box=document.createElement('div');box.className='verse-response';
      box.innerHTML='<button class="verse-response-toggle" type="button"><span class="response-toggle-kicker">A tiny corner that belongs to you</span><span class="response-toggle-main">Leave a little piece of your heart here</span><span class="response-toggle-hint">Open softly</span></button><div class="verse-response-box"><div class="verse-response-inner"><label class="verse-response-label">If this verse made you pause, smile, overthink, or feel anything at all, leave a tiny thought here. It can be sweet, shy, silly, honest — just yours.</label><textarea maxlength="1500" placeholder="Tell me the thought you almost kept to yourself..."></textarea><div class="verse-response-actions"><div class="verse-response-meta"><span>Take your time — this little corner is yours.</span><span class="response-saved">Still here ✨</span><span class="verse-submit-state"></span></div><button class="verse-submit" type="button">Leave this little note</button></div></div></div>';
      const toggle=box.querySelector('.verse-response-toggle'),ta=box.querySelector('textarea'),submit=box.querySelector('.verse-submit'),state=box.querySelector('.verse-submit-state'),savedTag=box.querySelector('.response-saved');
      ta.value=saved[i]||'';
      const setToggle=open=>{
        toggle.classList.toggle('is-open',open);
        toggle.querySelector('.response-toggle-kicker').textContent=open?'Your little corner is open':'A tiny corner that belongs to you';
        toggle.querySelector('.response-toggle-main').textContent=open?'Say the thing your heart almost kept quiet':'Leave a little piece of your heart here';
        toggle.querySelector('.response-toggle-hint').textContent=open?'Close gently':'Open softly';
      };
      toggle.addEventListener('click',()=>{const open=box.classList.toggle('open');setToggle(open);if(open)setTimeout(()=>ta.focus(),220)});
      ta.addEventListener('input',()=>{saved[i]=ta.value;localStorage.setItem(responseKey,JSON.stringify(saved));savedTag.classList.add('show');clearTimeout(ta.__savedTimer);ta.__savedTimer=setTimeout(()=>savedTag.classList.remove('show'),1100)});
      submit.addEventListener('click',()=>{
        const value=ta.value.trim();if(!value){state.textContent='Leave me at least one tiny thought first.';ta.focus();return}
        submit.disabled=true;
        state.textContent='Just a second… ✨';
        try{
          const logKey='theDproject-verse-response-logs-v1';
          let logs=[];try{logs=JSON.parse(localStorage.getItem(logKey)||'[]');if(!Array.isArray(logs))logs=[]}catch(e){logs=[]}
          const entry={
            id:(crypto?.randomUUID?.()||('resp_'+Date.now()+'_'+Math.random().toString(36).slice(2))),
            verse_index:i+1,
            verse_title:title,
            verse_text:verseText,
            response:value,
            submitted_at:new Date().toISOString()
          };
          logs.push(entry);
          localStorage.setItem(logKey,JSON.stringify(logs));
          saved[i]=value;
          localStorage.setItem(responseKey,JSON.stringify(saved));
          savedTag.classList.add('show');
          state.textContent='And just like that… your little thought found its quiet corner. ✨';
          if(window.tdpTrack)window.tdpTrack('verse_response_submitted',{section:'verse_response',event_value:title,meta:{verse_index:i+1,response_id:entry.id}});
          setTimeout(()=>savedTag.classList.remove('show'),1800);
        }catch(e){
          state.textContent='This little note slipped away for a second — try once more.';
        }finally{
          submit.disabled=false;
        }
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
