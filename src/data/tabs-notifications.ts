import { computed, ref } from 'vue';
import type { ServiceKey } from './services';

export type NotificationStatus = 'Booking' | 'Delivery' | 'Payment' | 'Account';

export interface AppNotification {
  id: number;
  service: ServiceKey;
  title: string;
  message: string;
  bookingId: string;
  category: NotificationStatus;
  date: string;
  time: string;
  ago: string;
  read: boolean;
}

export const notifications: AppNotification[] = [
  { id: 1, service: 'pabili', title: 'Booking Confirmed!', message: 'Your Pabili Service booking  PBL-2026-0717-0042 has been confirmed.', bookingId: 'PBL-2026-0717-0042', category: 'Booking', date: 'August 10, 2026', time: '8:18 PM', ago: '2 mins ago', read: false },
  { id: 2, service: 'parcel', title: 'Parcel In Transit', message: 'Your parcel PAR-2026-0715-0098 is on the way to Davao City.', bookingId: 'PAR-2026-0715-0098', category: 'Delivery', date: 'August 10, 2026', time: '7:52 PM', ago: '28 mins ago', read: false },
  { id: 3, service: 'vehicle', title: 'Driver Assigned!', message: 'Juan Dela Cruz has been assigned to your booking VEH-2026-0712-0001.', bookingId: 'VEH-2026-0712-0001', category: 'Booking', date: 'August 10, 2026', time: '6:05 PM', ago: '2 hrs ago', read: false },
  { id: 4, service: 'pabili', title: 'Payment Received', message: 'We received your payment of ₱860.00 for PBL-2026-0710-0031.', bookingId: 'PBL-2026-0710-0031', category: 'Payment', date: 'August 9, 2026', time: '11:40 AM', ago: '1 day ago', read: false },
  { id: 5, service: 'pabili', title: 'Order Delivered!', message: 'Your Pabili Service order PBL-2026-0710-0031 has been delivered.', bookingId: 'PBL-2026-0710-0031', category: 'Delivery', date: 'August 9, 2026', time: '11:15 AM', ago: '1 day ago', read: false },
  { id: 6, service: 'parcel', title: 'Booking Pending', message: 'Your Parcel & Cargo booking PAR-2026-0705-0077 is awaiting confirmation.', bookingId: 'PAR-2026-0705-0077', category: 'Booking', date: 'August 8, 2026', time: '9:00 AM', ago: '2 days ago', read: true },
  { id: 7, service: 'vehicle', title: 'Password Updated', message: 'Your account password was changed successfully.', bookingId: 'VEH-2026-0712-0001', category: 'Account', date: 'August 7, 2026', time: '3:24 PM', ago: '3 days ago', read: true },
];

/** App-wide notification state, shared by the Notifications tab and the Dashboard bell badge. */
export const notificationItems = ref<AppNotification[]>(notifications.map((n) => ({ ...n })));

export const unreadNotificationCount = computed(() => notificationItems.value.filter((n) => !n.read).length);
