<template>
  <div class="relative flex items-start gap-2.5 py-2.5">
    <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
      <MapPin class="h-4 w-4" :stroke-width="1.75" />
    </span>
    <div class="min-w-0 flex-1">
      <div class="flex items-center gap-2">
        <span class="text-[13px] leading-5 font-semibold text-ink">{{ address.label }}</span>
        <span
          v-if="address.isDefault"
          class="rounded-md bg-primary-light px-2 py-0.5 text-[10px] leading-[14px] font-semibold text-primary"
        >Default</span>
      </div>
      <p class="mt-0.5 text-[13px] leading-[18px] text-ink">{{ address.address }}</p>
    </div>
    <button
      type="button"
      class="-mr-1 -mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-ink active:bg-slate-100"
      aria-label="Address options"
      @click.stop="menuOpen = !menuOpen"
    >
      <EllipsisVertical class="h-5 w-5" />
    </button>

    <template v-if="menuOpen">
      <div class="fixed inset-0 z-10" @click="menuOpen = false" />
      <div class="absolute right-0 top-9 z-20 w-44 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-lg">
        <button type="button" class="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[14px] font-medium active:bg-slate-50 text-ink" @click="pick('edit')">
          <Pencil class="h-4 w-4 text-muted" /> Edit
        </button>
        <button v-if="!address.isDefault" type="button" class="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[14px] font-medium active:bg-slate-50 text-ink" @click="pick('default')">
          <Star class="h-4 w-4 text-muted" /> Set as default
        </button>
        <button type="button" class="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[14px] font-medium active:bg-slate-50 text-danger" @click="pick('delete')">
          <Trash2 class="h-4 w-4" /> Delete
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EllipsisVertical, MapPin, Pencil, Star, Trash2 } from 'lucide-vue-next';
import type { SavedAddress } from '@/data/profile-account';

defineProps<{ address: SavedAddress }>();
const emit = defineEmits<{ edit: []; default: []; delete: [] }>();

const menuOpen = ref(false);

function pick(action: 'edit' | 'default' | 'delete') {
  menuOpen.value = false;
  if (action === 'edit') emit('edit');
  else if (action === 'default') emit('default');
  else emit('delete');
}
</script>

