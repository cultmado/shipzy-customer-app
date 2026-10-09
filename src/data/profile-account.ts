// Mock data for the account-level profile screens (addresses, FAQs, employees).

export interface SavedAddress {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
}

export const savedAddresses: SavedAddress[] = [
  {
    id: 'addr-1',
    label: 'Home',
    address: 'Blk 12 Lot 34, Sunrise Drive, Brgy. San Isidro, Davao City, Davao del Sur 8000',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Work',
    address: 'Unit 502, Quimpo Tower, Gov. Duterte St., Poblacion District, Davao City 8000',
    isDefault: false,
  },
];

export const addressLabels = ['Home', 'Work', 'Other'];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: 'How do I book a service?',
    answer:
      'Tap the Book button at the bottom of the screen, choose Pabili, Parcel, or Vehicle, fill in the pickup and drop-off details, then review and confirm your booking.',
  },
  {
    question: 'How can I track my booking?',
    answer:
      'Go to the Bookings tab and open any active booking to see its live status, assigned rider, and estimated arrival time.',
  },
  {
    question: 'What are the delivery hours?',
    answer:
      'Deliveries run daily from 7:00 AM to 9:00 PM. Bookings placed outside these hours are scheduled for the next available slot.',
  },
  {
    question: 'What if I’m not available at the time of delivery?',
    answer:
      'Add an alternate receiver when booking, or message your rider from the booking details. The rider will wait up to 10 minutes before marking the delivery as attempted.',
  },
  {
    question: 'How do I change or cancel my booking?',
    answer:
      'Open the booking from the Bookings tab. You can edit details or cancel for free while the booking is still pending and no rider has been assigned.',
  },
  {
    question: 'Which payment methods are accepted?',
    answer: 'We accept cash on delivery, GCash, Maya, and major credit or debit cards.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Most deliveries within the city are completed within 1–3 hours. Exact estimates are shown before you confirm your booking.',
  },
  {
    question: 'What items can I send?',
    answer:
      'You can send documents, parcels, food, groceries, and other everyday items. Illegal, hazardous, and perishable items without proper packaging are not allowed.',
  },
];

export const supportEmail = 'support@shipzy.com';

export type EmployeeStatus = 'Active' | 'Inactive';

export interface Employee {
  id: string;
  name: string;
  email: string;
  mobile: string;
  status: EmployeeStatus;
  lastActive: string;
}

export const employees: Employee[] = [
  { id: 'EMP-00001', name: 'Juan Dela Cruz', email: 'juan.delacruz@company.com', mobile: '+63 918 234 5678', status: 'Active', lastActive: '1 hour ago' },
  { id: 'EMP-00002', name: 'Maria Santos', email: 'maria.santos@company.com', mobile: '+63 917 456 1290', status: 'Active', lastActive: '3 hours ago' },
  { id: 'EMP-00003', name: 'Paolo Reyes', email: 'paolo.reyes@company.com', mobile: '+63 915 882 0417', status: 'Inactive', lastActive: '2 weeks ago' },
  { id: 'EMP-00004', name: 'Andrea Lim', email: 'andrea.lim@company.com', mobile: '+63 926 310 7742', status: 'Active', lastActive: 'Yesterday' },
  { id: 'EMP-00005', name: 'Carlo Mendoza', email: 'carlo.mendoza@company.com', mobile: '+63 939 645 2081', status: 'Active', lastActive: '30 minutes ago' },
  { id: 'EMP-00006', name: 'Jenny Villanueva', email: 'jenny.villanueva@company.com', mobile: '+63 908 127 5563', status: 'Inactive', lastActive: '1 month ago' },
];

/** Totals for the whole business account (the list above is the first page). */
export const employeeStats = { total: 18, active: 16, inactive: 2 };

export function employeeInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}
