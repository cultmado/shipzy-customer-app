<template>
  <label
    class="flex h-[52px] cursor-pointer items-center gap-3 rounded-xl border border-line bg-white px-4 transition-colors focus-within:border-primary"
  >
    <input
      :id="id"
      ref="input"
      v-model="model"
      type="time"
      class="time-input h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none"
      :class="model ? 'text-ink' : 'text-placeholder'"
    />
    <button type="button" aria-label="Pick a time" class="text-ink" @click="openPicker">
      <Clock class="h-6 w-6" :stroke-width="1.5" />
    </button>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Clock } from 'lucide-vue-next';

defineProps<{ id?: string }>();
const model = defineModel<string>({ default: '' });
const input = ref<HTMLInputElement>();

function openPicker() {
  const el = input.value;
  if (!el) return;
  el.focus();
  try {
    el.showPicker?.();
  } catch {
    /* showPicker unsupported or blocked */
  }
}
</script>

<style scoped>
.time-input::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
