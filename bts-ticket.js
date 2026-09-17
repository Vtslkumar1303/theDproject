(()=>{
  const buildTicket=(gift)=>{
    if(!gift || document.querySelector('.tdp-bts-keepsake')) return false;

    const wrap=document.createElement('section');
    wrap.className='tdp-bts-keepsake';
    wrap.setAttribute('aria-label','A little purple keepsake');
    wrap.innerHTML=`
      <div class="tdp-bts-ticket">
        <div class="tdp-bts-ticket-main">
          <p class="tdp-bts-ticket-kicker">A tiny purple promise</p>
          <h3 class="tdp-bts-ticket-title">One evening, your playlist, and us.</h3>
          <p class="tdp-bts-ticket-sub">No stage required. Just your favourite songs, a little purple hour, and a seat saved right beside you.</p>
          <div class="tdp-bts-ticket-meta">
            <span><b>Admit</b> Two</span>
            <span><b>Seat</b> Beside you</span>
            <span><b>Dress code</b> Comfort</span>
            <span><b>Encore</b> Always</span>
          </div>
        </div>
        <div class="tdp-bts-ticket-stub" aria-hidden="true">
          <div class="tdp-bts-ticket-stub-inner">
            <strong>PURPLE HOUR</strong>
            <small>for my favourite ARMY <span class="tdp-bts-ticket-heart">♥</span></small>
          </div>
        </div>
      </div>
      <p class="tdp-bts-ticket-note">Keep this one. Some tickets are meant for memories, not entry gates.</p>`;

    gift.insertAdjacentElement('afterend',wrap);

    const reveal=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>wrap.classList.add('is-visible')));
    if(gift.classList.contains('open')) reveal();
    else {
      const openObserver=new MutationObserver(()=>{
        if(gift.classList.contains('open')){
          reveal();
          openObserver.disconnect();
        }
      });
      openObserver.observe(gift,{attributes:true,attributeFilter:['class']});
    }
    return true;
  };

  const tryMount=()=>buildTicket(document.querySelector('.tdp-gift-section'));

  const start=()=>{
    if(tryMount()) return;

    const domObserver=new MutationObserver(()=>{
      if(tryMount()) domObserver.disconnect();
    });
    domObserver.observe(document.documentElement,{childList:true,subtree:true});

    let attempts=0;
    const retry=setInterval(()=>{
      attempts++;
      if(tryMount() || attempts>=40){
        clearInterval(retry);
        if(document.querySelector('.tdp-bts-keepsake')) domObserver.disconnect();
      }
    },250);
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
