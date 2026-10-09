<template>
  <div class="flex flex-col gap-6">
    <section class="card px-4 pt-5 pb-4">
      <h2 class="text-[16px] font-semibold text-ink">Selected Store</h2>
      <p class="mt-1 text-[12px] text-body/80">Your selected store for this order.</p>
      <div class="mx-1 mt-3">
        <StoreRow :store="selectedStore" :selectable="false" plain />
      </div>
      <button type="button" class="mt-3 w-full text-center text-[14px] font-semibold text-brand" @click="$emit('change-store')">
        Change Store
      </button>
    </section>

    <section class="card px-4 py-5">
      <StepHeader step="5" title="Select Products" subtitle="Search products and add them to your cart." />
      <div class="mx-1">
        <label class="flex h-[35px] items-center gap-3 rounded-md border border-line bg-white px-3 focus-within:border-primary">
          <Search class="h-[18px] w-[18px] text-muted" :stroke-width="1.75" />
          <input
            v-model="query"
            type="search"
            placeholder="Search products by name or category.."
            class="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-body/80"
          />
        </label>

        <div class="mt-5 flex flex-col gap-3">
          <div
            v-for="p in products"
            :key="p.id"
            class="flex items-center gap-5 rounded-xl border border-line bg-white px-3 py-3.5"
          >
            <ProductThumb />
            <div class="min-w-0 flex-1">
              <p class="truncate text-[15px] font-semibold text-ink">{{ p.name }}</p>
              <p class="mt-1 text-[13px] font-semibold text-brand">{{ formatPeso(p.price) }}</p>
            </div>
            <QtyStepper
              v-if="qty(selectedStore.id, p.id) > 0"
              :model-value="qty(selectedStore.id, p.id)"
              @update:model-value="setQty(selectedStore.id, p.id, $event)"
            />
            <button
              v-else
              type="button"
              class="flex h-[25px] items-center gap-1 rounded-md bg-brand px-2 text-[15px] font-medium text-white active:bg-brand-dark"
              @click="setQty(selectedStore.id, p.id, 1)"
            >
              <Plus class="h-4 w-4" :stroke-width="2.25" />Add
            </button>
          </div>
          <p v-if="!products.length" class="py-6 text-center text-[13px] text-muted">No products match “{{ query }}”.</p>
        </div>
      </div>
    </section>

    <div class="flex gap-3 rounded-lg border border-blue-100 bg-[#eff8ff] px-3 py-3">
      <Info class="mt-0.5 h-4 w-4 shrink-0 text-brand" :stroke-width="1.75" />
      <p class="text-[12px] leading-4 text-body">
        You can add products from multiple stores in a single booking. The total value of all items across all stores
        must not exceed {{ formatPeso(PABILI_MAX_ITEMS_VALUE).replace('.00', '') }}.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Info, Plus, Search } from 'lucide-vue-next';
import StepHeader from '@/components/ui/StepHeader.vue';
import { PABILI_MAX_ITEMS_VALUE } from '@/data/pabili';
import { formatPeso } from '@/data/services';
import ProductThumb from './ProductThumb.vue';
import QtyStepper from './QtyStepper.vue';
import StoreRow from './StoreRow.vue';
import { usePabiliForm } from './pabiliForm';

defineEmits<{ 'change-store': [] }>();

const { selectedStore, qty, setQty } = usePabiliForm();
const query = ref('');

const products = computed(() => {
  const q = query.value.trim().toLowerCase();
  const list = selectedStore.value.products;
  return q ? list.filter((p) => p.name.toLowerCase().includes(q)) : list;
});
</script>
