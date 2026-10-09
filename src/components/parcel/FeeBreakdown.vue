<template>
  <div>
    <dl class="flex flex-col gap-3.5 text-[11px]">
      <div v-for="fee in fees" :key="fee.label" class="flex items-center justify-between gap-4">
        <dt :class="muted ? 'text-[12px] text-muted' : 'text-body'">{{ fee.label }}</dt>
        <dd class="font-semibold text-ink">{{ formatPeso(fee.amount) }}</dd>
      </div>
    </dl>
    <div class="mt-4 flex items-center justify-between gap-4 border-t border-line pt-4">
      <div>
        <p class="text-[12px] text-ink" :class="totalClass">
          <slot name="total-label">{{ totalLabel }}</slot>
        </p>
        <p v-if="totalHint" class="mt-0.5 text-[11px] text-muted">{{ totalHint }}</p>
      </div>
      <p class="text-[19px] font-bold text-brand">{{ formatPeso(total) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatPeso } from '@/data/services';
import { sumFees, type FeeLine } from '@/data/parcel';

const props = withDefaults(
  defineProps<{ fees: FeeLine[]; totalLabel?: string; totalHint?: string; totalClass?: string; muted?: boolean }>(),
  { totalLabel: 'Total', totalClass: 'font-semibold' },
);
const total = computed(() => sumFees(props.fees));
</script>
