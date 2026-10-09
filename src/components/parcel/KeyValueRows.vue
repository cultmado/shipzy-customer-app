<template>
  <dl class="flex flex-col gap-3.5 text-[11px]">
    <div v-for="row in rows" :key="row.label" class="flex items-center justify-between gap-4">
      <dt class="text-body">{{ row.label }}</dt>
      <dd v-if="row.badge" class="rounded-full px-2.5 py-0.5 text-[10px] font-semibold" :class="badgeTones[row.badge]">
        {{ row.value }}
      </dd>
      <dd v-else class="text-right font-semibold text-ink">{{ row.value }}</dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import type { BadgeTone } from '@/components/ui/StatusBadge.vue';

export interface KeyValueRow {
  label: string;
  value: string;
  /** Render the value as a pill with this tone */
  badge?: BadgeTone;
}

defineProps<{ rows: KeyValueRow[] }>();

const badgeTones: Record<BadgeTone, string> = {
  blue: 'bg-primary-light text-primary',
  green: 'bg-[#d1ecdc] text-success',
  orange: 'bg-warning-light text-warning',
  red: 'bg-danger-light text-danger',
  gray: 'bg-slate-100 text-muted',
  violet: 'bg-violet-light text-violet',
  teal: 'bg-brand-light text-brand',
};
</script>
