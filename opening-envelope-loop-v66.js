(()=>{
  const mount=()=>{
    const openScreen=document.getElementById('openScreen');
    const card=document.getElementById('envelopeCard');
    const env=document.getElementById('realEnvelope');
    if(!openScreen||!card||!env||env.dataset.floatLoopV66==='1') return !!env;

    env.dataset.floatLoopV66='1';

    const glow=document.createElement('div');
    glow.className='tdp-envelope-focus-glow-v66';
    glow.setAttribute('aria-hidden','true');
    card.insertBefore(glow,env);

    const rays=document.createElement('div');
    rays.className='tdp-envelope-focus-rays-v66';
    rays.setAttribute('aria-hidden','true');
    card.insertBefore(rays,env);

    const shadow=env.querySelector('.envelope-ground-shadow');

    let floatAnim=null, glowAnim=null, raysAnim=null, shadowAnim=null;

    const start=()=>{
      if(card.classList.contains('is-unlocking')) return;

      if(!floatAnim){
        floatAnim=env.animate([
          {transform:'translate3d(0,0,0) rotateZ(-0.18deg)'},
          {transform:'translate3d(0,-12px,0) rotateZ(0.18deg)',offset:.5},
          {transform:'translate3d(0,0,0) rotateZ(-0.18deg)'}
        ],{duration:5200,iterations:Infinity,easing:'ease-in-out'});
      }

      if(!glowAnim){
        glowAnim=glow.animate([
          {opacity:.58,transform:'translate(-50%,-50%) scale(.94)'},
          {opacity:1,transform:'translate(-50%,-50%) scale(1.08)',offset:.5},
          {opacity:.58,transform:'translate(-50%,-50%) scale(.94)'}
        ],{duration:3900,iterations:Infinity,easing:'ease-in-out'});
      }

      if(!raysAnim){
        raysAnim=rays.animate([
          {opacity:.24,transform:'translate(-50%,-50%) rotate(-2deg) scale(.98)'},
          {opacity:.62,transform:'translate(-50%,-50%) rotate(2deg) scale(1.04)',offset:.5},
          {opacity:.24,transform:'translate(-50%,-50%) rotate(-2deg) scale(.98)'}
        ],{duration:6200,iterations:Infinity,easing:'ease-in-out'});
      }

      if(shadow&&!shadowAnim){
        shadowAnim=shadow.animate([
          {opacity:.82,transform:'translateX(-50%) scaleX(1)'},
          {opacity:.48,transform:'translateX(-50%) scaleX(.86)',offset:.5},
          {opacity:.82,transform:'translateX(-50%) scaleX(1)'}
        ],{duration:5200,iterations:Infinity,easing:'ease-in-out'});
      }
    };

    const stop=()=>{
      [floatAnim,glowAnim,raysAnim,shadowAnim].forEach(a=>{try{a?.cancel()}catch(e){}});
      floatAnim=glowAnim=raysAnim=shadowAnim=null;
      env.style.transform='';
      glow.style.opacity='0';
      rays.style.opacity='0';
    };

    const observer=new MutationObserver(()=>{
      if(card.classList.contains('is-unlocking')) stop();
      else start();
    });
    observer.observe(card,{attributes:true,attributeFilter:['class']});

    start();
    return true;
  };

  const start=()=>{
    if(mount()) return;
    const mo=new MutationObserver(()=>{if(mount())mo.disconnect();});
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>mo.disconnect(),15000);
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();