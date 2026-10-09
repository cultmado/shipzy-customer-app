<template>
  <div>
    <StepHeading title="Account Information" subtitle="Create the login credentials for your business account." />
    <div class="mt-5 flex flex-col gap-6">
      <FormField label="Email Address" for-id="biz-email" required>
        <TextInput
          id="biz-email"
          v-model="form.email"
          type="email"
          inputmode="email"
          autocomplete="email"
          placeholder="Enter your email address"
          :icon="Mail"
        />
      </FormField>
      <FormField label="Password" for-id="biz-password" required help="Use at least 8 characters.">
        <TextInput
          id="biz-password"
          v-model="form.password"
          type="password"
          autocomplete="new-password"
          placeholder="Enter your password"
          :icon="LockKeyhole"
        />
      </FormField>
      <FormField label="Confirm Password" for-id="biz-confirm" required :error="confirmError">
        <TextInput
          id="biz-confirm"
          v-model="form.confirmPassword"
          type="password"
          autocomplete="new-password"
          placeholder="Enter your password"
          :icon="LockKeyhole"
          :error="!!confirmError"
        />
      </FormField>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { LockKeyhole, Mail } from 'lucide-vue-next';
import FormField from '@/components/ui/FormField.vue';
import TextInput from '@/components/ui/TextInput.vue';
import StepHeading from '@/components/auth/StepHeading.vue';
import { useBusinessForm } from './useBusinessForm';

const form = useBusinessForm();
const confirmError = computed(() =>
  form.confirmPassword && form.confirmPassword !== form.password ? 'Passwords do not match.' : undefined,
);
</script>
