(()=>{
  const IMG={
    bts:'https://commons.wikimedia.org/wiki/Special:Redirect/file/BTS%20during%20a%20photoshoot%20for%20Korea%20Dispatch%20in%20Las%20Vegas%2C%20May%202019%2007.jpg',
    arijit:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Arijit%20Singh.jpg',
    darshan:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Darshan%20Raval%20in%202019.jpg',
    aditya:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Aditya%20Gadhvi%20At%20An%20Event%20In%20Ahmedabad%202020.jpg',
    garba:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Garba%20Navratri%2001.jpg',
    sunset:'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1200&q=88',
    beach:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=88',
    mountain:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=88'
  };

  const note=(kind,num,title,hint,inner)=>`<article class="tdp-v59-note" data-kind="${kind}"><button class="tdp-v59-toggle" type="button" aria-expanded="false"><span class="tdp-v59-envelope"><span class="tdp-v59-title"><strong>${title}</strong><span>${num}</span></span><span class="seal" aria-hidden="true"></span><span class="tdp-v59-hint">${hint}</span></span><span class="tdp-v59-reveal">${inner}</span></button></article>`;

  const build=()=>{
    const shell=document.querySelector('.tdp-dreamboard-shell');
    if(!shell) return false;
    document.querySelectorAll('.tdp-realistic-dream-notes-v59').forEach(n=>n.remove());
    shell.classList.add('tdp-dreamnotes-replaced');
    const old=document.querySelector('.tdp-hidden-dream-notes'); if(old) old.remove();

    const concert=`<h4>Three tickets I’d happily keep forever.</h4><div class="tdp-ticket-grid">
      <div class="tdp-ticket"><div class="tdp-ticket-photo"><img src="${IMG.bts}" alt="BTS pencil-sketch style concert ticket visual"></div><b>BTS — PURPLE NIGHT</b><small>ADMIT TWO · SEAT: BESIDE YOU · DATE: SOMEDAY</small></div>
      <div class="tdp-ticket"><div class="tdp-ticket-photo"><img src="${IMG.arijit}" alt="Arijit Singh pencil-sketch style concert ticket visual"></div><b>ARIJIT SINGH — ONE EVENING</b><small>ADMIT TWO · GATE: OUR PLAYLIST · ROW: TOGETHER</small></div>
      <div class="tdp-ticket"><div class="tdp-ticket-photo"><img src="${IMG.darshan}" alt="Darshan Raval pencil-sketch style concert ticket visual"></div><b>DARSHAN RAVAL — BLUE HOUR</b><small>ADMIT TWO · ENTRY: US · DATE: WHENEVER IT HAPPENS</small></div>
    </div><p>Three artists, three different nights, and one person I’d want standing next to me.</p>`;

    const sunset=`<h4>One quiet sky, our favourite songs.</h4><div class="tdp-photo-card"><img src="${IMG.sunset}" alt="Realistic warm sunset"><span class="cap">some sunsets are meant to be shared</span></div><p>No rush. No plan. Just the sky changing colours while the playlist keeps going.</p>`;

    const travel=`<h4>Places I’d love to collect with you.</h4><div class="tdp-travel-pair"><div class="tdp-photo-card"><img src="${IMG.beach}" alt="Realistic beach"><span class="cap">Beach Escape</span></div><div class="tdp-photo-card"><img src="${IMG.mountain}" alt="Realistic mountains"><span class="cap">Mountain Mornings</span></div></div><p>Sea breeze or cold mountain air — either works if the day feels peaceful.</p>`;

    const dancers='<span></span>'.repeat(8);
    const nav=`<h4>One Navratri night with you.</h4><div class="tdp-nav-wrap"><img class="bg" src="${IMG.garba}" alt="Real Navratri garba ground"><div class="tdp-garba-orbit" aria-hidden="true">${dancers}</div><div class="tdp-aditya-sketch"><img src="${IMG.aditya}" alt="Aditya Gadhvi pencil-sketch style portrait"></div></div><p>Garba lights, a real ground full of energy, Aditya Gadhvi on the moodboard, tired feet, and one very Gujarat kind of memory.</p>`;

    const wrap=document.createElement('section');
    wrap.className='tdp-realistic-dream-notes-v59';
    wrap.setAttribute('aria-label','Open whichever future finds you');
    wrap.innerHTML=`<div class="tdp-v59-head"><div class="kicker">little futures, folded softly into keepsakes</div><h3>Open whichever one finds you…</h3><p>Each one is a tiny someday-thought, saved like a memory before it even happens.</p></div><div class="tdp-v59-grid">
      ${note('concert','01','For the songs I’d save for us','open the concert keepsake →',concert)}
      ${note('sunset','02','For one quiet sky and our favourite songs','open the snapshot →',sunset)}
      ${note('travel','03','For places I’d love to collect with you','open the postcards →',travel)}
      ${note('navratri','04','For one Navratri night with you','open the festival pass →',nav)}
    </div><div class="tdp-v59-footer">Tap any keepsake again to fold it back.</div><div class="tdp-v59-attribution">Artist and Navratri reference photos are transformed from freely licensed Wikimedia Commons images; scenic photographs use Unsplash imagery.</div>`;
    shell.insertAdjacentElement('afterend',wrap);

    wrap.querySelectorAll('.tdp-v59-toggle').forEach(btn=>btn.addEventListener('click',()=>{
      const card=btn.closest('.tdp-v59-note');
      const open=card.classList.toggle('is-open');
      btn.setAttribute('aria-expanded',open?'true':'false');
      if(window.tdpTrack) window.tdpTrack(open?'realistic_dream_note_open':'realistic_dream_note_close',{kind:card.dataset.kind});
    }));
    return true;
  };

  const start=()=>{
    if(build()) return;
    const mo=new MutationObserver(()=>{if(build())mo.disconnect()});
    mo.observe(document.documentElement,{childList:true,subtree:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
