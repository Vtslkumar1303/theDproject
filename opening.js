(()=>{
  const openScreen=document.getElementById('openScreen');
  const letterOpened=document.getElementById('letterOpened');
  if(!openScreen||!letterOpened)return;
  const mainLetter=document.querySelector('main');
  if(mainLetter){mainLetter.inert=true;mainLetter.setAttribute('aria-hidden','true')}

  const originalHero=document.querySelector('main .hero');
  const originalHeroTitle=originalHero?.querySelector('h1');
  if(originalHeroTitle) originalHeroTitle.textContent='To, My March';
  const originalHeroSubtitle=originalHero?.querySelector('.subtitle');
  if(originalHeroSubtitle) originalHeroSubtitle.textContent='Maybe sharing March was only the first coincidence.';

  const coverTitleMarkup=`<span class="cover-word" aria-hidden="true">
    <span class="cover-letter" style="--i:0">T</span><span class="cover-letter" style="--i:1">o</span><span class="cover-letter" style="--i:2">,</span><span class="cover-letter cover-space" style="--i:3">&nbsp;</span><span class="cover-letter" style="--i:4">M</span><span class="cover-letter" style="--i:5">y</span><span class="cover-letter cover-space" style="--i:6">&nbsp;</span><span class="cover-letter" style="--i:7">m</span><span class="cover-letter" style="--i:8">a</span><span class="cover-letter" style="--i:9">r</span><span class="cover-letter" style="--i:10">c</span><span class="cover-letter" style="--i:11">h</span></span><span class="cover-emoji cover-nazar" aria-hidden="true">🧿</span><span class="cover-emoji cover-sparkle" aria-hidden="true">✨</span><span class="sr-only">To, My march 🧿✨</span>`;

  openScreen.innerHTML=`
    <div class="open-card confession-envelope-card" id="envelopeCard">
      <div class="confession-kicker">A confession I kept folding into silence</div>
      <p class="confession-whisper">Some feelings stay quiet for so long that eventually the only kind thing you can do is give them words.</p>

      <div class="real-envelope" id="realEnvelope">
        <div class="envelope-ground-shadow"></div>
        <div class="envelope-back"></div>

        <div class="confession-sheet" id="confessionSheet" aria-hidden="true">
          <div class="sheet-letter-clone" id="sheetLetterClone"></div>
        </div>

        <div class="envelope-flap-real"></div>
        <div class="envelope-front-real"></div>
        <div class="envelope-pocket-light"></div>

        <div class="envelope-cover-title" aria-label="To, My march 🧿✨">${coverTitleMarkup}</div>

        <div id="passwordGate" class="envelope-password-panel" aria-hidden="true" inert>
          <div class="password-glow" aria-hidden="true"></div>
          <div class="password-tape"></div>
          <div class="password-heart" aria-hidden="true"></div>
          <label for="letterPassword" class="password-label">One tiny secret</label>
          <div class="password-hint">You already know the password</div>
          <div class="password-row">
            <input id="letterPassword" class="password-input" type="password" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="4" aria-describedby="passwordMessage">
            <button id="unlockBtn" class="unlock-btn" type="button"><span>Open</span><i aria-hidden="true">♡</i></button>
          </div>
          <div id="passwordMessage" class="password-message" aria-live="polite"></div>
          <button id="closePasswordEnvelopeBtn" class="close-password-envelope-btn" type="button">Close envelope</button>
        </div>

        <button class="wax-seal-real" id="sealOpenBtn" type="button" aria-label="Reveal password"></button>

        <i class="magic-speck sp1"></i><i class="magic-speck sp2"></i><i class="magic-speck sp3"></i>
        <i class="magic-speck sp4"></i><i class="magic-speck sp5"></i><i class="magic-speck sp6"></i>
        <i class="magic-speck sp7"></i><i class="magic-speck sp8"></i><i class="magic-speck sp9"></i><i class="magic-speck sp10"></i>
      </div>
    </div>`;

  const sheetClone=document.getElementById('sheetLetterClone');
  if(originalHero&&sheetClone){
    const clone=originalHero.cloneNode(true);
    clone.classList.add('sheet-original-hero');
    clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
    clone.querySelectorAll('[aria-hidden="false"]').forEach(el=>el.removeAttribute('aria-hidden'));
    const cloneTitle=clone.querySelector('h1');
    if(cloneTitle){
      cloneTitle.textContent='To, My March';
      cloneTitle.classList.add('tdp-opening-clone-title');
    }
    sheetClone.appendChild(clone);
  }else if(sheetClone){
    sheetClone.innerHTML='<section class="hero sheet-original-hero"><div class="hero-inner"><div class="kicker">A letter I probably overthought too much</div><p class="subtitle">Some feelings stay quiet for so long that eventually the only kind thing you can do is give them words.</p></div></section>';
  }

  requestAnimationFrame(()=>openScreen.classList.add('tdp-opening-ready'));

  const card=document.getElementById('envelopeCard');
  const sealOpenBtn=document.getElementById('sealOpenBtn');
  const passwordGate=document.getElementById('passwordGate');
  const passwordInput=document.getElementById('letterPassword');
  const unlockBtn=document.getElementById('unlockBtn');
  const passwordMessage=document.getElementById('passwordMessage');
  const confessionSheet=document.getElementById('confessionSheet');
  const closeEnvelopeBtn=document.getElementById('closePasswordEnvelopeBtn');
  let focusTimer=null;
  let validationAttempt=0;
  let validating=false;
  const expectedHash='bf0a60ee19adc7954e2248d0c4fd7fed44671ea2cff24a6c75127f9ce0183608';

  let openingAudioContext=null;
  function primeOpeningAudio(){
    try{
      const AC=window.AudioContext||window.webkitAudioContext;
      if(!AC)return null;
      if(!openingAudioContext)openingAudioContext=new AC();
      if(openingAudioContext.state==='suspended')openingAudioContext.resume();
      return openingAudioContext;
    }catch(e){return null;}
  }

  function playCuteOpeningSound(){
    const ctx=primeOpeningAudio();
    if(!ctx)return;
    const now=ctx.currentTime+.02;
    const master=ctx.createGain();
    master.gain.setValueAtTime(.0001,now);
    master.gain.exponentialRampToValueAtTime(.18,now+.025);
    master.gain.exponentialRampToValueAtTime(.0001,now+1.08);
    master.connect(ctx.destination);

    [[659.25,0,.62],[783.99,.13,.54],[987.77,.27,.62]].forEach(([freq,delay,dur],idx)=>{
      const osc=ctx.createOscillator();
      const gain=ctx.createGain();
      osc.type=idx===2?'sine':'triangle';
      osc.frequency.setValueAtTime(freq,now+delay);
      gain.gain.setValueAtTime(.0001,now+delay);
      gain.gain.exponentialRampToValueAtTime(idx===2?.10:.075,now+delay+.025);
      gain.gain.exponentialRampToValueAtTime(.0001,now+delay+dur);
      osc.connect(gain);gain.connect(master);
      osc.start(now+delay);osc.stop(now+delay+dur+.03);
    });

    try{
      const length=Math.floor(ctx.sampleRate*.38);
      const buffer=ctx.createBuffer(1,length,ctx.sampleRate);
      const data=buffer.getChannelData(0);
      for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*Math.pow(1-i/length,2.4);
      const noise=ctx.createBufferSource();
      const filter=ctx.createBiquadFilter();
      const gain=ctx.createGain();
      filter.type='bandpass';filter.frequency.value=1150;filter.Q.value=.7;
      gain.gain.setValueAtTime(.0001,now+.05);
      gain.gain.exponentialRampToValueAtTime(.028,now+.09);
      gain.gain.exponentialRampToValueAtTime(.0001,now+.42);
      noise.buffer=buffer;noise.connect(filter);filter.connect(gain);gain.connect(master);
      noise.start(now+.05);
    }catch(e){}
  }

  function revealPassword(){
    if(card.classList.contains('password-visible')||card.classList.contains('is-unlocking'))return;
    card.classList.add('password-visible');
    passwordGate.inert=false;
    passwordGate.setAttribute('aria-hidden','false');
    sealOpenBtn.setAttribute('aria-label','Close envelope');
    focusTimer=setTimeout(()=>{if(card.classList.contains('password-visible')&&!card.classList.contains('is-unlocking'))passwordInput.focus({preventScroll:true})},360);
  }

  function closePasswordEnvelope(){
    if(card.classList.contains('is-unlocking'))return;
    clearTimeout(focusTimer);
    validationAttempt++;
    validating=false;
    card.classList.remove('password-visible','wrong-shake');
    passwordGate.inert=true;
    passwordGate.setAttribute('aria-hidden','true');
    passwordInput.value='';
    passwordMessage.textContent='';
    sealOpenBtn.setAttribute('aria-label','Reveal password');
    sealOpenBtn.focus({preventScroll:true});
  }
  sealOpenBtn.addEventListener('click',()=>{primeOpeningAudio();card.classList.contains('password-visible')?closePasswordEnvelope():revealPassword()});
  closeEnvelopeBtn.addEventListener('click',closePasswordEnvelope);
  document.getElementById('realEnvelope').addEventListener('click',e=>{
    if(card.classList.contains('password-visible')&&!e.target.closest('#passwordGate,#sealOpenBtn'))closePasswordEnvelope();
  });
  passwordGate.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();closePasswordEnvelope()}});

  passwordInput.addEventListener('input',()=>{
    passwordInput.value=passwordInput.value.replace(/\D/g,'').slice(0,4);
    passwordMessage.textContent='';
  });

  async function sha256(text){
    const data=new TextEncoder().encode(text);
    const digest=await crypto.subtle.digest('SHA-256',data);
    return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');
  }

  async function unlockLetter(){
    primeOpeningAudio();
    if(card.classList.contains('is-unlocking')||validating)return;
    if(passwordInput.value.length!==4){
      passwordMessage.textContent='Please enter the password.';
      passwordInput.focus({preventScroll:true});
      return;
    }

    validating=true;
    const attempt=++validationAttempt;
    let valid;
    try{valid=await sha256(passwordInput.value)===expectedHash}catch(e){if(attempt!==validationAttempt)return;validating=false;passwordMessage.textContent='Please try opening the letter again.';return}
    if(attempt!==validationAttempt)return;
    validating=false;
    if(valid){
      passwordMessage.textContent='';
      card.classList.add('is-unlocking');
      card.classList.remove('password-visible');
      clearTimeout(focusTimer);
      passwordInput.blur();
      passwordGate.inert=true;
      passwordGate.hidden=true;
      passwordGate.setAttribute('aria-hidden','true');
      passwordGate.style.setProperty('display','none','important');
      closeEnvelopeBtn.disabled=true;
      unlockBtn.disabled=true;
      passwordInput.readOnly=true;
      sealOpenBtn.disabled=true;
      playCuteOpeningSound();

      setTimeout(()=>card.classList.add('seal-released'),100);
      setTimeout(()=>card.classList.add('envelope-open'),500);

      setTimeout(()=>{
        confessionSheet.setAttribute('aria-hidden','false');
        card.classList.add('sheet-ready');
        requestAnimationFrame(()=>requestAnimationFrame(()=>{
          card.classList.add('sheet-rise','magic-burst-final');
        }));
      },980);

      setTimeout(()=>card.classList.add('sheet-expand'),1900);
      setTimeout(()=>{
        const sheetRect=confessionSheet.getBoundingClientRect();
        const root=document.documentElement;
        root.style.setProperty('--sheet-start-top',`${sheetRect.top}px`);
        root.style.setProperty('--sheet-start-left',`${sheetRect.left}px`);
        root.style.setProperty('--sheet-start-width',`${sheetRect.width}px`);
        root.style.setProperty('--sheet-start-height',`${sheetRect.height}px`);
        document.body.classList.add('letter-expanding');
        card.classList.add('letter-transition');
        requestAnimationFrame(()=>requestAnimationFrame(()=>card.classList.add('page-fill')));
      },2650);
      setTimeout(()=>{
        document.body.classList.add('letter-main-open');
        if(mainLetter){mainLetter.inert=false;mainLetter.setAttribute('aria-hidden','false')}
        letterOpened.checked=true;
        letterOpened.dispatchEvent(new Event('change'));
        setTimeout(()=>{
          openScreen.style.display='none';
          openScreen.setAttribute('aria-hidden','true');
          document.body.classList.remove('letter-expanding');
          ['--sheet-start-top','--sheet-start-left','--sheet-start-width','--sheet-start-height'].forEach(name=>document.documentElement.style.removeProperty(name));
        },120);
      },3380);
    }else{
      passwordMessage.textContent='Not quite. Please try again.';
      card.classList.remove('wrong-shake');
      void card.offsetWidth;
      card.classList.add('wrong-shake');
      passwordInput.select();
    }
  }

  unlockBtn.addEventListener('click',unlockLetter);
  passwordInput.addEventListener('keydown',e=>{if(e.key==='Enter')unlockLetter()});
})();
