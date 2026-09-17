(()=>{
 const STORE='tdpLocalAnalyticsV1',READY='tdpAnalyticsCollectorReadyV51',BC='tdp-analytics-live';
 const read=()=>{try{return JSON.parse(localStorage.getItem(STORE)||'[]')}catch(e){return[]}};
 const count=(a,n)=>a.filter(x=>x.event_name===n).length;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function render(){
   const a=read();
   document.getElementById('opens').textContent=count(a,'site_opened');
   document.getElementById('correct').textContent=count(a,'password_correct');
   document.getElementById('wrong').textContent=count(a,'password_wrong');
   document.getElementById('clicks').textContent=count(a,'button_click');
   document.getElementById('gift').textContent=count(a,'gift_opened');
   document.getElementById('dream').textContent=count(a,'dreamboard_opened');
   document.getElementById('sessions').textContent=new Set(a.map(x=>x.session_id)).size;
   const sd=a.filter(x=>x.event_name==='scroll_depth').at(-1);document.getElementById('scroll').textContent=(sd?.event_value||0)+'%';
   const ready=localStorage.getItem(READY);
   const status=document.getElementById('collectorStatus');
   if(ready){let r={};try{r=JSON.parse(ready)}catch(e){};status.innerHTML='<b style="color:#9ce6b5">Collector detected ✓</b><br><span class="muted">Last initialized: '+esc(r.at||'unknown')+'</span>'}
   else status.innerHTML='<b style="color:#ffcf87">Collector has not run in this browser yet.</b><br><span class="muted">Open the tracked site using the button below, interact with it, then return here.</span>';
   const sums={};a.filter(x=>x.event_name==='section_exit'&&x.section).forEach(x=>sums[x.section]=(sums[x.section]||0)+(x.meta?.dwell_ms||0));
   const max=Math.max(1,...Object.values(sums));document.getElementById('dwell').innerHTML=Object.entries(sums).sort((a,b)=>b[1]-a[1]).map(([k,v])=>'<div class="sectionrow"><div><strong>'+esc(k)+'</strong> <span class="muted">'+(v/1000).toFixed(1)+'s</span></div><div class="bar"><i style="width:'+(v/max*100)+'%"></i></div></div>').join('')||'<div class="muted">No dwell data yet.</div>';
   const latest=a.at(-1)?.meta||{};document.getElementById('browser').innerHTML='<div><strong>Language:</strong> '+esc(latest.lang||navigator.language)+'</div><div><strong>Screen:</strong> '+esc(latest.screen||screen.width+'x'+screen.height)+'</div><div><strong>Viewport:</strong> '+esc(latest.viewport||innerWidth+'x'+innerHeight)+'</div><div><strong>Referrer:</strong> '+esc(latest.referrer||'direct')+'</div><div><strong>Share tag:</strong> '+esc(latest.share||'—')+'</div>';
   document.getElementById('rows').innerHTML=a.slice().reverse().slice(0,500).map(x=>'<tr><td>'+esc(new Date(x.created_at).toLocaleString())+'</td><td>'+esc(x.event_name)+'</td><td>'+esc(x.section||x.event_value||'—')+'</td><td>'+esc((x.session_id||'').slice(0,14))+'</td><td>'+esc(x.meta?.dwell_ms?Math.round(x.meta.dwell_ms/1000)+'s':'')+'</td></tr>').join('');
 }
 document.getElementById('refresh').onclick=render;
 document.getElementById('openTracked').onclick=()=>window.open('./?v=analytics-diagnostic-v51&share=admin-test','_blank','noopener');
 document.getElementById('test').onclick=()=>{const rows=read();rows.push({id:'test_'+Date.now(),created_at:new Date().toISOString(),visitor_id:'admin-test',session_id:'admin-test',event_name:'diagnostic_test',event_value:'dashboard storage OK',section:null,path:location.pathname,meta:{lang:navigator.language,screen:screen.width+'x'+screen.height,viewport:innerWidth+'x'+innerHeight,referrer:document.referrer||'direct'}});localStorage.setItem(STORE,JSON.stringify(rows.slice(-2000)));render()};
 document.getElementById('export').onclick=()=>{const blob=new Blob([JSON.stringify(read(),null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='tdp-local-analytics.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
 document.getElementById('clear').onclick=()=>{if(confirm('Clear analytics stored in this browser?')){localStorage.removeItem(STORE);localStorage.removeItem(READY);render()}};
 try{const bc=new BroadcastChannel(BC);bc.onmessage=render}catch(e){}
 addEventListener('storage',e=>{if(e.key===STORE||e.key===READY)render()});
 render();setInterval(render,1000);
})();