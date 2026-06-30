/* ============================================================
   RIAN ROCHA ARQUITETURA — script.js
   ============================================================ */

'use strict';

/* ============================================================
   SUPABASE
   ============================================================ */
var _supabase = window.supabase.createClient(
  'https://kadjiysgsqeqasigfmda.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZGppeXNnc3FlcWFzaWdmbWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0OTM3ODUsImV4cCI6MjA5ODA2OTc4NX0.IwCYbHFrHCGkh8IKDP7BYQKN65zd2pXyUYkqwBisdTY'
);

/* ============================================================
   DADOS
   ============================================================ */
const WA_LINK = 'https://wa.me/5511994586173?text=' + encodeURIComponent('Olá Rian! Gostaria de conversar sobre um projeto.');

const PROJECTS = [
  { img: 'assets/images/portfolio-1.png', cat: 'RESIDENCIAL', title: 'Área de Lazer'      },
  { img: 'assets/images/portfolio-2.png', cat: 'INTERIORES',  title: 'Área de Descanso'   },
  { img: 'assets/images/portfolio-4.png', cat: 'INTERIORES',  title: 'Suíte Casal'        },
  { img: 'assets/images/portfolio-6.png', cat: 'INTERIORES',  title: 'Quarto Bebê'        },
  { img: 'assets/images/portfolio-5.png', cat: 'INTERIORES',  title: 'Quarto Infantil'    },
  { img: 'assets/images/portifolio-7.jpeg',  cat: 'INTERIORES',  title: 'Sala de Estar'   },
  { img: 'assets/images/portifolio-8.jpeg',  cat: 'INTERIORES',  title: 'Cozinha'         },
  { img: 'assets/images/portifolio-9.jpeg',  cat: 'INTERIORES',  title: 'Cozinha Integrada' },
  { img: 'assets/images/portifolio-10.jpeg', cat: 'RESIDENCIAL', title: 'Piscina e Lazer' },
  { img: 'assets/images/portifolio-11.jpeg', cat: 'COMERCIAL',   title: 'Escritório'      }
];

const TESTIMONIALS_INITIAL = [
  {
    name: 'Marina Albuquerque',
    role: 'RESIDÊNCIA JARDIM',
    rating: 5,
    comment: 'O Rian traduziu em projeto exatamente a forma como sonhávamos viver. Cada detalhe tem intenção.'
  },
  {
    name: 'Eduardo Tavares',
    role: 'COBERTURA AURORA',
    rating: 5,
    comment: 'Profissionalismo e sensibilidade raros. O resultado superou qualquer referência que levamos.'
  },
  {
    name: 'Camila Rezende',
    role: 'APARTAMENTO CENTRO',
    rating: 5,
    comment: 'Conduziu todo o processo com clareza e elegância. Confiança do primeiro encontro à entrega.'
  }
];

const STEPS = {
  interiores: [
    { num: '01', title: 'Reunião de briefing',  desc: 'Entrevista para entender necessidades, rotina e referências de cada cliente.' },
    { num: '02', title: 'Estudo de Layout',      desc: 'Organização dos ambientes, distribuição dos espaços e definição da planta.' },
    { num: '03', title: 'Estudo Preliminar',     desc: 'Apresentação do projeto em 3D, com imagens renderizadas que antecipam a experiência.' },
    { num: '04', title: 'Projeto Executivo',     desc: 'Caderno técnico completo: marcenaria, marmoraria, paginação de pisos, revestimentos, pintura, luminotécnico, pontos elétricos e hidráulicos, planta de forro e todos os detalhamentos.' }
  ],
  arquitetura: [
    { num: '01', title: 'Reunião de briefing',  desc: 'Entrevista para entender necessidades, rotina e referências de cada cliente.' },
    { num: '02', title: 'Estudo de Layout',      desc: 'Organização dos ambientes, distribuição dos espaços e definição da planta.' },
    { num: '03', title: 'Estudo Preliminar',     desc: 'Apresentação do projeto em 3D, com imagens renderizadas que antecipam a experiência.' },
    { num: '04', title: 'Projeto Executivo',     desc: 'Plantas de todos os pavimentos, cortes, elevações, detalhes construtivos e a documentação técnica necessária para a execução.' }
  ]
};

/* ============================================================
   UTILITÁRIOS
   ============================================================ */
function monogram(name) {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '·';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ============================================================
   NAVEGAÇÃO & MENU MOBILE
   ============================================================ */
const hamburger      = document.getElementById('nav-hamburger');
const mobileMenu     = document.getElementById('mobile-menu');
const menuCloseBtn   = document.getElementById('mobile-menu-close');
const menuLinks      = document.querySelectorAll('[data-close-menu]');

function openMenu() {
  mobileMenu.classList.add('is-open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
menuCloseBtn.addEventListener('click', closeMenu);
menuLinks.forEach(function(link) {
  link.addEventListener('click', closeMenu);
});

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function checkReveal() {
  var h = window.innerHeight || document.documentElement.clientHeight;
  document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(function(el) {
    var r = el.getBoundingClientRect();
    if (r.top < h * 0.9 && r.bottom > 0) {
      el.classList.add('is-visible');
    }
  });
}

window.addEventListener('scroll', checkReveal, { passive: true });
window.addEventListener('resize', checkReveal);
[0, 120, 350, 700].forEach(function(t) { setTimeout(checkReveal, t); });

/* ============================================================
   GALERIA FULLSCREEN
   ============================================================ */
var galleryOverlay  = document.getElementById('gallery-overlay');
var galleryGrid     = document.getElementById('gallery-grid');
var btnOpenGallery  = document.getElementById('btn-open-gallery');
var btnCloseGallery = document.getElementById('btn-close-gallery');

/* Constrói a grade da galeria */
PROJECTS.forEach(function(proj) {
  var fig = document.createElement('figure');
  fig.className = 'gallery-item';

  var img = document.createElement('img');
  img.src       = proj.img;
  img.alt       = proj.title;
  img.className = 'gallery-item__img';
  img.loading   = 'lazy';

  var caption = document.createElement('figcaption');
  caption.className = 'gallery-item__caption';
  caption.innerHTML =
    '<p class="gallery-item__cat">'   + proj.cat   + '</p>' +
    '<p class="gallery-item__title">' + proj.title + '</p>';

  fig.appendChild(img);
  fig.appendChild(caption);
  fig.addEventListener('click', function() { openLightbox(proj); });
  galleryGrid.appendChild(fig);
});

function openGallery() {
  galleryOverlay.classList.add('is-open');
  galleryOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  galleryOverlay.classList.remove('is-open');
  galleryOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

btnOpenGallery.addEventListener('click', openGallery);
btnCloseGallery.addEventListener('click', closeGallery);

/* Clique direto nas imagens do portfólio principal */
document.querySelectorAll('[data-project]').forEach(function(el) {
  var idx = parseInt(el.dataset.project, 10);
  el.addEventListener('click', function() { openLightbox(PROJECTS[idx]); });
});

/* ============================================================
   LIGHTBOX
   ============================================================ */
var lightbox          = document.getElementById('lightbox');
var lightboxBackdrop  = document.getElementById('lightbox-backdrop');
var lightboxImg       = document.getElementById('lightbox-img');
var lightboxCat       = document.getElementById('lightbox-cat');
var lightboxTitle     = document.getElementById('lightbox-title');
var btnCloseLightbox  = document.getElementById('btn-close-lightbox');

function openLightbox(proj) {
  lightboxImg.src              = proj.img;
  lightboxImg.alt              = proj.title;
  lightboxCat.textContent      = proj.cat;
  lightboxTitle.textContent    = proj.title;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
}

btnCloseLightbox.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);

/* ============================================================
   TECLADO — ESC fecha overlays em cascata
   ============================================================ */
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Escape') return;
  if (lightbox.classList.contains('is-open'))        { closeLightbox(); return; }
  if (galleryOverlay.classList.contains('is-open'))  { closeGallery();  return; }
  if (mobileMenu.classList.contains('is-open'))      { closeMenu(); }
});

/* ============================================================
   PROCESSO — ABAS
   ============================================================ */
var tabInteriores  = document.getElementById('tab-interiores');
var tabArquitetura = document.getElementById('tab-arquitetura');
var processoSteps  = document.getElementById('processo-steps');

function renderSteps(fluxo) {
  var steps = STEPS[fluxo];
  var grid  = document.createElement('div');
  grid.className = 'processo__steps-grid';

  steps.forEach(function(step) {
    var div = document.createElement('div');
    div.className = 'process-step';
    div.innerHTML =
      '<div class="process-step__num-wrap">' +
        '<span class="process-step__num">' + step.num + '</span>' +
      '</div>' +
      '<h3 class="process-step__title">' + step.title + '</h3>' +
      '<p class="process-step__desc">'   + step.desc  + '</p>';
    grid.appendChild(div);
  });

  processoSteps.innerHTML = '';
  processoSteps.appendChild(grid);
}

function setTab(fluxo) {
  renderSteps(fluxo);
  if (fluxo === 'interiores') {
    tabInteriores.classList.add('tab-btn--active');
    tabArquitetura.classList.remove('tab-btn--active');
  } else {
    tabArquitetura.classList.add('tab-btn--active');
    tabInteriores.classList.remove('tab-btn--active');
  }
}

tabInteriores.addEventListener('click',  function() { setTab('interiores'); });
tabArquitetura.addEventListener('click', function() { setTab('arquitetura'); });
setTab('interiores');

/* ============================================================
   DEPOIMENTOS
   ============================================================ */
var testimonialsGrid = document.getElementById('testimonials-grid');

function renderTestimonials(list) {
  testimonialsGrid.innerHTML = '';
  list.forEach(function(t) {
    var article = document.createElement('article');
    article.className = 'testimonial-card';

    var rating = parseInt(t.rating, 10) || 5;
    var full   = '★'.repeat(rating);
    var empty  = '★'.repeat(Math.max(0, 5 - rating));
    var role   = t.role || 'CLIENTE';

    article.innerHTML =
      '<div class="testimonial-card__stars">' +
        '<span class="full">'  + full  + '</span>' +
        '<span class="empty">' + empty + '</span>' +
      '</div>' +
      '<p class="testimonial-card__comment">' + escapeHtml(t.comment) + '</p>' +
      '<div class="testimonial-card__author">' +
        '<span class="testimonial-card__monogram">' + monogram(t.name) + '</span>' +
        '<div>' +
          '<p class="testimonial-card__name">' + escapeHtml(t.name) + '</p>' +
          '<p class="testimonial-card__role">' + escapeHtml(role) + '</p>' +
        '</div>' +
      '</div>';

    testimonialsGrid.appendChild(article);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function loadReviews() {
  var result = await _supabase
    .from('reviews')
    .select('name, role, rating, comment')
    .order('created_at', { ascending: false });

  if (result.error || !result.data || result.data.length === 0) {
    renderTestimonials(TESTIMONIALS_INITIAL);
  } else {
    renderTestimonials(result.data);
  }
}

loadReviews();

/* ============================================================
   FORMULÁRIO — AVALIAÇÃO POR ESTRELAS
   ============================================================ */
var formStarsEl   = document.getElementById('form-stars');
var currentRating = 5;

function renderStars() {
  formStarsEl.innerHTML = '';
  [1, 2, 3, 4, 5].forEach(function(n) {
    var btn       = document.createElement('button');
    btn.type      = 'button';
    btn.className = 'form-star' + (n <= currentRating ? ' is-active' : '');
    btn.textContent = '★';
    btn.setAttribute('aria-label', n + ' estrela' + (n > 1 ? 's' : ''));
    btn.addEventListener('click', function() {
      currentRating = n;
      renderStars();
    });
    formStarsEl.appendChild(btn);
  });
}

renderStars();

/* ============================================================
   FORMULÁRIO — ENVIO
   ============================================================ */
var formNameEl    = document.getElementById('form-name');
var formCommentEl = document.getElementById('form-comment');
var btnSubmit     = document.getElementById('btn-submit');
var formSuccess   = document.getElementById('form-success');

btnSubmit.addEventListener('click', async function() {
  var name    = formNameEl.value.trim();
  var comment = formCommentEl.value.trim();

  if (!name || !comment || currentRating < 1) return;

  btnSubmit.disabled    = true;
  btnSubmit.textContent = 'ENVIANDO…';

  var result = await _supabase
    .from('reviews')
    .insert([{ name: name, role: 'CLIENTE', rating: currentRating, comment: comment }]);

  btnSubmit.disabled    = false;
  btnSubmit.textContent = 'ENVIAR AVALIAÇÃO';

  if (result.error) {
    alert('Erro ao enviar avaliação. Tente novamente.');
    return;
  }

  formNameEl.value    = '';
  formCommentEl.value = '';
  currentRating = 5;
  renderStars();

  formSuccess.classList.add('is-visible');
  setTimeout(function() { formSuccess.classList.remove('is-visible'); }, 4000);

  await loadReviews();
});
