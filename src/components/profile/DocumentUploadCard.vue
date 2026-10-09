<template>
  <section class="card rounded-[10px] p-3">
    <h2 class="text-[16px] leading-6 font-semibold text-ink">{{ title }}</h2>
    <p class="mt-1.5 text-[12px] leading-[18px] text-muted">{{ description }}</p>

    <div v-if="file || uploading" class="mt-3 flex items-center gap-3 rounded bg-slate-50 px-2 py-2">
      <span class="flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-sm bg-primary-light text-primary">
        <File class="h-5 w-5" :stroke-width="1.75" />
      </span>
      <span class="min-w-0 flex-1 pl-1">
        <span class="block truncate text-[15px] leading-5 text-ink">{{ uploading?.name ?? file?.name }}</span>
        <span v-if="uploading" class="mt-1.5 block h-1 overflow-hidden rounded-full bg-line">
          <span class="block h-full animate-pulse rounded-full bg-primary transition-[width] duration-500" :style="{ width: `${uploading.progress}%` }" />
        </span>
        <span v-else class="block text-[12px] leading-4 text-muted">{{ file?.size }}</span>
      </span>
    </div>

    <p v-if="error" class="mt-2 text-[12px] text-danger">{{ error }}</p>

    <input
      ref="picker"
      type="file"
      class="hidden"
      :accept="acceptedDocumentTypes"
      @change="onPick"
    />

    <div class="flex justify-end gap-2" :class="file || uploading ? 'mt-3' : 'mt-7'">
      <template v-if="file">
        <button type="button" :class="[btn, 'border border-primary bg-white text-primary active:bg-primary-light']" @click="download">
          <CloudDownload class="h-4 w-4" :stroke-width="1.75" /> Download
        </button>
        <button type="button" :class="[btn, 'bg-primary text-white active:bg-primary-dark']" @click="pick">
          <CloudUpload class="h-4 w-4" :stroke-width="1.75" /> Replace File
        </button>
        <button type="button" :class="[btn, 'border border-danger bg-white text-danger active:bg-danger-light']" @click="remove">
          <Trash2 class="h-4 w-4" :stroke-width="1.75" /> Remove
        </button>
      </template>
      <button
        v-else
        type="button"
        :disabled="!!uploading"
        :class="[btn, 'bg-primary text-white active:bg-primary-dark disabled:opacity-60']"
        @click="pick"
      >
        <CloudUpload class="h-4 w-4" :stroke-width="1.75" /> Upload File
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { CloudDownload, CloudUpload, File, Trash2 } from 'lucide-vue-next';
import {
  acceptedDocumentTypes,
  formatFileSize,
  maxDocumentBytes,
  type VerificationFile,
} from '@/data/business';

/** Verification document card: shows the uploaded file (download / replace / remove) or an upload button. */
defineProps<{ title: string; description: string }>();
const file = defineModel<VerificationFile | null>('file', { default: null });

const btn =
  'inline-flex h-8 items-center justify-center gap-1.5 rounded-md px-2.5 text-[13px] whitespace-nowrap transition-colors';

const picker = ref<HTMLInputElement>();
const error = ref('');
const uploading = ref<{ name: string; progress: number } | null>(null);
let timer: ReturnType<typeof setTimeout> | undefined;

function pick() {
  error.value = '';
  picker.value?.click();
}

function onPick(e: Event) {
  const input = e.target as HTMLInputElement;
  const picked = input.files?.[0];
  input.value = '';
  if (!picked) return;

  if (!/\.(pdf|jpe?g|png)$/i.test(picked.name)) {
    error.value = 'Unsupported format. Please upload a PDF, JPG, JPEG, or PNG file.';
    return;
  }
  if (picked.size > maxDocumentBytes) {
    error.value = 'File is too large. Maximum size is 5 MB.';
    return;
  }

  // No backend: simulate a short upload, then keep the file locally.
  uploading.value = { name: picked.name, progress: 15 };
  timer = setTimeout(() => {
    if (uploading.value) uploading.value.progress = 100;
    timer = setTimeout(() => {
      revoke();
      file.value = { name: picked.name, size: formatFileSize(picked.size), url: URL.createObjectURL(picked) };
      uploading.value = null;
    }, 400);
  }, 300);
}

function download() {
  if (!file.value) return;
  const url = file.value.url ?? URL.createObjectURL(new Blob([`Sample document: ${file.value.name}`], { type: 'text/plain' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = file.value.name;
  a.click();
  if (!file.value.url) setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function remove() {
  revoke();
  error.value = '';
  file.value = null;
}

function revoke() {
  if (file.value?.url) URL.revokeObjectURL(file.value.url);
}

onBeforeUnmount(() => clearTimeout(timer));
</script>
