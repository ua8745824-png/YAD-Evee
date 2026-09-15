/**
 * YAD Auto Industries - Interactive Color & Model Visualizer HUD
 */

class VehicleVisualizer {
  constructor() {
    this.selectedModelId = "ev2-7";
    this.selectedColorIndex = 0;
    this.isSoundPlaying = false;
    this.audioContext = null;
    
    this.init();
  }

  init() {
    this.renderModelSelector();
    this.updateVisualizer();
    this.bindEvents();
  }

  getCurrentModel() {
    return YAD_DATA.models.find(m => m.id === this.selectedModelId) || YAD_DATA.models[0];
  }

  renderModelSelector() {
    const selectorContainer = document.getElementById("visualizer-model-tabs");
    if (!selectorContainer) return;

    selectorContainer.innerHTML = YAD_DATA.models
      .filter(m => m.series === "EV2")
      .map(model => `
        <button class="vis-tab-btn ${model.id === this.selectedModelId ? 'active' : ''}" data-model="${model.id}">
          <span class="vis-tab-name">${model.name}</span>
          <span class="vis-tab-badge">${model.badge}</span>
        </button>
      `).join("");

    selectorContainer.querySelectorAll(".vis-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const modelId = btn.getAttribute("data-model");
        this.setModel(modelId);
      });
    });
  }

  setModel(modelId) {
    this.selectedModelId = modelId;
    this.selectedColorIndex = 0;
    
    // Update tab active state
    document.querySelectorAll(".vis-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-model") === modelId);
    });

    this.updateVisualizer();
  }

  setColor(index) {
    this.selectedColorIndex = index;
    this.updateColorSwatches();
    this.updateScooterDisplay();
  }

  updateVisualizer() {
    const model = this.getCurrentModel();
    if (!model) return;

    // 1. Update Title and Tagline
    const titleEl = document.getElementById("vis-model-title");
    const taglineEl = document.getElementById("vis-model-tagline");
    const badgeEl = document.getElementById("vis-model-badge");
    const priceEl = document.getElementById("vis-model-price");

    if (titleEl) titleEl.textContent = model.name;
    if (taglineEl) taglineEl.textContent = model.tagline;
    if (badgeEl) badgeEl.textContent = model.badge;
    if (priceEl) priceEl.textContent = model.estimatedPrice;

    // 2. Update HUD Specs
    this.updateHUD("vis-stat-speed", `${model.topSpeed} ${model.speedUnit}`);
    this.updateHUD("vis-stat-range", model.range);
    this.updateHUD("vis-stat-motor", model.motorPower);
    this.updateHUD("vis-stat-battery", model.batteryType);
    this.updateHUD("vis-stat-charging", model.chargingTime);
    this.updateHUD("vis-stat-brakes", model.brakes);

    // 3. Render Color Swatches
    this.renderColorSwatches(model);

    // 4. Update scooter image & underglow
    this.updateScooterDisplay();
  }

  renderColorSwatches(model) {
    const swatchesContainer = document.getElementById("vis-color-swatches");
    if (!swatchesContainer) return;

    swatchesContainer.innerHTML = model.colors.map((color, idx) => `
      <button class="color-swatch-btn ${idx === this.selectedColorIndex ? 'active' : ''}" 
              data-index="${idx}" 
              title="${color.name}"
              style="--color-accent: ${color.hex}">
        <span class="swatch-circle" style="background: ${color.hex}; border: 2px solid ${color.accent}"></span>
        <span class="swatch-label">${color.name}</span>
      </button>
    `).join("");

    swatchesContainer.querySelectorAll(".color-swatch-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"), 10);
        this.setColor(idx);
      });
    });
  }

  updateColorSwatches() {
    document.querySelectorAll(".color-swatch-btn").forEach((btn, idx) => {
      btn.classList.toggle("active", idx === this.selectedColorIndex);
    });
  }

  updateScooterDisplay() {
    const model = this.getCurrentModel();
    const currentColor = model.colors[this.selectedColorIndex] || model.colors[0];
    const imgEl = document.getElementById("vis-scooter-img");
    const glowEl = document.getElementById("vis-underglow");

    if (imgEl) {
      imgEl.style.opacity = "0.7";
      imgEl.style.transform = "scale(0.98)";
      setTimeout(() => {
        imgEl.src = currentColor.image || model.image;
        imgEl.alt = `${model.name} in ${currentColor.name}`;
        imgEl.style.opacity = "1";
        imgEl.style.transform = "scale(1)";
      }, 150);
    }

    if (glowEl) {
      glowEl.style.boxShadow = `0 0 80px 25px ${currentColor.hex}40`;
    }
  }

  updateHUD(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = text;
      el.classList.add("pulse-highlight");
      setTimeout(() => el.classList.remove("pulse-highlight"), 400);
    }
  }

  bindEvents() {
    // Sound Experience simulation
    const soundToggle = document.getElementById("vis-sound-toggle");
    if (soundToggle) {
      soundToggle.addEventListener("click", () => {
        this.toggleElectricSound(soundToggle);
      });
    }

    // Quick Book Button in Visualizer
    const bookBtn = document.getElementById("vis-book-btn");
    if (bookBtn) {
      bookBtn.addEventListener("click", () => {
        const model = this.getCurrentModel();
        if (window.formModalManager) {
          window.formModalManager.openTestRideModal(model.id);
        }
      });
    }
  }

  toggleElectricSound(btn) {
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioCtx();
      }

      if (this.isSoundPlaying) {
        if (this.currentOscillator) {
          this.currentOscillator.stop();
          this.currentOscillator.disconnect();
        }
        this.isSoundPlaying = false;
        btn.innerHTML = `<i class="icon-volume-off"></i> <span>Play EV Motor Sound</span>`;
        btn.classList.remove("sound-active");
      } else {
        // Synthesize smooth high-frequency EV electric motor whine
        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(140, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(780, this.audioContext.currentTime + 1.8);
        osc.frequency.exponentialRampToValueAtTime(420, this.audioContext.currentTime + 3.5);

        gainNode.gain.setValueAtTime(0.01, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.12, this.audioContext.currentTime + 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 4.0);

        osc.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        osc.start();
        osc.stop(this.audioContext.currentTime + 4.0);
        this.currentOscillator = osc;
        this.isSoundPlaying = true;
        btn.innerHTML = `<i class="icon-volume-up"></i> <span>Silent Electric Glide Playing...</span>`;
        btn.classList.add("sound-active");

        setTimeout(() => {
          this.isSoundPlaying = false;
          btn.innerHTML = `<i class="icon-volume-off"></i> <span>Play EV Motor Sound</span>`;
          btn.classList.remove("sound-active");
        }, 4000);
      }
    } catch (err) {
      console.warn("Audio synthesis not supported or blocked", err);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.vehicleVisualizer = new VehicleVisualizer();
});
