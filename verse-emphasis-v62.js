(()=>{
  const emphasis={
    'A Thousand Thoughts Later':[
      ['at least I’m being honest with myself.','tdp-em-bold'],
      ['I still wanted to be honest with myself as well as with you.','tdp-em-highlight']
    ],
    'Then You Happened':[
      ['Genuine souls like you are rare — in the most beautiful way.','tdp-em-highlight'],
      ['that was never my intention.','tdp-em-bold']
    ],
    'The Art Of Noticing You':[
      ['you could be someone really special for me.','tdp-em-bold'],
      ['peace, comfort, reassurance, and good energy','tdp-em-highlight']
    ],
    'Curiosity Is A Love Language':[
      ['Curiosity is my love language','tdp-em-highlight'],
      ['choose to learn you a little more every single day.','tdp-em-bold']
    ],
    'The Possibility Of Us':[
      ['we could be something unexpectedly wonderful.','tdp-em-highlight'],
      ['you deserve to be approached with genuine intention, effort, and respect.','tdp-em-bold']
    ],
    'The Girl In My Stories':[
      ['I am genuinely interested in you.','tdp-em-pull'],
      ['you’re too beautiful a soul to leave these words unsaid.','tdp-em-highlight'],
      ['someone my heart is genuinely grateful to have met.','tdp-em-bold']
    ],
    'Maybe This Time':[
      ['Maybe this time your heart won’t break.','tdp-em-pull'],
      ['Maybe this time you’ll find yourself too.','tdp-em-pull'],
      ['Some people enter your life gently, with pure intentions.','tdp-em-highlight']
    ],
    'The Courage Of Maybe':[
      ['I don’t want this confession to feel like a burden in any way.','tdp-em-bold'],
      ['Just stay true to yourself — that’s more than enough for me.','tdp-em-pull']
    ],
    'Whatever Your Answer May Be':[
      ['I’d be more than happy to be your “sunne wala”','tdp-em-highlight'],
      ['my favourite incomplete wish.','tdp-em-pull']
    ],
    'A Final Act of Confession':[
      ['I should leave the next step entirely to you.','tdp-em-bold'],
      ['please don’t take my silence as anger, disappointment, or distance.','tdp-em-highlight'],
      ['left gently in the hands of the person they were written for.','tdp-em-pull']
    ],
    'Thank You, March':[
      ['thank you for being exactly who you are.','tdp-em-highlight'],
      ['You truly are special.','tdp-em-pull'],
      ['our paths crossed.','tdp-em-bold']
    ]
  };

  const norm=s=>(s||'').replace(/\s+/g,' ').trim();
  const titleOf=card=>norm(card.querySelector('.verse-title-editable,h2')?.textContent);

  function wrapPhrase(root,phrase,cls){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
      if(!node.nodeValue || node.parentElement?.closest('.tdp-emphasis')) return NodeFilter.FILTER_REJECT;
      return node.nodeValue.includes(phrase)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }});
    const node=walker.nextNode();
    if(!node)return false;
    const i=node.nodeValue.indexOf(phrase);
    const before=node.nodeValue.slice(0,i),after=node.nodeValue.slice(i+phrase.length);
    const span=document.createElement('span');
    span.className='tdp-emphasis '+cls;
    span.textContent=phrase;
    const frag=document.createDocumentFragment();
    if(before)frag.append(document.createTextNode(before));
    frag.append(span);
    if(after)frag.append(document.createTextNode(after));
    node.replaceWith(frag);
    return true;
  }

  function apply(){
    const cards=[...document.querySelectorAll('.verse-card')];
    if(cards.length<10)return false;
    let touched=0;
    cards.forEach(card=>{
      const title=titleOf(card);
      const defs=emphasis[title];
      if(!defs || card.dataset.emphasisV62==='1')return;
      const copy=card.querySelector('.verse-copy')||card.querySelector('.verse');
      if(!copy)return;
      defs.forEach(([phrase,cls])=>{if(wrapPhrase(copy,phrase,cls))touched++;});
      card.dataset.emphasisV62='1';
    });
    if(touched || cards.some(c=>c.dataset.emphasisV62==='1')){
      document.documentElement.dataset.verseEmphasis='v62';
      return true;
    }
    return false;
  }

  const start=()=>{
    if(apply())return;
    const mo=new MutationObserver(()=>{if(apply())mo.disconnect();});
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>mo.disconnect(),15000);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
