/* =========================================================
   HIMATIKA UIM — app.js (layout & fitur bersama)
   ========================================================= */
(function () {
  'use strict';
  const LOGO  = 'https://i.ibb.co/MkNRxfFG/Proyek-Baru-288-F09-EFA8.png';
  const PHOTO = 'https://i.ibb.co.com/V59MPWH/Proyek-Baru-59-9-A3-D4-FF.png';
  // Nama departemen resmi — JANGAN diganti
  const DEPTS = [
    { key:'kominfo', name:'Komunikasi dan Informasi', href:'struktur.html',        icon:'fa-tower-broadcast',    color:'#0EA5E9' },
    { key:'pora',    name:'Pemuda dan Olahraga',      href:'stpemuda.html',        icon:'fa-people-group',       color:'#F97316' },
    { key:'agama',   name:'Agama',                    href:'stagama.html',         icon:'fa-mosque',             color:'#10B981' },
    { key:'sdm',     name:'Pengembangan dan SDM',     href:'stsdm.html',           icon:'fa-user-graduate',      color:'#8B5CF6' },
    { key:'kesra',   name:'Kesejahteraan Mahasiswa',  href:'stkesejahteraan.html', icon:'fa-hand-holding-heart', color:'#F43F5E' }
  ];

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const page = document.body.dataset.page || '';
  const isDept = DEPTS.some(d => d.key === page);
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const on = c => c ? ' class="active"' : '';

  /* ================= LAYOUT ================= */
  const ddLinks = DEPTS.map(d => `<a href="${d.href}" style="--c:${d.color}"${d.key === page ? ' class="current"' : ''}><i class="fa-solid ${d.icon}"></i> ${d.name}</a>`).join('');
  const sheetDepts = DEPTS.map(d => `<a href="${d.href}" style="--c:${d.color}"><i class="fa-solid ${d.icon}"></i>${d.name}</a>`).join('');

  document.body.insertAdjacentHTML('afterbegin', `
  <div class="progress" id="progress"></div>
  <header class="header" id="header">
    <a href="index.html" class="brand"><img src="${LOGO}" alt="Logo HIMATIKA"><div><b>HIMATIKA</b><small>UNIV. INDONESIA MANDIRI</small></div></a>
    <nav class="nav">
      <a href="index.html">Beranda</a>
      <a href="proker.html"${on(page === 'proker')}>Program Kerja</a>
      <div class="dd">
        <button${on(isDept)}>Departemen <i class="fa-solid fa-chevron-down"></i></button>
        <div class="dd-menu">${ddLinks}</div>
      </div>
      <a href="GridStruktur.html"${on(page === 'struktur')}>Struktur</a>
      <a href="berita.html"${on(page === 'berita')}>Berita</a>
    </nav>
    <div class="header-actions">
      <button class="icon-btn theme-toggle" aria-label="Ganti tema"><i class="fa-solid fa-moon"></i></button>
      <a href="index.html#kontak" class="btn btn-gold btn-sm">Hubungi Kami</a>
    </div>
  </header>
  <header class="appbar" id="appbar">
    <a href="index.html" class="brand"><img src="${LOGO}" alt="Logo HIMATIKA"><div><b>HIMATIKA</b><small>UIM</small></div></a>
    <button class="icon-btn theme-toggle" aria-label="Ganti tema"><i class="fa-solid fa-moon"></i></button>
  </header>`);

  document.body.insertAdjacentHTML('beforeend', `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="index.html" class="brand"><img src="${LOGO}" alt="Logo HIMATIKA"><div><b>HIMATIKA</b><small>UNIV. INDONESIA MANDIRI</small></div></a>
          <p class="footer-desc">Himpunan Mahasiswa Informatika Universitas Indonesia Mandiri. Solid, inovatif, dan berdampak.</p>
        </div>
        <div><h5>Navigasi</h5><ul>
          <li><a href="index.html">Beranda</a></li><li><a href="proker.html">Program Kerja</a></li>
          <li><a href="GridStruktur.html">Struktur Organisasi</a></li><li><a href="berita.html">Berita</a></li></ul></div>
        <div><h5>Departemen</h5><ul>${DEPTS.map(d => `<li><a href="${d.href}">${d.name}</a></li>`).join('')}</ul></div>
        <div><h5>Terhubung</h5><ul><li><a href="index.html#kontak">Kontak &amp; Sosial Media</a></li><li><a href="admin.html"><i class="fa-solid fa-lock"></i> Admin</a></li></ul></div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} HIMATIKA UIM · Developed by Gilang Aidil Pratama / Dilz Ghaaziy</span>
        <a href="index.html"><i class="fa-solid fa-house"></i> Kembali ke Beranda</a>
      </div>
    </div>
  </footer>
  <nav class="bottom-nav">
    <a href="index.html"><i class="fa-solid fa-house"></i>Beranda</a>
    <a href="proker.html"${on(page === 'proker')}><i class="fa-solid fa-rocket"></i>Proker</a>
    <a href="GridStruktur.html"${on(page === 'struktur' || isDept)}><i class="fa-solid fa-sitemap"></i>Struktur</a>
    <a href="berita.html"${on(page === 'berita')}><i class="fa-solid fa-newspaper"></i>Berita</a>
    <button id="menuBtn"><i class="fa-solid fa-grip"></i>Menu</button>
  </nav>
  <div class="sheet-backdrop" id="sheetBackdrop"></div>
  <div class="sheet" id="sheet" role="dialog" aria-label="Menu">
    <div class="sheet-handle"></div>
    <h4>Halaman</h4>
    <div class="sheet-grid">
      <a href="index.html" style="--c:#1E4380"><i class="fa-solid fa-house"></i>Beranda</a>
      <a href="proker.html" style="--c:#F5B841"><i class="fa-solid fa-rocket"></i>Program Kerja</a>
      <a href="GridStruktur.html" style="--c:#0F2547"><i class="fa-solid fa-sitemap"></i>Struktur</a>
      <a href="berita.html" style="--c:#0EA5E9"><i class="fa-solid fa-newspaper"></i>Berita</a>
      <a href="index.html#kontak" style="--c:#E11D48"><i class="fa-solid fa-paper-plane"></i>Kontak</a>
      <a href="admin.html" style="--c:#5B6578"><i class="fa-solid fa-lock"></i>Admin</a>
    </div>
    <h4>Departemen</h4>
    <div class="sheet-grid">${sheetDepts}</div>
  </div>
  <div class="lb" id="lb" role="dialog" aria-label="Pratinjau gambar">
    <div class="lb-top">
      <a class="lb-btn hidden" id="lbDl" download aria-label="Download"><i class="fa-solid fa-download"></i></a>
      <button class="lb-btn" id="lbClose" aria-label="Tutup"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <button class="lb-btn lb-prev" id="lbPrev" aria-label="Sebelumnya"><i class="fa-solid fa-chevron-left"></i></button>
    <figure class="lb-stage"><img class="lb-img" id="lbImg" alt=""><figcaption><b id="lbTitle"></b><small id="lbCount"></small></figcaption></figure>
    <button class="lb-btn lb-next" id="lbNext" aria-label="Berikutnya"><i class="fa-solid fa-chevron-right"></i></button>
  </div>
  <div class="toast" id="toast"></div>
  <button class="totop" id="toTop" aria-label="Kembali ke atas"><span><i class="fa-solid fa-arrow-up"></i></span></button>`);

  /* ================= TEMA ================= */
  const root = document.documentElement;
  const syncIcon = () => $$('.theme-toggle i').forEach(i => i.className = root.dataset.theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon');
  $$('.theme-toggle').forEach(b => b.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', root.dataset.theme); syncIcon();
  }));
  syncIcon();

  /* ================= TOAST ================= */
  let tt;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2800); }

  /* ================= SCROLL ================= */
  const header = $('#header'), appbar = $('#appbar'), progress = $('#progress'), toTop = $('#toTop');
  if (document.body.dataset.solid !== undefined) { header.classList.add('solid'); appbar.classList.add('solid'); }
  let ticking = false;
  function onScroll() {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight, p = h > 0 ? y / h : 0;
    progress.style.transform = `scaleX(${p})`;
    header.classList.toggle('scrolled', y > 40);
    appbar.classList.toggle('scrolled', y > 20);
    toTop.style.setProperty('--p', (p * 100).toFixed(1));
    toTop.classList.toggle('show', y > 600);
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  /* ================= REVEAL ================= */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  const observe = (scope = document) => $$('.reveal:not(.in)', scope).forEach(el => io.observe(el));

  /* ================= TILT (desktop) ================= */
  function tilt(scope = document) {
    if (!fine || reduce) return;
    $$('.tilt', scope).forEach(el => {
      if (el.dataset.tilt) return; el.dataset.tilt = 1;
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
      });
      el.addEventListener('pointerleave', () => el.style.transform = '');
    });
  }

  /* ================= SHEET (mobile) ================= */
  const sheet = $('#sheet'), bd = $('#sheetBackdrop');
  const openSheet = () => { sheet.classList.add('open'); bd.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeSheet = () => { sheet.classList.remove('open'); bd.classList.remove('open'); document.body.style.overflow = ''; sheet.style.transform = ''; };
  $('#menuBtn').addEventListener('click', openSheet);
  bd.addEventListener('click', closeSheet);
  $$('#sheet a').forEach(a => a.addEventListener('click', closeSheet));
  let sy = null;
  sheet.addEventListener('touchstart', e => { if (sheet.scrollTop <= 0) sy = e.touches[0].clientY; }, { passive: true });
  sheet.addEventListener('touchmove', e => { if (sy === null) return; const d = e.touches[0].clientY - sy; if (d > 0) { sheet.style.transition = 'none'; sheet.style.transform = `translateY(${d}px)`; } }, { passive: true });
  sheet.addEventListener('touchend', e => { if (sy === null) return; const d = e.changedTouches[0].clientY - sy; sheet.style.transition = ''; d > 100 ? closeSheet() : sheet.style.transform = ''; sy = null; });

  /* ================= LIGHTBOX ================= */
  const lb = $('#lb'), lbImg = $('#lbImg');
  let items = [], idx = 0, lbDownload = false;
  function lbShow() {
    const it = items[idx];
    lbImg.classList.add('swap');
    setTimeout(() => { lbImg.src = it.src; lbImg.alt = it.title || ''; lbImg.classList.remove('swap'); }, 150);
    $('#lbTitle').textContent = it.title || '';
    $('#lbCount').textContent = items.length > 1 ? `${idx + 1} / ${items.length}` : '';
    const dl = $('#lbDl');
    dl.classList.toggle('hidden', !lbDownload);
    if (lbDownload) { dl.href = it.src; let n = it.src.split('/').pop().split('?')[0]; if (!n.includes('.')) n += '.jpg'; dl.download = n; }
  }
  function openLightbox(list, start = 0, opts = {}) {
    items = list; idx = start; lbDownload = !!opts.download;
    lb.classList.toggle('single', list.length < 2);
    lbShow(); lb.classList.add('open'); document.body.style.overflow = 'hidden';
  }
  const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  const step = d => { idx = (idx + d + items.length) % items.length; lbShow(); };
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', () => step(-1));
  $('#lbNext').addEventListener('click', () => step(1));
  lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-stage')) closeLb(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1);
  });
  let tx = null;
  lb.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
  lb.addEventListener('touchend', e => { if (tx === null) return; const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50 && items.length > 1) step(d < 0 ? 1 : -1); tx = null; });

  /* ================= RENDER HALAMAN DEPARTEMEN ================= */
  function renderDept(cfg) {
    const d = DEPTS.find(x => x.key === cfg.key);
    document.body.style.setProperty('--c', d.color);
    document.title = `Departemen ${d.name} - HIMATIKA`;
    const all = [];
    const push = (name, role, img) => { all.push({ src: img || PHOTO, title: `${name} · ${role}` }); return all.length - 1; };
    const leaders = cfg.leaders.map((l, i) => {
      const n = push(l.name, l.role, l.img);
      return `<figure class="lcard tilt" data-i="${n}"><img src="${esc(l.img || PHOTO)}" alt="${esc(l.name)}" loading="lazy">
        <figcaption><span class="lrole${i ? ' alt' : ''}">${esc(l.role)}</span><b>${esc(l.name)}</b></figcaption></figure>`;
    }).join('');
    const total = cfg.leaders.length + (cfg.units || []).reduce((a, u) => a + u.members.length, 0);
    const units = (cfg.units || []).map((u, ui) => `
      <div class="unit">
        <div class="unit-head reveal"><span class="unit-num">${String(ui + 1).padStart(2, '0')}</span>
          <div><h2>${esc(u.name)}</h2><small>${u.members.length} anggota</small></div><span class="unit-line"></span></div>
        <div class="members">${u.members.map((m, mi) => {
          const name = typeof m === 'string' ? m : m.name, img = typeof m === 'string' ? '' : m.img;
          const n = push(name, u.name, img);
          return `<article class="member reveal" style="--d:${(mi % 4) * .06}s" data-i="${n}">
            <div class="ph"><img src="${esc(img || PHOTO)}" alt="${esc(name)}" loading="lazy"></div>
            <h3>${esc(name)}</h3><span>Anggota</span></article>`;
        }).join('')}</div>
      </div>`).join('');
    const others = DEPTS.filter(x => x.key !== d.key).map(x => `
      <a href="${x.href}" class="more-card reveal" style="--c:${x.color}"><i class="fa-solid ${x.icon}"></i><b>${x.name}</b><span>Lihat departemen <i class="fa-solid fa-arrow-right"></i></span></a>`).join('');

    $('#dept').innerHTML = `
    <section class="page-hero dept-hero">
      <div class="hero-bg"><div class="hero-grid"></div><div class="blob b1"></div><div class="blob b2"></div></div>
      <div class="container dept-hero-inner">
        <div>
          <nav class="crumbs reveal"><a href="index.html">Beranda</a><i class="fa-solid fa-chevron-right"></i><a href="GridStruktur.html">Struktur</a><i class="fa-solid fa-chevron-right"></i><span>${d.name}</span></nav>
          <div class="dept-badge reveal"><i class="fa-solid ${d.icon}"></i> Departemen</div>
          <h1 class="reveal" style="--d:.05s">${d.name}</h1>
          <p class="lead reveal" style="--d:.1s">${esc(cfg.desc)}</p>
          <div class="hero-chips reveal" style="--d:.15s">
            <span class="hchip"><i class="fa-solid fa-users"></i> ${total} Pengurus</span>
            <span class="hchip"><i class="fa-solid fa-layer-group"></i> ${(cfg.units || []).length ? cfg.units.length + ' Unit' : 'Tanpa Unit'}</span>
          </div>
        </div>
        <div class="lead-cards reveal" style="--d:.15s">${leaders}</div>
      </div>
    </section>
    <section class="section"><div class="container">
      ${units || `<div class="note-box reveal"><i class="fa-solid fa-circle-info"></i> ${esc(cfg.noUnitText || 'Departemen ini tidak memiliki unit.')}</div>`}
      <div id="deptExtra"></div>
    </div></section>
    <section class="section" style="padding-top:0"><div class="container">
      <div class="section-head reveal"><div><span class="eyebrow">Jelajahi</span><h2 class="title">Departemen <span class="hl">lainnya</span></h2></div>
      <a href="GridStruktur.html" class="btn btn-dark btn-sm">Struktur Lengkap <i class="fa-solid fa-arrow-right"></i></a></div>
      <div class="more-grid">${others}</div>
    </div></section>`;

    $$('#dept [data-i]').forEach(el => el.addEventListener('click', () => openLightbox(all, +el.dataset.i)));
    observe($('#dept')); tilt($('#dept'));
  }

  observe(); tilt();
  window.HIMA = { DEPTS, PHOTO, LOGO, esc, toast, openLightbox, observe, tilt, renderDept };
})();
