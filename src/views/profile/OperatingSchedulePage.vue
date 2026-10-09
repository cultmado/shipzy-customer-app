<template>
  <AppPage>
    <PageHeader
      title="Operating Schedule"
      subtitle="Manage your business operating days and hours."
      back
      fallback="/tabs/profile"
    />

    <BusinessFormCard>
      <FormField label="Operating Days">
        <ScheduleDayPicker v-model="days" :days="weekDays" />
      </FormField>
      <FormField label="Opening Hours" for-id="opening-hours">
        <ScheduleTimeInput id="opening-hours" v-model="opensAt" />
      </FormField>
      <FormField label="Closing Hours" for-id="closing-hours" :error="timeError">
        <ScheduleTimeInput id="closing-hours" v-model="closesAt" />
      </FormField>
    </BusinessFormCard>

    <template #footer>
      <BusinessSaveButton />
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import BusinessFormCard from '@/components/profile/BusinessFormCard.vue';
import BusinessSaveButton from '@/components/profile/BusinessSaveButton.vue';
import ScheduleDayPicker from '@/components/profile/ScheduleDayPicker.vue';
import ScheduleTimeInput from '@/components/profile/ScheduleTimeInput.vue';
import FormField from '@/components/ui/FormField.vue';
import { operatingSchedule, weekDays } from '@/data/business';

const days = ref<string[]>([...operatingSchedule.days]);
const opensAt = ref(operatingSchedule.opensAt);
const closesAt = ref(operatingSchedule.closesAt);

const timeError = computed(() =>
  opensAt.value && closesAt.value && closesAt.value <= opensAt.value
    ? 'Closing time must be later than opening time.'
    : '',
);
</script>
