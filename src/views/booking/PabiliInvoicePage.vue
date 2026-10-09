<template>
  <AppPage>
    <PabiliPageHeader title="Pabili Service Invoice" :fallback="`/bookings/pabili/${booking.id}`">
      Invoice number: <span class="font-semibold">{{ booking.invoiceNo }}</span>
    </PabiliPageHeader>

    <article class="card overflow-hidden">
      <!-- Heading -->
      <section class="px-4 pt-6 pb-6">
        <img :src="logo" alt="Shipzy" class="mx-auto h-[31px] w-auto" />
        <p class="mt-7 text-[13px] font-medium tracking-wide text-brand uppercase">Official Booking Invoice</p>
        <p class="mt-2 text-[12px] leading-4 text-body/80">
          This invoice summarizes the purchased items, service charges, delivery fees, and payment information for your
          Pabili booking.
        </p>
        <dl class="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
          <div v-for="f in headFields" :key="f.label">
            <dt class="text-[12px] text-muted uppercase">{{ f.label }}</dt>
            <dd class="mt-1 text-[13px] font-semibold text-ink">{{ f.value }}</dd>
          </div>
        </dl>
      </section>

      <!-- Billed to -->
      <section class="border-t border-line px-4 pt-6 pb-6">
        <SectionTitle :icon="User" eyebrow="Billed To" title="Customer Information" />
        <dl class="mt-5 flex flex-col gap-4">
          <div v-for="f in customerFields" :key="f.label">
            <dt class="text-[12px] text-muted uppercase">{{ f.label }}</dt>
            <dd class="mt-1 text-[12px] font-medium text-ink">{{ f.value }}</dd>
          </div>
        </dl>
      </section>

      <!-- Booking details -->
      <section class="border-t border-line px-4 pt-6 pb-6">
        <SectionTitle :icon="ClipboardList" eyebrow="Booking Details" title="Service Information" />
        <dl class="mt-5 flex flex-col gap-3.5">
          <div v-for="f in serviceFields" :key="f.label" class="flex items-center justify-between gap-3">
            <dt class="text-[12px] text-muted">{{ f.label }}</dt>
            <dd class="text-[12px] font-semibold text-ink">{{ f.value }}</dd>
          </div>
          <div class="flex items-center justify-between gap-3">
            <dt class="text-[12px] text-muted">Payment Status</dt>
            <dd>
              <span
                class="rounded-full px-2 py-px text-[11px] font-medium"
                :class="booking.payment.status === 'Paid' ? 'bg-[#d3f3df] text-success' : 'bg-warning-light text-warning'"
              >{{ booking.payment.status }}</span>
            </dd>
          </div>
        </dl>
      </section>

      <!-- Items -->
      <section class="border-t border-line px-4 pt-6 pb-6">
        <SectionTitle :icon="ShoppingBasket" eyebrow="Order Breakdown" title="Purchased Items" />
        <div class="mt-6 flex flex-col gap-3">
          <PurchasedStoreCard v-for="store in booking.stores" :key="store.name" :store="store" variant="invoice" />
        </div>
      </section>

      <!-- Notes -->
      <section class="border-t border-line px-4 pt-6 pb-6">
        <p class="text-[13px] font-medium tracking-wide text-brand uppercase">Customer Notes</p>
        <p class="mt-4 rounded-lg border border-line bg-[#f8fafc] px-3 py-5 text-[13px] leading-4 text-ink">
          {{ booking.notes }}
        </p>
        <div class="mt-3 flex gap-3 rounded-lg border border-blue-100 bg-[#eff8ff] px-3 py-3">
          <Info class="mt-0.5 h-4 w-4 shrink-0 text-brand" :stroke-width="1.75" />
          <p class="text-[12px] leading-4 text-body">
            This invoice is generated for your Shipzy Pabili booking. Store receipts may be viewed separately from the
            booking details page.
          </p>
        </div>
      </section>

      <!-- Payment summary -->
      <section class="border-t border-line px-4 pt-6 pb-6">
        <p class="text-[13px] font-medium tracking-wide text-brand uppercase">Payment Summary</p>
        <dl class="mt-5 flex flex-col gap-3.5">
          <div v-for="row in summaryRows" :key="row.label" class="flex justify-between">
            <dt class="text-[12px] text-muted">{{ row.label }}</dt>
            <dd class="text-[12px] font-semibold text-ink">{{ formatPeso(row.value) }}</dd>
          </div>
        </dl>
        <div class="mt-5 flex items-center justify-between border-t border-line pt-4">
          <div>
            <p class="text-[12px] text-muted uppercase">Total Amount</p>
            <p class="mt-1 text-[12px] text-muted">Inclusive of all applicable fees</p>
          </div>
          <p class="text-[20px] font-bold text-brand">{{ formatPeso(bookingTotal(booking)) }}</p>
        </div>
      </section>

      <footer class="bg-[#eff5fb] px-6 pt-6 pb-6 text-center">
        <p class="flex items-center justify-center gap-2.5 text-[13px] font-semibold text-ink">
          <ShieldCheck class="h-[18px] w-[18px] text-brand" :stroke-width="1.75" />Thank you for using Shipzy.
        </p>
        <p class="mt-3 text-[12px] leading-4 text-muted">
          For questions about this invoice, please contact Shipzy support and provide your booking reference
          {{ booking.id }}.
        </p>
      </footer>
    </article>

    <template #footer>
      <AppButton variant="brand" block @click="download">
        <Download class="h-5 w-5" :stroke-width="1.75" />Download Invoice
      </AppButton>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, type Component } from 'vue';
import { useRoute } from 'vue-router';
import { ClipboardList, Download, Info, ShieldCheck, ShoppingBasket, User } from 'lucide-vue-next';
import logo from '@/assets/images/logo.png';
import AppPage from '@/components/layout/AppPage.vue';
import AppButton from '@/components/ui/AppButton.vue';
import PabiliPageHeader from '@/components/pabili/PabiliPageHeader.vue';
import PurchasedStoreCard from '@/components/pabili/PurchasedStoreCard.vue';
import { bookingSubtotal, bookingTotal, getPabiliBooking, storeTotal } from '@/data/pabili';
import { formatPeso } from '@/data/services';

const route = useRoute();
const booking = computed(() => getPabiliBooking(String(route.params.id ?? '')));

/** Section heading: teal square icon + eyebrow + title. */
const SectionTitle = defineComponent({
  props: { icon: { type: Object as () => Component, required: true }, eyebrow: String, title: String },
  setup(props) {
    return () =>
      h('div', { class: 'flex items-center gap-3.5' }, [
        h('span', { class: 'flex h-7 w-7 items-center justify-center rounded-md bg-brand text-white' }, [
          h(props.icon, { class: 'h-4 w-4', 'stroke-width': 1.75 }),
        ]),
        h('div', [
          h('p', { class: 'text-[13px] font-medium tracking-wide text-brand uppercase' }, props.eyebrow),
          h('p', { class: 'text-[14px] font-semibold text-ink' }, props.title),
        ]),
      ]);
  },
});

const headFields = computed(() => [
  { label: 'Invoice No.', value: booking.value.invoiceNo },
  { label: 'Booking No.', value: booking.value.id },
  { label: 'Invoice Date', value: booking.value.invoiceDate },
  { label: 'Time', value: booking.value.invoiceTime },
]);

const customerFields = computed(() => [
  { label: 'Full Name', value: booking.value.delivery.recipient },
  { label: 'Mobile Number', value: booking.value.delivery.phone },
  { label: 'Delivery Address', value: booking.value.delivery.address },
]);

const serviceFields = computed(() => [
  { label: 'Service', value: 'Pabili Service' },
  { label: 'Delivery Type', value: booking.value.delivery.type },
  { label: 'Schedule', value: booking.value.delivery.schedule.replace(' at ', ' • ') },
  { label: 'Payment Method', value: booking.value.payment.method },
]);

const summaryRows = computed(() => [
  { label: 'Items Subtotal', value: bookingSubtotal(booking.value) },
  { label: 'Service Fee', value: booking.value.fees.service },
  { label: 'Delivery Fee', value: booking.value.fees.delivery },
  { label: 'Multi-store Fee', value: booking.value.fees.multiStore },
  { label: 'Platform Fee', value: booking.value.fees.platform },
]);

/** No backend: build a plain-text invoice and hand it to the browser as a download. */
function download() {
  const b = booking.value;
  const lines = [
    'SHIPZY — OFFICIAL BOOKING INVOICE',
    `Invoice No.: ${b.invoiceNo}`,
    `Booking No.: ${b.id}`,
    `Date: ${b.invoiceDate} ${b.invoiceTime}`,
    '',
    `Billed to: ${b.delivery.recipient} (${b.delivery.phone})`,
    `Delivery address: ${b.delivery.address}`,
    '',
    ...b.stores.flatMap((s) => [
      `${s.name} — ${formatPeso(storeTotal(s))}`,
      ...s.items.map((i) => `  ${i.name}  ${formatPeso(i.price)} x ${i.qty}  ${formatPeso(i.price * i.qty)}`),
    ]),
    '',
    ...summaryRows.value.map((r) => `${r.label}: ${formatPeso(r.value)}`),
    `TOTAL AMOUNT: ${formatPeso(bookingTotal(b))}`,
  ];
  const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${b.invoiceNo}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
</script>
