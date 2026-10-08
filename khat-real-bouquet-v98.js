(()=>{
  function mount(){
    const player=document.querySelector('#musicCard.spotify-player,.spotify-player');
    if(!player)return false;
    player.querySelector('.khat-paper-bouquet-v96')?.remove();
    player.querySelector('.khat-real-bouquet-v97')?.remove();
    if(player.querySelector('.khat-real-bouquet-v98'))return true;
    const img=document.createElement('img');
    img.className='khat-real-bouquet-v97 khat-real-bouquet-v98';
    img.src='assets/khat_bouquet_v99.webp?v=20261008-khat-bouquet-v99';
    img.alt='';
    img.setAttribute('aria-hidden','true');
    img.decoding='async';
    img.loading='eager';
    player.appendChild(img);
    return true;
  }
  function start(){
    if(mount())return;
    const mo=new MutationObserver(()=>{if(mount())mo.disconnect()});
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>mo.disconnect(),20000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();