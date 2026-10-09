<template>
  <ol class="flex flex-col">
    <li v-for="(e, i) in events" :key="e.title" class="relative flex gap-4 pb-6 last:pb-0">
      <span v-if="i < events.length - 1" class="absolute top-[30px] bottom-0 left-[15px] w-px bg-sky-200" />
      <span
        class="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full"
        :class="
          e.state === 'done' ? 'bg-success text-white' : e.state === 'current' ? 'bg-brand text-white' : 'bg-slate-100 text-muted'
        "
      >
        <component :is="icons[e.icon]" class="h-4 w-4" :stroke-width="e.icon === 'check' ? 2.25 : 1.75" />
      </span>
      <div class="min-w-0 flex-1">
        <p class="text-[13px] font-semibold text-ink">{{ e.title }}</p>
        <p class="mt-1 text-[11px] leading-4 text-body">{{ e.description }}</p>
        <p v-if="e.date" class="mt-2.5 text-[11px] text-ink">
          {{ e.date }} <span class="mx-1 text-muted">•</span><span class="text-muted">{{ e.time }}</span>
        </p>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { Check, Flag, Navigation, PackageCheck, UserCheck } from 'lucide-vue-next';
import type { BookingEvent, BookingEventIcon } from '@/data/vehicle';

defineProps<{ events: BookingEvent[] }>();

const icons: Record<BookingEventIcon, Component> = {
  check: Check,
  driver: UserCheck,
  package: PackageCheck,
  navigate: Navigation,
  flag: Flag,
};
</script>
