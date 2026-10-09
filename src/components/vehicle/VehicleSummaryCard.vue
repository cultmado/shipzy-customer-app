<template>
  <section class="card overflow-hidden">
    <header class="flex items-start gap-3 border-b border-line px-5 pt-4 pb-3">
      <div class="min-w-0 flex-1 pt-1">
        <h2 class="text-[17px] font-semibold text-ink">{{ title }}</h2>
        <p v-if="subtitle" class="mt-1.5 max-w-[250px] text-[12px] leading-[16px] text-muted">{{ subtitle }}</p>
      </div>
      <span v-if="icon" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
        <component :is="icon" class="h-[18px] w-[18px]" :stroke-width="1.75" />
      </span>
    </header>
    <div class="px-5 pt-3 pb-5">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{ title: string; subtitle?: string; icon?: Component }>();
</script>
