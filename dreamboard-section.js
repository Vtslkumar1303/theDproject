(()=>{
  const buildDreamboard=(gift)=>{
    if(!gift || document.querySelector('.tdp-dreamboard')) return false;

    const section=document.createElement('section');
    section.className='tdp-dreamboard';
    section.setAttribute('aria-label','Someday maybe with you');
    section.innerHTML=`
      <header class="tdp-dreamboard-head">
        <p class="tdp-dreamboard-kicker">and if someday allows…</p>
        <h2 class="tdp-dreamboard-title">Someday, Maybe With You…</h2>
        <p class="tdp-dreamboard-sub">little moments, loud songs, long roads, and futures that look softer with you in them</p>
      </header>

      <div class="tdp-dream-block">
        <h3 class="tdp-dream-block-title">Tickets I’d save for us</h3>
        <div class="tdp-tickets">
          <article class="tdp-ticket">
            <div class="tdp-ticket-band"><span>concert keepsake</span><span>01</span></div>
            <h4 class="tdp-ticket-name">Arijit Singh</h4>
            <p class="tdp-ticket-note">for a night full of lyrics, lights, and feelings</p>
            <div class="tdp-ticket-meta"><span><b>Seat</b>Beside You</span><span><b>Entry</b>Us</span><span><b>Date</b>Someday</span></div>
          </article>
          <article class="tdp-ticket">
            <div class="tdp-ticket-band"><span>concert keepsake</span><span>02</span></div>
            <h4 class="tdp-ticket-name">Darshan Raval</h4>
            <p class="tdp-ticket-note">loud songs, soft hearts, one memory saved</p>
            <div class="tdp-ticket-meta"><span><b>Seat</b>Beside You</span><span><b>Entry</b>Us</span><span><b>Date</b>Someday</span></div>
          </article>
          <article class="tdp-ticket">
            <div class="tdp-ticket-band"><span>purple hour</span><span>07 ✦</span></div>
            <h4 class="tdp-ticket-name">For My Favourite ARMY</h4>
            <p class="tdp-ticket-note">a tiny purple dream, saved quietly for someday</p>
            <div class="tdp-ticket-meta"><span><b>Seat</b>Right Next To Me</span><span><b>Entry</b>Us</span><span><b>Date</b>Someday</span></div>
          </article>
        </div>
      </div>

      <div class="tdp-dream-block">
        <h3 class="tdp-dream-block-title">Future snapshots I’d keep</h3>
        <div class="tdp-polaroids">
          <figure class="tdp-polaroid"><div class="tdp-polaroid-scene scene-sunset"></div><figcaption class="tdp-polaroid-caption">our sunset playlist</figcaption></figure>
          <figure class="tdp-polaroid"><div class="tdp-polaroid-scene scene-beach"></div><figcaption class="tdp-polaroid-caption">one beach trip with you</figcaption></figure>
          <figure class="tdp-polaroid"><div class="tdp-polaroid-scene scene-mountain"></div><figcaption class="tdp-polaroid-caption">cold winds, warm company</figcaption></figure>
          <figure class="tdp-polaroid"><div class="tdp-polaroid-scene scene-navratri"></div><figcaption class="tdp-polaroid-caption">midnight after garba</figcaption></figure>
          <figure class="tdp-polaroid"><div class="tdp-polaroid-scene scene-midnight"></div><figcaption class="tdp-polaroid-caption">roads, music &amp; you</figcaption></figure>
          <figure class="tdp-polaroid"><div class="tdp-polaroid-scene scene-rain"></div><figcaption class="tdp-polaroid-caption">chai + rain window</figcaption></figure>
          <figure class="tdp-polaroid"><div class="tdp-polaroid-scene scene-stars"></div><figcaption class="tdp-polaroid-caption">one quiet starry night</figcaption></figure>
        </div>
      </div>

      <div class="tdp-dream-block">
        <h3 class="tdp-dream-block-title">Places I’d love to collect with you</h3>
        <div class="tdp-passport">
          <p class="tdp-passport-label">tiny passport stamps for little futures</p>
          <div class="tdp-stamps">
            <span class="tdp-stamp">🌊<br>Beach Escape</span>
            <span class="tdp-stamp">🏔<br>Mountain Mornings</span>
            <span class="tdp-stamp">🌇<br>Sunset Stop</span>
            <span class="tdp-stamp">🌃<br>Midnight City Ride</span>
            <span class="tdp-stamp">🎶<br>Concert Night</span>
            <span class="tdp-stamp">💃<br>Navratri Together</span>
          </div>
        </div>
      </div>

      <div class="tdp-dream-block">
        <h3 class="tdp-dream-block-title">One quiet sky, our favourite songs</h3>
        <div class="tdp-film-wrap">
          <div class="tdp-film" aria-label="sunset film strip">
            <span class="tdp-film-frame"></span><span class="tdp-film-frame"></span><span class="tdp-film-frame"></span><span class="tdp-film-frame"></span>
          </div>
          <div class="tdp-film-copy">
            <span class="earphones">🎧</span>
            <strong>some sunsets are meant to be shared</strong>
            <small>our favourite songs, one quiet sky</small>
            <div class="tdp-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
          </div>
        </div>
      </div>
      <div class="tdp-dream-divider"></div>`;

    gift.insertAdjacentElement('afterend',section);

    const reveal=()=>section.classList.add('is-visible');
    const watchVisibility=()=>{
      if('IntersectionObserver' in window){
        const io=new IntersectionObserver((entries)=>{
          entries.forEach(entry=>{
            if(entry.isIntersecting){ reveal(); io.disconnect(); }
          });
        },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
        io.observe(section);
      }else reveal();
    };

    if(gift.classList.contains('open')) watchVisibility();
    else {
      const openObserver=new MutationObserver(()=>{
        if(gift.classList.contains('open')){
          watchVisibility();
          openObserver.disconnect();
        }
      });
      openObserver.observe(gift,{attributes:true,attributeFilter:['class']});
    }

    return true;
  };

  const tryMount=()=>buildDreamboard(document.querySelector('.tdp-gift-section'));
  const start=()=>{
    if(tryMount()) return;
    const domObserver=new MutationObserver(()=>{ if(tryMount()) domObserver.disconnect(); });
    domObserver.observe(document.documentElement,{childList:true,subtree:true});
    let attempts=0;
    const retry=setInterval(()=>{
      attempts++;
      if(tryMount() || attempts>=50){
        clearInterval(retry);
        if(document.querySelector('.tdp-dreamboard')) domObserver.disconnect();
      }
    },240);
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
