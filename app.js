/* ============================================================
   Tobiloba Adedeji site engine
   Loads data/site.yml, renders the active page, handles theme,
   nav, mobile menu and scroll reveals.
   ============================================================ */
(function () {
  document.documentElement.classList.add('js');

  /* ---------- icon sprite ---------- */
  var SPRITE = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
    '<symbol id="i-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></symbol>' +
    '<symbol id="i-ext" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M14 5h5v5M19 5l-8 8M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/></symbol>' +
    '<symbol id="i-play" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></symbol>' +
    '<symbol id="i-chart" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M4 20V11M9 20V4M14 20v-6M19 20v-9M3 20h18"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" d="M3 6.5h18v11H3zM3.5 7l8.5 6 8.5-6"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/></symbol>' +
    '<symbol id="i-whatsapp" viewBox="0 0 24 24"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.45-4.44 9.88-9.89 9.88M20.46 3.49A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.49-8.42"/></symbol>' +
    '<symbol id="i-linkedin" viewBox="0 0 24 24"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></symbol>' +
    '<symbol id="i-x" viewBox="0 0 24 24"><path fill="currentColor" d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24H16.17l-5.21-6.82L4.99 21.75H1.68l7.73-8.84L1.25 2.25H8.08l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/></symbol>' +
    '<symbol id="i-substack" viewBox="0 0 24 24"><path fill="currentColor" d="M22.54 8.24H1.46V5.41h21.08v2.83zM1.46 10.81V24L12 18.11 22.54 24V10.81H1.46zM22.54 0H1.46v2.84h21.08V0z"/></symbol>' +
    '<symbol id="i-github" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0024 12.5C24 5.87 18.63.5 12 .5z"/></symbol>' +
    '<symbol id="i-spotify" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14C9.6 9.9 15 10.56 18.72 12.84c.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/></symbol>' +
    '<symbol id="i-youtube" viewBox="0 0 24 24"><path fill="currentColor" d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 00.5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 002.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 002.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></symbol>' +
    '<symbol id="i-tiktok" viewBox="0 0 24 24"><path fill="currentColor" d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></symbol>' +
    '<symbol id="i-instagram" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></symbol>' +
    '</svg>';
  var sd = document.createElement('div'); sd.innerHTML = SPRITE; document.body.insertBefore(sd.firstChild, document.body.firstChild);

  /* ---------- theme ---------- */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) {}
  window.__toggleTheme = function () {
    var cur = root.getAttribute('data-theme');
    if (!cur) cur = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  };

  /* ---------- helpers ---------- */
  function q(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function ico(id) { return '<svg><use href="#' + id + '"/></svg>'; }
  function has(v) { return v && String(v).trim() !== ''; }

  /* ---------- nav / menu / reveal (wire after DOM ready) ---------- */
  function wireChrome() {
    var nav = q('nav');
    if (nav) {
      var onScroll = function () { nav.classList.toggle('solid', window.scrollY > 30); };
      onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    }
    var burger = q('hamburger'), mm = q('mm');
    if (burger && mm) {
      burger.addEventListener('click', function () { mm.classList.toggle('open'); });
      mm.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { mm.classList.remove('open'); }); });
    }
    document.querySelectorAll('.theme-toggle').forEach(function (b) {
      b.addEventListener('click', function () { window.__toggleTheme(); });
    });
  }
  function wireReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
    // Safety nets: never leave content hidden if the observer misfires (some
    // mobile browsers don't fire for elements already in view at load).
    function revealInView() {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (e) {
        if (e.getBoundingClientRect().top < window.innerHeight * 1.15) e.classList.add('in');
      });
    }
    setTimeout(revealInView, 400);
    window.addEventListener('load', function () { setTimeout(revealInView, 200); });
    // Absolute fallback: after 2.5s, show everything regardless.
    setTimeout(function () { els.forEach(function (e) { e.classList.add('in'); }); }, 2500);
  }

  /* ---------- social buttons (only render filled links) ---------- */
  function socialBtns(id, cls) {
    var out = '';
    function b(url, icon, label) { if (has(url)) out += '<a class="' + cls + '" href="' + esc(url) + '" target="_blank" rel="noopener">' + ico(icon) + ' ' + label + '</a>'; }
    var i = id;
    b(i.linkedin, 'i-linkedin', 'LinkedIn');
    b(i.twitter, 'i-x', 'X');
    b(i.substack, 'i-substack', 'Substack');
    b(i.github, 'i-github', 'GitHub');
    return out;
  }
  function musicBtns(n, cls) {
    var out = '';
    function b(url, icon, label, extra) { if (has(url)) out += '<a class="' + cls + (extra || '') + '" href="' + esc(url) + '" target="_blank" rel="noopener">' + ico(icon) + ' ' + label + '</a>'; }
    b(n.spotify, 'i-spotify', 'Spotify');
    b(n.youtube, 'i-youtube', 'YouTube');
    b(n.tiktok, 'i-tiktok', 'TikTok');
    b(n.instagram, 'i-instagram', 'Instagram');
    return out;
  }

  /* ---------- renderers ---------- */
  function renderHome(d) {
    var id = d.identity;
    if (q('land-intro')) q('land-intro').innerHTML = esc(id.short_intro);
    if (q('door-work-line')) q('door-work-line').textContent = id.door_work || '';
    if (q('door-music-line')) q('door-music-line').textContent = id.door_music || '';
    if (q('land-links')) q('land-links').innerHTML =
      '<a href="mailto:' + esc(id.email) + '">' + esc(id.email) + '</a>' +
      (has(id.linkedin) ? '<a href="' + esc(id.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' : '') +
      '<a href="' + esc(id.spotify || d.numa9.spotify) + '" target="_blank" rel="noopener">Numa.9 on Spotify</a>';
  }

  function renderWork(d) {
    var id = d.identity, w = d.work;
    q('work-hero').innerHTML =
      '<div class="reveal">' +
        '<a class="back" href="index.html">' + ico('i-arrow') + ' Home</a>' +
        (id.available !== false ? '<div class="pill"><span class="dot"></span> Open to work &amp; collaboration</div>' : '') +
        '<h1>' + esc(w.headline) + '</h1>' +
        '<p class="lede">' + esc(w.tagline) + '</p>' +
        '<div class="subhero-cta">' +
          '<a class="btn btn-solid" href="#contact">Get in touch</a>' +
          '<a class="btn btn-ghost" href="numa9.html">Visit Numa.9 ' + ico('i-arrow') + '</a>' +
        '</div>' +
      '</div>' +
      '<div class="subhero-portrait reveal d1"><img src="' + esc(id.photo) + '" alt="' + esc(id.name) + '"></div>';

    q('work-about').innerHTML = '<div class="prose reveal"><p>' + esc(w.bio_1) + '</p><p>' + esc(w.bio_2) + '</p></div>' +
      '<div class="chips reveal d1" style="margin-top:26px">' + (w.domains || []).map(function (x) { return '<span class="chip">' + esc(x.name) + '</span>'; }).join('') + '</div>';

    q('work-tools').innerHTML = '<div class="tools-grid">' + (w.tools || []).map(function (t, i) {
      return '<div class="tool reveal' + (i % 3 ? ' d' + (i % 3) : '') + '">' +
        (has(t.logo) ? '<img src="' + esc(t.logo) + '" alt="' + esc(t.name) + '">' : '') +
        '<div><div class="tname">' + esc(t.name) + '</div><div class="tlvl">' + esc(t.level) + '</div></div></div>';
    }).join('') + '</div>' +
    '<div class="chips protags reveal">' + (w.professional || []).map(function (x) { return '<span class="chip">' + esc(x.name) + '</span>'; }).join('') + '</div>';

    q('work-projects').innerHTML = '<div class="proj-grid">' + (w.projects || []).map(function (p, i) {
      var shot = has(p.image)
        ? '<div class="shot"><img src="' + esc(p.image) + '" alt="' + esc(p.title) + '"></div>'
        : '<div class="noshot">' + ico('i-chart') + '</div>';
      var tools = (p.tools || []).map(function (t) { return '<span class="badge">' + esc(t.name) + '</span>'; }).join('');
      var link = has(p.link) ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener" style="position:absolute;inset:0" aria-label="Open ' + esc(p.title) + '"></a>' : '';
      return '<div class="proj reveal' + (i % 2 ? ' d1' : '') + '" style="position:relative">' +
        (p.featured ? '<span class="featured-tag">Featured</span>' : '') + shot +
        '<div class="body"><h3>' + esc(p.title) + '</h3><p>' + esc(p.description) + '</p><div class="ptools">' + tools + '</div></div>' + link + '</div>';
    }).join('') + '</div>';

    q('work-exp').innerHTML =
      '<div class="reveal"><div class="blk-h">Experience</div><div class="timeline">' +
        (w.experience || []).map(function (e) {
          return '<div class="tl-row"><div><div class="role">' + esc(e.role) + '</div><div class="co">' + esc(e.company) + ' · ' + esc(e.location) + '</div></div>' +
            '<div class="when' + (e.current ? ' ' : '') + '">' + (e.current ? '<span class="cur">' + esc(e.period) + '</span>' : esc(e.period)) + '</div></div>';
        }).join('') +
      '</div></div>' +
      '<div class="reveal d1"><div class="blk-h">Education</div>' +
        (w.education || []).map(function (e) {
          return '<div class="edu"><div class="deg">' + esc(e.degree) + '</div><div class="sch">' + esc(e.school) + ' · ' + esc(e.period) + '</div>' +
            (has(e.note) ? '<div class="note">' + esc(e.note) + '</div>' : '') + '</div>';
        }).join('') +
      '</div>';

    q('work-certs').innerHTML = '<div class="cert-grid">' + (d.work.certifications || []).map(function (c, i) {
      return '<div class="cert reveal' + (i % 2 ? ' d1' : '') + '">' + (has(c.logo) ? '<img src="' + esc(c.logo) + '" alt="">' : '') +
        '<div><div class="cn">' + esc(c.name) + '</div><div class="ci">' + esc(c.issuer) + '</div></div></div>';
    }).join('') + '</div>';

    renderContact(d, 'work');
  }

  function renderNuma(d) {
    var n = d.numa9, id = d.identity;
    var eps = n.eps || [];
    var heroCover = n.hero_cover || (eps[0] && eps[0].cover) || n.cover;
    q('numa-hero').innerHTML =
      '<div class="reveal">' +
        '<a class="back" href="index.html">' + ico('i-arrow') + ' Home</a>' +
        '<div class="pill">' + esc(n.hero_kind || 'Out now') + '</div>' +
        '<h1>Numa.9</h1>' +
        '<p class="lede">' + esc(n.tagline) + '</p>' +
        '<div class="subhero-cta">' +
          (has(n.spotify) ? '<a class="btn btn-solid" href="' + esc(n.spotify) + '" target="_blank" rel="noopener">' + ico('i-spotify') + ' Listen on Spotify</a>' : '') +
          '<a class="btn btn-ghost" href="work.html">View the portfolio ' + ico('i-arrow') + '</a>' +
        '</div>' +
      '</div>' +
      '<div class="subhero-portrait reveal d1" style="aspect-ratio:1"><img src="' + esc(heroCover) + '" alt="Numa.9 cover art" style="object-position:center"></div>';

    q('numa-release').innerHTML = eps.map(function (ep, ei) {
      var art =
        '<a class="art" href="' + esc(ep.link) + '" target="_blank" rel="noopener" aria-label="Open ' + esc(ep.title) + ' on Spotify">' +
          '<img src="' + esc(ep.cover) + '" alt="' + esc(ep.title) + ' cover"><span class="play"><span>' + ico('i-play') + '</span></span></a>';
      var head =
        '<div class="release">' + art +
          '<div><div class="kind">' + esc(ep.kind) + '</div><h2>' + esc(ep.title) + '</h2>' +
            (has(ep.link) ? '<div class="streams"><a class="stream" href="' + esc(ep.link) + '" target="_blank" rel="noopener">' + ico('i-spotify') + ' Full EP on Spotify</a></div>' : '') +
          '</div></div>';
      var tracks = '<div class="catalogue eptracks">' + (ep.tracks || []).map(function (t, i) {
        var num = ('0' + (i + 1)).slice(-2);
        return '<a class="cat-row" href="' + esc(t.link) + '" target="_blank" rel="noopener">' +
          '<span class="num">' + num + '</span><div class="ct"><div class="t">' + esc(t.title) + '</div></div>' +
          '<span class="go">Play ' + ico('i-ext') + '</span></a>';
      }).join('') + '</div>';
      return '<div class="ep reveal' + (ei ? ' d1' : '') + '">' + head + tracks + '</div>';
    }).join('');

    var vids = n.videos || [];
    if (q('numa-catalogue')) q('numa-catalogue').innerHTML = vids.length
      ? '<div class="catalogue">' + vids.map(function (c, i) {
          var num = ('0' + (i + 1)).slice(-2);
          return '<a class="cat-row reveal" href="' + esc(c.link) + '" target="_blank" rel="noopener">' +
            '<span class="num">' + num + '</span><div class="ct"><div class="t">' + esc(c.title) + '</div><div class="k">Watch on YouTube</div></div>' +
            '<span class="go">Open ' + ico('i-ext') + '</span></a>';
        }).join('') + '</div>'
      : '';

    q('numa-about').innerHTML = '<div class="prose reveal"><p>' + esc(n.about_1) + '</p><p>' + esc(n.about_2) + '</p></div>';

    renderContact(d, 'numa');
  }

  function renderContact(d, ctx) {
    var el = q('contact-render'); if (!el) return;
    var id = d.identity, n = d.numa9;
    var direct =
      '<a class="crow" href="mailto:' + esc(id.email) + '"><span class="ci">' + ico('i-mail') + '</span><span><span class="cx">Email</span><br><span class="cv">' + esc(id.email) + '</span></span></a>' +
      (has(id.whatsapp) ? '<a class="crow" href="https://wa.me/' + esc(String(id.whatsapp).replace(/[^0-9]/g, '')) + '" target="_blank" rel="noopener"><span class="ci">' + ico('i-whatsapp') + '</span><span><span class="cx">Call / WhatsApp</span><br><span class="cv">' + esc(id.whatsapp) + '</span></span></a>' : '') +
      '<div class="crow"><span class="ci">' + ico('i-pin') + '</span><span><span class="cx">Based in</span><br><span class="cv">' + esc(id.location) + '</span></span></div>';

    var second = ctx === 'numa'
      ? '<h4>Follow Numa.9</h4><div class="socialset">' + musicBtns(n, 'sbtn') + '</div>'
      : '<h4>Elsewhere</h4><div class="socialset">' + socialBtns(id, 'sbtn') + '</div>';

    el.innerHTML =
      '<div class="cc reveal"><h4>Reach me directly</h4>' + direct + '</div>' +
      '<div class="cc reveal d1">' + second + '</div>';
  }

  /* ---------- footer ---------- */
  function renderFooter(d) {
    if (q('yr')) q('yr').textContent = new Date().getFullYear();
    if (q('footer-name')) q('footer-name').textContent = d.identity.name;
  }

  /* ---------- boot ---------- */
  function boot(d) {
    var page = document.body.getAttribute('data-page');
    try {
      if (page === 'home') renderHome(d);
      else if (page === 'work') renderWork(d);
      else if (page === 'numa9') renderNuma(d);
      renderFooter(d);
    } catch (e) { console.error('render error', e); }
    wireChrome(); wireReveal();
  }

  function start() {
    fetch('data/site.yml', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('yml ' + r.status); return r.text(); })
      .then(function (t) { boot(jsyaml.load(t)); })
      .catch(function (e) {
        console.error('Could not load content:', e);
        // still wire chrome so the page isn't dead
        wireChrome(); wireReveal();
        var h = q('work-hero') || q('numa-hero');
        if (h) h.innerHTML = '<div><h1>Content is loading…</h1><p class="lede">If this persists, the site needs to be served over http (not opened as a local file).</p></div>';
      });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
