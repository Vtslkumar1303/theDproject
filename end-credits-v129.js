(()=>{
  const mount=()=>{
    if(document.querySelector('.tdp-end-credits')) return true;

    const khat=document.querySelector('.spotify-player,#musicCard');
    if(!khat || !khat.parentNode) return false;

    const section=document.createElement('section');
    section.className='tdp-end-credits';
    section.setAttribute('aria-label','End credits');

    section.innerHTML=`
      <button class="tdp-credits-fold" type="button" aria-expanded="false">
        <span class="tdp-credits-thread" aria-hidden="true">
          <span class="tdp-credits-knot"></span>
        </span>
        <span class="tdp-credits-paper">
          <span class="tdp-credits-tab">End credits</span>
          <span class="tdp-credits-hint">tap only if you’re curious</span>
        </span>
      </button>

      <div class="tdp-credits-note" hidden>
        <div class="tdp-credits-note-inner">
          <span class="tdp-credits-small-title">End credits</span>

          <p>Okay, so… this all started as just a thought a year ago, when I began talking to you during Navratri.</p>

          <p>And somehow, every little thought I had whenever I met you slowly became part of the whole idea behind this confession letter.</p>

          <p>I don’t want this to come across as me boasting, because that’s not what this is. It was genuinely built from scratch — brick by brick, thought by thought — not copied from a template or pasted from somewhere else.</p>

          <p>Every little detail here came from something I felt, remembered, noticed, overthought, or simply wanted to say.</p>

          <p class="tdp-credits-signoff">So that’s it… 1303, signing off.</p>
        </div>
      </div>
    `;

    khat.insertAdjacentElement('afterend',section);

    const btn=section.querySelector('.tdp-credits-fold');
    const note=section.querySelector('.tdp-credits-note');

    btn.addEventListener('click',()=>{
      const open=section.classList.toggle('is-open');
      btn.setAttribute('aria-expanded',String(open));

      if(open){
        note.hidden=false;
        requestAnimationFrame(()=>{
          requestAnimationFrame(()=>section.classList.add('is-unfolded'));
        });
      }else{
        section.classList.remove('is-unfolded');
        setTimeout(()=>{
          if(!section.classList.contains('is-open')) note.hidden=true;
        },520);
      }
    });

    return true;
  };

  if(!mount()){
    let tries=0;
    const timer=setInterval(()=>{
      tries++;
      if(mount() || tries>100) clearInterval(timer);
    },100);
  }
})();