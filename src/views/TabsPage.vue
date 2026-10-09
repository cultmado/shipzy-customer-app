<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom" class="shipzy-tabbar">
        <ion-tab-button v-for="tab in tabs" :key="tab.tab" :tab="tab.tab" :href="`/tabs/${tab.tab}`">
          <template v-if="tab.tab === 'book'">
            <span class="book-fab">
              <Box class="h-7 w-7" :stroke-width="1.75" />
              <span class="text-[13px] font-medium">Book</span>
            </span>
          </template>
          <template v-else>
            <component :is="tab.icon" class="tab-icon h-6 w-6" :stroke-width="1.75" />
            <span class="mt-1 text-[12px] font-medium">{{ tab.label }}</span>
          </template>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/vue';
import { Bell, Box, ClipboardList, House, User } from 'lucide-vue-next';

const tabs = [
  { tab: 'home', label: 'Home', icon: House },
  { tab: 'bookings', label: 'Bookings', icon: ClipboardList },
  { tab: 'book', label: 'Book', icon: Box },
  { tab: 'notifications', label: 'Notifications', icon: Bell },
  { tab: 'profile', label: 'Profile', icon: User },
];
</script>

<style scoped>
.shipzy-tabbar {
  --background: #ffffff;
  --border: 0;
  --color: #334155;
  --color-selected: #085d85;
  height: calc(64px + env(safe-area-inset-bottom));
  overflow: visible;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0 -4px 16px rgb(15 23 42 / 0.06);
  contain: none;
}

.shipzy-tabbar ion-tab-button {
  --ripple-color: transparent;
  overflow: visible;
}

.shipzy-tabbar ion-tab-button::part(native) {
  overflow: visible;
}

.shipzy-tabbar ion-tab-button.tab-selected .tab-icon {
  fill: currentColor;
}

.book-fab {
  margin-top: -28px;
  display: flex;
  height: 70px;
  width: 70px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 9999px;
  background: #085d85;
  color: #ffffff;
  box-shadow: 0 6px 16px rgb(8 93 133 / 0.35);
}
</style>
