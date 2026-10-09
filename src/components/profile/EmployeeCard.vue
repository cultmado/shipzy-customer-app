<template>
  <article class="card relative flex gap-3 p-3">
    <span
      class="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[10px] bg-brand text-[20px] font-bold text-white"
    >{{ initials }}</span>

    <div class="min-w-0 flex-1">
      <h3 class="truncate text-[15px] leading-5 font-bold tracking-[0.02em] text-ink">{{ employee.name }}</h3>
      <p class="mt-0.5 text-[11px] leading-[14px] font-medium text-muted">{{ employee.id }}</p>
      <p class="mt-1.5 flex items-center gap-1.5 text-[11px] text-body">
        <Mail class="h-3.5 w-3.5 shrink-0 text-ink" :stroke-width="1.75" />
        <span class="truncate">{{ employee.email }}</span>
      </p>
      <p class="mt-1.5 flex items-center gap-1.5 text-[11px] text-body">
        <Phone class="h-3.5 w-3.5 shrink-0 text-ink" :stroke-width="1.75" />
        {{ employee.mobile }}
      </p>
    </div>

    <div class="flex w-[108px] shrink-0 flex-col items-start">
      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] leading-3 font-medium"
        :class="active ? 'bg-success-light text-success' : 'bg-danger-light text-danger'"
      >
        <span class="h-1 w-1 rounded-full bg-current" />{{ employee.status }}
      </span>
      <p class="mt-1.5 text-[9px] text-muted">{{ active ? 'Account is active' : 'Access disabled' }}</p>
      <p class="mt-0.5 text-[10px] font-medium whitespace-nowrap text-ink">Last Active: {{ employee.lastActive }}</p>
      <button type="button" class="mt-auto flex items-center gap-1 self-end pt-2 text-[12px] font-semibold text-primary">
        View <ArrowRight class="h-3.5 w-3.5" />
      </button>
    </div>

    <button
      type="button"
      aria-label="Employee options"
      class="-mr-1 -mt-0.5 flex h-6 w-5 shrink-0 items-start justify-center text-ink"
      @click.stop="menuOpen = !menuOpen"
    >
      <EllipsisVertical class="h-4 w-4" />
    </button>

    <template v-if="menuOpen">
      <div class="fixed inset-0 z-10" @click="menuOpen = false" />
      <div class="absolute right-2 top-9 z-20 w-48 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-lg">
        <button
          type="button"
          class="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[14px] font-medium text-ink active:bg-slate-50"
          @click="toggleStatus"
        >
          <component :is="active ? UserX : UserCheck" class="h-4 w-4 text-muted" />
          {{ active ? 'Deactivate account' : 'Activate account' }}
        </button>
        <button
          type="button"
          class="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[14px] font-medium text-danger active:bg-slate-50"
          @click="remove"
        >
          <Trash2 class="h-4 w-4" /> Remove employee
        </button>
      </div>
    </template>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ArrowRight, EllipsisVertical, Mail, Phone, Trash2, UserCheck, UserX } from 'lucide-vue-next';
import { employeeInitials, type Employee } from '@/data/profile-account';

const props = defineProps<{ employee: Employee }>();
const emit = defineEmits<{ toggleStatus: []; remove: [] }>();

const menuOpen = ref(false);
const active = computed(() => props.employee.status === 'Active');
const initials = computed(() => employeeInitials(props.employee.name));

function toggleStatus() {
  menuOpen.value = false;
  emit('toggleStatus');
}
function remove() {
  menuOpen.value = false;
  emit('remove');
}
</script>
