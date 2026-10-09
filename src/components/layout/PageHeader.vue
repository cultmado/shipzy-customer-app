<template>
  <header class="mb-4 flex items-start gap-3">
    <button
      v-if="back"
      type="button"
      aria-label="Go back"
      class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-ink active:bg-slate-50"
      @click="goBack"
    >
      <ArrowLeft class="h-5 w-5" />
    </button>
    <div class="min-w-0 flex-1">
      <h1 class="text-[20px] leading-7 font-bold text-ink">{{ title }}</h1>
      <p v-if="subtitle" class="mt-0.5 text-[13px] leading-[18px] text-body">{{ subtitle }}</p>
    </div>
    <slot name="actions" />
  </header>
</template>

<script setup lang="ts">
import { useIonRouter } from '@ionic/vue';
import { ArrowLeft } from 'lucide-vue-next';

const props = withDefaults(
  defineProps<{ title: string; subtitle?: string; back?: boolean; fallback?: string }>(),
  { back: false, fallback: '/tabs/home' },
);

const ionRouter = useIonRouter();

function goBack() {
  if (ionRouter.canGoBack()) ionRouter.back();
  else ionRouter.navigate(props.fallback, 'back', 'replace');
}
</script>
