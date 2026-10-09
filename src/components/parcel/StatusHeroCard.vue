<template>
  <section class="rounded-2xl border border-line bg-[#f2f8fc] p-3 shadow-card">
    <div class="flex items-start gap-4 px-1 pt-1">
      <span class="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-brand text-white">
        <component :is="icon" class="h-[18px] w-[18px]" :stroke-width="1.75" />
      </span>
      <div class="min-w-0 flex-1">
        <p class="text-[12px] font-medium tracking-wide text-brand uppercase">{{ eyebrow }}</p>
        <p class="mt-1 text-[16px] leading-6 font-semibold text-ink">{{ title }}</p>
        <p v-if="description" class="mt-1 text-[12px] leading-4 text-body">{{ description }}</p>
      </div>
    </div>
    <div v-if="stats.length" class="mt-4 grid gap-2.5" :style="{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }">
      <div v-for="s in stats" :key="s.label" class="rounded-lg border border-line bg-white px-3 py-3">
        <p class="text-[10px] text-muted">{{ s.label }}</p>
        <p class="mt-1 text-[10.5px] font-semibold text-ink">{{ s.value }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

withDefaults(
  defineProps<{
    icon: Component;
    title: string;
    description?: string;
    eyebrow?: string;
    stats?: { label: string; value: string }[];
  }>(),
  { eyebrow: 'Current Status', stats: () => [] },
);
</script>
