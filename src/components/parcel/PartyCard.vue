<template>
  <div class="rounded-2xl border border-line bg-white px-4 py-4">
    <div class="flex items-center gap-4">
      <span class="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full" :class="tones[tone].bg">
        <MapPin class="h-4 w-4" :class="tones[tone].text" :stroke-width="1.75" />
      </span>
      <div>
        <p class="text-[12px] font-semibold uppercase" :class="tones[tone].text">{{ eyebrow }}</p>
        <p class="text-[14px] font-semibold text-ink">{{ party.mode }}</p>
      </div>
    </div>
    <dl class="mt-3 flex flex-col gap-2.5 text-[13px]">
      <div>
        <dt class="text-[12px] font-medium text-muted">Contact Person</dt>
        <dd class="mt-0.5 font-semibold text-ink">{{ party.name }}</dd>
      </div>
      <div>
        <dt class="text-[12px] font-medium text-muted">Mobile Number</dt>
        <dd class="mt-0.5 text-ink">{{ party.mobile }}</dd>
      </div>
      <div>
        <dt class="text-[12px] font-medium text-muted">Address</dt>
        <dd class="mt-0.5 leading-[18px] text-ink">{{ party.address }}</dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { MapPin } from 'lucide-vue-next';
import type { Party } from '@/data/parcel';

defineProps<{ party: Party; eyebrow: string; tone: 'green' | 'red' }>();

const tones = {
  green: { bg: 'bg-[#d1ecdc]', text: 'text-success' },
  red: { bg: 'bg-[#fbdad7]', text: 'text-danger' },
};
</script>
