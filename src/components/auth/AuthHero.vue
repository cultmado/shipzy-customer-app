<template>
  <div>
    <img :src="logo" alt="Shipzy" class="mx-auto h-[62px] w-auto" />
    <h1 class="mt-8 text-[30px] leading-10 font-normal tracking-[-0.02em] text-ink">{{ title }}</h1>
    <p class="mt-2 text-[13px] text-body">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.png';

defineProps<{ title: string; subtitle: string }>();
</script>
