<template>
  <div class="relative" @click.stop>
    <button
      type="button"
      aria-label="More options"
      class="-mr-1.5 flex h-8 w-8 items-center justify-center rounded-lg text-body active:bg-slate-100"
      @click.prevent="open = !open"
    >
      <EllipsisVertical class="h-5 w-5" />
    </button>
    <div v-if="open" class="fixed inset-0 z-20" @click.prevent="open = false" />
    <div
      v-if="open"
      class="absolute top-8 right-0 z-30 min-w-[168px] overflow-hidden rounded-xl border border-line bg-white py-1 shadow-lg"
    >
      <button
        v-for="item in items"
        :key="item.label"
        type="button"
        class="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[14px] active:bg-slate-50"
        :class="item.danger ? 'text-danger' : 'text-ink'"
        @click.prevent="select(item)"
      >
        <component :is="item.icon" v-if="item.icon" class="h-4 w-4" />
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Component } from 'vue';
import { EllipsisVertical } from 'lucide-vue-next';

export interface KebabItem {
  label: string;
  icon?: Component;
  danger?: boolean;
  action: () => void;
}

defineProps<{ items: KebabItem[] }>();

const open = ref(false);

function select(item: KebabItem) {
  open.value = false;
  item.action();
}
</script>
