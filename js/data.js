/**
 * YAD Auto Industries (Pvt.) Ltd.
 * Official Vehicle Specifications, Technology, Support & Company Data
 */

const YAD_DATA = {
  company: {
    name: "YAD Auto Industries (Pvt.) Ltd.",
    shortName: "YAD Auto",
    tagline: "Pakistan's Premier Electric Vehicle Manufacturer",
    mission: "Committed to a cleaner, greener Pakistan with 100% environment-friendly, zero-emission electric mobility.",
    headOffice: "Mohalla Tariq Abad, Main Multan Road Bypass, Manga Mandi, Lahore, Pakistan",
    factory: "91-B Sunder Small Industrial Estate, Lahore, Pakistan",
    phone: "+92 42 3594 4000",
    phoneSecondary: "+92 300 1234567",
    whatsapp: "+923001234567",
    email: "info@yadpk.com",
    salesEmail: "sales@yadpk.com",
    establishedYear: "2020",
    productionCapacity: "25,000+ Units/Year"
  },

  models: [
    {
      id: "ev2-7",
      series: "EV2 Series",
      category: "2-wheeler",
      badge: "Flagship Sport EV",
      name: "YAD EV2-7",
      tagline: "Ultra-Performance Sport Electric Scooter",
      image: "assets/images/hero_scooty.jpg",
      topSpeed: 130,
      speedUnit: "km/h",
      range: "110 – 130 km",
      motorPower: "3,000 W",
      motorType: "High-Torque Brushless PMSM Hub Motor",
      batteryType: "Lithium Iron Phosphate (LiFePO4)",
      batterySpecs: "60V – 50AH",
      chargingTime: "3.5 – 4.5 hrs (Fast Charge)",
      brakes: "Dual Hydraulic Disc with Regenerative ABS",
      tireSize: "12-inch Tubeless Alloy Grip",
      climbingAngle: "25° Incline Ready",
      instrumentCluster: "7\" Smart TFT Color Display with Bluetooth",
      warranty: "3-Year Official Battery Warranty",
      estimatedPrice: "PKR 385,000",
      featured: true,
      colors: [
        { name: "Cyber Emerald", hex: "#00f098", accent: "#059669", image: "assets/images/hero_scooty.jpg" },
        { name: "Obsidian Black", hex: "#18181b", accent: "#27272a", image: "assets/images/hero_scooty.jpg" },
        { name: "Titanium Slate", hex: "#64748b", accent: "#475569", image: "assets/images/hero_scooty.jpg" }
      ],
      features: [
        "LiFePO4 Chemistry: 2,500+ Charge Cycles with Zero Thermal Runaway Risk",
        "3,000W Peak PMSM Beast Motor reaching 0-50 km/h in 3.8 seconds",
        "Regenerative Braking returning up to 12% energy back to the battery",
        "Smart Mobile App Telemetry (GPS Tracking, Anti-Theft Alarm, Geofencing)",
        "IP67 Waterproof & Dustproof Certified for Monsoon Conditions"
      ]
    },
    {
      id: "ev2-6",
      series: "EV2 Series",
      category: "2-wheeler",
      badge: "Long Range Cruiser",
      name: "YAD EV2-6",
      tagline: "Rugged Power & Extended Range for Daily Commuting",
      image: "assets/images/ev2_6.jpg",
      topSpeed: 65,
      speedUnit: "km/h",
      range: "90 – 110 km",
      motorPower: "1,200 W",
      motorType: "High-Efficiency BLDC Waterproof Motor",
      batteryType: "Advanced Graphene Thermal-Max",
      batterySpecs: "72V – 32AH",
      chargingTime: "4 – 5 hrs",
      brakes: "Front Disc & Rear Heavy Drum",
      tireSize: "10-inch All-Terrain Tubeless",
      climbingAngle: "18° Gradeability",
      instrumentCluster: "Digital LED Instrument Panel",
      warranty: "1-Yr Battery / 2-Yr Motor Warranty",
      estimatedPrice: "PKR 275,000",
      featured: true,
      colors: [
        { name: "Crimson Red", hex: "#ef4444", accent: "#991b1b", image: "assets/images/ev2_6.jpg" },
        { name: "Matte Titanium", hex: "#475569", accent: "#334155", image: "assets/images/ev2_6.jpg" },
        { name: "Midnight Black", hex: "#0f172a", accent: "#1e293b", image: "assets/images/ev2_6.jpg" }
      ],
      features: [
        "Dual Heavy-Duty Gas Shock Absorbers engineered for rough roads",
        "Graphene High-Temperature Resilience (operates safely up to 55°C)",
        "Spacious Under-Seat Storage with USB Mobile Fast-Charging Port",
        "Keyless Push-Button Start & Remote Central Locking Security"
      ]
    },
    {
      id: "ev2-4",
      series: "EV2 Series",
      category: "2-wheeler",
      badge: "Smart City Scooty",
      name: "YAD EV2-4",
      tagline: "Sporty, Sleek & Dynamic Urban Commuter",
      image: "assets/images/ev2_4.jpg",
      topSpeed: 50,
      speedUnit: "km/h",
      range: "80 – 95 km",
      motorPower: "500 W",
      motorType: "Smooth Silent-Drive BLDC Motor",
      batteryType: "High-Density Graphene Battery",
      batterySpecs: "60V – 32AH",
      chargingTime: "4 hrs",
      brakes: "Dual Responsive Disc Brakes",
      tireSize: "10-inch Urban Grip Tubeless",
      climbingAngle: "15° Gradeability",
      instrumentCluster: "Digital LED Speedometer with Battery Meter",
      warranty: "1-Yr Battery / 2-Yr Motor Warranty",
      estimatedPrice: "PKR 225,000",
      featured: true,
      colors: [
        { name: "Deep Navy Blue", hex: "#1e3a8a", accent: "#172554", image: "assets/images/ev2_4.jpg" },
        { name: "Carbon Black", hex: "#262626", accent: "#171717", image: "assets/images/ev2_4.jpg" },
        { name: "Pearl White", hex: "#f8fafc", accent: "#cbd5e1", image: "assets/images/ev2_4.jpg" }
      ],
      features: [
        "Aerodynamic Front Apron with Dual LED Matrix Headlamps",
        "Low Center of Gravity for effortless handling in heavy city traffic",
        "Carbon-fiber textured panels and ergonomic wide floorboard",
        "Reverse Assist Gear for tight parking spaces"
      ]
    },
    {
      id: "ev2-1",
      series: "EV2 Series",
      category: "2-wheeler",
      badge: "Lightweight Urban Commuter",
      name: "YAD EV2-1",
      tagline: "Effortless, Lightweight & Ultra-Economical",
      image: "assets/images/ev2_1.jpg",
      topSpeed: 40,
      speedUnit: "km/h",
      range: "45 – 60 km",
      motorPower: "350 W",
      motorType: "Direct Drive Silent Hub Motor",
      batteryType: "Lightweight Graphene Power Pack",
      batterySpecs: "48V – 14AH",
      chargingTime: "3 – 4 hrs",
      brakes: "Front & Rear Responsive Drum Brakes",
      tireSize: "10-inch Lightweight City Tires",
      climbingAngle: "12° Incline",
      instrumentCluster: "Minimalist Backlit LED Display",
      warranty: "1-Yr Battery / 2-Yr Motor Warranty",
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
      series: "EV3 Series",
      category: "3-wheeler",
      badge: "Commercial Heavy Loader",
      name: "YAD EV3-3 Pro",
      tagline: "Pakistan's Ultimate Commercial Heavy-Duty Electric Trike",
      image: "assets/images/ev3_loader.jpg",
      topSpeed: 50,
      speedUnit: "km/h",
      range: "80 – 100 km (Full Load)",
      motorPower: "1,000 W",
      motorType: "Reinforced Heavy Axle Differential Motor",
      batteryType: "Heavy-Duty Graphene Fleet Pack",
      batterySpecs: "72V – 45AH (Pro Variant)",
      chargingTime: "5 – 6 hrs",
      brakes: "Hydraulic Foot Brakes + Mechanical Parking Lock",
      tireSize: "12-inch Reinforced 6-Ply Commercial Tires",
      climbingAngle: "20° Heavy Load Incline",
      payloadCapacity: "650 kg Max Payload",
      warranty: "1-Yr Battery / 2-Yr Motor Warranty",
      estimatedPrice: "PKR 460,000",
      featured: true,
      colors: [
        { name: "Industrial Green", hex: "#16a34a", accent: "#14532d", image: "assets/images/ev3_loader.jpg" },
        { name: "Commercial Yellow", hex: "#eab308", accent: "#854d0e", image: "assets/images/ev3_loader.jpg" }
      ],
      features: [
        "High-tensile robotic welded steel cargo bed with foldable sideboards",
        "Dual Heavy-duty leaf spring rear suspension for rugged logistics",
        "Reverse Gear with Audio Warning Beeper",
        "Fleet GPS tracking ready for courier, retail, and FMCG delivery",
        "Saves over PKR 35,000/month compared to petrol loader rickshaws"
      ]
    },
    {
      id: "ev3-1",
      series: "EV3 Series",
      category: "3-wheeler",
      badge: "Commercial City Trike",
      name: "YAD EV3-1",
      tagline: "Agile 3-Wheeler for Urban Delivery & Cargo Logistics",
      image: "assets/images/ev3_loader.jpg",
      topSpeed: 45,
      speedUnit: "km/h",
      range: "70 – 85 km",
      motorPower: "600 W",
      motorType: "Differential Gear Motor",
      batteryType: "Graphene Fleet Pack",
      batterySpecs: "72V – 32AH",
      chargingTime: "4.5 – 5.5 hrs",
      brakes: "Combined Braking System",
      tireSize: "10-inch Reinforced Wheels",
      payloadCapacity: "400 kg Payload",
      warranty: "1-Yr Battery / 2-Yr Motor Warranty",
      estimatedPrice: "PKR 360,000",
      featured: false,
      colors: [
        { name: "Forest Green", hex: "#15803d", accent: "#14532d", image: "assets/images/ev3_loader.jpg" }
      ],
      features: [
        "Compact footprint for narrow bazaar alleys and city streets",
        "Low loading floor height for quick parcel dispatch",
        "Regenerative electric descent braking control"
      ]
    }
  ],

  whyYAD: [
    {
      icon: "factory",
      title: "100% Local Assembly",
      desc: "Built in our Lahore manufacturing plant (91-B Sunder Small Industrial Estate) with precision robotic welding and localized engineering for Pakistani road potholes."
    },
    {
      icon: "battery",
      title: "55°C Summer Heat Proof",
      desc: "Custom-formulated Graphene Thermal-Max and LiFePO4 battery chemistry engineered to withstand extreme Pakistani heatwaves without thermal degradation."
    },
    {
      icon: "savings",
      title: "Up to 85% Fuel Savings",
      desc: "Slash your daily commute expenditure from Rs. 7.50/km on petrol to just Rs. 0.85/km on electricity. Save over PKR 120,000+ every year."
    },
    {
      icon: "shield",
      title: "3-Year Official Warranty",
      desc: "Comprehensive manufacturer warranty covering Lithium LiFePO4 batteries, BLDC motors, and smart electronic controllers with factory-backed guarantees."
    },
    {
      icon: "support",
      title: "Nationwide 3S Network",
      desc: "Authorized Sales, Service, and 100% Genuine Spare Parts available across Lahore, Karachi, Islamabad, Faisalabad, Multan, and Peshawar."
    },
    {
      icon: "leaf",
      title: "Zero Tailpipe Emissions",
      desc: "Contribute to a cleaner, smog-free Pakistan. 100% eco-friendly, zero carbon emissions, and whisper-quiet operation."
    }
  ],

  serviceSupport: [
    {
      title: "Official Warranty Coverage",
      desc: "Up to 36 months warranty on LiFePO4 batteries, 12 months on Graphene packs, and 24 months on electric drive motors."
    },
    {
      title: "100% Genuine Spare Parts",
      desc: "Direct factory inventory of brake pads, tires, controllers, LED lamps, digital meters, and body panels readily in stock."
    },
    {
      title: "Authorized 3S Service Centers",
      desc: "Factory-trained technicians equipped with digital computerized battery health diagnostic tools."
    },
    {
      title: "Doorstep Assistance & Support",
      desc: "Dedicated customer care hotline and roadside assistance across major metropolitan hubs."
    }
  ],

  newsUpdates: [
    {
      date: "September 2026",
      tag: "Green Initiative",
      title: "YAD Auto Expands Assembly Capacity at Sunder Industrial Estate",
      desc: "New automated robotic chassis line increases annual production capacity to over 25,000 electric two-wheelers and three-wheelers."
    },
    {
      date: "August 2026",
      tag: "Battery Tech",
      title: "Thermal-Max Graphene Batteries Complete Extreme 50°C Summer Testing",
      desc: "Over 50,000 kilometers of real-world endurance tests across Punjab and Sindh confirm zero overheating incidents."
    },
    {
      date: "July 2026",
      tag: "Commercial Fleet",
      title: "YAD EV3 Commercial Loaders Adopted by Major Logistics Providers",
      desc: "Delivery fleets in Lahore and Karachi achieve 82% operational cost savings compared to traditional petrol cargo rickshaws."
    }
  ],

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
      q: "How much does it cost to fully charge a YAD Electric Scooty in Pakistan?",
      a: "A full 0 to 100% charge consumes only 1.2 to 2.2 units (kWh) of electricity. At standard residential electricity tariffs (approx. Rs. 45–55/unit), a full charge costs around Rs. 70 to Rs. 110 PKR, providing 80 to 130 km of range. That amounts to less than Rs. 0.85 PKR per kilometer!"
    },
    {
      q: "How do YAD batteries handle extreme summer temperatures (45°C–50°C+)?",
      a: "Our vehicles feature custom-formulated Graphene Thermal-Max and Lithium LiFePO4 cells with integrated heat-dissipating casings and Smart BMS telemetry designed specifically for Pakistan's climate to prevent thermal throttling and degradation."
    },
    {
      q: "What is the warranty coverage on YAD electric vehicles?",
      a: "We offer an official manufacturer warranty of up to 3 Years (36 Months) on LiFePO4 batteries, 1 Year (12 Months) replacement warranty on Graphene packs, 2 Years (24 Months) on BLDC electric motors, and 1 Year on intelligent controllers."
    },
    {
      q: "How does a YAD EV compare to a traditional 70cc / 125cc petrol bike in monthly costs?",
      a: "A 70cc petrol bike costs approx. Rs. 7.50+ per km (fuel @ PKR 280/L plus monthly engine oil, tuning, spark plugs). A YAD EV costs only ~Rs. 0.85/km with zero engine oil, zero spark plugs, and zero vibrations, saving the average commuter PKR 10,000 to PKR 15,000+ every month."
    },
    {
      q: "Are genuine spare parts readily available across Pakistan?",
      a: "Yes! Because all YAD vehicles are assembled at our manufacturing plant in Sunder Small Industrial Estate, Lahore, 100% genuine replacement parts (controllers, brake pads, tires, body panels, chargers) are always in stock at our factory and authorized 3S dealership network."
    },
    {
      q: "How can I apply for an authorized dealership or corporate fleet proposal?",
      a: "You can submit an application through our interactive Dealership & Franchise Proposal form on this website, or contact our corporate sales team at sales@yadpk.com."
    }
  ]
};

if (typeof window !== "undefined") {
  window.YAD_DATA = YAD_DATA;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = YAD_DATA;
}
