<template>
  <AppPage>
    <PageHeader
      title="Legal & Authorized Signatory"
      subtitle="Registered identity and company representative."
      back
      fallback="/tabs/profile"
    />

    <div class="flex flex-col gap-6">
      <BusinessFormCard title="Legal Registered Business">
        <FormField label="Registered Name" for-id="registered-name">
          <TextInput id="registered-name" v-model="registeredName" placeholder="Enter registered business name" />
        </FormField>
        <FormField label="Registered Address" for-id="registered-address">
          <TextArea id="registered-address" v-model="registeredAddress" :rows="3" placeholder="Enter registered address" />
        </FormField>
      </BusinessFormCard>

      <BusinessFormCard title="Authorized Signatory">
        <BusinessContactFields v-model="signatory" id-prefix="signatory" person-label="Full Name" />
      </BusinessFormCard>
    </div>

    <template #footer>
      <BusinessSaveButton />
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import BusinessContactFields from '@/components/profile/BusinessContactFields.vue';
import BusinessFormCard from '@/components/profile/BusinessFormCard.vue';
import BusinessSaveButton from '@/components/profile/BusinessSaveButton.vue';
import FormField from '@/components/ui/FormField.vue';
import TextArea from '@/components/ui/TextArea.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { legalInfo } from '@/data/business';

const registeredName = ref(legalInfo.registeredName);
const registeredAddress = ref(legalInfo.registeredAddress);
const { fullName, ...rest } = legalInfo.signatory;
const signatory = ref({ person: fullName, ...rest });
</script>
