<template>
  <div class="flex items-center gap-4">
    <span class="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-brand text-[15px] font-semibold text-white">
      {{ initials }}
    </span>
    <div class="min-w-0">
      <p class="text-[13px] font-semibold text-ink">{{ name }}</p>
      <p class="text-[10px] text-muted">{{ meta }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ name: string; meta?: string }>();
const initials = computed(() =>
  props.name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase(),
);
</script>
