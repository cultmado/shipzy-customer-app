<template>
  <VehicleStepCard :step="1" title="Booking Details" subtitle="Tell us what you are moving and when you need the vehicle.">
    <div class="flex flex-col gap-4">
      <FormField label="Type of Item" required for-id="veh-item-type">
        <SelectInput id="veh-item-type" v-model="draft.itemType" :options="itemTypes" placeholder="Select type of item" />
      </FormField>

      <FormField label="Declared Value (₱)" required for-id="veh-declared">
        <TextInput id="veh-declared" v-model="draft.declaredValue" type="number" inputmode="decimal" placeholder="0.00" />
      </FormField>

      <FormField label="Request Type" required>
        <div class="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Request Type">
          <button
            v-for="opt in requestTypes"
            :key="opt.value"
            type="button"
            role="radio"
            :aria-checked="draft.requestType === opt.value"
            class="h-[44px] rounded-xl border text-[15px] font-semibold transition-colors"
            :class="
              draft.requestType === opt.value
                ? 'border-brand bg-brand-light/60 text-brand'
                : 'border-line bg-white text-ink active:bg-slate-50'
            "
            @click="draft.requestType = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
      </FormField>

      <template v-if="draft.requestType === 'schedule'">
        <FormField label="Pick-up Date" required for-id="veh-date">
          <TextInput id="veh-date" v-model="draft.pickupDate" type="date" />
        </FormField>
        <FormField label="Pick-up Time" required for-id="veh-time">
          <TextInput id="veh-time" v-model="draft.pickupTime" type="time" />
        </FormField>
      </template>
      <p v-else class="rounded-xl bg-brand-light/60 px-4 py-3 text-[12px] leading-[17px] text-brand">
        The nearest available driver will be dispatched as soon as your booking is confirmed.
      </p>
    </div>
  </VehicleStepCard>
</template>

<script setup lang="ts">
import FormField from '@/components/ui/FormField.vue';
import SelectInput from '@/components/ui/SelectInput.vue';
import TextInput from '@/components/ui/TextInput.vue';
import VehicleStepCard from './VehicleStepCard.vue';
import { itemTypes, vehicleDraft as draft } from '@/data/vehicle';

const requestTypes = [
  { value: 'on-demand', label: 'On Demand' },
  { value: 'schedule', label: 'Schedule' },
] as const;
</script>
