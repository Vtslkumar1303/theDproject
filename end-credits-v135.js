(()=>{
  const mount=()=>{
    if(document.querySelector('.tdp-end-credits')) return true;

    const khat=document.querySelector('.spotify-player,#musicCard');
    if(!khat || !khat.parentNode) return false;

    const section=document.createElement('section');
    section.className='tdp-end-credits';
    section.setAttribute('aria-label','End credits');

    section.innerHTML=`
      <button class="tdp-credits-roll" type="button" aria-expanded="false" aria-label="Open end credits">
        <span class="tdp-roll-body" aria-hidden="true">
          <span class="tdp-roll-cap left"></span>
          <span class="tdp-roll-cap right"></span>
          <span class="tdp-roll-paper-lines l1"></span>
          <span class="tdp-roll-paper-lines l2"></span>
          <span class="tdp-roll-thread thread-h"></span>
          <span class="tdp-roll-thread thread-v"></span>
          <span class="tdp-roll-knot"></span>
        </span>

        <span class="tdp-roll-copy">
          <strong>End credits</strong>
          <small>tap if you’re curious</small>
        </span>
      </button>

      <button class="tdp-credits-note" type="button" hidden aria-label="Close end credits">
        <span class="tdp-credits-note-inner">
          <span class="tdp-credits-small-title">End credits</span>

          <span class="tdp-credit-paragraph">Okay, so… this all started as just a thought a year ago, when I began talking to you during Navratri.</span>

          <span class="tdp-credit-paragraph">And somehow, every little thought I had whenever I met you slowly became part of the whole idea behind this confession letter.</span>

          <span class="tdp-credit-paragraph">I don’t want this to come across as me boasting, because that’s not what this is. It was genuinely built from scratch — brick by brick, thought by thought — not copied from a template or pasted from somewhere else.</span>

          <span class="tdp-credit-paragraph">Every little detail here came from something I felt, remembered, noticed, overthought, or simply wanted to say.</span>

          <span class="tdp-credit-paragraph">So, if you’re reading this part too, I want you to notice the small sentences, the words, and the tiny details hidden in between — and feel that they were intentionally kept there for you.</span>

          <span class="tdp-credits-close-hint">tap the note to roll it back</span>
        </span>
      </button>

      <p class="tdp-letter-signoff">So that’s it… 1303, signing off.</p>
    `;

    khat.insertAdjacentElement('afterend',section);

    const roll=section.querySelector('.tdp-credits-roll');
    const note=section.querySelector('.tdp-credits-note');

    const setOpen=(open)=>{
      section.classList.toggle('is-open',open);
      roll.setAttribute('aria-expanded',String(open));

      if(open){
        note.hidden=false;
        requestAnimationFrame(()=>{
          requestAnimationFrame(()=>section.classList.add('is-unfolded'));
        });
      }else{
        section.classList.remove('is-unfolded');
        setTimeout(()=>{
          if(!section.classList.contains('is-open')) note.hidden=true;
        },420);
      }
    };

    roll.addEventListener('click',()=>setOpen(true));
    note.addEventListener('click',()=>setOpen(false));

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