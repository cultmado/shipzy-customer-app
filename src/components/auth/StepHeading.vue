<template>
  <div>
    <h2 class="text-[20px] leading-7 font-semibold text-ink">{{ title }}</h2>
    <p class="mt-2 text-[14px] leading-5 text-placeholder">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle: string }>();
</script>
