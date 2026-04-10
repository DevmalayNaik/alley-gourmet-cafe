// ALLEY GOURMET CAFE — main.js

// Custom cursor
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
if (cur && ring) {
  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
    setTimeout(() => { ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px'; }, 80);
  });
  document.querySelectorAll('a,button,.mcard,.gitem,.rcard').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.transform = 'translate(-50%,-50%) scale(1.9)'; ring.style.opacity = '.8'; });
    el.addEventListener('mouseleave', () => { ring.style.transform = 'translate(-50%,-50%) scale(1)';   ring.style.opacity = '.5'; });
  });
}

// Navbar scroll
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));

// Mobile hamburger
const hbg = document.getElementById('hamburger');
const nmenu = document.getElementById('navMenu');
if (hbg && nmenu) {
  hbg.addEventListener('click', () => nmenu.classList.toggle('open'));
  nmenu.querySelectorAll('.nlink').forEach(l => l.addEventListener('click', () => nmenu.classList.remove('open')));
}

// Scroll reveal
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

// Menu tabs
const tabs  = document.querySelectorAll('.mtab');
const cards = document.querySelectorAll('.mcard');

function showCat(cat) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
  cards.forEach(c => {
    const show = c.dataset.cat === cat;
    c.classList.toggle('show', show);
    if (show) { c.classList.remove('visible'); setTimeout(() => c.classList.add('visible'), 60); }
  });
}
tabs.forEach(t => t.addEventListener('click', () => showCat(t.dataset.cat)));
showCat('wraps'); // default

// Lead gen form
const form = document.getElementById('leadsForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    const n = document.getElementById('ln');
    const m = document.getElementById('lm');
    const em = document.getElementById('le');
    [n, m, em].forEach(f => { f.classList.remove('err'); document.getElementById(f.id + '-e').classList.remove('show'); });
    if (!n.value.trim() || n.value.trim().length < 2) { n.classList.add('err'); document.getElementById('ln-e').classList.add('show'); ok = false; }
    if (!/^[6-9]\d{9}$/.test(m.value.trim())) { m.classList.add('err'); document.getElementById('lm-e').classList.add('show'); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value.trim())) { em.classList.add('err'); document.getElementById('le-e').classList.add('show'); ok = false; }
    if (ok) { form.style.display = 'none'; document.getElementById('formOk').classList.add('show'); }
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
