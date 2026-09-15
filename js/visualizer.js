/**
 * YAD Auto Industries - Interactive Color & Model Visualizer HUD
 * Dynamic Vehicle Switching & Visual Hue/Glow Synthesis
 */

class VehicleVisualizer {
  constructor() {
    this.selectedModelId = "ev2-7";
    this.selectedColorIndex = 0;
    this.isSoundPlaying = false;
    this.audioContext = null;
    this.currentOscillator = null;
    
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
        <button type="button" class="vis-tab-btn ${model.id === this.selectedModelId ? 'active' : ''}" data-model="${model.id}">
          <span class="vis-tab-name">${model.name}</span>
          <span class="vis-tab-badge">${model.badge}</span>
        </button>
      `).join("");

    selectorContainer.querySelectorAll(".vis-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
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
    this.updateHUD("vis-stat-battery", model.batteryType.includes('LiFePO4') ? 'LiFePO4 Lithium' : 'Graphene Max');
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
      <button type="button" class="color-swatch-btn ${idx === this.selectedColorIndex ? 'active' : ''}" 
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

        // Dynamic visual tint per selected color swatch
        if (currentColor.name.includes("Black") || currentColor.name.includes("Obsidian") || currentColor.name.includes("Carbon")) {
          imgEl.style.filter = "contrast(1.15) brightness(0.9)";
        } else if (currentColor.name.includes("Red") || currentColor.name.includes("Crimson")) {
          imgEl.style.filter = "hue-rotate(180deg) saturate(1.2)";
        } else if (currentColor.name.includes("Cyan") || currentColor.name.includes("Blue") || currentColor.name.includes("Navy")) {
          imgEl.style.filter = "hue-rotate(50deg) saturate(1.1)";
        } else if (currentColor.name.includes("White") || currentColor.name.includes("Pearl")) {
          imgEl.style.filter = "brightness(1.08) contrast(1.05)";
        } else {
          imgEl.style.filter = "none";
        }

        imgEl.style.opacity = "1";
        imgEl.style.transform = "scale(1)";
      }, 120);
    }

    if (glowEl) {
      glowEl.style.background = `radial-gradient(ellipse at center, ${currentColor.hex}90 0%, ${currentColor.hex}00 70%)`;
      glowEl.style.boxShadow = `0 0 70px 20px ${currentColor.hex}50`;
    }
  }

  updateHUD(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = text;
      el.classList.add("pulse-highlight");
      setTimeout(() => el.classList.remove("pulse-highlight"), 350);
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

  async toggleElectricSound(btn) {
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioCtx();
      }

      if (this.audioContext.state === "suspended") {
        await this.audioContext.resume();
      }

      if (this.isSoundPlaying) {
        if (this.currentOscillator) {
          try { this.currentOscillator.stop(); } catch (e) {}
          this.currentOscillator.disconnect();
        }
        this.isSoundPlaying = false;
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> <span>Play EV Motor Sound</span>`;
        btn.classList.remove("sound-active");
      } else {
        // Synthesize smooth futuristic EV electric motor glide
        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(160, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(820, this.audioContext.currentTime + 1.6);
        osc.frequency.exponentialRampToValueAtTime(460, this.audioContext.currentTime + 3.2);

        gainNode.gain.setValueAtTime(0.01, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.4);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 3.8);

        osc.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        osc.start();
        osc.stop(this.audioContext.currentTime + 3.8);
        this.currentOscillator = osc;
        this.isSoundPlaying = true;
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f098" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> <span>Silent Electric Glide Playing...</span>`;
        btn.classList.add("sound-active");

        setTimeout(() => {
          this.isSoundPlaying = false;
          btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> <span>Play EV Motor Sound</span>`;
          btn.classList.remove("sound-active");
        }, 3800);
      }
    } catch (err) {
      console.warn("Audio synthesis error:", err);
    }
  }
}

// Instantiate immediately and export to window
window.vehicleVisualizer = new VehicleVisualizer();
