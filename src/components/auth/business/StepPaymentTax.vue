<template>
  <div>
    <StepHeading
      title="Payment and Tax Information"
      subtitle="Choose your preferred payment arrangements and tax classification."
    />
    <div class="mt-5 flex flex-col gap-6">
      <FormField label="Payment Options" required>
        <CheckCardList v-model="form.paymentOptions" :options="paymentOptions" />
      </FormField>

      <FormField label="Payment Method" required>
        <RadioCardList v-model="form.paymentMethod" name="payment-method" :options="paymentMethods" />
      </FormField>

      <SectionIntro
        :icon="NotepadText"
        title="Company Tax Information"
        subtitle="Enter the company tax registration details."
        class="-mb-3"
      />

      <FormField label="Company Tax Identification Number" for-id="biz-tin" required>
        <TextInput id="biz-tin" v-model="form.tin" inputmode="numeric" placeholder="Enter company TIN" />
      </FormField>

      <FormField label="Company Tax Classification" for-id="biz-tax" required>
        <SelectInput
          id="biz-tax"
          v-model="form.taxClassification"
          :options="taxClassifications"
          placeholder="Select tax classification"
        />
      </FormField>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NotepadText } from 'lucide-vue-next';
import FormField from '@/components/ui/FormField.vue';
import SelectInput from '@/components/ui/SelectInput.vue';
import TextInput from '@/components/ui/TextInput.vue';
import CheckCardList from '@/components/auth/CheckCardList.vue';
import RadioCardList from '@/components/auth/RadioCardList.vue';
import SectionIntro from '@/components/auth/SectionIntro.vue';
import StepHeading from '@/components/auth/StepHeading.vue';
import { paymentMethods, paymentOptions, taxClassifications } from '@/data/auth';
import { useBusinessForm } from './useBusinessForm';

const form = useBusinessForm();
</script>
