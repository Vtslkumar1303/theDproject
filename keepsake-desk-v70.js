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
            <div class="tdp-ticket-stack" aria-hidden="true">
              <div class="tdp-ticket tdp-ticket-bts">
                <div class="tdp-ticket-side">BTS<small>ARMY</small></div>
                <div class="tdp-ticket-body"><b>PURPLE HOUR</b><small>ADMIT TWO · SOMEDAY</small><i>Seat: Side by Side</i></div>
                <div class="tdp-ticket-portrait tdp-ticket-portrait-bts"><span></span><span></span><span></span></div>
                <div class="tdp-ticket-barcode"></div>
              </div>
              <div class="tdp-ticket tdp-ticket-arijit">
                <div class="tdp-ticket-side">AS<small>LIVE</small></div>
                <div class="tdp-ticket-body"><b>ARIJIT SINGH</b><small>ONE EVENING · LIVE</small><i>Row: Favourite Chorus</i></div>
                <div class="tdp-ticket-portrait tdp-ticket-portrait-solo"><span></span></div>
                <div class="tdp-ticket-barcode"></div>
              </div>
              <div class="tdp-ticket tdp-ticket-darshan">
                <div class="tdp-ticket-side">DR<small>LIVE</small></div>
                <div class="tdp-ticket-body"><b>DARSHAN RAVAL</b><small>BLUE LIGHTS · SOMEDAY</small><i>Gate: One More Song</i></div>
                <div class="tdp-ticket-portrait tdp-ticket-portrait-solo"><span></span></div>
                <div class="tdp-ticket-barcode"></div>
              </div>
            </div>
            <span class="tdp-kd-hint">tap the tickets</span>
          </button>
        </article>

        <article class="tdp-kd-item tdp-kd-sunset">
          <button class="tdp-kd-trigger" type="button" aria-expanded="false">
            <span class="tdp-kd-label">for the quiet sky and our favourite songs</span>
            <div class="tdp-polaroid-stack" aria-hidden="true">
              <div class="tdp-polaroid tdp-polaroid-back">
                <div class="tdp-polaroid-backscene"></div>
                <div class="tdp-polaroid-caption">another someday</div>
              </div>
              <div class="tdp-polaroid tdp-polaroid-front">
                <div class="tdp-polaroid-sunset">
                  <div class="tdp-polaroid-sun"></div>
                  <div class="tdp-polaroid-hill"></div>
                  <div class="tdp-polaroid-water"></div>
                </div>
                <div class="tdp-polaroid-caption"><b>one slow golden hour</b><small>our favourite songs</small></div>
              </div>
            </div>
            <span class="tdp-kd-reveal-copy">Some sunsets are meant to be shared.</span>
            <span class="tdp-kd-hint">tap the polaroids</span>
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

    const surface=section.querySelector('.tdp-kd-surface');
    const footer=section.querySelector('.tdp-kd-footer');
    const master=document.createElement('button');
    master.type='button';
    master.className='tdp-kd-master-toggle';
    master.setAttribute('aria-expanded','false');
    master.innerHTML='<span class="tdp-kd-master-icon">✦</span><span class="tdp-kd-master-copy"><b>Little Futures</b><small>tap to unfold the keepsakes</small></span><span class="tdp-kd-master-arrow">⌄</span>';

    const content=document.createElement('div');
    content.className='tdp-kd-content';
    const contentInner=document.createElement('div');
    contentInner.className='tdp-kd-content-inner';
    content.appendChild(contentInner);
    contentInner.appendChild(surface);
    contentInner.appendChild(footer);
    section.querySelector('.tdp-kd-head').insertAdjacentElement('afterend',master);
    master.insertAdjacentElement('afterend',content);

    const covers=[
      ['concerts','Concert night','three songs waiting to happen','♫'],
      ['sunset','Golden hour','a tiny sky kept for later','☼'],
      ['travel','Somewhere someday','one place, then another','⌁'],
      ['navratri','Navratri night','music, lights, and tired feet','✦']
    ];
    section.querySelectorAll('.tdp-kd-item').forEach((item,index)=>{
      const btn=item.querySelector('.tdp-kd-trigger');
      const cover=document.createElement('span');
      cover.className='tdp-kd-unbox-cover';
      cover.innerHTML='<span class="tdp-kd-unbox-symbol">'+covers[index][3]+'</span><b>'+covers[index][1]+'</b><small>'+covers[index][2]+'</small><em>tap to reveal</em>';
      btn.insertBefore(cover,btn.firstChild);
    });

    const resetKeepsakes=()=>{
      section.querySelectorAll('.tdp-kd-item').forEach((item)=>{
        item.classList.remove('is-open');
        const btn=item.querySelector('.tdp-kd-trigger');
        if(btn) btn.setAttribute('aria-expanded','false');
      });
      const concertHint=section.querySelector('.tdp-kd-concerts .tdp-kd-hint');
      const polaroidHint=section.querySelector('.tdp-kd-sunset .tdp-kd-hint');
      const travelHint=section.querySelector('.tdp-kd-travel .tdp-kd-hint');
      const navHint=section.querySelector('.tdp-kd-navratri .tdp-kd-hint');
      if(concertHint) concertHint.textContent='tap the tickets';
      if(polaroidHint) polaroidHint.textContent='tap the polaroids';
      if(travelHint) travelHint.textContent='tap the travel tag';
      if(navHint) navHint.textContent='tap the pass';
    };

    master.addEventListener('click',()=>{
      const open=section.classList.toggle('is-section-open');
      master.setAttribute('aria-expanded',open?'true':'false');
      const small=master.querySelector('small');
      if(small) small.textContent=open?'tap to fold the keepsakes away':'tap to unfold the keepsakes';
      if(!open) resetKeepsakes();
      if(window.tdpTrack){
        window.tdpTrack(open?'little_futures_open':'little_futures_close',{section:'keepsake_desk'});
      }
    });

    const concertBtn=section.querySelector('.tdp-kd-concerts .tdp-kd-trigger');
    const toggleConcert=()=>{
      const item=section.querySelector('.tdp-kd-concerts');
      const open=item.classList.toggle('is-open');
      concertBtn.setAttribute('aria-expanded',open?'true':'false');
      const hint=concertBtn.querySelector('.tdp-kd-hint');
      if(hint) hint.textContent=open?'tap again to hide them':'tap the tickets';
      if(window.tdpTrack){
        window.tdpTrack(open?'keepsake_open':'keepsake_close',{keepsake:1,type:'concert_tickets'});
      }
    };
    concertBtn.addEventListener('click',toggleConcert);

    const polaroidBtn=section.querySelector('.tdp-kd-sunset .tdp-kd-trigger');
    const togglePolaroid=()=>{
      const item=section.querySelector('.tdp-kd-sunset');
      const open=item.classList.toggle('is-open');
      polaroidBtn.setAttribute('aria-expanded',open?'true':'false');
      const hint=polaroidBtn.querySelector('.tdp-kd-hint');
      if(hint) hint.textContent=open?'tap again to hide them':'tap the polaroids';
      if(window.tdpTrack){
        window.tdpTrack(open?'keepsake_open':'keepsake_close',{keepsake:2,type:'sunset_polaroids'});
      }
    };
    polaroidBtn.addEventListener('click',togglePolaroid);

    section.querySelectorAll('.tdp-kd-item:not(.tdp-kd-concerts):not(.tdp-kd-sunset) .tdp-kd-trigger').forEach((btn,index)=>{
      btn.addEventListener('click',()=>{
        const item=btn.closest('.tdp-kd-item');
        const open=item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded',open?'true':'false');
        const hint=btn.querySelector('.tdp-kd-hint');
        if(hint){
          const isTravel=item.classList.contains('tdp-kd-travel');
          hint.textContent=open?'tap again to hide it':(isTravel?'tap the travel tag':'tap the pass');
        }
        if(window.tdpTrack){
          window.tdpTrack(open?'keepsake_open':'keepsake_close',{keepsake:index+3});
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