<template>
  <section class="card px-4 py-4">
    <div class="flex items-start gap-4">
      <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#dbe7fd] text-primary">
        <component :is="icon" class="h-[18px] w-[18px]" :stroke-width="1.5" />
      </span>
      <h3 class="flex-1 pt-0.5 text-[16px] leading-6 font-medium text-ink">{{ title }}</h3>
      <button type="button" class="text-[12px] font-semibold text-primary" @click="$emit('edit')">Edit</button>
    </div>
    <dl class="mt-4 flex flex-col gap-2">
      <div v-for="item in items" :key="item.label" :class="item.lines.length > 1 && 'mb-2'">
        <dt class="text-[11px] leading-4 text-placeholder">{{ item.label }}</dt>
        <dd class="mt-1 text-[12px] leading-4 text-ink">
          <span
            v-for="(line, i) in item.lines"
            :key="i"
            class="block"
            :class="i > 0 && 'text-muted'"
          >{{ line || '—' }}</span>
        </dd>
      </div>
    </dl>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

export interface ReviewItem {
  label: string;
  lines: string[];
}

defineProps<{ icon: Component; title: string; items: ReviewItem[] }>();
defineEmits<{ edit: [] }>();
</script>
