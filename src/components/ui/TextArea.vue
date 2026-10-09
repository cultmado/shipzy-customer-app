<template>
  <textarea
    :id="id"
    v-model="model"
    :rows="rows"
    :placeholder="placeholder"
    class="w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-[16px] text-ink outline-none transition-colors placeholder:text-placeholder focus:border-primary"
  />
</template>

<script setup lang="ts">
withDefaults(defineProps<{ placeholder?: string; rows?: number; id?: string }>(), { rows: 4 });
const model = defineModel<string>();
</script>
