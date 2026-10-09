<template>
  <AppPage content-class="pt-[calc(env(safe-area-inset-top)+24px)]">
    <div ref="top">
      <AuthHero title="Create a business account" subtitle="Tell us about your company and business requirements." />

      <NumberStepper class="mt-6" :total="businessSteps.length" :current="step" />

      <form class="mt-9" @submit.prevent="next">
        <component :is="stepComponents[step]" @edit="goTo" />

        <div class="mt-6 flex flex-col gap-3" :class="step >= 2 && step <= 4 && 'border-t border-line pt-6'">
          <AppButton v-if="isLast" type="submit" block :disabled="!form.agreed">Create Business Account</AppButton>
          <AppButton v-else type="submit" block :class="step === 0 && 'mt-8'">
            Continue
            <ArrowRight class="h-5 w-5" />
          </AppButton>
          <AppButton v-if="step > 0" variant="outline" block class="border-slate-400" @click="goTo(step - 1)">
            <ArrowLeft class="h-5 w-5" />
            Back
          </AppButton>
        </div>
      </form>

      <LoginPrompt />
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import { computed, nextTick, provide, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useIonRouter } from '@ionic/vue';
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AuthHero from '@/components/auth/AuthHero.vue';
import LoginPrompt from '@/components/auth/LoginPrompt.vue';
import NumberStepper from '@/components/auth/NumberStepper.vue';
import StepAccount from '@/components/auth/business/StepAccount.vue';
import StepBankLegal from '@/components/auth/business/StepBankLegal.vue';
import StepBusinessInfo from '@/components/auth/business/StepBusinessInfo.vue';
import StepContacts from '@/components/auth/business/StepContacts.vue';
import StepPaymentTax from '@/components/auth/business/StepPaymentTax.vue';
import StepReview from '@/components/auth/business/StepReview.vue';
import { useSession } from '@/composables/useSession';
import { businessFormKey, businessSteps, createBusinessForm } from '@/data/auth';

const stepComponents = [StepAccount, StepBusinessInfo, StepContacts, StepPaymentTax, StepBankLegal, StepReview];

const form = reactive(createBusinessForm());
provide(businessFormKey, form);

// `?step=N` (1-based) opens a specific step, handy for demos and screenshots.
const route = useRoute();
const initial = Number(route.query.step) - 1;
const step = ref(Number.isInteger(initial) && initial >= 0 && initial < businessSteps.length ? initial : 0);
const isLast = computed(() => step.value === businessSteps.length - 1);

const top = ref<HTMLElement>();
const ionRouter = useIonRouter();
const session = useSession();

async function goTo(index: number) {
  step.value = index;
  await nextTick();
  (top.value?.closest('ion-content') as HTMLIonContentElement | null)?.scrollToTop(200);
}

function next() {
  if (step.value === 0 && form.confirmPassword && form.confirmPassword !== form.password) return;
  if (!isLast.value) {
    goTo(step.value + 1);
    return;
  }
  if (!form.agreed) return;
  session.signIn('business');
  ionRouter.navigate('/tabs/home', 'root', 'replace');
}
</script>
