/**
 * YAD Auto Industries - Real-time PKR Petrol vs EV Savings Calculator
 */

class SavingsCalculator {
  constructor() {
    this.dailyKm = 40;
    this.petrolPrice = 280; // PKR per liter
    this.petrolMileage = 40; // km per liter (standard 70cc / 100cc)
    this.petrolMaintenancePerKm = 1.2; // PKR (oil changes, plugs, chains, filters)
    this.electricityRate = 48; // PKR per unit (kWh)
    this.evUnitsPer100Km = 1.8; // kWh per 100km
    this.evMaintenancePerKm = 0.15; // minimal brake pads/tires
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.calculateAndRender();
  }

  bindEvents() {
    const kmSlider = document.getElementById("calc-daily-km");
    const kmDisplay = document.getElementById("calc-km-val");
    const petrolInput = document.getElementById("calc-petrol-price");
    const bikeTypeRadios = document.querySelectorAll('input[name="calc-bike-type"]');

    if (kmSlider) {
      kmSlider.addEventListener("input", (e) => {
        this.dailyKm = parseFloat(e.target.value) || 30;
        if (kmDisplay) kmDisplay.textContent = `${this.dailyKm} km / day`;
        this.calculateAndRender();
      });
    }

    if (petrolInput) {
      petrolInput.addEventListener("input", (e) => {
        this.petrolPrice = parseFloat(e.target.value) || 280;
        this.calculateAndRender();
      });
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
    const monthlySavings = monthlyPetrolCost - monthlyEvCost;
    const yearlySavings = yearlyPetrolCost - yearlyEvCost;
    const threeYearSavings = yearlySavings * 3;

    // 4. Environmental Impact (approx. 0.085 kg CO2 per km from petrol bike)
    const yearlyCo2SavedKg = Math.round(this.dailyKm * 365 * 0.085);
    const treesEquivalent = Math.max(1, Math.round(yearlyCo2SavedKg / 21)); // 1 mature tree absorbs ~21kg CO2/year

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

    // Update DOM elements with animated formatting
    this.updateText("val-monthly-savings", `PKR ${results.monthlySavings.toLocaleString()}`);
    this.updateText("val-yearly-savings", `PKR ${results.yearlySavings.toLocaleString()}`);
    this.updateText("val-3yr-savings", `PKR ${results.threeYearSavings.toLocaleString()}`);
    
    this.updateText("val-petrol-monthly", `PKR ${results.monthlyPetrolCost.toLocaleString()}`);
    this.updateText("val-ev-monthly", `PKR ${results.monthlyEvCost.toLocaleString()}`);
    
    this.updateText("val-petrol-per-km", `Rs. ${results.petrolCostPerKm}`);
    this.updateText("val-ev-per-km", `Rs. ${results.evCostPerKm}`);

    this.updateText("val-co2-saved", `${results.yearlyCo2SavedKg} kg`);
    this.updateText("val-trees-count", `${results.treesEquivalent} Trees`);

    // Update comparison progress bar
    const petrolBar = document.getElementById("bar-petrol-cost");
    const evBar = document.getElementById("bar-ev-cost");
    
    if (petrolBar && evBar) {
      petrolBar.style.width = "100%";
      const evPercentage = Math.max(8, Math.min(100, (results.monthlyEvCost / results.monthlyPetrolCost) * 100));
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

document.addEventListener("DOMContentLoaded", () => {
  window.savingsCalculator = new SavingsCalculator();
});
