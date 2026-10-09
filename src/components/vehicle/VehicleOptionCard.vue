<template>
  <button
    type="button"
    :aria-pressed="selected"
    class="flex w-full items-center gap-1.5 rounded-xl border-[1.5px] p-1.5 text-left transition-colors"
    :class="selected ? 'border-brand bg-brand-light/60' : 'border-line bg-white active:bg-slate-50'"
    @click="$emit('select')"
  >
    <span class="flex h-[44px] w-[42px] shrink-0 items-center justify-center rounded-lg bg-slate-50">
      <img :src="vehicle.image" :alt="vehicle.name" class="h-full w-full object-contain p-0.5" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="block truncate text-[12px] font-semibold text-ink">{{ vehicle.name }}</span>
      <span class="block text-[10px] text-muted">{{ vehicle.capacity }}</span>
      <span class="mt-0.5 block text-[10px] font-semibold tracking-tight whitespace-nowrap text-brand">Starts at {{ formatPeso(vehicle.baseFee) }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import type { VehicleType } from '@/data/vehicle';
import { formatPeso } from '@/data/services';

defineProps<{ vehicle: VehicleType; selected?: boolean }>();
defineEmits<{ select: [] }>();
</script>
