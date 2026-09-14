(()=>{
  function mount(){
    const player=document.querySelector('.spotify-player');
    const audio=document.getElementById('audio');
    const title=document.getElementById('tt');
    const syncLines=window.KHAT_SYNC_LINES;
    if(!player||!audio||!title||!Array.isArray(syncLines)){
      setTimeout(mount,120);
      return;
    }

    let row=player.querySelector('.spotify-title-lyric-row');
    let lyric=document.getElementById('khatLiveLyric');
    if(!row){
      row=document.createElement('div');
      row.className='spotify-title-lyric-row';
      title.parentNode.insertBefore(row,title);
      row.appendChild(title);
    }
    if(!lyric){
      lyric=document.createElement('div');
      lyric.id='khatLiveLyric';
      lyric.className='khat-live-lyric';
      row.appendChild(lyric);
    }

    let lastIndex=-1;
    let lastTrack='';

    function getActiveIndex(time){
      let lo=0, hi=syncLines.length-1, found=0;
      while(lo<=hi){
        const mid=(lo+hi)>>1;
        if(syncLines[mid].t<=time){
          found=mid;
          lo=mid+1;
        }else{
          hi=mid-1;
        }
      }
      return found;
    }

    function sync(){
      const isKhat=(title.textContent||'').trim().toLowerCase()==='khat';
      const trackKey=(title.textContent||'').trim();
      if(trackKey!==lastTrack){
        lastTrack=trackKey;
        lastIndex=-1;
      }

      if(!isKhat){
        lyric.textContent='';
        lyric.style.display='none';
        return;
      }

      lyric.style.display='block';
      const index=getActiveIndex(audio.currentTime||0);
      if(index===lastIndex)return;
      lastIndex=index;

      const text=syncLines[index]?.line||'';
      lyric.classList.remove('lyric-pop');
      void lyric.offsetWidth;
      lyric.textContent=text;
      lyric.style.visibility=text?'visible':'hidden';
      lyric.style.opacity=text?'1':'0';
      if(text) lyric.classList.add('lyric-pop');
    }

    ['timeupdate','seeked','seeking','loadedmetadata','play','pause','durationchange'].forEach(ev=>audio.addEventListener(ev,sync));

    const titleObserver=new MutationObserver(sync);
    titleObserver.observe(title,{childList:true,characterData:true,subtree:true});

    sync();
  }

  mount();
})();
