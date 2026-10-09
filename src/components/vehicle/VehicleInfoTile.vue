<template>
  <div class="min-w-0 rounded-lg px-2.5 py-2" :class="tint ? 'bg-brand-light/70' : 'border border-line bg-slate-50/60'">
    <p class="text-[9px] text-muted">{{ label }}</p>
    <p class="mt-1 text-[12px] leading-4 font-semibold break-words" :class="accent ? 'text-brand' : 'text-ink'">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string; tint?: boolean; accent?: boolean }>();
</script>
