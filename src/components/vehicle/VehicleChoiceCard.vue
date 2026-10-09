<template>
  <component
    :is="readonly ? 'div' : 'button'"
    :type="readonly ? undefined : 'button'"
    :aria-pressed="readonly ? undefined : selected"
    class="flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition-colors"
    :class="selected ? 'border-brand bg-brand-light/60' : (readonly ? 'border-line bg-white' : 'border-line bg-white active:bg-slate-50')"
    @click="!readonly && $emit('select')"
  >
    <span class="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
      <component :is="icon" class="h-[18px] w-[18px]" :stroke-width="1.5" />
    </span>
    <span class="min-w-0 flex-1 pt-px">
      <span class="block text-[14px] font-semibold text-ink">{{ title }}</span>
      <span class="mt-1 block text-[12px] text-muted">{{ description }}</span>
    </span>
    <span
      v-if="checkbox"
      class="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors"
      :class="selected ? 'border-brand bg-brand text-white' : 'border-slate-300 bg-white'"
    >
      <Check v-if="selected" class="h-3.5 w-3.5" :stroke-width="3" />
    </span>
  </component>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { Check } from 'lucide-vue-next';

defineProps<{ icon: Component; title: string; description: string; selected?: boolean; checkbox?: boolean; readonly?: boolean }>();
defineEmits<{ select: [] }>();
</script>
