<template>
  <div class="flex h-[52px] overflow-hidden rounded-xl border border-line bg-white transition-colors focus-within:border-primary">
    <span class="flex items-center border-r border-line bg-slate-50 px-3 text-[16px] text-ink">{{ code }}</span>
    <input
      :id="id"
      v-model="model"
      type="tel"
      inputmode="tel"
      autocomplete="tel-national"
      :placeholder="placeholder"
      class="min-w-0 flex-1 bg-transparent px-3 text-[16px] text-ink outline-none placeholder:text-placeholder"
    />
  </div>
</template>

<script setup lang="ts">
// Phone field with a fixed country code (no dropdown), as in the profile designs.
withDefaults(defineProps<{ code?: string; placeholder?: string; id?: string }>(), {
  code: '+63',
  placeholder: '912 345 6789',
});
const model = defineModel<string>();
</script>
