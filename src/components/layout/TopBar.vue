<template>
  <header class="mb-4 flex items-center justify-between">
    <img :src="logo" alt="Shipzy" class="h-[27px] w-auto" />
    <div class="flex items-center gap-4">
      <router-link to="/tabs/notifications" class="relative p-1" aria-label="Notifications">
        <Bell class="h-6 w-6 text-ink" />
        <span
          v-if="unread > 0"
          class="absolute -top-0.5 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-danger px-1 text-[11px] font-semibold text-white"
        >{{ unread }}</span>
      </router-link>
      <router-link
        to="/tabs/profile"
        class="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-brand text-[15px] font-semibold text-white"
      >{{ session.initials }}</router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Bell } from 'lucide-vue-next';
import logo from '@/assets/images/logo.png';
import { useSession } from '@/composables/useSession';
import { unreadNotificationCount as unread } from '@/data/tabs-notifications';

const session = useSession();
</script>
