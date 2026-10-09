<template>
  <FormField :label="personLabel" :for-id="`${idPrefix}-person`">
    <TextInput :id="`${idPrefix}-person`" v-model="model.person" placeholder="Enter full name" autocomplete="name" />
  </FormField>
  <FormField label="Designation" :for-id="`${idPrefix}-designation`">
    <TextInput :id="`${idPrefix}-designation`" v-model="model.designation" placeholder="Enter designation" />
  </FormField>
  <FormField label="Email Address" required :for-id="`${idPrefix}-email`">
    <TextInput
      :id="`${idPrefix}-email`"
      v-model="model.email"
      type="email"
      inputmode="email"
      autocomplete="email"
      placeholder="Enter email address"
      :icon="Mail"
    />
  </FormField>
  <FormField label="Mobile Number" required :for-id="`${idPrefix}-mobile`">
    <BusinessPhoneInput :id="`${idPrefix}-mobile`" v-model="model.mobile" />
  </FormField>
</template>

<script setup lang="ts">
import { Mail } from 'lucide-vue-next';
import FormField from '@/components/ui/FormField.vue';
import TextInput from '@/components/ui/TextInput.vue';
import BusinessPhoneInput from './BusinessPhoneInput.vue';

/** Person / designation / email / mobile fields (business contacts & authorized signatory). */
withDefaults(defineProps<{ idPrefix: string; personLabel?: string }>(), { personLabel: 'Contact Person' });
const model = defineModel<{ person: string; designation: string; email: string; mobile: string }>({ required: true });
</script>
