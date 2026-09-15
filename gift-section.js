(()=>{
  const PHOTO_1='https://the-d-project-media.floot.app/_cdn/static/8de8e672-3bd0-4cdd-973e-2db254fc30df-nameplate-1.jpeg';
  const PHOTO_2='https://the-d-project-media.floot.app/_cdn/static/1d7fb9b0-0f0c-413c-abd7-2339c4be51f3-nameplate-2.jpeg';

  const styles=`
  .tdp-gift-section{width:min(930px,calc(100% - 28px));margin:38px auto 78px;padding:30px 20px 28px;position:relative;z-index:12;overflow:hidden;border:1px solid rgba(101,69,49,.15);border-radius:28px;background:linear-gradient(rgba(250,240,220,.94),rgba(244,226,196,.95));box-shadow:0 18px 42px rgba(75,46,31,.12);color:#56382d;text-align:center}
  .tdp-gift-section:before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 12% 4%,rgba(255,255,255,.65),transparent 26%),radial-gradient(circle at 92% 94%,rgba(191,143,102,.11),transparent 30%)}
  .tdp-gift-kicker{position:relative;font:italic .73rem/1.4 Georgia,serif;color:#9a735f;margin-bottom:5px}
  .tdp-gift-section h2{position:relative;margin:0 auto 8px;font:700 clamp(1.35rem,3vw,2rem)/1.35 "Segoe Print","Bradley Hand","Comic Sans MS",cursive;color:#644235}
  .tdp-gift-intro{position:relative;max-width:650px;margin:0 auto 20px;font:italic .78rem/1.65 Georgia,serif;color:#806052}
  .tdp-gift-stage{position:relative;min-height:270px;display:grid;place-items:center;margin:3px auto 8px}
  .tdp-gift-box{position:relative;width:min(245px,68vw);aspect-ratio:1/1;cursor:pointer;filter:drop-shadow(0 25px 24px rgba(62,38,25,.18));transition:transform .55s cubic-bezier(.2,.8,.2,1)}
  .tdp-gift-box:hover{transform:translateY(-5px) rotate(-.6deg)}
  .tdp-gift-base{position:absolute;left:9%;right:9%;top:28%;bottom:7%;border-radius:18px;background:linear-gradient(145deg,#f0d5a9,#dfb783 58%,#ca9365);border:2px solid rgba(139,100,67,.28)}
  .tdp-gift-lid{position:absolute;left:4%;right:4%;top:10%;height:38%;border-radius:19px;background:linear-gradient(145deg,#f7ddb6,#e6bd89 58%,#d39d6c);border:2px solid rgba(139,100,67,.28);transform-origin:15% 94%;transition:transform .9s cubic-bezier(.2,.8,.2,1),translate .9s cubic-bezier(.2,.8,.2,1)}
  .tdp-gift-ribbon-v{position:absolute;z-index:3;top:8%;bottom:7%;left:45.5%;width:11%;border-radius:12px;background:linear-gradient(#93604b,#653b2d)}
  .tdp-gift-ribbon-h{position:absolute;z-index:3;left:6%;right:6%;top:39%;height:10%;border-radius:12px;background:linear-gradient(90deg,#93604b,#653b2d)}
  .tdp-gift-bow{position:absolute;z-index:5;left:50%;top:0;width:94px;height:66px;transform:translateX(-50%)}
  .tdp-gift-bow:before,.tdp-gift-bow:after{content:"";position:absolute;top:12px;width:40px;height:35px;border:10px solid #8b5845;border-radius:50% 50% 50% 10px;background:rgba(255,255,255,.09)}
  .tdp-gift-bow:before{left:4px;transform:rotate(-24deg)}.tdp-gift-bow:after{right:4px;transform:scaleX(-1) rotate(-24deg)}
  .tdp-gift-knot{position:absolute;z-index:6;left:50%;top:21px;width:21px;height:21px;border-radius:50%;transform:translateX(-50%);background:#6b4032}
  .tdp-gift-tag{position:absolute;z-index:7;right:10%;top:34%;padding:7px 10px;border-radius:10px;background:#fff9ef;color:#745044;box-shadow:0 8px 18px rgba(60,37,26,.14);font:italic .72rem/1.2 Georgia,serif;transform:rotate(7deg)}
  .tdp-gift-open-btn{position:relative;margin-top:-8px;border:1px solid rgba(112,70,53,.08);border-radius:999px;padding:11px 18px;background:linear-gradient(#8a5b49,#704536);color:#fff9ef;cursor:pointer;font:700 .74rem/1 Arial,sans-serif;box-shadow:0 10px 22px rgba(81,48,34,.18)}
  .tdp-gift-panel{position:relative;display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .82s cubic-bezier(.2,.8,.2,1),opacity .4s ease}
  .tdp-gift-panel-inner{overflow:hidden}
  .tdp-gift-section.open .tdp-gift-panel{grid-template-rows:1fr;opacity:1}
  .tdp-gift-section.open .tdp-gift-lid{transform:rotate(-112deg);translate:-31px -13px}
  .tdp-gift-section.open .tdp-gift-box{transform:translateY(-6px) scale(.98)}
  .tdp-gift-message{max-width:760px;margin:8px auto 20px;padding:20px 19px;border-radius:20px;background:rgba(255,251,244,.88);border:1px solid rgba(106,72,51,.12);box-shadow:0 12px 26px rgba(75,46,31,.08);text-align:left;font:.86rem/1.8 "Segoe Print","Bradley Hand","Comic Sans MS",cursive}
  .tdp-gift-date{display:inline-block;margin-bottom:9px;padding:6px 11px;border-radius:999px;background:#f0dcc0;color:#765144;font:700 .69rem/1 Arial,sans-serif;letter-spacing:.05em}
  .tdp-gift-gallery{display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:820px;margin:0 auto}
  .tdp-gift-photo{padding:11px;border-radius:20px;background:rgba(255,252,246,.94);border:1px solid rgba(110,76,54,.11);box-shadow:0 12px 25px rgba(66,41,28,.09)}
  .tdp-gift-photo img{width:100%;display:block;border-radius:14px;object-fit:cover;box-shadow:0 7px 18px rgba(38,22,16,.17)}
  .tdp-gift-ending{margin:17px auto 2px;font:italic .7rem/1.5 Georgia,serif;color:#8d6858}
  .tdp-gift-spark{position:absolute;z-index:9;width:9px;height:9px;border-radius:50%;background:#fff1cb;box-shadow:0 0 12px rgba(255,228,173,.8);opacity:0;pointer-events:none}
  .tdp-gift-section.open .tdp-gift-spark{animation:tdpGiftSpark 1.2s ease-out forwards}.tdp-gift-spark.s1{left:24%;top:20%;animation-delay:.05s!important}.tdp-gift-spark.s2{right:22%;top:25%;animation-delay:.12s!important}.tdp-gift-spark.s3{left:28%;bottom:22%;animation-delay:.2s!important}.tdp-gift-spark.s4{right:28%;bottom:20%;animation-delay:.27s!important}
  @keyframes tdpGiftSpark{0%{opacity:0;transform:translateY(12px) scale(.3)}25%{opacity:1}100%{opacity:0;transform:translateY(-34px) scale(1.5)}}
  @media(max-width:680px){.tdp-gift-section{width:calc(100% - 20px);padding:24px 13px 22px;margin-top:28px}.tdp-gift-stage{min-height:245px}.tdp-gift-gallery{grid-template-columns:1fr}.tdp-gift-message{font-size:.81rem;padding:17px 14px}.tdp-gift-box{width:min(225px,72vw)}}
  `;

  function mount(){
    if(document.getElementById('tdpGiftSection'))return;
    const stage=document.querySelector('.verse-stage');
    const wrap=document.querySelector('.verse-list');
    if(!stage&&!wrap){setTimeout(mount,150);return}
    const style=document.createElement('style');style.id='tdpGiftStyles';style.textContent=styles;document.head.appendChild(style);
    const section=document.createElement('section');section.id='tdpGiftSection';section.className='tdp-gift-section';
    section.innerHTML=`
      <div class="tdp-gift-kicker">A little unopened memory</div>
      <h2>A gift I never gathered the courage to hand you</h2>
      <p class="tdp-gift-intro">There is one small thing waiting here from a day when I felt ridiculously proud and happy for you.</p>
      <div class="tdp-gift-stage">
        <div class="tdp-gift-box" id="tdpGiftBox" role="button" tabindex="0" aria-expanded="false" aria-controls="tdpGiftPanel" aria-label="Open the gift">
          <div class="tdp-gift-lid"></div><div class="tdp-gift-base"></div><div class="tdp-gift-ribbon-v"></div><div class="tdp-gift-ribbon-h"></div><div class="tdp-gift-bow"></div><div class="tdp-gift-knot"></div><div class="tdp-gift-tag">open me</div>
          <i class="tdp-gift-spark s1"></i><i class="tdp-gift-spark s2"></i><i class="tdp-gift-spark s3"></i><i class="tdp-gift-spark s4"></i>
        </div>
        <button class="tdp-gift-open-btn" id="tdpGiftOpenBtn" type="button">Open this little gift</button>
      </div>
      <div class="tdp-gift-panel" id="tdpGiftPanel"><div class="tdp-gift-panel-inner">
        <div class="tdp-gift-message"><span class="tdp-gift-date">26 November, 2025</span><div>You told me that you got joining in UHC and that too almost beside your home and my office. I was so so so excited to share your happy moment with you. In that excitement I’ve ordered this name plate for you. You sitting in chair in that uhc and I am putting your name plate on the desk is all I could imagine but never get that courage to give you actually. It was so so proud moment for your hardwork.</div></div>
        <div class="tdp-gift-gallery"><div class="tdp-gift-photo"><img src="${PHOTO_1}" alt="The name plate gift, first view" loading="lazy"></div><div class="tdp-gift-photo"><img src="${PHOTO_2}" alt="The name plate gift, second view" loading="lazy"></div></div>
        <div class="tdp-gift-ending">A little gift, opened late — but still carrying the same proud moment.</div>
      </div></div>`;
    (stage||wrap).insertAdjacentElement('afterend',section);
    const box=section.querySelector('#tdpGiftBox'),btn=section.querySelector('#tdpGiftOpenBtn');
    const toggle=()=>{const open=section.classList.toggle('open');box.setAttribute('aria-expanded',String(open));btn.textContent=open?'Close this little gift':'Open this little gift';if(open)setTimeout(()=>section.scrollIntoView({behavior:'smooth',block:'center'}),220)};
    box.addEventListener('click',toggle);btn.addEventListener('click',toggle);box.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
  }
  mount();
})();
