<template>
  <div
    class="relative flex h-[52px] items-center rounded-xl border border-line bg-white transition-colors focus-within:border-primary"
  >
    <component :is="icon" v-if="icon" class="pointer-events-none absolute left-4 h-5 w-5 text-muted" />
    <select
      :id="id"
      v-model="model"
      class="h-full w-full appearance-none bg-transparent pr-11 text-[16px] outline-none"
      :class="[icon ? 'pl-12' : 'pl-4', model ? 'text-ink' : 'text-placeholder']"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in normalized" :key="opt.value" :value="opt.value" class="text-ink">{{ opt.label }}</option>
    </select>
    <ChevronDown class="pointer-events-none absolute right-4 h-5 w-5 text-ink" />
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

type Option = string | { label: string; value: string };

const props = defineProps<{ options: Option[]; placeholder?: string; icon?: Component; id?: string }>();
const model = defineModel<string>({ default: '' });

const normalized = computed(() =>
  props.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o)),
);
</script>
