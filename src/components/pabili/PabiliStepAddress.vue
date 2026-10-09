<template>
  <div class="flex flex-col gap-6">
    <section class="card px-4 py-5">
      <StepHeader
        step="1"
        title="Select Address"
        subtitle="Choose from your address book or enter a custom delivery address."
      />

      <div class="mx-1 grid grid-cols-2 gap-1 rounded-lg bg-[#f3f6fa] p-1">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          type="button"
          class="flex h-[27px] items-center justify-center gap-2 rounded-md text-[13px] transition-colors"
          :class="state.addressMode === tab.value ? 'bg-white text-brand shadow-sm' : 'text-muted'"
          @click="state.addressMode = tab.value"
        >
          <component :is="tab.icon" class="h-4 w-4" :stroke-width="1.75" />
          {{ tab.label }}
        </button>
      </div>

      <div v-if="state.addressMode === 'book'" class="mx-1 mt-3 flex flex-col gap-3">
        <OptionCard
          v-for="addr in savedAddresses"
          :key="addr.id"
          :title="addr.label"
          :description="addr.address"
          :icon="MapPin"
          :selected="state.addressId === addr.id"
          @select="state.addressId = addr.id"
        >
          <template v-if="addr.isDefault" #badge>
            <span class="rounded bg-brand-light px-1.5 py-px text-[11px] font-medium text-brand">Default</span>
          </template>
        </OptionCard>
      </div>

      <div v-else class="mx-1 mt-4 flex flex-col gap-4">
        <FormField label="Street Address" for-id="pb-street" required>
          <TextInput
            id="pb-street"
            v-model="state.customAddress.street"
            placeholder="House no., building, street"
            :icon="MapPin"
          />
        </FormField>
        <FormField label="Barangay" for-id="pb-brgy" required>
          <TextInput id="pb-brgy" v-model="state.customAddress.barangay" placeholder="Enter barangay" />
        </FormField>
        <FormField label="City / Municipality" for-id="pb-city" required>
          <TextInput id="pb-city" v-model="state.customAddress.city" placeholder="Enter city or municipality" />
        </FormField>
      </div>
    </section>

    <section class="card px-4 py-5">
      <StepHeader
        step="2"
        title="Delivery Schedule"
        subtitle="Choose whether you need the service now or at a scheduled date and time."
      />
      <div class="mx-1 flex flex-col gap-3">
        <OptionCard
          title="Deliver Now"
          description="Start the purchase and delivery as soon as a rider is available."
          :icon="TruckElectric"
          :selected="state.schedule === 'now'"
          @select="state.schedule = 'now'"
        />
        <OptionCard
          title="Schedule Delivery"
          description="Select your preferred purchase and delivery date and time."
          :icon="CalendarClock"
          icon-class="text-vehicle"
          :selected="state.schedule === 'scheduled'"
          @select="state.schedule = 'scheduled'"
        />
      </div>

      <div v-if="state.schedule === 'scheduled'" class="mx-1 mt-4 grid grid-cols-2 gap-3">
        <FormField label="Date" for-id="pb-date">
          <TextInput id="pb-date" v-model="state.scheduleDate" type="date" />
        </FormField>
        <FormField label="Time" for-id="pb-time">
          <TextInput id="pb-time" v-model="state.scheduleTime" type="time" />
        </FormField>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { BookUser, CalendarClock, MapPin, SquarePen, TruckElectric } from 'lucide-vue-next';
import FormField from '@/components/ui/FormField.vue';
import StepHeader from '@/components/ui/StepHeader.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { savedAddresses } from '@/data/pabili';
import OptionCard from './OptionCard.vue';
import { usePabiliForm } from './pabiliForm';

const { state } = usePabiliForm();

const tabs = [
  { value: 'book' as const, label: 'Address Book', icon: BookUser },
  { value: 'custom' as const, label: 'Custom Address', icon: SquarePen },
];
</script>
