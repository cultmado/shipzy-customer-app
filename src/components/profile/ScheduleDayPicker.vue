<template>
  <div class="flex gap-[7px]" role="group" aria-label="Operating days">
    <button
      v-for="day in days"
      :key="day"
      type="button"
      :aria-pressed="model.includes(day)"
      class="h-[30px] min-w-0 flex-1 rounded-md border text-[13px] transition-colors"
      :class="model.includes(day) ? 'border-brand bg-brand-light text-brand' : 'border-line bg-white text-ink'"
      @click="toggle(day)"
    >
      {{ day }}
    </button>
  </div>
</template>

<script setup lang="ts">
/** Multi-select weekday chips (Mon–Sun). */
const props = defineProps<{ days: readonly string[] }>();
const model = defineModel<string[]>({ required: true });

function toggle(day: string) {
  model.value = model.value.includes(day)
    ? model.value.filter((d) => d !== day)
    : props.days.filter((d) => d === day || model.value.includes(d));
}
</script>
