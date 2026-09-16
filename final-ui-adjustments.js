(()=>{
  // Composite completed head artwork as a transparent PNG for the page.
  // Large neutral backdrop regions are removed; small eye/glasses highlights remain.
  const renderCompletedFace=face=>{
    face.style.opacity='0';
    face.addEventListener('load',()=>{
      if(face.dataset.completedCutout)return;
      face.dataset.completedCutout='1';
      try{
        const canvas=document.createElement('canvas');
        const scale=Math.min(1,512/face.naturalWidth);
        canvas.width=Math.round(face.naturalWidth*scale);
        canvas.height=Math.round(face.naturalHeight*scale);
        const context=canvas.getContext('2d',{willReadFrequently:true});
        context.drawImage(face,0,0,canvas.width,canvas.height);
        const pixels=context.getImageData(0,0,canvas.width,canvas.height);
        const data=pixels.data,w=canvas.width,h=canvas.height,n=w*h;
        const candidate=new Uint8Array(n),seen=new Uint8Array(n);
        const queue=new Int32Array(n);
        for(let i=0;i<n;i++){
          const p=i*4,lo=Math.min(data[p],data[p+1],data[p+2]);
          const hi=Math.max(data[p],data[p+1],data[p+2]);
          if(lo>180&&hi-lo<18)candidate[i]=1;
        }
        for(let start=0;start<n;start++){
          if(!candidate[start]||seen[start])continue;
          let head=0,tail=1;queue[0]=start;seen[start]=1;
          while(head<tail){
            const i=queue[head++],x=i%w;
            const add=j=>{if(j>=0&&j<n&&candidate[j]&&!seen[j]){seen[j]=1;queue[tail++]=j;}};
            if(x>0)add(i-1);if(x<w-1)add(i+1);add(i-w);add(i+w);
          }
          if(tail>64)for(let j=0;j<tail;j++)data[queue[j]*4+3]=0;
        }
        context.putImageData(pixels,0,0);
        face.src=canvas.toDataURL('image/png');
        face.style.opacity='1';
      }catch(error){face.style.opacity='0';console.error('Face cutout could not be rendered',error);}
    });
  };

  const coverMarkup=()=>{
    const chars=['T','o',',',' ','M','y',' ','M','a','r','c','h'];
    return '<span class="cover-title-text" aria-hidden="true">'+chars.map((ch,i)=>`<span class="cover-letter-v16" style="--i:${i}">${ch}</span>`).join('')+'</span><span class="cover-native-eye" aria-hidden="true">🧿</span><span class="cover-symbol-sparkle" aria-hidden="true"><i></i><b></b></span>';
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
    if(envelope&&!envelope.querySelector('.envelope-crafted-note')){
      const note=document.createElement('p');
      note.className='envelope-crafted-note';
      note.textContent='Crafted somewhere between thoughts, feelings, and too many drafts.';
      envelope.appendChild(note);
    }
    document.querySelectorAll('.sheet-original-hero h1').forEach(el=>{
      el.textContent='To, My March';
      el.style.removeProperty('display');
      el.removeAttribute('aria-hidden');
      el.classList.add('tdp-opening-clone-title');
    });
    document.querySelectorAll('main .hero h1').forEach(el=>{
      if(el.dataset.inlineNazar)return;
      const charm=el.closest('.hero').querySelector('.hero-nazar');
      el.textContent='';
      const words=document.createElement('span');
      words.className='confession-title-words';
      words.textContent='To, My March';
      el.appendChild(words);
      if(charm){charm.removeAttribute('style');charm.setAttribute('aria-hidden','true');el.appendChild(charm)}
      el.dataset.inlineNazar='1';
    });
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
    const box=section.querySelector('#tdpGiftBox');
    const cards=[...section.querySelectorAll('.tdp-gift-photo-card')];

    const syncGiftLabel=()=>{
      if(box)box.setAttribute('aria-label',section.classList.contains('open')?'Opened gift':'Untie the threads to open the gift');
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
      card.tabIndex=section.classList.contains('open')?0:-1;
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
      let surround=video.closest('.video-background-surround');
      if(!surround){
        surround=document.createElement('div');
        surround.className='video-background-surround';
        ['girl','boy'].forEach(person=>{
          const face=document.createElement('img');
          face.className='video-background-face '+person;
          renderCompletedFace(face);
          face.src='assets/video-'+person+'-smile-v36.webp';
          face.alt='';
          face.setAttribute('aria-hidden','true');
          surround.appendChild(face);
        });
        video.before(surround);
        surround.appendChild(video);
      }
      if(!surround.dataset.viewportEdges){
        surround.dataset.viewportEdges='1';
        const alignEdges=()=>{
          const viewport=document.documentElement.clientWidth;
          if(!viewport)return;
          const shift=parseFloat(getComputedStyle(surround).left)||0;
          const columnLeft=surround.getBoundingClientRect().left-shift;
          surround.style.setProperty('--edge-viewport',viewport+'px');
          surround.style.setProperty('--edge-offset',-columnLeft+'px');
        };
        let frame=0;
        const schedule=()=>{
          cancelAnimationFrame(frame);
          frame=requestAnimationFrame(alignEdges);
        };
        window.addEventListener('resize',schedule,{passive:true});
        const observer=new ResizeObserver(schedule);
        observer.observe(document.documentElement);
        if(surround.parentElement)observer.observe(surround.parentElement);
        // Opening the password envelope reveals previously hidden layout.
        const revealObserver=new MutationObserver(schedule);
        revealObserver.observe(document.body,{attributes:true,attributeFilter:['class']});
        schedule();
      }
      if(surround.previousElementSibling!==section){
        section.insertAdjacentElement('afterend',surround);
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
