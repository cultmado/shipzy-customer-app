import { bookings, type Booking, type BookingStatus } from './bookings';
import type { BadgeTone } from '@/components/ui/StatusBadge.vue';

/** Older, completed bookings shown on My Bookings in addition to the shared list. */
const history: Booking[] = [
  { id: 'VEH-2026-0702-0014', service: 'vehicle', date: 'July 2, 2026', time: '08:45 AM', amount: 3200, status: 'Delivered', statusNote: 'Your vehicle trip was completed successfully' },
  { id: 'PBL-2026-0628-0022', service: 'pabili', date: 'June 28, 2026', time: '04:10 PM', amount: 745, status: 'Delivered', statusNote: 'Your items were delivered successfully' },
  { id: 'PAR-2026-0621-0063', service: 'parcel', date: 'June 21, 2026', time: '10:20 AM', amount: 1580, status: 'Delivered', statusNote: 'Your parcel was delivered successfully', from: 'Davao City', to: 'Cagayan de Oro' },
  { id: 'PBL-2026-0615-0019', service: 'pabili', date: 'June 15, 2026', time: '01:00 PM', amount: 520, status: 'Delivered', statusNote: 'Your items were delivered successfully' },
  { id: 'VEH-2026-0608-0009', service: 'vehicle', date: 'June 8, 2026', time: '07:30 AM', amount: 4100, status: 'Delivered', statusNote: 'Your vehicle trip was completed successfully' },
  { id: 'PAR-2026-0601-0041', service: 'parcel', date: 'June 1, 2026', time: '03:15 PM', amount: 980, status: 'Delivered', statusNote: 'Your parcel was delivered successfully', from: 'Cebu City', to: 'Davao City' },
  { id: 'PBL-2026-0525-0011', service: 'pabili', date: 'May 25, 2026', time: '02:30 PM', amount: 1250, status: 'Delivered', statusNote: 'Your items were delivered successfully' },
];

export const allBookings: Booking[] = [...bookings, ...history];

export type BookingFilter = 'All' | 'Active' | 'Pending' | 'Completed' | 'Canceled';

export function bookingGroup(status: BookingStatus): Exclude<BookingFilter, 'All'> {
  if (status === 'Pending') return 'Pending';
  if (status === 'Delivered') return 'Completed';
  if (status === 'Canceled') return 'Canceled';
  return 'Active';
}

/** Dot + label colors for the status line on booking cards. */
export const statusLine: Record<BookingStatus, { dot: string; text: string }> = {
  'Booking Confirmed': { dot: 'bg-primary', text: 'text-primary' },
  'Driver Assigned': { dot: 'bg-amber-400', text: 'text-amber-700' },
  'In Transit': { dot: 'bg-green-500', text: 'text-green-500' },
  'Out for Delivery': { dot: 'bg-warning', text: 'text-warning' },
  Delivered: { dot: 'bg-success', text: 'text-success' },
  Pending: { dot: 'bg-amber-400', text: 'text-amber-700' },
  Canceled: { dot: 'bg-danger', text: 'text-danger' },
};

/** Dashboard "Recent Bookings" rows (display status as in the design). */
export const recentBookings: { booking: Booking; label: string; tone: BadgeTone }[] = [
  { booking: bookings[0], label: 'Out for Delivery', tone: 'orange' },
  { booking: bookings[1], label: 'Delivered', tone: 'green' },
  { booking: bookings[2], label: 'On the Way', tone: 'blue' },
];
