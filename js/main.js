// ============ MOBILE MENU ============
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => nav.classList.toggle('is-open'));

nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') nav.classList.remove('is-open');
});

// ============ COLLECTION TABS ============
document.querySelectorAll('.tabs__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabs__btn').forEach(b => b.classList.remove('is-active'));
    document.querySelectorAll('.tabs__panel').forEach(p => p.classList.remove('is-active'));
    btn.classList.add('is-active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('is-active');
  });
});

// ============ SLIDERS ============
function initSlider(name, trackSelector) {
  const track = document.querySelector(trackSelector);
  if (!track) return;
  const slides = track.children.length;
  let index = 0;

  const visible = () => {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 768) return 2;
    if (w <= 1024) return 3;
    return 4;
  };

  const update = () => {
    const max = Math.max(0, slides - visible());
    if (index > max) index = max;
    if (index < 0) index = 0;
    track.style.transform = `translateX(-${index * (100 / visible())}%)`;
  };

  document.querySelectorAll(`[data-slider="${name}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      index += btn.classList.contains('slider-arrow--next') ? 1 : -1;
      update();
    });
  });

  window.addEventListener('resize', update);
  update();
}

initSlider('arrivals', '#arrivals-slider .slider__track');
initSlider('brands', '#brands-slider .slider__track');

// ============ COUNTDOWN ============
const countdown = document.getElementById('countdown');

function updateCountdown() {
  const deadline = new Date(countdown.dataset.deadline).getTime();
  let diff = Math.max(0, deadline - Date.now());

  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff % 86400000 / 3600000);
  const m = Math.floor(diff % 3600000 / 60000);
  const s = Math.floor(diff % 60000 / 1000);

  document.getElementById('cd-days').textContent = d;
  document.getElementById('cd-hours').textContent = h;
  document.getElementById('cd-minutes').textContent = m;
  document.getElementById('cd-seconds').textContent = s;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============ NEWSLETTER FORM ============
document.getElementById('subscribe-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you! We will contact you shortly');
  e.target.reset();
});
