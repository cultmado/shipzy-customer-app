<template>
  <AppPage>
    <PageHeader
      title="Contact Information"
      subtitle="Keep your contact details up to date so we can reach you when needed."
      back
      fallback="/tabs/profile"
    />

    <form id="contact-info-form" class="card flex flex-col gap-5 px-5 pt-5 pb-8" @submit.prevent="save">
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <label for="contact-email" class="text-[15px] font-semibold text-ink">Email Address</label>
          <span class="rounded-md bg-success-light px-2.5 py-1 text-[11px] leading-[14px] font-semibold text-success">
            Verified
          </span>
        </div>
        <TextInput
          id="contact-email"
          v-model="email"
          type="email"
          inputmode="email"
          autocomplete="email"
          placeholder="Enter your email address"
          :icon="Mail"
        />
      </div>

      <FormField label="Mobile Number" for-id="contact-mobile">
        <PlainPhoneInput id="contact-mobile" v-model="mobile" />
      </FormField>
    </form>

    <template #footer>
      <AppButton variant="brand" type="submit" form="contact-info-form" block>Save</AppButton>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { Mail } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import PlainPhoneInput from '@/components/profile/PlainPhoneInput.vue';
import AppButton from '@/components/ui/AppButton.vue';
import FormField from '@/components/ui/FormField.vue';
import TextInput from '@/components/ui/TextInput.vue';

const email = ref('employee@company.com');
const mobile = ref('');

const ionRouter = useIonRouter();
function save() {
  ionRouter.navigate('/tabs/profile', 'back');
}
</script>
