<template>
  <router-link :to="to" class="card flex items-center gap-4 px-4 py-4 active:bg-slate-50">
    <component :is="icon" class="h-5 w-5 text-ink" :stroke-width="1.75" />
    <span class="flex-1 text-[16px] font-medium tracking-wide text-ink">{{ label }}</span>
    <ChevronRight class="h-4 w-4 text-ink" />
  </router-link>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { ChevronRight, FileText } from 'lucide-vue-next';

withDefaults(defineProps<{ to: string; label?: string; icon?: Component }>(), {
  label: 'View Invoice',
  icon: () => FileText,
});
</script>
