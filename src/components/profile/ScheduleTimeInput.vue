<template>
  <label
    class="relative flex h-[52px] cursor-pointer items-center rounded-xl border border-line bg-white px-4 transition-colors focus-within:border-primary"
  >
    <span class="flex-1 text-[16px]" :class="model ? 'text-ink' : 'text-placeholder'">{{ display || placeholder }}</span>
    <Clock class="h-5 w-5 text-ink" />
    <input
      :id="id"
      ref="input"
      v-model="model"
      type="time"
      class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      @click="openPicker"
    />
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Clock } from 'lucide-vue-next';

/** Time field showing "08:00 AM" with a clock icon; opens the native time picker. Model is 24h "HH:mm". */
withDefaults(defineProps<{ id?: string; placeholder?: string }>(), { placeholder: '--:-- --' });
const model = defineModel<string>({ default: '' });
const input = ref<HTMLInputElement>();

const display = computed(() => {
  if (!model.value) return '';
  const [h, m] = model.value.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${suffix}`;
});

function openPicker() {
  try {
    input.value?.showPicker?.();
  } catch {
    /* showPicker unsupported or not allowed: native focus still works */
  }
}
</script>
