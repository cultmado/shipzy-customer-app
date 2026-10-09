<template>
  <label class="flex cursor-pointer items-start gap-3 text-[15px] text-body">
    <input v-model="model" type="checkbox" class="peer sr-only" />
    <span
      class="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-slate-400 bg-white peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30"
    >
      <Check v-if="model" class="h-3.5 w-3.5 text-white" :stroke-width="3" />
    </span>
    <span><slot /></span>
  </label>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next';
const model = defineModel<boolean>({ default: false });
</script>
