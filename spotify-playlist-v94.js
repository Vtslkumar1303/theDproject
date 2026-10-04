(()=>{
  const PLAYLIST_ID='50Z9LbC0OeuzzZ24RVs0T5';
  const PLAYLIST_URL='https://open.spotify.com/playlist/'+PLAYLIST_ID;
  const EMBED_URL='https://open.spotify.com/embed/playlist/'+PLAYLIST_ID+'?utm_source=generator&theme=0';

  function placeAfterLittleFutures(section){
    const little=document.querySelector('.tdp-keepsake-desk-v70');
    if(!little)return false;
    if(little.nextElementSibling!==section) little.insertAdjacentElement('afterend',section);
    section.dataset.placement='after-little-futures';
    return true;
  }

  function build(){
    let section=document.querySelector('.tdp-spotify-v94');
    if(section)return section;

    section=document.createElement('section');
    section.className='tdp-spotify-v94';
    section.setAttribute('aria-label','Songs That Somehow Started Sounding Like You');
    section.innerHTML=`
      <div class="tdp-sp94-shell">
        <div class="tdp-sp94-head">
          <div class="tdp-sp94-kicker">somewhere between lyrics, overthinking & March</div>
          <h2>Songs That Somehow Started Sounding Like You</h2>
          <p>Some songs just started sounding like you. So I kept them together.</p>
        </div>

        <button class="tdp-sp94-toggle" type="button" aria-expanded="false" aria-controls="tdp-sp94-panel">
          <span class="tdp-sp94-cassette" aria-hidden="true">
            <span class="tdp-sp94-top">SIDE A · FOR MARCH</span>
            <span class="tdp-sp94-window">
              <span class="tdp-sp94-reel"></span>
              <span class="tdp-sp94-tape"></span>
              <span class="tdp-sp94-reel"></span>
            </span>
            <span class="tdp-sp94-label">
              <b>press play, don’t overthink it</b>
              <small>a playlist made with you in mind</small>
            </span>
            <span class="tdp-sp94-screw s1"></span>
            <span class="tdp-sp94-screw s2"></span>
            <span class="tdp-sp94-screw s3"></span>
            <span class="tdp-sp94-screw s4"></span>
          </span>
          <span class="tdp-sp94-toggle-copy">
            <b>Tap to open the soundtrack</b>
            <small>No explanation for every song. Some just felt right.</small>
            <i aria-hidden="true">⌄</i>
          </span>
        </button>

        <div class="tdp-sp94-panel" id="tdp-sp94-panel" aria-hidden="true">
          <div class="tdp-sp94-panel-inner">
            <div class="tdp-sp94-note">
              <p>Not every lyric means something… but a few definitely made me think of you</p>
              <p>Maybe there’s just a little one in some of them.</p>
            </div>

            <div class="tdp-sp94-moods" aria-label="playlist moods">
              <span>for long drives</span>
              <span>for sunsets</span>
              <span>for 2 AM thoughts</span>
            </div>

            <div class="tdp-sp94-frame">
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

            <div class="tdp-sp94-footer">
              <span>Some feelings are easier to leave inside a song.</span>
              <a href="${PLAYLIST_URL}" target="_blank" rel="noopener noreferrer">Open playlist in Spotify ↗</a>
            </div>

            <button class="tdp-sp94-close" type="button">Tap to close the soundtrack ↑</button>
          </div>
        </div>
      </div>
    `;

    const little=document.querySelector('.tdp-keepsake-desk-v70');
    const gift=document.querySelector('.tdp-gift-section');
    const main=document.querySelector('main');

    if(little) little.insertAdjacentElement('afterend',section);
    else if(gift) gift.insertAdjacentElement('beforebegin',section);
    else if(main) main.appendChild(section);
    else return null;

    const toggle=section.querySelector('.tdp-sp94-toggle');
    const panel=section.querySelector('.tdp-sp94-panel');
    const label=section.querySelector('.tdp-sp94-toggle-copy b');
    const close=section.querySelector('.tdp-sp94-close');

    const setOpen=(open)=>{
      section.classList.toggle('is-open',open);
      toggle.setAttribute('aria-expanded',open?'true':'false');
      panel.setAttribute('aria-hidden',open?'false':'true');
      label.textContent=open?'Tap to close the soundtrack':'Tap to open the soundtrack';
      if(window.tdpTrack){
        window.tdpTrack(open?'spotify_playlist_open':'spotify_playlist_close',{
          section:'spotify_playlist',
          event_value:PLAYLIST_ID
        });
      }
    };

    toggle.addEventListener('click',()=>setOpen(!section.classList.contains('is-open')));
    close.addEventListener('click',()=>{
      setOpen(false);
      setTimeout(()=>section.scrollIntoView({behavior:'smooth',block:'center'}),120);
    });

    document.documentElement.dataset.spotifySection='v94';
    return section;
  }

  function start(){
    const section=build();
    if(!section){
      setTimeout(start,180);
      return;
    }

    placeAfterLittleFutures(section);

    const mo=new MutationObserver(()=>{
      placeAfterLittleFutures(section);
    });
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>mo.disconnect(),20000);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();