(()=>{
  const cfg=window.TDP_ANALYTICS_CONFIG||{};
  const now=()=>new Date().toISOString();
  const visitorId=localStorage.tdpVisitorId||(localStorage.tdpVisitorId='v_'+crypto.randomUUID());
  const sessionId=sessionStorage.tdpSessionId||(sessionStorage.tdpSessionId='s_'+crypto.randomUUID());
  const baseMeta={ua:navigator.userAgent,lang:navigator.language,screen:`${screen.width}x${screen.height}`,referrer:document.referrer||'direct'};
  const endpoint=cfg.supabaseUrl?cfg.supabaseUrl.replace(/\/$/,'')+'/rest/v1/analytics_events':'';
  const enabled=!!(endpoint&&cfg.supabaseAnonKey);
  const pendingKey='tdpAnalyticsPending';

  async function send(row){
    if(!enabled){
      const q=JSON.parse(localStorage.getItem(pendingKey)||'[]'); q.push(row); localStorage.setItem(pendingKey,JSON.stringify(q.slice(-250))); return;
    }
    try{
      await fetch(endpoint,{method:'POST',keepalive:true,headers:{'Content-Type':'application/json','apikey':cfg.supabaseAnonKey,'Authorization':'Bearer '+cfg.supabaseAnonKey,'Prefer':'return=minimal'},body:JSON.stringify(row)});
    }catch(e){}
  }

  function track(event_name,data={}){
    const row={visitor_id:visitorId,session_id:sessionId,event_name,event_value:data.event_value??null,section:data.section??null,path:location.pathname+location.search,meta:{...baseMeta,...data.meta},created_at:now()};
    send(row);
    try{window.posthog?.capture?.(event_name,{...data,visitor_id:visitorId,session_id:sessionId});}catch(e){}
  }
  window.tdpTrack=track;

  function flushPending(){
    if(!enabled)return;
    const q=JSON.parse(localStorage.getItem(pendingKey)||'[]'); if(!q.length)return;
    localStorage.removeItem(pendingKey); q.forEach(send);
  }

  track('site_opened',{meta:{first_visit:!localStorage.tdpSeenBefore}}); localStorage.tdpSeenBefore='1'; flushPending();

  const seenScroll=new Set();
  addEventListener('scroll',()=>{
    const max=document.documentElement.scrollHeight-innerHeight; if(max<=0)return;
    const pct=Math.round(scrollY/max*100); [25,50,75,100].forEach(n=>{if(pct>=n&&!seenScroll.has(n)){seenScroll.add(n);track('scroll_depth',{event_value:String(n)})}});
  },{passive:true});

  addEventListener('visibilitychange',()=>track(document.hidden?'page_hidden':'page_visible'));
  addEventListener('pagehide',()=>track('session_end',{meta:{duration_ms:Math.round(performance.now())}}));

  document.addEventListener('click',e=>{
    const el=e.target.closest('button,a,[role="button"]'); if(!el)return;
    const text=(el.getAttribute('aria-label')||el.textContent||el.id||el.className||'control').trim().replace(/\s+/g,' ').slice(0,80);
    track('button_click',{event_value:text,meta:{id:el.id||null,classes:typeof el.className==='string'?el.className:null}});
  },true);

  const sections=[['gift','.tdp-gift-section'],['dreamboard','.tdp-dreamboard-shell'],['tickets','.tdp-tickets'],['polaroids','.tdp-polaroids'],['postcards','.tdp-postcards'],['passport','.tdp-passport'],['sunset_film','.tdp-film-wrap']];
  const active=new Map();
  const io='IntersectionObserver'in window?new IntersectionObserver(entries=>entries.forEach(entry=>{
    const section=entry.target.dataset.tdpAnalyticsSection; if(!section)return;
    if(entry.isIntersecting&&entry.intersectionRatio>=.35){if(!active.has(section)){active.set(section,performance.now());track('section_enter',{section})}}
    else if(active.has(section)){const ms=Math.round(performance.now()-active.get(section));active.delete(section);track('section_exit',{section,meta:{dwell_ms:ms}})}
  }),{threshold:[0,.35,.7]}):null;
  const register=()=>sections.forEach(([name,sel])=>document.querySelectorAll(sel).forEach(el=>{if(el.dataset.tdpAnalyticsSection)return;el.dataset.tdpAnalyticsSection=name;io?.observe(el)}));
  register(); new MutationObserver(register).observe(document.documentElement,{subtree:true,childList:true});

  const classSeen=new WeakMap();
  new MutationObserver(ms=>ms.forEach(m=>{
    const el=m.target; if(!(el instanceof HTMLElement))return;
    const old=classSeen.get(el)||''; const cur=el.className||''; classSeen.set(el,cur);
    if(el.matches('.tdp-gift-section')){if(!old.includes('open')&&cur.includes('open'))track('gift_opened');if(old.includes('open')&&!cur.includes('open'))track('gift_closed')}
    if(el.matches('.tdp-dreamboard-shell')){if(!old.includes('is-open')&&cur.includes('is-open'))track('dreamboard_opened');if(old.includes('is-open')&&!cur.includes('is-open'))track('dreamboard_closed')}
  })).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['class']});
})();
