<template>
  <SectionCard>
    <StepHeader :step="step" :title="title" :subtitle="subtitle" class="-ml-1" />

    <div class="flex flex-col gap-4">
      <FormField :label="serviceLabel" required>
        <div class="flex flex-col gap-3" role="radiogroup" :aria-label="serviceLabel">
          <OptionCard
            v-for="opt in serviceTypeOptions"
            :key="opt.value"
            :icon="opt.value === 'pickup' ? Truck : Warehouse"
            :title="opt.title"
            :description="opt.description"
            :selected="model.serviceType === opt.value"
            @select="model.serviceType = opt.value"
          />
          <HubCard v-if="model.serviceType === 'dropoff'" :hub="hubs[model.hubIndex]" @change="cycleHub" />
        </div>
      </FormField>

      <AddressFields v-model="model.address" :id-prefix="idPrefix" />
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import { Truck, Warehouse } from 'lucide-vue-next';
import StepHeader from '@/components/ui/StepHeader.vue';
import FormField from '@/components/ui/FormField.vue';
import SectionCard from './SectionCard.vue';
import OptionCard from './OptionCard.vue';
import HubCard from './HubCard.vue';
import AddressFields, { type AddressForm } from './AddressFields.vue';
import { hubs, serviceTypeOptions, type ServiceType } from '@/data/parcel';

export interface LocationForm {
  serviceType: ServiceType;
  hubIndex: number;
  address: AddressForm;
}

defineProps<{ step: number; title: string; subtitle: string; serviceLabel: string; idPrefix: string }>();
const model = defineModel<LocationForm>({ required: true });

function cycleHub() {
  model.value.hubIndex = (model.value.hubIndex + 1) % hubs.length;
}
</script>
