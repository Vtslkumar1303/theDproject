(()=>{
  const reduce=()=>window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function wrapTextNode(node,state){
    const text=node.nodeValue;
    if(!text||!text.trim())return;
    const frag=document.createDocumentFragment();
    const parts=text.split(/(\s+)/);
    parts.forEach(part=>{
      if(!part)return;
      if(/^\s+$/.test(part)){frag.append(document.createTextNode(part));return}
      const span=document.createElement('span');
      span.className='tdp-magic-word';
      span.style.setProperty('--word-index',String(state.i++));
      span.textContent=part;
      frag.append(span);
    });
    node.replaceWith(frag);
  }

  function prepare(card){
    if(card.dataset.wordMagicPrepared==='1')return;
    const copy=card.querySelector('.verse-copy,.verse-body,.verse-content');
    if(!copy)return;
    const state={i:0};
    const paras=[...copy.querySelectorAll('p')].filter(p=>!p.closest('.verse-response'));
    paras.forEach(p=>{
      const walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT,{
        acceptNode(node){
          const parent=node.parentElement;
          if(!node.nodeValue||!node.nodeValue.trim())return NodeFilter.FILTER_REJECT;
          if(parent?.closest('.verse-response,button,textarea,input,select,option,script,style'))return NodeFilter.FILTER_REJECT;
          if(parent?.classList.contains('tdp-magic-word'))return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      const nodes=[];
      let n;while((n=walker.nextNode()))nodes.push(n);
      nodes.forEach(node=>wrapTextNode(node,state));
    });
    card.dataset.wordMagicPrepared='1';
    card.dataset.wordMagicCount=String(state.i);
  }

  function play(card){
    prepare(card);
    if(reduce())return;
    const count=Number(card.dataset.wordMagicCount||0);
    if(!count)return;
    const step=Math.max(18,Math.min(42,Math.floor(8500/Math.max(count,1))));
    card.style.setProperty('--word-step',step+'ms');
    card.classList.remove('tdp-word-magic-running');
    void card.offsetWidth;
    card.classList.add('tdp-word-magic-running');
    clearTimeout(card.__wordMagicTimer);
    const total=Math.min(10000,Math.max(1200,count*step+950));
    card.__wordMagicTimer=setTimeout(()=>card.classList.remove('tdp-word-magic-running'),total);
  }

  function reset(card){
    clearTimeout(card.__wordMagicTimer);
    card.classList.remove('tdp-word-magic-running');
  }

  function bind(){
    const cards=[...document.querySelectorAll('.verse-card')];
    if(!cards.length){setTimeout(bind,140);return}
    cards.forEach(card=>{
      if(card.dataset.wordMagicBound==='1')return;
      card.dataset.wordMagicBound='1';
      prepare(card);
      const trigger=card.querySelector('.verse-toggle,.verse-expander');
      if(!trigger)return;
      trigger.addEventListener('click',()=>{
        setTimeout(()=>{
          if(card.classList.contains('open'))play(card);
          else reset(card);
        },70);
      });
    });
    document.documentElement.dataset.verseWordMagic='v84';
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});
  else bind();
})();