(()=>{
  const openScreen=document.getElementById('openScreen');
  const letterOpened=document.getElementById('letterOpened');
  if(!openScreen||!letterOpened)return;

  openScreen.innerHTML=`
    <div class="open-card confession-envelope-card" id="envelopeCard">
      <div class="confession-kicker">A confession I kept folding into silence</div>
      <p class="confession-whisper">Some feelings stay quiet for so long that eventually the only kind thing you can do is give them words.</p>

      <div class="real-envelope" id="realEnvelope" aria-hidden="true">
        <div class="envelope-ground-shadow"></div>
        <div class="envelope-back"></div>
        <div class="confession-sheet">
          <span class="sheet-small">CONFESSION LETTER</span>
          <strong>To, my March</strong>
          <span class="sheet-line line-one"></span>
          <span class="sheet-line line-two"></span>
          <span class="sheet-line line-three"></span>
          <span class="sheet-sign">words I could not keep quiet anymore</span>
        </div>
        <div class="envelope-flap-real"></div>
        <div class="envelope-front-real"></div>
        <div class="wax-seal-real"><span>for you</span></div>
        <i class="magic-speck sp1"></i><i class="magic-speck sp2"></i><i class="magic-speck sp3"></i>
        <i class="magic-speck sp4"></i><i class="magic-speck sp5"></i><i class="magic-speck sp6"></i>
        <i class="magic-speck sp7"></i><i class="magic-speck sp8"></i>
      </div>

      <div id="passwordGate" class="password-gate confession-password">
        <label for="letterPassword" class="password-label">One tiny secret before this confession opens</label>
        <p class="birthdate-hint">Enter the date in <strong>DDMM</strong> format.</p>
        <div class="password-row">
          <input id="letterPassword" class="password-input" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" placeholder="DDMM" maxlength="4" aria-describedby="passwordMessage">
          <button id="unlockBtn" class="unlock-btn" type="button">Unlock the confession</button>
        </div>
        <div class="format-guide" aria-hidden="true"><span>D</span><span>D</span><span>M</span><span>M</span></div>
        <div id="passwordMessage" class="password-message" aria-live="polite"></div>
        <div class="envelope-success">The seal knows you. The confession is opening...</div>
      </div>
    </div>`;

  requestAnimationFrame(()=>openScreen.classList.add('tdp-opening-ready'));

  const card=document.getElementById('envelopeCard');
  const passwordInput=document.getElementById('letterPassword');
  const unlockBtn=document.getElementById('unlockBtn');
  const passwordMessage=document.getElementById('passwordMessage');
  const expectedHash='bf0a60ee19adc7954e2248d0c4fd7fed44671ea2cff24a6c75127f9ce0183608';

  passwordInput.addEventListener('input',()=>{
    passwordInput.value=passwordInput.value.replace(/\D/g,'').slice(0,4);
    card.classList.toggle('has-digits',passwordInput.value.length>0);
    passwordMessage.textContent='';
  });

  async function sha256(text){
    const data=new TextEncoder().encode(text);
    const digest=await crypto.subtle.digest('SHA-256',data);
    return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');
  }

  async function unlockLetter(){
    if(card.classList.contains('is-unlocking'))return;
    if(passwordInput.value.length!==4){
      passwordMessage.textContent='Four digits only — DDMM.';
      passwordInput.focus();
      return;
    }
    if(await sha256(passwordInput.value)===expectedHash){
      passwordMessage.textContent='';
      card.classList.add('is-unlocking','is-unlocked');
      unlockBtn.disabled=true;
      passwordInput.readOnly=true;
      setTimeout(()=>card.classList.add('magic-burst'),520);
      setTimeout(()=>card.classList.add('sheet-risen'),760);
      setTimeout(()=>{
        letterOpened.checked=true;
        letterOpened.dispatchEvent(new Event('change'));
      },2100);
    }else{
      passwordMessage.textContent='Not quite. Think of the date that made March yours.';
      card.classList.remove('wrong-shake');
      void card.offsetWidth;
      card.classList.add('wrong-shake');
      passwordInput.select();
    }
  }

  unlockBtn.addEventListener('click',unlockLetter);
  passwordInput.addEventListener('keydown',e=>{if(e.key==='Enter')unlockLetter()});
  setTimeout(()=>passwordInput.focus(),520);
})();
