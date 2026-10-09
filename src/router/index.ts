import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/splash' },

  // Auth
  { path: '/splash', component: () => import('@/views/auth/SplashPage.vue') },
  { path: '/login', component: () => import('@/views/auth/LoginPage.vue') },
  { path: '/register/customer', component: () => import('@/views/auth/RegisterCustomerPage.vue') },
  { path: '/register/business', component: () => import('@/views/auth/RegisterBusinessPage.vue') },

  // Main tabs
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      { path: '', redirect: '/tabs/home' },
      { path: 'home', component: () => import('@/views/tabs/DashboardPage.vue') },
      { path: 'bookings', component: () => import('@/views/tabs/MyBookingsPage.vue') },
      { path: 'book', component: () => import('@/views/tabs/BookServicePage.vue') },
      { path: 'notifications', component: () => import('@/views/tabs/NotificationsPage.vue') },
      { path: 'profile', component: () => import('@/views/tabs/ProfilePage.vue') },
    ],
  },

  // Booking flows
  { path: '/book/pabili', component: () => import('@/views/booking/PabiliBookPage.vue') },
  { path: '/book/parcel', component: () => import('@/views/booking/ParcelCreatePage.vue') },
  { path: '/book/parcel/checkout', component: () => import('@/views/booking/ParcelCheckoutPage.vue') },
  { path: '/book/vehicle', component: () => import('@/views/booking/VehicleCreatePage.vue') },
  { path: '/book/vehicle/checkout', component: () => import('@/views/booking/VehicleCheckoutPage.vue') },

  // Booking details & invoices
  { path: '/bookings/pabili/:id', component: () => import('@/views/booking/PabiliDetailsPage.vue') },
  { path: '/bookings/pabili/:id/invoice', component: () => import('@/views/booking/PabiliInvoicePage.vue') },
  { path: '/bookings/parcel/:id', component: () => import('@/views/booking/ParcelDetailsPage.vue') },
  { path: '/bookings/parcel/:id/invoice', component: () => import('@/views/booking/ParcelInvoicePage.vue') },
  { path: '/bookings/vehicle/:id', component: () => import('@/views/booking/VehicleDetailsPage.vue') },
  { path: '/bookings/vehicle/:id/invoice', component: () => import('@/views/booking/VehicleInvoicePage.vue') },

  // Profile — shared
  { path: '/profile/personal', component: () => import('@/views/profile/PersonalInfoPage.vue') },
  { path: '/profile/contact', component: () => import('@/views/profile/ContactInfoPage.vue') },
  { path: '/profile/addresses', component: () => import('@/views/profile/AddressBookPage.vue') },
  { path: '/profile/password', component: () => import('@/views/profile/ChangePasswordPage.vue') },
  { path: '/profile/help', component: () => import('@/views/profile/HelpFaqsPage.vue') },

  // Profile — business
  { path: '/profile/employees', component: () => import('@/views/profile/EmployeesPage.vue') },
  { path: '/profile/employees/new', component: () => import('@/views/profile/EmployeeCreatePage.vue') },
  { path: '/profile/business-info', component: () => import('@/views/profile/BusinessInfoPage.vue') },
  { path: '/profile/schedule', component: () => import('@/views/profile/OperatingSchedulePage.vue') },
  { path: '/profile/business-contacts', component: () => import('@/views/profile/BusinessContactsPage.vue') },
  { path: '/profile/payment-tax', component: () => import('@/views/profile/PaymentTaxPage.vue') },
  { path: '/profile/bank', component: () => import('@/views/profile/BankInfoPage.vue') },
  { path: '/profile/legal', component: () => import('@/views/profile/LegalSignatoryPage.vue') },
  { path: '/profile/documents', component: () => import('@/views/profile/VerificationDocumentsPage.vue') },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
