(()=>{
  const mount=()=>{
    const old=document.querySelector('.tdp-hidden-dream-notes');
    if(!old || document.querySelector('.tdp-keepsake-desk-v70')) return !!old;

    old.classList.add('tdp-keepsake-replaced-v70');

    const section=document.createElement('section');
    section.className='tdp-keepsake-desk-v70';
    section.setAttribute('aria-label','Little futures keepsake desk');
    section.innerHTML=`
      <div class="tdp-kd-head">
        <div class="tdp-kd-kicker">little futures, resting like keepsakes</div>
        <h3>Open whichever one finds you…</h3>
        <p>Some memories are still waiting to happen.</p>
      </div>

      <div class="tdp-kd-surface">
        <div class="tdp-kd-grain" aria-hidden="true"></div>

        <article class="tdp-kd-item tdp-kd-concerts">
          <button class="tdp-kd-trigger" type="button" aria-expanded="false">
            <span class="tdp-kd-label">for the songs I’d save for us</span>
            <span class="tdp-ticket-stack" aria-hidden="true">
              <span class="tdp-ticket tdp-ticket-bts">
                <span class="tdp-ticket-stub">BTS</span>
                <span class="tdp-ticket-main">
                  <b>PURPLE HOUR</b>
                  <small>ADMIT TWO · SOMEDAY</small>
                  <i>Seat: Beside You</i>
                </span>
                <span class="tdp-ticket-code">0713 0313</span>
              </span>
              <span class="tdp-ticket tdp-ticket-arijit">
                <span class="tdp-ticket-stub">AS</span>
                <span class="tdp-ticket-main">
                  <b>ARIJIT SINGH</b>
                  <small>ONE EVENING · LIVE</small>
                  <i>Row: Favourite Songs</i>
                </span>
                <span class="tdp-ticket-code">MARCH 02</span>
              </span>
              <span class="tdp-ticket tdp-ticket-darshan">
                <span class="tdp-ticket-stub">DR</span>
                <span class="tdp-ticket-main">
                  <b>DARSHAN RAVAL</b>
                  <small>BLUE LIGHTS · SOMEDAY</small>
                  <i>Gate: Two Hearts</i>
                </span>
                <span class="tdp-ticket-code">MARCH 03</span>
              </span>
            </span>
            <span class="tdp-kd-hint">tap the tickets</span>
          </button>
        </article>

        <article class="tdp-kd-item tdp-kd-sunset">
          <button class="tdp-kd-trigger" type="button" aria-expanded="false">
            <span class="tdp-kd-label">for the quiet sky and our favourite songs</span>
            <span class="tdp-polaroid-stack" aria-hidden="true">
              <span class="tdp-polaroid tdp-polaroid-back"></span>
              <span class="tdp-polaroid tdp-polaroid-front">
                <span class="tdp-polaroid-photo"></span>
                <span class="tdp-polaroid-note">one slow golden hour</span>
              </span>
            </span>
            <span class="tdp-kd-reveal-copy">Some sunsets are meant to be shared.</span>
            <span class="tdp-kd-hint">tap the polaroid</span>
          </button>
        </article>

        <article class="tdp-kd-item tdp-kd-travel">
          <button class="tdp-kd-trigger" type="button" aria-expanded="false">
            <span class="tdp-kd-label">for places I’d love to collect with you</span>
            <span class="tdp-travel-tag" aria-hidden="true">
              <span class="tdp-travel-string"></span>
              <span class="tdp-travel-face">
                <span class="tdp-travel-title">BEACH / MOUNTAINS</span>
                <span class="tdp-travel-mini tdp-travel-beach"></span>
                <span class="tdp-travel-mini tdp-travel-mountain"></span>
                <span class="tdp-travel-caption">you choose</span>
              </span>
            </span>
            <span class="tdp-kd-reveal-copy">Some places already look better with you in them.</span>
            <span class="tdp-kd-hint">flip the travel tag</span>
          </button>
        </article>

        <article class="tdp-kd-item tdp-kd-navratri">
          <button class="tdp-kd-trigger" type="button" aria-expanded="false">
            <span class="tdp-kd-label">for one Navratri night with you</span>
            <span class="tdp-garba-pass" aria-hidden="true">
              <span class="tdp-garba-hole"></span>
              <span class="tdp-garba-lights"></span>
              <span class="tdp-garba-title">GARBA NIGHT</span>
              <span class="tdp-garba-sub">ADMIT TWO · SOMEDAY</span>
              <span class="tdp-garba-dancers">◜ ◝ ◜ ◝</span>
            </span>
            <span class="tdp-kd-reveal-copy">Traditional clothes, tired feet, loud music, and one very Gujarat memory.</span>
            <span class="tdp-kd-hint">tap the pass</span>
          </button>
        </article>
      </div>

      <div class="tdp-kd-footer">Tap any keepsake again to put it back.</div>
    `;

    old.insertAdjacentElement('afterend',section);

    const concertBtn=section.querySelector('.tdp-kd-concerts .tdp-kd-trigger');
    const toggleConcert=()=>{
      const item=section.querySelector('.tdp-kd-concerts');
      const open=item.classList.toggle('is-open');
      concertBtn.setAttribute('aria-expanded',open?'true':'false');
      const hint=concertBtn.querySelector('.tdp-kd-hint');
      if(hint) hint.textContent=open?'tap again to stack them':'tap the tickets';
      if(window.tdpTrack){
        window.tdpTrack(open?'keepsake_open':'keepsake_close',{keepsake:1,type:'concert_tickets'});
      }
    };
    concertBtn.addEventListener('click',toggleConcert);

    section.querySelectorAll('.tdp-kd-item:not(.tdp-kd-concerts) .tdp-kd-trigger').forEach((btn,index)=>{
      btn.addEventListener('click',()=>{
        const item=btn.closest('.tdp-kd-item');
        const open=item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded',open?'true':'false');
        if(window.tdpTrack){
          window.tdpTrack(open?'keepsake_open':'keepsake_close',{keepsake:index+2});
        }
      });
    });

    return true;
  };

  const start=()=>{
    if(mount()) return;
    const mo=new MutationObserver(()=>{ if(mount()) mo.disconnect(); });
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>mo.disconnect(),15000);
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();