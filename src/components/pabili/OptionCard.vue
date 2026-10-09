<template>
  <button
    type="button"
    class="flex w-full items-start gap-4 rounded-xl border p-3 text-left transition-colors"
    :class="selected ? 'border-brand bg-[#f2fafc]' : 'border-line bg-white active:bg-slate-50'"
    :aria-pressed="selected"
    @click="$emit('select')"
  >
    <span
      class="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg"
      :class="[iconBg, iconClass]"
    >
      <component :is="icon" class="h-[18px] w-[18px]" :stroke-width="1.75" />
    </span>
    <span class="min-w-0 flex-1 pt-0.5">
      <span class="flex items-center gap-2">
        <span class="text-[15px] font-semibold text-ink">{{ title }}</span>
        <slot name="badge" />
      </span>
      <span v-if="description" class="mt-1.5 block text-[13px] leading-[17px] text-body/80">{{ description }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

withDefaults(
  defineProps<{
    title: string;
    description?: string;
    icon: Component;
    selected?: boolean;
    iconClass?: string;
    iconBg?: string;
  }>(),
  { selected: false, iconClass: 'text-brand', iconBg: 'bg-white' },
);

defineEmits<{ select: [] }>();
</script>
