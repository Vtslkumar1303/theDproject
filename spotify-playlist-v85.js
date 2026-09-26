(()=>{
  const PLAYLIST_ID='50Z9LbC0OeuzzZ24RVs0T5';
  const PLAYLIST_URL='https://open.spotify.com/playlist/'+PLAYLIST_ID;
  const EMBED_URL='https://open.spotify.com/embed/playlist/'+PLAYLIST_ID+'?utm_source=generator&theme=0';

  const mount=()=>{
    if(document.querySelector('.tdp-spotify-v85'))return true;
    const anchor=document.querySelector('.tdp-keepsake-desk-v70')||document.querySelector('.tdp-gift-section')||document.querySelector('main');
    if(!anchor)return false;

    const section=document.createElement('section');
    section.className='tdp-spotify-v85';
    section.setAttribute('aria-label','A little soundtrack I won’t explain');
    section.innerHTML=`
      <div class="tdp-sp-head">
        <div class="tdp-sp-kicker">somewhere between lyrics, overthinking & March</div>
        <h2>A Little Soundtrack I Won’t Explain 🎧</h2>
        <p>Some songs just started sounding like you. So I kept them together.</p>
      </div>

      <button class="tdp-sp-cover" type="button" aria-expanded="false">
        <span class="tdp-sp-cover-glow" aria-hidden="true"></span>
        <span class="tdp-sp-cassette" aria-hidden="true">
          <span class="tdp-sp-cassette-top">SIDE A · FOR MARCH</span>
          <span class="tdp-sp-window">
            <span class="tdp-sp-reel tdp-sp-reel-left"></span>
            <span class="tdp-sp-tape"></span>
            <span class="tdp-sp-reel tdp-sp-reel-right"></span>
          </span>
          <span class="tdp-sp-label">
            <b>press play, don’t overthink it</b>
            <small>a playlist made with you in mind</small>
          </span>
          <span class="tdp-sp-screws"><i></i><i></i><i></i><i></i></span>
        </span>
        <span class="tdp-sp-cover-copy">
          <b>Tap to unfold the playlist</b>
          <small>No explanation for every song. Some just felt right.</small>
        </span>
      </button>

      <div class="tdp-sp-panel" aria-hidden="true">
        <div class="tdp-sp-panel-inner">
          <div class="tdp-sp-note">
            <span class="tdp-sp-note-pin" aria-hidden="true"></span>
            <p>Maybe there isn’t a hidden meaning in every lyric.</p>
            <p>Maybe there’s just a little one in some of them.</p>
          </div>

          <div class="tdp-sp-moods" aria-label="playlist moods">
            <span>for long drives</span>
            <span>for sunsets</span>
            <span>for 2 AM thoughts</span>
          </div>

          <div class="tdp-sp-frame">
            <iframe
              title="Spotify playlist made for her"
              src="${EMBED_URL}"
              width="100%"
              height="552"
              frameborder="0"
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy">
            </iframe>
          </div>

          <div class="tdp-sp-footer">
            <span>Some feelings are easier to leave inside a song.</span>
            <a href="${PLAYLIST_URL}" target="_blank" rel="noopener noreferrer">Open playlist in Spotify ↗</a>
          </div>
        </div>
      </div>
    `;

    if(anchor.classList.contains('tdp-gift-section'))anchor.insertAdjacentElement('beforebegin',section);
    else anchor.insertAdjacentElement('afterend',section);

    const cover=section.querySelector('.tdp-sp-cover');
    const panel=section.querySelector('.tdp-sp-panel');
    const copy=section.querySelector('.tdp-sp-cover-copy b');

    cover.addEventListener('click',()=>{
      const open=section.classList.toggle('is-open');
      cover.setAttribute('aria-expanded',open?'true':'false');
      panel.setAttribute('aria-hidden',open?'false':'true');
      copy.textContent=open?'Tap to tuck the playlist away':'Tap to unfold the playlist';
      if(window.tdpTrack){
        window.tdpTrack(open?'spotify_playlist_open':'spotify_playlist_close',{section:'spotify_playlist',event_value:PLAYLIST_ID});
      }
      if(open){
        setTimeout(()=>section.scrollIntoView({behavior:'smooth',block:'center'}),180);
      }
    });

    document.documentElement.dataset.spotifySection='v85';
    return true;
  };

  const start=()=>{
    if(mount())return;
    const mo=new MutationObserver(()=>{if(mount())mo.disconnect()});
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>mo.disconnect(),15000);
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();