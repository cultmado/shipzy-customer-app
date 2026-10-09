<template>
  <button
    type="button"
    class="flex w-full items-start gap-3 rounded-xl border bg-white px-3 py-3 text-left transition-colors active:bg-slate-50"
    :class="modelValue ? (danger ? 'border-danger/40' : 'border-brand/40') : 'border-line'"
    @click="$emit('update:modelValue', place)"
  >
    <span
      class="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-lg"
      :class="danger ? 'bg-danger-light text-danger' : 'bg-brand-light text-brand'"
    >
      <MapPin class="h-[18px] w-[18px]" :stroke-width="1.5" />
    </span>
    <span class="min-w-0 flex-1 pt-px">
      <span class="block text-[14px] font-semibold text-ink">{{ modelValue || 'Choose on Google Map' }}</span>
      <span class="mt-1 block max-w-[220px] text-[12px] leading-[16px] text-muted">
        <template v-if="modelValue">Pinned location · tap to change</template>
        <template v-else>Search an address, use your location, or place the pin on the map.</template>
      </span>
    </span>
    <span class="flex items-center gap-1.5 text-[11px] font-semibold" :class="danger ? 'text-danger' : 'text-brand'">
      {{ modelValue ? 'Change' : 'Select' }} <ChevronRight class="h-3.5 w-3.5" :stroke-width="2.5" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ChevronRight, MapPin } from 'lucide-vue-next';

defineProps<{ modelValue: string; place: string; danger?: boolean }>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>
