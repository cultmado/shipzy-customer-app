<template>
  <div class="rounded-xl border border-[#bfdce8] bg-[#f2f8fc] p-3">
    <div class="flex items-start gap-4">
      <span class="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-lg bg-white text-brand">
        <MapPin class="h-[18px] w-[18px]" :stroke-width="2" />
      </span>
      <div class="min-w-0 flex-1">
        <p class="text-[14px] leading-5 font-semibold text-brand">{{ label }}</p>
        <p class="text-[14px] leading-5 font-semibold text-ink">{{ hub.name }}</p>
        <p class="mt-0.5 text-[11.5px] leading-4 text-muted">{{ hub.address }}</p>
      </div>
    </div>
    <button type="button" class="mx-auto mt-2 block text-[14px] font-semibold text-brand" @click="$emit('change')">
      Change Hub
    </button>
  </div>
</template>

<script setup lang="ts">
import { MapPin } from 'lucide-vue-next';
import type { Hub } from '@/data/parcel';

withDefaults(defineProps<{ hub: Hub; label?: string }>(), { label: 'Selected drop-off hub' });
defineEmits<{ change: [] }>();
</script>
