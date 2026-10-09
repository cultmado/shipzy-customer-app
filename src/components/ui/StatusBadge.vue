<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-medium whitespace-nowrap"
    :class="tones[tone]"
  >
    <span v-if="dot" class="h-2 w-2 rounded-full bg-current" />
    <slot />
  </span>
</template>

<script setup lang="ts">
export type BadgeTone = 'blue' | 'green' | 'orange' | 'red' | 'gray' | 'violet' | 'teal';

withDefaults(defineProps<{ tone?: BadgeTone; dot?: boolean }>(), { tone: 'blue', dot: false });

const tones: Record<BadgeTone, string> = {
  blue: 'bg-primary-light text-primary',
  green: 'bg-success-light text-success',
  orange: 'bg-warning-light text-warning',
  red: 'bg-danger-light text-danger',
  gray: 'bg-slate-100 text-muted',
  violet: 'bg-violet-light text-violet',
  teal: 'bg-brand-light text-brand',
};
</script>
