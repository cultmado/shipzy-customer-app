<template>
  <div class="px-4 pt-6 pb-6">
    <img :src="logo" alt="Shipzy" class="mx-auto h-[28px] w-auto" />
    <p class="mt-6 text-[12px] font-semibold text-brand uppercase">{{ eyebrow }}</p>
    <p class="mt-2 text-[12px] leading-4 text-body">{{ description }}</p>
    <dl class="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
      <div v-for="m in meta" :key="m.label">
        <dt class="text-[11px] text-muted uppercase">{{ m.label }}</dt>
        <dd class="mt-1 text-[12px] font-semibold text-ink">{{ m.value }}</dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.png';

withDefaults(
  defineProps<{ description: string; meta: { label: string; value: string }[]; eyebrow?: string }>(),
  { eyebrow: 'Official Shipment Invoice' },
);
</script>
