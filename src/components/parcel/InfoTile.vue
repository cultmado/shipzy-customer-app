<template>
  <div
    class="min-w-0 rounded-lg px-2 py-2"
    :class="tint ? 'bg-[#f4fafc]' : 'border border-line bg-[#fafcfe]'"
  >
    <p class="text-[8px] text-muted">{{ label }}</p>
    <p class="mt-1 truncate text-[12px] font-semibold tracking-tight" :class="accent ? 'text-brand' : 'text-ink'">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string | number; tint?: boolean; accent?: boolean }>();
</script>
