<template>
  <SectionCard>
    <StepHeader step="3" title="Shipment Details" subtitle="Set the declared value, payment mode, and delivery speed." class="-ml-1" />

    <div class="flex flex-col gap-4">
      <FormField label="Declared Value (₱)" required for-id="declared-value">
        <TextInput id="declared-value" v-model="model.declaredValue" placeholder="0.00" inputmode="decimal" />
      </FormField>
      <FormField label="Payment Mode" required for-id="payment-mode">
        <SelectInput id="payment-mode" v-model="model.paymentMode" :options="paymentModes" />
      </FormField>
      <FormField label="Mode of Shipment" required for-id="shipment-mode">
        <SelectInput id="shipment-mode" v-model="model.shipmentMode" :options="shipmentModes" />
      </FormField>
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import StepHeader from '@/components/ui/StepHeader.vue';
import FormField from '@/components/ui/FormField.vue';
import TextInput from '@/components/ui/TextInput.vue';
import SelectInput from '@/components/ui/SelectInput.vue';
import SectionCard from './SectionCard.vue';
import { paymentModes, shipmentModes } from '@/data/parcel';

export interface ShipmentForm {
  declaredValue: string;
  paymentMode: string;
  shipmentMode: string;
}

const model = defineModel<ShipmentForm>({ required: true });
</script>
