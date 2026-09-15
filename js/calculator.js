/**
 * YAD Auto Industries - Real-time PKR Petrol vs EV Savings Calculator
 */

class SavingsCalculator {
  constructor() {
    this.dailyKm = 40;
    this.petrolPrice = 280; // PKR per liter
    this.petrolMileage = 40; // km per liter (standard 70cc)
    this.petrolMaintenancePerKm = 1.2; // PKR
    this.electricityRate = 48; // PKR per unit (kWh)
    this.evUnitsPer100Km = 1.8; // kWh per 100km
    this.evMaintenancePerKm = 0.15;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.calculateAndRender();
  }

  bindEvents() {
    const kmSlider = document.getElementById("calc-daily-km");
    const petrolInput = document.getElementById("calc-petrol-price");
    const bikeTypeRadios = document.querySelectorAll('input[name="calc-bike-type"]');

    if (kmSlider) {
      const updateKm = (val) => {
        this.dailyKm = Math.max(10, Math.min(150, parseFloat(val) || 40));
        kmSlider.value = this.dailyKm;
        const kmDisplay = document.getElementById("calc-km-val");
        if (kmDisplay) kmDisplay.textContent = `${this.dailyKm} km / day`;
        this.calculateAndRender();
      };

      kmSlider.addEventListener("input", (e) => updateKm(e.target.value));
      kmSlider.addEventListener("change", (e) => updateKm(e.target.value));
    }

    if (petrolInput) {
      const updatePetrol = (val) => {
        this.petrolPrice = Math.max(150, parseFloat(val) || 280);
        this.calculateAndRender();
      };
      petrolInput.addEventListener("input", (e) => updatePetrol(e.target.value));
      petrolInput.addEventListener("change", (e) => updatePetrol(e.target.value));
    }

    bikeTypeRadios.forEach(radio => {
      radio.addEventListener("change", (e) => {
        if (e.target.value === "70cc") {
          this.petrolMileage = 42;
          this.petrolMaintenancePerKm = 1.1;
        } else if (e.target.value === "125cc") {
          this.petrolMileage = 32;
          this.petrolMaintenancePerKm = 1.6;
        } else if (e.target.value === "loader") {
          this.petrolMileage = 18;
          this.petrolMaintenancePerKm = 2.5;
        }
        this.calculateAndRender();
      });
    });

    // Preset Commute Buttons if clicked
    document.querySelectorAll("[data-set-km]").forEach(btn => {
      btn.addEventListener("click", () => {
        const km = parseFloat(btn.getAttribute("data-set-km"));
        if (kmSlider) {
          kmSlider.value = km;
          kmSlider.dispatchEvent(new Event("input"));
        }
      });
    });
  }

  calculate() {
    // 1. Petrol Bike Costs
    const petrolFuelCostPerKm = this.petrolPrice / this.petrolMileage;
    const totalPetrolCostPerKm = petrolFuelCostPerKm + this.petrolMaintenancePerKm;
    
    const dailyPetrolCost = this.dailyKm * totalPetrolCostPerKm;
    const monthlyPetrolCost = dailyPetrolCost * 30;
    const yearlyPetrolCost = monthlyPetrolCost * 12;

    // 2. YAD Electric Scooty Costs
    const evElectricityCostPerKm = (this.evUnitsPer100Km * this.electricityRate) / 100;
    const totalEvCostPerKm = evElectricityCostPerKm + this.evMaintenancePerKm;

    const dailyEvCost = this.dailyKm * totalEvCostPerKm;
    const monthlyEvCost = dailyEvCost * 30;
    const yearlyEvCost = monthlyEvCost * 12;

    // 3. Savings
    const monthlySavings = Math.max(0, monthlyPetrolCost - monthlyEvCost);
    const yearlySavings = monthlySavings * 12;
    const threeYearSavings = yearlySavings * 3;

    // 4. Environmental Impact
    const yearlyCo2SavedKg = Math.round(this.dailyKm * 365 * 0.085);
    const treesEquivalent = Math.max(1, Math.round(yearlyCo2SavedKg / 21));

    return {
      dailyKm: this.dailyKm,
      petrolCostPerKm: totalPetrolCostPerKm.toFixed(2),
      evCostPerKm: totalEvCostPerKm.toFixed(2),
      monthlyPetrolCost: Math.round(monthlyPetrolCost),
      monthlyEvCost: Math.round(monthlyEvCost),
      monthlySavings: Math.round(monthlySavings),
      yearlySavings: Math.round(yearlySavings),
      threeYearSavings: Math.round(threeYearSavings),
      yearlyCo2SavedKg,
      treesEquivalent
    };
  }

  calculateAndRender() {
    const results = this.calculate();

    this.updateText("val-monthly-savings", `PKR ${results.monthlySavings.toLocaleString()}`);
    this.updateText("val-yearly-savings", `PKR ${results.yearlySavings.toLocaleString()}`);
    this.updateText("val-3yr-savings", `PKR ${results.threeYearSavings.toLocaleString()}`);
    
    this.updateText("val-petrol-monthly", `PKR ${results.monthlyPetrolCost.toLocaleString()}`);
    this.updateText("val-ev-monthly", `PKR ${results.monthlyEvCost.toLocaleString()}`);
    
    this.updateText("val-petrol-per-km", `Rs. ${results.petrolCostPerKm}`);
    this.updateText("val-ev-per-km", `Rs. ${results.evCostPerKm}`);

    this.updateText("val-co2-saved", `${results.yearlyCo2SavedKg.toLocaleString()} kg`);
    this.updateText("val-trees-count", `${results.treesEquivalent} Trees`);

    // Update comparison progress bar
    const petrolBar = document.getElementById("bar-petrol-cost");
    const evBar = document.getElementById("bar-ev-cost");
    
    if (petrolBar && evBar) {
      petrolBar.style.width = "100%";
      const evPercentage = Math.max(8, Math.min(100, (results.monthlyEvCost / (results.monthlyPetrolCost || 1)) * 100));
      evBar.style.width = `${evPercentage}%`;
    }
  }

  updateText(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = text;
    }
  }
}

// Instantiate immediately and export to window
window.savingsCalculator = new SavingsCalculator();
