<template>
  <div class="flex items-start gap-4">
    <span class="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-primary text-white">
      <component :is="icon" class="h-[18px] w-[18px]" :stroke-width="1.75" />
    </span>
    <div class="min-w-0">
      <h3 class="text-[17px] leading-6 font-semibold text-ink">{{ title }}</h3>
      <p class="text-[12px] leading-4 text-muted">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{ icon: Component; title: string; subtitle: string }>();
</script>
