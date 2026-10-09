<template>
  <section class="card rounded-[10px] px-5 pt-4 pb-6">
    <h2 v-if="title" class="mb-3 text-[18px] leading-7 font-semibold text-ink">{{ title }}</h2>
    <slot name="header" />
    <div class="flex flex-col gap-3">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
/** White form card used by the business profile screens. */
defineProps<{ title?: string }>();
</script>
