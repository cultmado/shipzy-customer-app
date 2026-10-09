<template>
  <div class="min-w-0 rounded-lg border border-line bg-[#fafcfe] px-2 py-2.5">
    <p class="text-[8px] text-muted">{{ label }}</p>
    <p class="mt-1.5 font-medium text-ink" :class="small ? 'text-[10px] leading-[14px] font-normal!' : 'text-[14px]'">{{ value }}</p>
    <p v-if="caption" class="mt-1.5 text-[8px]" :class="captionAccent ? 'font-semibold text-brand' : 'text-muted'">{{ caption }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string; caption?: string; captionAccent?: boolean; small?: boolean }>();
</script>
