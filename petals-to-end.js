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
      .tdp-flight-petal{position:absolute;top:-70px;will-change:transform,opacity;filter:drop-shadow(0 3px 5px rgba(85,40,29,.14));pointer-events:none}
      .tdp-petal-landing-zone{position:relative;z-index:95;width:min(900px,calc(100% - 24px));height:150px;margin:-18px auto 24px;pointer-events:none;overflow:visible}
      .tdp-petal-landing-zone:before{content:"";position:absolute;left:6%;right:6%;bottom:4px;height:46px;border-radius:50%;background:radial-gradient(ellipse at center,rgba(111,74,53,.08),rgba(111,74,53,0) 70%);filter:blur(5px)}
      .tdp-landed-petal{position:absolute;bottom:8px;left:var(--land-left);width:var(--land-size);opacity:var(--land-opacity);transform:translateX(-50%) translateY(var(--land-y)) rotate(var(--land-rot));filter:drop-shadow(0 3px 5px rgba(85,40,29,.12));pointer-events:none}
      .spotify-player{position:relative!important;z-index:90!important}
      @media(max-width:760px){.tdp-petal-landing-zone{height:125px;margin-top:-12px}.tdp-landed-petal{bottom:5px}}
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
    const syncLayerHeight=()=>{layer.style.height=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight)+'px'};
    syncLayerHeight();
    addEventListener('resize',syncLayerHeight,{passive:true});

    const freezeObserver=new MutationObserver(()=>{
      const frozen=document.body.classList.contains('time-frozen');
      active.forEach(a=>{try{frozen?a.pause():a.play()}catch{}});
    });
    freezeObserver.observe(document.body,{attributes:true,attributeFilter:['class']});

    const landPetal=(src,index)=>{
      const p=document.createElement('img');
      p.className='tdp-landed-petal';
      p.alt='';p.src=src;
      const centerBias=(Math.random()+Math.random())/2;
      p.style.setProperty('--land-left',(5+centerBias*90)+'%');
      p.style.setProperty('--land-size',(18+Math.random()*28)+'px');
      p.style.setProperty('--land-opacity',(.44+Math.random()*.42));
      p.style.setProperty('--land-y',(-Math.random()*34)+'px');
      p.style.setProperty('--land-rot',(-95+Math.random()*190)+'deg');
      p.style.zIndex=String(1+(index%7));
      landing.appendChild(p);
    };

    const count=30;
    for(let i=0;i<count;i++){
      const src=sources[i%sources.length];
      const p=document.createElement('img');
      p.className='tdp-flight-petal';
      p.alt='';p.src=src;
      p.style.left=(Math.random()*100)+'%';
      p.style.width=(20+Math.random()*30)+'px';
      p.style.opacity=String(.35+Math.random()*.48);
      layer.appendChild(p);

      const startDelay=Math.random()*18000;
      setTimeout(()=>{
        syncLayerHeight();
        const startX=(Math.random()*2-1)*24;
        const drift1=(Math.random()*2-1)*130;
        const drift2=(Math.random()*2-1)*180;
        const landingY=landing.getBoundingClientRect().top+window.scrollY+landing.clientHeight*.56;
        const distance=Math.max(650,landingY+70);
        const duration=Math.min(46000,Math.max(22000,distance/260*1000));
        const anim=p.animate([
          {transform:`translate3d(${startX}px,0,0) rotate(0deg)`,offset:0},
          {transform:`translate3d(${drift1}px,${distance*.34}px,0) rotate(170deg)`,offset:.34},
          {transform:`translate3d(${drift2}px,${distance*.69}px,0) rotate(330deg)`,offset:.69},
          {transform:`translate3d(${(Math.random()*2-1)*110}px,${distance}px,0) rotate(${500+Math.random()*220}deg)`,offset:1}
        ],{duration,easing:'linear',fill:'forwards'});
        active.push(anim);
        if(document.body.classList.contains('time-frozen'))anim.pause();
        anim.finished.then(()=>{
          landPetal(src,i);
          p.remove();
          const idx=active.indexOf(anim);if(idx>-1)active.splice(idx,1);
        }).catch(()=>{});
      },startDelay);
    }
  };
  setup();
})();
