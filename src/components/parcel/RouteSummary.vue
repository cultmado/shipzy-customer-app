<template>
  <ol>
    <li v-for="(stop, i) in stops" :key="stop.title" class="relative flex gap-4" :class="i < stops.length - 1 && 'pb-6'">
      <span
        v-if="i < stops.length - 1"
        class="absolute top-[26px] bottom-0 left-[12px] border-l border-dashed border-slate-400"
      />
      <span
        class="relative z-10 flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-full text-white"
        :class="stop.tone === 'green' ? 'bg-success' : 'bg-danger'"
      >
        <MapPin class="h-3.5 w-3.5" :stroke-width="2" />
      </span>
      <div>
        <p class="text-[13.5px] font-semibold text-ink">{{ stop.title }}</p>
        <p class="mt-1 text-[10.5px] font-semibold text-brand">{{ stop.mode }}</p>
        <p class="mt-1.5 text-[10.5px] text-muted">{{ stop.place }}</p>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { MapPin } from 'lucide-vue-next';

defineProps<{ stops: { title: string; mode: string; place: string; tone: 'green' | 'red' }[] }>();
</script>
