<template>
  <AppPage content-class="pb-28">
    <PageHeader title="Book a Service" subtitle="Choose a service that fits your delivery needs." />

    <div class="flex flex-col gap-4">
      <router-link
        v-for="c in cards"
        :key="c.meta.key"
        :to="c.meta.bookRoute"
        class="block rounded-2xl border p-4 active:opacity-90"
        :class="[c.meta.tintBg, c.meta.tintBorder]"
      >
        <div class="flex gap-3">
          <div class="flex w-[42%] shrink-0 items-center justify-center">
            <img :src="c.image" alt="" class="max-h-[118px] w-full object-contain" />
          </div>
          <div class="min-w-0 flex-1">
            <h2 class="text-[19px] leading-6 font-bold whitespace-nowrap text-ink">{{ c.meta.name }}</h2>
            <p class="mt-1.5 text-[13px] leading-[18px] whitespace-pre-line text-muted">{{ c.desc }}</p>
            <p class="mt-3 inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[10.5px] leading-[14px] tracking-tight" :class="[c.tagBg, c.meta.accentText]">
              <component :is="c.tagIcon" class="h-3.5 w-3.5 shrink-0" />{{ c.tag }}
            </p>
          </div>
        </div>
        <div class="mt-3 ml-[calc(42%+12px)] h-px bg-slate-200" />
        <div class="mt-3 flex items-center justify-between gap-2">
          <ul class="flex flex-col gap-1.5">
            <li v-for="f in c.features" :key="f" class="flex items-center gap-2 text-[12px] whitespace-nowrap text-ink">
              <CircleCheck class="h-[15px] w-[15px] shrink-0" :class="c.meta.accentText" :stroke-width="1.75" />{{ f }}
            </li>
          </ul>
          <span class="flex shrink-0 items-center gap-1.5 text-[16px] font-semibold" :class="c.meta.accentText">
            Book Now
            <span class="flex h-7 w-7 items-center justify-center rounded-full text-white" :class="c.meta.accentBg">
              <ArrowRight class="h-4 w-4" />
            </span>
          </span>
        </div>
      </router-link>
    </div>

    <!-- Features strip -->
    <section class="card mt-4 flex py-3.5">
      <div
        v-for="(f, i) in perks"
        :key="f.label"
        class="flex flex-1 flex-col items-center gap-1.5 px-1 text-center"
        :class="i > 0 && 'border-l border-slate-100'"
      >
        <component :is="f.icon" class="h-5 w-5 text-primary" :stroke-width="1.75" />
        <span class="text-[11px] leading-[14px] font-medium whitespace-pre-line text-ink">{{ f.label }}</span>
      </div>
    </section>
  </AppPage>
</template>

<script setup lang="ts">
import { ArrowRight, CircleCheck, CreditCard, Headset, MapPin, Package, ShieldCheck, ShoppingCart, Truck } from 'lucide-vue-next';
import vanImg from '@/assets/images/van.png';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import { services } from '@/data/services';

const cards = [
  {
    meta: services.pabili,
    image: services.pabili.image,
    desc: 'We buy and deliver\nitems for you.',
    tag: 'Groceries, essentials & more!',
    tagIcon: ShoppingCart,
    tagBg: 'bg-blue-100/60',
    features: ['You send the link or item details', 'We purchase it for you', 'We deliver straight to your door'],
  },
  {
    meta: services.parcel,
    image: services.parcel.image,
    desc: 'Send your parcels and\ncargo anywhere.',
    tag: 'Documents, packages, & bulk cargo.',
    tagIcon: Package,
    tagBg: 'bg-green-100/60',
    features: ['Door-to-door delivery', 'Secure handling', 'Real-time tracking'],
  },
  {
    meta: services.vehicle,
    image: vanImg,
    desc: 'Request a vehicle for\nyour delivery needs',
    tag: 'Short or long distance deliveries',
    tagIcon: Truck,
    tagBg: 'bg-orange-100/60',
    features: ['Choose your vehicle type', 'Set your pickup and drop-off', 'Reliable and professional drivers'],
  },
];

const perks = [
  { label: 'Secure &\nReliable', icon: ShieldCheck },
  { label: 'Real-time\nTracking', icon: MapPin },
  { label: '24/7\nSupport', icon: Headset },
  { label: 'Multiple\nPayment', icon: CreditCard },
];
</script>
