const prebuiltPlans = [
  {
    name: "Wellness Starter",
    tagline: "Essential care, made affordable",
    ageRange: [18, 30],
    premium: 1200,
    model: "single",
    payment: "Annual",
    modules: {
      "OPD Care": { sumInsured: 5000 },
      "Mental Wellness": { sumInsured: 10000 },
    },
  },
  {
    name: "Gadget & Cyber Shield",
    tagline: "Secure your digital and personal space",
    ageRange: [21, 40],
    premium: 2500,
    model: "multi",
    payment: "Quarterly",
    modules: {
      "Cyber Insurance": { sumInsured: 100000 },
      "Electronic Gadget": { sumInsured: 20000 },
    },
  },
  {
    name: "Accident Guard",
    tagline: "Comprehensive accidental protection",
    ageRange: [25, 45],
    premium: 1800,
    model: "single",
    payment: "Monthly",
    modules: {
      "Personal Accident": { sumInsured: 500000 },
    },
  },
  {
    name: "Family Health Plus",
    tagline: "Strong hospitalization & mental health combo",
    ageRange: [30, 50],
    premium: 3000,
    model: "multi",
    payment: "Annual",
    modules: {
      Hospitalization: { sumInsured: 200000 },
      "Mental Wellness": { sumInsured: 10000 },
    },
  },
];

export default prebuiltPlans; // ✅ default export only
