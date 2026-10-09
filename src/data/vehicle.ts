import { computed, reactive } from 'vue';
import motorcycleImg from '@/assets/images/motorcycle.png';
import sedanImg from '@/assets/images/sedan.png';
import vanImg from '@/assets/images/van.png';
import closedVanImg from '@/assets/images/closed-van.png';
import lightTruckImg from '@/assets/images/light-truck.png';
import heavyTruckImg from '@/assets/images/heavy-truck.png';

export type VehicleKey = 'motorcycle' | 'sedan' | 'van' | 'closed-van' | 'light-truck' | 'heavy-truck';

export interface VehicleType {
  key: VehicleKey;
  name: string;
  image: string;
  capacityKg: number;
  capacity: string;
  baseFee: number;
}

export const vehicleTypes: VehicleType[] = [
  { key: 'motorcycle', name: 'Motorcycle', image: motorcycleImg, capacityKg: 20, capacity: 'Up to 20 kg', baseFee: 250 },
  { key: 'sedan', name: 'Sedan', image: sedanImg, capacityKg: 100, capacity: 'Up to 100 kg', baseFee: 450 },
  { key: 'van', name: 'Van', image: vanImg, capacityKg: 800, capacity: 'Up to 800 kg', baseFee: 650 },
  { key: 'closed-van', name: 'Closed Van', image: closedVanImg, capacityKg: 1500, capacity: 'Up to 1,500 kg', baseFee: 800 },
  { key: 'light-truck', name: 'Light Truck', image: lightTruckImg, capacityKg: 3000, capacity: 'Up to 3,000 kg', baseFee: 1200 },
  { key: 'heavy-truck', name: 'Heavy Truck', image: heavyTruckImg, capacityKg: 10000, capacity: 'Up to 10,000 kg', baseFee: 2200 },
];

export function vehicleByKey(key: VehicleKey): VehicleType {
  return vehicleTypes.find((v) => v.key === key) ?? vehicleTypes[0];
}

export type ExtraKey = 'fragile' | 'loading' | 'unloading' | 'helper';

export const extraServices: { key: ExtraKey; title: string; description: string; fee: number }[] = [
  { key: 'fragile', title: 'Fragile Items', description: 'Requires extra careful handling', fee: 50 },
  { key: 'loading', title: 'Loading Assistance', description: 'Help loading items at pick-up.', fee: 100 },
  { key: 'unloading', title: 'Unloading Assistance', description: 'Help unloading items at the destination.', fee: 100 },
  { key: 'helper', title: 'With Helper', description: 'Add one helper to the trip.', fee: 150 },
];

export type PaymentKey = 'cod' | 'gcash';

export const paymentMethods: { key: PaymentKey; title: string; description: string }[] = [
  { key: 'cod', title: 'Cash on Delivery', description: 'Pay the driver after delivery.' },
  { key: 'gcash', title: 'GCash Transfer', description: 'Instructions appear after confirmation' },
];

export const itemTypes = [
  'Office Equipment',
  'Furniture',
  'Appliances',
  'Household Items',
  'Construction Materials',
  'Food & Beverages',
  'Documents',
  'Others',
];

export const DISTANCE_FEE = 700;
export const STOP_FEE = 150;
export const TOLL_FEE = 50;

export interface LocationDraft {
  location: string;
  address: string;
  contactPerson: string;
  contactNumber: string;
  subdivision: string;
  notes: string;
}

export interface VehicleDraft {
  itemType: string;
  declaredValue: string;
  requestType: 'on-demand' | 'schedule';
  pickupDate: string;
  pickupTime: string;
  vehicle: VehicleKey;
  extras: ExtraKey[];
  pickup: LocationDraft;
  stops: string[];
  dropoff: LocationDraft;
  totalWeight: string;
  itemDescription: string;
  payment: PaymentKey;
  notes: string;
}

const emptyLocation = (): LocationDraft => ({
  location: '',
  address: '',
  contactPerson: '',
  contactNumber: '',
  subdivision: '',
  notes: '',
});

const initialDraft = (): VehicleDraft => ({
  itemType: '',
  declaredValue: '',
  requestType: 'schedule',
  pickupDate: '',
  pickupTime: '',
  vehicle: 'motorcycle',
  extras: [],
  pickup: emptyLocation(),
  stops: [],
  dropoff: emptyLocation(),
  totalWeight: '',
  itemDescription: '',
  payment: 'cod',
  notes: '',
});

/** In-memory booking draft shared between the create and checkout screens (no backend). */
export const vehicleDraft = reactive<VehicleDraft>(initialDraft());

export function resetVehicleDraft() {
  Object.assign(vehicleDraft, initialDraft());
}

/** Mock places returned by the "Choose on Google Map" picker. */
export const mockPlaces = {
  pickup: 'Davao City, Davao del Sur',
  dropoff: 'Cebu City, Cebu',
  stops: [
    'SM Lanang Premier, J.P. Laurel Avenue, Lanang, Davao City',
    'Abreeza Mall, J.P. Laurel Avenue, Bajada, Davao City',
    'Victoria Plaza, J.P. Laurel Avenue, Bajada, Davao City',
  ],
};

export const vehicleFees = computed(() => {
  const vehicle = vehicleByKey(vehicleDraft.vehicle);
  const assistance = extraServices
    .filter((e) => vehicleDraft.extras.includes(e.key))
    .reduce((sum, e) => sum + e.fee, 0);
  const stops = vehicleDraft.stops.length * STOP_FEE;
  return {
    vehicle: vehicle.baseFee,
    distance: DISTANCE_FEE,
    stopCount: vehicleDraft.stops.length,
    stops,
    assistance,
    toll: TOLL_FEE,
    total: vehicle.baseFee + DISTANCE_FEE + stops + assistance + TOLL_FEE,
  };
});

/* ------------------------------------------------------------------ */
/* Booking details + invoice mock                                      */
/* ------------------------------------------------------------------ */

export interface ContactPoint {
  label: string;
  name: string;
  contactPerson: string;
  mobile: string;
  address: string;
}

export interface RouteStop {
  name: string;
  address: string;
  contact: string;
}

export const vehicleBooking = {
  id: 'VEH-2026-0712-0001',
  createdAt: 'July 12, 2026 · 2:30 PM',
  status: 'Driver Assigned',
  statusNote: 'Your assigned driver is heading to the pick-up point.',
  estimatedPickup: 'July 17, 2026 · 9:00 AM',
  progress: [
    { title: 'Booking Confirmed', time: 'Jul 12 · 2:30 PM', note: 'Vehicle request details were received.' },
    { title: 'Driver Assigned', time: 'Jul 12 · 3:05 PM', note: 'A driver and vehicle were assigned to your trip.' },
    { title: 'Arrived at Pick-up', time: 'Pending', note: 'Driver arrives at the pick-up point.' },
    { title: 'Cargo Loaded', time: 'Pending', note: 'Cargo is loaded and the trip begins.' },
    { title: 'In Transit', time: 'Pending', note: 'Vehicle is on the way to the drop-off point.' },
    { title: 'Completed', time: 'Pending', note: 'Cargo was successfully delivered.' },
  ],
  currentStep: 1,
  pickup: {
    label: 'Pick-up',
    name: 'Davao Warehouse',
    contactPerson: 'Ken Jhi Barchita',
    mobile: '0917 123 4567',
    address: 'J.P. Laurel Avenue, Bajada, Davao City, Davao del Sur',
  } as ContactPoint,
  dropoff: {
    label: 'Destination',
    name: 'Final Drop-off',
    contactPerson: 'Joanna Cruz',
    mobile: '0917 123 4567',
    address: 'SM City Davao, Quimpo Boulevard, Ecoland, Davao City',
  } as ContactPoint,
  stops: [
    { name: 'Stop 1', address: 'SM Lanang Premier, J.P. Laurel Avenue, Lanang, Davao City', contact: 'Angela Reyes · +63 917 881 2034' },
    { name: 'Stop 2', address: 'Abreeza Mall, J.P. Laurel Avenue, Bajada, Davao City', contact: 'Mark Villanueva · +63 918 552 1190' },
  ] as RouteStop[],
  vehicle: vehicleByKey('closed-van'),
  plateNumber: 'ABC 1234',
  cargoType: 'Office Equipment',
  totalWeight: '640 kg',
  requestType: 'Scheduled',
  declaredValue: 85000,
  distance: '31.6 km',
  duration: '1 hr 24 min',
  pickupSchedule: 'July 17, 2026 · 9:00 AM',
  itemDescription: 'Office desks, ergonomic chairs, computer units, boxed monitors, and filing cabinets.',
  services: ['Loading Assistance', 'Unloading Assistance', '1 Additional Helper', 'Fragile Item Handling'],
  notes: 'Please secure all monitors with protective blankets. Call the receiver before reaching the final destination.',
  driver: { name: 'Jerome Alcantara', initials: 'JA', mobile: '+63 917 555 0142', rating: 4.9 },
  paymentMethod: 'GCash',
  paymentStatus: 'Paid',
  transaction: 'GC2026071700192',
  fees: [
    { label: 'Vehicle Fee', amount: 800 },
    { label: 'Distance Fee', amount: 700 },
    { label: 'Additional Stops', amount: 300 },
    { label: 'Helper Fee', amount: 150 },
    { label: 'Assistance Fees', amount: 200 },
    { label: 'Toll & Other Fees', amount: 50 },
  ],
  total: 2200,
};

export const vehicleInvoice = {
  invoiceNumber: 'INV-VR-20260717-0048',
  invoiceNo: 'INV-2026-0717-0048',
  bookingNo: 'VR-20260717-0048',
  date: 'July 17, 2026',
  time: '10:48 AM',
};

/* ------------------------------------------------------------------ */
/* Vehicle Request Details screen                                       */
/* ------------------------------------------------------------------ */

export type RoutePointState = 'completed' | 'current' | 'pending';

export interface RoutePoint {
  kind: 'pickup' | 'stop' | 'dropoff';
  eyebrow: string;
  state: RoutePointState;
  title: string;
  address: string;
  contactLabel: string;
  contactPerson: string;
  contactNumber: string;
  instructions?: string;
  times?: { arrived: string; completed: string; left: string };
}

export type BookingEventIcon = 'check' | 'driver' | 'package' | 'navigate' | 'flag';

export interface BookingEvent {
  title: string;
  description: string;
  date?: string;
  time?: string;
  icon: BookingEventIcon;
  state: 'done' | 'current' | 'pending';
}

export const vehicleDetails = {
  bookingId: '#VR-20260717-0048',
  status: {
    title: 'Currently at Stop 2 of 2',
    description: 'The driver has completed the pickup and first stop and is currently handling the second scheduled stop.',
    stats: [
      { label: 'Estimated Delivery', value: '10:42 AM' },
      { label: 'Distance Left', value: '12.8 km' },
      { label: 'Stops Remaining', value: '1 of 2' },
    ],
  },
  tracking: [
    { label: 'Total Distance', value: '31.6 km' },
    { label: 'Travel Time', value: '1 hr 24 min' },
    { label: 'Additional Stops', value: '2' },
    { label: 'Vehicle Used', value: 'Closed Van' },
  ],
  route: [
    {
      kind: 'pickup',
      eyebrow: 'Pick-up Point',
      state: 'completed',
      title: 'Davao Warehouse',
      address: 'J.P. Laurel Avenue, Bajada, Davao City, Davao del Sur',
      contactLabel: 'Contact Person',
      contactPerson: 'Ken Barchita',
      contactNumber: '+63 912 345 6789',
    },
    {
      kind: 'stop',
      eyebrow: 'Additional Stop 1',
      state: 'completed',
      title: 'Stop 1',
      address: 'SM Lanang Premier, J.P. Laurel Avenue, Lanang, Davao City',
      contactLabel: 'Contact Person',
      contactPerson: 'Angela Reyes',
      contactNumber: '+63 917 881 2034',
      instructions: 'Collect two office chairs.',
      times: { arrived: '9:46 AM', completed: '9:54 AM', left: '9:58 AM' },
    },
    {
      kind: 'stop',
      eyebrow: 'Additional Stop 2',
      state: 'current',
      title: 'Stop 2',
      address: 'SM Lanang Premier, J.P. Laurel Avenue, Lanang, Davao City',
      contactLabel: 'Contact Person',
      contactPerson: 'Angela Reyes',
      contactNumber: '+63 917 881 2034',
      instructions: 'Collect two office chairs.',
      times: { arrived: '10:08 AM', completed: 'Pending', left: 'Pending' },
    },
    {
      kind: 'dropoff',
      eyebrow: 'Drop-off Point',
      state: 'pending',
      title: 'SM City Davao',
      address: 'Quimpo Boulevard, Ecoland, Davao City',
      contactLabel: 'Receiver',
      contactPerson: 'Joanna Cruz',
      contactNumber: '+63 912 345 6789',
    },
  ] as RoutePoint[],
  timeline: [
    { title: 'Booking Confirmed', description: 'Your vehicle request was successfully confirmed.', date: 'Jul 17, 2026', time: '8:10 AM', icon: 'check', state: 'done' },
    { title: 'Driver Assigned', description: 'Michael Santos and the closed van were assigned to your booking.', date: 'Jul 17, 2026', time: '8:24 AM', icon: 'driver', state: 'done' },
    { title: 'Pickup Completed', description: 'Cargo was loaded and the driver left the pickup point.', date: 'Jul 17, 2026', time: '9:18 AM', icon: 'package', state: 'done' },
    { title: 'Stop 1 Completed', description: 'The first additional stop was completed successfully.', date: 'Jul 17, 2026', time: '9:58 AM', icon: 'check', state: 'done' },
    { title: 'Currently at Stop 2', description: 'The driver is currently handling the second scheduled stop.', date: 'Jul 17, 2026', time: '10:08 AM', icon: 'navigate', state: 'current' },
    { title: 'Heading to Final Destination', description: 'The driver will continue to the receiver after completing the current stop.', icon: 'navigate', state: 'pending' },
    { title: 'Delivered', description: 'Cargo will be marked delivered after recipient confirmation.', icon: 'flag', state: 'pending' },
  ] as BookingEvent[],
  details: {
    requestType: 'Scheduled',
    pickupDate: 'Jul 17, 2026',
    pickupTime: '9:00 AM',
    createdDate: 'Jul 16, 2026',
    createdTime: '4:42 PM',
    declaredValue: 85000,
    totalWeight: '640 kg',
    cargoType: 'Office Equipment',
    itemDescription: 'Office desks, ergonomic chairs, computer units, boxed monitors, and filing cabinets.',
    extras: ['fragile', 'loading', 'unloading', 'helper'] as ExtraKey[],
  },
  driver: { name: 'Michael Santos', meta: 'Closed Van · ABC 1234' },
  vehicle: vehicleByKey('closed-van'),
  summary: [
    { label: 'Booking Date', value: 'Jul 17, 2026' },
    { label: 'Pickup Time', value: '9:00 AM' },
    { label: 'Payment Method', value: 'GCash Transfer' },
    { label: 'Payment Status', value: 'Paid', badge: 'green' as const },
    { label: 'Transaction ID', value: 'GC2026071700192' },
  ],
};
