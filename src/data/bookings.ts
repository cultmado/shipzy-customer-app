import type { BadgeTone } from '@/components/ui/StatusBadge.vue';
import type { ServiceKey } from './services';

export type BookingStatus =
  | 'Booking Confirmed'
  | 'Driver Assigned'
  | 'In Transit'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Pending'
  | 'Canceled';

export interface Booking {
  id: string;
  service: ServiceKey;
  date: string;
  time: string;
  amount: number;
  status: BookingStatus;
  statusNote: string;
  from?: string;
  to?: string;
}

export const statusTone: Record<BookingStatus, BadgeTone> = {
  'Booking Confirmed': 'blue',
  'Driver Assigned': 'orange',
  'In Transit': 'green',
  'Out for Delivery': 'orange',
  Delivered: 'green',
  Pending: 'orange',
  Canceled: 'red',
};

export const bookings: Booking[] = [
  {
    id: 'PBL-2026-0717-0042',
    service: 'pabili',
    date: 'July 17, 2026',
    time: '02:30 PM',
    amount: 1250,
    status: 'Booking Confirmed',
    statusNote: 'Your Pabili booking was successfully created',
  },
  {
    id: 'PAR-2026-0715-0098',
    service: 'parcel',
    date: 'July 15, 2026',
    time: '02:30 PM',
    amount: 1250,
    status: 'In Transit',
    statusNote: 'Your parcel is currently on the way to its destination',
    from: 'Cebu City',
    to: 'Davao City',
  },
  {
    id: 'VEH-2026-0712-0001',
    service: 'vehicle',
    date: 'July 12, 2026',
    time: '02:30 PM',
    amount: 1250,
    status: 'Driver Assigned',
    statusNote: 'Your assigned driver is heading to the pickup point',
  },
  {
    id: 'PBL-2026-0710-0031',
    service: 'pabili',
    date: 'July 10, 2026',
    time: '11:15 AM',
    amount: 860,
    status: 'Delivered',
    statusNote: 'Your items were delivered successfully',
  },
  {
    id: 'PAR-2026-0705-0077',
    service: 'parcel',
    date: 'July 5, 2026',
    time: '09:00 AM',
    amount: 2140,
    status: 'Pending',
    statusNote: 'Waiting for confirmation',
    from: 'Davao City',
    to: 'General Santos',
  },
];

/** Route to a booking's detail page. */
export function bookingDetailRoute(b: Pick<Booking, 'service' | 'id'>): string {
  return `/bookings/${b.service}/${b.id}`;
}
