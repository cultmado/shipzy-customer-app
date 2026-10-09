<template>
  <component
    :is="selectable ? 'button' : 'div'"
    :type="selectable ? 'button' : undefined"
    class="flex w-full items-center gap-5 rounded-xl border px-3 py-3.5 text-left"
    :class="
      selected
        ? 'border-brand bg-[#f2fafc]'
        : plain
          ? 'border-transparent bg-[#f2fafc]'
          : 'border-line bg-white active:bg-slate-50'
    "
    :aria-pressed="selectable ? selected : undefined"
  >
    <ProductThumb />
    <span class="min-w-0 flex-1">
      <span class="block text-[15px] font-semibold text-ink">{{ store.name }}</span>
      <span class="mt-1 flex items-center gap-1.5 text-[13px] text-muted">
        {{ store.eta }}<span class="h-1 w-1 rounded-full bg-muted" />{{ store.distance }}
      </span>
    </span>
  </component>
</template>

<script setup lang="ts">
import type { PabiliStore } from '@/data/pabili';
import ProductThumb from './ProductThumb.vue';

withDefaults(defineProps<{ store: PabiliStore; selected?: boolean; selectable?: boolean; plain?: boolean }>(), {
  selected: false,
  selectable: true,
  plain: false,
});
</script>
