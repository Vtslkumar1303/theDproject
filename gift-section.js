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
  .tdp-envelope{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);width:min(430px,84vw);height:260px;cursor:pointer;filter:drop-shadow(0 24px 28px rgba(62,38,25,.20));z-index:6;transition:transform .3s ease}
  .tdp-envelope:hover{transform:translateX(-50%) translateY(-2px)}
  .tdp-envelope-body{position:absolute;inset:0;border-radius:17px;background:linear-gradient(#f8e5c5,#eac795);border:2px solid rgba(139,100,67,.28);overflow:hidden;box-shadow:inset 0 2px 0 rgba(255,255,255,.5)}
  .tdp-envelope-front{position:absolute;left:0;right:0;bottom:0;height:66%;clip-path:polygon(0 0,50% 59%,100% 0,100% 100%,0 100%);background:linear-gradient(#f3d7ae,#dfb783);z-index:8;border-bottom-left-radius:15px;border-bottom-right-radius:15px}
  .tdp-envelope-flap{position:absolute;left:0;right:0;top:0;height:61%;clip-path:polygon(0 0,100% 0,50% 100%);background:linear-gradient(#fbeacf,#efcf9e);border-top-left-radius:16px;border-top-right-radius:16px;transform-origin:50% 0;transition:transform 1.05s cubic-bezier(.18,.82,.18,1);z-index:10;backface-visibility:hidden;box-shadow:inset 0 2px 0 rgba(255,255,255,.55)}
  .tdp-envelope-seal{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:74px;height:74px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#f7dde1 0 18%,#c77280 22% 67%,#7b3c46 71% 100%);box-shadow:0 8px 20px rgba(82,39,44,.28),inset 0 2px 3px rgba(255,255,255,.25);display:grid;place-items:center;color:#fff8f8;z-index:11;transition:opacity .42s ease,transform .7s ease}
  .tdp-envelope-seal:before{content:"For you";font:700 .8rem/1 Georgia,serif;transform:rotate(-7deg)}
  .tdp-envelope-seal:after{content:"";position:absolute;inset:9px;border:1px dashed rgba(255,255,255,.35);border-radius:50%}
  .tdp-gift-photo-stack{position:absolute;left:50%;bottom:30px;transform:translateX(-50%);width:min(500px,92vw);height:330px;pointer-events:none;z-index:7}
  .tdp-gift-photo-card{position:absolute;width:45%;max-width:220px;padding:10px 10px 34px;background:#fffaf3;border:1px solid rgba(94,66,48,.11);border-radius:11px;box-shadow:0 18px 34px rgba(51,30,19,.22);opacity:1;transform-origin:center bottom;transition:transform 1.12s cubic-bezier(.16,.84,.22,1),opacity .45s ease,box-shadow .45s ease}
  .tdp-gift-photo-card img{display:block;width:100%;aspect-ratio:1.08/1;object-fit:cover;border-radius:7px;box-shadow:0 8px 18px rgba(33,18,11,.14)}
  .tdp-gift-photo-card figcaption{position:absolute;left:10px;right:10px;bottom:9px;color:#79594b;font:italic .58rem/1.3 Georgia,serif;text-align:center;white-space:nowrap}
  .tdp-photo-1{left:12%;bottom:4px;transform:translate(25px,-35px) rotate(-7deg) scale(.74)}
  .tdp-photo-2{right:12%;bottom:0;transform:translate(-25px,-29px) rotate(7deg) scale(.74)}
  .tdp-envelope-label{position:absolute;left:50%;bottom:30px;z-index:12;transform:translateX(-50%) rotate(-1.5deg);width:58%;padding:11px 12px 10px;border:1px solid rgba(118,77,49,.16);border-radius:9px;background:rgba(255,248,232,.82);box-shadow:0 6px 14px rgba(72,44,28,.1);color:#765142;text-align:center;pointer-events:none;transition:opacity .35s ease,transform .55s ease}
  .tdp-envelope-label small{display:block;font:700 .53rem/1 Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a47864}
  .tdp-envelope-label strong{display:block;margin-top:4px;font:italic 700 .88rem/1.2 Georgia,serif}
  .tdp-envelope-photo-count{position:absolute;right:7%;bottom:24px;z-index:13;width:48px;height:48px;border:1px dashed rgba(121,76,50,.38);border-radius:50%;display:grid;place-items:center;background:rgba(245,218,180,.72);color:#885d49;font:800 .58rem/1.12 Arial,sans-serif;text-align:center;transform:rotate(9deg);pointer-events:none}
  .tdp-envelope-glow{position:absolute;left:50%;bottom:82px;transform:translateX(-50%);width:330px;height:160px;background:radial-gradient(circle,rgba(255,247,218,.72),rgba(255,245,214,.18) 48%,transparent 74%);opacity:0;transition:opacity .65s ease;z-index:2}
  .tdp-gift-open-btn{position:relative;margin-top:2px;border:1px solid rgba(112,70,53,.08);border-radius:999px;padding:11px 19px;background:linear-gradient(#8a5b49,#704536);color:#fff9ef;cursor:pointer;font:700 .74rem/1 Arial,sans-serif;box-shadow:0 10px 22px rgba(81,48,34,.18);transition:transform .2s ease,box-shadow .2s ease}
  .tdp-gift-open-btn:hover{transform:translateY(-1px);box-shadow:0 14px 26px rgba(81,48,34,.23)}
  .tdp-gift-panel{position:relative;display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .82s cubic-bezier(.2,.8,.2,1),opacity .4s ease}
  .tdp-gift-panel-inner{overflow:hidden}.tdp-gift-section.open .tdp-gift-panel{grid-template-rows:1fr;opacity:1}
  .tdp-gift-section.open .tdp-envelope-flap{transform:rotateX(178deg)}
  .tdp-gift-section.open .tdp-envelope-seal{opacity:0;transform:translate(-50%,-82%) scale(.56) rotate(-12deg)}
  .tdp-gift-section.open .tdp-envelope-label{opacity:0;transform:translateX(-50%) translateY(16px) rotate(-4deg) scale(.92)}
  .tdp-gift-section.open .tdp-envelope-photo-count{opacity:0;transition:opacity .3s ease}
  .tdp-gift-section.open .tdp-envelope-glow{opacity:1}
  .tdp-gift-section.open .tdp-gift-photo-card{opacity:1;box-shadow:0 24px 44px rgba(51,30,19,.24)}
  .tdp-gift-section.open .tdp-photo-1{transform:translate(-72px,-186px) rotate(-9deg) scale(1)}
  .tdp-gift-section.open .tdp-photo-2{transform:translate(72px,-194px) rotate(9deg) scale(1)}
  .tdp-gift-section.open .tdp-envelope{animation:tdpEnvelopeSettle .9s .3s ease both}
  .tdp-gift-message{max-width:760px;margin:12px auto 2px;padding:20px 19px;border-radius:20px;background:rgba(255,251,244,.88);border:1px solid rgba(106,72,51,.12);box-shadow:0 12px 26px rgba(75,46,31,.08);text-align:left;font:.86rem/1.8 "Segoe Print","Bradley Hand","Comic Sans MS",cursive}
  .tdp-gift-date{display:inline-block;margin-bottom:9px;padding:6px 11px;border-radius:999px;background:#f0dcc0;color:#765144;font:700 .69rem/1 Arial,sans-serif;letter-spacing:.05em}
  .tdp-gift-ending{margin:17px auto 2px;font:italic .7rem/1.5 Georgia,serif;color:#8d6858}
  .tdp-gift-spark{position:absolute;z-index:12;width:9px;height:9px;border-radius:50%;background:#fff1cb;box-shadow:0 0 12px rgba(255,228,173,.8);opacity:0;pointer-events:none}.tdp-gift-section.open .tdp-gift-spark{animation:tdpGiftSpark 1.25s ease-out forwards}.tdp-gift-spark.s1{left:18%;top:24%;animation-delay:.03s!important}.tdp-gift-spark.s2{right:17%;top:28%;animation-delay:.12s!important}.tdp-gift-spark.s3{left:27%;bottom:24%;animation-delay:.2s!important}.tdp-gift-spark.s4{right:27%;bottom:22%;animation-delay:.28s!important}
  @keyframes tdpGiftSpark{0%{opacity:0;transform:translateY(12px) scale(.25)}28%{opacity:1}100%{opacity:0;transform:translateY(-42px) scale(1.6)}}
  @keyframes tdpEnvelopeSettle{0%{transform:translateX(-50%) translateY(0)}45%{transform:translateX(-50%) translateY(5px)}100%{transform:translateX(-50%) translateY(2px)}}
  @media(max-width:680px){.tdp-gift-section{width:calc(100% - 20px);padding:24px 13px 24px;margin-top:28px}.tdp-gift-stage{min-height:390px}.tdp-envelope-scene{height:365px}.tdp-envelope{width:min(360px,88vw);height:222px}.tdp-gift-photo-stack{width:min(390px,92vw);height:285px}.tdp-gift-photo-card{width:47%;padding:8px 8px 28px}.tdp-gift-photo-card figcaption{bottom:7px;font-size:.52rem}.tdp-photo-1{left:7%;transform:translate(18px,-2px) rotate(-7deg) scale(.72)}.tdp-photo-2{right:7%;transform:translate(-18px,2px) rotate(7deg) scale(.72)}.tdp-envelope-label{bottom:25px;width:61%;padding:9px 8px}.tdp-envelope-label strong{font-size:.76rem}.tdp-envelope-photo-count{width:42px;height:42px;right:5%;bottom:18px;font-size:.52rem}.tdp-gift-section.open .tdp-photo-1{transform:translate(-24px,-148px) rotate(-8deg) scale(1)}.tdp-gift-section.open .tdp-photo-2{transform:translate(24px,-154px) rotate(8deg) scale(1)}.tdp-gift-message{font-size:.81rem;padding:17px 14px}}
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
          <div class="tdp-envelope-front"></div><div class="tdp-envelope-label"><small>photo memories</small><strong>kept for you</strong></div><div class="tdp-envelope-photo-count">2<br>PHOTOS</div><div class="tdp-envelope-flap"></div><div class="tdp-envelope-seal"></div>
        </div>
        <i class="tdp-gift-spark s1"></i><i class="tdp-gift-spark s2"></i><i class="tdp-gift-spark s3"></i><i class="tdp-gift-spark s4"></i>
      </div></div>
      <button class="tdp-gift-open-btn" id="tdpGiftOpenBtn" type="button">Unseal this little gift</button>
      <div class="tdp-gift-panel" id="tdpGiftPanel"><div class="tdp-gift-panel-inner">
        <div class="tdp-gift-message"><span class="tdp-gift-date">26 November, 2025</span><div>You told me that you got joining in UHC and that too almost beside your home and my office. I was so so so excited to share your happy moment with you. In that excitement I’ve ordered this name plate for you. You sitting in chair in that uhc and I am putting your name plate on the desk is all I could imagine but never get that courage to give you actually. It was so so proud moment for your hardwork.</div></div>
        <div class="tdp-gift-ending">A little gift, opened late — but still carrying the same proud moment.</div>
      </div></div>`;
    (stage||wrap).insertAdjacentElement('afterend',section);
    const box=section.querySelector('#tdpGiftBox'),btn=section.querySelector('#tdpGiftOpenBtn');
    const toggle=()=>{
      const open=section.classList.toggle('open');
      box.setAttribute('aria-expanded',String(open));
      btn.textContent=open?'Close this little memory':'Unseal this little gift';
      if(open)setTimeout(()=>section.scrollIntoView({behavior:'smooth',block:'center'}),180);
    };
    box.addEventListener('click',toggle);btn.addEventListener('click',toggle);box.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
  }
  mount();
})();
