<template>
  <header class="mb-4 flex items-start gap-3">
    <button
      type="button"
      aria-label="Go back"
      class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-ink active:bg-slate-50"
      @click="goBack"
    >
      <ArrowLeft class="h-5 w-5" />
    </button>
    <div class="min-w-0 flex-1">
      <h1 class="text-[20px] leading-7 font-bold text-ink">{{ title }}</h1>
      <p class="mt-0.5 text-[13px] leading-[18px] text-body"><slot /></p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useIonRouter } from '@ionic/vue';
import { ArrowLeft } from 'lucide-vue-next';

/** Like layout/PageHeader, but the subtitle is a slot so parts of it can be bold. */
const props = withDefaults(defineProps<{ title: string; fallback?: string }>(), { fallback: '/tabs/bookings' });
const ionRouter = useIonRouter();

function goBack() {
  if (ionRouter.canGoBack()) ionRouter.back();
  else ionRouter.navigate(props.fallback, 'back', 'replace');
}
</script>
