/* DermaSoZo shared behaviors v2 */
(function(){
  // Internal link resolver: on GitHub Pages QC, rewrite root paths to pages/*.html
  if (location.hostname.indexOf('github.io') > -1) {
    document.querySelectorAll('a[data-page]').forEach(function(a){
      a.href = 'https://betterbranding.github.io/dermasozo/pages/' + a.getAttribute('data-page') + '.html';
    });
  }
  var nav = document.getElementById('nav'),
      toTop = document.getElementById('toTop'),
      prog = document.getElementById('progress');
  function onScroll(){
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.width = (h > 0 ? (y / h * 100) : 0) + '%';
    if (nav) nav.classList.toggle('scrolled', y > 40);
    if (toTop) toTop.classList.toggle('show', y > 700);
    // parallax hooks
    document.querySelectorAll('[data-plx]').forEach(function(el){
      var r = el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        var sp = parseFloat(el.getAttribute('data-plx')) || 0.1;
        var off = (r.top + r.height / 2 - window.innerHeight / 2) * sp;
        el.style.transform = 'scale(1.12) translateY(' + off + 'px)';
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (toTop) toTop.addEventListener('click', function(){ window.scrollTo({ top: 0, behavior: 'smooth' }); });
  var t = document.getElementById('navToggle'), m = document.getElementById('navMenu');
  if (t && m) {
    if (!document.getElementById('dszNavFix')) {
      var nf = document.createElement('style'); nf.id = 'dszNavFix';
      nf.textContent = '@media(max-width:960px){#navToggle{padding:8px 12px;margin:-8px -12px;line-height:1;min-width:44px;min-height:44px}#navMenu{max-height:calc(100vh - 120px);overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:901}#navMenu a{display:block;padding:6px 2px;font-size:16px}}';
      document.head.appendChild(nf);
    }
    var setNav = function(open){
      m.classList.toggle('open', open);
      t.textContent = open ? '\u2715' : '\u2630';
      t.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    t.setAttribute('aria-expanded', 'false');
    t.addEventListener('click', function(e){ e.stopPropagation(); setNav(!m.classList.contains('open')); });
    m.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ setNav(false); }); });
    document.addEventListener('click', function(e){
      if (m.classList.contains('open') && !m.contains(e.target) && e.target !== t) setNav(false);
    });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') setNav(false); });
  }
  // reveal on scroll
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .14, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
})();

/* ---------- Before/After results carousel (added 2026-08-24) ---------- */
(function(){
  var mount = document.querySelector('[data-dsz-ba]');
  if (!mount) return;
  if (!document.getElementById('dszBAStyle')) {
    var st = document.createElement('style'); st.id = 'dszBAStyle';
    st.textContent = "/* ---------- before/after results carousel (added 2026-08-24) ---------- */\n.ba-sec{background:linear-gradient(180deg,var(--paper) 0%,var(--sky-soft) 52%,var(--paper) 100%)}\n.ba-shell{position:relative}\n.ba-track{display:flex;gap:22px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 4px 18px;scrollbar-width:none;-ms-overflow-style:none;cursor:grab}\n.ba-track::-webkit-scrollbar{display:none}\n.ba-track.drag{cursor:grabbing;scroll-snap-type:none}\n.ba-card{flex:0 0 min(620px,88vw);scroll-snap-align:center;background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--r-lg);box-shadow:var(--shadow-soft);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);overflow:hidden;margin:0}\n.ba-imgwrap{position:relative}\n.ba-imgwrap img{width:100%;aspect-ratio:4/3;object-fit:cover;user-select:none;-webkit-user-drag:none}\n.ba-chip{position:absolute;top:14px;padding:5px 13px;border-radius:var(--r-pill);font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#fff;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}\n.ba-chip-b{left:14px;background:rgba(19,34,78,.62)}\n.ba-chip-a{left:calc(50% + 14px);background:rgba(184,117,81,.88)}\n.ba-card figcaption{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:16px 22px 18px}\n.ba-card figcaption strong{font-family:var(--serif);font-weight:400;font-size:20px;color:var(--cobalt)}\n.ba-card figcaption span{font-size:13.5px;color:var(--muted);letter-spacing:.04em;text-align:right}\n.ba-nav{position:absolute;top:50%;transform:translateY(-50%);z-index:5;width:46px;height:46px;border-radius:50%;border:1px solid var(--glass-border);background:rgba(247,250,252,.82);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);color:var(--cobalt);font-size:19px;cursor:pointer;box-shadow:var(--shadow-soft);transition:all .3s;display:flex;align-items:center;justify-content:center}\n.ba-nav:hover{background:var(--cobalt);color:#fff;transform:translateY(-50%) scale(1.06)}\n.ba-prev{left:-8px}.ba-next{right:-8px}\n.ba-dots{display:flex;gap:8px;justify-content:center;margin-top:8px}\n.ba-dots button{width:8px;height:8px;border-radius:50%;border:0;background:rgba(27,47,102,.22);cursor:pointer;transition:all .3s;padding:0}\n.ba-dots button.on{width:26px;border-radius:var(--r-pill);background:var(--copper)}\n.ba-note{text-align:center;font-size:12.5px;color:var(--muted);margin-top:16px;letter-spacing:.03em}\n@media(max-width:720px){.ba-nav{display:none}.ba-card{flex-basis:86vw}}";
    document.head.appendChild(st);
  }
  var IMG = 'https://betterbranding.github.io/dermasozo/images/';
  var CARDS = [
    { img: 'ba-w-postproc.jpg?v=2', tag: 'Post-procedure redness', area: 'Face, after laser',         alt: 'Before and after comparison of post-procedure facial redness on a woman, calmed and even-toned' },
    { img: 'ba-m-postproc.jpg?v=2', tag: 'Post-procedure redness', area: 'Face, after microneedling', alt: 'Before and after comparison of post-procedure facial redness on a man, calmed and even-toned' },
    { img: 'ba-w-postproc2.jpg',    tag: 'Post-procedure redness', area: 'Face, after chemical peel', alt: 'Before and after comparison of post-procedure facial redness on a woman, calmed and even-toned' },
    { img: 'ba-m-postproc2.jpg',    tag: 'Post-procedure redness', area: 'Face, after treatment',     alt: 'Before and after comparison of post-procedure facial redness on a man, calmed and even-toned' }
  ];
  var cardsHtml = CARDS.map(function(c){
    return '<figure class="ba-card"><div class="ba-imgwrap">'
      + '<img src="' + IMG + c.img + '" alt="' + c.alt + '" loading="lazy" draggable="false">'
      + '<span class="ba-chip ba-chip-b">Before</span><span class="ba-chip ba-chip-a">After</span>'
      + '</div><figcaption><strong>' + c.tag + '</strong><span>' + c.area + '</span></figcaption></figure>';
  }).join('');
  mount.innerHTML = '<section class="ba-sec" id="results" aria-label="Before and after gallery"><div class="wrap">'
    + '<div class="sec-head rv"><span class="eyebrow">Before and After</span>'
    + '<h2>Recovery you can <em>see</em></h2>'
    + '<p>Swipe through the kind of post-procedure recovery this system was made for.</p></div>'
    + '<div class="ba-shell rv"><button class="ba-nav ba-prev" aria-label="Previous">&#8592;</button>'
    + '<div class="ba-track">' + cardsHtml + '</div>'
    + '<button class="ba-nav ba-next" aria-label="Next">&#8594;</button></div>'
    + '<div class="ba-dots"></div>'
    + '<p class="ba-note">Illustrative depictions. Individual results vary.</p>'
    + '</div></section>';

  var track = mount.querySelector('.ba-track'),
      dotsBox = mount.querySelector('.ba-dots'),
      cards = mount.querySelectorAll('.ba-card');
  function step(){ return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0].offsetWidth; }
  function idx(){ return Math.max(0, Math.min(cards.length - 1, Math.round(track.scrollLeft / step()))); }
  function goTo(i){ track.scrollTo({ left: i * step(), behavior: 'smooth' }); }
  CARDS.forEach(function(_, i){
    var b = document.createElement('button');
    b.setAttribute('aria-label', 'Go to comparison ' + (i + 1));
    b.addEventListener('click', function(){ goTo(i); rest(); });
    dotsBox.appendChild(b);
  });
  var dots = dotsBox.querySelectorAll('button');
  function paint(){ var i = idx(); dots.forEach(function(d, k){ d.classList.toggle('on', k === i); }); }
  track.addEventListener('scroll', paint, { passive: true }); paint();
  mount.querySelector('.ba-prev').addEventListener('click', function(){ goTo(Math.max(0, idx() - 1)); rest(); });
  mount.querySelector('.ba-next').addEventListener('click', function(){ goTo(Math.min(cards.length - 1, idx() + 1)); rest(); });

  var down = false, sx = 0, sl = 0, moved = false;
  track.addEventListener('pointerdown', function(e){
    if (e.pointerType !== 'mouse') return;
    down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; track.classList.add('drag');
  });
  window.addEventListener('pointermove', function(e){
    if (!down) return;
    if (Math.abs(e.clientX - sx) > 4) moved = true;
    track.scrollLeft = sl - (e.clientX - sx);
  });
  window.addEventListener('pointerup', function(){
    if (!down) return;
    down = false; track.classList.remove('drag');
    goTo(idx()); rest();
  });
  track.addEventListener('click', function(e){ if (moved) e.preventDefault(); }, true);

  var timer = null, resting = null;
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function play(){ if (still || timer) return; timer = setInterval(function(){ var i = idx(); goTo(i >= cards.length - 1 ? 0 : i + 1); }, 5200); }
  function stop(){ if (timer) { clearInterval(timer); timer = null; } }
  function rest(){ stop(); if (resting) clearTimeout(resting); resting = setTimeout(play, 9000); }
  var vis = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { play(); } else { stop(); } }); }, { threshold: .25 });
  vis.observe(track);
  track.addEventListener('pointerenter', stop);
  track.addEventListener('pointerleave', function(){ if (!down) play(); });
  track.addEventListener('touchstart', function(){ rest(); }, { passive: true });

  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .14, rootMargin: '0px 0px -40px 0px' });
  mount.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
})();
