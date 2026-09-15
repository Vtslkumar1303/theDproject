(()=>{
  const PETAL_FILES=[
    'assets/asset-08-557f6c64cbb8.png',
    'assets/asset-09-5662675cb497.png',
    'assets/asset-10-e3c293db73ae.png'
  ];
  const BATCH_EVERY=5000;
  const PETALS_PER_BATCH=7;
  const MAX_LANDED=110;

  const css=`
    #petals.tdp-petal-sky{
      position:fixed!important;
      inset:0!important;
      width:100vw!important;
      height:100vh!important;
      z-index:130!important;
      overflow:hidden!important;
      pointer-events:none!important;
    }
    #petals.tdp-petal-sky .petal.tdp-falling-petal{
      position:absolute!important;
      top:-90px!important;
      left:0;
      width:var(--petal-size,28px)!important;
      height:auto!important;
      opacity:var(--petal-opacity,.78)!important;
      pointer-events:none!important;
      will-change:transform;
      filter:drop-shadow(0 5px 7px rgba(67,38,28,.12));
      animation:tdpPetalFall var(--fall-duration,13s) linear forwards!important;
      animation-delay:var(--fall-delay,0s)!important;
    }
    body.time-frozen #petals.tdp-petal-sky .petal.tdp-falling-petal{
      animation-play-state:paused!important;
    }
    @keyframes tdpPetalFall{
      0%{transform:translate3d(var(--start-x),-80px,0) rotate(var(--rot0)) scale(var(--scale));}
      18%{transform:translate3d(calc(var(--start-x) + var(--sway1)),18vh,0) rotate(var(--rot1)) scale(var(--scale));}
      38%{transform:translate3d(calc(var(--start-x) + var(--sway2)),39vh,0) rotate(var(--rot2)) scale(var(--scale));}
      58%{transform:translate3d(calc(var(--start-x) + var(--sway3)),60vh,0) rotate(var(--rot3)) scale(var(--scale));}
      78%{transform:translate3d(calc(var(--start-x) + var(--sway4)),80vh,0) rotate(var(--rot4)) scale(var(--scale));}
      100%{transform:translate3d(calc(var(--start-x) + var(--sway5)),calc(100vh + 95px),0) rotate(var(--rot5)) scale(var(--scale));}
    }
    .tdp-petal-landing-zone{
      position:relative;
      width:min(900px,calc(100% - 18px));
      height:112px;
      margin:-18px auto 26px;
      pointer-events:none;
      z-index:135;
      overflow:visible;
    }
    .tdp-petal-landing-zone:before{
      content:"";
      position:absolute;
      left:7%;right:7%;bottom:5px;height:34px;
      border-radius:50%;
      background:radial-gradient(ellipse at center,rgba(104,70,49,.12),rgba(104,70,49,0) 70%);
      filter:blur(5px);
    }
    .tdp-landed-petal{
      position:absolute;
      bottom:var(--land-y,4px);
      left:var(--land-x,50%);
      width:var(--land-size,28px);
      height:auto;
      opacity:var(--land-opacity,.8);
      transform:translateX(-50%) rotate(var(--land-rot,0deg));
      transform-origin:center;
      filter:drop-shadow(0 4px 5px rgba(62,35,25,.12));
      pointer-events:none;
      animation:tdpPetalSettle .5s ease-out both;
    }
    @keyframes tdpPetalSettle{
      from{opacity:0;transform:translateX(-50%) translateY(-24px) rotate(calc(var(--land-rot) - 18deg)) scale(.82)}
      to{opacity:var(--land-opacity,.8);transform:translateX(-50%) translateY(0) rotate(var(--land-rot)) scale(1)}
    }
    .spotify-player{z-index:90!important;}
    @media(max-width:760px){
      .tdp-petal-landing-zone{height:96px;margin:-14px auto 20px}
      #petals.tdp-petal-sky .petal.tdp-falling-petal{width:var(--petal-size,24px)!important}
    }
    @media(prefers-reduced-motion:reduce){
      #petals.tdp-petal-sky .petal.tdp-falling-petal{animation-duration:18s!important}
    }
  `;

  function rand(min,max){return min+Math.random()*(max-min)}
  function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}

  function findPlayer(){
    return document.querySelector('.spotify-player') || document.querySelector('.music-card') || document.getElementById('musicCard');
  }

  function setup(){
    const sky=document.getElementById('petals');
    const player=findPlayer();
    if(!sky||!player){setTimeout(setup,160);return}
    if(document.getElementById('tdpPetalRuntimeStyle'))return;

    const style=document.createElement('style');
    style.id='tdpPetalRuntimeStyle';
    style.textContent=css;
    document.head.appendChild(style);

    /* Replace the old one-shot decorative petals with one controlled continuous sky. */
    sky.innerHTML='';
    sky.classList.add('tdp-petal-sky');

    let landing=document.querySelector('.tdp-petal-landing-zone');
    if(!landing){
      landing=document.createElement('div');
      landing.className='tdp-petal-landing-zone';
      landing.setAttribute('aria-hidden','true');
      player.insertAdjacentElement('afterend',landing);
    }

    function settle(src,visual){
      const img=document.createElement('img');
      img.className='tdp-landed-petal';
      img.src=src;
      img.alt='';
      img.style.setProperty('--land-x',rand(5,95).toFixed(2)+'%');
      img.style.setProperty('--land-y',rand(0,34).toFixed(1)+'px');
      img.style.setProperty('--land-size',Math.round(visual.size*rand(.82,1.15))+'px');
      img.style.setProperty('--land-opacity',rand(.58,.9).toFixed(2));
      img.style.setProperty('--land-rot',Math.round(rand(-175,175))+'deg');
      landing.appendChild(img);
      while(landing.children.length>MAX_LANDED)landing.removeChild(landing.firstElementChild);
    }

    function dropOne(index){
      const src=pick(PETAL_FILES);
      const img=document.createElement('img');
      img.className='petal tdp-falling-petal';
      img.src=src;
      img.alt='';
      const size=rand(20,36);
      const start=rand(1,96);
      const dir=Math.random()<.5?-1:1;
      const amplitude=rand(18,72)*dir;
      const baseRot=rand(-80,80);
      const spin=rand(250,620)*(Math.random()<.5?-1:1);
      const duration=rand(11.5,16.5);
      const delay=index*rand(.12,.34);
      img.style.setProperty('--petal-size',size.toFixed(1)+'px');
      img.style.setProperty('--petal-opacity',rand(.58,.92).toFixed(2));
      img.style.setProperty('--fall-duration',duration.toFixed(2)+'s');
      img.style.setProperty('--fall-delay',delay.toFixed(2)+'s');
      img.style.setProperty('--start-x',start.toFixed(2)+'vw');
      img.style.setProperty('--scale',rand(.78,1.15).toFixed(2));
      img.style.setProperty('--sway1',(amplitude*.55).toFixed(1)+'px');
      img.style.setProperty('--sway2',(amplitude*-.28).toFixed(1)+'px');
      img.style.setProperty('--sway3',(amplitude*.72).toFixed(1)+'px');
      img.style.setProperty('--sway4',(amplitude*-.18).toFixed(1)+'px');
      img.style.setProperty('--sway5',(amplitude*.38).toFixed(1)+'px');
      for(let i=0;i<=5;i++)img.style.setProperty('--rot'+i,(baseRot+spin*(i/5)).toFixed(1)+'deg');
      sky.appendChild(img);
      img.addEventListener('animationend',()=>{
        settle(src,{size});
        img.remove();
      },{once:true});
    }

    function dropBatch(){
      for(let i=0;i<PETALS_PER_BATCH;i++)dropOne(i);
    }

    dropBatch();
    const timer=setInterval(dropBatch,BATCH_EVERY);
    window.addEventListener('pagehide',()=>clearInterval(timer),{once:true});
  }

  setup();
})();
