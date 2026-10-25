import { SolarService, ProjectCase, DiscoProvider, FaqItem, OfficeBranch } from '../types';

export const DEFAULT_WHATSAPP_NUMBER = '923001234567';
export const DISPLAY_PHONE = '+92 300 1234567';
export const DISPLAY_LANDLINE = '+92 42 35789012';
export const CONTACT_EMAIL = 'info@roshansolar.pk.demo';

export const DISCO_PROVIDERS: DiscoProvider[] = [
  { id: 'lesco', name: 'LESCO', fullName: 'Lahore Electric Supply Company', region: 'Lahore, Kasur, Okara, Sheikhupura', avgUnitRate: 64 },
  { id: 'iesco', name: 'IESCO', fullName: 'Islamabad Electric Supply Company', region: 'Islamabad, Rawalpindi, Attock, Jhelum', avgUnitRate: 62 },
  { id: 'ke', name: 'K-Electric', fullName: 'Karachi Electric Company', region: 'Karachi & adjoining coastal areas', avgUnitRate: 68 },
  { id: 'fesco', name: 'FESCO', fullName: 'Faisalabad Electric Supply Company', region: 'Faisalabad, Sargodha, Jhang', avgUnitRate: 63 },
  { id: 'mepco', name: 'MEPCO', fullName: 'Multan Electric Power Company', region: 'Multan, Bahawalpur, D.G. Khan, Sahiwal', avgUnitRate: 62 },
  { id: 'gepco', name: 'GEPCO', fullName: 'Gujranwala Electric Power Company', region: 'Gujranwala, Sialkot, Gujrat', avgUnitRate: 63 },
  { id: 'pesco', name: 'PESCO', fullName: 'Peshawar Electric Supply Company', region: 'Peshawar, Mardan, Swat, Abbottabad', avgUnitRate: 60 },
  { id: 'hesco', name: 'HESCO', fullName: 'Hyderabad Electric Supply Company', region: 'Hyderabad, Thatta, Badin, Mirpurkhas', avgUnitRate: 61 }
];

export const SOLAR_SERVICES: SolarService[] = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential On-Grid & Hybrid Solar',
    tagline: 'Zero load-shedding and up to 90% bill reduction for your home',
    description: 'Custom engineered rooftop solar systems with BloombergNEF Tier-1 bifacial monocrystalline panels and optional ultra-long-life LiFePO4 lithium storage for 24/7 uninterrupted power.',
    specs: [
      'Capacities: 5 kW, 10 kW, 15 kW, 20 kW+',
      'Tier-1 N-Type TOPCon / Bifacial panels (550W - 610W)',
      'Lithium LiFePO4 battery storage (6,000+ cycle lifespan)',
      'Cloud mobile app for real-time generation tracking'
    ],
    idealFor: '5 Marla, 10 Marla, 1 Kanal & 2 Kanal homes',
    typicalCapacity: '5 kW – 20 kW',
    iconName: 'home'
  },
  {
    id: 'commercial',
    number: '02',
    title: 'Commercial & Industrial Rooftop Solar',
    tagline: 'High-yield CAPEX and OPEX energy solutions for enterprises',
    description: 'Substantially reduce heavy operating power overheads for factories, textile mills, cold storages, hospitals, and educational campuses with high-capacity three-phase string inverters.',
    specs: [
      'Capacities: 50 kW to 2.5 MW+',
      'Multi-MPPT industrial smart inverters (Huawei, Sungrow, Growatt)',
      'Certified wind-load structural engineering (up to 150 km/h)',
      'Fast payback cycle: 2.2 to 3.2 years'
    ],
    idealFor: 'Textile mills, warehouses, private hospitals, plazas & colleges',
    typicalCapacity: '50 kW – 2,500 kW',
    iconName: 'building'
  },
  {
    id: 'agricultural',
    number: '03',
    title: 'Agricultural Solar Tubewell Solutions',
    tagline: '100% diesel-free irrigation with smart VFD solar pump controllers',
    description: 'Eliminate costly diesel generator expenses with dedicated solar tubewell conversions for agricultural borewells, deep turbine pumps, and drip irrigation systems across Punjab and Sindh.',
    specs: [
      'Variable Frequency Drive (VFD) smart solar controllers',
      'Supports 7.5 HP to 40 HP submersible and turbine pumps',
      'Dual supply mode: Run on Solar by day, WAPDA by night',
      'Heavy-duty elevated hot-dipped galvanized steel mounting'
    ],
    idealFor: 'Agricultural farms, citrus orchards, dairy farms & fish hatcheries',
    typicalCapacity: '10 HP – 40 HP Pumps',
    iconName: 'wheat'
  },
  {
    id: 'netmetering',
    number: '04',
    title: 'NEPRA Green Net Metering Processing',
    tagline: 'Fast-track DISCO approval, load extension, and bi-directional meter setup',
    description: 'Turn your rooftop into an energy producer. We handle the entire bureaucratic process with LESCO, IESCO, KE, FESCO, MEPCO from initial feasibility study to NEPRA license and Green Meter installation.',
    specs: [
      'Complete DISCO liaison & electrical inspector testing',
      'Supply of certified bi-directional Green Meters',
      'Fast-track turnaround in 18 to 30 working days',
      'Sell surplus daytime units to offset night peak tariffs'
    ],
    idealFor: 'Any 3-phase residential, commercial or agricultural connection',
    typicalCapacity: 'Turnkey Licensing',
    iconName: 'zap'
  },
  {
    id: 'maintenance',
    number: '05',
    title: 'System Health Audit & Panel Cleaning',
    tagline: 'Maximize photovoltaic yield and protect your 25-year investment',
    description: 'Pakistani dust and smog can reduce solar generation by up to 28%. Our specialized technical maintenance teams provide demineralized water cleaning, thermal drone imaging, and torque checks.',
    specs: [
      'High-pressure deionized pure water panel washing',
      'Infrared thermal drone camera inspection for hot spots',
      'Inverter firmware updates and string voltage analysis',
      'Annual Maintenance Contracts (AMC) available'
    ],
    idealFor: 'Existing residential arrays and commercial solar plants',
    typicalCapacity: 'On-Demand & AMC',
    iconName: 'wrench'
  }
];

export const PROJECT_CASES: ProjectCase[] = [
  {
    id: 'p1',
    title: '15 kW Hybrid System with LiFePO4 Storage',
    category: 'residential',
    location: 'DHA Phase 6, Lahore',
    capacity: '15 kW',
    monthlySavingsPkr: 'Rs. 115,000 / mo',
    panels: '26x Longi Hi-MO 6 (580W)',
    inverter: 'Growatt SPH 15kW Hybrid Inverter',
    batteryStorage: '15.3 kWh LiFePO4 Battery Bank',
    netMetered: true,
    completionYear: '2026',
    highlight: 'Zero electricity bill through summer peak running 4 inverter ACs 24/7.'
  },
  {
    id: 'p2',
    title: '120 kW Industrial Rooftop Plant',
    category: 'commercial',
    location: 'Sundar Industrial Estate, Lahore',
    capacity: '120 kW',
    monthlySavingsPkr: 'Rs. 920,000 / mo',
    panels: '210x Jinko Tiger Neo N-Type (575W)',
    inverter: '2x Huawei SUN2000-60KTL-M0 Inverters',
    netMetered: true,
    completionYear: '2025',
    highlight: 'Offsetting 65% of day manufacturing load with 2.7 year projected payback.'
  },
  {
    id: 'p3',
    title: '10 kW On-Grid Net Metered System',
    category: 'residential',
    location: 'Sector F-8/2, Islamabad (IESCO)',
    capacity: '10 kW',
    monthlySavingsPkr: 'Rs. 76,000 / mo',
    panels: '18x Canadian Solar BiHiKu7 (590W)',
    inverter: 'Solis 10kW 3-Phase Dual MPPT',
    netMetered: true,
    completionYear: '2026',
    highlight: 'Green bi-directional meter energized within 19 days of application.'
  },
  {
    id: 'p4',
    title: '25 HP Solar Agricultural Tubewell',
    category: 'agricultural',
    location: 'Depalpur, District Okara',
    capacity: '32 kW DC Array',
    monthlySavingsPkr: 'Rs. 240,000 / mo (Diesel saving)',
    panels: '58x JA Solar Mono Perc (550W)',
    inverter: 'INVT GD100-PV 22kW VFD Pump Controller',
    netMetered: false,
    completionYear: '2025',
    highlight: 'Pumping 8-inch discharge water for 75 acres of potato and corn fields diesel-free.'
  },
  {
    id: 'p5',
    title: '50 kW Commercial Plaza Installation',
    category: 'commercial',
    location: 'Shahrah-e-Faisal, Karachi (K-Electric)',
    capacity: '50 kW',
    monthlySavingsPkr: 'Rs. 410,000 / mo',
    panels: '88x Longi Hi-MO 7 Bifacial (570W)',
    inverter: 'Sungrow SG50CX Commercial Inverter',
    netMetered: true,
    completionYear: '2026',
    highlight: 'Eliminated peak tariff penalty brackets during active corporate office hours.'
  },
  {
    id: 'p6',
    title: '20 kW Dual-Aspect Rooftop System',
    category: 'residential',
    location: 'Canal Road, Faisalabad (FESCO)',
    capacity: '20 kW',
    monthlySavingsPkr: 'Rs. 152,000 / mo',
    panels: '35x Jinko Tiger Neo (575W)',
    inverter: 'Inverex Nitrox 20kW Three-Phase Hybrid',
    batteryStorage: '10.2 kWh LiFePO4 Storage',
    netMetered: true,
    completionYear: '2026',
    highlight: 'Supplies 100% of daytime house demand and exports an average of 42 units/day.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'netmetering',
    question: 'How long does the NEPRA Net Metering process take in Pakistan?',
    answer: 'From the initial application filing to the installation of the green bi-directional meter, the complete process typically takes 18 to 30 working days. Roshan Solar handles every stage: electrical engineering drawings, DISCO inspection (LESCO, IESCO, KE, FESCO, MEPCO), testing lab certifications, NEPRA licensing, and final physical meter activation.'
  },
  {
    id: 'faq-2',
    category: 'technical',
    question: 'What is the practical difference between an On-Grid and a Hybrid Solar system?',
    answer: 'An On-Grid system does not use batteries; it produces energy during the day and exports surplus units to DISCO via net metering. If WAPDA power shuts down, an on-grid inverter immediately turns off for safety (anti-islanding). A Hybrid system includes Lithium (LiFePO4) battery storage, so when load-shedding strikes, your home or facility switches seamlessly (within 10 milliseconds) to battery power without any interruption to air conditioners or computers.'
  },
  {
    id: 'faq-3',
    category: 'billing',
    question: 'How does DISCO bill me when I export units to the grid?',
    answer: 'Your green bi-directional meter records two values: units imported from WAPDA (mostly at night) and units exported to WAPDA (during peak daylight hours). At the end of the billing cycle, the exported units are deducted from your imported units. If you export more than you consume, the surplus credit rolls over to the next month or is compensated in cash according to NEPRA tariff regulations.'
  },
  {
    id: 'faq-4',
    category: 'technical',
    question: 'Do solar panels work in extreme Pakistani heat and winter smog?',
    answer: 'Yes. Modern Tier-1 N-Type TOPCon and Bifacial monocrystalline panels feature a very low temperature coefficient (around -0.30%/°C), performing reliably even in 45°C+ summer weather. In winter foggy/smoggy conditions, bifacial panels capture scattered diffuse radiation from both the front and underside reflection, maintaining essential background generation.'
  },
  {
    id: 'faq-5',
    category: 'netmetering',
    question: 'Is Net Metering allowed on a single-phase electricity meter?',
    answer: 'Under NEPRA regulations, net metering requires a three-phase connection. If your home or commercial premise currently has a single-phase meter, our team assists you with the DISCO phase upgrade and load extension paperwork prior to installing your solar setup.'
  },
  {
    id: 'faq-6',
    category: 'maintenance',
    question: 'What warranty and maintenance support does Roshan Solar provide?',
    answer: 'All our Tier-1 solar panels carry a 12-year product warranty and a 25 to 30-year linear power performance guarantee (retaining $\ge 85\%$ output at year 25). Inverters carry 5 to 10-year manufacturer replacement warranties. We provide 1 year of complimentary bi-monthly health inspections and mobile app monitoring support.'
  }
];

export const OFFICE_BRANCHES: OfficeBranch[] = [
  {
    city: 'Lahore (Head Office)',
    title: 'Punjab Regional Headquarters',
    address: 'Plot 42-C, Commercial Zone, Phase 5 DHA, Lahore, Punjab',
    phone: '+92 42 35789012',
    email: 'lahore@roshansolar.pk.demo',
    timing: 'Mon – Sat: 9:00 AM – 7:00 PM',
    mapCoords: '31.4707° N, 74.4109° E'
  },
  {
    city: 'Islamabad / Rawalpindi',
    title: 'Federal Capital Office',
    address: 'Level 4, ISE Towers, Jinnah Avenue, Blue Area, Islamabad',
    phone: '+92 51 2891234',
    email: 'islamabad@roshansolar.pk.demo',
    timing: 'Mon – Sat: 9:00 AM – 6:30 PM',
    mapCoords: '33.7138° N, 73.0652° E'
  },
  {
    city: 'Karachi',
    title: 'Sindh Coastal Operations',
    address: 'Suite 602, Executive Tower, Main Shahrah-e-Faisal, Karachi',
    phone: '+92 21 34567890',
    email: 'karachi@roshansolar.pk.demo',
    timing: 'Mon – Sat: 9:30 AM – 7:30 PM',
    mapCoords: '24.8607° N, 67.0011° E'
  }
];
