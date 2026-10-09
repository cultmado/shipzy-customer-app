<template>
  <div class="mb-3 flex items-center justify-between gap-2">
    <h2 class="text-[14px] font-semibold text-ink">{{ title }}</h2>
    <router-link v-if="linkTo" :to="linkTo" class="flex items-center gap-1 text-[12px] font-medium text-primary">
      {{ linkLabel }}<ChevronRight class="h-4 w-4" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next';

withDefaults(defineProps<{ title: string; linkTo?: string; linkLabel?: string }>(), {
  linkLabel: 'View all services',
});
</script>
