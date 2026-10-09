<template>
  <ol class="flex flex-col">
    <li v-for="(p, i) in points" :key="i" class="relative flex gap-3 pb-6 last:pb-0">
      <span
        v-if="i < points.length - 1"
        class="absolute top-[30px] bottom-0 left-[15px] w-0 border-l border-dashed border-sky-300"
      />
      <span
        class="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[15px] font-medium text-white"
        :class="markerClass(p)"
      >
        <MapPin v-if="p.kind === 'pickup'" class="h-4 w-4" :stroke-width="1.75" />
        <Flag v-else-if="p.kind === 'dropoff'" class="h-4 w-4" :stroke-width="1.75" />
        <template v-else>{{ stopNumber(i) }}</template>
      </span>

      <div class="min-w-0 flex-1 rounded-lg border px-4 py-4" :class="tone(p).card">
        <div class="flex flex-wrap items-center gap-3">
          <p class="text-[11px] font-medium" :class="[tone(p).text, p.kind !== 'stop' && 'uppercase']">{{ p.eyebrow }}</p>
          <span class="rounded-full px-2 py-0.5 text-[9px] font-semibold" :class="badge(p).cls">{{ badge(p).label }}</span>
        </div>
        <p class="mt-2 text-[15px] font-semibold text-ink">{{ p.title }}</p>
        <p class="mt-2 text-[11px] leading-4 text-ink">{{ p.address }}</p>

        <dl class="mt-3 flex flex-col gap-3 border-t pt-3" :class="tone(p).divider">
          <div>
            <dt class="text-[11px] text-muted">{{ p.contactLabel }}</dt>
            <dd class="mt-1 text-[11px] font-semibold text-ink">{{ p.contactPerson }}</dd>
          </div>
          <div>
            <dt class="text-[11px] text-muted">Contact Number</dt>
            <dd class="mt-1 text-[11px] font-semibold text-ink">{{ p.contactNumber }}</dd>
          </div>
        </dl>

        <div v-if="p.instructions" class="mt-4 rounded-lg bg-slate-50 px-2 py-2.5">
          <p class="text-[11px] font-medium text-muted">Instructions</p>
          <p class="mt-1 text-[11px] text-ink">{{ p.instructions }}</p>
        </div>
        <div v-if="p.times" class="mt-2 grid grid-cols-3 gap-2">
          <div v-for="t in timeTiles(p)" :key="t.label" class="rounded-lg bg-slate-50 px-2 py-2.5">
            <p class="text-[11px] font-medium text-muted">{{ t.label }}</p>
            <p class="mt-1 text-[11px] font-semibold text-ink">{{ t.value }}</p>
          </div>
        </div>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { Flag, MapPin } from 'lucide-vue-next';
import type { RoutePoint } from '@/data/vehicle';

const props = defineProps<{ points: RoutePoint[] }>();

const tones = {
  completed: { card: 'border-green-100 bg-[#f5fcf7]', text: 'text-success', divider: 'border-green-100' },
  current: { card: 'border-amber-100 bg-[#fffbf3]', text: 'text-amber-600', divider: 'border-amber-100' },
  pending: { card: 'border-red-100 bg-[#fff7f7]', text: 'text-danger', divider: 'border-red-100' },
} as const;

const tone = (p: RoutePoint) => (p.kind === 'dropoff' && p.state === 'pending' ? tones.pending : tones[p.state]);

function markerClass(p: RoutePoint) {
  if (p.kind === 'dropoff') return 'bg-danger';
  return p.state === 'current' ? 'bg-amber-500' : p.state === 'completed' ? 'bg-success' : 'bg-slate-300';
}

function badge(p: RoutePoint) {
  if (p.state === 'completed') return { label: 'COMPLETED', cls: 'bg-[#d1ecdc] text-success' };
  if (p.state === 'current') return { label: 'Current Stop', cls: 'bg-amber-100 text-amber-600' };
  return { label: 'Pending', cls: 'bg-slate-100 text-muted' };
}

const stopNumber = (i: number) => props.points.slice(0, i + 1).filter((p) => p.kind === 'stop').length;

const timeTiles = (p: RoutePoint) => [
  { label: 'Arrived', value: p.times!.arrived },
  { label: 'Completed', value: p.times!.completed },
  { label: 'Left', value: p.times!.left },
];
</script>
