<template>
  <div class="flex h-[52px] overflow-hidden rounded-xl border border-line bg-white focus-within:border-primary">
    <button type="button" class="flex items-center gap-1 border-r border-line bg-slate-50 px-3 text-[16px] text-ink">
      {{ code }} <ChevronDown class="h-4 w-4" />
    </button>
    <input
      :id="id"
      v-model="model"
      type="tel"
      inputmode="tel"
      :placeholder="placeholder"
      class="min-w-0 flex-1 bg-transparent px-4 text-[16px] text-ink outline-none placeholder:text-placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';

withDefaults(defineProps<{ code?: string; placeholder?: string; id?: string }>(), {
  code: '+63',
  placeholder: '912 345 6789',
});
const model = defineModel<string>();
</script>
