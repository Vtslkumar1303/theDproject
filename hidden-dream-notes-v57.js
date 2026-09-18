(()=>{
  const build=()=>{
    const shell=document.querySelector('.tdp-dreamboard-shell');
    if(!shell || document.querySelector('.tdp-hidden-dream-notes')) return !!shell;

    shell.classList.add('tdp-dreamnotes-replaced');

    const wrap=document.createElement('section');
    wrap.className='tdp-hidden-dream-notes';
    wrap.setAttribute('aria-label','Hidden dream notes');
    wrap.innerHTML=`
      <div class="tdp-dreamnotes-head">
        <div class="tdp-dreamnotes-kicker">a few little futures, folded away</div>
        <h3>Open whichever one finds you…</h3>
        <p>Four tiny notes. Four someday-things I quietly imagine.</p>
      </div>
      <div class="tdp-dreamnotes-stack">
        <article class="tdp-dreamnote" style="--tilt:-1.1deg">
          <button class="tdp-dreamnote-toggle" type="button" aria-expanded="false">
            <span class="tdp-note-folded">
              <span class="tdp-note-label"><strong>For a night full of songs</strong><span>01</span></span>
              <span class="tdp-note-hint">open the ticket →</span>
            </span>
            <span class="tdp-note-reveal">
              <span class="tdp-note-art tdp-art-ticket" aria-hidden="true"></span>
              <h4>A concert, someday.</h4>
              <p>One evening, your playlist, my favourite songs, and a crowd loud enough to make everything else disappear.</p>
            </span>
          </button>
        </article>
        <article class="tdp-dreamnote" style="--tilt:1deg">
          <button class="tdp-dreamnote-toggle" type="button" aria-expanded="false">
            <span class="tdp-note-folded">
              <span class="tdp-note-label"><strong>For one slow golden hour</strong><span>02</span></span>
              <span class="tdp-note-hint">open the polaroid →</span>
            </span>
            <span class="tdp-note-reveal">
              <span class="tdp-note-art tdp-art-sunset" aria-hidden="true"></span>
              <h4>A sunset with nowhere to rush.</h4>
              <p>Just a quiet sky, some music, maybe a little wind, and enough time to watch the colours change.</p>
            </span>
          </button>
        </article>
        <article class="tdp-dreamnote" style="--tilt:.8deg">
          <button class="tdp-dreamnote-toggle" type="button" aria-expanded="false">
            <span class="tdp-note-folded">
              <span class="tdp-note-label"><strong>For a place we haven’t seen yet</strong><span>03</span></span>
              <span class="tdp-note-hint">open the postcard →</span>
            </span>
            <span class="tdp-note-reveal">
              <span class="tdp-note-art tdp-art-postcard" aria-hidden="true"></span>
              <h4>Beach or mountains — you choose.</h4>
              <p>A tiny trip with peace, photographs, roadside food, cold air or sea breeze, and no strict itinerary.</p>
            </span>
          </button>
        </article>
        <article class="tdp-dreamnote" style="--tilt:-.7deg">
          <button class="tdp-dreamnote-toggle" type="button" aria-expanded="false">
            <span class="tdp-note-folded">
              <span class="tdp-note-label"><strong>For a night of garba lights</strong><span>04</span></span>
              <span class="tdp-note-hint">open the pass →</span>
            </span>
            <span class="tdp-note-reveal">
              <span class="tdp-note-art tdp-art-navratri" aria-hidden="true"></span>
              <h4>One Navratri evening.</h4>
              <p>Traditional clothes, loud garba, tired feet, late-night food, and one memory that feels very Gujarat.</p>
            </span>
          </button>
        </article>
      </div>
      <div class="tdp-dreamnotes-footer">Tap any note again to fold it back.</div>`;

    shell.insertAdjacentElement('afterend',wrap);

    wrap.querySelectorAll('.tdp-dreamnote-toggle').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const note=btn.closest('.tdp-dreamnote');
        const open=note.classList.toggle('is-open');
        btn.setAttribute('aria-expanded',open?'true':'false');
        if(window.tdpTrack){
          window.tdpTrack(open?'dream_note_open':'dream_note_close',{
            note:[...wrap.querySelectorAll('.tdp-dreamnote')].indexOf(note)+1
          });
        }
      });
    });
    return true;
  };

  const start=()=>{
    if(build()) return;
    const mo=new MutationObserver(()=>{ if(build()) mo.disconnect(); });
    mo.observe(document.documentElement,{childList:true,subtree:true});
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
