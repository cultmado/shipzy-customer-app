<template>
  <VehicleStepCard :step="step" :title="title" :subtitle="subtitle">
    <div class="flex flex-col gap-4">
      <FormField :label="locationLabel" required>
        <VehicleMapPicker v-model="model.location" :place="place" :danger="danger" />
      </FormField>

      <FormField
        label="Complete Address"
        required
        :for-id="`${idPrefix}-address`"
        help="Add the exact house, building, unit, street, or subdivision details."
      >
        <TextInput
          :id="`${idPrefix}-address`"
          v-model="model.address"
          placeholder="House/Lot/Block, Street, Subdivision, Barangay"
        />
      </FormField>

      <FormField label="Contact Person" required :for-id="`${idPrefix}-contact`">
        <TextInput :id="`${idPrefix}-contact`" v-model="model.contactPerson" placeholder="Enter contact person" />
      </FormField>

      <FormField label="Contact Number" required :for-id="`${idPrefix}-phone`">
        <PhoneInput :id="`${idPrefix}-phone`" v-model="model.contactNumber" />
      </FormField>

      <FormField label="Subdivision" hint=" (Optional)" :for-id="`${idPrefix}-subdivision`">
        <TextInput :id="`${idPrefix}-subdivision`" v-model="model.subdivision" placeholder="Nearby landmark" />
      </FormField>

      <FormField label="Notes" hint=" (Optional)" :for-id="`${idPrefix}-notes`">
        <TextInput :id="`${idPrefix}-notes`" v-model="model.notes" :placeholder="notesPlaceholder" />
      </FormField>
    </div>
  </VehicleStepCard>
</template>

<script setup lang="ts">
import FormField from '@/components/ui/FormField.vue';
import PhoneInput from '@/components/ui/PhoneInput.vue';
import TextInput from '@/components/ui/TextInput.vue';
import VehicleStepCard from './VehicleStepCard.vue';
import VehicleMapPicker from './VehicleMapPicker.vue';
import type { LocationDraft } from '@/data/vehicle';

defineProps<{
  step: number;
  title: string;
  subtitle: string;
  locationLabel: string;
  notesPlaceholder: string;
  place: string;
  idPrefix: string;
  danger?: boolean;
}>();

/** The location draft object is mutated in place (it lives in the shared booking draft). */
const model = defineModel<LocationDraft>({ required: true });
</script>
