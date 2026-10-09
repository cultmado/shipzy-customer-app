<template>
  <AppPage>
    <PageHeader
      title="Parcel & Cargo Details"
      :subtitle="`Booking ${booking.id} · Created ${booking.createdAt}`"
      back
      fallback="/tabs/bookings"
    />

    <div class="flex flex-col gap-6">
      <StatusHeroCard
        :icon="statusIcon"
        :title="booking.status"
        :description="booking.statusDescription"
        :stats="[{ label: 'Estimated Delivery', value: booking.estimatedDelivery }]"
      />

      <section class="card p-5">
        <CardHeading title="Shipment Progress" subtitle="Track every major milestone of your shipment." />
        <ProgressTimeline :steps="booking.timeline" :current-icon="statusIcon" />
      </section>

      <section class="card p-5">
        <CardHeading title="Route & Contact Information" subtitle="Sender, receiver, and service type details." />
        <div class="flex flex-col gap-4">
          <PartyCard :party="booking.origin" eyebrow="Origin" tone="green" />
          <PartyCard :party="booking.destination" eyebrow="Destination" tone="red" />
        </div>
      </section>

      <section class="card p-5">
        <CardHeading title="Package Information" subtitle="Declared shipment specifications and packaging." />
        <PackageInfoGrid :pkg="booking.package" />
      </section>

      <section class="card p-5">
        <CardHeading title="Notes & Attachments" subtitle="Special handling instructions and uploaded files." />
        <div class="rounded-lg border border-line bg-[#fafcfe] px-3 py-3">
          <p class="text-[11px] font-semibold text-muted uppercase">Handling Notes</p>
          <p class="mt-0.5 text-[12.5px] leading-[17px] text-ink">{{ booking.notes }}</p>
        </div>
        <h3 class="mt-5 mb-4 text-[15px] font-semibold text-ink">Attachments</h3>
        <AttachmentList :files="booking.attachments" />
      </section>

      <section class="card p-5">
        <CardHeading title="Assigned Courier" subtitle="Your shipment handler" />
        <PersonRow
          v-if="booking.courier"
          :name="booking.courier.name"
          :meta="`${booking.courier.vehicle} · ${booking.courier.plate}`"
        />
        <p v-else class="rounded-lg bg-[#fafcfe] px-3 py-3 text-[12px] text-muted">
          A courier will be assigned once your booking is confirmed.
        </p>
      </section>

      <section class="card p-5">
        <CardHeading title="Booking Summary" />
        <KeyValueRows :rows="summaryRows" class="px-2" />
      </section>

      <section class="card p-5">
        <CardHeading title="Fee Breakdown" />
        <FeeBreakdown :fees="booking.fees" :total-label="booking.totalLabel" class="px-2" />
      </section>

      <LinkCard :to="`/bookings/parcel/${booking.id}/invoice`" />
    </div>

    <template v-if="booking.cancellable" #footer>
      <button
        type="button"
        class="mx-auto block h-[38px] w-full max-w-[320px] rounded-xl border border-danger bg-white text-[13px] text-danger active:bg-danger-light"
        @click="cancel"
      >
        Cancel
      </button>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { alertController } from '@ionic/vue';
import { CircleCheck, Clock, Truck } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import StatusHeroCard from '@/components/parcel/StatusHeroCard.vue';
import CardHeading from '@/components/parcel/CardHeading.vue';
import ProgressTimeline from '@/components/parcel/ProgressTimeline.vue';
import PartyCard from '@/components/parcel/PartyCard.vue';
import PackageInfoGrid from '@/components/parcel/PackageInfoGrid.vue';
import AttachmentList from '@/components/parcel/AttachmentList.vue';
import PersonRow from '@/components/parcel/PersonRow.vue';
import KeyValueRows, { type KeyValueRow } from '@/components/parcel/KeyValueRows.vue';
import FeeBreakdown from '@/components/parcel/FeeBreakdown.vue';
import LinkCard from '@/components/parcel/LinkCard.vue';
import { getParcelBooking } from '@/data/parcel';

const route = useRoute();
const booking = computed(() => getParcelBooking(String(route.params.id ?? '')));

const statusIcon = computed(() => ({ truck: Truck, clock: Clock, check: CircleCheck })[booking.value.statusIcon]);

const summaryRows = computed<KeyValueRow[]>(() => [
  { label: 'Reference', value: booking.value.id },
  { label: 'Shipment Mode', value: booking.value.package.shipmentMode },
  { label: 'Payment Method', value: booking.value.payment.method },
  { label: 'Payment Status', value: booking.value.payment.status, badge: booking.value.payment.statusTone },
]);

async function cancel() {
  const alert = await alertController.create({
    header: 'Cancel booking?',
    message: `Booking ${booking.value.id} will be canceled.`,
    buttons: [
      { text: 'Keep Booking', role: 'cancel' },
      { text: 'Cancel Booking', role: 'destructive' },
    ],
  });
  await alert.present();
}
</script>
