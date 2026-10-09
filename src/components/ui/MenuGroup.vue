<template>
  <section class="mb-6">
    <h2 v-if="title" class="mb-3 px-4 text-[15px] tracking-wide text-body">{{ title }}</h2>
    <div class="card overflow-hidden px-4">
      <router-link
        v-for="(item, i) in items"
        :key="item.to"
        :to="item.to"
        class="flex h-[55px] items-center justify-between text-[17px] tracking-wide text-ink active:opacity-60"
        :class="i > 0 && 'border-t border-line'"
      >
        <span class="flex items-center gap-3">
          <component :is="item.icon" v-if="item.icon" class="h-5 w-5 text-muted" />
          {{ item.label }}
        </span>
        <ChevronRight class="h-5 w-5 text-ink" />
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { ChevronRight } from 'lucide-vue-next';

defineProps<{ title?: string; items: { label: string; to: string; icon?: Component }[] }>();
</script>
