<template>
  <AppPage>
    <PageHeader
      title="Business Information"
      subtitle="View and manage your company details and business information."
      back
      fallback="/tabs/profile"
    />

    <BusinessFormCard>
      <FormField label="Business Name" for-id="business-name">
        <TextInput id="business-name" v-model="form.name" placeholder="Enter business name" />
      </FormField>
      <FormField label="Business Description" for-id="business-description">
        <TextArea id="business-description" v-model="form.description" :rows="3" placeholder="Describe your business" />
      </FormField>
      <FormField label="Number of Employees" for-id="business-employees">
        <SelectInput id="business-employees" v-model="form.employees" :options="employeeRanges" placeholder="Select range" />
      </FormField>
      <FormField label="Types of Goods" for-id="business-goods">
        <TextInput id="business-goods" v-model="form.goods" placeholder="e.g. Retail, Food, Documents" />
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
import TextArea from '@/components/ui/TextArea.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { businessInfo, employeeRanges } from '@/data/business';

const form = reactive({ ...businessInfo });
</script>
