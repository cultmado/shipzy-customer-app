import foodImg from '@/assets/images/food.png';
import groceryImg from '@/assets/images/grocery.png';
import pharmacyImg from '@/assets/images/pharmacy.png';
import retailImg from '@/assets/images/retail.png';
import customImg from '@/assets/images/pabili-custom.png';

/* ------------------------------------------------------------------ */
/* Booking form                                                        */
/* ------------------------------------------------------------------ */

export interface PabiliAddress {
  id: string;
  label: string;
  address: string;
  isDefault?: boolean;
}

export const savedAddresses: PabiliAddress[] = [
  {
    id: 'home',
    label: 'Home',
    address: 'Unit 502, Quimpo Tower, Gov. Duterte St., Poblacion District, Davao City 8000',
    isDefault: true,
  },
  {
    id: 'work',
    label: 'Work',
    address: 'Unit 502, Quimpo Tower, Gov. Duterte St., Poblacion District, Davao City 8000',
  },
];

export type PabiliCategoryKey = 'food' | 'grocery' | 'pharmacy' | 'retail' | 'custom';

export interface PabiliCategory {
  key: PabiliCategoryKey;
  label: string;
  image: string;
}

export const pabiliCategories: PabiliCategory[] = [
  { key: 'food', label: 'Food', image: foodImg },
  { key: 'grocery', label: 'Grocery', image: groceryImg },
  { key: 'pharmacy', label: 'Pharmacy Errands', image: pharmacyImg },
  { key: 'retail', label: 'Retail Store Purchase', image: retailImg },
  { key: 'custom', label: 'Custom Request', image: customImg },
];

export interface PabiliProduct {
  id: string;
  name: string;
  price: number;
}

export interface PabiliStore {
  id: string;
  name: string;
  eta: string;
  distance: string;
  products: PabiliProduct[];
}

const groceryProducts = (prefix: string): PabiliProduct[] => [
  { id: `${prefix}-rice`, name: 'Jasmine Rice 5kg', price: 300 },
  { id: `${prefix}-eggs`, name: 'Fresh Eggs (12 pcs)', price: 95 },
  { id: `${prefix}-oil`, name: 'Cooking Oil 1L', price: 120 },
  { id: `${prefix}-milk`, name: 'Fresh Milk 1L', price: 98 },
  { id: `${prefix}-bread`, name: 'Whole Wheat Bread Loaf', price: 45 },
  { id: `${prefix}-coffee`, name: '3-in-1 Coffee (30 sachets)', price: 210 },
];

export const pabiliStores: PabiliStore[] = [
  { id: 'watermart-davao', name: 'WaterMart Davao', eta: '30 - 40 min', distance: '1.2 KM', products: groceryProducts('wm') },
  { id: 'sm-supermarket', name: 'SM Supermarket', eta: '30 - 40 min', distance: '1.2 KM', products: groceryProducts('sm') },
  { id: 'gaisano-mall', name: 'Gaisano Mall Davao', eta: '35 - 45 min', distance: '2.4 KM', products: groceryProducts('gm') },
  { id: 'robinsons-supermarket', name: 'Robinsons Supermarket', eta: '40 - 50 min', distance: '3.1 KM', products: groceryProducts('rs') },
];

export const PABILI_MAX_ITEMS_VALUE = 20000;

/** Fee schedule used to compute the checkout estimate. */
export const pabiliFees = {
  service: 50,
  deliveryPerStore: 60,
  multiStorePerExtraStore: 30,
  smallOrderThreshold: 300,
  smallOrder: 30,
  platform: 10,
};

export function estimateFees(subtotal: number, storeCount: number) {
  const delivery = pabiliFees.deliveryPerStore * storeCount;
  const multiStore = pabiliFees.multiStorePerExtraStore * Math.max(0, storeCount - 1);
  const smallOrder = subtotal > 0 && subtotal < pabiliFees.smallOrderThreshold ? pabiliFees.smallOrder : 0;
  const total = subtotal + pabiliFees.service + delivery + multiStore + smallOrder + pabiliFees.platform;
  return { service: pabiliFees.service, delivery, multiStore, smallOrder, platform: pabiliFees.platform, total };
}

/** Booking created by the demo flow. */
export const NEW_PABILI_BOOKING_ID = 'PBL-2026-0717-0042';

/* ------------------------------------------------------------------ */
/* Booking details / invoice                                           */
/* ------------------------------------------------------------------ */

export interface PurchasedItem {
  name: string;
  price: number;
  qty: number;
}

export interface PurchasedStore {
  name: string;
  address: string;
  status: 'Purchased' | 'In progress';
  receiptNote: string;
  hasReceipt: boolean;
  items: PurchasedItem[];
}

export interface ProgressStage {
  title: string;
  time: string;
  description: string;
  done: boolean;
  current?: boolean;
}

export interface PabiliBookingDetail {
  id: string;
  invoiceNo: string;
  invoiceDate: string;
  invoiceTime: string;
  dateCreated: string;
  status: { title: string; message: string; updated: string };
  tracking: { eta: string; distance: string; destination: string };
  progress: ProgressStage[];
  stores: PurchasedStore[];
  delivery: {
    address: string;
    recipient: string;
    phone: string;
    type: string;
    schedule: string;
  };
  notes: string;
  rider: { name: string; initials: string; deliveries: number; plate: string };
  payment: { method: string; description: string; status: 'Paid' | 'Unpaid' };
  fees: { service: number; delivery: number; multiStore: number; platform: number };
}

const DESTINATION = 'Blk 12 Lot 34, Sunrise Drive, Brgy. San Isidro, Davao City, Davao del Sur 8000';

export const pabiliBookingDetail: Omit<PabiliBookingDetail, 'id' | 'invoiceNo'> = {
  invoiceDate: 'July 17, 2026',
  invoiceTime: '5:12 PM',
  dateCreated: 'July 17, 2026 • 2:18 PM',
  status: {
    title: 'Your order is out for delivery',
    message:
      "Your rider has completed the purchases and is now heading to your delivery address. Track the rider's latest location and estimated arrival below.",
    updated: 'Today • 2:41 PM',
  },
  tracking: { eta: '18–25 minutes', distance: '4.8 km', destination: DESTINATION },
  progress: [
    { title: 'Booking Confirmed', time: 'Jul 17 · 2:18 PM', description: 'Your Pabili booking was successfully created.', done: true },
    { title: 'Rider Assigned', time: 'Jul 17 · 2:24 PM', description: 'A rider accepted your booking.', done: true },
    { title: 'Purchasing Items', time: 'Jul 17 · 2:41 PM', description: 'Your rider is currently purchasing your requested items.', done: true },
    { title: 'Out for Delivery', time: 'Jul 17 · 4:52 PM', description: 'Your order will be delivered to your selected address.', done: true, current: true },
    { title: 'Delivered', time: 'Pending', description: 'Your Pabili booking has been completed.', done: false },
  ],
  stores: [
    {
      name: 'WalterMart Davao',
      address: 'Maa Road, Davao City',
      status: 'Purchased',
      receiptNote: 'Official receipt uploaded by rider',
      hasReceipt: true,
      items: [
        { name: 'Jasmine Rice 5kg', price: 300, qty: 2 },
        { name: 'Fresh Eggs (12 pcs)', price: 95, qty: 1 },
        { name: 'Cooking Oil 1L', price: 120, qty: 1 },
      ],
    },
    {
      name: 'SM Supermarket',
      address: 'SM City Davao, Ecoland',
      status: 'In progress',
      receiptNote: 'Waiting for final store receipt',
      hasReceipt: false,
      items: [
        { name: 'Fresh Milk 1L', price: 98, qty: 2 },
        { name: 'Whole Wheat Bread Loaf', price: 45, qty: 1 },
      ],
    },
  ],
  delivery: {
    address: DESTINATION,
    recipient: 'Ken Jhi Barchita',
    phone: '0917 123 4567',
    type: 'Scheduled Delivery',
    schedule: 'July 17, 2026 at 5:30 PM',
  },
  notes: 'Please call me if any item is unavailable. No substitutions without approval.',
  rider: { name: 'Juan Miguel Santos', initials: 'JM', deliveries: 312, plate: 'ABC 1234' },
  payment: { method: 'GCash', description: 'Digital payment', status: 'Paid' },
  fees: { service: 50, delivery: 120, multiStore: 40, platform: 10 },
};

export function getPabiliBooking(id: string): PabiliBookingDetail {
  const ref = id || NEW_PABILI_BOOKING_ID;
  return {
    ...pabiliBookingDetail,
    id: ref,
    invoiceNo: ref.replace(/^PBL-/, 'INV-'),
  };
}

export function storeTotal(store: PurchasedStore): number {
  return store.items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function bookingSubtotal(b: Pick<PabiliBookingDetail, 'stores'>): number {
  return b.stores.reduce((sum, s) => sum + storeTotal(s), 0);
}

export function bookingTotal(b: Pick<PabiliBookingDetail, 'stores' | 'fees'>): number {
  const f = b.fees;
  return bookingSubtotal(b) + f.service + f.delivery + f.multiStore + f.platform;
}
