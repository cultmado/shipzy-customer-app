<template>
  <div class="flex flex-col gap-2">
    <label
      v-for="opt in options"
      :key="opt"
      class="flex h-10 cursor-pointer items-center gap-4 rounded-lg border px-3.5 text-[16px] text-ink transition-colors"
      :class="isOn(opt) ? 'border-primary bg-primary-light' : 'border-line bg-white'"
    >
      <input type="checkbox" class="peer sr-only" :checked="isOn(opt)" @change="toggle(opt)" />
      <span
        class="flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30"
        :class="isOn(opt) ? 'border-primary bg-primary' : 'border-line bg-white'"
      >
        <Check v-if="isOn(opt)" class="h-3.5 w-3.5 text-white" :stroke-width="3" />
      </span>
      {{ opt }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next';

defineProps<{ options: string[] }>();
const model = defineModel<string[]>({ required: true });

const isOn = (opt: string) => model.value.includes(opt);

function toggle(opt: string) {
  model.value = isOn(opt) ? model.value.filter((o) => o !== opt) : [...model.value, opt];
}
</script>
