/**
 * YAD Auto Industries - Main Application Orchestrator
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderProductsGrid("all");
  initProductTabs();
  renderDealersList();
  initDealerFilter();
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
  }

  // Active link spy on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
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
  if (!container) return;

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
          <button class="btn btn-sm btn-outline-light" onclick="window.vehicleVisualizer.setModel('${model.id}'); document.getElementById('visualizer').scrollIntoView({behavior: 'smooth'});">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Interactive 360 View
          </button>
        </div>
      </div>

      <div class="product-info">
        <div class="product-header">
          <div class="product-series">${model.series} Series</div>
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
            <button class="btn btn-sm btn-primary" onclick="window.formModalManager.openTestRideModal('${model.id}')">
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
   3. Dealerships & Showroom Network
   ========================================================================== */
function renderDealersList(filterCity = "all") {
  const container = document.getElementById("dealers-grid-container");
  if (!container) return;

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
        <button class="btn btn-xs btn-primary" onclick="window.formModalManager.openTestRideModal('ev2-7')">
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
   4. FAQs Accordion
   ========================================================================== */
function renderFaqs() {
  const container = document.getElementById("faq-accordion-container");
  if (!container) return;

  container.innerHTML = YAD_DATA.faqs.map((faq, idx) => `
    <div class="faq-item ${idx === 0 ? 'active' : ''}">
      <button class="faq-question" aria-expanded="${idx === 0 ? 'true' : 'false'}">
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

      // Close all
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
   5. Interactive Counters & Scroll Observer
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
  }, { threshold: 0.5 });

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

    el.textContent = `${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = `${target}${suffix}`;
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
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. WhatsApp Floating Quick Inquiry Widget
   ========================================================================== */
function initWhatsAppWidget() {
  const waBtn = document.getElementById("floating-whatsapp-btn");
  if (waBtn) {
    waBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const message = encodeURIComponent("Hello YAD Auto Industries! I am interested in purchasing an electric scooty / booking a test ride.");
      window.open(`https://wa.me/923001234567?text=${message}`, "_blank");
    });
  }

  // Back to top
  const backToTop = document.getElementById("back-to-top-btn");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
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
