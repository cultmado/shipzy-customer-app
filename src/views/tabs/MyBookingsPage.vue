<template>
  <AppPage content-class="pb-28">
    <PageHeader title="My Bookings" subtitle="Track and manage all your bookings in one place." />

    <!-- Stats -->
    <section class="card flex px-1 py-4">
      <button
        v-for="(st, i) in stats"
        :key="st.label"
        type="button"
        class="flex flex-1 flex-col items-center"
        :class="i > 0 && 'border-l border-slate-100'"
        @click="filter = st.filter"
      >
        <span class="flex h-[34px] w-[34px] items-center justify-center rounded-lg" :class="st.bg">
          <component :is="st.icon" class="h-5 w-5" :class="st.color" :stroke-width="1.75" />
        </span>
        <span class="mt-2.5 text-[20px] leading-6 font-bold text-ink">{{ st.value }}</span>
        <span class="mt-0.5 text-[12.5px] text-ink">{{ st.label }}</span>
      </button>
    </section>

    <div class="mt-4">
      <SegmentTabs v-model="filter" :options="filters" />
    </div>

    <!-- Search + filter -->
    <div class="mt-3 flex gap-2.5">
      <TextInput
        v-model="query"
        :icon="Search"
        inputmode="search"
        placeholder="Search by Booking ID, service, date or status..."
        class="min-w-0 flex-1 [&_input]:text-[13.5px]"
      />
      <button
        type="button"
        class="flex h-[52px] shrink-0 items-center gap-2 rounded-xl border px-3 text-[15px] font-medium"
        :class="showFilter || serviceFilter !== 'all' ? 'border-primary bg-primary-light text-primary' : 'border-line bg-white text-ink'"
        @click="showFilter = !showFilter"
      >
        <Funnel class="h-5 w-5" :stroke-width="1.75" />Filter
      </button>
    </div>

    <div v-if="showFilter" class="card mt-3 p-3.5">
      <p class="mb-2 text-[13px] font-semibold text-ink">Service type</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="opt in serviceOptions"
          :key="opt.value"
          type="button"
          class="h-9 rounded-lg border px-3 text-[13px] font-medium"
          :class="serviceFilter === opt.value ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink'"
          @click="serviceFilter = opt.value"
        >{{ opt.label }}</button>
      </div>
    </div>

    <!-- List -->
    <div class="mt-4 flex flex-col gap-3">
      <BookingCard v-for="b in visible" :key="b.id" :booking="b" />
      <div v-if="visible.length === 0" class="card flex flex-col items-center px-6 py-10 text-center">
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
          <PackageSearch class="h-6 w-6" :stroke-width="1.75" />
        </span>
        <p class="mt-3 text-[15px] font-semibold text-ink">No bookings found</p>
        <p class="mt-1 text-[13px] text-muted">Try a different filter or search term.</p>
      </div>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Calendar, CircleCheck, CircleX, Clock, Funnel, PackageSearch, Search, ShoppingCart } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import SegmentTabs from '@/components/ui/SegmentTabs.vue';
import TextInput from '@/components/ui/TextInput.vue';
import BookingCard from '@/components/tabs/BookingCard.vue';
import { services, type ServiceKey } from '@/data/services';
import { allBookings, bookingGroup, type BookingFilter } from '@/data/tabs-bookings';

const filters: BookingFilter[] = ['All', 'Active', 'Pending', 'Completed', 'Canceled'];
const filter = ref<BookingFilter>('All');
const query = ref('');
const showFilter = ref(false);
const serviceFilter = ref<ServiceKey | 'all'>('all');

const serviceOptions: { label: string; value: ServiceKey | 'all' }[] = [
  { label: 'All Services', value: 'all' },
  { label: services.pabili.name, value: 'pabili' },
  { label: services.parcel.name, value: 'parcel' },
  { label: services.vehicle.name, value: 'vehicle' },
];

const count = (g: BookingFilter) => allBookings.filter((b) => bookingGroup(b.status) === g).length;

const stats = computed(() => [
  { label: 'Total', value: allBookings.length, filter: 'All' as const, icon: Calendar, bg: 'bg-primary-light', color: 'text-primary' },
  { label: 'Active', value: count('Active'), filter: 'Active' as const, icon: Clock, bg: 'bg-success-light', color: 'text-success' },
  { label: 'Pending', value: count('Pending'), filter: 'Pending' as const, icon: ShoppingCart, bg: 'bg-warning-light', color: 'text-warning' },
  { label: 'Completed', value: count('Completed'), filter: 'Completed' as const, icon: CircleCheck, bg: 'bg-primary-light', color: 'text-primary' },
  { label: 'Canceled', value: count('Canceled'), filter: 'Canceled' as const, icon: CircleX, bg: 'bg-danger-light', color: 'text-danger' },
]);

const visible = computed(() => {
  const q = query.value.trim().toLowerCase();
  return allBookings.filter((b) => {
    if (filter.value !== 'All' && bookingGroup(b.status) !== filter.value) return false;
    if (serviceFilter.value !== 'all' && b.service !== serviceFilter.value) return false;
    if (!q) return true;
    return [b.id, services[b.service].name, b.date, b.time, b.status].some((v) => v.toLowerCase().includes(q));
  });
});
</script>
