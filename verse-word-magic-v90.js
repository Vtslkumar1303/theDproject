(()=>{
  const reduce=()=>window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function wrapTextNode(node,state){
    const text=node.nodeValue;
    if(!text||!text.trim())return;
    const frag=document.createDocumentFragment();
    text.split(/(\s+)/).forEach(part=>{
      if(!part)return;
      if(/^\s+$/.test(part)){frag.append(document.createTextNode(part));return}
      const span=document.createElement('span');
      span.className='tdp-magic-word-v90';
      span.style.setProperty('--tdp-word-index',String(state.i++));
      span.textContent=part;
      frag.append(span);
    });
    node.replaceWith(frag);
  }

  function contentFor(card){
    return card.querySelector('.verse-copy,.verse-body,.verse-content,.verse-text,.verse-inner');
  }

  function prepare(card){
    if(card.dataset.wordMagicV90Prepared==='1')return;
    const copy=contentFor(card);
    if(!copy)return;
    const state={i:0};
    const paras=[...copy.querySelectorAll('p')].filter(p=>
      !p.closest('.verse-response,.response-box,.response-form,.tdp-response-wrap')
    );
    paras.forEach(p=>{
      const walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT,{
        acceptNode(node){
          const parent=node.parentElement;
          if(!node.nodeValue||!node.nodeValue.trim())return NodeFilter.FILTER_REJECT;
          if(parent?.closest('button,textarea,input,select,option,script,style,.verse-response,.response-box,.response-form,.tdp-response-wrap'))return NodeFilter.FILTER_REJECT;
          if(parent?.classList.contains('tdp-magic-word-v90'))return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      const nodes=[]; let n;
      while((n=walker.nextNode()))nodes.push(n);
      nodes.forEach(node=>wrapTextNode(node,state));
    });
    card.dataset.wordMagicV90Prepared='1';
    card.dataset.wordMagicV90Count=String(state.i);
  }

  function isOpen(card,trigger){
    return card.classList.contains('open')||
      card.classList.contains('is-open')||
      trigger?.getAttribute('aria-expanded')==='true';
  }

  function play(card){
    prepare(card);
    if(reduce())return;
    const count=Number(card.dataset.wordMagicV90Count||0);
    if(!count)return;
    const step=Math.max(20,Math.min(46,Math.floor(9000/Math.max(count,1))));
    card.style.setProperty('--tdp-word-step',step+'ms');
    card.classList.remove('tdp-word-magic-v90-running');
    void card.offsetWidth;
    card.classList.add('tdp-word-magic-v90-running');
    clearTimeout(card.__tdpWordMagicV90Timer);
    const total=Math.min(10500,Math.max(1300,count*step+900));
    card.__tdpWordMagicV90Timer=setTimeout(()=>{
      card.classList.remove('tdp-word-magic-v90-running');
    },total);
  }

  function reset(card){
    clearTimeout(card.__tdpWordMagicV90Timer);
    card.classList.remove('tdp-word-magic-v90-running');
  }

  function bindCard(card){
    if(card.dataset.wordMagicV90Bound==='1')return;
    card.dataset.wordMagicV90Bound='1';
    prepare(card);
    const trigger=card.querySelector('.verse-toggle,.verse-expander,[data-verse-toggle],[aria-expanded]');
    if(!trigger)return;
    trigger.addEventListener('click',()=>{
      setTimeout(()=>{
        if(isOpen(card,trigger))play(card);
        else reset(card);
      },90);
    });
  }

  function bind(){
    document.querySelectorAll('.verse-card').forEach(bindCard);
    if(!document.querySelector('.verse-card')){
      setTimeout(bind,180);
      return;
    }
    const mo=new MutationObserver(()=>document.querySelectorAll('.verse-card').forEach(bindCard));
    mo.observe(document.body,{childList:true,subtree:true});
    setTimeout(()=>mo.disconnect(),20000);
    document.documentElement.dataset.verseWordMagic='v90';
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});
  else bind();
})();