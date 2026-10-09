<template>
  <div>
    <div class="flex h-[115px] w-[115px] items-center justify-center rounded-lg bg-brand">
      <img :src="packagingImage[pkg.type]" :alt="pkg.type" class="h-[96px] w-[96px] object-contain" />
    </div>
    <div class="mt-4 grid grid-cols-3 gap-3">
      <InfoTile label="Type" :value="pkg.type" />
      <InfoTile label="Size" :value="pkg.size" />
      <InfoTile label="Quantity" :value="pkg.quantity" />
      <InfoTile label="Verified Weight" :value="pkg.weight" />
      <InfoTile label="Dimensions" :value="pkg.dimensions" />
      <InfoTile label="Total CBM" :value="pkg.cbm" />
    </div>
    <div class="mt-3 grid grid-cols-2 gap-3">
      <InfoTile tint accent label="Declared Value" :value="formatPeso(pkg.declaredValue)" />
      <InfoTile tint label="Shipment Mode" :value="pkg.shipmentMode" />
      <InfoTile v-if="paymentMode" tint label="Payment Mode" :value="paymentMode" class="col-span-2" />
      <InfoTile tint :accent="accentTracking" label="Tracking Number" :value="pkg.trackingNumber" class="col-span-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import InfoTile from './InfoTile.vue';
import { formatPeso } from '@/data/services';
import { packagingImage, type ParcelBooking } from '@/data/parcel';

withDefaults(
  defineProps<{ pkg: ParcelBooking['package']; paymentMode?: string; accentTracking?: boolean }>(),
  { accentTracking: true },
);
</script>
