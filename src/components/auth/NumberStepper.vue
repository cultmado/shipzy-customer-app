<template>
  <ol class="flex items-center" aria-label="Registration progress">
    <template v-for="n in total" :key="n">
      <li
        v-if="n > 1"
        aria-hidden="true"
        class="mx-2 h-[3px] flex-1 rounded-full bg-line"
      />
      <li
        class="flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full text-[15px]"
        :class="n - 1 <= current ? 'bg-primary text-white' : 'bg-[#dde4ef] text-muted'"
        :aria-current="n - 1 === current ? 'step' : undefined"
      >
        {{ n }}
      </li>
    </template>
  </ol>
</template>

<script setup lang="ts">
/** current is zero-based */
defineProps<{ total: number; current: number }>();
</script>
