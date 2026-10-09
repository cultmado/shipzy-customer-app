<template>
  <section class="card px-5 pt-4 pb-5">
    <div class="-ml-1 mb-3 flex items-start gap-3">
      <span
        class="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-brand text-[15px] font-medium text-white"
      >{{ step }}</span>
      <div class="pt-1">
        <h2 class="text-[15px] font-semibold text-ink">
          {{ title }}<span v-if="hint" class="text-[13px] font-normal">{{ ` ${hint}` }}</span>
        </h2>
        <p v-if="subtitle" class="mt-1 max-w-[220px] text-[12px] leading-[16px] text-muted">{{ subtitle }}</p>
      </div>
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{ step: number; title: string; subtitle?: string; hint?: string }>();
</script>
