(()=>{
  const makeIndependent=()=>{
    const shell=document.querySelector('.tdp-dreamboard-shell');
    if(!shell || shell.dataset.independentDreamboard==='1') return !!shell;
    shell.dataset.independentDreamboard='1';
    /* Safety net: ensure the two Arijit J Block tickets exist even if an older cached dreamboard script built the original cards. */
    const tickets=shell.querySelector('.tdp-tickets');
    if(tickets && !tickets.querySelector('.tdp-ticket-arijit-j')){
      const makeTicket=(n)=> {
        const ticket=document.createElement('article');
        ticket.className='tdp-ticket tdp-ticket-arijit-j';
        ticket.innerHTML='<span class="tdp-ticket-paper"></span><span class="tdp-ticket-fold"></span><span class="tdp-ticket-stubmark">booking confirmed</span><div class="tdp-ticket-band"><span>Arijit Singh · India Tour</span><span>NO. 090'+n+'</span></div><h4 class="tdp-ticket-name">Ahmedabad · J Block</h4><p class="tdp-ticket-note">09 Jan 2027 · 6 PM onwards · Narendra Modi Stadium</p><div class="tdp-ticket-meta"><span><b>Block</b>J</span><span><b>Tickets</b>'+n+' of 02</span><span><b>Entry</b>Confirmed</span></div><div class="tdp-ticket-printline"><span>AHMEDABAD · 09 JAN 2027<br>REF: ARIJIT-J-00'+n+'</span><i class="tdp-ticket-barcode"></i></div>';
        return ticket;
      };
      const darshan=tickets.querySelectorAll('.tdp-ticket');
      const darshanCard=Array.from(darshan).find(t=>t.querySelector('.tdp-ticket-name')?.textContent.trim()==='Darshan Raval');
      const btsCard=Array.from(darshan).find(t=>t.querySelector('.tdp-ticket-name')?.textContent.includes('ARMY'));
      if(darshanCard && btsCard){
        const first=makeTicket(1), second=makeTicket(2);
        darshanCard.insertAdjacentElement('afterend',first);
        first.insertAdjacentElement('afterend',second);
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
