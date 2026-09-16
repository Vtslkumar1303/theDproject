(()=>{
  const coverMarkup=()=>{
    const chars=['T','o',',',' ','M','y',' ','m','a','r','c','h'];
    return '<span class="cover-title-text" aria-hidden="true">'+chars.map((ch,i)=>`<span class="cover-letter-v16" style="--i:${i}">${ch}</span>`).join('')+'</span><span class="cover-emoji-v16" aria-hidden="true">🧿</span><span class="cover-emoji-v16 sparkle" aria-hidden="true">✨</span>';
  };

  const patchOpening=()=>{
    const title=document.querySelector('.envelope-cover-title');
    if(title&&!title.dataset.singleTitleFixed){
      title.dataset.singleTitleFixed='1';
      title.setAttribute('aria-label','To, My march 🧿✨');
      title.innerHTML=coverMarkup();
      title.querySelectorAll('.sr-only').forEach(el=>el.remove());
    }
    document.querySelectorAll('.sheet-original-hero h1').forEach(el=>{
      el.textContent='';
      el.style.display='none';
      el.setAttribute('aria-hidden','true');
      el.classList.add('tdp-opening-clone-title');
    });
  };

  const patchFloatingKhat=()=>{
    const btn=document.querySelector('.floating-khat-control');
    if(!btn)return;
    const title=btn.querySelector('.fk-title');
    if(title)title.textContent='Khat';
    btn.querySelectorAll('.fk-sub').forEach(el=>el.remove());
    btn.setAttribute('title','Play / Pause Khat');
  };

  const patchGift=()=>{
    const section=document.getElementById('tdpGiftSection');
    if(!section)return false;
    const btn=section.querySelector('#tdpGiftOpenBtn');
    const box=section.querySelector('#tdpGiftBox');
    const cards=[...section.querySelectorAll('.tdp-gift-photo-card')];

    const syncGiftLabel=()=>{
      if(btn)btn.textContent=section.classList.contains('open')?'Close it':'Open it';
      if(box)box.setAttribute('aria-label',section.classList.contains('open')?'Close the two-photo gift':'Open the two-photo gift');
    };
    syncGiftLabel();

    if(!section.dataset.v16Observed){
      section.dataset.v16Observed='1';
      const classObserver=new MutationObserver(syncGiftLabel);
      classObserver.observe(section,{attributes:true,attributeFilter:['class']});
    }

    cards.forEach(card=>{
      if(card.dataset.v16Interactive)return;
      card.dataset.v16Interactive='1';
      card.tabIndex=0;
      card.setAttribute('role','button');
      card.setAttribute('aria-label','View this gift photo');
      const focus=()=>{
        cards.forEach(c=>{if(c!==card)c.classList.remove('tdp-photo-focus')});
        card.classList.toggle('tdp-photo-focus');
      };
      card.addEventListener('click',e=>{e.stopPropagation();focus();});
      card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();focus();}});
    });

    const video=document.querySelector('.reading-break-card');
    const message=section.querySelector('.tdp-gift-message');
    if(video&&message&&video.previousElementSibling!==message){
      message.insertAdjacentElement('afterend',video);
    }
    return true;
  };

  const run=()=>{
    patchOpening();
    patchFloatingKhat();
    patchGift();
  };

  run();
  let tries=0;
  const timer=setInterval(()=>{
    run();
    tries++;
    if(tries>45)clearInterval(timer);
  },180);
})();
