/** Mock data for the business-account profile screens (no backend yet). */

export const businessInfo = {
  name: 'Shipzy Business Solutions',
  description:
    'A logistics and fulfillment company serving retail, food, and corporate delivery requirements.',
  employees: '51-100',
  goods: 'Retail, Food, Documents',
};

export const employeeRanges = ['1-10', '11-50', '51-100', '101-500', '500+'];

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type WeekDay = (typeof weekDays)[number];

export const operatingSchedule = {
  days: ['Mon'] as WeekDay[],
  /** 24h "HH:mm" */
  opensAt: '08:00',
  closesAt: '18:00',
};

export type ContactKind = 'primary' | 'finance' | 'cod';

export interface BusinessContact {
  kind: ContactKind;
  title: string;
  subtitle: string;
  person: string;
  designation: string;
  email: string;
  mobile: string;
}

export const businessContacts: BusinessContact[] = [
  {
    kind: 'primary',
    title: 'Primary Contact',
    subtitle: 'Daily operations and booking concerns',
    person: 'Maria Santos',
    designation: 'Operations Manager',
    email: 'maria@shipzybusiness.com',
    mobile: '',
  },
  {
    kind: 'finance',
    title: 'Finance Contact',
    subtitle: 'Billing, invoices, and payments',
    person: 'Maria Santos',
    designation: 'Operations Manager',
    email: 'maria@shipzybusiness.com',
    mobile: '',
  },
  {
    kind: 'cod',
    title: 'COD Contact',
    subtitle: 'Cash-on-delivery reconciliation',
    person: 'Maria Santos',
    designation: 'Operations Manager',
    email: 'maria@shipzybusiness.com',
    mobile: '',
  },
];

export const paymentTax = {
  options: 'Bank Transfer, GCash',
  method: 'Postpaid',
  tin: 'Retail, Food, Documents',
  taxClassification: 'VAT Registered',
};

export const paymentMethods = ['Prepaid', 'Postpaid'];
export const taxClassifications = ['VAT Registered', 'Non-VAT Registered', 'VAT Exempt'];

export const bankInfo = {
  bankName: 'BDO Unibank, Inc.',
  accountName: 'Shipzy Business Solutions',
  accountType: 'Business Checking',
  accountNumber: '0012 3456 7890',
};

export const legalInfo = {
  registeredName: 'Shipzy Business Solutions Corporation',
  registeredAddress: 'Unit 502, Corporate Center, Davao City, Davao del Sur 8000',
  signatory: {
    fullName: 'Juan Dela Cruz',
    designation: 'Chief Executive Officer',
    email: 'juan@shipzybusiness.com',
    mobile: '',
  },
};

export interface VerificationFile {
  name: string;
  size: string;
  /** Object URL for locally picked files, so Download works. */
  url?: string;
}

export interface VerificationDocument {
  id: string;
  title: string;
  description: string;
  file: VerificationFile | null;
}

const sampleFile = (): VerificationFile => ({ name: 'SEC_Certificate_2026.pdf', size: '1.8 MB' });

export const verificationDocuments: VerificationDocument[] = [
  {
    id: 'registration',
    title: 'DTI or SEC Certificate of Registration',
    description: 'Official DTI registration or SEC Certificate of Registration',
    file: sampleFile(),
  },
  {
    id: 'bir-2303',
    title: 'BIR Form 2303',
    description: 'Current Certificate of Registration issued by the BIR.',
    file: sampleFile(),
  },
  {
    id: 'permit',
    title: "Business / Mayor's Permit",
    description: 'Valid and current permit issued by the local government.',
    file: sampleFile(),
  },
  {
    id: 'signatory-id',
    title: 'Valid ID of the Authorized Signatory',
    description: 'Government-issued ID of the owner, director, board member, or C-level executive.',
    file: sampleFile(),
  },
  {
    id: 'master-agreement',
    title: 'Signed Master Agreement',
    description: 'Download the agreement, sign it, and upload the completed copy',
    file: sampleFile(),
  },
  {
    id: 'registration-form',
    title: 'Completed Business Registration Form',
    description: 'Download, complete, and upload the official business registration form.',
    file: null,
  },
];

export const acceptedDocumentTypes = '.pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png';
export const maxDocumentBytes = 5 * 1024 * 1024;

export function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
