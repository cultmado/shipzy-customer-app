<template>
  <AppPage>
    <PageHeader
      title="Book Vehicle Request"
      subtitle="Choose the right vehicle, enter your route, and review the estimated booking cost."
      back
      fallback="/tabs/book"
    />

    <form class="flex flex-col gap-6" @submit.prevent="checkout">
      <VehicleBookingDetailsSection />
      <VehicleChooseSection />
      <VehicleLocationSection
        v-model="draft.pickup"
        :step="3"
        title="Pick-up Point"
        subtitle="Enter where the driver should collect your cargo."
        location-label="Pick-up Location"
        notes-placeholder="Pickup instructions"
        :place="mockPlaces.pickup"
        id-prefix="veh-pickup"
      />
      <VehicleStopsSection />
      <VehicleLocationSection
        v-model="draft.dropoff"
        :step="5"
        title="Drop-off Point"
        subtitle="Enter the final delivery address and receiver information."
        location-label="Drop-off Location"
        notes-placeholder="Drop-off instructions"
        :place="mockPlaces.dropoff"
        id-prefix="veh-dropoff"
        danger
      />
      <VehicleCargoSection />
      <VehiclePaymentSection />
    </form>

    <template #footer>
      <div class="flex items-center gap-3">
        <div class="min-w-0 flex-1">
          <p class="text-[12px] text-muted">Estimated Total</p>
          <p class="text-[22px] leading-7 font-bold text-brand">{{ formatPeso(fees.total) }}</p>
        </div>
        <AppButton variant="danger" size="md" class="border-danger/40 font-medium" @click="resetVehicleDraft">
          <RotateCcw class="h-5 w-5" /> Reset
        </AppButton>
        <AppButton variant="brand" size="md" class="px-5 font-medium" @click="checkout">Checkout</AppButton>
      </div>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { useIonRouter } from '@ionic/vue';
import { RotateCcw } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import VehicleBookingDetailsSection from '@/components/vehicle/VehicleBookingDetailsSection.vue';
import VehicleChooseSection from '@/components/vehicle/VehicleChooseSection.vue';
import VehicleLocationSection from '@/components/vehicle/VehicleLocationSection.vue';
import VehicleStopsSection from '@/components/vehicle/VehicleStopsSection.vue';
import VehicleCargoSection from '@/components/vehicle/VehicleCargoSection.vue';
import VehiclePaymentSection from '@/components/vehicle/VehiclePaymentSection.vue';
import { mockPlaces, resetVehicleDraft, vehicleDraft as draft, vehicleFees as fees } from '@/data/vehicle';
import { formatPeso } from '@/data/services';

const ionRouter = useIonRouter();

function checkout() {
  ionRouter.navigate('/book/vehicle/checkout', 'forward');
}
</script>
