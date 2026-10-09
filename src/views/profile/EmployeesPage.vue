<template>
  <AppPage>
    <PageHeader
      title="Employee Management"
      back
      fallback="/tabs/profile"
      class="!mb-1 items-center"
    >
      <template #actions>
        <AppButton to="/profile/employees/new" size="sm" class="h-9 shrink-0 px-2.5">
          <UserPlus class="h-4 w-4" :stroke-width="1.75" /> Add Employee
        </AppButton>
      </template>
    </PageHeader>
    <p class="mb-4 text-[13px] leading-[18px] text-body">
      Add and manage employees who can access your business bookings.
    </p>

    <!-- Summary -->
    <section class="card grid grid-cols-3 px-1 py-4">
      <div
        v-for="(s, i) in stats"
        :key="s.label"
        class="px-2.5"
        :class="i > 0 && 'border-l border-line'"
      >
        <span class="flex h-9 w-9 items-center justify-center rounded-lg" :class="s.iconClass">
          <component :is="s.icon" class="h-5 w-5" :stroke-width="1.75" />
        </span>
        <p class="mt-2.5 text-[22px] leading-7 font-bold text-ink">{{ s.value }}</p>
        <p class="mt-1 text-[12px] leading-4 text-ink">{{ s.label }}</p>
        <p class="mt-0.5 text-[11px] leading-4" :class="s.noteClass">{{ s.note }}</p>
      </div>
    </section>

    <!-- Search & filter -->
    <section class="card mt-4 flex flex-col gap-3 p-3">
      <label
        class="flex h-11 items-center gap-2.5 rounded-lg border border-line bg-white px-3 focus-within:border-primary"
      >
        <Search class="h-[18px] w-[18px] shrink-0 text-muted" />
        <input
          v-model="query"
          type="search"
          inputmode="search"
          placeholder="Search by Employee Name, ID, Email or Mobile Number..."
          class="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted"
        />
      </label>
      <div class="flex items-center justify-between">
        <label class="relative flex h-11 items-center gap-2 rounded-lg border border-line bg-white pr-3 pl-3">
          <ListFilter class="h-5 w-5 text-ink" :stroke-width="1.75" />
          <select v-model="status" class="appearance-none bg-transparent pr-6 text-[14px] text-ink outline-none">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <ChevronDown class="pointer-events-none absolute right-3 h-[18px] w-[18px] text-ink" />
        </label>
        <button
          type="button"
          class="flex h-11 items-center gap-2 rounded-lg border border-line bg-white px-3 text-[14px] text-ink active:bg-slate-50"
          @click="reset"
        >
          <RefreshCw class="h-[18px] w-[18px]" :stroke-width="1.75" /> Reset
        </button>
      </div>
    </section>

    <!-- List -->
    <div class="mt-4 flex flex-col gap-3">
      <EmployeeCard
        v-for="e in filtered"
        :key="e.id"
        :employee="e"
        @toggle-status="e.status = e.status === 'Active' ? 'Inactive' : 'Active'"
        @remove="list = list.filter((x) => x.id !== e.id)"
      />
      <div v-if="!filtered.length" class="card flex flex-col items-center px-6 py-8 text-center">
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
          <UserSearch class="h-6 w-6" :stroke-width="1.75" />
        </span>
        <p class="mt-3 text-[15px] font-semibold text-ink">No employees found</p>
        <p class="mt-1 text-[13px] text-muted">Try a different search or status filter.</p>
      </div>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  ChevronDown,
  ListFilter,
  RefreshCw,
  Search,
  UserCheck,
  UserPlus,
  UserSearch,
  Users,
  UserX,
} from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import EmployeeCard from '@/components/profile/EmployeeCard.vue';
import AppButton from '@/components/ui/AppButton.vue';
import { employees, employeeStats, type Employee } from '@/data/profile-account';

const list = ref<Employee[]>(employees.map((e) => ({ ...e })));
const query = ref('');
const status = ref('');

const stats = [
  { label: 'Total Employees', value: employeeStats.total, note: 'All Employee accounts', icon: Users, iconClass: 'bg-primary-light text-primary', noteClass: 'text-primary' },
  { label: 'Active', value: employeeStats.active, note: 'Currently active', icon: UserCheck, iconClass: 'bg-success-light text-success', noteClass: 'text-success' },
  { label: 'Inactive', value: employeeStats.inactive, note: 'Access Disabled', icon: UserX, iconClass: 'bg-danger-light text-danger', noteClass: 'text-danger' },
];

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  const qDigits = q.replace(/\D/g, '');
  return list.value.filter((e) => {
    if (status.value && e.status !== status.value) return false;
    if (!q) return true;
    return (
      e.name.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      (qDigits.length > 0 && e.mobile.replace(/\D/g, '').includes(qDigits))
    );
  });
});

function reset() {
  query.value = '';
  status.value = '';
}
</script>
