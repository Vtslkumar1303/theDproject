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
      .tdp-petal-flight-layer{position:absolute;left:0;top:0;width:100%;pointer-events:none;overflow:hidden;z-index:170}
      .tdp-flight-petal{position:absolute;will-change:transform,opacity;filter:drop-shadow(0 3px 5px rgba(85,40,29,.14));pointer-events:none}
      .tdp-petal-landing-zone{position:relative;z-index:95;width:min(900px,calc(100% - 24px));height:155px;margin:-14px auto 28px;pointer-events:none;overflow:visible}
      .tdp-petal-landing-zone:before{content:"";position:absolute;left:5%;right:5%;bottom:4px;height:48px;border-radius:50%;background:radial-gradient(ellipse at center,rgba(111,74,53,.08),rgba(111,74,53,0) 72%);filter:blur(5px)}
      .tdp-landed-petal{position:absolute;bottom:8px;left:var(--land-left);width:var(--land-size);opacity:var(--land-opacity);transform:translateX(-50%) translateY(var(--land-y)) rotate(var(--land-rot));filter:drop-shadow(0 3px 5px rgba(85,40,29,.12));pointer-events:none}
      .spotify-player{position:relative!important;z-index:90!important}
      @media(max-width:760px){.tdp-petal-landing-zone{height:132px;margin-top:-10px}.tdp-landed-petal{bottom:5px}}
      @media(prefers-reduced-motion:reduce){.tdp-flight-petal{display:none!important}}
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
    const BATCH_SIZE=5;
    const BATCH_GAP=5000;
    const MAX_ACTIVE=65;
    const MAX_LANDED=95;

    const syncLayerHeight=()=>{
      layer.style.height=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight)+'px';
    };
    syncLayerHeight();
    addEventListener('resize',syncLayerHeight,{passive:true});

    const freezeObserver=new MutationObserver(()=>{
      const frozen=document.body.classList.contains('time-frozen');
      active.forEach(item=>{try{frozen?item.anim.pause():item.anim.play()}catch{}});
    });
    freezeObserver.observe(document.body,{attributes:true,attributeFilter:['class']});

    const landPetal=(src,index)=>{
      const p=document.createElement('img');
      p.className='tdp-landed-petal';
      p.alt='';
      p.src=src;
      const centerBias=(Math.random()+Math.random())/2;
      p.style.setProperty('--land-left',(3+centerBias*94)+'%');
      p.style.setProperty('--land-size',(18+Math.random()*28)+'px');
      p.style.setProperty('--land-opacity',(.48+Math.random()*.42));
      p.style.setProperty('--land-y',(-Math.random()*38)+'px');
      p.style.setProperty('--land-rot',(-105+Math.random()*210)+'deg');
      p.style.zIndex=String(1+(index%9));
      landing.appendChild(p);
      while(landing.querySelectorAll('.tdp-landed-petal').length>MAX_LANDED){
        landing.querySelector('.tdp-landed-petal')?.remove();
      }
      syncLayerHeight();
    };

    const spawnPetal=(batchIndex,petalIndex)=>{
      if(active.length>=MAX_ACTIVE)return;
      syncLayerHeight();

      const src=sources[(sequence+petalIndex)%sources.length];
      const p=document.createElement('img');
      p.className='tdp-flight-petal';
      p.alt='';
      p.src=src;

      const startY=Math.max(-70,window.scrollY-70-Math.random()*45);
      const startLeft=3+Math.random()*94;
      const size=20+Math.random()*29;
      const opacity=.42+Math.random()*.43;
      p.style.top=startY+'px';
      p.style.left=startLeft+'%';
      p.style.width=size+'px';
      p.style.opacity=String(opacity);
      layer.appendChild(p);

      const landingY=landing.getBoundingClientRect().top+window.scrollY+landing.clientHeight*.55;
      const distance=Math.max(420,landingY-startY);
      const speed=78+Math.random()*34; // natural, airy fall speed in px/sec
      const duration=Math.max(9000,Math.min(125000,distance/speed*1000));

      const swayA=(Math.random()*2-1)*(70+Math.random()*80);
      const swayB=(Math.random()*2-1)*(90+Math.random()*110);
      const swayC=(Math.random()*2-1)*(65+Math.random()*95);
      const endSway=(Math.random()*2-1)*90;
      const spin=420+Math.random()*330;

      const anim=p.animate([
        {transform:'translate3d(0,0,0) rotate(0deg)',offset:0},
        {transform:`translate3d(${swayA}px,${distance*.24}px,0) rotate(${spin*.24}deg)`,offset:.24},
        {transform:`translate3d(${swayB}px,${distance*.49}px,0) rotate(${spin*.49}deg)`,offset:.49},
        {transform:`translate3d(${swayC}px,${distance*.75}px,0) rotate(${spin*.75}deg)`,offset:.75},
        {transform:`translate3d(${endSway}px,${distance}px,0) rotate(${spin}deg)`,offset:1}
      ],{duration,easing:'linear',fill:'forwards'});

      const item={anim,node:p};
      active.push(item);
      if(document.body.classList.contains('time-frozen'))anim.pause();

      anim.finished.then(()=>{
        landPetal(src,batchIndex*BATCH_SIZE+petalIndex);
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
        setTimeout(()=>spawnPetal(batchIndex,i),i*(180+Math.random()*180));
      }
    };

    spawnBatch();
    const batchTimer=setInterval(spawnBatch,BATCH_GAP);
    addEventListener('pagehide',()=>clearInterval(batchTimer),{once:true});
  };
  setup();
})();
