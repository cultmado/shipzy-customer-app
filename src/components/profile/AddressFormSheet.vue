<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-[1000] bg-slate-900/40" @click="emit('close')" />
    </Transition>
    <Transition
      enter-active-class="transition-transform duration-250 ease-out"
      leave-active-class="transition-transform duration-200 ease-in"
      enter-from-class="translate-y-full"
      leave-to-class="translate-y-full"
    >
      <form
        v-if="open"
        class="fixed inset-x-0 bottom-0 z-[1001] max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+16px)] font-sans text-ink"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        @submit.prevent="submit"
      >
        <span class="mx-auto block h-1 w-10 rounded-full bg-slate-200" />
        <div class="mt-3 flex items-start justify-between gap-3">
          <div>
            <h2 class="text-[18px] font-bold text-ink">{{ title }}</h2>
            <p class="mt-0.5 text-[13px] text-body">Save this address for faster bookings.</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line text-ink"
            @click="emit('close')"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <div class="mt-5 flex flex-col gap-5">
          <FormField label="Label" required>
            <div class="flex gap-2">
              <button
                v-for="opt in addressLabels"
                :key="opt"
                type="button"
                class="h-10 flex-1 rounded-xl border text-[14px] font-medium transition-colors"
                :class="kind === opt ? 'border-primary bg-primary-light text-primary' : 'border-line bg-white text-ink'"
                @click="kind = opt"
              >
                {{ opt }}
              </button>
            </div>
          </FormField>

          <FormField v-if="kind === 'Other'" label="Label Name" required for-id="addr-custom-label">
            <TextInput id="addr-custom-label" v-model="customLabel" placeholder="e.g. Mom’s House" :icon="Tag" />
          </FormField>

          <FormField label="Complete Address" required for-id="addr-text" :error="error">
            <TextArea
              id="addr-text"
              v-model="text"
              :rows="3"
              placeholder="House/Unit No., Street, Barangay, City, Province, ZIP"
            />
          </FormField>

          <CheckBox v-model="isDefault">Set as default address</CheckBox>
        </div>

        <div class="mt-6 flex gap-3">
          <AppButton variant="outline" class="flex-1" @click="emit('close')">Cancel</AppButton>
          <AppButton variant="brand" type="submit" class="flex-1">Save Address</AppButton>
        </div>
      </form>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Tag, X } from 'lucide-vue-next';
import AppButton from '@/components/ui/AppButton.vue';
import CheckBox from '@/components/ui/CheckBox.vue';
import FormField from '@/components/ui/FormField.vue';
import TextArea from '@/components/ui/TextArea.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { addressLabels, type SavedAddress } from '@/data/profile-account';

const props = defineProps<{ open: boolean; address?: SavedAddress | null }>();
const emit = defineEmits<{ close: []; save: [value: Omit<SavedAddress, 'id'>] }>();

const kind = ref('Home');
const customLabel = ref('');
const text = ref('');
const isDefault = ref(false);
const error = ref('');

const title = computed(() => (props.address ? 'Edit Address' : 'Add New Address'));

watch(
  () => props.open,
  (open) => {
    if (!open) return;
    const a = props.address;
    const preset = a && addressLabels.includes(a.label) ? a.label : a ? 'Other' : 'Home';
    kind.value = preset;
    customLabel.value = a && preset === 'Other' ? a.label : '';
    text.value = a?.address ?? '';
    isDefault.value = a?.isDefault ?? false;
    error.value = '';
  },
  { immediate: true },
);

function submit() {
  if (!text.value.trim()) {
    error.value = 'Please enter the complete address.';
    return;
  }
  const label = kind.value === 'Other' ? customLabel.value.trim() || 'Other' : kind.value;
  emit('save', { label, address: text.value.trim(), isDefault: isDefault.value });
}
</script>
