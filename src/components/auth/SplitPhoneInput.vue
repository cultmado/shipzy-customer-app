<template>
  <!-- Country code and number as two separate boxes, as in the Register designs. -->
  <div class="flex gap-3">
    <span
      class="flex h-[52px] w-[65px] shrink-0 items-center justify-center rounded-xl border border-line bg-white text-[16px] text-ink"
    >{{ code }}</span>
    <input
      :id="id"
      v-model="model"
      type="tel"
      inputmode="tel"
      autocomplete="tel-national"
      :placeholder="placeholder"
      class="h-[52px] min-w-0 flex-1 rounded-xl border border-line bg-white px-4 text-[16px] text-ink outline-none transition-colors placeholder:text-placeholder focus:border-primary"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ code?: string; placeholder?: string; id?: string }>(), {
  code: '+63',
  placeholder: '912 345 6789',
});
const model = defineModel<string>();
</script>
