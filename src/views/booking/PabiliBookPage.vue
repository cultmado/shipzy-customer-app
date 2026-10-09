<template>
  <AppPage>
    <!-- Local header: the back button steps backwards through the flow before leaving the page. -->
    <header class="mb-4 flex items-start gap-3">
      <button
        type="button"
        aria-label="Go back"
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-ink active:bg-slate-50"
        @click="goBack"
      >
        <ArrowLeft class="h-5 w-5" />
      </button>
      <div class="min-w-0 flex-1">
        <h1 class="text-[20px] leading-7 font-bold text-ink">{{ header.title }}</h1>
        <p class="mt-0.5 text-[13px] leading-[18px] text-body">{{ header.subtitle }}</p>
      </div>
    </header>

    <PabiliStepAddress v-if="step === 0" />
    <PabiliStepStore v-else-if="step === 1" />
    <PabiliStepProducts v-else-if="step === 2" @change-store="setStep(1)" />
    <PabiliStepCheckout v-else />

    <template #footer>
      <AppButton v-if="step === 0" variant="brand" block @click="setStep(1)">
        Choose Store <ArrowRight class="h-5 w-5" />
      </AppButton>
      <AppButton v-else-if="step === 1" variant="brand" block @click="setStep(2)">
        Proceed <ArrowRight class="h-5 w-5" />
      </AppButton>
      <div v-else class="flex items-center justify-between gap-4">
        <div class="min-w-0">
          <p class="text-[12px] text-muted">{{ form.selectionLabel.value }}</p>
          <p class="mt-0.5 text-[22px] leading-7 font-bold text-brand">
            {{ formatPeso(step === 2 ? form.subtotal.value : form.fees.value.total) }}
          </p>
        </div>
        <AppButton
          variant="brand"
          class="h-[52px] w-[147px] font-medium"
          :disabled="form.itemCount.value === 0"
          @click="step === 2 ? setStep(3) : confirm()"
        >
          <CircleCheck class="h-6 w-6" :stroke-width="1.75" />
          {{ step === 2 ? 'Checkout' : 'Confirm' }}
        </AppButton>
      </div>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useIonRouter } from '@ionic/vue';
import { ArrowLeft, ArrowRight, CircleCheck } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import AppButton from '@/components/ui/AppButton.vue';
import PabiliStepAddress from '@/components/pabili/PabiliStepAddress.vue';
import PabiliStepCheckout from '@/components/pabili/PabiliStepCheckout.vue';
import PabiliStepProducts from '@/components/pabili/PabiliStepProducts.vue';
import PabiliStepStore from '@/components/pabili/PabiliStepStore.vue';
import { providePabiliForm } from '@/components/pabili/pabiliForm';
import { NEW_PABILI_BOOKING_ID } from '@/data/pabili';
import { formatPeso } from '@/data/services';

const route = useRoute();
const ionRouter = useIonRouter();
const form = providePabiliForm();

// `?step=N` lets you deep-link a step (handy for previews); defaults to the first step.
const initial = Number(route.query.step);
const step = ref(Number.isInteger(initial) && initial >= 0 && initial <= 3 ? initial : 0);

const header = computed(() =>
  step.value === 3
    ? {
        title: 'Pabili Service - Checkout',
        subtitle: 'Review your selected items, delivery details, and total amount before confirming your booking.',
      }
    : {
        title: 'Book Pabili Service',
        subtitle: 'Choose your items, add them to cart, and we will buy and deliver them for you.',
      },
);

function scrollTop() {
  document
    .querySelectorAll<HTMLElement & { scrollToTop?: (d?: number) => Promise<void> }>('ion-content')
    .forEach((c) => c.scrollToTop?.(0));
}

function setStep(n: number) {
  step.value = n;
  scrollTop();
}

function goBack() {
  if (step.value > 0) return setStep(step.value - 1);
  if (ionRouter.canGoBack()) ionRouter.back();
  else ionRouter.navigate('/tabs/book', 'back', 'replace');
}

function confirm() {
  ionRouter.navigate(`/bookings/pabili/${NEW_PABILI_BOOKING_ID}`, 'forward');
}
</script>
