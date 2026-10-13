(()=>{
  const makeIndependent=()=>{
    const shell=document.querySelector('.tdp-dreamboard-shell');
    if(!shell || shell.dataset.independentDreamboard==='1') return !!shell;
    shell.dataset.independentDreamboard='1';
    /* Always repair the ticket list, including when cached markup already contains one or two Arijit cards. */
    const tickets=shell.querySelector('.tdp-tickets');
    if(tickets){
      const getName=(card)=>card.querySelector('.tdp-ticket-name')?.textContent.trim()||'';
      const cards=()=>Array.from(tickets.querySelectorAll('.tdp-ticket'));
      const findByName=(predicate)=>cards().find(card=>predicate(getName(card)));
      const darshan=findByName(name=>name==='Darshan Raval');
      let arijit=cards().filter(card=>card.classList.contains('tdp-ticket-arijit-j'));
      const bts=findByName(name=>name.includes('ARMY')||name.includes('BTS'));
      const makeTicket=(n)=>{
        const ticket=document.createElement('article');
        ticket.className='tdp-ticket tdp-ticket-arijit-j';
        ticket.innerHTML='<span class="tdp-ticket-paper"></span><span class="tdp-ticket-fold"></span><span class="tdp-ticket-stubmark">booking confirmed</span><div class="tdp-ticket-band"><span>Arijit Singh · India Tour</span><span>NO. 090'+n+'</span></div><h4 class="tdp-ticket-name">Ahmedabad · J Block</h4><p class="tdp-ticket-note">09 Jan 2027 · 6 PM onwards · Narendra Modi Stadium</p><div class="tdp-ticket-meta"><span><b>Block</b>J</span><span><b>Tickets</b>'+n+' of 02</span><span><b>Entry</b>Confirmed</span></div><div class="tdp-ticket-printline"><span>AHMEDABAD · 09 JAN 2027<br>REF: ARIJIT-J-00'+n+'</span><i class="tdp-ticket-barcode"></i></div>';
        return ticket;
      };
      if(arijit.length<2){
        arijit.forEach(card=>card.remove());
        arijit=[makeTicket(1),makeTicket(2)];
      }else{
        arijit=arijit.slice(0,2);
      }
      if(darshan && bts){
        arijit.forEach(card=>card.remove());
        let anchor=darshan;
        arijit.forEach(card=>{anchor.insertAdjacentElement('afterend',card);anchor=card;});
      }else if(arijit.some(card=>!card.isConnected)){
        arijit.forEach(card=>tickets.appendChild(card));
      }
    }
    shell.classList.add('cover-visible');
    const cover=shell.querySelector('.tdp-memory-cover');
    const stage=shell.querySelector('.tdp-dreamboard-stage');
    if(cover){
      cover.setAttribute('aria-expanded',shell.classList.contains('is-open')?'true':'false');
    }
    if(stage){
      stage.setAttribute('aria-hidden',shell.classList.contains('is-open')?'false':'true');
    }
    return true;
  };

  const start=()=>{
    if(makeIndependent()) return;
    const mo=new MutationObserver(()=>{
      if(makeIndependent()) mo.disconnect();
    });
    mo.observe(document.documentElement,{childList:true,subtree:true});
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
