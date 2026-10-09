<template>
  <div>
    <InvoiceSectionTitle :eyebrow="eyebrow" :title="party.mode" :eyebrow-class="eyebrowClass" />
    <dl class="mt-4 flex flex-col gap-3">
      <div v-for="f in fields" :key="f.label">
        <dt class="text-[11px] text-muted uppercase">{{ f.label }}</dt>
        <dd class="mt-1 text-[11.5px] leading-4 font-medium text-ink">{{ f.value }}</dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import InvoiceSectionTitle from './InvoiceSectionTitle.vue';
import type { Party } from '@/data/parcel';

const props = defineProps<{ party: Party; eyebrow: string; eyebrowClass?: string }>();

const fields = computed(() => [
  { label: 'Full Name', value: props.party.name },
  { label: 'Mobile Number', value: props.party.mobile },
  { label: 'Delivery Address', value: props.party.address },
]);
</script>
