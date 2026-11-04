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

  /* Shooting-star countdown and timeline progress for The D Project. */
  const progressStart = new Date('2026-10-29T21:35:00+05:30').getTime();
  const seasonDeadline = new Date('2026-11-01T23:59:59+05:30').getTime();
  const progressDuration = seasonDeadline - progressStart;
  const waitingPanel = document.createElement('section');
  waitingPanel.className = 'tdp-waiting-panel';
  waitingPanel.setAttribute('aria-live','polite');
  waitingPanel.innerHTML = `
    <div class="tdp-letter-paper" aria-label="A little letter">
      <div class="tdp-progress-meta"><span>The final fold has arrived.</span></div>
      <p class="tdp-progress-caption">What was once awaited is now simply a part of the story.</p>
    </div>
    <p class="tdp-waiting-note">This little memory will soon be tucked away.</p>
    <div class="tdp-countdown-stage">
      <div class="tdp-shooting-star" role="img" aria-label="A small golden shooting star">
        <span class="tdp-star-trail"></span><span class="tdp-star-core">✦</span><span class="tdp-star-sparkle">✧</span>
      </div>
      <div class="tdp-countdown" aria-label="Time remaining">
        <span><b data-unit="days">--</b><small>D</small></span>
        <span><b data-unit="hours">--</b><small>H</small></span>
        <span><b data-unit="minutes">--</b><small>M</small></span>
        <span><b data-unit="seconds">--</b><small>S</small></span>
      </div>
    </div>
    <div class="tdp-progress-wrap">
      <div class="tdp-progress-track" role="progressbar" aria-label="Progress towards the envelope being sealed" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-progressbar>
        <span class="tdp-progress-fill" data-progress-fill></span>
      </div>
    </div>
    <p class="tdp-signoff" aria-label="1303 Signing Off">
      <span>1303</span><span class="tdp-signoff-gap"> </span><span>Signing Off</span><span class="tdp-signoff-ellipsis">…</span>
    </p>
  `;
  card.append(waitingPanel);
  const letterPaper = waitingPanel.querySelector('.tdp-letter-paper');
  if(letterPaper){
    requestAnimationFrame(()=>setTimeout(()=>{
      if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        letterPaper.classList.add('tdp-letter-crumpling');
        setTimeout(()=>letterPaper.remove(),1250);
      }else{
        letterPaper.style.transition='opacity .35s ease, transform .35s ease';
        letterPaper.style.opacity='0';
        letterPaper.style.transform='translateY(12px)';
        setTimeout(()=>letterPaper.remove(),400);
      }
    },2000));
  }

  const waitingStyle = document.createElement('style');
  waitingStyle.textContent = `
    .tdp-waiting-panel{position:relative;z-index:5;width:min(100%,238px);margin:9px auto 0;padding:5px;text-align:center;color:#fff4e3}
    .tdp-letter-paper{position:relative;isolation:isolate;width:fit-content;max-width:100%;margin:0 auto 7px;padding:11px 13px 10px;border:1px solid rgba(183,143,91,.42);border-radius:2px;background:linear-gradient(145deg,#fff8e9 0%,#f3e5cc 55%,#ead7b8 100%);color:#5c4632;box-shadow:0 5px 13px rgba(0,0,0,.2),inset 0 0 18px rgba(164,119,67,.1);transform-origin:52% 48%;will-change:transform,opacity,clip-path,filter}
    .tdp-letter-paper:before,.tdp-letter-paper:after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:0}
    .tdp-letter-paper:before{background:repeating-linear-gradient(28deg,transparent 0 9px,rgba(112,83,55,.24) 9.5px 10px,transparent 10.5px 17px),repeating-linear-gradient(147deg,transparent 0 13px,rgba(255,255,255,.72) 13.5px 14px,transparent 14.5px 22px);mix-blend-mode:multiply}
    .tdp-letter-paper:after{inset:2px;background:radial-gradient(ellipse at 25% 20%,rgba(255,255,255,.8),transparent 48%),linear-gradient(135deg,transparent 42%,rgba(93,65,39,.26) 49%,transparent 56%),linear-gradient(35deg,transparent 42%,rgba(255,255,255,.72) 49%,transparent 56%);filter:contrast(1.2)}
    .tdp-letter-paper .tdp-progress-meta{margin:0 auto 5px;color:#765a3e;font:italic .68rem Georgia,serif}
    .tdp-letter-paper .tdp-progress-caption{color:#80674c;font:italic .58rem/1.35 Georgia,serif}
    .tdp-letter-paper.tdp-letter-crumpling{animation:tdpLetterCrumple 1.15s cubic-bezier(.45,0,.8,.35) forwards}
    .tdp-letter-paper.tdp-letter-crumpling:before,.tdp-letter-paper.tdp-letter-crumpling:after{opacity:.9;transition:opacity .18s ease}
    @keyframes tdpLetterCrumple{
      0%{transform:perspective(500px) rotate(0) scale(1);clip-path:polygon(0 0,100% 0,100% 100%,0 100%);filter:none;opacity:1}
      24%{transform:perspective(500px) rotateX(28deg) rotateZ(-9deg) scale(.88,.82);clip-path:polygon(8% 0,92% 4%,100% 86%,12% 100%);filter:contrast(1.08)}
      48%{transform:perspective(500px) rotateX(-32deg) rotateY(24deg) rotateZ(17deg) scale(.58,.62);clip-path:polygon(28% 5%,82% 18%,96% 72%,62% 100%,8% 78%,16% 30%);filter:contrast(1.22) drop-shadow(0 4px 3px rgba(0,0,0,.2))}
      70%{transform:perspective(500px) rotateX(55deg) rotateY(-38deg) rotateZ(-35deg) scale(.34,.4);clip-path:polygon(35% 0,78% 18%,100% 55%,72% 100%,20% 86%,0 38%);filter:contrast(1.35) drop-shadow(0 6px 4px rgba(0,0,0,.24))}
      100%{transform:perspective(500px) translate(48px,125vh) rotateX(160deg) rotateY(210deg) rotateZ(760deg) scale(.08);clip-path:polygon(42% 10%,75% 22%,88% 55%,65% 88%,25% 82%,12% 44%);filter:blur(2px);opacity:0}
    }
    .tdp-waiting-note{margin:3px 0 0;font:italic .55rem Georgia,serif;color:rgba(255,244,227,.58)}
    .tdp-countdown-stage{position:relative;width:min(100%,180px);margin:8px auto 0;padding-top:20px}
    .tdp-countdown{display:flex;justify-content:center;gap:clamp(6px,2vw,11px);margin:0 auto}
    .tdp-countdown span{display:grid;gap:2px;min-width:23px}
    .tdp-countdown b{font:400 clamp(.62rem,2.3vw,.72rem)/1 Georgia,serif;font-variant-numeric:tabular-nums;color:#f3d39a}
    .tdp-countdown small{font:400 .41rem Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,244,227,.68)}
    .tdp-progress-wrap{width:min(100%,198px);margin:9px auto 0;text-align:left}
    .tdp-progress-meta{display:flex;justify-content:center;align-items:center;margin:0 auto 4px;font:italic .57rem Georgia,serif;color:rgba(255,244,227,.78)}
    .tdp-progress-track{height:3px;overflow:hidden;border-radius:99px;background:rgba(255,244,227,.2);box-shadow:inset 0 0 0 1px rgba(255,231,190,.12)}
    .tdp-progress-fill{display:block;width:0;height:100%;border-radius:inherit;background:linear-gradient(90deg,#b9874d,#f5dda9,#fff0cb);box-shadow:0 0 6px rgba(243,211,154,.42);transition:width .8s linear}
    .tdp-signoff{display:flex;justify-content:center;align-items:center;margin:20px auto 0;font:italic .58rem Georgia,serif;letter-spacing:.13em;color:rgba(244,216,174,.78);opacity:0;transform:translateY(7px);animation:tdpSignoffReveal 1.25s cubic-bezier(.2,.7,.25,1) 1.1s forwards}
    .tdp-signoff>span{display:inline-block;animation:tdpSignoffGlow 4.8s ease-in-out 2.4s infinite}
    .tdp-signoff-gap{width:.3em}
    .tdp-signoff-ellipsis{letter-spacing:.22em;animation:tdpSignoffDots 2.2s ease-in-out 2.5s infinite!important}
    @keyframes tdpSignoffReveal{to{opacity:1;transform:translateY(0)}}
    @keyframes tdpSignoffGlow{0%,100%{text-shadow:0 0 0 rgba(244,216,174,0)}50%{text-shadow:0 0 8px rgba(244,216,174,.42)}}
    @keyframes tdpSignoffDots{0%,100%{opacity:.45;transform:translateY(0)}50%{opacity:1;transform:translateY(-1px)}}

    .tdp-progress-caption{margin:0 auto;text-align:center;font:italic .51rem Georgia,serif;color:rgba(255,244,227,.62)}
    .tdp-shooting-star{position:absolute;z-index:2;left:0;top:0;width:100%;height:24px;overflow:visible;pointer-events:none}
    .tdp-star-core{position:absolute;left:0;top:2px;font:15px/1 Georgia,serif;color:#ffe8b6;text-shadow:0 0 5px rgba(255,222,164,.9),0 0 10px rgba(224,174,99,.5);animation:tdpCometFlight 3.8s cubic-bezier(.22,.62,.35,1) infinite}
    .tdp-star-trail{position:absolute;left:0;top:10px;width:32px;height:1px;border-radius:100%;background:linear-gradient(90deg,transparent,rgba(218,169,99,.12),rgba(255,226,174,.9));transform:rotate(-25deg);transform-origin:right center;filter:blur(.25px);animation:tdpCometTrail 3.8s cubic-bezier(.22,.62,.35,1) infinite}
    .tdp-star-sparkle{position:absolute;left:0;top:0;font:9px/1 Georgia,serif;color:#fff0cb;text-shadow:0 0 6px rgba(255,221,164,.8);opacity:0;animation:tdpCometSparkle 3.8s ease-in-out infinite}
    @keyframes tdpCometFlight{0%{opacity:0;transform:translate(-10px,14px) scale(.72)}8%{opacity:1}48%{opacity:1;transform:translate(195px,-4px) scale(1)}57%,100%{opacity:0;transform:translate(205px,-10px) scale(.78)}}
    @keyframes tdpCometTrail{0%,5%{opacity:0;transform:translate(-10px,14px) rotate(-25deg) scaleX(.1)}15%{opacity:.9}48%{opacity:.65;transform:translate(195px,-4px) rotate(-25deg) scaleX(1)}57%,100%{opacity:0;transform:translate(205px,-10px) rotate(-25deg) scaleX(.12)}}
    @keyframes tdpCometSparkle{0%,34%,100%{opacity:0;transform:translate(0,0) scale(.4)}39%{opacity:.85;transform:translate(8px,-6px) scale(1)}45%{opacity:0;transform:translate(12px,-10px) scale(.5)}}
    .tdp-season-ended .tdp-countdown,.tdp-season-ended .tdp-waiting-note{display:none}
    .tdp-season-ended .tdp-shooting-star{opacity:.62}
    .tdp-season-ended .tdp-star-core,.tdp-season-ended .tdp-star-trail{animation:none}
    .tdp-season-ended #sealOpenBtn{pointer-events:none!important;opacity:.55;filter:grayscale(.4)}
    .tdp-season-ended #passwordGate{display:none!important}
    .tdp-season-ended .wax-seal-real{cursor:not-allowed!important}
    @media(max-width:420px){.tdp-waiting-panel{margin-bottom:18px}.tdp-countdown span{min-width:29px}}
    @media(prefers-reduced-motion:reduce){.tdp-star-core,.tdp-star-trail,.tdp-star-sparkle{animation:none!important;opacity:.7}}
  `;
  document.head.appendChild(waitingStyle);

  const countdownNodes = Object.fromEntries([...waitingPanel.querySelectorAll('[data-unit]')].map(node=>[node.dataset.unit,node]));
  const progressBar = waitingPanel.querySelector('[data-progressbar]');
  const progressFill = waitingPanel.querySelector('[data-progress-fill]');
  let waitingTimer = 0;
  function updateTimelineProgress(now){
    const percentage = Math.max(0,Math.min(100,((now-progressStart)/progressDuration)*100));
    const rounded = percentage.toFixed(1);
    progressFill.style.width = percentage + '%';
    progressBar.setAttribute('aria-valuenow',rounded);
  }
  function updateWaitingExperience(){
    const now = Date.now();
    const remaining = seasonDeadline - now;
    updateTimelineProgress(now);
    if(remaining <= 0){
      updateTimelineProgress(seasonDeadline);
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
