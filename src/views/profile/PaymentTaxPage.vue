<template>
  <AppPage>
    <PageHeader
      title="Payment & Tax Information"
      subtitle="Billing preferences and tax details."
      back
      fallback="/tabs/profile"
    />

    <BusinessFormCard>
      <FormField label="Payment Options" for-id="payment-options">
        <TextInput id="payment-options" v-model="form.options" placeholder="e.g. Bank Transfer, GCash" />
      </FormField>
      <FormField label="Payment Method" for-id="payment-method">
        <SelectInput id="payment-method" v-model="form.method" :options="paymentMethods" placeholder="Select payment method" />
      </FormField>
      <FormField label="Company TIN" for-id="company-tin">
        <TextInput id="company-tin" v-model="form.tin" placeholder="000-000-000-000" />
      </FormField>
      <FormField label="Tax Classification" for-id="tax-classification">
        <SelectInput
          id="tax-classification"
          v-model="form.taxClassification"
          :options="taxClassifications"
          placeholder="Select tax classification"
        />
      </FormField>
    </BusinessFormCard>

    <template #footer>
      <BusinessSaveButton />
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import BusinessFormCard from '@/components/profile/BusinessFormCard.vue';
import BusinessSaveButton from '@/components/profile/BusinessSaveButton.vue';
import FormField from '@/components/ui/FormField.vue';
import SelectInput from '@/components/ui/SelectInput.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { paymentMethods, paymentTax, taxClassifications } from '@/data/business';

const form = reactive({ ...paymentTax });
</script>
