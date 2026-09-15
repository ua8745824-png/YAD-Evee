/**
 * YAD Auto Industries - Interactive Forms, Modals & Toast Manager
 * Robust Event Delegation & Interactive Modal Orchestration
 */

class FormModalManager {
  constructor() {
    this.activeModal = null;
    this.init();
  }

  init() {
    this.bindDelegatedEvents();
    this.bindFormSubmissions();
    this.setupEscapeKey();
  }

  bindDelegatedEvents() {
    // Universal Global Click Delegation for all modal triggers and close buttons
    document.addEventListener("click", (e) => {
      // 1. Open Test Ride Modal Trigger
      const testRideTrigger = e.target.closest("[data-open-modal='test-ride']");
      if (testRideTrigger) {
        e.preventDefault();
        const modelId = testRideTrigger.getAttribute("data-model-id") || "ev2-7";
        this.openTestRideModal(modelId);
        return;
      }

      // 2. Open Dealership Modal Trigger
      const dealershipTrigger = e.target.closest("[data-open-modal='dealership']");
      if (dealershipTrigger) {
        e.preventDefault();
        this.openModal("modal-dealership");
        return;
      }

      // 3. Open Compare Specs Matrix Modal Trigger
      const compareTrigger = e.target.closest("[data-open-modal='compare']");
      if (compareTrigger) {
        e.preventDefault();
        this.openCompareModal();
        return;
      }

      // 4. Modal Close Buttons (X button or Backdrop)
      const closeTrigger = e.target.closest(".modal-close");
      if (closeTrigger) {
        e.preventDefault();
        this.closeAllModals();
        return;
      }

      if (e.target.classList.contains("modal-backdrop") || e.target.classList.contains("modal-container")) {
        this.closeAllModals();
        return;
      }
    });
  }

  openModal(modalId) {
    this.closeAllModals();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.classList.add("modal-open");
      this.activeModal = modal;

      // Focus first input if available
      setTimeout(() => {
        const firstInput = modal.querySelector("input, select, textarea");
        if (firstInput) firstInput.focus();
      }, 100);
    }
  }

  closeAllModals() {
    document.querySelectorAll(".modal-container").forEach(m => m.classList.remove("active"));
    document.body.classList.remove("modal-open");
    this.activeModal = null;
  }

  setupEscapeKey() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.activeModal) {
        this.closeAllModals();
      }
    });
  }

  openTestRideModal(defaultModelId) {
    const modelSelect = document.getElementById("tr-model-select");
    if (modelSelect && defaultModelId) {
      modelSelect.value = defaultModelId;
    }
    this.openModal("modal-test-ride");
  }

  openCompareModal() {
    this.renderCompareTable();
    this.openModal("modal-compare");
  }

  renderCompareTable() {
    const container = document.getElementById("compare-table-container");
    if (!container) return;

    const ev2Models = YAD_DATA.models.filter(m => m.series === "EV2");

    let tableHtml = `
      <div class="table-responsive" style="overflow-x: auto;">
        <table class="compare-table">
          <thead>
            <tr>
              <th class="feature-col">Feature / Specification</th>
              ${ev2Models.map(m => `
                <th class="model-col ${m.id === 'ev2-7' ? 'flagship-col' : ''}">
                  <span class="badge ${m.id === 'ev2-7' ? 'badge-gold' : 'badge-green'}">${m.badge}</span>
                  <h4 style="margin: 0.4rem 0; font-size: 1.15rem; color: #fff;">${m.name}</h4>
                  <div class="compare-img-wrap">
                    <img src="${m.image}" alt="${m.name}" style="max-height: 85px; object-fit: contain; margin: 0.4rem auto;" />
                  </div>
                  <div class="compare-price" style="font-weight: 800; color: var(--gold);">${m.estimatedPrice}</div>
                  <button type="button" class="btn btn-xs btn-primary mt-2" data-open-modal="test-ride" data-model-id="${m.id}" style="margin-top: 0.5rem;">
                    Book Ride
                  </button>
                </th>
              `).join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="feature-title">Top Speed</td>
              ${ev2Models.map(m => `<td><strong>${m.topSpeed} ${m.speedUnit}</strong></td>`).join("")}
            </tr>
            <tr>
              <td class="feature-title">Motor Power</td>
              ${ev2Models.map(m => `<td>${m.motorPower}</td>`).join("")}
            </tr>
            <tr>
              <td class="feature-title">Battery Chemistry</td>
              ${ev2Models.map(m => `<td><span class="badge ${m.batteryType.includes('LiFePO4') ? 'badge-gold' : 'badge-green'}">${m.batteryType.includes('LiFePO4') ? 'LiFePO4 Lithium' : 'Graphene Max'}</span></td>`).join("")}
            </tr>
            <tr>
              <td class="feature-title">Battery Voltage & Capacity</td>
              ${ev2Models.map(m => `<td>${m.batterySpecs}</td>`).join("")}
            </tr>
            <tr>
              <td class="feature-title">Estimated Range</td>
              ${ev2Models.map(m => `<td><strong>${m.range}</strong></td>`).join("")}
            </tr>
            <tr>
              <td class="feature-title">Charging Time</td>
              ${ev2Models.map(m => `<td>${m.chargingTime}</td>`).join("")}
            </tr>
            <tr>
              <td class="feature-title">Braking System</td>
              ${ev2Models.map(m => `<td>${m.brakes}</td>`).join("")}
            </tr>
            <tr>
              <td class="feature-title">Gradeability (Climbing)</td>
              ${ev2Models.map(m => `<td>${m.climbingAngle}</td>`).join("")}
            </tr>
            <tr>
              <td class="feature-title">Instrument Cluster</td>
              ${ev2Models.map(m => `<td>${m.instrumentCluster}</td>`).join("")}
            </tr>
            <tr>
              <td class="feature-title">Warranty Coverage</td>
              ${ev2Models.map(m => `<td>${m.id === 'ev2-7' ? '3 Years LiFePO4' : '1 Year Graphene / 2 Yrs Motor'}</td>`).join("")}
            </tr>
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = tableHtml;
  }

  bindFormSubmissions() {
    // 1. Test Ride Form Submit
    const testRideForm = document.getElementById("form-test-ride");
    if (testRideForm) {
      testRideForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(testRideForm);
        const name = formData.get("fullName") || "Valued Customer";
        const phone = formData.get("phone") || "";
        const city = formData.get("city") || "Lahore";
        const model = formData.get("model") || "YAD EV";

        this.showToast(`🎉 Test Ride Booked! Our ${city} team will contact ${name} (${phone}) to confirm your test ride.`, "success");
        testRideForm.reset();
        this.closeAllModals();
      });
    }

    // 2. Dealership Proposal Form Submit
    const dealershipForm = document.getElementById("form-dealership");
    if (dealershipForm) {
      dealershipForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(dealershipForm);
        const applicantName = formData.get("applicantName") || "Partner";
        const city = formData.get("dealershipCity") || "your city";

        this.showToast(`💼 Proposal Received! Our Head Office Executive Team in Lahore will review your franchise request for ${city} and reach out within 24 hours.`, "success");
        dealershipForm.reset();
        this.closeAllModals();
      });
    }

    // 3. Contact Us Inquiry Form
    const contactForm = document.getElementById("form-contact-main");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameInput = contactForm.querySelector("input[name='name']");
        const name = nameInput ? nameInput.value : "Customer";
        this.showToast(`✉️ Thank you ${name}! Your inquiry has been dispatched to YAD Auto Industries Head Office.`, "success");
        contactForm.reset();
      });
    }
  }

  showToast(message, type = "info") {
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toast-container";
      toastContainer.className = "toast-container";
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = `toast-message toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content" style="display: flex; align-items: center; gap: 0.6rem;">
        <span>${message}</span>
      </div>
      <button class="toast-close" type="button" aria-label="Close notification">&times;</button>
    `;

    toast.querySelector(".toast-close").addEventListener("click", () => {
      toast.remove();
    });

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-fade-out");
      setTimeout(() => toast.remove(), 400);
    }, 5000);
  }
}

// Instantiate immediately and export to window
window.formModalManager = new FormModalManager();
