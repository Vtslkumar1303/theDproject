(()=>{
  const buildDreamboard=(gift)=>{
    if(!gift || document.querySelector('.tdp-dreamboard-shell')) return false;

    const shell=document.createElement('section');
    shell.className='tdp-dreamboard-shell';
    shell.setAttribute('aria-label','Hidden future keepsakes');
    shell.innerHTML=`
      <button class="tdp-memory-cover" type="button" aria-expanded="false">
        <span class="tdp-cover-corner tdp-cover-corner-one"></span>
        <span class="tdp-cover-corner tdp-cover-corner-two"></span>
        <span class="tdp-cover-small">a little collection of someday</span>
        <strong>Tap to open a few little futures…</strong>
        <span class="tdp-cover-sub">tickets · photographs · places · sunsets</span>
        <span class="tdp-cover-seal"><span>♡</span></span>
        <span class="tdp-cover-tap">tap to open</span>
      </button>

      <div class="tdp-dreamboard-stage" aria-hidden="true">
        <div class="tdp-stage-shadow"></div>
        <section class="tdp-dreamboard" aria-label="Someday maybe with you">
          <header class="tdp-dreamboard-head">
            <p class="tdp-dreamboard-kicker">and if someday allows…</p>
            <h2 class="tdp-dreamboard-title">Someday, Maybe With You…</h2>
            <p class="tdp-dreamboard-sub">little moments, loud songs, long roads, and futures that look softer with you in them</p>
          </header>

          <div class="tdp-dream-block">
            <h3 class="tdp-dream-block-title">Tickets I’d save for us</h3>
            <div class="tdp-tickets">
              <article class="tdp-ticket">
                <span class="tdp-ticket-paper"></span><span class="tdp-ticket-fold"></span><span class="tdp-ticket-stubmark">admit two</span>
                <div class="tdp-ticket-band"><span>live music pass</span><span>NO. 0313</span></div>
                <h4 class="tdp-ticket-name">Arijit Singh</h4>
                <p class="tdp-ticket-note">for a night full of lyrics, lights, and feelings</p>
                <div class="tdp-ticket-meta"><span><b>Row</b>A7</span><span><b>Seat</b>Beside You</span><span><b>Entry</b>Us</span></div>
                <div class="tdp-ticket-printline"><span>GATE 02 · DATE: SOMEDAY<br>REF: OUR-SONGS-001</span><i class="tdp-ticket-barcode"></i></div>
              </article>
              <article class="tdp-ticket">
                <span class="tdp-ticket-paper"></span><span class="tdp-ticket-fold"></span><span class="tdp-ticket-stubmark">entry pass</span>
                <div class="tdp-ticket-band"><span>concert keepsake</span><span>NO. 2207</span></div>
                <h4 class="tdp-ticket-name">Darshan Raval</h4>
                <p class="tdp-ticket-note">loud songs, soft hearts, one memory saved</p>
                <div class="tdp-ticket-meta"><span><b>Row</b>D4</span><span><b>Seat</b>Beside You</span><span><b>Entry</b>Us</span></div>
                <div class="tdp-ticket-printline"><span>GATE 04 · DATE: SOMEDAY<br>REF: BLUE-NIGHT-002</span><i class="tdp-ticket-barcode"></i></div>
              </article>
              <article class="tdp-ticket">
                <span class="tdp-ticket-paper"></span><span class="tdp-ticket-fold"></span><span class="tdp-ticket-stubmark">purple hour</span>
                <div class="tdp-ticket-band"><span>purple hour · keepsake</span><span>07 ✦</span></div>
                <h4 class="tdp-ticket-name">For My Favourite ARMY</h4>
                <p class="tdp-ticket-note">a tiny purple dream, saved quietly for someday</p>
                <div class="tdp-ticket-meta"><span><b>Row</b>07</span><span><b>Seat</b>Next To Me</span><span><b>Entry</b>Us</span></div>
                <div class="tdp-ticket-printline"><span>ADMIT TWO · DATE: SOMEDAY<br>REF: PURPLE-HOUR-007</span><i class="tdp-ticket-barcode"></i></div>
              </article>
            </div>
          </div>

          <div class="tdp-dream-block">
            <h3 class="tdp-dream-block-title">Future snapshots I’d keep</h3>
            <div class="tdp-polaroids">
              <figure class="tdp-polaroid"><div class="tdp-polaroid-scene scene-sunset"><span class="tdp-photo-grain"></span></div><figcaption class="tdp-polaroid-caption">our sunset playlist</figcaption><span class="tdp-polaroid-date">someday · 18:42</span></figure>
              <figure class="tdp-polaroid"><div class="tdp-polaroid-scene scene-beach"><span class="tdp-photo-grain"></span></div><figcaption class="tdp-polaroid-caption">one beach trip with you</figcaption><span class="tdp-polaroid-date">coastline · someday</span></figure>
              <figure class="tdp-polaroid"><div class="tdp-polaroid-scene scene-mountain"><span class="tdp-photo-grain"></span></div><figcaption class="tdp-polaroid-caption">cold winds, warm company</figcaption><span class="tdp-polaroid-date">mountains · 07:16</span></figure>
              <figure class="tdp-polaroid"><div class="tdp-polaroid-scene scene-navratri"><span class="tdp-photo-grain"></span></div><figcaption class="tdp-polaroid-caption">midnight after garba</figcaption><span class="tdp-polaroid-date">navratri · 00:47</span></figure>
              <figure class="tdp-polaroid"><div class="tdp-polaroid-scene scene-midnight"><span class="tdp-photo-grain"></span></div><figcaption class="tdp-polaroid-caption">roads, music &amp; you</figcaption><span class="tdp-polaroid-date">city lights · 01:23</span></figure>
              <figure class="tdp-polaroid"><div class="tdp-polaroid-scene scene-rain"><span class="tdp-photo-grain"></span></div><figcaption class="tdp-polaroid-caption">chai + rain window</figcaption><span class="tdp-polaroid-date">monsoon · 17:08</span></figure>
              <figure class="tdp-polaroid"><div class="tdp-polaroid-scene scene-stars"><span class="tdp-photo-grain"></span></div><figcaption class="tdp-polaroid-caption">one quiet starry night</figcaption><span class="tdp-polaroid-date">terrace · 23:58</span></figure>
            </div>

            <div class="tdp-postcards" aria-label="future travel postcards">
              <article class="tdp-postcard">
                <span class="tdp-postcard-stamp">POST<br>♡</span><span class="tdp-postmark">SOMEDAY</span><span class="tdp-postcard-lines"></span>
                <h4>From somewhere by the sea</h4>
                <p>Salt in the air, our songs somewhere in the background, and one photo I’d probably keep forever.</p>
                <span class="tdp-postcard-label">future postcard · beach escape</span>
              </article>
              <article class="tdp-postcard">
                <span class="tdp-postcard-stamp">AIR<br>MAIL</span><span class="tdp-postmark">MOUNTAINS</span><span class="tdp-postcard-lines"></span>
                <h4>From a road somewhere in the hills</h4>
                <p>Cold wind, warm chai, an unnecessary roadside stop, and nowhere important to rush to.</p>
                <span class="tdp-postcard-label">future postcard · mountain morning</span>
              </article>
            </div>
          </div>

          <div class="tdp-dream-block">
            <h3 class="tdp-dream-block-title">Places I’d love to collect with you</h3>
            <div class="tdp-passport">
              <p class="tdp-passport-label">tiny passport stamps for little futures</p>
              <div class="tdp-stamps">
                <span class="tdp-stamp">🌊<br>Beach Escape</span><span class="tdp-stamp">🏔<br>Mountain Mornings</span><span class="tdp-stamp">🌇<br>Sunset Stop</span><span class="tdp-stamp">🌃<br>Midnight City Ride</span><span class="tdp-stamp">🎶<br>Concert Night</span><span class="tdp-stamp">💃<br>Navratri Together</span>
              </div>
            </div>
          </div>

          <div class="tdp-dream-block">
            <h3 class="tdp-dream-block-title">One quiet sky, our favourite songs</h3>
            <div class="tdp-film-wrap">
              <div class="tdp-film" aria-label="sunset film strip"><span class="tdp-film-frame"></span><span class="tdp-film-frame"></span><span class="tdp-film-frame"></span><span class="tdp-film-frame"></span></div>
              <div class="tdp-film-copy"><span class="earphones">🎧</span><strong>some sunsets are meant to be shared</strong><small>our favourite songs, one quiet sky</small><div class="tdp-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
            </div>
          </div>
          <div class="tdp-dream-divider"></div>
        </section>
      </div>`;

    gift.insertAdjacentElement('afterend',shell);

    const cover=shell.querySelector('.tdp-memory-cover');
    const stage=shell.querySelector('.tdp-dreamboard-stage');
    const revealCover=()=>shell.classList.add('cover-visible');
    const openDreamboard=()=>{
      if(shell.classList.contains('is-open')) return;
      shell.classList.add('is-open');
      cover.setAttribute('aria-expanded','true');
      stage.setAttribute('aria-hidden','false');
      requestAnimationFrame(()=>requestAnimationFrame(()=>shell.classList.add('is-revealed')));
    };
    cover.addEventListener('click',openDreamboard);

    if(gift.classList.contains('open')) revealCover();
    else {
      const openObserver=new MutationObserver(()=>{
        if(gift.classList.contains('open')){
          revealCover();
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
        if(document.querySelector('.tdp-dreamboard-shell')) domObserver.disconnect();
      }
    },240);
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
