/**
 * YAD Auto Industries - Interactive Forms, Modals & Toast Manager
 */

class FormModalManager {
  constructor() {
    this.activeModal = null;
    this.init();
  }

  init() {
    this.bindTriggers();
    this.bindFormSubmissions();
    this.setupEscapeKey();
  }

  bindTriggers() {
    // Open Test Ride Modal Buttons
    document.querySelectorAll("[data-open-modal='test-ride']").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const modelId = btn.getAttribute("data-model-id") || "ev2-7";
        this.openTestRideModal(modelId);
      });
    });

    // Open Dealership Proposal Modal Buttons
    document.querySelectorAll("[data-open-modal='dealership']").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openModal("modal-dealership");
      });
    });

    // Open Model Compare Modal
    document.querySelectorAll("[data-open-modal='compare']").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openCompareModal();
      });
    });

    // Close Modal Buttons
    document.querySelectorAll(".modal-close, .modal-backdrop").forEach(el => {
      el.addEventListener("click", (e) => {
        if (e.target === el) {
          this.closeAllModals();
        }
      });
    });
  }

  openModal(modalId) {
    this.closeAllModals();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.classList.add("modal-open");
      this.activeModal = modal;
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
      <div class="table-responsive">
        <table class="compare-table">
          <thead>
            <tr>
              <th class="feature-col">Feature / Specification</th>
              ${ev2Models.map(m => `
                <th class="model-col ${m.id === 'ev2-7' ? 'flagship-col' : ''}">
                  <span class="compare-badge">${m.badge}</span>
                  <h4>${m.name}</h4>
                  <div class="compare-img-wrap">
                    <img src="${m.image}" alt="${m.name}" />
                  </div>
                  <div class="compare-price">${m.estimatedPrice}</div>
                  <button class="btn btn-sm btn-primary mt-2" onclick="window.formModalManager.openTestRideModal('${m.id}')">Book Ride</button>
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
              ${ev2Models.map(m => `<td><span class="badge ${m.batteryType.includes('LiFePO4') ? 'badge-gold' : 'badge-green'}">${m.batteryType}</span></td>`).join("")}
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
              ${ev2Models.map(m => `<td>${m.id === 'ev2-7' ? '3 Years Battery' : '1 Year Graphene / 2 Yrs Motor'}</td>`).join("")}
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
        const name = formData.get("fullName") || "Customer";
        const phone = formData.get("phone");
        const city = formData.get("city");
        const model = formData.get("model");

        this.showToast(`🎉 Test Ride Booked! Our ${city} team will contact ${name} at ${phone} to confirm your slot.`, "success");
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
        const city = formData.get("dealershipCity");

        this.showToast(`💼 Dealership Proposal Received! Our Head Office Executive Team will review your application for ${city} and reach out within 24 hours.`, "success");
        dealershipForm.reset();
        this.closeAllModals();
      });
    }

    // 3. Quick Newsletter / Brochure Download Form
    const brochureForm = document.getElementById("form-brochure");
    if (brochureForm) {
      brochureForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.showToast("📄 YAD Auto 2025/2026 Complete EV Catalog is downloading...", "success");
        brochureForm.reset();
      });
    }

    // 4. Contact Us Inquiry Form
    const contactForm = document.getElementById("form-contact-main");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.showToast("✉️ Thank you! Your inquiry has been dispatched to YAD Auto Industries Head Office.", "success");
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
      <div class="toast-content">
        <span>${message}</span>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-fade-out");
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.formModalManager = new FormModalManager();
});
