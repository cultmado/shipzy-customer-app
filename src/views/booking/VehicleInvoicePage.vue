<template>
  <AppPage>
    <PageHeader
      title="Vehicle Request Invoice"
      :subtitle="`Invoice number: ${invoice.invoiceNumber}`"
      back
      :fallback="`/bookings/vehicle/${id}`"
    />

    <article class="card overflow-hidden">
      <!-- Header -->
      <section class="px-4 pt-6 pb-5">
        <img :src="logo" alt="Shipzy" class="mx-auto h-[30px] w-auto" />
        <p class="mt-6 text-[11px] font-medium text-brand uppercase">Official Vehicle Request Invoice</p>
        <p class="mt-2 text-[11px] leading-[15px] text-body">
          This invoice contains the vehicle, route, cargo, service, and payment details for your booking.
        </p>
        <dl class="mt-4 grid grid-cols-2 gap-x-4 gap-y-3.5">
          <div v-for="m in meta" :key="m.label">
            <dt class="text-[11px] text-muted uppercase">{{ m.label }}</dt>
            <dd class="mt-1 text-[12px] font-semibold text-ink">{{ m.value }}</dd>
          </div>
        </dl>
      </section>

      <VehicleInvoiceParty eyebrow="Pick-up" :title="booking.pickup.name" tone="green" :fields="partyFields(booking.pickup)" />
      <VehicleInvoiceParty eyebrow="Destination" :title="booking.dropoff.name" tone="red" :fields="partyFields(booking.dropoff)" />

      <!-- Vehicle details -->
      <VehicleInvoiceParty eyebrow="Vehicle Request Details" title="Package Information" :icon="Truck">
        <div class="mt-4 flex h-[115px] w-[115px] items-center justify-center rounded-lg bg-brand">
          <img :src="booking.vehicle.image" :alt="booking.vehicle.name" class="w-[100px] object-contain" />
        </div>
        <div class="mt-4 grid grid-cols-3 gap-2.5">
          <VehicleInfoTile label="Vehicle" :value="booking.vehicle.name" />
          <VehicleInfoTile label="Capacity" :value="booking.vehicle.capacity.replace('Up to ', '')" />
          <VehicleInfoTile label="Plate Number" :value="booking.plateNumber" />
          <VehicleInfoTile label="Cargo Type" :value="booking.cargoType" />
          <VehicleInfoTile label="Total Weight" :value="booking.totalWeight" />
          <VehicleInfoTile label="Request Type" :value="booking.requestType" />
        </div>
        <div class="mt-2.5 grid grid-cols-2 gap-2.5">
          <VehicleInfoTile label="Declared Value" :value="formatPeso(booking.declaredValue)" tint accent />
          <VehicleInfoTile label="Distance" :value="booking.distance" tint />
          <VehicleInfoTile label="Pickup Schedule" :value="booking.pickupSchedule" tint />
          <VehicleInfoTile label="Travel Duration" :value="booking.duration" tint />
        </div>
      </VehicleInvoiceParty>

      <!-- Route stops -->
      <section class="border-t border-line px-4 py-5">
        <h3 class="text-[11px] font-medium text-brand uppercase">Route Stops</h3>
        <div class="mt-4 flex flex-col gap-3">
          <div v-for="(stop, i) in booking.stops" :key="i" class="rounded-lg border border-line bg-slate-50/70 px-3 py-3">
            <p class="text-[10px] text-amber-600 uppercase">Stop {{ i + 1 }}</p>
            <p class="mt-1.5 text-[13px] font-semibold text-ink">{{ stop.name }}</p>
            <p class="mt-1.5 text-[10px] leading-[14px] text-body uppercase">{{ stop.address }}</p>
            <p class="mt-1.5 text-[10px] text-body uppercase">{{ stop.contact }}</p>
          </div>
        </div>
      </section>

      <!-- Cargo & service notes -->
      <section class="border-t border-line px-4 py-5">
        <h3 class="text-[11px] font-medium text-brand uppercase">Cargo and Service Notes</h3>
        <div class="mt-4 rounded-lg border border-line bg-slate-50/70 px-3 py-3">
          <p class="text-[10px] text-amber-600">Item Description</p>
          <p class="mt-2 text-[10px] leading-[14px] text-body uppercase">{{ booking.itemDescription }}</p>
        </div>
        <div class="mt-3 flex flex-col gap-2.5">
          <VehicleCheckItem v-for="s in booking.services" :key="s" small>{{ s }}</VehicleCheckItem>
        </div>
        <div class="mt-3 flex gap-3 rounded-lg bg-[#dcebfb] px-3 py-3">
          <NotebookText class="mt-0.5 h-4 w-4 shrink-0 text-brand" :stroke-width="1.75" />
          <div>
            <p class="text-[11px] font-semibold text-ink">Additional Notes</p>
            <p class="mt-0.5 text-[11px] leading-[15px] text-body">{{ booking.notes }}</p>
          </div>
        </div>
        <div class="mt-3 flex gap-3 rounded-lg border border-[#d6e6f8] bg-[#eef5fd] px-3 py-3">
          <CreditCard class="mt-0.5 h-4 w-4 shrink-0 text-brand" :stroke-width="1.75" />
          <div>
            <p class="text-[11px] font-semibold text-ink">Payment Information</p>
            <p class="mt-0.5 text-[11px] text-body">GCash Transfer · Transaction {{ booking.transaction }}</p>
          </div>
        </div>
      </section>

      <!-- Payment summary -->
      <section class="border-t border-line px-4 py-5">
        <h3 class="text-[11px] font-medium text-brand uppercase">Payment Summary</h3>
        <dl class="mt-4 flex flex-col gap-3">
          <div v-for="f in booking.fees" :key="f.label" class="flex items-center justify-between">
            <dt class="text-[11px] text-muted">{{ f.label }}</dt>
            <dd class="text-[11px] font-bold text-ink">{{ formatPeso(f.amount) }}</dd>
          </div>
        </dl>
        <div class="mt-5 flex items-center justify-between border-t border-line pt-4">
          <div>
            <p class="text-[11px] text-muted uppercase">Total Amount</p>
            <p class="mt-0.5 text-[11px] text-muted">Inclusive of all applicable fees</p>
          </div>
          <p class="text-[17px] font-bold text-brand">{{ formatPeso(booking.total) }}</p>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-[#eef4fa] px-6 py-6 text-center">
        <p class="flex items-center justify-center gap-2 text-[11px] font-semibold text-ink">
          <ShieldCheck class="h-4 w-4 text-brand" :stroke-width="1.75" /> Thank you for using Shipzy.
        </p>
        <p class="mt-3 text-[10px] leading-[14px] text-muted">
          For questions about this invoice, please contact Shipzy support and provide your booking reference
          {{ invoice.bookingNo }}.
        </p>
      </footer>
    </article>

    <template #footer>
      <AppButton variant="brand" size="md" block class="font-medium" @click="download">
        <Download class="h-5 w-5" :stroke-width="1.75" /> {{ downloaded ? 'Invoice Downloaded' : 'Download Invoice' }}
      </AppButton>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { CreditCard, Download, NotebookText, ShieldCheck, Truck } from 'lucide-vue-next';
import logo from '@/assets/images/logo.png';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import VehicleInvoiceParty from '@/components/vehicle/VehicleInvoiceParty.vue';
import VehicleInfoTile from '@/components/vehicle/VehicleInfoTile.vue';
import VehicleCheckItem from '@/components/vehicle/VehicleCheckItem.vue';
import { vehicleBooking as booking, vehicleInvoice as invoice, type ContactPoint } from '@/data/vehicle';
import { formatPeso } from '@/data/services';

const route = useRoute();
const id = computed(() => String(route.params.id ?? booking.id));

const meta = [
  { label: 'Invoice No.', value: invoice.invoiceNo },
  { label: 'Booking No.', value: invoice.bookingNo },
  { label: 'Invoice Date', value: invoice.date },
  { label: 'Time', value: invoice.time },
];

function partyFields(p: ContactPoint) {
  return [
    { label: 'Full Name', value: p.contactPerson },
    { label: 'Mobile Number', value: p.mobile },
    { label: 'Delivery Address', value: p.address, strong: false },
  ];
}

const downloaded = ref(false);
function download() {
  // No backend: simulate the download.
  downloaded.value = true;
  setTimeout(() => (downloaded.value = false), 2500);
}
</script>
