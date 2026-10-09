<template>
  <div
    class="inline-flex items-stretch overflow-hidden rounded-md border border-line bg-white text-ink"
    :class="compact ? 'h-[17px]' : 'h-6'"
  >
    <button
      type="button"
      aria-label="Decrease quantity"
      class="flex items-center justify-center active:bg-slate-50"
      :class="compact ? 'w-[17px]' : 'w-6'"
      @click="$emit('update:modelValue', Math.max(min, modelValue - 1))"
    >
      <Minus :class="compact ? 'h-3 w-3' : 'h-4 w-4'" :stroke-width="2" />
    </button>
    <span
      class="flex items-center justify-center border-x border-line font-semibold"
      :class="compact ? 'w-7 text-[13px]' : 'w-[28px] text-[14px]'"
    >{{ modelValue }}</span>
    <button
      type="button"
      aria-label="Increase quantity"
      class="flex items-center justify-center active:bg-slate-50"
      :class="compact ? 'w-[17px]' : 'w-6'"
      @click="$emit('update:modelValue', modelValue + 1)"
    >
      <Plus :class="compact ? 'h-3 w-3' : 'h-4 w-4'" :stroke-width="2" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Minus, Plus } from 'lucide-vue-next';

withDefaults(defineProps<{ modelValue: number; min?: number; compact?: boolean }>(), { min: 0, compact: false });
defineEmits<{ 'update:modelValue': [value: number] }>();
</script>
