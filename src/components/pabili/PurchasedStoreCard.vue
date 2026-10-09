<template>
  <div class="overflow-hidden rounded-xl border border-line bg-white">
    <div class="flex items-center gap-4 border-b border-line bg-[#f8fafc] px-3 py-3" :class="variant === 'details' && 'flex-wrap'">
      <ProductThumb size="sm" />
      <div class="min-w-0 flex-1">
        <p class="text-[13px] font-semibold text-ink">{{ store.name }}</p>
        <p class="mt-0.5 text-[10px] text-muted">{{ store.address }}</p>
      </div>
      <p v-if="variant === 'invoice'" class="text-[11px] font-bold text-ink">{{ formatPeso(total) }}</p>
      <div v-else class="flex w-full items-center gap-3">
        <span
          class="rounded-full px-2 py-px text-[9px] font-medium"
          :class="store.status === 'Purchased' ? 'bg-success-light text-success' : 'bg-warning-light text-warning'"
        >{{ store.status }}</span>
        <span class="text-[16px] font-semibold text-brand">{{ formatPeso(total) }}</span>
      </div>
    </div>

    <div
      v-for="item in store.items"
      :key="item.name"
      class="flex items-center gap-5 border-b border-line px-3 py-2.5 last:border-b-0"
    >
      <ProductThumb />
      <div class="min-w-0 flex-1">
        <p class="text-[12px] font-medium text-ink">{{ item.name }}</p>
        <p class="mt-0.5 text-[10px] text-muted">{{ formatPeso(item.price) }} × {{ item.qty }}</p>
      </div>
      <p class="text-[11px] font-bold text-ink">{{ formatPeso(item.price * item.qty) }}</p>
    </div>

    <div v-if="variant === 'details'" class="flex items-center justify-between border-t border-line px-3 py-2.5">
      <p class="text-[10px] text-muted">{{ store.receiptNote }}</p>
      <button v-if="store.hasReceipt" type="button" class="flex items-center gap-1.5 text-[11px] text-brand">
        <ReceiptText class="h-4 w-4" :stroke-width="1.75" />View Receipt
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ReceiptText } from 'lucide-vue-next';
import { storeTotal, type PurchasedStore } from '@/data/pabili';
import { formatPeso } from '@/data/services';
import ProductThumb from './ProductThumb.vue';

const props = withDefaults(defineProps<{ store: PurchasedStore; variant?: 'details' | 'invoice' }>(), {
  variant: 'details',
});
const total = computed(() => storeTotal(props.store));
</script>
