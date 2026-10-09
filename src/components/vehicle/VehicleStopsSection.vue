<template>
  <VehicleStepCard :step="4" title="Additional Stops" hint="(Optional)" subtitle="Add one or more stops before the final drop-off point.">
    <div
      v-if="!draft.stops.length"
      class="flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-6 text-center"
    >
      <span class="flex h-[35px] w-[35px] items-center justify-center rounded-lg bg-brand-light text-brand">
        <Route class="h-[18px] w-[18px]" :stroke-width="1.75" />
      </span>
      <p class="mt-4 text-[13px] font-semibold text-ink">Choose on Google Map</p>
      <p class="mt-2 text-[12px] leading-[16px] text-muted">Search an address, use your location,<br />or place the pin on the map.</p>
    </div>

    <ol v-else class="flex flex-col gap-2.5">
      <li
        v-for="(stop, i) in draft.stops"
        :key="i"
        class="flex items-start gap-3 rounded-xl border border-line bg-white px-3 py-3"
      >
        <span class="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-lg bg-warning-light text-[13px] font-semibold text-warning">
          {{ i + 1 }}
        </span>
        <div class="min-w-0 flex-1">
          <p class="text-[11px] font-medium text-warning uppercase">Stop {{ i + 1 }}</p>
          <p class="mt-0.5 text-[13px] leading-[18px] text-ink">{{ stop }}</p>
        </div>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-lg text-muted active:bg-slate-100"
          :aria-label="`Remove stop ${i + 1}`"
          @click="draft.stops.splice(i, 1)"
        >
          <X class="h-4 w-4" />
        </button>
      </li>
    </ol>

    <button
      type="button"
      class="mt-5 flex h-[38px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-brand bg-brand-light/60 text-[13px] font-semibold text-brand active:bg-brand-light"
      @click="addStop"
    >
      <Plus class="h-[18px] w-[18px]" /> Choose on Google Map
    </button>
    <p v-if="draft.stops.length" class="mt-2 text-center text-[11px] text-muted">
      {{ formatPeso(STOP_FEE) }} per additional stop
    </p>
  </VehicleStepCard>
</template>

<script setup lang="ts">
import { Plus, Route, X } from 'lucide-vue-next';
import VehicleStepCard from './VehicleStepCard.vue';
import { mockPlaces, STOP_FEE, vehicleDraft as draft } from '@/data/vehicle';
import { formatPeso } from '@/data/services';

function addStop() {
  const places = mockPlaces.stops;
  draft.stops.push(places[draft.stops.length % places.length]);
}
</script>
