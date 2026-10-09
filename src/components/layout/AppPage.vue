<template>
  <ion-page>
    <ion-content :fullscreen="true" :scroll-y="scrollY">
      <div class="min-h-full bg-page px-4 pb-6 pt-[calc(env(safe-area-inset-top)+16px)]" :class="contentClass">
        <slot />
      </div>
    </ion-content>
    <ion-footer v-if="$slots.footer" class="ion-no-border">
      <div class="border-t border-line bg-white px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <slot name="footer" />
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonFooter, IonPage } from '@ionic/vue';

withDefaults(defineProps<{ contentClass?: string; scrollY?: boolean }>(), {
  contentClass: '',
  scrollY: true,
});
</script>
