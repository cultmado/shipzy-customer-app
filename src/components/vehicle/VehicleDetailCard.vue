<template>
  <section class="card px-4 pt-4 pb-5">
    <div class="mb-4 flex items-start gap-3">
      <div class="min-w-0 flex-1">
        <h2 class="text-[16px] font-semibold text-ink">{{ title }}</h2>
        <p v-if="subtitle" class="mt-1.5 text-[12px] text-muted">{{ subtitle }}</p>
      </div>
      <slot name="actions" />
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>();
</script>
