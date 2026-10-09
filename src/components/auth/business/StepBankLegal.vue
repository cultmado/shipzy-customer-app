<template>
  <div>
    <StepHeading
      title="Bank and Legal Information"
      subtitle="Provide your settlement account and legal signatory details."
    />

    <section class="mt-6 flex flex-col gap-6">
      <SectionIntro
        :icon="Landmark"
        title="Bank Details"
        subtitle="Settlement account for eligible transactions."
        class="-mb-3"
      />
      <FormField label="Bank Name" for-id="bank-name" required>
        <TextInput id="bank-name" v-model="form.bankName" placeholder="Enter bank name" />
      </FormField>
      <FormField label="Beneficiary Account Name" for-id="bank-account-name" required>
        <TextInput id="bank-account-name" v-model="form.accountName" placeholder="Enter account holder name" />
      </FormField>
      <FormField label="Beneficiary Account Number" for-id="bank-account-number" required>
        <TextInput
          id="bank-account-number"
          v-model="form.accountNumber"
          inputmode="numeric"
          placeholder="Enter account number"
        />
      </FormField>
      <FormField label="Beneficiary Account Type" for-id="bank-account-type" required>
        <SelectInput
          id="bank-account-type"
          v-model="form.accountType"
          :options="bankAccountTypes"
          placeholder="Select account type"
        />
      </FormField>
    </section>

    <section class="mt-6 flex flex-col gap-6 border-t border-line pt-6">
      <SectionIntro
        :icon="Scale"
        title="Legal Business Information"
        subtitle="Enter the information appearing on your registration records."
        class="-mb-3"
      />
      <FormField label="Legal Registered Business Name" for-id="legal-name" required>
        <TextInput id="legal-name" v-model="form.legalName" placeholder="Enter legal registered business name" />
      </FormField>
      <FormField label="Legal Registered Business Address" for-id="legal-address" required>
        <TextArea
          id="legal-address"
          v-model="form.legalAddress"
          :rows="3"
          placeholder="Enter legal registered business address"
        />
      </FormField>
    </section>

    <section class="mt-6 flex flex-col gap-6 border-t border-line pt-6">
      <SectionIntro
        :icon="Landmark"
        title="Authorized Signatory"
        subtitle="Person authorized to sign agreements for the company."
        class="-mb-3"
      />
      <FormField label="Name of Signatory" for-id="sig-name" required>
        <TextInput id="sig-name" v-model="form.signatoryName" placeholder="Enter full name" />
      </FormField>
      <FormField label="Designation of Signatory" for-id="sig-designation" required>
        <TextInput id="sig-designation" v-model="form.signatoryDesignation" placeholder="Example: President" />
      </FormField>
      <FormField label="Contact Number of Signatory" for-id="sig-contact" required>
        <TextInput
          id="sig-contact"
          v-model="form.signatoryContact"
          type="tel"
          inputmode="tel"
          placeholder="Enter contact number"
        />
      </FormField>
      <FormField label="Email Address of Signatory" for-id="sig-email" required>
        <TextInput
          id="sig-email"
          v-model="form.signatoryEmail"
          type="email"
          inputmode="email"
          placeholder="Enter email address"
        />
      </FormField>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Landmark, Scale } from 'lucide-vue-next';
import FormField from '@/components/ui/FormField.vue';
import SelectInput from '@/components/ui/SelectInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import TextInput from '@/components/ui/TextInput.vue';
import SectionIntro from '@/components/auth/SectionIntro.vue';
import StepHeading from '@/components/auth/StepHeading.vue';
import { bankAccountTypes } from '@/data/auth';
import { useBusinessForm } from './useBusinessForm';

const form = useBusinessForm();
</script>
