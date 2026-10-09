<template>
  <AppPage content-class="pt-[calc(env(safe-area-inset-top)+24px)]">
    <img :src="logo" alt="Shipzy" class="mx-auto h-[62px] w-auto" />

    <h1 class="mt-8 text-[32px] leading-10 font-normal text-ink">Login</h1>
    <p class="mt-2 text-[13px] text-body">Log in to manage your bookings and track your deliveries.</p>

    <form class="mt-6 flex flex-col gap-6" @submit.prevent="login">
      <FormField label="Email Address" for-id="email">
        <TextInput
          id="email"
          v-model="email"
          type="email"
          inputmode="email"
          autocomplete="email"
          placeholder="Enter your email address"
          :icon="Mail"
        />
      </FormField>

      <FormField label="Password" for-id="password">
        <TextInput
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          placeholder="Enter your password"
          :icon="LockKeyhole"
        />
      </FormField>

      <CheckBox v-model="remember">Remember me</CheckBox>

      <AppButton type="submit" block class="mt-2">Log In</AppButton>
    </form>

    <div class="my-5 flex items-center gap-4 text-[15px] text-muted">
      <span class="h-px flex-1 bg-line" />or continue with<span class="h-px flex-1 bg-line" />
    </div>

    <AppButton variant="outline" block class="h-[54px]" @click="login">
      <GoogleIcon class="h-5 w-5" />
      Continue with Google
    </AppButton>

    <div class="mt-4 flex flex-col gap-3">
      <router-link
        v-for="opt in registerOptions"
        :key="opt.to"
        :to="opt.to"
        class="card flex items-center gap-4 p-3 active:bg-slate-50"
      >
        <span class="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-primary-light text-primary">
          <component :is="opt.icon" class="h-6 w-6" :stroke-width="1.75" />
        </span>
        <span class="flex-1">
          <span class="block text-[13px] text-muted">{{ opt.eyebrow }}</span>
          <span class="block text-[16px] font-medium text-ink">{{ opt.title }}</span>
        </span>
        <ChevronRight class="h-5 w-5 text-primary" />
      </router-link>
    </div>

    <p class="mt-6 text-center text-[13px] leading-5 text-muted">
      By continuing, you agree to Shipzy’s<br />
      <a href="#" class="font-semibold text-primary">Terms and Conditions</a> and
      <a href="#" class="font-semibold text-primary">Privacy Policy</a>
    </p>
  </AppPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { BriefcaseBusiness, ChevronRight, LockKeyhole, Mail, User } from 'lucide-vue-next';
import logo from '@/assets/images/logo.png';
import AppPage from '@/components/layout/AppPage.vue';
import AppButton from '@/components/ui/AppButton.vue';
import CheckBox from '@/components/ui/CheckBox.vue';
import FormField from '@/components/ui/FormField.vue';
import GoogleIcon from '@/components/ui/GoogleIcon.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { useSession } from '@/composables/useSession';

const email = ref('');
const password = ref('');
const remember = ref(false);

const registerOptions = [
  { to: '/register/customer', eyebrow: 'I’m a customer', title: 'Register Here', icon: User },
  { to: '/register/business', eyebrow: 'I’m a business', title: 'Create Account', icon: BriefcaseBusiness },
];

const ionRouter = useIonRouter();
const session = useSession();

function login() {
  // No backend yet: an email containing "business" signs in as the demo business account.
  session.signIn(email.value.toLowerCase().includes('business') ? 'business' : 'customer');
  ionRouter.navigate('/tabs/home', 'root', 'replace');
}
</script>
