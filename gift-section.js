(()=>{
  const PHOTO_1='https://the-d-project-media.floot.app/_cdn/static/92d3e126-ebd5-4389-b544-14ef3c62e8f7-nameplate-new-1.jpeg';
  const PHOTO_2='https://the-d-project-media.floot.app/_cdn/static/967fa18e-3b83-4daa-90fa-015387ad97f3-nameplate-new-2.jpeg';

  const styles=`
  .tdp-gift-section{width:min(930px,calc(100% - 28px));margin:38px auto 78px;padding:30px 20px 30px;position:relative;z-index:12;overflow:hidden;border:1px solid rgba(101,69,49,.15);border-radius:28px;background:linear-gradient(rgba(250,240,220,.94),rgba(244,226,196,.95));box-shadow:0 18px 42px rgba(75,46,31,.12);color:#56382d;text-align:center}
  .tdp-gift-section:before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 12% 4%,rgba(255,255,255,.65),transparent 26%),radial-gradient(circle at 92% 94%,rgba(191,143,102,.11),transparent 30%)}
  .tdp-gift-kicker{position:relative;font:italic .73rem/1.4 Georgia,serif;color:#9a735f;margin-bottom:5px}
  .tdp-gift-section h2{position:relative;margin:0 auto 8px;font:700 clamp(1.35rem,3vw,2rem)/1.35 "Segoe Print","Bradley Hand","Comic Sans MS",cursive;color:#644235}
  .tdp-gift-intro{position:relative;max-width:650px;margin:0 auto 16px;font:italic .78rem/1.65 Georgia,serif;color:#806052}
  .tdp-gift-stage{position:relative;min-height:390px;display:grid;place-items:center;margin:2px auto 8px}
  .tdp-envelope-scene{position:relative;width:min(560px,92vw);height:360px}
  .tdp-envelope{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);width:min(420px,82vw);height:255px;cursor:pointer;filter:drop-shadow(0 24px 25px rgba(62,38,25,.18));z-index:4}
  .tdp-envelope-body{position:absolute;inset:0;border-radius:16px;background:linear-gradient(#f6dfba,#e9c594);border:2px solid rgba(139,100,67,.28);overflow:hidden}
  .tdp-envelope-front{position:absolute;left:0;right:0;bottom:0;height:64%;clip-path:polygon(0 0,50% 58%,100% 0,100% 100%,0 100%);background:linear-gradient(#f1d4ab,#dfb783);z-index:5}
  .tdp-envelope-flap{position:absolute;left:0;right:0;top:0;height:60%;clip-path:polygon(0 0,100% 0,50% 100%);background:linear-gradient(#fae9cd,#efcf9e);border-top-left-radius:16px;border-top-right-radius:16px;transform-origin:50% 0;transition:transform 1s cubic-bezier(.2,.8,.2,1);z-index:7}
  .tdp-envelope-seal{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:68px;height:68px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#f4d8dc 0 20%,#c16d7a 24% 66%,#7b3c46 70% 100%);box-shadow:0 8px 18px rgba(82,39,44,.26);display:grid;place-items:center;color:#fff8f8;font:700 .78rem Georgia,serif;z-index:8;transition:opacity .45s ease,transform .6s ease}
  .tdp-envelope-seal:before{content:"for you";transform:rotate(-7deg)}
  .tdp-gift-photo-stack{position:absolute;left:50%;bottom:36px;transform:translateX(-50%);width:min(470px,90vw);height:300px;pointer-events:none;z-index:3}
  .tdp-gift-photo-card{position:absolute;width:43%;max-width:205px;padding:10px 10px 36px;background:#fffaf3;border-radius:10px;box-shadow:0 18px 34px rgba(51,30,19,.20);opacity:0;transition:transform 1s cubic-bezier(.2,.8,.2,1),opacity .5s ease}
  .tdp-gift-photo-card img{display:block;width:100%;border-radius:6px;object-fit:cover;box-shadow:0 8px 18px rgba(33,18,11,.14)}
  .tdp-photo-1{left:14%;bottom:10px;transform:translateY(120px) rotate(-8deg) scale(.86)}
  .tdp-photo-2{right:14%;bottom:4px;transform:translateY(125px) rotate(8deg) scale(.86)}
  .tdp-envelope-glow{position:absolute;left:50%;bottom:92px;transform:translateX(-50%);width:300px;height:140px;background:radial-gradient(circle,rgba(255,245,214,.62),rgba(255,245,214,.16) 50%,transparent 72%);opacity:0;transition:opacity .6s ease;z-index:1}
  .tdp-gift-open-btn{position:relative;margin-top:6px;border:1px solid rgba(112,70,53,.08);border-radius:999px;padding:11px 18px;background:linear-gradient(#8a5b49,#704536);color:#fff9ef;cursor:pointer;font:700 .74rem/1 Arial,sans-serif;box-shadow:0 10px 22px rgba(81,48,34,.18)}
  .tdp-gift-panel{position:relative;display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .82s cubic-bezier(.2,.8,.2,1),opacity .4s ease}
  .tdp-gift-panel-inner{overflow:hidden}.tdp-gift-section.open .tdp-gift-panel{grid-template-rows:1fr;opacity:1}
  .tdp-gift-section.open .tdp-envelope-flap{transform:rotateX(175deg)}
  .tdp-gift-section.open .tdp-envelope-seal{opacity:0;transform:translate(-50%,-70%) scale(.65)}
  .tdp-gift-section.open .tdp-envelope-glow{opacity:1}
  .tdp-gift-section.open .tdp-gift-photo-card{opacity:1}
  .tdp-gift-section.open .tdp-photo-1{transform:translate(-48px,-150px) rotate(-10deg) scale(1)}
  .tdp-gift-section.open .tdp-photo-2{transform:translate(48px,-158px) rotate(10deg) scale(1)}
  .tdp-gift-message{max-width:760px;margin:12px auto 2px;padding:20px 19px;border-radius:20px;background:rgba(255,251,244,.88);border:1px solid rgba(106,72,51,.12);box-shadow:0 12px 26px rgba(75,46,31,.08);text-align:left;font:.86rem/1.8 "Segoe Print","Bradley Hand","Comic Sans MS",cursive}
  .tdp-gift-date{display:inline-block;margin-bottom:9px;padding:6px 11px;border-radius:999px;background:#f0dcc0;color:#765144;font:700 .69rem/1 Arial,sans-serif;letter-spacing:.05em}
  .tdp-gift-ending{margin:17px auto 2px;font:italic .7rem/1.5 Georgia,serif;color:#8d6858}
  .tdp-gift-spark{position:absolute;z-index:9;width:9px;height:9px;border-radius:50%;background:#fff1cb;box-shadow:0 0 12px rgba(255,228,173,.8);opacity:0;pointer-events:none}.tdp-gift-section.open .tdp-gift-spark{animation:tdpGiftSpark 1.2s ease-out forwards}.tdp-gift-spark.s1{left:20%;top:22%;animation-delay:.05s!important}.tdp-gift-spark.s2{right:18%;top:26%;animation-delay:.12s!important}.tdp-gift-spark.s3{left:27%;bottom:22%;animation-delay:.2s!important}.tdp-gift-spark.s4{right:27%;bottom:20%;animation-delay:.27s!important}
  @keyframes tdpGiftSpark{0%{opacity:0;transform:translateY(12px) scale(.3)}25%{opacity:1}100%{opacity:0;transform:translateY(-34px) scale(1.5)}}
  @media(max-width:680px){.tdp-gift-section{width:calc(100% - 20px);padding:24px 13px 24px;margin-top:28px}.tdp-gift-stage{min-height:350px}.tdp-envelope-scene{height:330px}.tdp-envelope{width:min(360px,88vw);height:220px}.tdp-gift-photo-stack{width:min(370px,90vw);height:255px}.tdp-gift-photo-card{width:45%;padding:8px 8px 30px}.tdp-photo-1{left:9%}.tdp-photo-2{right:9%}.tdp-gift-section.open .tdp-photo-1{transform:translate(-18px,-118px) rotate(-9deg) scale(1)}.tdp-gift-section.open .tdp-photo-2{transform:translate(18px,-126px) rotate(9deg) scale(1)}.tdp-gift-message{font-size:.81rem;padding:17px 14px}}
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
      <div class="tdp-gift-stage"><div class="tdp-envelope-scene">
        <div class="tdp-envelope-glow"></div>
        <div class="tdp-gift-photo-stack" aria-hidden="true">
          <figure class="tdp-gift-photo-card tdp-photo-1"><img src="${PHOTO_1}" alt="The name plate gift, first view" loading="lazy"></figure>
          <figure class="tdp-gift-photo-card tdp-photo-2"><img src="${PHOTO_2}" alt="The name plate gift, second view" loading="lazy"></figure>
        </div>
        <div class="tdp-envelope" id="tdpGiftBox" role="button" tabindex="0" aria-expanded="false" aria-controls="tdpGiftPanel" aria-label="Open the envelope gift">
          <div class="tdp-envelope-body"></div><div class="tdp-envelope-front"></div><div class="tdp-envelope-flap"></div><div class="tdp-envelope-seal"></div>
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
    const toggle=()=>{const open=section.classList.toggle('open');box.setAttribute('aria-expanded',String(open));btn.textContent=open?'Close this little memory':'Unseal this little gift';if(open)setTimeout(()=>section.scrollIntoView({behavior:'smooth',block:'center'}),220)};
    box.addEventListener('click',toggle);btn.addEventListener('click',toggle);box.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
  }
  mount();
})();