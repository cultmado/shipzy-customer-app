<template>
  <AppPage>
    <PageHeader title="Bank Information" subtitle="Sensitive details are masked." back fallback="/tabs/profile" />

    <BusinessFormCard>
      <FormField label="Bank Name" for-id="bank-name">
        <TextInput id="bank-name" v-model="form.bankName" placeholder="Enter bank name" />
      </FormField>
      <FormField label="Account Name" for-id="account-name">
        <TextInput id="account-name" v-model="form.accountName" placeholder="Enter account name" />
      </FormField>
      <FormField label="Account Type" for-id="account-type">
        <TextInput id="account-type" v-model="form.accountType" placeholder="e.g. Business Checking" />
      </FormField>
      <FormField label="Account Number" for-id="account-number">
        <TextInput
          v-if="revealed"
          id="account-number"
          v-model="form.accountNumber"
          inputmode="numeric"
          placeholder="Enter account number"
        >
          <template #suffix>
            <button type="button" class="text-muted" aria-label="Hide account number" @click="revealed = false">
              <Eye class="h-5 w-5" :stroke-width="1.75" />
            </button>
          </template>
        </TextInput>
        <TextInput v-else id="account-number" :model-value="masked" readonly>
          <template #suffix>
            <button type="button" class="text-muted" aria-label="Show account number" @click="revealed = true">
              <EyeOff class="h-5 w-5" :stroke-width="1.75" />
            </button>
          </template>
        </TextInput>
      </FormField>
    </BusinessFormCard>

    <template #footer>
      <BusinessSaveButton />
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import BusinessFormCard from '@/components/profile/BusinessFormCard.vue';
import BusinessSaveButton from '@/components/profile/BusinessSaveButton.vue';
import FormField from '@/components/ui/FormField.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { bankInfo } from '@/data/business';

const form = reactive({ ...bankInfo });
const revealed = ref(true);

/** Show only the last 4 digits when hidden. */
const masked = computed(() => {
  const digits = form.accountNumber.replace(/\s/g, '');
  return `•••• •••• ${digits.slice(-4)}`;
});
</script>
