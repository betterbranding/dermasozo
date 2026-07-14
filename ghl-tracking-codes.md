# DermaSoZo — GHL Page Tracking Codes (v2 — Jul 2026)

The website pages are now **fully self-contained** (all CSS, JS, fonts, and animations live inside each HTML file). That means the GHL loader is one tiny snippet: it fetches the latest page from GitHub via jsDelivr and replaces the entire document.

**How updates work:** push changes to `betterbranding/dermasozo` on GitHub → the GHL page updates automatically. No need to touch GHL again.

> **Cache note:** jsDelivr may cache up to 12–24h. To force-refresh after a push, visit:
> `https://purge.jsdelivr.net/gh/betterbranding/dermasozo@main/pages/home.html`

---

## Home Page — paste into GHL page Settings → Custom Code → **Header Code**

```html
<script>
fetch('https://cdn.jsdelivr.net/gh/betterbranding/dermasozo@main/pages/home.html')
  .then(function(r){ return r.text(); })
  .then(function(html){
    document.open();
    document.write(html);
    document.close();
  });
</script>
<style>body{display:none}</style>
```

That's it. The `<style>` line just hides GHL's default content during the split-second load.

---

## Future pages
When additional pages are built (shop, professional, about, etc.), use the same snippet and change only the filename:

`.../dermasozo@main/pages/shop.html`
`.../dermasozo@main/pages/professional.html`
etc.

---

## Live previews (GitHub Pages)
- Home: https://betterbranding.github.io/dermasozo/pages/home.html
