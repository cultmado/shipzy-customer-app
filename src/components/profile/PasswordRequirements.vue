<template>
  <div class="rounded-2xl bg-slate-50 px-3 py-4">
    <h3 class="text-[15px] font-semibold text-ink">Password requirements</h3>
    <ul class="mt-3 flex flex-col gap-2.5">
      <li
        v-for="rule in rules"
        :key="rule.label"
        class="flex items-center gap-2.5 text-[14px]"
        :class="rule.met ? 'text-success' : 'text-muted'"
      >
        <span
          class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
          :class="rule.met ? 'bg-success-light' : 'bg-slate-200'"
        >
          <Check class="h-3.5 w-3.5" :class="rule.met ? 'text-success' : 'text-slate-500'" :stroke-width="2.25" />
        </span>
        {{ rule.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Check } from 'lucide-vue-next';

const props = defineProps<{ password: string }>();

const rules = computed(() => [
  { label: 'Minimum of 8 characters', met: props.password.length >= 8 },
  { label: 'One uppercase letter', met: /[A-Z]/.test(props.password) },
  { label: 'One lowercase letter', met: /[a-z]/.test(props.password) },
  { label: 'One number', met: /\d/.test(props.password) },
  { label: 'One special character', met: /[^A-Za-z0-9]/.test(props.password) },
]);
</script>
