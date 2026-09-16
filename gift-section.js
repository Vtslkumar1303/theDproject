(()=>{
  const PHOTO_1='https://the-d-project-media.floot.app/_cdn/static/ecfb55b9-7ff2-4953-8aca-077d7e62d6f7-nameplate-final-1.jpeg';
  const PHOTO_2='https://the-d-project-media.floot.app/_cdn/static/3fb38c4b-12d0-412e-bce5-526e9683c1eb-nameplate-final-2.jpeg';

  const styles=`
  .tdp-gift-section{width:min(930px,calc(100% - 28px));margin:40px auto 80px;padding:30px 20px 30px;position:relative;z-index:12;overflow:hidden;border:1px solid rgba(101,69,49,.15);border-radius:28px;background:linear-gradient(rgba(250,240,220,.94),rgba(244,226,196,.95));box-shadow:0 18px 42px rgba(75,46,31,.12);color:#56382d;text-align:center}
  .tdp-gift-section:before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 12% 4%,rgba(255,255,255,.68),transparent 26%),radial-gradient(circle at 92% 94%,rgba(191,143,102,.11),transparent 30%)}
  .tdp-gift-kicker{position:relative;font:italic .73rem/1.4 Georgia,serif;color:#9a735f;margin-bottom:5px}
  .tdp-gift-section h2{position:relative;margin:0 auto 8px;font:700 clamp(1.35rem,3vw,2rem)/1.35 "Segoe Print","Bradley Hand","Comic Sans MS",cursive;color:#644235}
  .tdp-gift-intro{position:relative;max-width:650px;margin:0 auto 14px;font:italic .78rem/1.65 Georgia,serif;color:#806052}
  .tdp-gift-stage{position:relative;min-height:430px;display:grid;place-items:center;margin:0 auto 4px}
  .tdp-envelope-scene{position:relative;width:min(600px,94vw);height:405px;perspective:950px}
  .tdp-envelope{position:absolute;left:50%;bottom:8px;transform:translateX(-50%) rotateX(2deg);width:min(430px,84vw);height:260px;cursor:pointer;filter:drop-shadow(0 28px 24px rgba(62,38,25,.25)) drop-shadow(0 7px 5px rgba(73,45,27,.12));z-index:6;transition:transform .35s ease,filter .35s ease;transform-style:preserve-3d}
  .tdp-envelope:hover{transform:translateX(-50%) translateY(-3px) rotateX(1deg);filter:drop-shadow(0 32px 27px rgba(62,38,25,.27)) drop-shadow(0 8px 6px rgba(73,45,27,.12))}
  .tdp-envelope-body{position:absolute;inset:0;border-radius:28px;background:linear-gradient(135deg,rgba(255,255,255,.34),transparent 30%),linear-gradient(#f8e9cf,#e5bf8d);border:1.5px solid rgba(126,86,57,.32);overflow:hidden;box-shadow:inset 0 3px 2px rgba(255,255,255,.58),inset 0 -22px 34px rgba(119,77,45,.12),0 5px 0 rgba(132,87,52,.10);transform:translateZ(-3px)}
  .tdp-envelope-body:after{content:"";position:absolute;inset:8px;border:1px dashed rgba(133,91,61,.17);border-radius:21px;background:repeating-linear-gradient(8deg,rgba(116,78,51,.025) 0 1px,transparent 1px 7px);pointer-events:none}
  .tdp-envelope-front{position:absolute;left:0;right:0;bottom:0;height:68%;clip-path:polygon(0 0,50% 57%,100% 0,100% 100%,0 100%);background:linear-gradient(118deg,rgba(255,255,255,.23),transparent 27%,rgba(119,75,43,.07) 64%,transparent 82%),linear-gradient(#f3d8b2,#dcae77);z-index:8;border-bottom-left-radius:27px;border-bottom-right-radius:27px;box-shadow:inset 0 -14px 22px rgba(105,66,37,.08),0 -2px 5px rgba(92,57,35,.07)}
  .tdp-envelope-flap{position:absolute;left:0;right:0;top:0;height:63%;clip-path:polygon(0 0,100% 0,50% 100%);background:linear-gradient(132deg,rgba(255,255,255,.38),transparent 30%,rgba(117,73,42,.07) 67%,transparent),linear-gradient(#fbeed8,#ebc99d);border-top:1.5px solid rgba(135,93,61,.27);border-radius:27px 27px 10px 10px;transform-origin:50% 0;transition:transform 1.05s cubic-bezier(.18,.82,.18,1);z-index:10;backface-visibility:hidden;box-shadow:inset 0 2px 0 rgba(255,255,255,.62),0 7px 12px rgba(80,49,28,.10)}
  .tdp-envelope-seal{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);width:74px;height:74px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#f7dde1 0 18%,#c77280 22% 67%,#7b3c46 71% 100%);box-shadow:0 8px 20px rgba(82,39,44,.28),inset 0 2px 3px rgba(255,255,255,.25);display:grid;place-items:center;color:#fff8f8;z-index:11;transition:opacity .42s ease,transform .7s ease}
  .tdp-envelope-seal:before{content:"For you";font:700 .8rem/1 Georgia,serif;transform:rotate(-7deg)}
  .tdp-envelope-seal:after{content:"";position:absolute;inset:9px;border:1px dashed rgba(255,255,255,.35);border-radius:50%}
  .tdp-gift-photo-stack{position:absolute;left:50%;bottom:30px;transform:translateX(-50%);width:min(500px,92vw);height:330px;pointer-events:none;z-index:7}
  .tdp-gift-photo-card{position:absolute;width:45%;max-width:220px;padding:10px 10px 34px;background:#fffaf3;border:1px solid rgba(94,66,48,.11);border-radius:11px;box-shadow:0 18px 34px rgba(51,30,19,.22);opacity:0;visibility:hidden;transform-origin:center bottom;transition:transform 1.12s cubic-bezier(.16,.84,.22,1),opacity .42s ease,visibility 0s linear .8s,box-shadow .45s ease}
  .tdp-gift-photo-card img{display:block;width:100%;aspect-ratio:1.08/1;object-fit:cover;border-radius:7px;box-shadow:0 8px 18px rgba(33,18,11,.14)}
  .tdp-gift-photo-card figcaption{position:absolute;left:10px;right:10px;bottom:9px;color:#79594b;font:italic .58rem/1.3 Georgia,serif;text-align:center;white-space:nowrap}
  .tdp-photo-1{left:12%;bottom:4px;transform:translate(25px,128px) rotate(-7deg) scale(.68)}
  .tdp-photo-2{right:12%;bottom:0;transform:translate(-25px,134px) rotate(7deg) scale(.68)}
  .tdp-envelope-thread{position:absolute;inset:0;z-index:12;pointer-events:none;transition:opacity .38s ease}
  .tdp-thread-horizontal,.tdp-thread-vertical{position:absolute;display:block;border-radius:999px;background:repeating-linear-gradient(135deg,#a85e6c 0 4px,#edc0c3 4px 8px,#c77b87 8px 12px);box-shadow:0 2px 3px rgba(75,38,39,.22),inset 0 1px 0 rgba(255,255,255,.45);transition:transform .72s cubic-bezier(.18,.84,.22,1),opacity .4s ease}
  .tdp-thread-horizontal{left:5%;right:5%;top:58%;height:5px;transform:rotate(-1.2deg)}
  .tdp-thread-vertical{top:5%;bottom:5%;left:50%;width:5px;transform:translateX(-50%) rotate(.8deg);background:repeating-linear-gradient(45deg,#a85e6c 0 4px,#edc0c3 4px 8px,#c77b87 8px 12px)}
  .tdp-thread-bow{position:absolute;left:50%;top:58%;width:66px;height:42px;transform:translate(-50%,-50%);filter:drop-shadow(0 4px 4px rgba(75,38,39,.19));transition:transform .6s ease,opacity .35s ease}
  .tdp-thread-bow:before,.tdp-thread-bow:after{content:"";position:absolute;top:7px;width:31px;height:22px;border:4px solid #b96f7b;border-radius:65% 42% 64% 38%;background:rgba(255,235,230,.13)}
  .tdp-thread-bow:before{right:50%;transform:rotate(13deg)}.tdp-thread-bow:after{left:50%;transform:scaleX(-1) rotate(13deg)}
  .tdp-thread-heart{position:absolute;left:50%;top:58%;width:18px;height:18px;transform:translate(-50%,-42%) rotate(-45deg);border-radius:4px;background:linear-gradient(135deg,#d68d97,#874451);box-shadow:0 5px 9px rgba(77,35,41,.27),inset 0 1px 2px rgba(255,255,255,.4);transition:transform .55s ease,opacity .35s ease}
  .tdp-thread-heart:before,.tdp-thread-heart:after{content:"";position:absolute;width:18px;height:18px;border-radius:50%;background:inherit}.tdp-thread-heart:before{top:-9px;left:0}.tdp-thread-heart:after{top:0;left:9px}
  .tdp-envelope-glow{position:absolute;left:50%;bottom:82px;transform:translateX(-50%);width:330px;height:160px;background:radial-gradient(circle,rgba(255,247,218,.72),rgba(255,245,214,.18) 48%,transparent 74%);opacity:0;transition:opacity .65s ease;z-index:2}
  .tdp-gift-open-btn{position:relative;margin-top:2px;border:1px solid rgba(112,70,53,.08);border-radius:999px;padding:11px 19px;background:linear-gradient(#8a5b49,#704536);color:#fff9ef;cursor:pointer;font:700 .74rem/1 Arial,sans-serif;box-shadow:0 10px 22px rgba(81,48,34,.18);transition:transform .2s ease,box-shadow .2s ease}
  .tdp-gift-open-btn:hover{transform:translateY(-1px);box-shadow:0 14px 26px rgba(81,48,34,.23)}
  .tdp-gift-panel{position:relative;display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .82s cubic-bezier(.2,.8,.2,1),opacity .4s ease}
  .tdp-gift-panel-inner{overflow:hidden}.tdp-gift-section.open .tdp-gift-panel{grid-template-rows:1fr;opacity:1}
  .tdp-gift-section.open .tdp-envelope-flap{transform:rotateX(178deg)}
  .tdp-gift-section.open .tdp-envelope-seal{opacity:0;transform:translate(-50%,-82%) scale(.56) rotate(-12deg)}
  .tdp-gift-section.open .tdp-thread-horizontal{transform:translateX(120%) rotate(4deg);opacity:0}.tdp-gift-section.open .tdp-thread-vertical{transform:translate(-50%,-120%) rotate(-4deg);opacity:0}.tdp-gift-section.open .tdp-thread-bow,.tdp-gift-section.open .tdp-thread-heart{opacity:0;transform:translate(-50%,-50%) scale(.35) rotate(-18deg)}
  .tdp-gift-section.open .tdp-envelope-glow{opacity:1}
  .tdp-gift-section.open .tdp-gift-photo-card{opacity:1;visibility:visible;transition-delay:.2s,0s,0s,.2s;box-shadow:0 24px 44px rgba(51,30,19,.24)}
  .tdp-gift-section.open .tdp-photo-1{transform:translate(-72px,-186px) rotate(-9deg) scale(1)}
  .tdp-gift-section.open .tdp-photo-2{transform:translate(72px,-194px) rotate(9deg) scale(1)}
  .tdp-gift-section.open .tdp-envelope{animation:tdpEnvelopeSettle .9s .3s ease both}
  .tdp-gift-message{max-width:760px;margin:12px auto 2px;padding:20px 19px;border-radius:20px;background:rgba(255,251,244,.88);border:1px solid rgba(106,72,51,.12);box-shadow:0 12px 26px rgba(75,46,31,.08);text-align:left;font:.86rem/1.8 "Segoe Print","Bradley Hand","Comic Sans MS",cursive}
  .tdp-gift-date{display:inline-block;margin-bottom:9px;padding:6px 11px;border-radius:999px;background:#f0dcc0;color:#765144;font:700 .69rem/1 Arial,sans-serif;letter-spacing:.05em}
  .tdp-gift-ending{margin:17px auto 2px;font:italic .7rem/1.5 Georgia,serif;color:#8d6858}
  .tdp-gift-spark{position:absolute;z-index:12;width:9px;height:9px;border-radius:50%;background:#fff1cb;box-shadow:0 0 12px rgba(255,228,173,.8);opacity:0;pointer-events:none}.tdp-gift-section.open .tdp-gift-spark{animation:tdpGiftSpark 1.25s ease-out forwards}.tdp-gift-spark.s1{left:18%;top:24%;animation-delay:.03s!important}.tdp-gift-spark.s2{right:17%;top:28%;animation-delay:.12s!important}.tdp-gift-spark.s3{left:27%;bottom:24%;animation-delay:.2s!important}.tdp-gift-spark.s4{right:27%;bottom:22%;animation-delay:.28s!important}
  .tdp-gift-section.untying .tdp-thread-horizontal{transform:translateX(120%) rotate(4deg);opacity:0}
  .tdp-gift-section.untying .tdp-thread-vertical{transform:translate(-50%,-120%) rotate(-4deg);opacity:0}
  .tdp-gift-section.untying .tdp-thread-bow,.tdp-gift-section.untying .tdp-thread-heart{opacity:0;transform:translate(-50%,-50%) scale(.35) rotate(-18deg)}
  .tdp-gift-section.open .tdp-envelope-thread{visibility:hidden;opacity:0}
  .tdp-gift-section.open .tdp-envelope{cursor:default}
  .tdp-envelope:focus-visible{outline:2px solid #a85e6c;outline-offset:8px}
  @keyframes tdpGiftSpark{0%{opacity:0;transform:translateY(12px) scale(.25)}28%{opacity:1}100%{opacity:0;transform:translateY(-42px) scale(1.6)}}
  @keyframes tdpEnvelopeSettle{0%{transform:translateX(-50%) translateY(0)}45%{transform:translateX(-50%) translateY(5px)}100%{transform:translateX(-50%) translateY(2px)}}
  @media(max-width:680px){.tdp-gift-section{width:calc(100% - 20px);padding:24px 13px 24px;margin-top:28px}.tdp-gift-stage{min-height:390px}.tdp-envelope-scene{height:365px}.tdp-envelope{width:min(360px,88vw);height:222px}.tdp-gift-photo-stack{width:min(390px,92vw);height:285px}.tdp-gift-photo-card{width:47%;padding:8px 8px 28px}.tdp-gift-photo-card figcaption{bottom:7px;font-size:.52rem}.tdp-photo-1{left:7%;transform:translate(18px,116px) rotate(-7deg) scale(.66)}.tdp-photo-2{right:7%;transform:translate(-18px,121px) rotate(7deg) scale(.66)}.tdp-thread-bow{width:54px;transform:translate(-50%,-50%) scale(.9)}.tdp-thread-heart{width:22px;height:22px}.tdp-gift-section.open .tdp-photo-1{transform:translate(-24px,-148px) rotate(-8deg) scale(1)}.tdp-gift-section.open .tdp-photo-2{transform:translate(24px,-154px) rotate(8deg) scale(1)}.tdp-gift-message{font-size:.81rem;padding:17px 14px}}
  `;

  function mount(){
    if(document.getElementById('tdpGiftSection'))return;
    const stage=document.querySelector('.verse-stage');
    const wrap=document.querySelector('.verse-list');
    if(!stage&&!wrap){setTimeout(mount,120);return}
    const oldStyle=document.getElementById('tdpGiftStyles');if(oldStyle)oldStyle.remove();
    const style=document.createElement('style');style.id='tdpGiftStyles';style.textContent=styles;document.head.appendChild(style);
    const section=document.createElement('section');section.id='tdpGiftSection';section.className='tdp-gift-section';
    section.innerHTML=`
      <div class="tdp-gift-kicker">A little unopened memory</div>
      <h2>A gift I never gathered the courage to hand you</h2>
      <p class="tdp-gift-intro">There is one small thing waiting here from a day when I felt ridiculously proud and happy for you.</p>
      <div class="tdp-gift-stage"><div class="tdp-envelope-scene">
        <div class="tdp-envelope-glow"></div>
        <div class="tdp-envelope" id="tdpGiftBox" role="button" tabindex="0" aria-expanded="false" aria-controls="tdpGiftPanel" aria-label="Open the envelope gift">
          <div class="tdp-envelope-body"></div>
          <div class="tdp-gift-photo-stack" aria-hidden="true">
            <figure class="tdp-gift-photo-card tdp-photo-1"><img src="${PHOTO_1}" alt="The name plate gift, first view" loading="eager"><figcaption>a proud little moment</figcaption></figure>
            <figure class="tdp-gift-photo-card tdp-photo-2"><img src="${PHOTO_2}" alt="The name plate gift, second view" loading="eager"><figcaption>meant for your desk</figcaption></figure>
          </div>
          <div class="tdp-envelope-front"></div><div class="tdp-envelope-flap"></div><div class="tdp-envelope-thread" aria-hidden="true"><span class="tdp-thread-horizontal"></span><span class="tdp-thread-vertical"></span><span class="tdp-thread-bow"></span></div>
        </div>
        <i class="tdp-gift-spark s1"></i><i class="tdp-gift-spark s2"></i><i class="tdp-gift-spark s3"></i><i class="tdp-gift-spark s4"></i>
      </div></div>
      <div class="tdp-gift-panel" id="tdpGiftPanel"><div class="tdp-gift-panel-inner">
        <div class="tdp-gift-message"><span class="tdp-gift-date">26 November, 2025</span><div>You told me that you got joining in UHC and that too almost beside your home and my office. I was so so so excited to share your happy moment with you. In that excitement I’ve ordered this name plate for you. You sitting in chair in that uhc and I am putting your name plate on the desk is all I could imagine but never get that courage to give you actually. It was so so proud moment for your hardwork.</div></div>
        <div class="tdp-gift-ending">A little gift, opened late — but still carrying the same proud moment.</div>
      </div></div>`;
    (stage||wrap).insertAdjacentElement('afterend',section);
    const box=section.querySelector('#tdpGiftBox');
    box.setAttribute('aria-label','Untie the threads to open the gift');
    let openTimer=0,scrollTimer=0;
    const syncGiftState=()=>{
      const open=section.classList.contains('open');
      box.setAttribute('aria-expanded',String(open));
      box.setAttribute('aria-label',open?'Tap to close the gift':'Untie the threads to open the gift');
      box.setAttribute('role','button');box.tabIndex=0;
      section.querySelector('.tdp-gift-photo-stack').setAttribute('aria-hidden',String(!open));
      const panel=section.querySelector('#tdpGiftPanel');
      panel.setAttribute('aria-hidden',String(!open));panel.inert=!open;
      section.querySelectorAll('.tdp-gift-photo-card').forEach(card=>{
        card.tabIndex=open?0:-1;
        if(!open)card.classList.remove('tdp-photo-focus');
      });
    };
    const toggleGift=()=>{
      if(section.classList.contains('open')||section.classList.contains('untying')){
        clearTimeout(openTimer);clearTimeout(scrollTimer);
        section.classList.remove('open','untying');
        syncGiftState();return;
      }
      section.classList.add('untying');
      openTimer=setTimeout(()=>{
        section.classList.remove('untying');
        section.classList.add('open');
        syncGiftState();
        scrollTimer=setTimeout(()=>section.scrollIntoView({behavior:'smooth',block:'center'}),180);
      },650);
    };
    syncGiftState();
    box.addEventListener('click',toggleGift);
    box.addEventListener('keydown',e=>{
      if(e.target===box&&(e.key==='Enter'||e.key===' ')){e.preventDefault();toggleGift();}
    });
  }
  mount();
})();
