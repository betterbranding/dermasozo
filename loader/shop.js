/* DermaSoZo GHL page loader v3 (fast) — Shop */
(function () {
  var GH = 'https://betterbranding.github.io/dermasozo';
  /* 1. critical request first: start fetching the page at parse time, browser cache allowed */
  var page = fetch(GH + '/pages/shop.html?v=5').then(function (r) { return r.text(); });
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
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    '<link rel="preload" as="image" href="' + GH + '/images/duo.jpg">';
  document.write(head);
  /* 4. swap the document the instant the HTML arrives (also aborts GHL's own asset load) */
  page.then(function (html) {
    document.open();
    document.write(html);
    document.close();
  }).catch(function () {
    var s = document.getElementById('dszSplash');
    if (s) s.remove();
  });
})();
