(()=>{
  const mount=()=>{
    const old=document.querySelector('.tdp-hidden-dream-notes');
    if(!old || document.querySelector('.tdp-keepsake-desk-v70')) return !!old;

    old.classList.add('tdp-keepsake-replaced-v70');

    const section=document.createElement('section');
    section.className='tdp-keepsake-desk-v70';
    section.setAttribute('aria-label','Little futures keepsake desk');
    section.innerHTML=`
      <div class="tdp-kd-head">
        <div class="tdp-kd-kicker">little moments I wouldn’t mind finding someday</div>
        <h3>Open whichever one finds you…</h3>
        <p>Some memories are still waiting to happen.</p>
      </div>

      <div class="tdp-kd-surface">
        <div class="tdp-kd-grain" aria-hidden="true"></div>

        <article class="tdp-kd-item tdp-kd-concerts">
          <button class="tdp-kd-trigger" type="button" aria-expanded="false">
            <span class="tdp-kd-label">for the songs I’d save for us</span>
            <div class="tdp-ticket-stack" aria-hidden="true">
              <div class="tdp-ticket tdp-ticket-bts">
                <div class="tdp-ticket-side">BTS<small>ARMY</small></div>
                <div class="tdp-ticket-body"><b>PURPLE HOUR</b><small>ADMIT TWO · SOMEDAY</small><i>Seat: Right Beside You</i></div>
                <div class="tdp-ticket-portrait tdp-ticket-portrait-bts"><span></span><span></span><span></span></div>
                <div class="tdp-ticket-barcode"></div>
              </div>
              <div class="tdp-ticket tdp-ticket-arijit tdp-arijit-double-ticket" aria-label="Two Arijit Singh Ahmedabad J Block concert tickets">
                <div class="tdp-arijit-real-ticket tdp-arijit-real-ticket-back" aria-hidden="true">
                  <img class="tdp-ar-ticket-image" src="data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221000%22%20height%3D%22260%22%20viewBox%3D%220%200%201000%20260%22%3E%0A%3Cdefs%3E%0A%20%3ClinearGradient%20id%3D%22poster%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23d7e5ec%22%2F%3E%3Cstop%20offset%3D%22.48%22%20stop-color%3D%22%23718eaa%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23172c48%22%2F%3E%3C%2FlinearGradient%3E%0A%20%3ClinearGradient%20id%3D%22stub%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%220%22%3E%3Cstop%20stop-color%3D%22%23101e32%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23182c45%22%2F%3E%3C%2FlinearGradient%3E%0A%20%3ClinearGradient%20id%3D%22light%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23e9f3f8%22%20stop-opacity%3D%22.9%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%237896b1%22%20stop-opacity%3D%220%22%2F%3E%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3Crect%20width%3D%221000%22%20height%3D%22260%22%20rx%3D%227%22%20fill%3D%22%23f0e7d5%22%2F%3E%0A%3Crect%20x%3D%227%22%20y%3D%227%22%20width%3D%22606%22%20height%3D%22246%22%20rx%3D%224%22%20fill%3D%22url(%23poster)%22%2F%3E%0A%3Cpath%20d%3D%22M7%20190%20Q120%20110%20230%20176%20T430%20155%20T613%20174%20V253%20H7Z%22%20fill%3D%22%23263d59%22%20opacity%3D%22.8%22%2F%3E%0A%3Cpath%20d%3D%22M7%20215%20Q140%20160%20260%20207%20T460%20185%20T613%20203%20V253%20H7Z%22%20fill%3D%22%23101e32%22%20opacity%3D%22.72%22%2F%3E%0A%3Cpath%20d%3D%22M18%2020%20H603%20V135%20Q500%20112%20390%20140%20T180%20128%20T18%20151Z%22%20fill%3D%22url(%23light)%22%2F%3E%0A%3Ctext%20x%3D%2230%22%20y%3D%2248%22%20fill%3D%22%23142b45%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2215%22%20letter-spacing%3D%224%22%3EINDIA%20TOUR%20%C2%B7%20AHMEDABAD%3C%2Ftext%3E%0A%3Ctext%20x%3D%2230%22%20y%3D%2299%22%20fill%3D%22%23fffaf0%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2252%22%20font-weight%3D%22bold%22%20letter-spacing%3D%221%22%3EARIJIT%3C%2Ftext%3E%0A%3Ctext%20x%3D%2230%22%20y%3D%22151%22%20fill%3D%22%23fffaf0%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2252%22%20font-weight%3D%22bold%22%20letter-spacing%3D%221%22%3ESINGH%3C%2Ftext%3E%0A%3Ctext%20x%3D%2231%22%20y%3D%22228%22%20fill%3D%22%23f6ead8%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2213%22%20letter-spacing%3D%222%22%3ELIVE%20MUSIC%20%C2%B7%20BIGGER%20TOGETHER%3C%2Ftext%3E%0A%3Cpath%20d%3D%22M623%207%20V253%22%20stroke%3D%22%23f0e7d5%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%225%205%22%2F%3E%0A%3Crect%20x%3D%22633%22%20y%3D%227%22%20width%3D%22360%22%20height%3D%22246%22%20rx%3D%224%22%20fill%3D%22url(%23stub)%22%2F%3E%0A%3Ctext%20x%3D%22660%22%20y%3D%2238%22%20fill%3D%22%23a9c1d8%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2213%22%20letter-spacing%3D%223%22%3EBOOKING%20CONFIRMED%3C%2Ftext%3E%0A%3Ctext%20x%3D%22660%22%20y%3D%2275%22%20fill%3D%22%23fffaf0%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2227%22%20font-weight%3D%22bold%22%3EARIJIT%20SINGH%3C%2Ftext%3E%0A%3Cpath%20d%3D%22M660%2091%20H965%22%20stroke%3D%22%234b627b%22%20stroke-width%3D%221%22%2F%3E%0A%3Ctext%20x%3D%22660%22%20y%3D%22119%22%20fill%3D%22%23dbe6ef%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2214%22%3E09%20JAN%202027%20%C2%B7%206%3A00%20PM%20ONWARDS%3C%2Ftext%3E%0A%3Ctext%20x%3D%22660%22%20y%3D%22145%22%20fill%3D%22%23dbe6ef%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2213%22%3ENARENDRA%20MODI%20STADIUM%3C%2Ftext%3E%0A%3Ctext%20x%3D%22660%22%20y%3D%22164%22%20fill%3D%22%23dbe6ef%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2213%22%3EAHMEDABAD%3C%2Ftext%3E%0A%3Crect%20x%3D%22660%22%20y%3D%22183%22%20width%3D%22133%22%20height%3D%2239%22%20rx%3D%222%22%20fill%3D%22%23e7dfce%22%2F%3E%0A%3Ctext%20x%3D%22676%22%20y%3D%22209%22%20fill%3D%22%2317283c%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2220%22%20font-weight%3D%22bold%22%3EBLOCK%20J%3C%2Ftext%3E%0A%3Cg%20fill%3D%22%23f0e7d5%22%3E%3Crect%20x%3D%22825%22%20y%3D%22184%22%20width%3D%224%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22833%22%20y%3D%22184%22%20width%3D%222%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22839%22%20y%3D%22184%22%20width%3D%225%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22848%22%20y%3D%22184%22%20width%3D%222%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22854%22%20y%3D%22184%22%20width%3D%223%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22862%22%20y%3D%22184%22%20width%3D%226%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22872%22%20y%3D%22184%22%20width%3D%222%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22879%22%20y%3D%22184%22%20width%3D%224%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22887%22%20y%3D%22184%22%20width%3D%222%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22893%22%20y%3D%22184%22%20width%3D%226%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22904%22%20y%3D%22184%22%20width%3D%223%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22911%22%20y%3D%22184%22%20width%3D%222%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22918%22%20y%3D%22184%22%20width%3D%225%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22927%22%20y%3D%22184%22%20width%3D%222%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22933%22%20y%3D%22184%22%20width%3D%224%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22941%22%20y%3D%22184%22%20width%3D%222%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22948%22%20y%3D%22184%22%20width%3D%226%22%20height%3D%2239%22%2F%3E%3C%2Fg%3E%0A%3C%2Fsvg%3E" alt="" />
                  <div class="tdp-ar-ticket-art"><span>ARIJIT</span><b>SINGH</b><small>INDIA TOUR · AHMEDABAD</small></div>
                  <div class="tdp-ar-ticket-stub"><small>BOOKING CONFIRMED</small><b>ARIJIT SINGH</b><span>09 JAN 2027 · 6:00 PM ONWARDS</span><span>NARENDRA MODI STADIUM, AHMEDABAD</span><strong>BLOCK J</strong></div>
                </div>
                <div class="tdp-arijit-real-ticket tdp-arijit-real-ticket-front">
                  <img class="tdp-ar-ticket-image" src="data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221000%22%20height%3D%22260%22%20viewBox%3D%220%200%201000%20260%22%3E%0A%3Cdefs%3E%0A%20%3ClinearGradient%20id%3D%22poster%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23d7e5ec%22%2F%3E%3Cstop%20offset%3D%22.48%22%20stop-color%3D%22%23718eaa%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23172c48%22%2F%3E%3C%2FlinearGradient%3E%0A%20%3ClinearGradient%20id%3D%22stub%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%220%22%3E%3Cstop%20stop-color%3D%22%23101e32%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23182c45%22%2F%3E%3C%2FlinearGradient%3E%0A%20%3ClinearGradient%20id%3D%22light%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23e9f3f8%22%20stop-opacity%3D%22.9%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%237896b1%22%20stop-opacity%3D%220%22%2F%3E%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3Crect%20width%3D%221000%22%20height%3D%22260%22%20rx%3D%227%22%20fill%3D%22%23f0e7d5%22%2F%3E%0A%3Crect%20x%3D%227%22%20y%3D%227%22%20width%3D%22606%22%20height%3D%22246%22%20rx%3D%224%22%20fill%3D%22url(%23poster)%22%2F%3E%0A%3Cpath%20d%3D%22M7%20190%20Q120%20110%20230%20176%20T430%20155%20T613%20174%20V253%20H7Z%22%20fill%3D%22%23263d59%22%20opacity%3D%22.8%22%2F%3E%0A%3Cpath%20d%3D%22M7%20215%20Q140%20160%20260%20207%20T460%20185%20T613%20203%20V253%20H7Z%22%20fill%3D%22%23101e32%22%20opacity%3D%22.72%22%2F%3E%0A%3Cpath%20d%3D%22M18%2020%20H603%20V135%20Q500%20112%20390%20140%20T180%20128%20T18%20151Z%22%20fill%3D%22url(%23light)%22%2F%3E%0A%3Ctext%20x%3D%2230%22%20y%3D%2248%22%20fill%3D%22%23142b45%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2215%22%20letter-spacing%3D%224%22%3EINDIA%20TOUR%20%C2%B7%20AHMEDABAD%3C%2Ftext%3E%0A%3Ctext%20x%3D%2230%22%20y%3D%2299%22%20fill%3D%22%23fffaf0%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2252%22%20font-weight%3D%22bold%22%20letter-spacing%3D%221%22%3EARIJIT%3C%2Ftext%3E%0A%3Ctext%20x%3D%2230%22%20y%3D%22151%22%20fill%3D%22%23fffaf0%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2252%22%20font-weight%3D%22bold%22%20letter-spacing%3D%221%22%3ESINGH%3C%2Ftext%3E%0A%3Ctext%20x%3D%2231%22%20y%3D%22228%22%20fill%3D%22%23f6ead8%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2213%22%20letter-spacing%3D%222%22%3ELIVE%20MUSIC%20%C2%B7%20BIGGER%20TOGETHER%3C%2Ftext%3E%0A%3Cpath%20d%3D%22M623%207%20V253%22%20stroke%3D%22%23f0e7d5%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%225%205%22%2F%3E%0A%3Crect%20x%3D%22633%22%20y%3D%227%22%20width%3D%22360%22%20height%3D%22246%22%20rx%3D%224%22%20fill%3D%22url(%23stub)%22%2F%3E%0A%3Ctext%20x%3D%22660%22%20y%3D%2238%22%20fill%3D%22%23a9c1d8%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2213%22%20letter-spacing%3D%223%22%3EBOOKING%20CONFIRMED%3C%2Ftext%3E%0A%3Ctext%20x%3D%22660%22%20y%3D%2275%22%20fill%3D%22%23fffaf0%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2227%22%20font-weight%3D%22bold%22%3EARIJIT%20SINGH%3C%2Ftext%3E%0A%3Cpath%20d%3D%22M660%2091%20H965%22%20stroke%3D%22%234b627b%22%20stroke-width%3D%221%22%2F%3E%0A%3Ctext%20x%3D%22660%22%20y%3D%22119%22%20fill%3D%22%23dbe6ef%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2214%22%3E09%20JAN%202027%20%C2%B7%206%3A00%20PM%20ONWARDS%3C%2Ftext%3E%0A%3Ctext%20x%3D%22660%22%20y%3D%22145%22%20fill%3D%22%23dbe6ef%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2213%22%3ENARENDRA%20MODI%20STADIUM%3C%2Ftext%3E%0A%3Ctext%20x%3D%22660%22%20y%3D%22164%22%20fill%3D%22%23dbe6ef%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2213%22%3EAHMEDABAD%3C%2Ftext%3E%0A%3Crect%20x%3D%22660%22%20y%3D%22183%22%20width%3D%22133%22%20height%3D%2239%22%20rx%3D%222%22%20fill%3D%22%23e7dfce%22%2F%3E%0A%3Ctext%20x%3D%22676%22%20y%3D%22209%22%20fill%3D%22%2317283c%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2220%22%20font-weight%3D%22bold%22%3EBLOCK%20J%3C%2Ftext%3E%0A%3Cg%20fill%3D%22%23f0e7d5%22%3E%3Crect%20x%3D%22825%22%20y%3D%22184%22%20width%3D%224%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22833%22%20y%3D%22184%22%20width%3D%222%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22839%22%20y%3D%22184%22%20width%3D%225%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22848%22%20y%3D%22184%22%20width%3D%222%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22854%22%20y%3D%22184%22%20width%3D%223%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22862%22%20y%3D%22184%22%20width%3D%226%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22872%22%20y%3D%22184%22%20width%3D%222%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22879%22%20y%3D%22184%22%20width%3D%224%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22887%22%20y%3D%22184%22%20width%3D%222%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22893%22%20y%3D%22184%22%20width%3D%226%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22904%22%20y%3D%22184%22%20width%3D%223%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22911%22%20y%3D%22184%22%20width%3D%222%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22918%22%20y%3D%22184%22%20width%3D%225%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22927%22%20y%3D%22184%22%20width%3D%222%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22933%22%20y%3D%22184%22%20width%3D%224%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22941%22%20y%3D%22184%22%20width%3D%222%22%20height%3D%2239%22%2F%3E%3Crect%20x%3D%22948%22%20y%3D%22184%22%20width%3D%226%22%20height%3D%2239%22%2F%3E%3C%2Fg%3E%0A%3C%2Fsvg%3E" alt="Arijit Singh Ahmedabad concert ticket, Block J" />
                  <div class="tdp-ar-ticket-art"><span>ARIJIT</span><b>SINGH</b><small>INDIA TOUR · AHMEDABAD</small><em>LIVE MUSIC · BIGGER TOGETHER</em></div>
                  <div class="tdp-ar-ticket-stub"><small>BOOKING CONFIRMED</small><b>ARIJIT SINGH</b><span>09 JAN 2027 · 6:00 PM ONWARDS</span><span>NARENDRA MODI STADIUM, AHMEDABAD</span><strong>▣ BLOCK J</strong></div>
                </div>
              </div>
              <div class="tdp-ticket tdp-ticket-darshan">
                <div class="tdp-ticket-side">DR<small>LIVE</small></div>
                <div class="tdp-ticket-body"><b>DARSHAN RAVAL</b><small>BLUE LIGHTS · SOMEDAY</small><i>Gate: One More Song</i></div>
                <div class="tdp-ticket-portrait tdp-ticket-portrait-solo"><span></span></div>
                <div class="tdp-ticket-barcode"></div>
              </div>
            </div>
            <span class="tdp-kd-hint">tap the tickets</span>
          </button>
        </article>

        <article class="tdp-kd-item tdp-kd-sunset">
          <button class="tdp-kd-trigger" type="button" aria-expanded="false">
            <span class="tdp-kd-label">for the quiet sky and our favourite songs</span>
            <div class="tdp-polaroid-stack" aria-hidden="true">
              <div class="tdp-polaroid tdp-polaroid-back">
                <div class="tdp-polaroid-backscene"></div>
                <div class="tdp-polaroid-caption">another someday</div>
              </div>
              <div class="tdp-polaroid tdp-polaroid-front">
                <div class="tdp-polaroid-sunset">
                  <div class="tdp-polaroid-sun"></div>
                  <div class="tdp-polaroid-hill"></div>
                  <div class="tdp-polaroid-water"></div>
                </div>
                <div class="tdp-polaroid-caption"><b>one slow golden hour</b><small>our favourite songs</small></div>
              </div>
            </div>
            <span class="tdp-kd-reveal-copy">Maybe someday we’ll watch the sky change colours and pretend we’re not getting sentimental about it.</span>
            <span class="tdp-kd-hint">tap the polaroids</span>
          </button>
        </article>

        <article class="tdp-kd-item tdp-kd-travel">
          <button class="tdp-kd-trigger" type="button" aria-expanded="false">
            <span class="tdp-kd-label">for places I’d love to collect with you</span>
            <span class="tdp-travel-tag" aria-hidden="true">
              <span class="tdp-travel-string"></span>
              <span class="tdp-travel-face">
                <span class="tdp-travel-title">BEACH / MOUNTAINS</span>
                <span class="tdp-travel-mini tdp-travel-beach"></span>
                <span class="tdp-travel-mini tdp-travel-mountain"></span>
                <span class="tdp-travel-caption">you choose</span>
              </span>
            </span>
            <span class="tdp-kd-reveal-copy">Some places already look better with you in them.</span>
            <span class="tdp-kd-hint">flip the travel tag</span>
          </button>
        </article>

        <article class="tdp-kd-item tdp-kd-navratri">
          <button class="tdp-kd-trigger" type="button" aria-expanded="false">
            <span class="tdp-kd-label">for one night of garba, lights, and maybe us somewhere in between</span>
            <span class="tdp-garba-pass" aria-hidden="true">
              <span class="tdp-garba-hole"></span>
              <span class="tdp-garba-lights"></span>
              <span class="tdp-garba-title">GARBA NIGHT</span>
              <span class="tdp-garba-sub">ADMIT TWO · SOMEDAY</span>
              <span class="tdp-garba-dancers">◜ ◝ ◜ ◝</span>
            </span>
            <span class="tdp-kd-reveal-copy">Traditional clothes, tired feet, loud music, and one very Gujarat memory.</span><span class="tdp-kd-gujarati">હું, તું, નવરાત્રી અને એ ઝગમગતી રાત…</span>
            <span class="tdp-kd-hint">tap the pass</span>
          </button>
        </article>
      </div>

      <div class="tdp-kd-footer">Tap any keepsake again to put it back.</div>
    `;

    old.insertAdjacentElement('afterend',section);

    const surface=section.querySelector('.tdp-kd-surface');
    const footer=section.querySelector('.tdp-kd-footer');
    const master=document.createElement('button');
    master.type='button';
    master.className='tdp-kd-master-toggle';
    master.setAttribute('aria-expanded','false');
    master.innerHTML='<span class="tdp-kd-master-icon">✦</span><span class="tdp-kd-master-copy"><b>Little Futures</b><small>tap to unfold the keepsakes</small></span><span class="tdp-kd-master-arrow">⌄</span>';

    const content=document.createElement('div');
    content.className='tdp-kd-content';
    const contentInner=document.createElement('div');
    contentInner.className='tdp-kd-content-inner';
    content.appendChild(contentInner);
    contentInner.appendChild(surface);
    contentInner.appendChild(footer);
    section.querySelector('.tdp-kd-head').insertAdjacentElement('afterend',master);
    master.insertAdjacentElement('afterend',content);

    const covers=[
      ['concerts','Concerts','hoping you’d save me a spot beside you'],
      ['sunset','Golden hour','one quiet sky and a playlist worth pausing for'],
      ['travel','Somewhere someday','a place to discover, a story to bring back'],
      ['navratri','Navratri night','music, lights, garba, and one memorable evening']
    ];
    section.querySelectorAll('.tdp-kd-item').forEach((item,index)=>{
      const btn=item.querySelector('.tdp-kd-trigger');
      const cover=document.createElement('span');
      cover.className='tdp-kd-unbox-cover tdp-kd-unbox-'+covers[index][0];
      cover.innerHTML=
        '<span class="tdp-kd-3d-object tdp-kd-3d-'+covers[index][0]+'" aria-hidden="true">'+
          '<span class="tdp-kd-3d-face"></span><span class="tdp-kd-3d-detail"></span><span class="tdp-kd-3d-shadow"></span>'+
        '</span>'+
        '<b>'+covers[index][1]+'</b>'+
        '<small>'+covers[index][2]+'</small>'+
        '<em>tap to reveal</em>';
      btn.insertBefore(cover,btn.firstChild);
    });

    const resetKeepsakes=()=>{
      section.querySelectorAll('.tdp-kd-item').forEach((item)=>{
        item.classList.remove('is-open');
        const btn=item.querySelector('.tdp-kd-trigger');
        if(btn) btn.setAttribute('aria-expanded','false');
      });
      const concertHint=section.querySelector('.tdp-kd-concerts .tdp-kd-hint');
      const polaroidHint=section.querySelector('.tdp-kd-sunset .tdp-kd-hint');
      const travelHint=section.querySelector('.tdp-kd-travel .tdp-kd-hint');
      const navHint=section.querySelector('.tdp-kd-navratri .tdp-kd-hint');
      if(concertHint) concertHint.textContent='tap the tickets';
      if(polaroidHint) polaroidHint.textContent='tap the polaroids';
      if(travelHint) travelHint.textContent='tap the travel tag';
      if(navHint) navHint.textContent='tap the pass';
    };

    master.addEventListener('click',()=>{
      const open=section.classList.toggle('is-section-open');
      master.setAttribute('aria-expanded',open?'true':'false');
      const small=master.querySelector('small');
      if(small) small.textContent=open?'tap to fold the keepsakes away':'tap to unfold the keepsakes';
      if(!open) resetKeepsakes();
      if(window.tdpTrack){
        window.tdpTrack(open?'little_futures_open':'little_futures_close',{section:'keepsake_desk'});
      }
    });

    const concertBtn=section.querySelector('.tdp-kd-concerts .tdp-kd-trigger');
    const toggleConcert=()=>{
      const item=section.querySelector('.tdp-kd-concerts');
      const open=item.classList.toggle('is-open');
      concertBtn.setAttribute('aria-expanded',open?'true':'false');
      const hint=concertBtn.querySelector('.tdp-kd-hint');
      if(hint) hint.textContent=open?'tap again to hide them':'tap the tickets';
      if(window.tdpTrack){
        window.tdpTrack(open?'keepsake_open':'keepsake_close',{keepsake:1,type:'concert_tickets'});
      }
    };
    concertBtn.addEventListener('click',toggleConcert);

    const polaroidBtn=section.querySelector('.tdp-kd-sunset .tdp-kd-trigger');
    const togglePolaroid=()=>{
      const item=section.querySelector('.tdp-kd-sunset');
      const open=item.classList.toggle('is-open');
      polaroidBtn.setAttribute('aria-expanded',open?'true':'false');
      const hint=polaroidBtn.querySelector('.tdp-kd-hint');
      if(hint) hint.textContent=open?'tap again to hide them':'tap the polaroids';
      if(window.tdpTrack){
        window.tdpTrack(open?'keepsake_open':'keepsake_close',{keepsake:2,type:'sunset_polaroids'});
      }
    };
    polaroidBtn.addEventListener('click',togglePolaroid);

    section.querySelectorAll('.tdp-kd-item:not(.tdp-kd-concerts):not(.tdp-kd-sunset) .tdp-kd-trigger').forEach((btn,index)=>{
      btn.addEventListener('click',()=>{
        const item=btn.closest('.tdp-kd-item');
        const open=item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded',open?'true':'false');
        const hint=btn.querySelector('.tdp-kd-hint');
        if(hint){
          const isTravel=item.classList.contains('tdp-kd-travel');
          hint.textContent=open?'tap again to hide it':(isTravel?'tap the travel tag':'tap the pass');
        }
        if(window.tdpTrack){
          window.tdpTrack(open?'keepsake_open':'keepsake_close',{keepsake:index+3});
        }
      });
    });

    return true;
  };

  const start=()=>{
    if(mount()) return;
    const mo=new MutationObserver(()=>{ if(mount()) mo.disconnect(); });
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>mo.disconnect(),15000);
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();