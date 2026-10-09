<template>
  <SectionCard>
    <StepHeader
      step="5"
      title="Notes & Attachments"
      subtitle="Add handling instructions or supporting images and documents."
      class="-ml-1"
    />

    <div class="flex flex-col gap-6">
      <FormField label="Notes" for-id="parcel-notes">
        <div class="relative">
          <textarea
            id="parcel-notes"
            v-model="model.notes"
            rows="5"
            :maxlength="maxNotes"
            placeholder="Add any special instructions for handling your shipment."
            class="h-[140px] w-full resize-none rounded-xl border border-line bg-white px-4 pt-3 pb-7 text-[14px] leading-5 text-ink outline-none transition-colors placeholder:text-placeholder focus:border-primary"
          />
          <span class="pointer-events-none absolute right-3 bottom-2.5 text-[11px] text-muted">
            {{ model.notes.length }}/{{ maxNotes }}
          </span>
        </div>
      </FormField>

      <FormField label="Attachments">
        <div
          class="flex h-[140px] flex-col items-center justify-center rounded-xl border-[1.5px] border-dashed bg-white transition-colors"
          :class="dragging ? 'border-brand bg-[#f2f8fc]' : 'border-slate-400'"
          @dragover.prevent="dragging = true"
          @dragleave="dragging = false"
          @drop.prevent="onDrop"
        >
          <CloudUpload class="h-6 w-6 text-brand" :stroke-width="1.75" />
          <p class="mt-2 text-[13px] font-semibold text-ink">Input files here</p>
          <button
            type="button"
            class="mt-2 h-[29px] rounded-md border border-brand px-3 text-[13px] text-brand active:bg-brand-light disabled:opacity-50"
            :disabled="model.attachments.length >= maxFiles"
            @click="fileInput?.click()"
          >
            Browse Files
          </button>
          <input
            ref="fileInput"
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.heic,.heif,image/*"
            multiple
            class="hidden"
            @change="onPick"
          />
        </div>
        <div class="text-[11px] leading-[18px] text-muted">
          <p>Accepted: JPG, JPEG, PNG, WEBP, HEIC, HEIF.</p>
          <p>Maximum of {{ maxFiles }} images only · Max 5MB per image.</p>
        </div>
        <p v-if="error" class="text-[11px] text-danger">{{ error }}</p>
        <span class="w-fit rounded-full bg-brand-light px-2 py-0.5 text-[10px] font-medium text-brand">
          {{ model.attachments.length }}/{{ maxFiles }} images
        </span>
        <div v-if="model.attachments.length" class="flex flex-wrap gap-2.5">
          <div
            v-for="(file, i) in model.attachments"
            :key="file.id"
            class="relative h-[67px] w-[79px] overflow-hidden rounded-lg bg-[#d9d9d9]"
          >
            <img v-if="file.url" :src="file.url" :alt="file.name" class="h-full w-full object-cover" />
            <button
              type="button"
              :aria-label="`Remove ${file.name}`"
              class="absolute top-1 right-1 flex h-[13px] w-[13px] items-center justify-center rounded-full bg-danger text-white"
              @click="remove(i)"
            >
              <Trash2 class="h-[8px] w-[8px]" :stroke-width="2.5" />
            </button>
          </div>
        </div>
      </FormField>
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CloudUpload, Trash2 } from 'lucide-vue-next';
import StepHeader from '@/components/ui/StepHeader.vue';
import FormField from '@/components/ui/FormField.vue';
import SectionCard from './SectionCard.vue';

export interface AttachmentItem {
  id: number;
  name: string;
  url?: string;
}

export interface NotesForm {
  notes: string;
  attachments: AttachmentItem[];
}

const model = defineModel<NotesForm>({ required: true });

const maxNotes = 500;
const maxFiles = 3;
const maxBytes = 5 * 1024 * 1024;
const fileInput = ref<HTMLInputElement>();
const dragging = ref(false);
const error = ref('');
let nextId = Date.now();

function addFiles(files: FileList | null) {
  error.value = '';
  if (!files) return;
  for (const f of Array.from(files)) {
    if (model.value.attachments.length >= maxFiles) {
      error.value = `You can attach up to ${maxFiles} images only.`;
      break;
    }
    if (!f.type.startsWith('image/') && !/\.(heic|heif)$/i.test(f.name)) {
      error.value = `${f.name} is not a supported image.`;
      continue;
    }
    if (f.size > maxBytes) {
      error.value = `${f.name} is larger than 5MB.`;
      continue;
    }
    model.value.attachments.push({ id: nextId++, name: f.name, url: URL.createObjectURL(f) });
  }
}

function onPick(e: Event) {
  const input = e.target as HTMLInputElement;
  addFiles(input.files);
  input.value = '';
}

function onDrop(e: DragEvent) {
  dragging.value = false;
  addFiles(e.dataTransfer?.files ?? null);
}

function remove(i: number) {
  const [f] = model.value.attachments.splice(i, 1);
  if (f?.url) URL.revokeObjectURL(f.url);
}
</script>
