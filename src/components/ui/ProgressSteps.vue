<template>
  <ol class="flex items-start">
    <li
      v-for="(label, i) in steps"
      :key="label"
      class="relative flex flex-1 flex-col items-center text-center"
    >
      <span
        v-if="i > 0"
        class="absolute top-[22px] right-1/2 h-[3px] w-full -translate-y-1/2 rounded-full"
        :class="i <= current ? 'bg-primary' : 'bg-line'"
      />
      <span
        class="relative z-10 flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-medium"
        :class="
          i < current
            ? 'bg-primary text-white'
            : i === current
              ? 'bg-primary text-white'
              : 'bg-line text-muted'
        "
      >
        <Check v-if="i < current" class="h-5 w-5" :stroke-width="2.5" />
        <template v-else>{{ i + 1 }}</template>
      </span>
      <span class="mt-2 px-1 text-[12px] leading-4" :class="i <= current ? 'text-primary' : 'text-muted'">{{ label }}</span>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next';
/** current is zero-based */
defineProps<{ steps: string[]; current: number }>();
</script>
