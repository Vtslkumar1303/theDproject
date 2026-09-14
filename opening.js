(()=>{
  const openScreen=document.getElementById('openScreen');
  const letterOpened=document.getElementById('letterOpened');
  if(!openScreen||!letterOpened)return;

  openScreen.innerHTML='<div class="open-card letter-front" id="envelopeCard"><div class="envelope-content"><div class="envelope-to">A letter meant only for you</div><h1 class="envelope-title">To, my March</h1><p class="envelope-sub">Some words waited quietly until they were brave enough to become a letter.</p><div class="wax-seal" aria-hidden="true">M</div><button class="seal-open-btn" id="breakSealBtn" type="button">Open this letter</button><div class="password-reveal"><div class="password-reveal-inner"><div id="passwordGate" class="password-gate envelope-password"><label for="letterPassword" class="password-label">One tiny secret before the letter opens</label><p class="birthdate-hint">A little clue: eight digits from the day the world became a little brighter because you arrived — your complete birth date.</p><div class="password-row"><input id="letterPassword" class="password-input" type="password" inputmode="numeric" autocomplete="off" placeholder="DDMMYYYY" maxlength="8" aria-describedby="passwordMessage"><button id="unlockBtn" class="unlock-btn" type="button">Unlock</button></div><div id="passwordMessage" class="password-message" aria-live="polite"></div><div class="envelope-success">The seal knows you. Opening your letter...</div></div></div></div></div></div>';

  const card=document.getElementById('envelopeCard');
  const breakSealBtn=document.getElementById('breakSealBtn');
  const passwordInput=document.getElementById('letterPassword');
  const unlockBtn=document.getElementById('unlockBtn');
  const passwordMessage=document.getElementById('passwordMessage');
  const expectedHash='6960369e311e61e369b0c3a90ca50db26506b1214b83d4fbd61d155ad8f307dd';

  breakSealBtn.addEventListener('click',()=>{
    card.classList.add('show-password');
    setTimeout(()=>passwordInput.focus(),430);
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
      },520);
    }else{
      passwordMessage.textContent='Not quite. Think of the full date that belongs only to you.';
      passwordInput.select();
    }
  }

  unlockBtn.addEventListener('click',unlockLetter);
  passwordInput.addEventListener('keydown',e=>{if(e.key==='Enter')unlockLetter()});
})();
