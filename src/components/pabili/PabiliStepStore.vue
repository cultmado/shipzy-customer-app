<template>
  <div class="flex flex-col gap-6">
    <section class="card px-4 py-5">
      <StepHeader step="3" title="Choose Category" subtitle="Select what type of item you want us to purchase." />
      <div class="-mt-1 grid grid-cols-3 gap-[10px] px-1">
        <button
          v-for="cat in pabiliCategories"
          :key="cat.key"
          type="button"
          class="flex flex-col items-center rounded-xl border px-1 pt-1.5 pb-1.5 transition-colors"
          :class="state.category === cat.key ? 'border-brand bg-[#f2fafc]' : 'border-line bg-white active:bg-slate-50'"
          :aria-pressed="state.category === cat.key"
          @click="state.category = cat.key"
        >
          <img :src="cat.image" :alt="cat.label" class="h-[56px] w-full object-contain" />
          <span class="mt-1 text-[10.5px] leading-4 whitespace-nowrap text-ink">{{ cat.label }}</span>
        </button>
      </div>
    </section>

    <section class="card px-4 py-5">
      <StepHeader step="4" title="Choose Store" subtitle="Select an available store near your delivery address." />
      <div class="mx-1">
        <label class="flex h-[35px] items-center gap-3 rounded-md border border-line bg-white px-3 focus-within:border-primary">
          <Search class="h-[18px] w-[18px] text-muted" :stroke-width="1.75" />
          <input
            v-model="query"
            type="search"
            placeholder="Search store by name.."
            class="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-body/80"
          />
        </label>

        <div class="mt-5 flex flex-col gap-3">
          <StoreRow
            v-for="store in filtered"
            :key="store.id"
            :store="store"
            :selected="state.storeId === store.id"
            @click="state.storeId = store.id"
          />
          <p v-if="!filtered.length" class="py-6 text-center text-[13px] text-muted">No stores match “{{ query }}”.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Search } from 'lucide-vue-next';
import StepHeader from '@/components/ui/StepHeader.vue';
import { pabiliCategories, pabiliStores } from '@/data/pabili';
import StoreRow from './StoreRow.vue';
import { usePabiliForm } from './pabiliForm';

const { state } = usePabiliForm();
const query = ref('');

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return q ? pabiliStores.filter((s) => s.name.toLowerCase().includes(q)) : pabiliStores;
});
</script>
