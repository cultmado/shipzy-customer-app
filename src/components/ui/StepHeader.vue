<template>
  <div class="mb-4 flex items-start gap-4">
    <span
      class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-[17px] font-semibold text-white"
    >{{ step }}</span>
    <div class="pt-0.5">
      <h2 class="text-[16px] font-semibold text-ink">{{ title }}</h2>
      <p v-if="subtitle" class="mt-1 text-[13px] leading-[18px] text-body">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ step: number | string; title: string; subtitle?: string }>();
</script>
