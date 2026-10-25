export interface SolarService {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  specs: string[];
  idealFor: string;
  typicalCapacity: string;
  iconName: 'home' | 'building' | 'wheat' | 'zap' | 'wrench';
}

export interface ProjectCase {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'agricultural' | 'netmetered';
  location: string;
  capacity: string;
  monthlySavingsPkr: string;
  panels: string;
  inverter: string;
  batteryStorage?: string;
  netMetered: boolean;
  completionYear: string;
  highlight: string;
}

export interface DiscoProvider {
  id: string;
  name: string;
  fullName: string;
  region: string;
  avgUnitRate: number; // PKR per kWh
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  city: string;
  monthlyBill: string;
  disco: string;
  systemType: string;
  propertyType: string;
  roofType: string;
  comments: string;
}

export interface QuoteSubmissionResult {
  referenceId: string;
  data: QuoteFormData;
  estimatedSystemKw: number;
  estimatedMonthlySavingsPkr: number;
  submittedAt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'netmetering' | 'technical' | 'billing' | 'maintenance';
}

export interface OfficeBranch {
  city: string;
  title: string;
  address: string;
  phone: string;
  email: string;
  timing: string;
  mapCoords: string;
}
