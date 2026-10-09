<template>
  <AppPage content-class="flex flex-col pb-28">
    <PageHeader title="My Profile" subtitle="Manage your personal information and account settings" />

    <!-- Profile summary -->
    <section class="rounded-2xl border border-blue-200 bg-[#f5f8fd] p-3">
      <div class="flex items-center gap-4 px-1 pt-1">
        <div class="relative shrink-0">
          <span class="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand text-[24px] font-bold text-white">
            {{ session.initials }}
          </span>
          <label
            class="absolute -right-1 -bottom-0.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-white ring-2 ring-[#f5f8fd]"
            aria-label="Change profile photo"
          >
            <Camera class="h-4 w-4" />
            <input type="file" accept="image/*" class="hidden" />
          </label>
        </div>
        <div class="min-w-0">
          <p class="text-[18px] leading-6 font-bold text-ink">{{ session.name }}</p>
          <span class="mt-1 inline-flex items-center gap-1.5 rounded-md border border-teal-200 bg-teal-50 py-0.5 pr-2 pl-1 text-[12px] font-semibold text-brand">
            <span class="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-teal-400 text-white">
              <ShieldCheck class="h-3 w-3" />
            </span>
            Verified Customer
          </span>
          <p class="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-ink">
            <Calendar class="h-4 w-4" :stroke-width="1.75" />Customer since {{ session.memberSince }}
          </p>
        </div>
      </div>

      <div class="mt-3 flex rounded-xl bg-white py-3 shadow-card">
        <div
          v-for="(st, i) in stats"
          :key="st.label"
          class="flex flex-1 flex-col items-center"
          :class="i > 0 && 'border-l border-slate-100'"
        >
          <span class="text-[18px] leading-6 font-bold" :class="st.color">{{ st.value }}</span>
          <span :class="session.isBusiness ? 'text-[10.5px]' : 'text-[11.5px]'" class="mt-0.5 whitespace-nowrap text-muted">{{ st.label }}</span>
          <component :is="st.icon" class="mt-1.5 h-[18px] w-[18px]" :class="st.color" :stroke-width="1.75" />
        </div>
      </div>
    </section>

    <div class="mt-5">
      <MenuGroup :title="session.isBusiness ? 'Business Management' : 'Account & Settings'" :items="menu" />
      <MenuGroup title="Support" :items="support" />
    </div>

    <div class="min-h-4 flex-1" />
    <button
      type="button"
      class="flex h-12 w-full items-center justify-center rounded-xl border border-slate-400 bg-white text-[16px] font-semibold text-muted active:bg-slate-50"
      @click="logout"
    >
      Logout
    </button>
  </AppPage>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { Box, Calendar, Camera, CircleCheck, Files, ShieldCheck, Truck } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import MenuGroup from '@/components/ui/MenuGroup.vue';
import { useSession } from '@/composables/useSession';

const session = useSession();
const ionRouter = useIonRouter();

const stats = computed(() =>
  session.isBusiness
    ? [
        { label: 'Total Bookings', value: '12', icon: Box, color: 'text-primary' },
        { label: 'Completed', value: '1', icon: CircleCheck, color: 'text-success' },
        { label: 'Active', value: '2', icon: Truck, color: 'text-warning' },
        { label: 'Documents', value: '3/6', icon: Files, color: 'text-violet' },
      ]
    : [
        { label: 'Total Bookings', value: '12', icon: Box, color: 'text-primary' },
        { label: 'Completed', value: '10', icon: CircleCheck, color: 'text-success' },
        { label: 'In Progress', value: '2', icon: Truck, color: 'text-warning' },
      ],
);

const menu = computed(() =>
  session.isBusiness
    ? [
        { label: 'Employee Management', to: '/profile/employees' },
        { label: 'Business Information', to: '/profile/business-info' },
        { label: 'Operating Schedule', to: '/profile/schedule' },
        { label: 'Business Contacts', to: '/profile/business-contacts' },
        { label: 'Payment & Tax Information', to: '/profile/payment-tax' },
        { label: 'Bank Information', to: '/profile/bank' },
        { label: 'Legal & Authorized Signatory', to: '/profile/legal' },
        { label: 'Business Verification Documents', to: '/profile/documents' },
      ]
    : [
        { label: 'Personal Information', to: '/profile/personal' },
        { label: 'Contact Information', to: '/profile/contact' },
        { label: 'Address Book', to: '/profile/addresses' },
        { label: 'Security & Password', to: '/profile/password' },
      ],
);

const support = [{ label: 'Help & FAQs', to: '/profile/help' }];

function logout() {
  ionRouter.navigate('/login', 'root', 'replace');
}
</script>
