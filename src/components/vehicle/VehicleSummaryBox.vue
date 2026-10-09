<template>
  <div class="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
    <span class="flex h-[63px] w-[63px] shrink-0 items-center justify-center rounded-xl bg-white">
      <img :src="vehicle.image" :alt="vehicle.name" class="h-full w-full object-contain p-1" />
    </span>
    <div class="min-w-0">
      <p class="text-[16px] font-semibold text-ink">{{ vehicle.name }}</p>
      <p class="mt-1 text-[12px] text-muted">{{ subtitle ?? vehicle.capacity }}</p>
      <p class="mt-1.5 text-[12px] font-semibold text-brand">{{ caption ?? `Starts at ${formatPeso(vehicle.baseFee)}` }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VehicleType } from '@/data/vehicle';
import { formatPeso } from '@/data/services';

defineProps<{ vehicle: VehicleType; subtitle?: string; caption?: string }>();
</script>
