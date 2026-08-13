/* DermaSoZo GHL page loader — contact */
(function () {
  document.write('<style>body{display:none !important}</style>');
  fetch('https://betterbranding.github.io/dermasozo/pages/contact.html?v=2', { cache: 'no-cache' })
    .then(function (r) { return r.text(); })
    .then(function (html) {
      document.open();
      document.write(html);
      document.close();
    })
    .catch(function () {
      var s = document.querySelector('style');
      if (s) s.remove();
    });
})();
