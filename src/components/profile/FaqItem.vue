<template>
  <div class="border-b border-line last:border-b-0">
    <button
      type="button"
      class="flex w-full items-center gap-3 py-1.5 text-left"
      :aria-expanded="open"
      @click="emit('toggle')"
    >
      <span class="flex-1 text-[14px] leading-5 font-semibold text-ink">{{ question }}</span>
      <ChevronDown class="h-5 w-5 shrink-0 text-ink transition-transform duration-200" :class="open && 'rotate-180'" />
    </button>
    <div class="grid transition-[grid-template-rows] duration-200" :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
      <div class="overflow-hidden">
        <p class="pb-3 text-[13px] leading-5 text-body">{{ answer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';

defineProps<{ question: string; answer: string; open: boolean }>();
const emit = defineEmits<{ toggle: [] }>();
</script>
