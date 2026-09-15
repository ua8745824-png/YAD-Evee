/**
 * YAD Auto Industries - Main Application Orchestrator
 * Comprehensive automotive-grade rendering & interactivity
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderProductsGrid("all");
  initProductTabs();
  renderWhyYad();
  renderServiceSupport();
  renderDealersList("all");
  initDealerFilter();
  renderNewsGrid();
  renderFaqs();
  initScrollAnimations();
  initStatsCounters();
  initWhatsAppWidget();
});

/* ==========================================================================
   1. Navigation & Mobile Drawer
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector(".site-header");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navDrawer = document.getElementById("mobile-nav-drawer");
  const navLinks = document.querySelectorAll(".nav-link, .drawer-link");

  // Sticky navbar on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // Mobile drawer toggle
  if (mobileToggle && navDrawer) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navDrawer.classList.contains("open");
      if (isOpen) {
        navDrawer.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      } else {
        navDrawer.classList.add("open");
        mobileToggle.setAttribute("aria-expanded", "true");
      }
    });

    // Close mobile drawer when clicking a link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navDrawer.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close mobile drawer when clicking outside
    document.addEventListener("click", (e) => {
      if (!navDrawer.contains(e.target) && !mobileToggle.contains(e.target) && navDrawer.classList.contains("open")) {
        navDrawer.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active link spy on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll(`.nav-link[href*="#${sectionId}"]`).forEach(el => {
          el.classList.add("active");
        });
      } else {
        document.querySelectorAll(`.nav-link[href*="#${sectionId}"]`).forEach(el => {
          el.classList.remove("active");
        });
      }
    });
  });
}

/* ==========================================================================
   2. Products Lineup Grid & Filtering
   ========================================================================== */
function renderProductsGrid(filterCategory = "all") {
  const container = document.getElementById("products-grid-container");
  if (!container || !window.YAD_DATA) return;

  const filtered = YAD_DATA.models.filter(m => {
    if (filterCategory === "all") return true;
    if (filterCategory === "2-wheeler") return m.category === "2-wheeler";
    if (filterCategory === "3-wheeler") return m.category === "3-wheeler";
    return true;
  });

  container.innerHTML = filtered.map(model => `
    <div class="product-card ${model.id === 'ev2-7' ? 'card-featured' : ''}" data-model-id="${model.id}">
      <div class="card-glow-border"></div>
      <div class="card-badge-wrap">
        <span class="badge ${model.id === 'ev2-7' ? 'badge-gold' : 'badge-green'}">${model.badge}</span>
        ${model.payloadCapacity ? `<span class="badge badge-cyan">${model.payloadCapacity}</span>` : ''}
      </div>

      <div class="product-img-wrapper">
        <img src="${model.image}" alt="${model.name}" loading="lazy" class="product-img" />
        <div class="product-hover-overlay">
          <button type="button" class="btn btn-sm btn-outline-light" onclick="if(window.vehicleVisualizer){ window.vehicleVisualizer.setModel('${model.id}'); document.getElementById('visualizer').scrollIntoView({behavior: 'smooth'}); }">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Interactive 360 View
          </button>
        </div>
      </div>

      <div class="product-info">
        <div class="product-header">
          <div class="product-series">${model.series}</div>
          <h3 class="product-name">${model.name}</h3>
          <p class="product-tagline">${model.tagline}</p>
        </div>

        <div class="product-specs-grid">
          <div class="spec-box">
            <span class="spec-label">Top Speed</span>
            <span class="spec-value">${model.topSpeed} <small>${model.speedUnit}</small></span>
          </div>
          <div class="spec-box">
            <span class="spec-label">Max Range</span>
            <span class="spec-value">${model.range}</span>
          </div>
          <div class="spec-box">
            <span class="spec-label">Motor Power</span>
            <span class="spec-value">${model.motorPower}</span>
          </div>
          <div class="spec-box">
            <span class="spec-label">Battery Tech</span>
            <span class="spec-value">${model.batteryType.includes('LiFePO4') ? 'LiFePO4' : 'Graphene'}</span>
          </div>
        </div>

        <div class="product-highlights">
          ${model.features.slice(0, 2).map(f => `
            <div class="highlight-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00f098" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${f}</span>
            </div>
          `).join("")}
        </div>

        <div class="product-footer">
          <div class="price-wrap">
            <span class="price-label">Starting from</span>
            <span class="price-val">${model.estimatedPrice}</span>
          </div>
          <div class="product-cta-group">
            <button type="button" class="btn btn-sm btn-primary" data-open-modal="test-ride" data-model-id="${model.id}">
              Book Test Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

function initProductTabs() {
  const tabs = document.querySelectorAll(".products-filter-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.getAttribute("data-category");
      renderProductsGrid(category);
    });
  });
}

/* ==========================================================================
   3. Why YAD - 6 Brand Pillars
   ========================================================================== */
function renderWhyYad() {
  const container = document.getElementById("why-yad-grid-container");
  if (!container || !window.YAD_DATA || !YAD_DATA.whyYAD) return;

  const iconSvgMap = {
    factory: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f098" stroke-width="2"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>`,
    battery: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f098" stroke-width="2"><rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/><polyline points="7 12 11 9 10 15 14 12"/></svg>`,
    savings: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f098" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>`,
    shield: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f098" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    support: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f098" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    leaf: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f098" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`
  };

  container.innerHTML = YAD_DATA.whyYAD.map(item => `
    <div class="why-card">
      <div class="why-card-icon">
        ${iconSvgMap[item.icon] || iconSvgMap.factory}
      </div>
      <h3 class="why-card-title">${item.title}</h3>
      <p class="why-card-desc">${item.desc}</p>
    </div>
  `).join("");
}

/* ==========================================================================
   4. Service & Warranty Support
   ========================================================================== */
function renderServiceSupport() {
  const container = document.getElementById("support-grid-container");
  if (!container || !window.YAD_DATA || !YAD_DATA.serviceSupport) return;

  const supportIcons = [
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00f098" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>`,
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
  ];

  container.innerHTML = YAD_DATA.serviceSupport.map((item, idx) => `
    <div class="support-card">
      <div class="support-card-header">
        <div class="support-icon">
          ${supportIcons[idx] || supportIcons[0]}
        </div>
        <h3 class="support-title">${item.title}</h3>
      </div>
      <p class="support-desc">${item.desc}</p>
    </div>
  `).join("");
}

/* ==========================================================================
   5. Dealerships & Showroom Network
   ========================================================================== */
function renderDealersList(filterCity = "all") {
  const container = document.getElementById("dealers-grid-container");
  if (!container || !window.YAD_DATA || !YAD_DATA.dealers) return;

  const filtered = YAD_DATA.dealers.filter(d => {
    if (filterCity === "all") return true;
    return d.city.toLowerCase().includes(filterCity.toLowerCase());
  });

  container.innerHTML = filtered.map(dealer => `
    <div class="dealer-card">
      <div class="dealer-header">
        <span class="badge ${dealer.type.includes('Head Office') || dealer.type.includes('Factory') ? 'badge-gold' : 'badge-green'}">${dealer.type}</span>
        <h4 class="dealer-name">${dealer.name}</h4>
      </div>
      <div class="dealer-body">
        <p class="dealer-address">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${dealer.address}
        </p>
        <p class="dealer-phone">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00f098" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <a href="tel:${dealer.phone}">${dealer.phone}</a>
        </p>
        <p class="dealer-timing">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${dealer.timing}
        </p>
      </div>
      <div class="dealer-footer">
        <a href="https://maps.google.com/?q=${encodeURIComponent(dealer.address)}" target="_blank" rel="noopener" class="btn btn-xs btn-outline-light">
          Get Directions ↗
        </a>
        <button type="button" class="btn btn-xs btn-primary" data-open-modal="test-ride" data-model-id="ev2-7">
          Visit Showroom
        </button>
      </div>
    </div>
  `).join("");
}

function initDealerFilter() {
  const filterBtns = document.querySelectorAll(".dealer-city-pill");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const city = btn.getAttribute("data-city");
      renderDealersList(city);
    });
  });
}

/* ==========================================================================
   6. News & EV Insights
   ========================================================================== */
function renderNewsGrid() {
  const container = document.getElementById("news-grid-container");
  if (!container || !window.YAD_DATA || !YAD_DATA.newsUpdates) return;

  container.innerHTML = YAD_DATA.newsUpdates.map(item => `
    <div class="news-card">
      <div class="news-meta">
        <span class="news-date">${item.date}</span>
        <span class="badge badge-gold">${item.tag}</span>
      </div>
      <h3 class="news-title">${item.title}</h3>
      <p class="news-desc">${item.desc}</p>
    </div>
  `).join("");
}

/* ==========================================================================
   7. FAQs Accordion
   ========================================================================== */
function renderFaqs() {
  const container = document.getElementById("faq-accordion-container");
  if (!container || !window.YAD_DATA || !YAD_DATA.faqs) return;

  container.innerHTML = YAD_DATA.faqs.map((faq, idx) => `
    <div class="faq-item ${idx === 0 ? 'active' : ''}">
      <button type="button" class="faq-question" aria-expanded="${idx === 0 ? 'true' : 'false'}">
        <span>${faq.q}</span>
        <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="faq-answer">
        <div class="faq-answer-inner">
          <p>${faq.a}</p>
        </div>
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".faq-question").forEach(qBtn => {
    qBtn.addEventListener("click", () => {
      const parent = qBtn.parentElement;
      const wasActive = parent.classList.contains("active");

      container.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("active");
        item.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      });

      if (!wasActive) {
        parent.classList.add("active");
        qBtn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* ==========================================================================
   8. Interactive Counters & Scroll Observer
   ========================================================================== */
function initStatsCounters() {
  const counters = document.querySelectorAll(".counter-val");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseFloat(entry.target.getAttribute("data-target"));
        const suffix = entry.target.getAttribute("data-suffix") || "";
        animateCounter(entry.target, target, suffix);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1600;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeProgress * target);

    el.textContent = `${current.toLocaleString()}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = `${target.toLocaleString()}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}

function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".fade-up-element");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   9. WhatsApp Floating Quick Inquiry Widget & Back to Top
   ========================================================================== */
function initWhatsAppWidget() {
  const backToTop = document.getElementById("back-to-top-btn");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
