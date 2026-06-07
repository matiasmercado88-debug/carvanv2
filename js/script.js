/* CARVAN v2 — interacciones mínimas */
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (e) { io.observe(e); });
})();

(function () {
  var t = document.getElementById('toggle'), m = document.getElementById('menu');
  if (!t) return;
  var closeBtn = document.createElement('button');
  closeBtn.className = 'nav__close'; closeBtn.setAttribute('aria-label', 'Cerrar menú'); closeBtn.innerHTML = '&times;';
  m.insertBefore(closeBtn, m.firstChild);
  var scrim = document.createElement('div'); scrim.className = 'nav-scrim'; document.body.appendChild(scrim);
  t.setAttribute('aria-expanded', 'false'); t.setAttribute('aria-controls', 'menu'); t.setAttribute('aria-label', 'Abrir menú');
  function setOpen(o){
    m.classList.toggle('open', o);
    t.classList.toggle('is-open', o);
    scrim.classList.toggle('show', o);
    t.setAttribute('aria-expanded', o ? 'true' : 'false');
    t.setAttribute('aria-label', o ? 'Cerrar menú' : 'Abrir menú');
  }
  t.addEventListener('click', function () { setOpen(!m.classList.contains('open')); });
  closeBtn.addEventListener('click', function () { setOpen(false); t.focus(); });
  scrim.addEventListener('click', function () { setOpen(false); });
  m.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && m.classList.contains('open')) { setOpen(false); t.focus(); } });
})();

/* Carrusel de reseñas */
(function () {
  var car = document.querySelector('.revcar'); if (!car) return;
  var track = car.querySelector('.revcar__track');
  var cards = track.children, n = cards.length, i = 0;
  var dotsWrap = car.parentNode.querySelector('.revcar__dots'), dots = [];
  if (n < 2) return;
  for (var k = 0; k < n; k++) {
    var d = document.createElement('button');
    d.className = 'revcar__dot' + (k === 0 ? ' is-active' : '');
    d.setAttribute('aria-label', 'Reseña ' + (k + 1));
    (function (idx) { d.addEventListener('click', function () { go(idx); restart(); }); })(k);
    dotsWrap.appendChild(d); dots.push(d);
  }
  function go(x) { i = (x + n) % n; track.style.transform = 'translateX(-' + (i * 100) + '%)'; dots.forEach(function (dd, j) { dd.classList.toggle('is-active', j === i); }); }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t, paused = false;
  function restart() { clearInterval(t); if (reduce) return; t = setInterval(function () { if (!paused && !document.hidden) go(i + 1); }, 5500); }
  car.addEventListener('mouseenter', function () { paused = true; });
  car.addEventListener('mouseleave', function () { paused = false; });
  car.addEventListener('focusin', function () { paused = true; });
  car.addEventListener('focusout', function () { paused = false; });
  restart();
})();
