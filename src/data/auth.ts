import type { InjectionKey } from 'vue';

export interface ContactPerson {
  name: string;
  title: string;
  mobile: string;
  email: string;
}

export interface BusinessRegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
  businessName: string;
  companySize: string;
  description: string;
  operatingDays: string[];
  openingTime: string;
  closingTime: string;
  cargoTypes: string[];
  contacts: { primary: ContactPerson; finance: ContactPerson; cod: ContactPerson };
  paymentOptions: string[];
  paymentMethod: 'prepaid' | 'postpaid';
  tin: string;
  taxClassification: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  accountType: string;
  legalName: string;
  legalAddress: string;
  signatoryName: string;
  signatoryDesignation: string;
  signatoryContact: string;
  signatoryEmail: string;
  agreed: boolean;
}

const emptyContact = (): ContactPerson => ({ name: '', title: '', mobile: '', email: '' });

export function createBusinessForm(): BusinessRegistrationForm {
  return {
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    companySize: '',
    description: '',
    operatingDays: ['Mon'],
    openingTime: '',
    closingTime: '',
    cargoTypes: ['General Cargo'],
    contacts: { primary: emptyContact(), finance: emptyContact(), cod: emptyContact() },
    paymentOptions: ['Bank Transfer'],
    paymentMethod: 'prepaid',
    tin: '',
    taxClassification: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    accountType: '',
    legalName: '',
    legalAddress: '',
    signatoryName: '',
    signatoryDesignation: '',
    signatoryContact: '',
    signatoryEmail: '',
    agreed: false,
  };
}

export const businessFormKey: InjectionKey<BusinessRegistrationForm> = Symbol('businessRegistrationForm');

export const businessSteps = [
  'Account',
  'Business Information',
  'Business Contacts',
  'Payment and Tax',
  'Bank and Legal',
  'Review',
] as const;

export const companySizes = [
  '1–10 employees (Micro)',
  '11–50 employees (Small)',
  '51–200 employees (Medium)',
  '201 or more employees (Large)',
];

export const weekDays = [
  { short: 'Mon', long: 'Monday' },
  { short: 'Tue', long: 'Tuesday' },
  { short: 'Wed', long: 'Wednesday' },
  { short: 'Thu', long: 'Thursday' },
  { short: 'Fri', long: 'Friday' },
  { short: 'Sat', long: 'Saturday' },
  { short: 'Sun', long: 'Sunday' },
];

export const cargoTypes = [
  'General Cargo',
  'Perishables',
  'Hazardous Materials',
  'Fragile Goods',
  'Bulk Cargo',
  'Cold Chain',
  'Other',
];

export const paymentOptions = ['Bank Transfer', 'Cash', 'Credit Card', 'E-Wallet (GCash/Maya)', 'Check'];

export const paymentMethods = [
  { value: 'prepaid', label: 'Prepaid', description: 'Pay before Shipzy processes each booking or service.' },
  { value: 'postpaid', label: 'Postpaid', description: 'Pay through an approved billing schedule or account terms.' },
] as const;

export const taxClassifications = ['Vatable', 'Non-Vatable', 'VAT-Exempt', 'Zero-Rated'];

export const bankAccountTypes = ['Savings', 'Checking / Current'];

/** "13:05" → "1:05 PM" */
export function formatTime(value: string): string {
  if (!value) return '';
  const [h, m] = value.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${suffix}`;
}
