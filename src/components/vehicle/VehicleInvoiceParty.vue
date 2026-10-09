<template>
  <section class="border-t border-line px-4 py-5">
    <div class="flex items-center gap-2.5">
      <span class="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-brand text-white">
        <component :is="icon" class="h-[17px] w-[17px]" :stroke-width="1.75" />
      </span>
      <div>
        <p class="text-[11px] leading-[14px] uppercase" :class="toneText[tone]">{{ eyebrow }}</p>
        <p class="text-[13px] font-semibold text-ink">{{ title }}</p>
      </div>
    </div>
    <dl v-if="fields?.length" class="mt-4 flex flex-col gap-3.5">
      <div v-for="f in fields" :key="f.label">
        <dt class="text-[11px] text-muted uppercase">{{ f.label }}</dt>
        <dd class="mt-1 text-[12px]" :class="f.strong === false ? 'text-ink' : 'font-semibold text-ink'">{{ f.value }}</dd>
      </div>
    </dl>
    <slot />
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { MapPin } from 'lucide-vue-next';

withDefaults(
  defineProps<{
    eyebrow: string;
    title: string;
    tone?: 'green' | 'red' | 'brand';
    icon?: Component;
    fields?: { label: string; value: string; strong?: boolean }[];
  }>(),
  { tone: 'brand', icon: () => MapPin },
);

const toneText = { green: 'text-success', red: 'text-danger', brand: 'text-brand' } as const;
</script>
