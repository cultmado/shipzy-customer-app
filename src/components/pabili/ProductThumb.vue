<template>
  <span
    class="flex shrink-0 items-center justify-center rounded-md border border-[#8fb0c2] bg-white"
    :class="size === 'sm' ? 'h-[25px] w-[25px]' : 'h-[30px] w-[30px]'"
  >
    <img :src="logo" alt="" class="w-[80%]" />
  </span>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.png';

withDefaults(defineProps<{ size?: 'sm' | 'md' }>(), { size: 'md' });
</script>
