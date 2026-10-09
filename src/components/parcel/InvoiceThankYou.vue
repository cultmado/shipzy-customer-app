<template>
  <div class="bg-[#eef5fc] px-6 py-5 text-center">
    <p class="flex items-center justify-center gap-2 text-[12.5px] font-semibold text-ink">
      <ShieldCheck class="h-[18px] w-[18px] text-brand" :stroke-width="1.75" />
      Thank you for using Shipzy.
    </p>
    <p class="mt-3 text-[11.5px] leading-4 text-muted">
      For questions about this invoice, please contact Shipzy support and provide your booking reference {{ reference }}.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next';

defineProps<{ reference: string }>();
</script>
