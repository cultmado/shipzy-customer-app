<template>
  <button
    type="button"
    class="flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors"
    :class="selected ? 'border-brand bg-[#f2f8fc]' : 'border-line bg-white active:bg-slate-50'"
    :aria-pressed="selected"
    @click="$emit('select')"
  >
    <span class="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
      <component :is="icon" class="h-[18px] w-[18px]" :stroke-width="2" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="block text-[14px] leading-5 font-semibold text-ink">{{ title }}</span>
      <span class="mt-0.5 block text-[11px] leading-4 text-muted">{{ description }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{ icon: Component; title: string; description?: string; selected?: boolean }>();
defineEmits<{ select: [] }>();
</script>
