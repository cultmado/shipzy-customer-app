<template>
  <div class="flex flex-col gap-4">
    <FormField label="Contact Person" required :for-id="`${idPrefix}-contact`">
      <TextInput :id="`${idPrefix}-contact`" v-model="model.contact" placeholder="Enter contact person" autocomplete="name" />
    </FormField>
    <FormField label="Mobile Number" required :for-id="`${idPrefix}-mobile`">
      <PhoneInput :id="`${idPrefix}-mobile`" v-model="model.mobile" />
    </FormField>
    <FormField label="Complete Address" :hint="`\u00a0(House / Lot / Block / Street)`" required :for-id="`${idPrefix}-address`">
      <TextInput :id="`${idPrefix}-address`" v-model="model.address" placeholder="Enter complete address" />
    </FormField>
    <FormField label="Subdivision" :hint="`\u00a0(Optional)`" :for-id="`${idPrefix}-subdivision`">
      <TextInput :id="`${idPrefix}-subdivision`" v-model="model.subdivision" placeholder="Enter subdivision" />
    </FormField>
    <FormField label="Province" required :for-id="`${idPrefix}-province`">
      <SelectInput
        :id="`${idPrefix}-province`"
        v-model="model.province"
        :options="provinces"
        placeholder="Select Province"
        @update:model-value="model.city = ''"
      />
    </FormField>
    <FormField label="Municipality / City" required :for-id="`${idPrefix}-city`">
      <SelectInput :id="`${idPrefix}-city`" v-model="model.city" :options="cityOptions" placeholder="Select Municipality / City" />
    </FormField>
    <FormField label="Barangay" required :for-id="`${idPrefix}-barangay`">
      <SelectInput :id="`${idPrefix}-barangay`" v-model="model.barangay" :options="barangays" placeholder="Select Barangay" />
    </FormField>
    <FormField label="Country" required :for-id="`${idPrefix}-country`">
      <SelectInput :id="`${idPrefix}-country`" v-model="model.country" :options="countries" />
    </FormField>
    <FormField label="Zip Code" required :for-id="`${idPrefix}-zip`">
      <TextInput :id="`${idPrefix}-zip`" v-model="model.zip" placeholder="Enter Zip Code" inputmode="numeric" />
    </FormField>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FormField from '@/components/ui/FormField.vue';
import TextInput from '@/components/ui/TextInput.vue';
import PhoneInput from '@/components/ui/PhoneInput.vue';
import SelectInput from '@/components/ui/SelectInput.vue';
import { barangays, cities, countries, provinces } from '@/data/parcel';

export interface AddressForm {
  contact: string;
  mobile: string;
  address: string;
  subdivision: string;
  province: string;
  city: string;
  barangay: string;
  country: string;
  zip: string;
}

defineProps<{ idPrefix: string }>();
const model = defineModel<AddressForm>({ required: true });

const cityOptions = computed(() => cities[model.value.province] ?? Object.values(cities).flat());
</script>
