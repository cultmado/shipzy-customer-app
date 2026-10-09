<template>
  <AppPage content-class="pb-28">
    <PageHeader title="Notifications" subtitle="Stay updated with your bookings, deliveries, payments and account activity">
      <template #actions>
        <button
          type="button"
          class="flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-line bg-white px-3 text-[12.5px] font-medium text-brand active:bg-slate-50 disabled:opacity-50"
          :disabled="unreadCount === 0"
          @click="markAllRead"
        >
          <CheckCheck class="h-4 w-4" :stroke-width="1.75" />Mark all as read
        </button>
      </template>
    </PageHeader>

    <!-- Stats -->
    <section class="card flex px-1 py-4">
      <button
        v-for="(st, i) in stats"
        :key="st.label"
        type="button"
        class="flex flex-1 flex-col items-start px-3 text-left"
        :class="i > 0 && 'border-l border-slate-100'"
        @click="tab = st.tab"
      >
        <span class="flex h-[34px] w-[34px] items-center justify-center rounded-lg" :class="st.bg">
          <component :is="st.icon" class="h-5 w-5" :class="st.color" :stroke-width="1.75" />
        </span>
        <span class="mt-2.5 text-[20px] leading-6 font-bold text-ink">{{ st.value }}</span>
        <span class="mt-0.5 text-[12.5px] whitespace-nowrap text-ink">{{ st.label }}</span>
        <span class="mt-1 text-[11px] whitespace-nowrap" :class="st.color">{{ st.sub }}</span>
      </button>
    </section>

    <div class="mt-4">
      <SegmentTabs v-model="tab" :options="tabs" />
    </div>

    <!-- Search / filters -->
    <section class="card mt-3 p-3">
      <TextInput
        v-model="query"
        :icon="Search"
        inputmode="search"
        placeholder="Search by Booking ID, service, date or status..."
        class="[&_input]:text-[13.5px]"
      />
      <div class="mt-2.5 flex items-center justify-between">
        <label class="relative flex h-11 items-center gap-2.5 rounded-xl border border-line bg-white pr-3 pl-3.5 text-[14px] text-ink">
          <ListFilter class="h-5 w-5" :stroke-width="1.75" />
          {{ status === 'All' ? 'All Status' : status }}
          <ChevronDown class="h-4 w-4" />
          <select v-model="status" aria-label="Filter by status" class="absolute inset-0 cursor-pointer opacity-0">
            <option v-for="s in statusOptions" :key="s" :value="s">{{ s === 'All' ? 'All Status' : s }}</option>
          </select>
        </label>
        <button
          type="button"
          class="flex h-11 items-center gap-2 rounded-xl border border-line bg-white px-3.5 text-[14px] text-ink active:bg-slate-50"
          @click="reset"
        >
          <RefreshCw class="h-[18px] w-[18px]" :stroke-width="1.75" />Reset
        </button>
      </div>
    </section>

    <!-- List -->
    <div class="mt-4 flex flex-col gap-3">
      <article v-for="n in visible" :key="n.id" class="card p-3.5" :class="!n.read && 'border-blue-100'">
        <div class="flex gap-3">
          <span class="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-xl" :class="services[n.service].tintBg">
            <img :src="thumbs[n.service]" alt="" class="w-10" />
          </span>
          <div class="min-w-0 flex-1">
            <div class="flex items-start gap-2">
              <p class="flex min-w-0 flex-1 items-center gap-2 text-[13.5px] font-medium text-ink">
                <span class="truncate">{{ services[n.service].name }}</span>
                <span v-if="!n.read" class="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-primary">
                  <span class="h-1.5 w-1.5 rounded-full bg-primary" />New
                </span>
              </p>
              <span class="shrink-0 text-right text-[10.5px] leading-[14px] text-muted">
                {{ n.date }}<br /><span class="text-[10px] text-placeholder">{{ n.time }}</span>
              </span>
              <KebabMenu :items="menuFor(n)" class="-mt-1" />
            </div>
            <h3 class="mt-0.5 text-[16px] leading-5 font-bold text-ink">{{ n.title }}</h3>
            <p class="mt-1 text-[12px] leading-4 text-muted">{{ n.message }}</p>
            <p class="mt-1.5 flex items-center gap-3 text-[11px] text-body">
              <span class="flex items-center gap-1"><Hash class="h-3.5 w-3.5" />{{ n.bookingId }}</span>
              <span class="flex items-center gap-1 text-muted"><Clock class="h-3.5 w-3.5" />{{ n.ago }}</span>
            </p>
            <button
              type="button"
              class="mt-2 inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 text-[12px] text-body active:bg-slate-50"
              @click="open(n)"
            >
              <Eye class="h-4 w-4" />View Notification
            </button>
          </div>
        </div>
      </article>

      <div v-if="visible.length === 0" class="card flex flex-col items-center px-6 py-10 text-center">
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
          <BellOff class="h-6 w-6" :stroke-width="1.75" />
        </span>
        <p class="mt-3 text-[15px] font-semibold text-ink">No notifications</p>
        <p class="mt-1 text-[13px] text-muted">You're all caught up.</p>
      </div>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useIonRouter } from '@ionic/vue';
import {
  Bell,
  BellOff,
  CheckCheck,
  ChevronDown,
  Clock,
  Eye,
  Hash,
  ListFilter,
  Mail,
  MailCheck,
  MailOpen,
  RefreshCw,
  Search,
  Trash2,
} from 'lucide-vue-next';
import vanImg from '@/assets/images/van.png';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import SegmentTabs from '@/components/ui/SegmentTabs.vue';
import TextInput from '@/components/ui/TextInput.vue';
import KebabMenu, { type KebabItem } from '@/components/tabs/KebabMenu.vue';
import { bookingDetailRoute } from '@/data/bookings';
import { services, type ServiceKey } from '@/data/services';
import { notificationItems, type AppNotification, type NotificationStatus } from '@/data/tabs-notifications';

const ionRouter = useIonRouter();

const items = notificationItems;
const tabs = ['All', 'Unread', 'Read'];
const tab = ref('All');
const query = ref('');
const statusOptions: ('All' | NotificationStatus)[] = ['All', 'Booking', 'Delivery', 'Payment', 'Account'];
const status = ref<'All' | NotificationStatus>('All');

const thumbs: Record<ServiceKey, string> = {
  pabili: services.pabili.image,
  parcel: services.parcel.image,
  vehicle: vanImg,
};

const unreadCount = computed(() => items.value.filter((n) => !n.read).length);

const stats = computed(() => [
  { label: 'All Notifications', sub: 'All recent activity', value: items.value.length, tab: 'All', icon: Bell, bg: 'bg-primary-light', color: 'text-primary' },
  { label: 'Unread', sub: 'Needs your attention', value: unreadCount.value, tab: 'Unread', icon: Mail, bg: 'bg-violet-light', color: 'text-violet' },
  { label: 'Read', sub: 'Previously viewed', value: items.value.length - unreadCount.value, tab: 'Read', icon: MailCheck, bg: 'bg-success-light', color: 'text-success' },
]);

const visible = computed(() => {
  const q = query.value.trim().toLowerCase();
  return items.value.filter((n) => {
    if (tab.value === 'Unread' && n.read) return false;
    if (tab.value === 'Read' && !n.read) return false;
    if (status.value !== 'All' && n.category !== status.value) return false;
    if (!q) return true;
    return [n.bookingId, services[n.service].name, n.title, n.message, n.date, n.category].some((v) =>
      v.toLowerCase().includes(q),
    );
  });
});

function markAllRead() {
  items.value.forEach((n) => (n.read = true));
}

function reset() {
  query.value = '';
  status.value = 'All';
  tab.value = 'All';
}

function open(n: AppNotification) {
  n.read = true;
  ionRouter.navigate(bookingDetailRoute({ service: n.service, id: n.bookingId }), 'forward');
}

function menuFor(n: AppNotification): KebabItem[] {
  return [
    n.read
      ? { label: 'Mark as unread', icon: Mail, action: () => (n.read = false) }
      : { label: 'Mark as read', icon: MailOpen, action: () => (n.read = true) },
    { label: 'Delete', icon: Trash2, danger: true, action: () => (items.value = items.value.filter((x) => x.id !== n.id)) },
  ];
}
</script>
