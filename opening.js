(()=>{
  const openScreen=document.getElementById('openScreen');
  const letterOpened=document.getElementById('letterOpened');
  if(!openScreen||!letterOpened)return;

  openScreen.innerHTML='<div class="open-card letter-front" id="envelopeCard"><div class="envelope-flap" aria-hidden="true"></div><div class="envelope-content"><div class="envelope-to">A letter meant only for you</div><h1 class="envelope-title">To, my March</h1><p class="envelope-sub">Some words waited quietly until they were brave enough to become a letter.</p><div class="wax-seal" aria-hidden="true"></div><button class="seal-open-btn" id="breakSealBtn" type="button">Open this letter</button><div class="password-reveal"><div class="password-reveal-inner"><div id="passwordGate" class="password-gate envelope-password"><label for="letterPassword" class="password-label">One tiny secret before the letter opens</label><p class="birthdate-hint">A little clue: four digits from the day and month the world became a little brighter because you arrived.</p><div class="password-row"><input id="letterPassword" class="password-input" type="password" inputmode="numeric" autocomplete="off" placeholder="DDMM" maxlength="4" aria-describedby="passwordMessage"><button id="unlockBtn" class="unlock-btn" type="button">Unlock</button></div><div id="passwordMessage" class="password-message" aria-live="polite"></div><div class="envelope-success">The seal knows you. Opening your letter...</div></div></div></div></div></div>';

  requestAnimationFrame(()=>openScreen.classList.add('tdp-opening-ready'));

  const card=document.getElementById('envelopeCard');
  const breakSealBtn=document.getElementById('breakSealBtn');
  const passwordInput=document.getElementById('letterPassword');
  const unlockBtn=document.getElementById('unlockBtn');
  const passwordMessage=document.getElementById('passwordMessage');
  const expectedHash='bf0a60ee19adc7954e2248d0c4fd7fed44671ea2cff24a6c75127f9ce0183608';

  breakSealBtn.addEventListener('click',()=>{
    card.classList.add('is-opening');
    setTimeout(()=>card.classList.add('show-password'),520);
    setTimeout(()=>passwordInput.focus(),780);
  });

  async function sha256(text){
    const data=new TextEncoder().encode(text);
    const digest=await crypto.subtle.digest('SHA-256',data);
    return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');
  }

  async function unlockLetter(){
    if(await sha256(passwordInput.value)===expectedHash){
      passwordMessage.textContent='';
      card.classList.add('is-unlocked');
      setTimeout(()=>{
        letterOpened.checked=true;
        letterOpened.dispatchEvent(new Event('change'));
      },620);
    }else{
      passwordMessage.textContent='Not quite. Think of the date that first made March yours.';
      passwordInput.select();
    }
  }

  unlockBtn.addEventListener('click',unlockLetter);
  passwordInput.addEventListener('keydown',e=>{if(e.key==='Enter')unlockLetter()});
})();
