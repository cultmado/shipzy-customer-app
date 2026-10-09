<template>
  <div class="px-5">
    <button
      type="button"
      class="flex h-[38px] w-full items-center justify-center gap-2 rounded-lg bg-brand text-[16px] font-medium text-white transition-colors active:bg-brand-dark disabled:opacity-70"
      :disabled="saving"
      @click="save"
    >
      <Check v-if="saving" class="h-4 w-4" :stroke-width="2.5" />
      {{ saving ? 'Saved' : label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { Check } from 'lucide-vue-next';

/** Footer "Save" button for business profile forms: confirms briefly, then returns to Profile. */
const props = withDefaults(defineProps<{ label?: string; fallback?: string }>(), {
  label: 'Save',
  fallback: '/tabs/profile',
});
const emit = defineEmits<{ save: [] }>();

const ionRouter = useIonRouter();
const saving = ref(false);

function save() {
  emit('save');
  saving.value = true;
  setTimeout(() => {
    saving.value = false;
    if (ionRouter.canGoBack()) ionRouter.back();
    else ionRouter.navigate(props.fallback, 'back', 'replace');
  }, 600);
}
</script>
