<template>
  <div class="flex h-[52px] overflow-hidden rounded-xl border border-line bg-white">
    <button
      type="button"
      aria-label="Decrease quantity"
      class="flex w-[52px] items-center justify-center border-r border-line text-ink active:bg-slate-50 disabled:text-placeholder"
      :disabled="model <= min"
      @click="model = Math.max(min, model - 1)"
    >
      <Minus class="h-4 w-4" :stroke-width="2.5" />
    </button>
    <input
      :id="id"
      v-model.number="model"
      type="number"
      inputmode="numeric"
      :min="min"
      class="min-w-0 flex-1 bg-transparent text-center text-[16px] text-ink outline-none"
    />
    <button
      type="button"
      aria-label="Increase quantity"
      class="flex w-[52px] items-center justify-center border-l border-line text-ink active:bg-slate-50"
      @click="model = model + 1"
    >
      <Plus class="h-4 w-4" :stroke-width="2.5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Minus, Plus } from 'lucide-vue-next';

withDefaults(defineProps<{ min?: number; id?: string }>(), { min: 1 });
const model = defineModel<number>({ default: 1 });
</script>
