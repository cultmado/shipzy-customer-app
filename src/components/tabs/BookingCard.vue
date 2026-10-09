<template>
  <router-link :to="detail" class="card block p-3.5 active:bg-slate-50">
    <div class="flex gap-3">
      <span class="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-xl" :class="meta.tintBg">
        <img :src="thumb" alt="" class="w-11" />
      </span>
      <div class="min-w-0 flex-1 pt-0.5">
        <p class="text-[14px] font-semibold text-ink">{{ meta.name }}</p>
        <p class="mt-0.5 truncate text-[14.5px] font-bold tracking-tight text-ink">{{ booking.id }}</p>
        <p class="mt-1 flex items-center gap-1.5 text-[11.5px] whitespace-nowrap text-body">
          <Calendar class="h-3.5 w-3.5" />{{ booking.date }}<span class="px-0.5">•</span>{{ booking.time }}
        </p>
      </div>
      <div class="flex shrink-0 flex-col items-end">
        <KebabMenu :items="menu" />
        <p class="mt-1 text-[16px] leading-6 font-bold text-ink">{{ formatPeso(booking.amount) }}</p>
      </div>
    </div>
    <div class="mt-2 flex items-end gap-2 pl-[68px]">
      <div class="min-w-0 flex-1">
        <p class="flex items-center gap-2 text-[13px] font-semibold" :class="line.text">
          <span class="h-2.5 w-2.5 shrink-0 rounded-full" :class="line.dot" />{{ booking.status }}
        </p>
        <p class="mt-0.5 pl-[18px] text-[11px] leading-[15px] text-body">{{ booking.statusNote }}</p>
      </div>
      <span class="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-primary">
        View Details<ArrowRight class="h-4 w-4" />
      </span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { ArrowRight, Calendar, Eye, FileText } from 'lucide-vue-next';
import vanImg from '@/assets/images/van.png';
import KebabMenu, { type KebabItem } from '@/components/tabs/KebabMenu.vue';
import { bookingDetailRoute, type Booking } from '@/data/bookings';
import { formatPeso, services } from '@/data/services';
import { statusLine } from '@/data/tabs-bookings';

const props = defineProps<{ booking: Booking }>();

const ionRouter = useIonRouter();
const meta = computed(() => services[props.booking.service]);
const thumb = computed(() => (props.booking.service === 'vehicle' ? vanImg : meta.value.image));
const line = computed(() => statusLine[props.booking.status]);
const detail = computed(() => bookingDetailRoute(props.booking));

const menu: KebabItem[] = [
  { label: 'View Details', icon: Eye, action: () => ionRouter.navigate(detail.value, 'forward') },
  { label: 'View Invoice', icon: FileText, action: () => ionRouter.navigate(`${detail.value}/invoice`, 'forward') },
];
</script>
