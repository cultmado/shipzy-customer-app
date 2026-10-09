<template>
  <div class="mb-4">
    <h2 class="text-[17px] leading-6 font-semibold text-ink">{{ title }}</h2>
    <p v-if="subtitle" class="mt-1 text-[13px] leading-[18px] text-muted">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>();
</script>
