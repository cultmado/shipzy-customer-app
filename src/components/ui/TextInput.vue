<template>
  <div
    class="flex h-[52px] items-center gap-3 rounded-xl border bg-white px-4 transition-colors focus-within:border-primary"
    :class="[error ? 'border-danger' : 'border-line', disabled && 'bg-slate-50']"
  >
    <component :is="icon" v-if="icon" class="h-5 w-5 shrink-0 text-muted" />
    <slot name="prefix" />
    <input
      :id="id"
      v-model="model"
      :type="inputType"
      :placeholder="placeholder"
      :inputmode="inputmode"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :readonly="readonly"
      class="h-full min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-placeholder"
    />
    <button
      v-if="type === 'password'"
      type="button"
      class="text-muted"
      :aria-label="reveal ? 'Hide password' : 'Show password'"
      @click="reveal = !reveal"
    >
      <EyeOff v-if="reveal" class="h-5 w-5" />
      <Eye v-else class="h-5 w-5" />
    </button>
    <component :is="trailingIcon" v-if="trailingIcon" class="h-5 w-5 shrink-0 text-ink" />
    <slot name="suffix" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';

const props = withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    icon?: Component;
    trailingIcon?: Component;
    id?: string;
    inputmode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal' | 'url' | 'search';
    autocomplete?: string;
    disabled?: boolean;
    readonly?: boolean;
    error?: boolean;
  }>(),
  { type: 'text' },
);

const model = defineModel<string | number>();
const reveal = ref(false);
const inputType = computed(() => (props.type === 'password' && reveal.value ? 'text' : props.type));
</script>
