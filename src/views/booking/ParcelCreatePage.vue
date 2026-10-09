<template>
  <AppPage>
    <PageHeader
      title="Book Parcel & Cargo"
      subtitle="Enter the shipment details and we will handle your parcel safely from origin to destination."
      back
      fallback="/tabs/book"
    />

    <form :key="formKey" class="flex flex-col gap-6" @submit.prevent="checkout">
      <LocationSection
        v-model="form.origin"
        :step="1"
        title="Origin Information"
        subtitle="Choose how the parcel starts its journey, then provide the sender details."
        service-label="Origin Service Type"
        id-prefix="origin"
      />
      <LocationSection
        v-model="form.destination"
        :step="2"
        title="Destination Information"
        subtitle="Choose how the receiver gets the parcel, then provide the destination details."
        service-label="Destination Service Type"
        id-prefix="destination"
      />
      <ShipmentSection v-model="form.shipment" />
      <PackagingSection v-model="form.packaging" />
      <NotesAttachmentsSection v-model="form.notes" />
    </form>

    <template #footer>
      <div class="flex items-center gap-3">
        <div class="min-w-0 flex-1">
          <p class="text-[11px] text-muted">Estimated Total</p>
          <p class="text-[22px] leading-7 font-bold text-brand">{{ formatPeso(estimatedTotal) }}</p>
        </div>
        <button
          type="button"
          class="flex h-[38px] items-center gap-1.5 rounded-xl border border-danger/30 bg-white px-3 text-[15px] text-danger active:bg-danger-light"
          @click="reset"
        >
          <RotateCcw class="h-[18px] w-[18px]" :stroke-width="2" />
          Reset
        </button>
        <button
          type="button"
          class="h-[38px] rounded-xl bg-brand px-5 text-[15px] font-medium text-white active:bg-brand-dark"
          @click="checkout"
        >
          Checkout
        </button>
      </div>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { RotateCcw } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import LocationSection, { type LocationForm } from '@/components/parcel/LocationSection.vue';
import ShipmentSection, { type ShipmentForm } from '@/components/parcel/ShipmentSection.vue';
import PackagingSection, { type PackagingForm } from '@/components/parcel/PackagingSection.vue';
import NotesAttachmentsSection, { type NotesForm } from '@/components/parcel/NotesAttachmentsSection.vue';
import { formatPeso } from '@/data/services';
import { parcelFees, sumFees } from '@/data/parcel';

const ionRouter = useIonRouter();

const emptyLocation = (): LocationForm => ({
  serviceType: 'dropoff',
  hubIndex: 0,
  address: {
    contact: '',
    mobile: '',
    address: '',
    subdivision: '',
    province: '',
    city: '',
    barangay: '',
    country: 'Philippines',
    zip: '',
  },
});

const initial = () => ({
  origin: emptyLocation(),
  destination: emptyLocation(),
  shipment: { declaredValue: '', paymentMode: 'Cash on Delivery (COD)', shipmentMode: 'Express' } as ShipmentForm,
  packaging: { packagingType: 'Box', size: 'Small', length: 0, width: 0, height: 0, quantity: 1 } as PackagingForm,
  notes: { notes: '', attachments: [{ id: 1, name: 'parcel-photo.jpg' }] } as NotesForm,
});

const form = reactive(initial());
const formKey = ref(0);
const estimatedTotal = sumFees(parcelFees);

function reset() {
  Object.assign(form, initial());
  formKey.value++;
}

function checkout() {
  ionRouter.navigate('/book/parcel/checkout', 'forward');
}
</script>
