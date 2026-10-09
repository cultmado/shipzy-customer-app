import boxImg from '@/assets/images/box.png';
import envelopeImg from '@/assets/images/envelope.png';
import pouchImg from '@/assets/images/pouch.png';
import customImg from '@/assets/images/custom.png';
import type { BadgeTone } from '@/components/ui/StatusBadge.vue';

/* ------------------------------------------------------------------ */
/* Create form options                                                 */
/* ------------------------------------------------------------------ */

export type ServiceType = 'pickup' | 'dropoff';

export const serviceTypeOptions: { value: ServiceType; title: string; description: string }[] = [
  { value: 'pickup', title: 'Pickup from Address', description: 'Shipzy collects the parcel from the origin address below.' },
  { value: 'dropoff', title: 'Drop Off at Nearby Hub', description: 'Bring the parcel to a Shipzy hub you select.' },
];

export interface Hub {
  name: string;
  address: string;
}

export const hubs: Hub[] = [
  { name: 'Shipzy Lanang Hub', address: 'J.P. Laurel Avenue, Lanang, Davao City' },
  { name: 'Shipzy Bajada Hub', address: 'J.P. Laurel Avenue, Bajada, Davao City' },
  { name: 'Shipzy Matina Hub', address: 'MacArthur Highway, Matina, Davao City' },
  { name: 'Shipzy Cebu IT Park Hub', address: 'Lahug, Cebu City, Cebu' },
];

export type PackagingType = 'Box' | 'Envelope' | 'Pouch' | 'Custom';

export const packagingTypes: { value: PackagingType; image: string }[] = [
  { value: 'Box', image: boxImg },
  { value: 'Envelope', image: envelopeImg },
  { value: 'Pouch', image: pouchImg },
  { value: 'Custom', image: customImg },
];

export const packagingImage: Record<PackagingType, string> = {
  Box: boxImg,
  Envelope: envelopeImg,
  Pouch: pouchImg,
  Custom: customImg,
};

export const packageSizes = ['Small', 'Medium', 'Large', 'Custom'] as const;
export type PackageSize = (typeof packageSizes)[number];

/** Preset dimensions (cm) filled in when a size is chosen. */
export const sizePresets: Record<Exclude<PackageSize, 'Custom'>, { length: number; width: number; height: number }> = {
  Small: { length: 30, width: 20, height: 15 },
  Medium: { length: 45, width: 35, height: 30 },
  Large: { length: 80, width: 55, height: 45 },
};

export const paymentModes = ['Cash on Delivery (COD)', 'GCash', 'Maya', 'Credit / Debit Card', 'Bank Transfer'];
export const shipmentModes = ['Express', 'Standard', 'Economy'];

export const provinces = ['Davao del Sur', 'Davao del Norte', 'Davao Oriental', 'Cebu', 'Metro Manila', 'South Cotabato'];
export const cities: Record<string, string[]> = {
  'Davao del Sur': ['Davao City', 'Digos City', 'Santa Cruz'],
  'Davao del Norte': ['Tagum City', 'Panabo City', 'Island Garden City of Samal'],
  'Davao Oriental': ['Mati City', 'Baganga'],
  Cebu: ['Cebu City', 'Mandaue City', 'Lapu-Lapu City'],
  'Metro Manila': ['Makati City', 'Quezon City', 'Taguig City', 'Manila'],
  'South Cotabato': ['General Santos City', 'Koronadal City'],
};
export const barangays = ['Brgy. San Isidro', 'Brgy. Luz', 'Brgy. Lanang', 'Brgy. Bajada', 'Brgy. Poblacion', 'Brgy. Buhangin'];
export const countries = ['Philippines'];

export function calcCbm(l: number, w: number, h: number, qty: number): number {
  return (l * w * h * qty) / 1_000_000;
}

/* ------------------------------------------------------------------ */
/* Checkout / booking details                                          */
/* ------------------------------------------------------------------ */

export interface FeeLine {
  label: string;
  amount: number;
}

export const parcelFees: FeeLine[] = [
  { label: 'Base Shipping Fee', amount: 650 },
  { label: 'Handling Fee', amount: 220 },
  { label: 'Insurance', amount: 75 },
  { label: 'Fuel Surcharge', amount: 45 },
  { label: 'VAT (12%)', amount: 230 },
];

export const sumFees = (fees: FeeLine[]) => fees.reduce((s, f) => s + f.amount, 0);

export const checkoutSummary = {
  origin: { mode: 'Pickup from Address', place: 'Davao City, Davao del Sur' },
  destination: { mode: 'Deliver to Address', place: 'Cebu City, Cebu' },
  declaredValue: 25000,
  paymentMode: 'Cash on Delivery',
  shipmentMode: 'Express',
  weight: '12 kg',
  cbm: '0.000 CBM',
  fees: parcelFees,
  confirmRoute: '/bookings/parcel/PAR-2026-0715-0098',
};

export type TimelineState = 'done' | 'current' | 'pending';

export interface TimelineStep {
  title: string;
  /** e.g. "Jul 17 · 10:35 AM"; omit to show "Pending" for pending steps */
  time?: string;
  description: string;
  state: TimelineState;
}

export interface Party {
  /** "Pickup from Address", "Deliver to Address", "Drop Off at Nearby Hub" … */
  mode: string;
  name: string;
  mobile: string;
  address: string;
}

export interface Attachment {
  name: string;
  size: string;
}

export interface ParcelBooking {
  id: string;
  createdAt: string;
  invoiceNo: string;
  invoiceDate: string;
  invoiceTime: string;
  status: string;
  statusDescription: string;
  /** lucide icon key used in the status hero */
  statusIcon: 'truck' | 'clock' | 'check';
  estimatedDelivery: string;
  timeline: TimelineStep[];
  origin: Party;
  destination: Party;
  package: {
    type: 'Box' | 'Envelope' | 'Pouch' | 'Custom';
    size: string;
    quantity: number;
    weight: string;
    dimensions: string;
    cbm: string;
    declaredValue: number;
    shipmentMode: string;
    trackingNumber: string;
  };
  notes: string;
  attachments: Attachment[];
  courier?: { name: string; vehicle: string; plate: string };
  payment: { method: string; status: string; statusTone: BadgeTone };
  fees: FeeLine[];
  /** Label of the total row, e.g. "Total Paid" / "Total Due" */
  totalLabel: string;
  cancellable: boolean;
}

export const parcelBookings: Record<string, ParcelBooking> = {
  'PAR-2026-0715-0098': {
    id: 'PAR-2026-0715-0098',
    createdAt: 'July 17, 2026 · 10:35 AM',
    invoiceNo: 'INV-2026-0717-0042',
    invoiceDate: 'July 17, 2026',
    invoiceTime: '5:12 PM',
    status: 'In Transit',
    statusDescription: 'Preview the complete route from pick-up to drop-off, including additional stops.',
    statusIcon: 'truck',
    estimatedDelivery: 'July 18, 2026 · 2:00 PM – 5:00 PM',
    timeline: [
      { title: 'Booking Confirmed', time: 'Jul 17 · 10:35 AM', description: 'Shipment details were received', state: 'done' },
      { title: 'Parcel Collected', time: 'Jul 17 · 12:10 PM', description: 'Courier collected the parcel from the sender.', state: 'done' },
      { title: 'Processed at Hub', time: 'Jul 17 · 2:45 PM', description: 'Package was checked and prepared for transit.', state: 'done' },
      { title: 'In Transit', time: 'Jul 17 · 4:20 PM', description: 'Shipment is moving toward the destination city.', state: 'current' },
      { title: 'Out for Delivery', description: 'Courier is delivering the parcel to the receiver.', state: 'pending' },
      { title: 'Delivered', description: 'Parcel was successfully received.', state: 'pending' },
    ],
    origin: {
      mode: 'Pickup from Address',
      name: 'Ken Jhi Barchita',
      mobile: '+63 912 345 6789',
      address: 'Blk 12 Lot 34, Sunrise Drive, Brgy. San Isidro, Davao City, Davao del Sur 8000',
    },
    destination: {
      mode: 'Deliver to Address',
      name: 'Maria Santos',
      mobile: '+63 917 888 2211',
      address: 'Unit 8B, Cebu Business Park, Brgy. Luz, Cebu City, Cebu 6000',
    },
    package: {
      type: 'Box',
      size: 'Large',
      quantity: 2,
      weight: '12 kg',
      dimensions: '80 × 55 × 45 cm',
      cbm: '0.396 CBM',
      declaredValue: 25000,
      shipmentMode: 'Express',
      trackingNumber: 'SHPZY-PC-80492173',
    },
    notes: 'Fragile electronics inside. Please keep upright and avoid stacking heavy items on top.',
    attachments: [
      { name: 'parcel-front.jpg', size: '1.8 MB' },
      { name: 'parcel-front.jpg', size: '1.8 MB' },
    ],
    courier: { name: 'Jerome Alcantara', vehicle: 'Closed Van', plate: 'ABC 1234' },
    payment: { method: 'GCash', status: 'Paid', statusTone: 'green' },
    fees: parcelFees,
    totalLabel: 'Total Paid',
    cancellable: true,
  },
  'PAR-2026-0705-0077': {
    id: 'PAR-2026-0705-0077',
    createdAt: 'July 5, 2026 · 9:00 AM',
    invoiceNo: 'INV-2026-0705-0077',
    invoiceDate: 'July 5, 2026',
    invoiceTime: '9:04 AM',
    status: 'Pending Confirmation',
    statusDescription: 'Your booking was received and is waiting to be confirmed by the nearest Shipzy hub.',
    statusIcon: 'clock',
    estimatedDelivery: 'July 8, 2026 · 9:00 AM – 12:00 PM',
    timeline: [
      { title: 'Booking Confirmed', description: 'Shipment details were received', state: 'current', time: 'Jul 5 · 9:00 AM' },
      { title: 'Parcel Collected', description: 'Courier collected the parcel from the sender.', state: 'pending' },
      { title: 'Processed at Hub', description: 'Package was checked and prepared for transit.', state: 'pending' },
      { title: 'In Transit', description: 'Shipment is moving toward the destination city.', state: 'pending' },
      { title: 'Out for Delivery', description: 'Courier is delivering the parcel to the receiver.', state: 'pending' },
      { title: 'Delivered', description: 'Parcel was successfully received.', state: 'pending' },
    ],
    origin: {
      mode: 'Drop Off at Nearby Hub',
      name: 'Ken Jhi Barchita',
      mobile: '+63 912 345 6789',
      address: 'Shipzy Lanang Hub, J.P. Laurel Avenue, Lanang, Davao City',
    },
    destination: {
      mode: 'Deliver to Address',
      name: 'Carlo Mendoza',
      mobile: '+63 918 204 7731',
      address: 'Purok 4, Brgy. Lagao, General Santos City, South Cotabato 9500',
    },
    package: {
      type: 'Envelope',
      size: 'Small',
      quantity: 1,
      weight: '0.5 kg',
      dimensions: '30 × 20 × 2 cm',
      cbm: '0.001 CBM',
      declaredValue: 3500,
      shipmentMode: 'Standard',
      trackingNumber: 'SHPZY-PC-80311095',
    },
    notes: 'Important documents. Please do not fold.',
    attachments: [{ name: 'documents.jpg', size: '0.9 MB' }],
    payment: { method: 'Cash on Delivery', status: 'Unpaid', statusTone: 'orange' },
    fees: [
      { label: 'Base Shipping Fee', amount: 1250 },
      { label: 'Handling Fee', amount: 300 },
      { label: 'Insurance', amount: 250 },
      { label: 'Fuel Surcharge', amount: 110 },
      { label: 'VAT (12%)', amount: 230 },
    ],
    totalLabel: 'Total Due',
    cancellable: true,
  },
};

export function getParcelBooking(id: string): ParcelBooking {
  return parcelBookings[id] ?? { ...parcelBookings['PAR-2026-0715-0098'], id };
}
