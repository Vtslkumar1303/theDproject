(()=>{
  const coverMarkup=()=>{
    const chars=['T','o',',',' ','M','y',' ','M','a','r','c','h'];
    return '<span class="cover-title-text" aria-hidden="true">'+chars.map((ch,i)=>`<span class="cover-letter-v16" style="--i:${i}">${ch}</span>`).join('')+'</span><span class="cover-charm-thread" aria-hidden="true"></span><span class="cover-symbol-eye" aria-hidden="true"><i class="eye-white"></i><i class="eye-blue"></i><i class="eye-pupil"></i><i class="eye-glint"></i></span><span class="cover-symbol-sparkle" aria-hidden="true"><i></i><b></b></span>';
  };

  const patchOpening=()=>{
    const title=document.querySelector('.envelope-cover-title');
    if(title&&!title.dataset.realisticSymbols){
      title.dataset.realisticSymbols='1';
      title.setAttribute('aria-label','To, My March');
      title.innerHTML=coverMarkup();
      title.querySelectorAll('.sr-only,.cover-emoji,.cover-emoji-v16').forEach(el=>el.remove());
    }
    const envelope=document.querySelector('.real-envelope');
    if(envelope&&!envelope.querySelector('.confession-envelope-thread')){
      const thread=document.createElement('div');
      thread.className='confession-envelope-thread';
      thread.setAttribute('aria-hidden','true');
      thread.innerHTML='<span class="confession-thread-border"></span><span class="confession-thread-loop loop-left"></span><span class="confession-thread-loop loop-right"></span><span class="confession-thread-knot"></span>';
      envelope.appendChild(thread);
    }
    document.querySelectorAll('.sheet-original-hero h1').forEach(el=>{
      el.textContent='To, My March';
      el.style.removeProperty('display');
      el.removeAttribute('aria-hidden');
      el.classList.add('tdp-opening-clone-title');
    });
    document.querySelectorAll('main .hero h1').forEach(el=>{el.textContent='To, My March'});
    document.querySelectorAll('main .hero .subtitle,.sheet-original-hero .subtitle').forEach(el=>{
      el.textContent='Maybe sharing March was only the first coincidence.';
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
      if(box)box.setAttribute('aria-label',section.classList.contains('open')?'Close the gift':'Open the gift');
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
    if(video){
      video.classList.add('tdp-separated-video');
      if(video.previousElementSibling!==section){
        section.insertAdjacentElement('afterend',video);
      }
    }
    return true;
  };

  const run=()=>{
    document.title='To, My March';
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
