(()=>{
  const decorate=()=>{
    const reader=document.querySelector('.tdp-reading-v55');
    if(!reader||reader.dataset.v56Decorated==='1')return !!reader;
    reader.dataset.v56Decorated='1';
    const cards=[...reader.querySelectorAll('.tdp-verse-card')];
    const add=(card,cls,src)=>{if(!card||card.querySelector('.'+cls))return;const img=document.createElement('img');img.className='tdp-v56-side '+cls;img.src=src;img.alt='';img.setAttribute('aria-hidden','true');card.appendChild(img)};
    add(cards[0],'tdp-v56-rose','assets/asset-02-8f5a2762061d.png');
    add(cards[1],'tdp-v56-breath','assets/asset-04-96ecfc0d24b6.png');
    add(cards[2],'tdp-v56-nazar','assets/asset-03-c31cbe5c4167.png');
    add(cards[3],'tdp-v56-rose','assets/asset-02-8f5a2762061d.png');
    add(cards[4],'tdp-v56-breath','assets/asset-04-96ecfc0d24b6.png');
    add(cards[5],'tdp-v56-nazar','assets/asset-03-c31cbe5c4167.png');
    add(cards[8],'tdp-v56-rose','assets/asset-02-8f5a2762061d.png');
    return true;
  };
  const start=()=>{if(decorate())return;const mo=new MutationObserver(()=>{if(decorate())mo.disconnect()});mo.observe(document.documentElement,{childList:true,subtree:true})};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
