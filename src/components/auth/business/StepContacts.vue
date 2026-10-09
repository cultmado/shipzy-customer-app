<template>
  <div>
    <StepHeading title="Business Contacts" subtitle="Provide the primary, finance and COD contacts." />
    <section
      v-for="(section, i) in sections"
      :key="section.key"
      class="flex flex-col gap-6"
      :class="i === 0 ? 'mt-6' : 'mt-6 border-t border-line pt-6'"
    >
      <SectionIntro :icon="User" :title="section.title" :subtitle="section.subtitle" class="-mb-3" />
      <FormField label="Contact Person Name" :for-id="`${section.key}-name`" required>
        <TextInput
          :id="`${section.key}-name`"
          v-model="form.contacts[section.key].name"
          autocomplete="off"
          placeholder="Enter full name"
          :icon="User"
        />
      </FormField>
      <FormField label="Title or Designation" :for-id="`${section.key}-title`" required>
        <TextInput
          :id="`${section.key}-title`"
          v-model="form.contacts[section.key].title"
          placeholder="Enter title or designation"
          :icon="BriefcaseBusiness"
        />
      </FormField>
      <FormField label="Mobile Number" :for-id="`${section.key}-mobile`" required>
        <SplitPhoneInput :id="`${section.key}-mobile`" v-model="form.contacts[section.key].mobile" />
      </FormField>
      <FormField label="Email Address" :for-id="`${section.key}-email`" required>
        <TextInput
          :id="`${section.key}-email`"
          v-model="form.contacts[section.key].email"
          type="email"
          inputmode="email"
          placeholder="Enter your email address"
          :icon="Mail"
        />
      </FormField>
    </section>
  </div>
</template>

<script setup lang="ts">
import { BriefcaseBusiness, Mail, User } from 'lucide-vue-next';
import FormField from '@/components/ui/FormField.vue';
import TextInput from '@/components/ui/TextInput.vue';
import SectionIntro from '@/components/auth/SectionIntro.vue';
import SplitPhoneInput from '@/components/auth/SplitPhoneInput.vue';
import StepHeading from '@/components/auth/StepHeading.vue';
import { useBusinessForm } from './useBusinessForm';

const form = useBusinessForm();

const sections = [
  { key: 'primary', title: 'Primary Contact Person', subtitle: 'Main contact for Shipzy account concerns.' },
  { key: 'finance', title: 'Finance Contact Person', subtitle: 'Handles billing, invoices and payments.' },
  { key: 'cod', title: 'COD Contact Person', subtitle: 'Handles cash-on-delivery remittances.' },
] as const;
</script>
