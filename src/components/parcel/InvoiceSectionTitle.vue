<template>
  <div class="flex items-center gap-3">
    <span class="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md bg-brand text-white">
      <component :is="icon" class="h-4 w-4" :stroke-width="1.75" />
    </span>
    <div>
      <p class="text-[11px] font-medium uppercase" :class="eyebrowClass">{{ eyebrow }}</p>
      <p class="text-[13px] font-semibold text-ink">{{ title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { MapPin } from 'lucide-vue-next';

withDefaults(defineProps<{ eyebrow: string; title: string; icon?: Component; eyebrowClass?: string }>(), {
  icon: () => MapPin,
  eyebrowClass: 'text-brand',
});
</script>
