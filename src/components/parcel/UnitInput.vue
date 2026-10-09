<template>
  <div class="flex h-[52px] overflow-hidden rounded-xl border border-line bg-white focus-within:border-primary">
    <input
      :id="id"
      v-model.number="model"
      type="number"
      inputmode="decimal"
      min="0"
      class="min-w-0 flex-1 bg-transparent px-4 text-[16px] text-ink outline-none"
    />
    <span class="flex w-[52px] items-center justify-center border-l border-line bg-slate-50 text-[16px] text-body">{{ unit }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ unit?: string; id?: string }>(), { unit: 'cm' });
const model = defineModel<number>({ default: 0 });
</script>
