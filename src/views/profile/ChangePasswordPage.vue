<template>
  <AppPage>
    <PageHeader
      title="Change Password"
      subtitle="Update your password to keep your account secure and protected."
      back
      fallback="/tabs/profile"
    />

    <form id="change-password-form" class="card flex flex-col gap-5 px-5 pt-5 pb-5" @submit.prevent="submit">
      <FormField label="Current Password" required for-id="current-password" :error="errors.current">
        <TextInput
          id="current-password"
          v-model="current"
          type="password"
          autocomplete="current-password"
          placeholder="Enter password"
          :error="!!errors.current"
        />
      </FormField>

      <FormField label="Password" required for-id="new-password" :error="errors.next">
        <TextInput
          id="new-password"
          v-model="next"
          type="password"
          autocomplete="new-password"
          placeholder="Enter password"
          :error="!!errors.next"
        />
      </FormField>

      <FormField label="Confirm Password" required for-id="confirm-password" :error="errors.confirm">
        <TextInput
          id="confirm-password"
          v-model="confirm"
          type="password"
          autocomplete="new-password"
          placeholder="Re-enter password"
          :error="!!errors.confirm"
        />
      </FormField>

      <PasswordRequirements :password="next" class="mt-1" />
    </form>

    <template #footer>
      <AppButton variant="brand" type="submit" form="change-password-form" block>Confirm</AppButton>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useIonRouter } from '@ionic/vue';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import PasswordRequirements from '@/components/profile/PasswordRequirements.vue';
import AppButton from '@/components/ui/AppButton.vue';
import FormField from '@/components/ui/FormField.vue';
import TextInput from '@/components/ui/TextInput.vue';

const current = ref('');
const next = ref('');
const confirm = ref('');
const errors = reactive({ current: '', next: '', confirm: '' });

function isStrong(p: string) {
  return p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p) && /[^A-Za-z0-9]/.test(p);
}

const ionRouter = useIonRouter();
function submit() {
  errors.current = current.value ? '' : 'Please enter your current password.';
  errors.next = isStrong(next.value) ? '' : 'Password does not meet all the requirements.';
  errors.confirm = confirm.value && confirm.value === next.value ? '' : 'Passwords do not match.';
  if (errors.current || errors.next || errors.confirm) return;
  ionRouter.navigate('/tabs/profile', 'back');
}
</script>
