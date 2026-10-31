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
<div class="password-hint">You already know the password</div>
          <div class="password-row">
            <input id="letterPassword" class="password-input" type="password" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="4" aria-label="Password" aria-describedby="passwordMessage">
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
    sheetClone.innerHTML='<section class="hero sheet-original-hero"><div class="hero-inner"><div class="kicker">a little confession I kept rewriting until it felt honest</div><p class="subtitle">Maybe sharing March was only the first coincidence.</p></div></section>';
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

  let wrongPasswordAttempts=0;
  async function unlockLetter(){
    primeOpeningAudio();
    if(card.classList.contains('is-unlocking')||validating)return;
    if(passwordInput.value.length!==4){
      passwordMessage.textContent='Think of a date you already know.';
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

      setTimeout(()=>{
        const sheetRect=confessionSheet.getBoundingClientRect();
        const root=document.documentElement;
        const viewportWidth=root.clientWidth;
        const viewportHeight=window.innerHeight;
        root.style.setProperty('--sheet-start-top',sheetRect.top+'px');
        root.style.setProperty('--sheet-start-left',sheetRect.left+'px');
        root.style.setProperty('--sheet-start-width',sheetRect.width+'px');
        root.style.setProperty('--sheet-start-height',sheetRect.height+'px');
        root.style.setProperty('--sheet-start-scale-x',String(sheetRect.width/viewportWidth));
        root.style.setProperty('--sheet-start-scale-y',String(sheetRect.height/viewportHeight));
        let finished=false,fallbackTimer=0;
        const finishExpansion=()=>{
          if(finished)return;
          finished=true;clearTimeout(fallbackTimer);
          confessionSheet.removeEventListener('transitionend',onExpansionEnd);
          document.body.classList.add('letter-main-open');
          if(mainLetter){mainLetter.inert=false;mainLetter.setAttribute('aria-hidden','false')}
          letterOpened.checked=true;
          letterOpened.dispatchEvent(new Event('change'));
          setTimeout(()=>{
            openScreen.style.display='none';
            openScreen.setAttribute('aria-hidden','true');
            document.body.classList.remove('letter-expanding');
            ['--sheet-start-top','--sheet-start-left','--sheet-start-width','--sheet-start-height','--sheet-start-scale-x','--sheet-start-scale-y'].forEach(name=>root.style.removeProperty(name));
          },120);
        };
        const onExpansionEnd=e=>{
          if(e.target===confessionSheet&&(e.propertyName==='width'||e.propertyName==='height'||e.propertyName==='top'))finishExpansion();
        };
        confessionSheet.addEventListener('transitionend',onExpansionEnd);
        document.body.classList.add('letter-expanding');
        card.classList.add('letter-transition');
        requestAnimationFrame(()=>requestAnimationFrame(()=>{
          card.classList.add('page-fill');
          const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          fallbackTimer=setTimeout(finishExpansion,reduced?30:1100);
        }));
      },1900);
    }else{
      wrongPasswordAttempts++;
      passwordMessage.textContent=wrongPasswordAttempts%2
        ? "Wrong one. Think of a date you already know."
        : 'You’re very close. March has the answer.';
      card.classList.remove('wrong-shake');
      void card.offsetWidth;
      card.classList.add('wrong-shake');
      passwordInput.select();
    }
  }

  unlockBtn.addEventListener('click',unlockLetter);
  passwordInput.addEventListener('keydown',e=>{if(e.key==='Enter')unlockLetter()});

  /* Golden hourglass countdown for The D Project. */
  const seasonDeadline = new Date('2026-11-01T23:59:59+05:30').getTime();
  const waitingPanel = document.createElement('section');
  waitingPanel.className = 'tdp-waiting-panel';
  waitingPanel.setAttribute('aria-live','polite');
  waitingPanel.innerHTML = `
    <h2 class="tdp-waiting-title">This chapter is nearing its last page</h2>
    <div class="tdp-hourglass" role="img" aria-label="Animated golden hourglass">
      <span class="tdp-glass-top"><i></i></span><span class="tdp-glass-neck"></span>
      <span class="tdp-sand-stream"></span><span class="tdp-glass-bottom"><i></i></span>
      <span class="tdp-glass-frame"></span>
    </div>
    <div class="tdp-countdown" aria-label="Time remaining">
      <span><b data-unit="days">--</b><small>days</small></span>
      <span><b data-unit="hours">--</b><small>hours</small></span>
      <span><b data-unit="minutes">--</b><small>minutes</small></span>
      <span><b data-unit="seconds">--</b><small>seconds</small></span>
    </div>
    <p class="tdp-waiting-note">Let time find its moment.</p>`;
  card.prepend(waitingPanel);

  const waitingStyle = document.createElement('style');
  waitingStyle.textContent = `
    .tdp-waiting-panel{position:relative;z-index:5;margin:0 auto 26px;padding:2px 8px 18px;text-align:center;color:#fff4e3}
    .tdp-waiting-title{margin:0 auto 12px;font:italic 600 clamp(1.35rem,5vw,2rem)/1.25 Georgia,serif}
    .tdp-waiting-note{margin:12px 0 0;font:italic .92rem Georgia,serif;color:rgba(255,244,227,.82)}
    .tdp-countdown{display:flex;justify-content:center;gap:clamp(10px,3vw,22px);margin:14px auto 0}
    .tdp-countdown span{display:grid;gap:3px;min-width:48px}
    .tdp-countdown b{font:500 clamp(1.25rem,5vw,1.8rem)/1 Georgia,serif;font-variant-numeric:tabular-nums;color:#f3d39a}
    .tdp-countdown small{font:500 .62rem Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,244,227,.7)}
    .tdp-hourglass{position:relative;width:72px;height:92px;margin:0 auto 8px;filter:drop-shadow(0 0 12px rgba(224,181,111,.2))}
    .tdp-glass-top,.tdp-glass-bottom{position:absolute;left:12px;width:48px;height:39px;overflow:hidden;border:1.5px solid rgba(240,207,151,.9);background:linear-gradient(135deg,rgba(255,255,255,.22),rgba(255,255,255,.035))}
    .tdp-glass-top{top:5px;clip-path:polygon(0 0,100% 0,58% 100%,42% 100%);border-radius:5px 5px 12px 12px}
    .tdp-glass-bottom{bottom:5px;clip-path:polygon(42% 0,58% 0,100% 100%,0 100%);border-radius:12px 12px 5px 5px}
    .tdp-glass-top i,.tdp-glass-bottom i{position:absolute;left:4px;right:4px;bottom:0;height:70%;background:linear-gradient(180deg,#f5d99e,#bd8744);opacity:.92}
    .tdp-glass-top i{clip-path:polygon(0 0,100% 0,58% 100%,42% 100%);transform-origin:bottom;animation:tdpTopSand 12s linear infinite}
    .tdp-glass-bottom i{height:18%;clip-path:polygon(42% 0,58% 0,100% 100%,0 100%);animation:tdpBottomSand 12s linear infinite}
    .tdp-glass-neck{position:absolute;z-index:2;left:34px;top:40px;width:4px;height:13px;background:#e8c78e}
    .tdp-sand-stream{position:absolute;z-index:3;left:35px;top:45px;width:2px;height:18px;background:linear-gradient(#f8e5b9,rgba(248,229,185,0));transform-origin:top;animation:tdpSandFlow .85s ease-in-out infinite}
    .tdp-glass-frame{position:absolute;inset:0;border-top:2px solid #d9b77e;border-bottom:2px solid #d9b77e;pointer-events:none}
    .tdp-glass-frame:before,.tdp-glass-frame:after{content:"";position:absolute;left:10px;width:52px;height:2px;background:#d9b77e}
    .tdp-glass-frame:before{top:1px}.tdp-glass-frame:after{bottom:1px}
    @keyframes tdpTopSand{0%{transform:scaleY(1)}100%{transform:scaleY(.05)}}
    @keyframes tdpBottomSand{0%{height:8%}100%{height:82%}}
    @keyframes tdpSandFlow{0%,100%{opacity:.35;transform:scaleY(.65)}50%{opacity:1;transform:scaleY(1)}}
    .tdp-season-ended .tdp-waiting-title{max-width:22ch}
    .tdp-season-ended .tdp-countdown,.tdp-season-ended .tdp-waiting-note{display:none}
    .tdp-season-ended .tdp-sand-stream{display:none}
    .tdp-season-ended .tdp-glass-top i{height:3%;animation:none}
    .tdp-season-ended .tdp-glass-bottom i{height:88%;animation:none}
    .tdp-season-ended #sealOpenBtn{pointer-events:none!important;opacity:.55;filter:grayscale(.4)}
    .tdp-season-ended #passwordGate{display:none!important}
    .tdp-season-ended .wax-seal-real{cursor:not-allowed!important}
    @media(max-width:420px){.tdp-waiting-panel{margin-bottom:18px}.tdp-countdown span{min-width:42px}}
    @media(prefers-reduced-motion:reduce){.tdp-glass-top i,.tdp-glass-bottom i,.tdp-sand-stream{animation:none!important}}
  `;
  document.head.appendChild(waitingStyle);

  const countdownNodes = Object.fromEntries([...waitingPanel.querySelectorAll('[data-unit]')].map(node=>[node.dataset.unit,node]));
  let waitingTimer = 0;
  function updateWaitingExperience(){
    const remaining = seasonDeadline - Date.now();
    if(remaining <= 0){
      waitingPanel.querySelector('.tdp-waiting-title').textContent='This little chapter has reached the end of its season';
      waitingPanel.classList.add('tdp-season-ended');
      card.classList.add('tdp-season-ended');
      sealOpenBtn.disabled=true;
      sealOpenBtn.setAttribute('aria-disabled','true');
      sealOpenBtn.setAttribute('aria-label','Envelope closed');
      passwordGate.inert=true;
      passwordGate.hidden=true;
      passwordGate.setAttribute('aria-hidden','true');
      clearInterval(waitingTimer);
      return;
    }
    const seconds=Math.floor(remaining/1000);
    countdownNodes.days.textContent=String(Math.floor(seconds/86400)).padStart(2,'0');
    countdownNodes.hours.textContent=String(Math.floor(seconds%86400/3600)).padStart(2,'0');
    countdownNodes.minutes.textContent=String(Math.floor(seconds%3600/60)).padStart(2,'0');
    countdownNodes.seconds.textContent=String(seconds%60).padStart(2,'0');
  }
  updateWaitingExperience();
  waitingTimer=setInterval(updateWaitingExperience,1000);
})();
