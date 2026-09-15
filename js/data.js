/**
 * YAD Auto Industries - Product and Dealer Data Module
 */

const YAD_DATA = {
  company: {
    name: "YAD Auto Industries (Pvt.) Ltd.",
    tagline: "Pakistan's Leading Manufacturer of Electric Bikes & Commercial EVs",
    mission: "Committed to a greener, cleaner Pakistan with 100% environment-friendly, zero-emission electric mobility.",
    headOffice: "Mohalla Tariq Abad, Main Multan Road Bypass, Manga Mandi, Lahore, Pakistan",
    factory: "91-B Sunder Small Industrial Estate, Lahore, Pakistan",
    phone: "+92 42 3594 4000",
    whatsapp: "+923001234567",
    email: "info@yadpk.com",
    salesEmail: "sales@yadpk.com",
    establishedYear: "2020",
    warrantyYears: "3 Years"
  },

  models: [
    {
      id: "ev2-7",
      series: "EV2",
      category: "2-wheeler",
      badge: "Flagship Sport EV",
      name: "YAD EV2-7",
      tagline: "Ultra-Performance Sport Electric Scooter",
      image: "assets/images/hero_scooty.jpg",
      topSpeed: 130,
      speedUnit: "km/h",
      motorPower: "3,000 W",
      motorType: "High-Torque Brushless PMSM Hub Motor",
      batteryType: "Lithium Iron Phosphate (LiFePO4)",
      batterySpecs: "60V – 50AH",
      range: "110 – 130 km",
      chargingTime: "3.5 – 4.5 hrs (Fast Charge)",
      brakes: "Dual Hydraulic Disc with Regenerative ABS",
      tireSize: "12-inch Tubeless Alloy Grip",
      climbingAngle: "25° Steep Incline Ready",
      instrumentCluster: "7\" Smart TFT Color Screen with Bluetooth",
      estimatedPrice: "PKR 385,000",
      featured: true,
      colors: [
        { name: "Cyber Emerald", hex: "#00f098", accent: "#059669", image: "assets/images/hero_scooty.jpg" },
        { name: "Obsidian Black", hex: "#18181b", accent: "#27272a", image: "assets/images/hero_scooty.jpg" },
        { name: "Titanium Slate", hex: "#64748b", accent: "#475569", image: "assets/images/hero_scooty.jpg" }
      ],
      features: [
        "Lithium LiFePO4 Ultra-Safe Chemistry (2,500+ Charge Cycles)",
        "3000W Beast Motor reaching 0-50 km/h in 3.8s",
        "Regenerative Braking returning up to 12% power",
        "Smart App Connectivity (GPS, Anti-Theft Alarm, Geo-fencing)",
        "IP67 Water & Dust Resistance Rating"
      ]
    },
    {
      id: "ev2-6",
      series: "EV2",
      category: "2-wheeler",
      badge: "Long Range Cruiser",
      name: "YAD EV2-6",
      tagline: "Rugged Power & Extended Range for Daily Commuting",
      image: "assets/images/ev2_6.jpg",
      topSpeed: 65,
      speedUnit: "km/h",
      motorPower: "1,200 W",
      motorType: "High-Efficiency BLDC Waterproof Hub Motor",
      batteryType: "Advanced Graphene Battery Pack",
      batterySpecs: "72V – 32AH",
      range: "90 – 110 km",
      chargingTime: "4 – 5 hrs",
      brakes: "Front Disc & Rear Heavy Drum",
      tireSize: "10-inch All-Terrain Tubeless",
      climbingAngle: "18° Gradeability",
      instrumentCluster: "Digital LED Instrument Panel",
      estimatedPrice: "PKR 275,000",
      featured: true,
      colors: [
        { name: "Crimson Red", hex: "#ef4444", accent: "#991b1b", image: "assets/images/ev2_6.jpg" },
        { name: "Matte Titanium", hex: "#475569", accent: "#334155", image: "assets/images/ev2_6.jpg" },
        { name: "Midnight Black", hex: "#0f172a", accent: "#1e293b", image: "assets/images/ev2_6.jpg" }
      ],
      features: [
        "Heavy-Duty Dual Rear Gas Shocks engineered for rough roads",
        "Graphene High-Temperature Resilience (up to 55°C ambient)",
        "Spacious Under-Seat Storage with USB Mobile Fast Charger",
        "Keyless Start & Remote Central Locking"
      ]
    },
    {
      id: "ev2-4",
      series: "EV2",
      category: "2-wheeler",
      badge: "Smart City Commuter",
      name: "YAD EV2-4",
      tagline: "Sporty, Sleek & Dynamic Urban Ride",
      image: "assets/images/ev2_4.jpg",
      topSpeed: 50,
      speedUnit: "km/h",
      motorPower: "500 W",
      motorType: "Quiet Smooth-Drive BLDC Motor",
      batteryType: "High-Density Graphene Battery",
      batterySpecs: "60V – 32AH",
      range: "80 – 95 km",
      chargingTime: "4 hrs",
      brakes: "Dual Disc Brakes",
      tireSize: "10-inch Urban Grip Tubeless",
      climbingAngle: "15° Gradeability",
      instrumentCluster: "Digital LED Speedometer with Battery Bar",
      estimatedPrice: "PKR 225,000",
      featured: true,
      colors: [
        { name: "Deep Navy Blue", hex: "#1e3a8a", accent: "#172554", image: "assets/images/ev2_4.jpg" },
        { name: "Carbon Black", hex: "#262626", accent: "#171717", image: "assets/images/ev2_4.jpg" },
        { name: "Pearl White", hex: "#f8fafc", accent: "#cbd5e1", image: "assets/images/ev2_4.jpg" }
      ],
      features: [
        "Aerodynamic Front Cowl with Dual LED Matrix Headlamps",
        "Low Center of Gravity for effortless city handling",
        "Carbon-fiber textured panels and ergonomic wide floorboard",
        "Emergency Reverse Assist Mode"
      ]
    },
    {
      id: "ev2-1",
      series: "EV2",
      category: "2-wheeler",
      badge: "Lightweight Urban Scooty",
      name: "YAD EV2-1",
      tagline: "Effortless, Lightweight & Ultra-Economical",
      image: "assets/images/ev2_1.jpg",
      topSpeed: 40,
      speedUnit: "km/h",
      motorPower: "350 W",
      motorType: "Direct Drive Silent Hub Motor",
      batteryType: "Lightweight Graphene Power Pack",
      batterySpecs: "48V – 14AH",
      range: "45 – 60 km",
      chargingTime: "3 – 4 hrs",
      brakes: "Front & Rear Responsive Drum Brakes",
      tireSize: "10-inch Lightweight City Tires",
      climbingAngle: "12° Incline",
      instrumentCluster: "Minimalist Backlit LED Display",
      estimatedPrice: "PKR 165,000",
      featured: true,
      colors: [
        { name: "Pure Pearl White", hex: "#f8fafc", accent: "#06b6d4", image: "assets/images/ev2_1.jpg" },
        { name: "Cyan Breeze", hex: "#06b6d4", accent: "#0891b2", image: "assets/images/ev2_1.jpg" },
        { name: "Pastel Mint", hex: "#34d399", accent: "#059669", image: "assets/images/ev2_1.jpg" }
      ],
      features: [
        "Ultra-lightweight curb weight (under 68 kg) – perfect for students and women",
        "Low step-through floor for maximum convenience in traditional wear",
        "Cost per km under Rs. 0.65 PKR — lowest running cost in Pakistan",
        "Removable Battery Option for easy apartment charging"
      ]
    },
    {
      id: "ev3-3-pro",
      series: "EV3",
      category: "3-wheeler",
      badge: "Commercial Heavy Loader",
      name: "YAD EV3-3 Pro",
      tagline: "Pakistan's Ultimate Commercial Heavy-Duty Electric Trike",
      image: "assets/images/ev3_loader.jpg",
      topSpeed: 50,
      speedUnit: "km/h",
      motorPower: "1,000 W (High Torque Differential)",
      motorType: "Reinforced Heavy Axle Differential Motor",
      batteryType: "Heavy-Duty Graphene Fleet Pack",
      batterySpecs: "72V – 45AH (Pro Variant)",
      range: "80 – 100 km (Full Load)",
      chargingTime: "5 – 6 hrs",
      brakes: "Hydraulic Foot Brakes + Mechanical Parking Lock",
      tireSize: "12-inch Reinforced Commercial 6-Ply Tires",
      climbingAngle: "20° Heavy Load Incline",
      payloadCapacity: "650 kg Max Payload",
      estimatedPrice: "PKR 460,000",
      featured: true,
      colors: [
        { name: "Industrial Green", hex: "#16a34a", accent: "#14532d", image: "assets/images/ev3_loader.jpg" },
        { name: "Commercial Yellow", hex: "#eab308", accent: "#854d0e", image: "assets/images/ev3_loader.jpg" }
      ],
      features: [
        "High-tensile robotic welded steel cargo bed with foldable sideboards",
        "Dual Heavy-duty leaf spring rear suspension",
        "Reverse Gear with Audio Warning Beeper",
        "Fleet GPS tracking ready for logistics & parcel delivery companies",
        "Saves over PKR 35,000/month compared to petrol loader rickshaws"
      ]
    },
    {
      id: "ev3-1",
      series: "EV3",
      category: "3-wheeler",
      badge: "Commercial City Trike",
      name: "YAD EV3-1",
      tagline: "Agile 3-Wheeler for Urban Delivery & Cargo Logistics",
      image: "assets/images/ev3_loader.jpg",
      topSpeed: 45,
      speedUnit: "km/h",
      motorPower: "600 W",
      motorType: "Differential Gear Motor",
      batteryType: "Graphene Battery Pack",
      batterySpecs: "72V – 32AH",
      range: "70 – 85 km",
      chargingTime: "4.5 – 5.5 hrs",
      brakes: "Combined Braking System",
      tireSize: "10-inch Reinforced Wheels",
      payloadCapacity: "400 kg Payload",
      estimatedPrice: "PKR 360,000",
      featured: false,
      colors: [
        { name: "Forest Green", hex: "#15803d", accent: "#14532d", image: "assets/images/ev3_loader.jpg" }
      ],
      features: [
        "Compact footprint for narrow city streets & bazaars",
        "Low loading floor height for quick parcel dispatch",
        "Regenerative electric descent control"
      ]
    }
  ],

  batteryComparison: {
    graphene: {
      title: "YAD Graphene Thermal-Max",
      models: "EV2-1, EV2-4, EV2-6, EV3 Series",
      tempRange: "-10°C to +55°C (Optimized for Pakistan Summers)",
      cycleLife: "1,200 – 1,500 Full Cycles (3 – 4 Years)",
      chargeSpeed: "Fast charge 80% in 3 hours",
      safetyScore: "99.8% Explosion & Leak Proof",
      highlights: [
        "Formulated specifically for Pakistani climate heat resilience",
        "High discharge rate for sudden uphill acceleration",
        "Maintenance-free sealed matrix"
      ]
    },
    lifepo4: {
      title: "YAD LiFePO4 Ultra-Safe Lithium",
      models: "EV2-7 Flagship Sport EV",
      tempRange: "-20°C to +60°C",
      cycleLife: "2,500 – 3,000 Full Cycles (6 – 8 Years)",
      chargeSpeed: "Super Fast 0-100% in 3.5 hours",
      safetyScore: "100% Thermal Runaway Resistant",
      highlights: [
        "Zero risk of combustion even under extreme puncture tests",
        "Ultra-lightweight energy density for 130 km/h top speeds",
        "Smart Bluetooth BMS with active cell voltage balancing"
      ]
    }
  },

  dealers: [
    {
      city: "Lahore (Head Office)",
      name: "YAD Auto Industries - Head Office & Experience Center",
      address: "Mohalla Tariq Abad, Main Multan Road Bypass, Manga Mandi, Lahore",
      phone: "+92 42 3594 4000",
      type: "Head Office & 3S Facility",
      timing: "Mon - Sat: 9:00 AM - 7:00 PM"
    },
    {
      city: "Lahore (Factory)",
      name: "YAD Auto Industries Manufacturing Plant",
      address: "91-B Sunder Small Industrial Estate, Lahore",
      phone: "+92 42 3594 4001",
      type: "Factory & Heavy Assembly",
      timing: "Mon - Sat: 8:30 AM - 5:30 PM"
    },
    {
      city: "Karachi",
      name: "YAD EV Experience Center - Shahrah-e-Faisal",
      address: "Main Shahrah-e-Faisal, Near FTC Building, Karachi",
      phone: "+92 21 3456 7890",
      type: "Authorized 3S Dealership",
      timing: "Mon - Sun: 10:00 AM - 9:00 PM"
    },
    {
      city: "Islamabad / Rawalpindi",
      name: "YAD EV Blue Area Showroom",
      address: "Fazl-ul-Haq Road, Blue Area, Islamabad",
      phone: "+92 51 2890 1234",
      type: "Authorized 3S Dealership",
      timing: "Mon - Sat: 10:00 AM - 8:00 PM"
    },
    {
      city: "Faisalabad",
      name: "YAD EV Faisalabad Hub",
      address: "Main Jaranwala Road, Near D Ground, Faisalabad",
      phone: "+92 41 8765 4321",
      type: "Sales & Service Dealer",
      timing: "Mon - Sat: 9:30 AM - 8:00 PM"
    },
    {
      city: "Multan",
      name: "YAD EV Multan Showroom",
      address: "Main Bosan Road, Multan Cantt",
      phone: "+92 61 6543 2109",
      type: "Sales & Service Dealer",
      timing: "Mon - Sat: 9:30 AM - 8:00 PM"
    },
    {
      city: "Peshawar",
      name: "YAD EV Khyber Showroom",
      address: "University Road, Near Board Bazaar, Peshawar",
      phone: "+92 91 5876 5432",
      type: "Authorized Dealership",
      timing: "Mon - Sat: 9:30 AM - 7:30 PM"
    }
  ],

  faqs: [
    {
      q: "How much does it cost to charge a YAD Electric Scooty in Pakistan?",
      a: "Charging a YAD EV from 0 to 100% consumes only 1.2 to 2.2 units of electricity. Based on residential tariff (approx. Rs. 45-55/unit), a full charge costs around Rs. 70 to Rs. 120 PKR, giving you up to 80-130 km of riding range. That is less than Rs. 0.90 PKR per kilometer!"
    },
    {
      q: "How does a YAD EV compare to a traditional 70cc / 125cc petrol bike?",
      a: "A 70cc bike averages 40-45 km/liter with petrol priced at ~Rs. 280/L (costing Rs. 6.50+ per km, plus periodic engine oil changes, spark plugs, and tuning). A YAD EV costs only ~Rs. 0.85/km with zero oil changes, zero engine maintenance, and silent zero-vibration ride."
    },
    {
      q: "What is the warranty coverage on YAD electric scooters?",
      a: "We offer an official manufacturer warranty of up to 3 Years on our Lithium LiFePO4 batteries, 1 Year replacement warranty on Graphene batteries, 2 Years on the BLDC motor, and 1 Year on the electronic intelligent controller."
    },
    {
      q: "How do YAD batteries perform during extreme Pakistani summer heat?",
      a: "Our batteries feature custom-formulated Graphene matrices and LiFePO4 chemistry with integrated thermal sink dissipation designed specifically to operate safely up to 55°C ambient temperatures without overheating or degrading."
    },
    {
      q: "How can I apply for an authorized YAD dealership or franchise?",
      a: "We are actively partnering with franchise dealers across Punjab, Sindh, KPK, and Balochistan. You can fill out our interactive Dealership Proposal Form on this website or visit our head office in Lahore."
    },
    {
      q: "Can I book a test ride before purchasing?",
      a: "Yes! You can book a free, no-obligation test ride online at our Lahore experience centers or any authorized dealer in Karachi, Islamabad, Faisalabad, Multan, and Peshawar."
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = YAD_DATA;
}
