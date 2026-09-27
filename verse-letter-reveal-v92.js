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
      span.className='tdp-letter-word-v92';
      span.textContent=part;
      frag.append(span);
      state.words.push(span);
    });
    node.replaceWith(frag);
  }

  function contentFor(card){
    return card.querySelector('.verse-copy,.verse-body,.verse-content,.verse-text,.verse-inner');
  }

  function prepare(card){
    if(card.dataset.letterRevealV92Prepared==='1')return;
    const copy=contentFor(card);
    if(!copy)return;

    const state={words:[]};
    [...copy.querySelectorAll('p')].filter(p=>
      !p.closest('.verse-response,.response-box,.response-form,.tdp-response-wrap')
    ).forEach(p=>{
      const walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT,{
        acceptNode(node){
          const parent=node.parentElement;
          if(!node.nodeValue||!node.nodeValue.trim())return NodeFilter.FILTER_REJECT;
          if(parent?.closest('button,textarea,input,select,option,script,style,.verse-response,.response-box,.response-form,.tdp-response-wrap'))return NodeFilter.FILTER_REJECT;
          if(parent?.classList.contains('tdp-letter-word-v92'))return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      const nodes=[]; let n;
      while((n=walker.nextNode()))nodes.push(n);
      nodes.forEach(node=>wrapTextNode(node,state));
    });

    card.__tdpLetterWordsV92=state.words;
    card.dataset.letterRevealV92Prepared='1';
  }

  function assignLines(card){
    const words=card.__tdpLetterWordsV92||[];
    if(!words.length)return 0;

    let line=-1;
    let prevTop=null;
    const tolerance=3;

    words.forEach(word=>{
      const top=word.getBoundingClientRect().top;
      if(prevTop===null||Math.abs(top-prevTop)>tolerance){
        line++;
        prevTop=top;
      }
      word.style.setProperty('--tdp-letter-line-index',String(line));
    });

    card.dataset.letterRevealV92Count=String(line+1);
    return line+1;
  }

  function isOpen(card,trigger){
    return card.classList.contains('open')||
      card.classList.contains('is-open')||
      trigger?.getAttribute('aria-expanded')==='true';
  }

  function play(card){
    prepare(card);
    if(reduce())return;

    requestAnimationFrame(()=>{
      const lines=assignLines(card);
      if(!lines)return;

      const delay=900;
      card.style.setProperty('--tdp-letter-line-delay',delay+'ms');
      card.classList.remove('tdp-letter-reveal-v92-running');
      void card.offsetWidth;
      card.classList.add('tdp-letter-reveal-v92-running');

      clearTimeout(card.__tdpLetterRevealV92Timer);
      const total=Math.min(32000,Math.max(3000,(lines-1)*delay+2400));
      card.__tdpLetterRevealV92Timer=setTimeout(()=>{
        card.classList.remove('tdp-letter-reveal-v92-running');
      },total);
    });
  }

  function reset(card){
    clearTimeout(card.__tdpLetterRevealV92Timer);
    card.classList.remove('tdp-letter-reveal-v92-running');
  }

  function bindCard(card){
    if(card.dataset.letterRevealV92Bound==='1')return;
    card.dataset.letterRevealV92Bound='1';
    prepare(card);
    const trigger=card.querySelector('.verse-toggle,.verse-expander,[data-verse-toggle],[aria-expanded]');
    if(!trigger)return;
    trigger.addEventListener('click',()=>{
      setTimeout(()=>{
        if(isOpen(card,trigger))play(card);
        else reset(card);
      },120);
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
    document.documentElement.dataset.verseLetterReveal='v92';
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});
  else bind();
})();