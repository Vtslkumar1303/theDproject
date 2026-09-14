(()=>{
  const LINES=[
    'काग़ज़ के फूल लाऊँ तेरे लिए','ख़त लिखूँ तेरे लिए','मैं ख़ुदा में मानूँ नहीं','पर माँगूँ दुआ तेरे लिए','तेरे लिए घर बनाऊँ','दीवार नीले रंग से सजाऊँ','पसंद है तुम्हें, मालूम है','तुमने बताया था एक दफ़े','नीले फूल लाऊँ तेरे लिए','ख़त लिखूँ तेरे लिए','मैं ख़ुदा में मानूँ नहीं','पर माँगूँ दुआ तेरे लिए','तेरी बातें नासमझ-सी','फ़िर भी जायज़ लग रही हैं','तू परेशाँ कर रही है','फ़िर भी मासूम लग रही है','तेरे लिए मंदिर जाऊँ','तेरे नाम का दिया जलाऊँ','हँसता रहे तू चाहे जो हो','तेरी हँसी को नज़र ना लगे','काग़ज़ के फूल लाऊँ तेरे लिए','ख़त लिखूँ तेरे लिए','मैं ख़ुदा में मानूँ नहीं','पर माँगूँ दुआ तेरे लिए','वो-हो-हो, हाँ-हो','वो-हो-हो, हाँ-हो','वो-हो-हो','वो-हो-हो, हाँ-हो','वो-हो-हो, हाँ-हो','वो-हो-हो, हाँ-हो','वो-हो-हो','तेरे लिए हम बने हैं','तेरे लिए बदल रहे हैं','क्या मोहब्बत हो गई है?','तेरी ही तेरी बातें करें','तेरे लिए घर बनाऊँ','दीवार नीले रंग से सजाऊँ','पसंद है तुम्हें, मालूम है','तुमने बताया था एक दफ़े','देख, शायर बना तेरे लिए','नग़्मा लिखा तेरे लिए','मैं ख़ुदा में मानूँ क्यूँ?','तू ख़ुदा मेरे लिए'
  ];

  function mount(){
    const player=document.querySelector('.spotify-player');
    const audio=document.getElementById('audio');
    const title=document.getElementById('tt');
    if(!player||!audio||!title){setTimeout(mount,120);return}

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

    lyric.textContent=LINES[0];
    lyric.style.display='block';
    lyric.style.visibility='visible';
    lyric.style.opacity='1';

    let last=-1;
    const sync=()=>{
      const step=6;
      const index=Math.max(0,Math.min(LINES.length-1,Math.floor((audio.currentTime||0)/step)));
      if(index===last)return;
      last=index;
      lyric.classList.remove('lyric-pop');
      void lyric.offsetWidth;
      lyric.textContent=LINES[index];
      lyric.classList.add('lyric-pop');
    };
    ['timeupdate','seeked','loadedmetadata','play','pause'].forEach(ev=>audio.addEventListener(ev,sync));
    sync();
  }
  mount();
})();
