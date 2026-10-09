<template>
  <AppPage>
    <PageHeader
      title="Parcel & Cargo Invoice"
      :subtitle="`Invoice number: ${booking.invoiceNo}`"
      back
      :fallback="`/bookings/parcel/${booking.id}`"
    />

    <article class="card overflow-hidden">
      <InvoiceHeader
        description="This invoice contains the shipment details, package information, service charges, and payment summary for your Parcel & Cargo booking."
        :meta="meta"
      />

      <div class="border-t border-line px-4 py-6">
        <InvoicePartyBlock :party="booking.origin" eyebrow="Origin" eyebrow-class="text-success" />
      </div>
      <div class="border-t border-line px-4 py-6">
        <InvoicePartyBlock :party="booking.destination" eyebrow="Destination" eyebrow-class="text-danger" />
      </div>

      <div class="border-t border-line px-4 py-6">
        <InvoiceSectionTitle eyebrow="Shipment Details" title="Package Information" />
        <PackageInfoGrid :pkg="booking.package" :payment-mode="booking.payment.method" :accent-tracking="false" class="mt-4" />
      </div>

      <div class="border-t border-line px-4 py-6">
        <p class="text-[12px] text-brand uppercase">Handling Notes</p>
        <p class="mt-4 rounded-lg border border-line bg-[#fafcfe] px-3 py-4 text-[13px] leading-4 text-ink">{{ booking.notes }}</p>

        <div class="mt-3 flex gap-3 rounded-lg bg-[#d8edfe] px-3 py-3">
          <CalendarClock class="mt-px h-[18px] w-[18px] shrink-0 text-brand" :stroke-width="1.5" />
          <div>
            <p class="text-[12px] font-semibold text-ink">Estimated Delivery</p>
            <p class="mt-0.5 text-[12px] text-body">{{ booking.estimatedDelivery }}</p>
          </div>
        </div>

        <div class="mt-3 flex gap-3 rounded-lg border border-[#dbeafe] bg-[#eff8ff] px-3 py-3">
          <Info class="mt-px h-[18px] w-[18px] shrink-0 text-brand" :stroke-width="1.5" />
          <p class="text-[11.5px] leading-4 text-body">
            The final shipment amount is based on verified package dimensions, weight, service mode, insurance, and applicable charges.
          </p>
        </div>
      </div>

      <div class="border-t border-line px-4 py-6">
        <p class="mb-4 text-[12px] text-brand uppercase">Payment Summary</p>
        <FeeBreakdown
          :fees="booking.fees"
          muted
          total-label="TOTAL AMOUNT"
          total-class="text-muted"
          total-hint="Inclusive of all applicable fees"
        />
      </div>

      <InvoiceThankYou :reference="booking.id" />
    </article>

    <template #footer>
      <AppButton variant="brand" size="md" block class="mx-auto flex h-[38px] max-w-[320px] text-[15px]" @click="download">
        <Download class="h-[18px] w-[18px]" :stroke-width="1.75" />
        Download Invoice
      </AppButton>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { toastController } from '@ionic/vue';
import { CalendarClock, Download, Info } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import InvoiceHeader from '@/components/parcel/InvoiceHeader.vue';
import InvoicePartyBlock from '@/components/parcel/InvoicePartyBlock.vue';
import InvoiceSectionTitle from '@/components/parcel/InvoiceSectionTitle.vue';
import InvoiceThankYou from '@/components/parcel/InvoiceThankYou.vue';
import PackageInfoGrid from '@/components/parcel/PackageInfoGrid.vue';
import FeeBreakdown from '@/components/parcel/FeeBreakdown.vue';
import { getParcelBooking } from '@/data/parcel';

const route = useRoute();
const booking = computed(() => getParcelBooking(String(route.params.id ?? '')));

const meta = computed(() => [
  { label: 'Invoice No.', value: booking.value.invoiceNo },
  { label: 'Booking No.', value: booking.value.id },
  { label: 'Invoice Date', value: booking.value.invoiceDate },
  { label: 'Time', value: booking.value.invoiceTime },
]);

async function download() {
  const toast = await toastController.create({
    message: `${booking.value.invoiceNo}.pdf downloaded`,
    duration: 2000,
    position: 'top',
  });
  await toast.present();
}
</script>
