<template>
  <ul class="flex flex-col gap-3">
    <li v-for="(file, i) in files" :key="i" class="flex items-center gap-3 rounded-lg border border-line bg-white p-2">
      <span class="flex h-[33px] w-[33px] items-center justify-center rounded-md bg-brand-light text-brand">
        <ImageIcon class="h-5 w-5" :stroke-width="1.5" />
      </span>
      <div class="min-w-0 flex-1 pl-1">
        <p class="truncate text-[12px] font-medium text-ink">{{ file.name }}</p>
        <p class="text-[9px] text-muted">{{ file.size }}</p>
      </div>
      <button type="button" class="p-2 text-brand" :aria-label="`View ${file.name}`" @click="$emit('view', file)">
        <Eye class="h-[18px] w-[18px]" :stroke-width="1.75" />
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Eye, Image as ImageIcon } from 'lucide-vue-next';
import type { Attachment } from '@/data/parcel';

defineProps<{ files: Attachment[] }>();
defineEmits<{ view: [file: Attachment] }>();
</script>
