<template>
  <AppPage>
    <PabiliPageHeader title="Pabili Booking Details">
      Booking reference: <span class="font-semibold">{{ booking.id }}</span>
    </PabiliPageHeader>

    <div class="flex flex-col gap-6">
      <!-- Current status -->
      <section class="rounded-2xl border border-line bg-[#f2f8fc] px-3 pt-3 pb-3 shadow-card">
        <div class="flex items-start gap-4">
          <span class="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-brand text-white">
            <ShoppingBasket class="h-[18px] w-[18px]" :stroke-width="1.75" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-[13px] font-medium text-brand">Current Status</p>
            <h2 class="mt-1 text-[16px] font-bold text-ink">{{ booking.status.title }}</h2>
            <p class="mt-1.5 text-[12px] leading-4 text-body/80">{{ booking.status.message }}</p>
          </div>
        </div>
        <div class="mt-2 rounded-lg border border-line bg-white px-3 py-3">
          <p class="text-[11px] text-muted">Last Updated</p>
          <p class="mt-1.5 text-[11px] font-semibold text-ink">{{ booking.status.updated }}</p>
        </div>
      </section>

      <!-- Route tracking -->
      <section class="card px-3 pt-4 pb-3">
        <h2 class="text-[16px] font-semibold text-ink">Route Tracking</h2>
        <p class="mt-1.5 text-[12px] text-body/80">Pickup, additional stops, and final drop-off.</p>

        <div class="relative mx-2 mt-7 h-[237px] overflow-hidden rounded-2xl bg-[#eef2f6]">
          <div
            class="absolute inset-0 opacity-70"
            style="
              background-image: linear-gradient(#dfe5ec 1px, transparent 1px), linear-gradient(90deg, #dfe5ec 1px, transparent 1px);
              background-size: 28px 28px;
            "
          />
          <svg class="absolute inset-0 h-full w-full" viewBox="0 0 320 237" preserveAspectRatio="none" aria-hidden="true">
            <path d="M48 190 C 90 170, 100 120, 150 118 S 230 90, 268 46" fill="none" stroke="#085d85" stroke-width="3" stroke-dasharray="6 6" stroke-linecap="round" />
          </svg>
          <span class="absolute bottom-[38px] left-[38px] h-5 w-5 rounded-full border-4 border-white bg-brand shadow" />
          <span class="absolute top-[108px] left-[140px] flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand shadow">
            <Bike class="h-4 w-4" :stroke-width="1.75" />
          </span>
          <MapPin class="absolute top-[18px] right-[40px] h-8 w-8 fill-danger text-white" :stroke-width="1.5" />
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <div class="rounded-lg border border-line bg-[#f8fafc] px-2 py-2">
            <p class="text-[9px] text-muted">Estimated arrival</p>
            <p class="mt-1.5 text-[13px] font-semibold text-ink">{{ booking.tracking.eta }}</p>
          </div>
          <div class="rounded-lg border border-line bg-[#f8fafc] px-2 py-2">
            <p class="text-[9px] text-muted">Distance remaining</p>
            <p class="mt-1.5 text-[13px] font-semibold text-ink">{{ booking.tracking.distance }}</p>
          </div>
        </div>
        <div class="mt-3 rounded-lg border border-line bg-[#f8fafc] px-2 py-2">
          <p class="text-[9px] text-muted">Destination</p>
          <p class="mt-1.5 text-[13px] leading-4 font-semibold text-ink">{{ booking.tracking.destination }}</p>
        </div>
      </section>

      <!-- Booking progress -->
      <section class="card px-3 pt-4 pb-4">
        <h2 class="text-[16px] font-semibold text-ink">Booking Progress</h2>
        <p class="mt-1.5 text-[12px] text-body/80">Track every stage of your Pabili booking.</p>
        <ol class="mt-5">
          <li v-for="(stage, i) in booking.progress" :key="stage.title" class="relative flex gap-4 pb-6 last:pb-0">
            <span
              v-if="i < booking.progress.length - 1"
              class="absolute top-[37px] left-[18px] h-[calc(100%-37px)] w-px"
              :class="booking.progress[i + 1].done ? 'bg-brand' : 'bg-slate-300'"
            />
            <span
              class="relative flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full"
              :class="stage.done ? 'bg-brand text-white' : 'bg-slate-200 text-muted'"
            >
              <Truck v-if="stage.current" class="h-[18px] w-[18px]" :stroke-width="1.75" />
              <Check v-else-if="stage.done" class="h-[18px] w-[18px]" :stroke-width="2" />
              <span v-else class="text-[15px] font-semibold">{{ i + 1 }}</span>
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-[14px] font-semibold" :class="stage.done ? 'text-ink' : 'text-muted/70'">{{ stage.title }}</p>
              <p class="mt-0.5 text-[11px] font-semibold text-muted">{{ stage.time }}</p>
              <p class="mt-1 text-[12px] text-body/80">{{ stage.description }}</p>
            </div>
          </li>
        </ol>
      </section>

      <!-- Stores -->
      <section class="card px-3 pt-4 pb-4">
        <div class="flex items-start justify-between gap-3">
          <h2 class="text-[16px] font-semibold text-ink">Stores and Purchased Items</h2>
          <span class="rounded-full bg-brand-light px-2.5 py-0.5 text-[11px] text-brand">
            {{ booking.stores.length }} {{ booking.stores.length === 1 ? 'store' : 'stores' }}
          </span>
        </div>
        <p class="mt-1.5 text-[12px] text-body/80">Items are grouped by the store where they were requested.</p>
        <div class="mt-6 flex flex-col gap-3">
          <PurchasedStoreCard v-for="store in booking.stores" :key="store.name" :store="store" />
        </div>
      </section>

      <!-- Delivery information -->
      <section class="card px-3 pt-4 pb-4">
        <h2 class="text-[16px] font-semibold text-ink">Delivery Information</h2>
        <p class="mt-1.5 text-[12px] text-body/80">Where and when your items will be delivered.</p>
        <div class="mt-6 flex flex-col gap-3">
          <div v-for="info in deliveryInfo" :key="info.label" class="flex items-start gap-4 rounded-lg border border-line px-3 py-3">
            <span class="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
              <component :is="info.icon" class="h-[17px] w-[17px]" :stroke-width="1.5" />
            </span>
            <div class="min-w-0 flex-1">
              <p :class="info.upper ? 'text-[11px] uppercase text-muted' : 'text-[11px] font-medium text-ink'">{{ info.label }}</p>
              <p class="mt-1" :class="info.upper ? 'text-[11px] font-medium text-ink' : 'text-[11px] text-muted'">{{ info.value }}</p>
              <p v-if="info.extra" class="mt-1 text-[11px] text-muted">{{ info.extra }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Notes -->
      <section class="card px-3 pt-4 pb-4">
        <h2 class="text-[16px] font-semibold text-ink">Notes for Rider</h2>
        <p class="mt-1.5 text-[12px] text-body/80">Instructions included in this booking.</p>
        <p class="mt-6 rounded-lg border border-line bg-[#f8fafc] px-3 py-5 text-[13px] leading-4 text-ink">
          {{ booking.notes }}
        </p>
      </section>

      <!-- Rider -->
      <section class="card px-3 pt-4 pb-4">
        <h2 class="text-[16px] font-semibold text-ink">Assigned Rider</h2>
        <p class="mt-1.5 text-[12px] text-body/80">Your rider for this booking.</p>
        <div class="mt-5 flex items-center gap-4">
          <span class="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-brand text-[15px] font-semibold text-white">
            {{ booking.rider.initials }}
          </span>
          <div>
            <p class="text-[13px] font-semibold text-ink">{{ booking.rider.name }}</p>
            <p class="mt-0.5 text-[10px] text-muted">{{ booking.rider.deliveries }} deliveries · {{ booking.rider.plate }}</p>
          </div>
        </div>
      </section>

      <!-- Payment -->
      <section class="card px-3 pt-4 pb-4">
        <h2 class="text-[16px] font-semibold text-ink">Payment</h2>
        <p class="mt-1.5 text-[12px] text-body/80">Payment method and status.</p>
        <div class="mt-5 flex items-center gap-4 rounded-lg border border-line px-3 py-3">
          <span class="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary-light text-primary">
            <Smartphone class="h-[17px] w-[17px]" :stroke-width="1.5" />
          </span>
          <div class="flex-1">
            <p class="text-[11px] font-medium text-ink">{{ booking.payment.method }}</p>
            <p class="mt-1 text-[11px] text-muted">{{ booking.payment.description }}</p>
          </div>
          <span
            class="rounded-full px-2 py-px text-[11px] font-medium"
            :class="booking.payment.status === 'Paid' ? 'bg-[#d3f3df] text-success' : 'bg-warning-light text-warning'"
          >{{ booking.payment.status }}</span>
        </div>
      </section>

      <!-- Summary -->
      <section class="card px-3 pt-4 pb-4">
        <h2 class="text-[16px] font-semibold text-ink">Booking Summary</h2>
        <p class="mt-1.5 text-[12px] text-body/80">Payment method and status.</p>
        <dl class="mt-4 flex flex-col gap-3.5 px-2 text-[13px]">
          <div v-for="row in summaryRows" :key="row.label" class="flex justify-between">
            <dt class="text-ink">{{ row.label }}</dt>
            <dd class="font-semibold text-ink">{{ formatPeso(row.value) }}</dd>
          </div>
        </dl>
        <div class="mx-2 mt-4 flex items-center justify-between border-t border-line pt-5">
          <span class="text-[14px] font-semibold text-ink">Total Paid</span>
          <span class="text-[20px] font-bold text-brand">{{ formatPeso(bookingTotal(booking)) }}</span>
        </div>
      </section>

      <!-- Booking info -->
      <section class="card px-3 pt-4 pb-4">
        <h2 class="text-[16px] font-semibold text-ink">Booking Information</h2>
        <dl class="mt-3 flex flex-col gap-3.5 px-2 text-[13px]">
          <div class="flex justify-between gap-3"><dt class="text-ink">Booking ID</dt><dd class="font-semibold text-ink">{{ booking.id }}</dd></div>
          <div class="flex justify-between gap-3"><dt class="text-ink">Date Created</dt><dd class="font-semibold text-ink">{{ booking.dateCreated }}</dd></div>
          <div class="flex justify-between gap-3"><dt class="text-ink">Service Type</dt><dd class="font-semibold text-ink">Pabili Service</dd></div>
        </dl>
      </section>

      <router-link
        :to="`/bookings/pabili/${booking.id}/invoice`"
        class="card flex items-center gap-4 px-3.5 py-3.5 active:bg-slate-50"
      >
        <FileText class="h-5 w-5 text-ink" :stroke-width="1.5" />
        <span class="flex-1 text-[16px] font-medium tracking-wide text-ink">View Invoice</span>
        <ChevronRight class="h-4 w-4 text-ink" />
      </router-link>
    </div>

    <template #footer>
      <button
        type="button"
        class="h-[37px] w-full rounded-lg border border-danger bg-white text-[13px] text-danger active:bg-danger-light"
        @click="cancelBooking"
      >
        Cancel
      </button>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { alertController, useIonRouter } from '@ionic/vue';
import {
  Bike,
  CalendarClock,
  Check,
  ChevronRight,
  FileText,
  MapPin,
  ShoppingBasket,
  Smartphone,
  Truck,
  User,
} from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PabiliPageHeader from '@/components/pabili/PabiliPageHeader.vue';
import PurchasedStoreCard from '@/components/pabili/PurchasedStoreCard.vue';
import { bookingSubtotal, bookingTotal, getPabiliBooking } from '@/data/pabili';
import { formatPeso } from '@/data/services';

const route = useRoute();
const ionRouter = useIonRouter();
const booking = computed(() => getPabiliBooking(String(route.params.id ?? '')));

const deliveryInfo = computed(() => [
  { label: 'Delivery Address', value: booking.value.delivery.address, icon: MapPin, upper: true },
  { label: 'Recipient', value: booking.value.delivery.recipient, extra: booking.value.delivery.phone, icon: User, upper: true },
  { label: booking.value.delivery.type, value: booking.value.delivery.schedule, icon: CalendarClock, upper: false },
]);

const summaryRows = computed(() => [
  { label: 'Items Subtotal', value: bookingSubtotal(booking.value) },
  { label: 'Service Fee', value: booking.value.fees.service },
  { label: 'Delivery Fee', value: booking.value.fees.delivery },
  { label: 'Multi-store Fee', value: booking.value.fees.multiStore },
  { label: 'Platform Fee', value: booking.value.fees.platform },
]);

async function cancelBooking() {
  const alert = await alertController.create({
    header: 'Cancel booking?',
    message: 'Your rider has already started purchasing items. Cancellation fees may apply.',
    buttons: [
      { text: 'Keep Booking', role: 'cancel' },
      { text: 'Cancel Booking', role: 'destructive', handler: () => ionRouter.navigate('/tabs/bookings', 'back', 'replace') },
    ],
  });
  await alert.present();
}
</script>
