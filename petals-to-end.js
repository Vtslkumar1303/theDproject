(()=>{
  const setup=()=>{
    const player=document.querySelector('.spotify-player');
    const original=document.getElementById('petals');
    const originals=[...document.querySelectorAll('#petals .petal')];
    if(!player||!original||!originals.length){setTimeout(setup,180);return}
    if(document.getElementById('tdpPetalFlightLayer'))return;

    const sources=[...new Set(originals.map(p=>p.currentSrc||p.src).filter(Boolean))];
    if(!sources.length)return;

    const style=document.createElement('style');
    style.id='tdpPetalEndStyles';
    style.textContent=`
      #petals{display:none!important}
      .tdp-petal-flight-layer{
        position:absolute;left:0;top:0;width:100%;pointer-events:none;overflow:hidden;
        z-index:170
      }
      .tdp-flight-petal{
        position:absolute;will-change:transform,opacity;pointer-events:none;
        filter:drop-shadow(0 3px 5px rgba(85,40,29,.14))
      }
      .tdp-petal-landing-zone{
        position:relative;z-index:95;width:min(900px,calc(100% - 24px));height:155px;
        margin:-14px auto 28px;pointer-events:none;overflow:visible
      }
      .tdp-petal-landing-zone:before{
        content:"";position:absolute;left:5%;right:5%;bottom:4px;height:48px;border-radius:50%;
        background:radial-gradient(ellipse at center,rgba(111,74,53,.08),rgba(111,74,53,0) 72%);filter:blur(5px)
      }
      .tdp-landed-petal{
        position:absolute;bottom:8px;left:var(--land-left);width:var(--land-size);opacity:var(--land-opacity);
        transform:translateX(-50%) translateY(var(--land-y)) rotate(var(--land-rot));
        filter:drop-shadow(0 3px 5px rgba(85,40,29,.12));pointer-events:none;
        animation:tdpLandSoftly .48s ease-out both
      }
      @keyframes tdpLandSoftly{
        from{opacity:0;transform:translateX(-50%) translateY(calc(var(--land-y) - 18px)) rotate(calc(var(--land-rot) - 16deg)) scale(.86)}
        to{opacity:var(--land-opacity);transform:translateX(-50%) translateY(var(--land-y)) rotate(var(--land-rot)) scale(1)}
      }
      /* Falling petals deliberately pass visually ABOVE the Khat player. */
      .spotify-player{position:relative!important;z-index:90!important}
      @media(max-width:760px){
        .tdp-petal-landing-zone{height:132px;margin-top:-10px}
        .tdp-landed-petal{bottom:5px}
      }
      @media(prefers-reduced-motion:reduce){.tdp-flight-petal{opacity:.65!important}}
    `;
    document.head.appendChild(style);

    original.style.display='none';

    const landing=document.createElement('div');
    landing.id='tdpPetalLandingZone';
    landing.className='tdp-petal-landing-zone';
    landing.setAttribute('aria-hidden','true');
    player.insertAdjacentElement('afterend',landing);

    const layer=document.createElement('div');
    layer.id='tdpPetalFlightLayer';
    layer.className='tdp-petal-flight-layer';
    layer.setAttribute('aria-hidden','true');
    document.body.appendChild(layer);

    const active=[];
    let sequence=0;
    const BATCH_SIZE=6;
    const BATCH_GAP=5000;
    const MAX_ACTIVE=80;
    const MAX_LANDED=110;

    const syncLayerHeight=()=>{
      layer.style.height=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight)+'px';
    };
    syncLayerHeight();
    addEventListener('resize',syncLayerHeight,{passive:true});

    /* Keep the existing Freeze Time button compatible with the new petals. */
    const freezeObserver=new MutationObserver(()=>{
      const frozen=document.body.classList.contains('time-frozen');
      active.forEach(item=>{try{frozen?item.anim.pause():item.anim.play()}catch{}});
    });
    freezeObserver.observe(document.body,{attributes:true,attributeFilter:['class']});

    const landPetal=(src,index,size)=>{
      const p=document.createElement('img');
      p.className='tdp-landed-petal';
      p.alt='';
      p.src=src;
      const centerBias=(Math.random()+Math.random())/2;
      p.style.setProperty('--land-left',(3+centerBias*94)+'%');
      p.style.setProperty('--land-size',Math.max(17,size*(.78+Math.random()*.42))+'px');
      p.style.setProperty('--land-opacity',(.5+Math.random()*.4));
      p.style.setProperty('--land-y',(-Math.random()*40)+'px');
      p.style.setProperty('--land-rot',(-135+Math.random()*270)+'deg');
      p.style.zIndex=String(1+(index%11));
      landing.appendChild(p);
      while(landing.querySelectorAll('.tdp-landed-petal').length>MAX_LANDED){
        landing.querySelector('.tdp-landed-petal')?.remove();
      }
      syncLayerHeight();
    };

    const spawnPetal=(batchIndex,petalIndex)=>{
      if(active.length>=MAX_ACTIVE)return;
      syncLayerHeight();

      const src=sources[(batchIndex+petalIndex)%sources.length];
      const p=document.createElement('img');
      p.className='tdp-flight-petal petal';
      p.alt='';
      p.src=src;

      /* Start just above what the reader is currently seeing, so every 5-second set is visible. */
      const startY=Math.max(-75,window.scrollY-75-Math.random()*50);
      const startLeft=3+Math.random()*94;
      const size=20+Math.random()*28;
      const opacity=.48+Math.random()*.4;
      p.style.top=startY+'px';
      p.style.left=startLeft+'%';
      p.style.width=size+'px';
      p.style.opacity=String(opacity);
      layer.appendChild(p);

      const landingY=landing.getBoundingClientRect().top+window.scrollY+landing.clientHeight*.56;
      const distance=Math.max(420,landingY-startY);

      /* Roughly 70–96 px/sec gives a gentle, air-carried descent rather than a fast drop. */
      const speed=70+Math.random()*26;
      const duration=Math.max(10000,Math.min(135000,distance/speed*1000));

      const direction=Math.random()<.5?-1:1;
      const swayA=direction*(45+Math.random()*85);
      const swayB=-direction*(35+Math.random()*100);
      const swayC=direction*(55+Math.random()*105);
      const endSway=-direction*(20+Math.random()*75);
      const spin=(360+Math.random()*420)*(Math.random()<.5?-1:1);

      const anim=p.animate([
        {transform:'translate3d(0,0,0) rotate(0deg)',offset:0},
        {transform:`translate3d(${swayA}px,${distance*.23}px,0) rotate(${spin*.23}deg)`,offset:.23},
        {transform:`translate3d(${swayB}px,${distance*.47}px,0) rotate(${spin*.47}deg)`,offset:.47},
        {transform:`translate3d(${swayC}px,${distance*.73}px,0) rotate(${spin*.73}deg)`,offset:.73},
        {transform:`translate3d(${endSway}px,${distance}px,0) rotate(${spin}deg)`,offset:1}
      ],{duration,easing:'linear',fill:'forwards'});

      const item={anim,node:p};
      active.push(item);
      if(document.body.classList.contains('time-frozen'))anim.pause();

      anim.finished.then(()=>{
        landPetal(src,batchIndex*BATCH_SIZE+petalIndex,size);
        p.remove();
        const idx=active.indexOf(item);
        if(idx>-1)active.splice(idx,1);
      }).catch(()=>{
        p.remove();
        const idx=active.indexOf(item);
        if(idx>-1)active.splice(idx,1);
      });
    };

    const spawnBatch=()=>{
      if(document.hidden||document.body.classList.contains('time-frozen'))return;
      const batchIndex=sequence++;
      for(let i=0;i<BATCH_SIZE;i++){
        setTimeout(()=>spawnPetal(batchIndex,i),i*(160+Math.random()*170));
      }
    };

    /* First set now, then a fresh set every five seconds. */
    spawnBatch();
    const batchTimer=setInterval(spawnBatch,BATCH_GAP);
    addEventListener('pagehide',()=>clearInterval(batchTimer),{once:true});
  };
  setup();
})();
