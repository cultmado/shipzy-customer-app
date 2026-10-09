<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="flex h-full items-center justify-center bg-page">
        <img :src="logo" alt="Shipzy" class="h-[62px] w-auto animate-pulse" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { IonContent, IonPage, useIonRouter } from '@ionic/vue';
import logo from '@/assets/images/logo.png';

const ionRouter = useIonRouter();

onMounted(() => {
  setTimeout(() => ionRouter.navigate('/login', 'root', 'replace'), 1200);
});
</script>
