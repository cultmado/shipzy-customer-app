<template>
  <VehicleStepCard :step="2" title="Choose Your Vehicle" subtitle="Select a vehicle based on your cargo size and required capacity.">
    <div class="grid grid-cols-2 gap-2.5">
      <VehicleOptionCard
        v-for="v in vehicleTypes"
        :key="v.key"
        :vehicle="v"
        :selected="draft.vehicle === v.key"
        @select="draft.vehicle = v.key"
      />
    </div>

    <div class="mt-4 flex rounded-xl bg-slate-50 px-3 py-3">
      <div class="flex-1 border-r border-line pr-3">
        <p class="text-[10px] text-muted">Starting Vehicle Fee</p>
        <p class="mt-2 text-[13px] font-semibold text-ink">{{ formatPeso(selected.baseFee) }}</p>
      </div>
      <div class="flex-1 pl-3">
        <p class="text-[10px] text-muted">Maximum Capacity</p>
        <p class="mt-2 text-[13px] font-semibold text-ink">{{ selected.capacity }}</p>
      </div>
    </div>

    <h3 class="mt-6 text-[15px] font-semibold text-ink">Extra Services</h3>
    <p class="mt-1.5 text-[12px] text-muted">Select any additional handling or assistance needed for this vehicle request</p>
    <div class="mt-4 flex flex-col gap-3">
      <VehicleChoiceCard
        v-for="s in extraServices"
        :key="s.key"
        :icon="extraIcons[s.key]"
        :title="s.title"
        :description="s.description"
        :selected="draft.extras.includes(s.key)"
        checkbox
        @select="toggle(s.key)"
      />
    </div>
  </VehicleStepCard>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';
import { PackageMinus, PackagePlus, Users, Wine } from 'lucide-vue-next';
import VehicleStepCard from './VehicleStepCard.vue';
import VehicleOptionCard from './VehicleOptionCard.vue';
import VehicleChoiceCard from './VehicleChoiceCard.vue';
import { extraServices, vehicleByKey, vehicleDraft as draft, vehicleTypes, type ExtraKey } from '@/data/vehicle';
import { formatPeso } from '@/data/services';

const extraIcons: Record<ExtraKey, Component> = {
  fragile: Wine,
  loading: PackagePlus,
  unloading: PackageMinus,
  helper: Users,
};

const selected = computed(() => vehicleByKey(draft.vehicle));

function toggle(key: ExtraKey) {
  const i = draft.extras.indexOf(key);
  if (i >= 0) draft.extras.splice(i, 1);
  else draft.extras.push(key);
}
</script>
