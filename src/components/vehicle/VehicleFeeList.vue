<template>
  <div>
    <dl class="flex flex-col gap-3.5 px-0.5">
      <div v-for="row in rows" :key="row.label" class="flex items-center justify-between text-[12px]">
        <dt class="text-body">{{ row.label }}</dt>
        <dd class="font-bold text-ink">{{ formatPeso(row.amount) }}</dd>
      </div>
    </dl>
    <div class="mt-4 flex items-center justify-between border-t border-line px-0.5 pt-5">
      <span class="text-[14px] font-bold text-ink">{{ totalLabel }}</span>
      <span class="text-[19px] font-bold text-brand">{{ formatPeso(total) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPeso } from '@/data/services';

withDefaults(defineProps<{ rows: { label: string; amount: number }[]; total: number; totalLabel?: string }>(), {
  totalLabel: 'Estimated Total',
});
</script>
