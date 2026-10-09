<template>
  <div class="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
    <button
      v-for="opt in options"
      :key="opt"
      type="button"
      class="h-[42px] shrink-0 rounded-xl border px-5 text-[14px] font-medium transition-colors"
      :class="model === opt ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink'"
      @click="model = opt"
    >
      {{ opt }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ options: string[] }>();
const model = defineModel<string>();
</script>
