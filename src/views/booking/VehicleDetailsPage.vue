<template>
  <AppPage>
    <PageHeader title="Vehicle Request Details" :subtitle="`Booking ID: ${d.bookingId}`" back fallback="/tabs/bookings" />

    <div class="flex flex-col gap-6">
      <StatusHeroCard
        :icon="cancelled ? CircleX : Navigation"
        :title="cancelled ? 'Booking Cancelled' : d.status.title"
        :description="cancelled ? 'This vehicle request was cancelled. Your driver has been notified.' : d.status.description"
        :stats="d.status.stats"
      />

      <VehicleDetailCard title="Route Tracking" subtitle="Pickup, additional stops, and final drop-off.">
        <div class="px-2 pt-2">
          <VehicleRouteMap from="Bajada" to="Ecoland" :stops="2" meta="12.8 km left · ETA 10:42 AM" />
        </div>
        <div class="mt-6 grid grid-cols-2 gap-3">
          <VehicleInfoTile v-for="t in d.tracking" :key="t.label" :label="t.label" :value="t.value" />
        </div>
      </VehicleDetailCard>

      <VehicleDetailCard title="Route Details" subtitle="Complete pickup and delivery sequence.">
        <VehicleRouteDetails :points="d.route" />
      </VehicleDetailCard>

      <VehicleDetailCard title="Booking Timeline" subtitle="Latest events and delivery progress.">
        <VehicleBookingTimeline :events="d.timeline" />
      </VehicleDetailCard>

      <VehicleDetailCard title="Booking Details" subtitle="Request schedule, cargo category, and declared shipment value.">
        <div class="grid grid-cols-2 gap-3">
          <VehicleDetailTile label="Request Type" :value="d.details.requestType" />
          <VehicleDetailTile label="Pickup Schedule" :value="d.details.pickupDate" :caption="d.details.pickupTime" caption-accent />
          <VehicleDetailTile class="col-span-2" label="Booking Created" :value="d.details.createdDate" :caption="d.details.createdTime" />
        </div>
        <div class="my-4 h-px bg-line" />
        <div class="grid grid-cols-2 gap-3">
          <VehicleDetailTile label="Declared Value" :value="formatPeso(d.details.declaredValue)" />
          <VehicleDetailTile label="Total Weight" :value="d.details.totalWeight" />
          <VehicleDetailTile class="col-span-2" label="Cargo Type" :value="d.details.cargoType" />
          <VehicleDetailTile class="col-span-2" label="Item Description" :value="d.details.itemDescription" small />
        </div>
        <div class="mt-4 flex flex-col gap-3 px-2">
          <VehicleChoiceCard
            v-for="s in services"
            :key="s.key"
            :icon="extraIcons[s.key]"
            :title="s.title"
            :description="s.description"
            readonly
          />
        </div>
      </VehicleDetailCard>

      <VehicleDetailCard title="Assigned Driver" subtitle="Currently handling your request.">
        <PersonRow :name="d.driver.name" :meta="d.driver.meta" class="mt-2" />
      </VehicleDetailCard>

      <VehicleDetailCard title="Booking Summary">
        <div class="px-2">
          <VehicleSummaryBox
            :vehicle="d.vehicle"
            :subtitle="`Capacity ${d.vehicle.capacity.toLowerCase()}`"
            :caption="`${d.details.requestType} Request`"
          />
        </div>
        <KeyValueRows :rows="d.summary" class="mt-5 px-1" />
      </VehicleDetailCard>

      <VehicleDetailCard title="Fee Breakdown">
        <FeeBreakdown :fees="booking.fees" total-label="Total Paid" total-class="font-bold text-[13px]" class="px-2" />
      </VehicleDetailCard>

      <LinkCard :to="`/bookings/vehicle/${id}/invoice`" />
    </div>

    <template v-if="!cancelled" #footer>
      <AppButton variant="danger" size="md" block class="font-medium" @click="cancel">Cancel</AppButton>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue';
import { useRoute } from 'vue-router';
import { alertController } from '@ionic/vue';
import { CircleX, Navigation, PackageMinus, PackagePlus, Users, Wine } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import StatusHeroCard from '@/components/parcel/StatusHeroCard.vue';
import PersonRow from '@/components/parcel/PersonRow.vue';
import KeyValueRows from '@/components/parcel/KeyValueRows.vue';
import FeeBreakdown from '@/components/parcel/FeeBreakdown.vue';
import LinkCard from '@/components/parcel/LinkCard.vue';
import VehicleDetailCard from '@/components/vehicle/VehicleDetailCard.vue';
import VehicleRouteMap from '@/components/vehicle/VehicleRouteMap.vue';
import VehicleInfoTile from '@/components/vehicle/VehicleInfoTile.vue';
import VehicleRouteDetails from '@/components/vehicle/VehicleRouteDetails.vue';
import VehicleBookingTimeline from '@/components/vehicle/VehicleBookingTimeline.vue';
import VehicleDetailTile from '@/components/vehicle/VehicleDetailTile.vue';
import VehicleChoiceCard from '@/components/vehicle/VehicleChoiceCard.vue';
import VehicleSummaryBox from '@/components/vehicle/VehicleSummaryBox.vue';
import { extraServices, vehicleBooking as booking, vehicleDetails as d, type ExtraKey } from '@/data/vehicle';
import { formatPeso } from '@/data/services';

const route = useRoute();
const id = computed(() => String(route.params.id ?? booking.id));

const extraIcons: Record<ExtraKey, Component> = {
  fragile: Wine,
  loading: PackagePlus,
  unloading: PackageMinus,
  helper: Users,
};
const services = extraServices.filter((s) => d.details.extras.includes(s.key));

const cancelled = ref(false);

async function cancel() {
  const alert = await alertController.create({
    header: 'Cancel booking?',
    message: 'Your assigned driver will be notified and this vehicle request will be cancelled.',
    buttons: [
      { text: 'Keep Booking', role: 'cancel' },
      { text: 'Cancel Booking', role: 'destructive', handler: () => (cancelled.value = true) },
    ],
  });
  await alert.present();
}
</script>
