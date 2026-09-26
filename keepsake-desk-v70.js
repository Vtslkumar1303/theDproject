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
                <svg viewBox="0 0 214 78" role="img" aria-label="BTS concert ticket">
                  <rect x="1" y="1" width="212" height="76" rx="10" fill="#eadcf4" stroke="#8f6aa6"/>
                  <rect x="1" y="1" width="52" height="76" rx="10" fill="#b99bcf"/>
                  <line x1="53" y1="7" x2="53" y2="71" stroke="#765785" stroke-dasharray="3 3"/>
                  <circle cx="52.5" cy="0" r="6" fill="#f4e5cb"/><circle cx="52.5" cy="78" r="6" fill="#f4e5cb"/>
                  <text x="27" y="34" text-anchor="middle" font-size="13" font-family="Georgia" font-weight="700" fill="#4c315d">BTS</text>
                  <text x="27" y="49" text-anchor="middle" font-size="5.5" font-family="Georgia" fill="#5f466c">ARMY</text>
                  <text x="65" y="21" font-size="10" font-family="Georgia" font-weight="700" fill="#4f392f">PURPLE HOUR</text>
                  <text x="65" y="34" font-size="6" font-family="Georgia" font-weight="700" fill="#6a536d">ADMIT TWO · SOMEDAY</text>
                  <text x="65" y="48" font-size="6" font-family="Georgia" font-style="italic" fill="#6b5a52">Seat: Beside You</text>
                  <g transform="translate(163 14)" stroke="#5b465f" stroke-width="1.5" fill="none">
                    <path d="M4 21c3-9 8-15 14-15 6 0 10 6 13 15"/>
                    <circle cx="18" cy="5" r="4"/>
                    <path d="M29 22c3-8 7-13 12-13 5 0 9 5 11 13"/><circle cx="41" cy="8" r="3.5"/>
                    <path d="M-8 22c3-8 7-13 12-13 5 0 9 5 11 13"/><circle cx="4" cy="8" r="3.5"/>
                  </g>
                  <g stroke="#4e3e55" stroke-width="1">
                    <line x1="188" y1="11" x2="188" y2="66"/><line x1="192" y1="11" x2="192" y2="66"/><line x1="196" y1="11" x2="196" y2="66"/><line x1="201" y1="11" x2="201" y2="66"/><line x1="205" y1="11" x2="205" y2="66"/>
                  </g>
                </svg>
              </span>
              <span class="tdp-ticket tdp-ticket-arijit">
                <svg viewBox="0 0 214 78" role="img" aria-label="Arijit Singh concert ticket">
                  <rect x="1" y="1" width="212" height="76" rx="10" fill="#f2e2c7" stroke="#9b7c54"/>
                  <rect x="1" y="1" width="52" height="76" rx="10" fill="#c9a874"/>
                  <line x1="53" y1="7" x2="53" y2="71" stroke="#876a45" stroke-dasharray="3 3"/>
                  <circle cx="52.5" cy="0" r="6" fill="#f4e5cb"/><circle cx="52.5" cy="78" r="6" fill="#f4e5cb"/>
                  <text x="27" y="31" text-anchor="middle" font-size="12" font-family="Georgia" font-weight="700" fill="#4f392f">AS</text>
                  <text x="27" y="47" text-anchor="middle" font-size="5.5" font-family="Georgia" fill="#66513d">LIVE</text>
                  <text x="65" y="20" font-size="9.2" font-family="Georgia" font-weight="700" fill="#4f392f">ARIJIT SINGH</text>
                  <text x="65" y="34" font-size="6" font-family="Georgia" font-weight="700" fill="#755b3c">ONE EVENING · LIVE</text>
                  <text x="65" y="48" font-size="6" font-family="Georgia" font-style="italic" fill="#6b5a52">Row: Favourite Songs</text>
                  <g transform="translate(163 13)" stroke="#66513f" stroke-width="1.4" fill="none">
                    <circle cx="19" cy="8" r="7"/><path d="M11 8c3-4 13-4 16 0M13 18c4 5 8 6 12 0M11 29c3-7 14-10 18 0"/>
                  </g>
                  <g stroke="#584737" stroke-width="1">
                    <line x1="188" y1="11" x2="188" y2="66"/><line x1="192" y1="11" x2="192" y2="66"/><line x1="196" y1="11" x2="196" y2="66"/><line x1="201" y1="11" x2="201" y2="66"/><line x1="205" y1="11" x2="205" y2="66"/>
                  </g>
                </svg>
              </span>
              <span class="tdp-ticket tdp-ticket-darshan">
                <svg viewBox="0 0 214 78" role="img" aria-label="Darshan Raval concert ticket">
                  <rect x="1" y="1" width="212" height="76" rx="10" fill="#dfeaf5" stroke="#6f8eaa"/>
                  <rect x="1" y="1" width="52" height="76" rx="10" fill="#9ebad1"/>
                  <line x1="53" y1="7" x2="53" y2="71" stroke="#6c88a0" stroke-dasharray="3 3"/>
                  <circle cx="52.5" cy="0" r="6" fill="#f4e5cb"/><circle cx="52.5" cy="78" r="6" fill="#f4e5cb"/>
                  <text x="27" y="31" text-anchor="middle" font-size="12" font-family="Georgia" font-weight="700" fill="#334f68">DR</text>
                  <text x="27" y="47" text-anchor="middle" font-size="5.5" font-family="Georgia" fill="#49677f">LIVE</text>
                  <text x="65" y="20" font-size="8.8" font-family="Georgia" font-weight="700" fill="#3d5365">DARSHAN RAVAL</text>
                  <text x="65" y="34" font-size="6" font-family="Georgia" font-weight="700" fill="#597891">BLUE LIGHTS · SOMEDAY</text>
                  <text x="65" y="48" font-size="6" font-family="Georgia" font-style="italic" fill="#596671">Gate: Two Hearts</text>
                  <g transform="translate(163 13)" stroke="#4d6578" stroke-width="1.4" fill="none">
                    <circle cx="19" cy="8" r="7"/><path d="M12 7c4-6 11-6 15-1M13 18c4 4 8 5 12 0M10 29c4-7 15-9 19 0"/>
                  </g>
                  <g stroke="#486175" stroke-width="1">
                    <line x1="188" y1="11" x2="188" y2="66"/><line x1="192" y1="11" x2="192" y2="66"/><line x1="196" y1="11" x2="196" y2="66"/><line x1="201" y1="11" x2="201" y2="66"/><line x1="205" y1="11" x2="205" y2="66"/>
                  </g>
                </svg>
              </span>
            </span>
            <span class="tdp-kd-hint">tap the tickets</span>
          </button>
        </article>

        <article class="tdp-kd-item tdp-kd-sunset">
          <button class="tdp-kd-trigger" type="button" aria-expanded="false">
            <span class="tdp-kd-label">for the quiet sky and our favourite songs</span>
            <span class="tdp-polaroid-stack" aria-hidden="true">
              <span class="tdp-polaroid tdp-polaroid-back">
                <svg viewBox="0 0 118 138">
                  <rect x="1" y="1" width="116" height="136" fill="#fff9ee" stroke="#c8b59d"/>
                  <rect x="9" y="9" width="100" height="92" fill="#d8c4aa"/>
                  <path d="M9 79 C34 55 51 69 68 51 C83 35 98 42 109 30 L109 101 L9 101 Z" fill="#8aa2a0"/>
                  <text x="59" y="121" text-anchor="middle" font-size="7" font-family="Georgia" font-style="italic" fill="#765447">another someday</text>
                </svg>
              </span>
              <span class="tdp-polaroid tdp-polaroid-front">
                <svg viewBox="0 0 118 138" role="img" aria-label="Sunset polaroid">
                  <defs>
                    <linearGradient id="sunsetSkyV72" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#f4b58c"/><stop offset="52%" stop-color="#d98978"/><stop offset="72%" stop-color="#7f6270"/><stop offset="100%" stop-color="#4e5662"/>
                    </linearGradient>
                  </defs>
                  <rect x="1" y="1" width="116" height="136" fill="#fff9ee" stroke="#c8b59d"/>
                  <rect x="9" y="9" width="100" height="92" fill="url(#sunsetSkyV72)"/>
                  <circle cx="83" cy="42" r="10" fill="#ffd897" opacity=".95"/>
                  <path d="M9 79 C28 70 44 75 57 67 C73 57 91 66 109 60 L109 101 L9 101 Z" fill="#555c63" opacity=".92"/>
                  <path d="M9 89 C31 82 50 88 68 81 C84 75 98 80 109 76" stroke="#f7c78f" stroke-width="2" opacity=".45" fill="none"/>
                  <text x="59" y="119" text-anchor="middle" font-size="7.3" font-family="Georgia" font-style="italic" fill="#75594d">one slow golden hour</text>
                  <text x="59" y="130" text-anchor="middle" font-size="5.4" font-family="Georgia" fill="#a17866">our favourite songs</text>
                </svg>
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