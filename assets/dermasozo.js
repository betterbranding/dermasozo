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
    t.addEventListener('click', function(){ m.classList.toggle('open'); });
    m.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ m.classList.remove('open'); }); });
  }
  // reveal on scroll
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .14, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
})();
