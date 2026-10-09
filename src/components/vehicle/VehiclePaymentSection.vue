<template>
  <VehicleStepCard :step="7" title="Payment & Notes" subtitle="Choose a payment method and add final instructions.">
    <div class="flex flex-col gap-3" role="radiogroup" aria-label="Payment method">
      <VehicleChoiceCard
        v-for="p in paymentMethods"
        :key="p.key"
        role="radio"
        :aria-checked="draft.payment === p.key"
        :icon="p.key === 'cod' ? Banknote : WalletCards"
        :title="p.title"
        :description="p.description"
        :selected="draft.payment === p.key"
        @select="draft.payment = p.key"
      />
    </div>

    <FormField label="Additional Notes" for-id="veh-notes" class="mt-5">
      <div class="relative">
        <textarea
          id="veh-notes"
          v-model="draft.notes"
          rows="5"
          maxlength="500"
          placeholder="Add any special instructions for handling your shipment."
          class="w-full resize-none rounded-xl border border-line bg-white px-4 pt-3 pb-7 text-[15px] text-ink outline-none transition-colors placeholder:text-placeholder focus:border-primary"
        />
        <span class="pointer-events-none absolute right-3 bottom-3 text-[11px] text-muted">{{ draft.notes.length }}/500</span>
      </div>
    </FormField>
  </VehicleStepCard>
</template>

<script setup lang="ts">
import { Banknote, WalletCards } from 'lucide-vue-next';
import FormField from '@/components/ui/FormField.vue';
import VehicleStepCard from './VehicleStepCard.vue';
import VehicleChoiceCard from './VehicleChoiceCard.vue';
import { paymentMethods, vehicleDraft as draft } from '@/data/vehicle';
</script>
