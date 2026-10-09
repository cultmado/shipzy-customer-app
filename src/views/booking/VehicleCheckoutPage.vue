<template>
  <AppPage>
    <PageHeader
      title="Vehicle Request - Checkout"
      subtitle="Review your vehicle, route, service details, and estimated cost before confirming your booking."
      back
      fallback="/book/vehicle"
    />

    <div class="flex flex-col gap-6">
      <VehicleSummaryCard
        title="Route Summary"
        subtitle="Preview the complete route from pick-up to drop-off, including additional stops."
        :icon="ClipboardCheck"
      >
        <VehicleRouteMap :from="cityOf(origin)" :to="cityOf(destination)" :stops="draft.stops.length" meta="31.6 km · approx. 1 hr 24 min" />
      </VehicleSummaryCard>

      <VehicleSummaryCard title="Vehicle Summary" subtitle="Review your route and estimated charges." :icon="ClipboardCheck">
        <VehicleSummaryBox :vehicle="vehicle" />

        <VehicleRouteTimeline :points="points" class="mt-4" />

        <div class="my-4 h-px bg-line" />

        <VehicleFeeList :rows="rows" :total="fees.total" />
      </VehicleSummaryCard>
    </div>

    <template #footer>
      <div class="flex items-center gap-3">
        <div class="min-w-0 flex-1">
          <p class="text-[12px] text-muted">Estimated Total</p>
          <p class="text-[22px] leading-7 font-bold text-brand">{{ formatPeso(fees.total) }}</p>
        </div>
        <AppButton variant="brand" size="md" class="w-[167px] font-medium" @click="confirm">
          <CircleCheck class="h-5 w-5" :stroke-width="1.75" /> Confirm
        </AppButton>
      </div>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { CircleCheck, ClipboardCheck } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import VehicleSummaryCard from '@/components/vehicle/VehicleSummaryCard.vue';
import VehicleRouteMap from '@/components/vehicle/VehicleRouteMap.vue';
import VehicleSummaryBox from '@/components/vehicle/VehicleSummaryBox.vue';
import VehicleRouteTimeline, { type TimelinePoint } from '@/components/vehicle/VehicleRouteTimeline.vue';
import VehicleFeeList from '@/components/vehicle/VehicleFeeList.vue';
import { mockPlaces, vehicleByKey, vehicleDraft as draft, vehicleFees as fees } from '@/data/vehicle';
import { formatPeso } from '@/data/services';

const vehicle = computed(() => vehicleByKey(draft.vehicle));
const origin = computed(() => draft.pickup.location || mockPlaces.pickup);
const destination = computed(() => draft.dropoff.location || mockPlaces.dropoff);

const cityOf = (place: string) => place.split(',')[0];

const points = computed<TimelinePoint[]>(() => [
  { label: 'Origin', caption: 'Pickup from Address', address: origin.value, tone: 'green' },
  ...draft.stops.map((s, i) => ({
    label: `Stop ${i + 1}`,
    caption: 'Additional Stop',
    address: s,
    tone: 'orange' as const,
  })),
  { label: 'Destination', caption: 'Deliver to Address', address: destination.value, tone: 'red' },
]);

const rows = computed(() => [
  { label: 'Vehicle Fee', amount: fees.value.vehicle },
  { label: 'Distance Fee', amount: fees.value.distance },
  { label: `Stop Fee (${fees.value.stopCount})`, amount: fees.value.stops },
  { label: 'Assistance Fees', amount: fees.value.assistance },
  { label: 'Toll & Other Fees', amount: fees.value.toll },
]);

const ionRouter = useIonRouter();

function confirm() {
  ionRouter.navigate('/bookings/vehicle/VEH-2026-0712-0001', 'forward');
}
</script>
