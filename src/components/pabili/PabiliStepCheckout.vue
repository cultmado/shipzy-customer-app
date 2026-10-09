<template>
  <div class="flex flex-col gap-6">
    <section class="card px-4 pt-5 pb-4">
      <h2 class="text-[16px] font-semibold text-ink">Delivery Address</h2>
      <p class="mt-1 text-[12px] text-body/80">Your selected address for this order.</p>
      <div class="mx-1 mt-3 flex items-start gap-4 rounded-xl bg-[#f2fafc] px-3 py-3">
        <span class="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-white text-brand">
          <MapPin class="h-[18px] w-[18px]" :stroke-width="1.75" />
        </span>
        <div class="min-w-0 flex-1 pt-0.5">
          <p class="text-[15px] font-semibold text-ink">{{ deliveryAddress.label }}</p>
          <p class="mt-1.5 text-[13px] leading-[17px] text-body/80">{{ deliveryAddress.address }}</p>
        </div>
      </div>
    </section>

    <section class="card overflow-hidden pt-5">
      <div class="px-4 pb-4">
        <h2 class="text-[16px] font-semibold text-ink">Your Cart</h2>
        <p class="mt-1.5 text-[11px] text-body/80">
          Total of {{ storeCount }} {{ storeCount === 1 ? 'store' : 'stores' }} and {{ itemCount }}
          {{ itemCount === 1 ? 'item' : 'items' }}
        </p>
      </div>

      <template v-for="group in cartGroups" :key="group.store.id">
        <div class="flex items-center gap-5 bg-[#f4f9ff] px-4 py-4">
          <ProductThumb />
          <div class="min-w-0 flex-1">
            <p class="text-[14px] font-semibold text-ink">{{ group.store.name }}</p>
            <p class="mt-0.5 text-[11px] text-muted">{{ group.itemCount }} {{ group.itemCount === 1 ? 'item' : 'items' }}</p>
          </div>
          <p class="text-[15px] font-bold text-brand">{{ formatPeso(group.total) }}</p>
        </div>
        <div
          v-for="line in group.lines"
          :key="line.product.id"
          class="flex gap-5 border-b border-line py-3 pr-4 pl-6 last:border-b-0"
        >
          <ProductThumb class="mt-0.5" />
          <div class="min-w-0 flex-1">
            <p class="text-[14px] font-semibold text-ink">{{ line.product.name }}</p>
            <QtyStepper
              class="mt-3"
              compact
              :min="1"
              :model-value="line.qty"
              @update:model-value="setQty(group.store.id, line.product.id, $event)"
            />
          </div>
          <div class="flex flex-col items-end justify-between">
            <button
              type="button"
              class="-m-1 p-1 text-danger"
              :aria-label="`Remove ${line.product.name}`"
              @click="setQty(group.store.id, line.product.id, 0)"
            >
              <Trash2 class="h-[18px] w-[18px]" :stroke-width="1.75" />
            </button>
            <p class="text-[12px] font-semibold text-brand">{{ formatPeso(line.product.price * line.qty) }}</p>
          </div>
        </div>
      </template>

      <div v-if="!cartGroups.length" class="px-4 pb-6 text-center text-[13px] text-muted">
        Your cart is empty. Go back to add products.
      </div>
    </section>

    <section class="card px-4 py-5">
      <StepHeader step="7" title="Payment & Notes" subtitle="Choose a payment method and add final instructions." />
      <div class="mx-1 flex flex-col gap-3">
        <OptionCard
          title="Cash on Delivery"
          description="Pay the driver after delivery."
          :icon="Banknote"
          icon-bg="bg-[#e8f3f8]"
          :selected="state.payment === 'cod'"
          @select="state.payment = 'cod'"
        />
        <OptionCard
          title="GCash Transfer"
          description="Instructions appear after confirmation"
          :icon="WalletCards"
          icon-bg="bg-[#e8f3f8]"
          :selected="state.payment === 'gcash'"
          @select="state.payment = 'gcash'"
        />

        <label for="pb-notes" class="mt-2 text-[16px] font-semibold text-ink">Additional Notes</label>
        <div class="relative">
          <textarea
            id="pb-notes"
            v-model="state.notes"
            rows="5"
            maxlength="500"
            placeholder="Example: Please call me if the requested brand is unavailable"
            class="w-full resize-none rounded-xl border border-line bg-white px-3.5 pt-3 pb-7 text-[14px] leading-[18px] text-ink outline-none focus:border-primary placeholder:text-placeholder"
          />
          <span class="absolute right-3 bottom-3 text-[11px] text-muted">{{ state.notes.length }}/500</span>
        </div>
      </div>
    </section>

    <section class="card px-4 py-5">
      <h2 class="text-[16px] font-semibold text-ink">Order Summary</h2>
      <div class="mx-1 mt-4 rounded-xl bg-[#f6f8fb] px-3 pt-3 pb-3.5">
        <p class="text-[11px] font-medium tracking-wide text-muted uppercase">Delivery Schedule</p>
        <div class="mt-1.5 flex items-start gap-4">
          <span class="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-white text-brand">
            <component :is="state.schedule === 'now' ? TruckElectric : CalendarClock" class="h-[18px] w-[18px]" :stroke-width="1.75" />
          </span>
          <div>
            <p class="text-[15px] font-semibold text-ink">{{ state.schedule === 'now' ? 'Deliver Now' : 'Scheduled Delivery' }}</p>
            <p class="mt-1 text-[13px] text-body/80">{{ scheduleText }}</p>
          </div>
        </div>
      </div>

      <dl class="mx-1 mt-4 flex flex-col gap-3.5 px-1 text-[13px]">
        <div v-for="row in rows" :key="row.label" class="flex items-center justify-between">
          <dt class="text-ink">{{ row.label }}</dt>
          <dd class="font-semibold text-ink">{{ formatPeso(row.value) }}</dd>
        </div>
      </dl>
      <div class="mx-1 mt-4 flex items-center justify-between border-t border-line px-1 pt-5">
        <span class="text-[14px] font-semibold text-ink">Estimated Total</span>
        <span class="text-[20px] font-bold text-brand">{{ formatPeso(fees.total) }}</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Banknote, CalendarClock, MapPin, Trash2, TruckElectric, WalletCards } from 'lucide-vue-next';
import StepHeader from '@/components/ui/StepHeader.vue';
import { formatPeso } from '@/data/services';
import OptionCard from './OptionCard.vue';
import ProductThumb from './ProductThumb.vue';
import QtyStepper from './QtyStepper.vue';
import { usePabiliForm } from './pabiliForm';

const { state, deliveryAddress, cartGroups, storeCount, itemCount, subtotal, fees, setQty } = usePabiliForm();

const scheduleText = computed(() => {
  if (state.schedule === 'now') return 'As soon as a rider is available';
  if (!state.scheduleDate && !state.scheduleTime) return 'Date and time to be confirmed';
  const date = state.scheduleDate
    ? new Date(state.scheduleDate + 'T00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';
  let time = '';
  if (state.scheduleTime) {
    const [h, m] = state.scheduleTime.split(':').map(Number);
    time = `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
  }
  return [date, time].filter(Boolean).join(' at ');
});

const rows = computed(() => [
  { label: 'Items Subtotal', value: subtotal.value },
  { label: 'Service Fee', value: fees.value.service },
  { label: `Delivery Fees (${storeCount.value} ${storeCount.value === 1 ? 'store' : 'stores'})`, value: fees.value.delivery },
  { label: 'Multi-store Fee', value: fees.value.multiStore },
  { label: 'Small Order Fee', value: fees.value.smallOrder },
  { label: 'Platform Fee', value: fees.value.platform },
]);
</script>
