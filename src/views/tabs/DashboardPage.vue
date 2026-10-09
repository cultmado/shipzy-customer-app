<template>
  <AppPage content-class="pb-28">
    <TopBar />

    <h1 class="text-[22px] leading-7 font-bold text-ink">{{ greeting }}, {{ session.firstName }}!</h1>
    <p class="mt-0.5 text-[14px] text-muted">What would you like today?</p>

    <!-- Hero -->
    <section class="mt-4 flex items-center overflow-hidden rounded-2xl border border-blue-100 bg-primary-light py-4 pl-4">
      <div class="min-w-0 flex-1">
        <h2 class="text-[15px] leading-5 font-bold tracking-tight text-ink">Fast. Reliable. Hassle-free.</h2>
        <p class="mt-1.5 text-[12.5px] leading-[18px] text-body">We make sure your items<br />reach safely and on time.</p>
        <router-link
          to="/tabs/book"
          class="mt-3 inline-flex h-8 items-center rounded-md border border-primary/70 bg-white px-3.5 text-[13px] text-primary active:bg-primary-light"
        >Learn More</router-link>
      </div>
      <img :src="truckBoxes" alt="" class="mr-1 w-[46%] shrink-0" />
    </section>

    <!-- Book a Service -->
    <section class="card mt-4 p-3.5">
      <SectionHead title="Book a Service" link-to="/tabs/book" />
      <div class="grid grid-cols-3 gap-2.5">
        <router-link
          v-for="s in serviceCards"
          :key="s.meta.key"
          :to="s.meta.bookRoute"
          class="flex flex-col rounded-xl border p-2.5 active:opacity-80"
          :class="[s.meta.tintBg, s.meta.tintBorder]"
        >
          <img :src="s.meta.image" alt="" class="h-[46px] w-auto self-start object-contain" />
          <span class="mt-2 text-[12px] leading-4 font-semibold tracking-tight whitespace-nowrap text-ink">{{ s.meta.name }}</span>
          <span class="mt-1 flex-1 text-[10.5px] leading-[14px] text-body">{{ s.desc }}</span>
          <span
            class="mt-1.5 flex h-[26px] w-[26px] items-center justify-center self-end rounded-full text-white ring-2 ring-white"
            :class="s.meta.accentBg"
          >
            <ArrowRight class="h-4 w-4" />
          </span>
        </router-link>
      </div>
    </section>

    <!-- Overview stats -->
    <section class="card mt-4 p-3.5">
      <SectionHead title="My Bookings Overview" link-to="/tabs/bookings" />
      <div class="grid grid-cols-3 gap-2">
        <router-link
          v-for="st in stats"
          :key="st.label"
          to="/tabs/bookings"
          class="flex items-center gap-2 rounded-xl px-2 py-2.5"
          :class="st.bg"
        >
          <span class="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-white" :class="st.color">
            <component :is="st.icon" class="h-[18px] w-[18px]" :stroke-width="1.75" />
          </span>
          <span class="min-w-0">
            <span class="block text-[20px] leading-6 font-bold text-ink">{{ st.value }}</span>
            <span class="block text-[10px] leading-3 text-body">{{ st.label }}</span>
          </span>
        </router-link>
      </div>
    </section>

    <!-- Active booking tracker -->
    <section class="card mt-4 p-3.5">
      <div class="mb-3 flex items-center justify-between gap-2">
        <h2 class="text-[14px] font-semibold text-ink">My Bookings Overview</h2>
        <span class="text-[11.5px] font-medium text-primary">Booking ID: SHPZ-2405-00123</span>
      </div>
      <router-link :to="bookingDetailRoute(tracked)" class="block rounded-xl border-2 border-slate-100 p-2.5">
        <div class="flex items-start gap-3">
          <span class="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-md bg-parcel-light">
            <img :src="services.parcel.image" alt="" class="w-8" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-[13px] font-semibold text-ink">Parcel &amp; Cargo</p>
            <p class="text-[12px] leading-4 text-muted">From: {{ tracked.from }}</p>
            <p class="text-[12px] leading-4 text-muted">To: {{ tracked.to }}</p>
          </div>
          <span class="inline-flex items-center gap-1.5 rounded-md bg-success-light px-2 py-1 text-[12px] tracking-tight text-success">
            <span class="h-2.5 w-2.5 rounded-full bg-success ring-2 ring-green-200" />On the Way
          </span>
        </div>

        <ol class="mt-4 flex">
          <li v-for="(step, i) in steps" :key="step" class="relative flex flex-1 flex-col items-center">
            <span
              v-if="i > 0"
              class="absolute top-3 right-1/2 h-px w-full"
              :class="i <= currentStep ? 'bg-success' : 'bg-line'"
            />
            <span
              class="relative z-10 flex h-6 w-6 items-center justify-center rounded-full"
              :class="
                i < currentStep
                  ? 'bg-success text-white'
                  : i === currentStep
                    ? 'bg-primary text-white ring-3 ring-blue-100'
                    : 'border border-slate-300 bg-white'
              "
            >
              <Check v-if="i < currentStep" class="h-3.5 w-3.5" :stroke-width="2.5" />
              <Truck v-else-if="i === currentStep" class="h-3.5 w-3.5" />
              <span v-else class="h-1.5 w-1.5 rounded-full bg-slate-300" />
            </span>
            <span
              class="mt-1.5 text-center text-[10px] leading-3 font-semibold"
              :class="i < currentStep ? 'text-ink' : i === currentStep ? 'text-primary' : 'text-muted/80'"
            >{{ step }}</span>
          </li>
        </ol>

        <div class="mt-3 flex rounded-lg border border-blue-200 bg-primary-light py-2">
          <div class="flex flex-1 items-start gap-2 border-r border-slate-300 px-2">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-primary">
              <CalendarClock class="h-[18px] w-[18px]" :stroke-width="1.75" />
            </span>
            <span class="min-w-0 text-[11px] leading-[15px] text-body">
              <span class="block font-semibold whitespace-nowrap text-ink">Estimated Delivery</span>
              May 25, 2024<br />3:00 PM - 6:00 PM
            </span>
          </div>
          <div class="flex flex-1 items-start gap-2 px-2">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-success">
              <User class="h-[18px] w-[18px]" :stroke-width="1.75" />
            </span>
            <span class="min-w-0 text-[11px] leading-[15px] text-body">
              <span class="block font-semibold whitespace-nowrap text-ink">Estimated Delivery</span>
              Juan Dela Cruz<br /><span class="text-success">Currently on Duty</span>
            </span>
          </div>
        </div>
      </router-link>
    </section>

    <!-- Recent bookings -->
    <section class="card mt-4 p-3.5">
      <SectionHead title="Recent Bookings" link-to="/tabs/bookings" />
      <div class="rounded-xl border-2 border-slate-100 px-2">
        <router-link
          v-for="(r, i) in recentBookings"
          :key="r.booking.id"
          :to="bookingDetailRoute(r.booking)"
          class="flex items-center gap-2 py-2 active:opacity-70"
          :class="i > 0 && 'border-t border-slate-100'"
        >
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md" :class="services[r.booking.service].tintBg">
            <img :src="thumbs[r.booking.service]" alt="" class="w-6" />
          </span>
          <span class="min-w-0 flex-1 text-[11px] leading-[15px] text-body">
            <span class="block text-[12.5px] font-semibold text-ink">{{ services[r.booking.service].name }}</span>
            <span class="block truncate text-[10px] tracking-tight">Booking ID: {{ r.booking.id }}</span>
            <span class="block">{{ r.booking.date }}</span>
          </span>
          <span class="shrink-0 rounded-md px-1.5 py-1 text-[10px] font-medium whitespace-nowrap" :class="pill[r.tone]">{{ r.label }}</span>
          <ChevronRight class="-mr-1 h-5 w-5 shrink-0 text-ink" />
        </router-link>
      </div>
    </section>
  </AppPage>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ArrowRight, CalendarClock, Check, CircleCheck, ChevronRight, ClipboardList, Clock, Truck, User } from 'lucide-vue-next';
import truckBoxes from '@/assets/images/truck-boxes.png';
import vanImg from '@/assets/images/van.png';
import AppPage from '@/components/layout/AppPage.vue';
import TopBar from '@/components/layout/TopBar.vue';
import SectionHead from '@/components/tabs/SectionHead.vue';
import { useSession } from '@/composables/useSession';
import { bookings, bookingDetailRoute } from '@/data/bookings';
import { services, type ServiceKey } from '@/data/services';
import { recentBookings } from '@/data/tabs-bookings';

const session = useSession();

const greeting = computed(() => {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
});

const serviceCards = [
  { meta: services.pabili, desc: 'We buy and deliver items for you.' },
  { meta: services.parcel, desc: 'Send your parcels and cargo anywhere.' },
  { meta: services.vehicle, desc: 'Request a vehicle for your delivery needs.' },
];

const stats = [
  { label: 'Active Bookings', value: 3, icon: ClipboardList, bg: 'bg-primary-light', color: 'text-primary' },
  { label: 'Pending Request', value: 2, icon: Clock, bg: 'bg-vehicle-light', color: 'text-warning' },
  { label: 'Completed', value: 12, icon: CircleCheck, bg: 'bg-parcel-light', color: 'text-success' },
];

const tracked = bookings.find((b) => b.service === 'parcel' && b.status === 'In Transit') ?? bookings[1];
const steps = ['Booking Confirmed', 'Picked Up', 'On the Way', 'Out for Delivery', 'Delivered'];
const currentStep = 2;

const pill: Record<string, string> = {
  orange: 'bg-warning-light text-[#e3650b]',
  green: 'bg-success-light text-success',
  blue: 'bg-primary-light text-primary',
};

const thumbs: Record<ServiceKey, string> = {
  pabili: services.pabili.image,
  parcel: services.parcel.image,
  vehicle: vanImg,
};
</script>
