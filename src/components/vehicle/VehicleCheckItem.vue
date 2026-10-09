<template>
  <div class="flex items-center gap-3 rounded-lg border border-line bg-white px-3 py-2.5" :class="small ? '' : 'py-3'">
    <CircleCheck class="h-4 w-4 shrink-0 text-success" :stroke-width="1.75" />
    <span class="font-medium text-ink" :class="small ? 'text-[11px] uppercase' : 'text-[13px]'"><slot /></span>
  </div>
</template>

<script setup lang="ts">
import { CircleCheck } from 'lucide-vue-next';

defineProps<{ small?: boolean }>();
</script>
