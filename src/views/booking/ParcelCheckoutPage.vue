<template>
  <AppPage>
    <PageHeader
      title="Book Parcel & Cargo - Checkout"
      subtitle="Review your shipment details, delivery information, and payment summary before confirming your booking."
      back
      fallback="/book/parcel"
    />

    <section class="card overflow-hidden">
      <div class="flex items-start justify-between gap-4 border-b border-line px-5 pt-5 pb-4">
        <div>
          <h2 class="text-[17px] font-semibold text-ink">Shipment Summary</h2>
          <p class="mt-1.5 text-[13px] text-muted">Review your route and estimated charges.</p>
        </div>
        <span class="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-brand-light text-brand">
          <ClipboardCheck class="h-[18px] w-[18px]" :stroke-width="1.75" />
        </span>
      </div>

      <div class="px-5 pt-4 pb-5">
        <RouteSummary :stops="stops" />

        <div class="my-4 border-t border-line" />
        <KeyValueRows :rows="shipmentRows" />
        <div class="my-4 border-t border-line" />
        <KeyValueRows :rows="measureRows" />
        <div class="my-4 border-t border-line" />

        <p class="mb-4 text-[12px] text-ink"><span class="font-semibold">Fee Breakdown</span> (Estimated)</p>
        <FeeBreakdown :fees="summary.fees" total-class="text-[12.5px]">
          <template #total-label><span class="font-semibold">Fee Breakdown</span> (Estimated)</template>
        </FeeBreakdown>
      </div>
    </section>

    <template #footer>
      <div class="flex items-center gap-4">
        <div class="min-w-0 flex-1">
          <p class="text-[11px] text-muted">Estimated Total</p>
          <p class="text-[22px] leading-7 font-bold text-brand">{{ formatPeso(total) }}</p>
        </div>
        <button
          type="button"
          class="flex h-[40px] w-[167px] items-center justify-center gap-2 rounded-xl bg-brand text-[15px] font-medium text-white active:bg-brand-dark"
          @click="confirm"
        >
          <CircleCheck class="h-[18px] w-[18px]" :stroke-width="1.75" />
          Confirm
        </button>
      </div>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { useIonRouter } from '@ionic/vue';
import { CircleCheck, ClipboardCheck } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import RouteSummary from '@/components/parcel/RouteSummary.vue';
import KeyValueRows from '@/components/parcel/KeyValueRows.vue';
import FeeBreakdown from '@/components/parcel/FeeBreakdown.vue';
import { formatPeso } from '@/data/services';
import { checkoutSummary as summary, sumFees } from '@/data/parcel';

const ionRouter = useIonRouter();
const total = sumFees(summary.fees);

const stops = [
  { title: 'Origin', ...summary.origin, tone: 'green' as const },
  { title: 'Destination', ...summary.destination, tone: 'red' as const },
];

const shipmentRows = [
  { label: 'Declared Value', value: formatPeso(summary.declaredValue) },
  { label: 'Payment Mode', value: summary.paymentMode },
  { label: 'Mode of Shipment', value: summary.shipmentMode },
];

const measureRows = [
  { label: 'Est. Weight', value: summary.weight },
  { label: 'Est. CBM', value: summary.cbm },
];

function confirm() {
  ionRouter.navigate(summary.confirmRoute, 'forward');
}
</script>
