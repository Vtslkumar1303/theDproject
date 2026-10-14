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
        <div class="tdp-kd-kicker">little moments I wouldn’t mind finding someday</div>
        <h3>Open whichever one finds you…</h3>
        <p>Some memories are still waiting to happen.</p>
      </div>

      <div class="tdp-kd-surface">
        <div class="tdp-kd-grain" aria-hidden="true"></div>

        <article class="tdp-kd-item tdp-kd-concerts">
          <button class="tdp-kd-trigger" type="button" aria-expanded="false">
            <span class="tdp-kd-label">for the songs I’d save for us</span>
            <div class="tdp-ticket-stack tdp-arijit-image-stack" aria-label="Two Arijit Singh concert tickets">
              <div class="tdp-ticket tdp-ticket-arijit tdp-arijit-image-card">
                <img src="data:image/jpeg;base64,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" alt="Arijit Singh Ahmedabad concert ticket, Block J" width="350" height="116" loading="eager" decoding="async">
              </div>
              <div class="tdp-ticket tdp-ticket-darshan tdp-arijit-image-card">
                <img src="data:image/jpeg;base64,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" alt="Second Arijit Singh Ahmedabad concert ticket, Block J" width="350" height="116" loading="eager" decoding="async">
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
            <span class="tdp-kd-reveal-copy">Maybe someday we’ll watch the sky change colours and pretend we’re not getting sentimental about it.</span>
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
            <span class="tdp-kd-label">for one night of garba, lights, and maybe us somewhere in between</span>
            <span class="tdp-garba-pass" aria-hidden="true">
              <span class="tdp-garba-hole"></span>
              <span class="tdp-garba-lights"></span>
              <span class="tdp-garba-title">GARBA NIGHT</span>
              <span class="tdp-garba-sub">ADMIT TWO · SOMEDAY</span>
              <span class="tdp-garba-dancers">◜ ◝ ◜ ◝</span>
            </span>
            <span class="tdp-kd-reveal-copy">Traditional clothes, tired feet, loud music, and one very Gujarat memory.</span><span class="tdp-kd-gujarati">હું, તું, નવરાત્રી અને એ ઝગમગતી રાત…</span>
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
      ['concerts','Concerts','hoping you’d save me a spot beside you'],
      ['sunset','Golden hour','one quiet sky and a playlist worth pausing for'],
      ['travel','Somewhere someday','a place to discover, a story to bring back'],
      ['navratri','Navratri night','music, lights, garba, and one memorable evening']
    ];
    section.querySelectorAll('.tdp-kd-item').forEach((item,index)=>{
      const btn=item.querySelector('.tdp-kd-trigger');
      const cover=document.createElement('span');
      cover.className='tdp-kd-unbox-cover tdp-kd-unbox-'+covers[index][0];
      cover.innerHTML=
        '<span class="tdp-kd-3d-object tdp-kd-3d-'+covers[index][0]+'" aria-hidden="true">'+
          '<span class="tdp-kd-3d-face"></span><span class="tdp-kd-3d-detail"></span><span class="tdp-kd-3d-shadow"></span>'+
        '</span>'+
        '<b>'+covers[index][1]+'</b>'+
        '<small>'+covers[index][2]+'</small>'+
        '<em>tap to reveal</em>';
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