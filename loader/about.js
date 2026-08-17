/* DermaSoZo GHL page loader v4 (instant swap) — About */
(function () {
  var GH = 'https://betterbranding.github.io/dermasozo';
  /* 1. critical request first: start fetching the page at parse time, browser cache allowed */
  var page = fetch(GH + '/pages/about.html?v=5').then(function (r) { return r.text(); });
  /* 2. instant branded splash: cobalt field, white logo, copper spinner (no blank white) */
  var head = '<style id="dszSplash">html{background:#13224E!important}body{display:none!important}' +
    'html::before{content:"";position:fixed;inset:0;z-index:2147483646;background-color:#13224E;' +
    'background-image:url(' + GH + '/logo/dermasozo-logo-horizontal-reversed.svg);background-repeat:no-repeat;' +
    'background-position:center calc(50% - 26px);background-size:min(220px,58vw) auto}' +
    'html::after{content:"";position:fixed;top:calc(50% + 30px);left:50%;width:26px;height:26px;margin-left:-13px;' +
    'border-radius:50%;border:2px solid rgba(255,255,255,.2);border-top-color:#E1BFA5;' +
    'animation:dszspin .7s linear infinite;z-index:2147483647}' +
    '@keyframes dszspin{to{transform:rotate(360deg)}}' +
    '@media (prefers-reduced-motion:reduce){html::after{animation:none}}</style>' +
    /* 3. warm the connections the page needs the moment it lands */
    '<link rel="preconnect" href="https://fonts.googleapis.com">' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
  document.write(head);
  /* 4. re-create scripts after surgery so the browser executes them */
  function arm() {
    var olds = document.querySelectorAll('script'), i, j, s, n;
    for (i = 0; i < olds.length; i++) {
      s = olds[i]; n = document.createElement('script');
      for (j = 0; j < s.attributes.length; j++) n.setAttribute(s.attributes[j].name, s.attributes[j].value);
      n.async = false;
      if (!s.src) n.text = s.text || '';
      s.parentNode.replaceChild(n, s);
    }
  }
  /* 5. swap the DOM the instant the HTML arrives. document.open() gets deferred by the
     browser until GHL's own page finishes loading, so we halt GHL (window.stop) and
     transplant the new document directly: render is immediate, and GHL's remaining
     asset queue is cancelled instead of competing for bandwidth. */
  page.then(function (html) {
    try {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      try { window.stop(); } catch (e0) {}
      document.replaceChild(document.adoptNode(doc.documentElement), document.documentElement);
      arm();
      window.scrollTo(0, 0);
    } catch (e) {
      /* fallback: classic full-document rewrite (renders after GHL finishes loading) */
      document.open();
      document.write(html);
      document.close();
    }
  }).catch(function () {
    var s = document.getElementById('dszSplash');
    if (s) s.remove();
  });
})();
