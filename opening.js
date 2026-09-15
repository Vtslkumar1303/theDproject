(()=>{
  const openScreen=document.getElementById('openScreen');
  const letterOpened=document.getElementById('letterOpened');
  if(!openScreen||!letterOpened)return;

  const token=sessionStorage.getItem('tdp_access_token');
  if(!token){
    openScreen.innerHTML='<div class="open-card letter-front"><div class="envelope-content"><div class="envelope-to">This letter is resting behind its little lock.</div><h1 class="envelope-title">To, my March</h1><p class="envelope-sub">Refresh the page to unlock it again.</p></div></div>';
    requestAnimationFrame(()=>openScreen.classList.add('tdp-opening-ready'));
    return;
  }

  openScreen.style.display='none';
  letterOpened.checked=true;
  letterOpened.dispatchEvent(new Event('change'));
})();
