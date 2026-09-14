(()=>{
  const ready=()=>{
    const body=document.body;
    const cards=[...document.querySelectorAll('.verse-card')];
    if(!cards.length){setTimeout(ready,120);return}

    /* Keep the favourite-songs note on the right side of a verse panel. */
    const note=document.querySelector('.memory-note');
    const targetCopy=cards[1]?.querySelector('.verse-copy')||cards[0]?.querySelector('.verse-copy');
    if(note&&targetCopy){
      note.classList.add('favourite-side-note');
      targetCopy.insertBefore(note,targetCopy.firstChild);
    }

    /* A small romantic response area for every verse. */
    const responseKey='theDproject-verse-responses-v1';
    let saved={};
    try{saved=JSON.parse(localStorage.getItem(responseKey)||'{}')}catch{}
    const persistResponses=()=>localStorage.setItem(responseKey,JSON.stringify(saved));

    cards.forEach((card,i)=>{
      const copy=card.querySelector('.verse-copy');
      if(!copy||copy.querySelector('.verse-response'))return;
      const label=card.querySelector('.verse-label-editable')?.textContent?.trim()||('Verse '+(i+1));
      const response=document.createElement('div');
      response.className='verse-response';
      response.innerHTML='<button class="verse-response-toggle" type="button">Want to say something on this</button><div class="verse-response-box"><div class="verse-response-inner"><textarea aria-label="Response for '+label.replace(/"/g,'')+'" placeholder="Leave a little thought here... only if your heart wants to."></textarea><div class="verse-response-meta"><span>Your words stay on this device.</span><span class="response-saved">Saved</span></div></div></div>';
      const btn=response.querySelector('.verse-response-toggle');
      const ta=response.querySelector('textarea');
      const status=response.querySelector('.response-saved');
      ta.value=saved[i]||'';
      btn.addEventListener('click',()=>{
        const open=response.classList.toggle('open');
        btn.textContent=open?'Hide your response':'Want to say something on this';
        if(open)setTimeout(()=>ta.focus(),220);
      });
      let t;
      ta.addEventListener('input',()=>{
        saved[i]=ta.value;persistResponses();
        status.classList.add('show');clearTimeout(t);t=setTimeout(()=>status.classList.remove('show'),1100);
      });
      copy.appendChild(response);
    });

    /* Medical / doctor themed sketches in the letter background. */
    const stethoscope='<svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M48 24v42c0 27 17 45 41 45s41-18 41-45V24" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M34 25c0-9 7-16 16-16M144 25c0-9-7-16-16-16" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M89 111v16c0 22 16 38 36 38 16 0 29-10 34-24" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><circle cx="158" cy="130" r="14" stroke="currentColor" stroke-width="7"/></svg>';
    const heartbeat='<svg viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 48h45l13-24 18 50 20-64 19 38h28l13-22 14 22h40" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    [cards[3],cards[7],cards[9]].filter(Boolean).forEach((card,idx)=>{
      card.classList.add('medical-themed');
      const a=document.createElement('div');a.className='medical-sketch stethoscope';a.innerHTML=stethoscope;
      const b=document.createElement('div');b.className='medical-sketch heartbeat';b.innerHTML=heartbeat;
      if(idx%2){a.style.left='2%';a.style.right='auto';b.style.right='2%';b.style.left='auto'}
      card.append(a,b);
    });

    /* Save is silent/local: no automatic JSON download. Existing editor already auto-saves every change. */
    const download=document.getElementById('downloadEd');if(download)download.style.display='none';
    const copyBtn=document.getElementById('copyEd');if(copyBtn)copyBtn.textContent='Copy changes';
    const panel=document.querySelector('.editor-panel');
    if(panel&&!panel.querySelector('.autosave-status')){
      const s=document.createElement('div');s.className='autosave-status';s.innerHTML='<span class="autosave-dot"></span><span>Auto-save is on</span>';
      panel.prepend(s);
      const noteEl=[...panel.querySelectorAll('.editor-note')].find(x=>x.textContent.includes('downloads a JSON'));
      if(noteEl)noteEl.textContent='Changes are saved automatically in this browser as you edit.';
    }
    document.addEventListener('click',e=>{
      const b=e.target.closest('#saveEd');
      if(!b)return;
      e.preventDefault();e.stopImmediatePropagation();
      const toast=document.querySelector('.save-toast');
      if(toast){toast.textContent='Everything is saved automatically on this device.';toast.classList.add('show');clearTimeout(window.__saveToastTimer);window.__saveToastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
      else{b.textContent='Saved';setTimeout(()=>b.textContent='Save',1000)}
    },true);
  };
  ready();
})();
