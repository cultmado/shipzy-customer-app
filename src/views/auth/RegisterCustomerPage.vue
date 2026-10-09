<template>
  <AppPage content-class="pt-[calc(env(safe-area-inset-top)+24px)]">
    <div ref="top">
      <AuthHero title="Create your account" subtitle="Sign up to book services and track your deliveries." />

      <AppButton variant="outline" block class="mt-6 h-[54px]" @click="continueWithGoogle">
        <GoogleIcon class="h-5 w-5" />
        Continue with Google
      </AppButton>

      <div class="mt-5 flex items-center gap-4 text-[15px] text-muted">
        <span class="h-px flex-1 bg-line" />or signup with email<span class="h-px flex-1 bg-line" />
      </div>

      <ProgressSteps class="mt-4" :steps="['Account Details', 'Personal Details']" :current="step" />

      <form v-if="step === 0" class="mt-6 flex flex-col gap-6" @submit.prevent="next">
        <FormField label="Email Address" for-id="reg-email" required>
          <TextInput
            id="reg-email"
            v-model="form.email"
            type="email"
            inputmode="email"
            autocomplete="email"
            placeholder="Enter your email address"
            :icon="Mail"
          />
        </FormField>

        <FormField label="Password" for-id="reg-password" required help="Use at least 8 characters.">
          <TextInput
            id="reg-password"
            v-model="form.password"
            type="password"
            autocomplete="new-password"
            placeholder="Enter your password"
            :icon="LockKeyhole"
          />
        </FormField>

        <FormField label="Confirm Password" for-id="reg-confirm" required :error="confirmError">
          <TextInput
            id="reg-confirm"
            v-model="form.confirmPassword"
            type="password"
            autocomplete="new-password"
            placeholder="Enter your password"
            :icon="LockKeyhole"
            :error="!!confirmError"
          />
        </FormField>

        <AppButton type="submit" block class="mt-4">
          Continue
          <ArrowRight class="h-5 w-5" />
        </AppButton>
      </form>

      <form v-else class="mt-6 flex flex-col gap-6" @submit.prevent="createAccount">
        <FormField label="Full Name" for-id="reg-name" required>
          <TextInput
            id="reg-name"
            v-model="form.fullName"
            autocomplete="name"
            placeholder="Enter your full name"
            :icon="User"
          />
        </FormField>

        <FormField
          label="Mobile Number"
          for-id="reg-mobile"
          required
          help="We'll use this number for booking and delivery updates."
        >
          <SplitPhoneInput id="reg-mobile" v-model="form.mobile" />
        </FormField>

        <CheckBox v-model="form.agreed">
          <span class="text-[13px] leading-5">I agree to Shipzy’s
          <a href="#" class="font-semibold text-primary" @click.prevent>Terms and Conditions</a> and
          <a href="#" class="font-semibold text-primary" @click.prevent>Privacy Policy</a></span>
        </CheckBox>

        <div class="flex flex-col gap-3">
          <AppButton variant="outline" block @click="back">
            <ArrowLeft class="h-5 w-5" />
            Back
          </AppButton>
          <AppButton type="submit" block :disabled="!form.agreed">Create Account</AppButton>
        </div>
      </form>

      <LoginPrompt />
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { ArrowLeft, ArrowRight, LockKeyhole, Mail, User } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import AppButton from '@/components/ui/AppButton.vue';
import CheckBox from '@/components/ui/CheckBox.vue';
import FormField from '@/components/ui/FormField.vue';
import GoogleIcon from '@/components/ui/GoogleIcon.vue';
import ProgressSteps from '@/components/ui/ProgressSteps.vue';
import TextInput from '@/components/ui/TextInput.vue';
import AuthHero from '@/components/auth/AuthHero.vue';
import LoginPrompt from '@/components/auth/LoginPrompt.vue';
import SplitPhoneInput from '@/components/auth/SplitPhoneInput.vue';
import { useSession } from '@/composables/useSession';

const step = ref(0);
const top = ref<HTMLElement>();

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  fullName: '',
  mobile: '',
  agreed: false,
});

const confirmError = computed(() =>
  form.confirmPassword && form.confirmPassword !== form.password ? 'Passwords do not match.' : undefined,
);

const ionRouter = useIonRouter();
const session = useSession();

function scrollTop() {
  const content = top.value?.closest('ion-content') as HTMLIonContentElement | null;
  content?.scrollToTop(200);
}

function next() {
  if (confirmError.value) return;
  step.value = 1;
  scrollTop();
}

function back() {
  step.value = 0;
  scrollTop();
}

function finish() {
  session.signIn('customer');
  ionRouter.navigate('/tabs/home', 'root', 'replace');
}

function createAccount() {
  if (!form.agreed) return;
  finish();
}

function continueWithGoogle() {
  finish();
}
</script>
