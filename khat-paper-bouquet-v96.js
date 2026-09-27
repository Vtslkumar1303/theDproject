(()=>{
  function add(){
    const player=document.querySelector('#musicCard.spotify-player,.spotify-player');
    if(!player)return false;
    if(player.querySelector('.khat-paper-bouquet-v96'))return true;
    const b=document.createElement('div');
    b.className='khat-paper-bouquet-v96';
    b.setAttribute('aria-hidden','true');
    b.innerHTML='<span class="stem s1"></span><span class="stem s2"></span><span class="stem s3"></span><span class="leaf l1"></span><span class="leaf l2"></span><span class="flower f1"></span><span class="flower f2"></span><span class="flower f3"></span><span class="wrap"></span><span class="tag">for Khat</span>';
    player.appendChild(b);
    return true;
  }
  function start(){
    if(add())return;
    const mo=new MutationObserver(()=>{if(add())mo.disconnect()});
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>mo.disconnect(),20000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();