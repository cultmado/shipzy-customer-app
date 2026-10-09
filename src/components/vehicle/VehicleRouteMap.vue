<template>
  <div
    class="relative overflow-hidden rounded-2xl border border-line bg-[#eef3f6]"
    :style="{ height: `${height}px` }"
    role="img"
    :aria-label="`Route map from ${from} to ${to}`"
  >
    <!-- street grid -->
    <svg class="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 320 220" aria-hidden="true">
      <defs>
        <pattern id="veh-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#dde6ec" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="320" height="220" fill="url(#veh-grid)" />
      <path d="M0 150 C80 140 120 170 200 120 S290 60 320 70" fill="none" stroke="#fff" stroke-width="10" />
      <path d="M60 0 C70 80 40 140 90 220" fill="none" stroke="#fff" stroke-width="8" />
      <path d="M230 0 L250 220" fill="none" stroke="#fff" stroke-width="6" />
      <rect x="140" y="20" width="60" height="40" rx="6" fill="#d9eee2" />
      <rect x="20" y="170" width="50" height="34" rx="6" fill="#d9eee2" />
      <path
        d="M48 176 C90 150 110 120 150 118 S220 110 240 80 S270 52 276 44"
        fill="none"
        stroke="#085d85"
        stroke-width="4"
        stroke-linecap="round"
        stroke-dasharray="1 0"
      />
      <circle v-for="(p, i) in stopPoints" :key="i" :cx="p[0]" :cy="p[1]" r="6" fill="#fff" stroke="#fe8902" stroke-width="3" />
    </svg>
    <span class="absolute bottom-[14%] left-[10%] -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-success text-white shadow">
      <MapPin class="h-4 w-4" />
    </span>
    <span class="absolute top-[12%] right-[10%] translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-danger text-white shadow">
      <MapPin class="h-4 w-4" />
    </span>
    <div class="absolute top-3 left-3 rounded-lg bg-white/95 px-2.5 py-1.5 text-[11px] text-body shadow-card">
      <span class="font-semibold text-ink">{{ from }}</span> → <span class="font-semibold text-ink">{{ to }}</span>
      <span v-if="meta" class="block text-muted">{{ meta }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { MapPin } from 'lucide-vue-next';

const props = withDefaults(
  defineProps<{ from: string; to: string; stops?: number; meta?: string; height?: number }>(),
  { stops: 0, height: 237 },
);

const candidates: [number, number][] = [
  [150, 118],
  [210, 104],
  [104, 140],
];
const stopPoints = computed(() => candidates.slice(0, props.stops));
</script>
