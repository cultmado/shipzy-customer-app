<template>
  <ol class="flex flex-col">
    <li v-for="(p, i) in points" :key="i" class="relative flex gap-3 pb-4 last:pb-0">
      <span
        v-if="i < points.length - 1"
        class="absolute top-6 bottom-0 left-3 w-0 -translate-x-1/2 border-l-[1.5px] border-dashed border-slate-400"
      />
      <span
        class="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
        :class="toneBg[p.tone]"
      >
        <MapPin class="h-3.5 w-3.5" :stroke-width="2" />
      </span>
      <div class="min-w-0 pt-px">
        <p class="text-[13px] font-semibold text-ink">{{ p.label }}</p>
        <p class="mt-1 text-[11px] font-semibold text-brand">{{ p.caption }}</p>
        <p class="mt-1 text-[11px] text-muted">{{ p.address }}</p>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { MapPin } from 'lucide-vue-next';

export interface TimelinePoint {
  label: string;
  caption: string;
  address: string;
  tone: 'green' | 'orange' | 'red';
}

defineProps<{ points: TimelinePoint[] }>();

const toneBg = { green: 'bg-success', orange: 'bg-warning', red: 'bg-danger' } as const;
</script>
