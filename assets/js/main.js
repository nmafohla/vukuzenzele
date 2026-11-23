/* ==========================================================================
   Vukuzenzele Granite Design - Main Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initDrawer();
  initSpecimenExplorer();
  initPortfolioFilter();
  initLightbox();
  initBeforeAfterSlider();
  initEstimator();
});

function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle('scrolled', window.scrollY > 40);
      ticking = false;
    });
  }, { passive: true });
}

function initDrawer() {
  const drawer = document.getElementById('drawer');
  const openBtn = document.getElementById('mobile-menu-btn');
  if (!drawer || !openBtn) return;

  const scroller = drawer.querySelector('.Drawer-scroller');
  const sheet = drawer.querySelector('.Drawer-sheet');
  const closeBtn = document.getElementById('drawer-close');
  if (!scroller || !sheet || !closeBtn) return;

  async function openDrawer() {
    drawer.showModal();
    if (!CSS.supports('scroll-initial-target', 'nearest')) {
      scroller.scrollTo({ left: scroller.offsetWidth, behavior: 'instant' });
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    }
    scroller.scrollTo({ left: 0, behavior: 'auto' });
  }

  function closeDrawer() {
    scroller.scrollTo({ left: scroller.offsetWidth, behavior: 'auto' });
  }

  if (!CSS.supports('animation-timeline: scroll()')) {
    scroller.addEventListener('scroll', () => {
      const ratio = Math.max(0, Math.min(1, 1 - scroller.scrollLeft / (sheet.offsetWidth || 1)));
      drawer.style.setProperty('--drawer-backdrop', String(ratio));
    }, { passive: true });
  }

  const visibleThreshold = 1 / Math.max(window.innerWidth, 320);
  const observer = new IntersectionObserver((entries) => {
    const entry = entries.at(-1);
    if (!entry) return;
    if (entry.intersectionRatio < visibleThreshold && drawer.open) {
      drawer.close();
      openBtn.setAttribute('aria-expanded', 'false');
    } else if (entry.intersectionRatio >= 0.99) {
      openBtn.setAttribute('aria-expanded', 'true');
    }
  }, { root: drawer, threshold: [visibleThreshold, 1] });

  observer.observe(sheet);
  openBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  drawer.addEventListener('click', (e) => {
    if (!sheet.contains(e.target)) closeDrawer();
  });
  drawer.addEventListener('cancel', (e) => {
    if (e.cancelable) {
      e.preventDefault();
      closeDrawer();
    }
  });
  sheet.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeDrawer));
}

const SPECIMENS = {
  quartz: {
    name: 'Quartz & Caesarstone',
    subtitle: 'Engineered architectural stone with 0% porosity and effortless daily care.',
    image: 'assets/images/media__1785265112054.jpg',
    porosity: 'Non-Porous (0%)',
    heat: 'Up to 150°C',
    bestFor: 'Kitchen Islands & Tops'
  },
  granite: {
    name: 'Zimbabwean & Imported Granite',
    subtitle: 'Natural igneous stone quarried for extreme heat resistance and indoor/outdoor strength.',
    image: 'assets/images/media__1785265093998.jpg',
    porosity: 'Low (Sealed)',
    heat: 'Extreme (Direct Pans)',
    bestFor: 'Kitchens & Braai Areas'
  },
  marble: {
    name: 'Calacatta & Carrara Marble',
    subtitle: 'Dramatic natural veining bookmatched for vanities, feature walls, and sculptural bars.',
    image: 'assets/images/media__1785265112058.jpg',
    porosity: 'Medium (Sealed)',
    heat: 'Moderate',
    bestFor: 'Vanities & Cladding'
  },
  dekton: {
    name: 'Dekton & Neolith Compacts',
    subtitle: 'Sintered ultracompact slabs impervious to UV rays, scratches, and thermal shock.',
    image: 'assets/images/media__1785265128736.jpg',
    porosity: 'Zero Absorption',
    heat: 'Fireproof / UV-Proof',
    bestFor: 'Commercial & Outdoor'
  }
};

function initSpecimenExplorer() {
  const tabs = document.querySelectorAll('.specimen-tab');
  const titleEl = document.getElementById('specimen-title');
  if (!tabs.length || !titleEl) return;

  const descEl = document.getElementById('specimen-desc');
  const imgEl = document.getElementById('specimen-img');
  const porosityEl = document.getElementById('specimen-porosity');
  const heatEl = document.getElementById('specimen-heat');
  const bestEl = document.getElementById('specimen-best');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-specimen');
      const data = SPECIMENS[key];
      if (!data) return;

      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      titleEl.textContent = data.name;
      if (descEl) descEl.textContent = data.subtitle;
      if (imgEl) {
        imgEl.src = data.image;
        imgEl.alt = data.name;
      }
      if (porosityEl) porosityEl.textContent = data.porosity;
      if (heatEl) heatEl.textContent = data.heat;
      if (bestEl) bestEl.textContent = data.bestFor;
    });
  });
}

function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach((item) => {
        const show = filterValue === 'all' || item.getAttribute('data-category') === filterValue;
        item.style.display = show ? 'block' : 'none';
      });
    });
  });
}

function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  let lightbox = document.querySelector('.lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image preview');
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" type="button" aria-label="Close image preview">&times;</button>
        <img class="lightbox-img" src="" alt="Project preview">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const imgEl = lightbox.querySelector('.lightbox-img');
  const captionEl = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  const close = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      const title = item.querySelector('h4')?.textContent || '';
      const desc = item.querySelector('p')?.textContent || '';
      imgEl.src = img.getAttribute('src');
      captionEl.innerHTML = `<strong>${title}</strong><br><span style="font-size:0.88rem; color:#9a9892;">${desc}</span>`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('active')) close(); });
}

function initBeforeAfterSlider() {
  const container = document.querySelector('.before-after-container');
  if (!container) return;

  const afterImg = container.querySelector('.after-img');
  const handle = container.querySelector('.slider-handle');
  const bar = container.querySelector('.slider-bar');
  let active = false;

  const setPos = (clientX) => {
    const rect = container.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    afterImg.style.clipPath = `inset(0 0 0 ${pct}%)`;
    handle.style.left = `${pct}%`;
    bar.style.left = `${pct}%`;
  };

  const down = (e) => {
    active = true;
    try { handle.setPointerCapture(e.pointerId); } catch (_) {}
    setPos(e.clientX);
    e.preventDefault();
  };
  const move = (e) => { if (active) setPos(e.clientX); };
  const up = (e) => {
    if (!active) return;
    active = false;
    try { handle.releasePointerCapture(e.pointerId); } catch (_) {}
  };

  [handle, container].forEach((el) => {
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
  });
}

const MATERIAL_PRICES = {
  granite: { label: 'Granite (Zimbabwean & Imported)', min: 140, max: 210, speed: '4-7 Days' },
  quartz: { label: 'Quartz & Caesarstone Surfaces', min: 200, max: 320, speed: '5-8 Days' },
  marble: { label: 'Classic Marble (Calacatta, Carrara)', min: 260, max: 420, speed: '6-9 Days' },
  dekton: { label: 'Dekton & Neolith Compacts', min: 380, max: 600, speed: '7-12 Days' }
};

const EDGE_FACTORS = {
  square: { label: 'Square Polished (Standard)', multiplier: 1.0 },
  bullnose: { label: 'Full Bullnose (Rounded)', multiplier: 1.15 },
  mitered: { label: 'Mitered Apron (Drop Edge)', multiplier: 1.3 }
};

function initEstimator() {
  const wizard = document.getElementById('estimator-wizard');
  if (!wizard) return;

  const steps = wizard.querySelectorAll('.calc-step');
  const prevBtn = wizard.querySelector('#prev-btn');
  const nextBtn = wizard.querySelector('#next-btn');
  const indicators = wizard.querySelectorAll('.indicator-item');

  let currentStep = 0;
  let selectedMaterial = 'quartz';
  let length = 3.0;
  let width = 0.6;
  let selectedEdge = 'square';
  let cutouts = 1;
  let includeAppliances = false;

  const calculateEstimate = () => {
    const mat = MATERIAL_PRICES[selectedMaterial] || MATERIAL_PRICES.quartz;
    const edge = EDGE_FACTORS[selectedEdge] || EDGE_FACTORS.square;
    const area = length * width;
    const cutoutCost = cutouts * 45;
    let minPrice = (area * mat.min * edge.multiplier) + cutoutCost + (includeAppliances ? 350 : 0);
    let maxPrice = (area * mat.max * edge.multiplier) + cutoutCost + (includeAppliances ? 600 : 0);

    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setText('res-min-price', `$${Math.round(minPrice)}`);
    setText('res-max-price', `$${Math.round(maxPrice)}`);
    setText('res-material', mat.label);
    setText('res-dimensions', `${length.toFixed(1)}m × ${width.toFixed(1)}m (${area.toFixed(2)} m²)`);
    setText('res-edge', edge.label);
    setText('res-cutouts', `${cutouts} Cutout(s)${includeAppliances ? ' + Appliances' : ''}`);
    setText('res-time', mat.speed);
  };

  wizard.querySelectorAll('.option-card').forEach((card) => {
    card.addEventListener('click', () => {
      card.parentNode.querySelectorAll('.option-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      const type = card.getAttribute('data-type');
      const val = card.getAttribute('data-value');
      if (type === 'material') selectedMaterial = val;
      if (type === 'edge') selectedEdge = val;
      calculateEstimate();
    });
  });

  const bindNum = (id, fn) => {
    const el = wizard.querySelector(id);
    if (el) el.addEventListener('input', (e) => { fn(e.target.value); calculateEstimate(); });
  };
  bindNum('#calc-length', (v) => { length = parseFloat(v) || 0; });
  bindNum('#calc-width', (v) => { width = parseFloat(v) || 0; });
  bindNum('#calc-cutouts', (v) => { cutouts = parseInt(v, 10) || 0; });
  const appEl = wizard.querySelector('#calc-appliances');
  if (appEl) appEl.addEventListener('change', (e) => { includeAppliances = e.target.checked; calculateEstimate(); });

  const updateStep = () => {
    steps.forEach((s, i) => s.classList.toggle('active', i === currentStep));
    indicators.forEach((ind, i) => ind.classList.toggle('active', i === currentStep));
    prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-flex';
    nextBtn.textContent = currentStep === steps.length - 1 ? 'Submit on WhatsApp' : 'Continue';
  };

  nextBtn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateStep();
    } else {
      const mat = MATERIAL_PRICES[selectedMaterial];
      const edge = EDGE_FACTORS[selectedEdge];
      const minP = document.getElementById('res-min-price')?.textContent || '$0';
      const maxP = document.getElementById('res-max-price')?.textContent || '$0';
      const msg = `Hi Vukuzenzele Granite Design, I calculated an online estimate:\n- Material: ${mat.label}\n- Dimensions: ${length.toFixed(1)}m x ${width.toFixed(1)}m\n- Edge: ${edge.label}\n- Cutouts: ${cutouts}\n- Range: ${minP} - ${maxP} USD`;
      window.open(`https://wa.me/263777441922?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    }
  });
  prevBtn.addEventListener('click', () => { if (currentStep > 0) { currentStep--; updateStep(); } });

  calculateEstimate();
  updateStep();
}
