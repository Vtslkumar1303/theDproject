(()=>{
  const openScreen=document.getElementById('openScreen');
  const letterOpened=document.getElementById('letterOpened');
  if(!openScreen||!letterOpened)return;

  const originalHero=document.querySelector('main .hero');
  if(originalHero){
    const heroTitle=originalHero.querySelector('h1');
    if(heroTitle){
      heroTitle.innerHTML='To, my March <span class="title-real-emoji" aria-label="evil eye">🧿</span><span class="title-real-emoji title-sparkle" aria-label="sparkles">✨</span>';
    }
  }

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

        <div id="passwordGate" class="envelope-password-panel" aria-hidden="true">
          <div class="password-tape"></div>
          <div class="password-heart" aria-hidden="true">♡</div>
          <label for="letterPassword" class="password-label">One tiny secret</label>
          <div class="password-hint">the day + month, in DDMM</div>
          <div class="password-row">
            <input id="letterPassword" class="password-input" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" placeholder="DDMM" maxlength="4" aria-describedby="passwordMessage">
            <button id="unlockBtn" class="unlock-btn" type="button">Unlock</button>
          </div>
          <div id="passwordMessage" class="password-message" aria-live="polite"></div>
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
    sheetClone.appendChild(clone);
  }else if(sheetClone){
    sheetClone.innerHTML='<div class="sheet-fallback"><div class="kicker">A letter I probably overthought too much</div><h1>To, my March <span class="title-real-emoji">🧿</span><span class="title-real-emoji title-sparkle">✨</span></h1><p class="subtitle">Some feelings stay quiet for so long that eventually the only kind thing you can do is give them words.</p></div>';
  }

  requestAnimationFrame(()=>openScreen.classList.add('tdp-opening-ready'));

  const card=document.getElementById('envelopeCard');
  const sealOpenBtn=document.getElementById('sealOpenBtn');
  const passwordGate=document.getElementById('passwordGate');
  const passwordInput=document.getElementById('letterPassword');
  const unlockBtn=document.getElementById('unlockBtn');
  const passwordMessage=document.getElementById('passwordMessage');
  const confessionSheet=document.getElementById('confessionSheet');
  const expectedHash='bf0a60ee19adc7954e2248d0c4fd7fed44671ea2cff24a6c75127f9ce0183608';

  function revealPassword(){
    if(card.classList.contains('password-visible')||card.classList.contains('is-unlocking'))return;
    card.classList.add('password-visible');
    passwordGate.setAttribute('aria-hidden','false');
    setTimeout(()=>passwordInput.focus(),320);
  }

  sealOpenBtn.addEventListener('click',revealPassword);

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
    if(card.classList.contains('is-unlocking'))return;
    if(passwordInput.value.length!==4){
      passwordMessage.textContent='Four digits, in DDMM.';
      passwordInput.focus();
      return;
    }

    if(await sha256(passwordInput.value)===expectedHash){
      passwordMessage.textContent='';
      card.classList.add('is-unlocking');
      unlockBtn.disabled=true;
      passwordInput.readOnly=true;
      sealOpenBtn.disabled=true;

      setTimeout(()=>card.classList.add('seal-released'),120);
      setTimeout(()=>card.classList.add('envelope-open'),520);
      setTimeout(()=>{
        confessionSheet.setAttribute('aria-hidden','false');
        card.classList.add('sheet-rise','magic-burst-final');
      },1020);
      setTimeout(()=>card.classList.add('sheet-expand'),1880);
      setTimeout(()=>card.classList.add('letter-transition'),2580);
      setTimeout(()=>{
        document.body.classList.add('letter-main-open');
        letterOpened.checked=true;
        letterOpened.dispatchEvent(new Event('change'));
        setTimeout(()=>{
          openScreen.style.display='none';
          openScreen.setAttribute('aria-hidden','true');
        },120);
      },3300);
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
})();