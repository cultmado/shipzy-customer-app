<template>
  <VehicleStepCard :step="6" title="Cargo Details" subtitle="Describe the cargo being transported and provide its total weight.">
    <div class="flex flex-col gap-4">
      <FormField label="Total Weight (KG)" required for-id="veh-weight" :error="overCapacity">
        <TextInput
          id="veh-weight"
          v-model="draft.totalWeight"
          type="number"
          inputmode="decimal"
          placeholder="0"
          :error="!!overCapacity"
        />
      </FormField>
      <FormField label="Item Description" required for-id="veh-description">
        <TextInput id="veh-description" v-model="draft.itemDescription" placeholder="Describe the items being transported" />
      </FormField>
    </div>
  </VehicleStepCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FormField from '@/components/ui/FormField.vue';
import TextInput from '@/components/ui/TextInput.vue';
import VehicleStepCard from './VehicleStepCard.vue';
import { vehicleByKey, vehicleDraft as draft } from '@/data/vehicle';

const overCapacity = computed(() => {
  const v = vehicleByKey(draft.vehicle);
  const w = Number(draft.totalWeight);
  return w > v.capacityKg ? `Exceeds the ${v.name.toLowerCase()} capacity (${v.capacity.toLowerCase()}).` : undefined;
});
</script>
