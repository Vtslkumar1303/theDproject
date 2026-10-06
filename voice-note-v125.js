(()=>{
  const AUDIO_URL='https://the-d-project-media.floot.app/_cdn/static/b69affdc-325d-4812-affc-5c93a33d63e9-voice-message-20261006.m4a';
  const MAX_DURATION=34.20;

  const fmt=s=>{
    if(!Number.isFinite(s)||s<0)return '0:00';
    const m=Math.floor(s/60),sec=Math.floor(s%60);
    return m+':'+String(sec).padStart(2,'0');
  };

  const mount=()=>{
    if(document.querySelector('.tdp-voice-note'))return true;
    const khat=document.querySelector('.spotify-player,#musicCard');
    if(!khat||!khat.parentNode)return false;

    const wrap=document.createElement('section');
    wrap.className='tdp-voice-note';
    wrap.setAttribute('aria-label','Voice message');
    wrap.innerHTML=`
      <div class="tdp-voice-note__intro">
        <span class="tdp-voice-note__kicker">A tiny message</span>
        <h3 class="tdp-voice-note__title">From all the voices in my head</h3>
      </div>
      <div class="tdp-cassette">
        <div class="tdp-cassette__label"><strong>VOICE MEMO</strong><span>00:34</span></div>
        <div class="tdp-cassette__window" aria-hidden="true">
          <span class="tdp-rec-dot"></span>
          <span class="tdp-wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
          <span class="tdp-mini-mic"></span>
        </div>
        <div class="tdp-cassette__control">
          <button class="tdp-voice-play" type="button" aria-label="Play voice message">
            <svg class="play-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
            <svg class="pause-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>
          </button>
          <input class="tdp-voice-seek" type="range" min="0" max="1000" value="0" aria-label="Voice message progress">
          <span class="tdp-voice-time">0:00 / 0:39</span>
        </div>
        <audio class="tdp-voice-audio" preload="metadata" src="${AUDIO_URL}"></audio>
      </div>`;

    khat.parentNode.insertBefore(wrap,khat);

    const audio=wrap.querySelector('.tdp-voice-audio');
    const btn=wrap.querySelector('.tdp-voice-play');
    const seek=wrap.querySelector('.tdp-voice-seek');
    const time=wrap.querySelector('.tdp-voice-time');
    const khatAudio=document.getElementById('audio');

    const sync=()=>{
      const d=MAX_DURATION;
      const current=Math.min(audio.currentTime,d);
      seek.value=Math.round((current/d)*1000);
      time.textContent=fmt(current)+' / 0:34';
    };
    const setPlaying=on=>{
      wrap.classList.toggle('is-playing',on);
      btn.setAttribute('aria-label',on?'Pause voice message':'Play voice message');
    };

    btn.addEventListener('click',async()=>{
      if(audio.paused){
        if(khatAudio&&!khatAudio.paused)khatAudio.pause();
        document.querySelectorAll('audio').forEach(a=>{if(a!==audio&&a!==khatAudio&&!a.paused)a.pause()});
        try{await audio.play()}catch(e){}
      }else audio.pause();
    });

    seek.addEventListener('input',()=>{
      const d=MAX_DURATION;
      audio.currentTime=Math.min(d,d*(Number(seek.value)/1000));
      sync();
    });

    audio.addEventListener('play',()=>setPlaying(true));
    audio.addEventListener('pause',()=>setPlaying(false));
    audio.addEventListener('ended',()=>{setPlaying(false);audio.currentTime=0;sync()});
    audio.addEventListener('loadedmetadata',sync);
    audio.addEventListener('timeupdate',()=>{
      if(audio.currentTime>=MAX_DURATION){
        audio.pause();
        audio.currentTime=MAX_DURATION;
      }
      sync();
    });

    if(khatAudio){
      khatAudio.addEventListener('play',()=>{if(!audio.paused)audio.pause()});
    }

    sync();
    return true;
  };

  if(!mount()){
    let tries=0;
    const timer=setInterval(()=>{
      tries++;
      if(mount()||tries>80)clearInterval(timer);
    },100);
  }
})();