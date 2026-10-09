<template>
  <AppPage>
    <PageHeader
      title="Address Book"
      subtitle="Manage your saved addresses for faster and easier bookings."
      back
      fallback="/tabs/profile"
    />

    <section class="card px-3 pt-1.5 pb-3">
      <TransitionGroup tag="div" name="addr" class="divide-y divide-line">
        <AddressCard
          v-for="a in sorted"
          :key="a.id"
          :address="a"
          @edit="openForm(a)"
          @default="setDefault(a.id)"
          @delete="remove(a.id)"
        />
      </TransitionGroup>

      <div v-if="!addresses.length" class="flex flex-col items-center py-6 text-center">
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
          <MapPinOff class="h-6 w-6" :stroke-width="1.75" />
        </span>
        <p class="mt-3 text-[15px] font-semibold text-ink">No saved addresses yet</p>
        <p class="mt-1 text-[13px] text-muted">Add one to speed up your next booking.</p>
      </div>

      <button
        type="button"
        class="mt-1.5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-primary/25 bg-white text-[15px] font-semibold text-primary active:bg-primary-light"
        @click="openForm(null)"
      >
        <Plus class="h-5 w-5" /> Add New Address
      </button>
    </section>

    <AddressFormSheet :open="formOpen" :address="editing" @close="formOpen = false" @save="save" />
  </AppPage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { MapPinOff, Plus } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import AddressCard from '@/components/profile/AddressCard.vue';
import AddressFormSheet from '@/components/profile/AddressFormSheet.vue';
import { savedAddresses, type SavedAddress } from '@/data/profile-account';

const addresses = ref<SavedAddress[]>(savedAddresses.map((a) => ({ ...a })));
// Default address always listed first.
const sorted = computed(() => [...addresses.value].sort((a, b) => Number(b.isDefault) - Number(a.isDefault)));

const formOpen = ref(false);
const editing = ref<SavedAddress | null>(null);

function openForm(a: SavedAddress | null) {
  editing.value = a;
  formOpen.value = true;
}

function setDefault(id: string) {
  addresses.value.forEach((a) => (a.isDefault = a.id === id));
}

function remove(id: string) {
  const wasDefault = addresses.value.find((a) => a.id === id)?.isDefault;
  addresses.value = addresses.value.filter((a) => a.id !== id);
  if (wasDefault && addresses.value[0]) addresses.value[0].isDefault = true;
}

function save(value: Omit<SavedAddress, 'id'>) {
  let id = editing.value?.id;
  if (id) {
    Object.assign(addresses.value.find((a) => a.id === id)!, value);
  } else {
    id = `addr-${Date.now()}`;
    addresses.value.push({ id, ...value });
  }
  // First address becomes default automatically; otherwise honour the checkbox.
  if (value.isDefault || addresses.value.length === 1) setDefault(id);
  formOpen.value = false;
}
</script>

<style scoped>
.addr-move,
.addr-enter-active,
.addr-leave-active {
  transition: all 0.2s ease;
}
.addr-enter-from,
.addr-leave-to {
  opacity: 0;
}
</style>
