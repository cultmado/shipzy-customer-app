<template>
  <div>
    <StepHeading title="Business Information" subtitle="Tell us about your organization and operating schedule." />
    <div class="mt-5 flex flex-col gap-6">
      <FormField label="Business Name" for-id="biz-name" required>
        <TextInput
          id="biz-name"
          v-model="form.businessName"
          autocomplete="organization"
          placeholder="Enter business name"
          :icon="Building2"
        />
      </FormField>

      <FormField label="Number of Employees" for-id="biz-size" required>
        <SelectInput
          id="biz-size"
          v-model="form.companySize"
          :options="companySizes"
          placeholder="Select company size"
          :icon="Users"
        />
      </FormField>

      <FormField label="Business Description" for-id="biz-description" required>
        <TextArea
          id="biz-description"
          v-model="form.description"
          :rows="5"
          maxlength="500"
          placeholder="Describe your business"
        />
        <div class="flex justify-between gap-4 text-[12px] text-placeholder">
          <span>Help us understand your logistics requirements.</span>
          <span>{{ form.description.length }}/500</span>
        </div>
      </FormField>

      <FormField label="Operating Days" required>
        <div class="flex gap-1.5" role="group" aria-label="Operating Days">
          <button
            v-for="day in weekDays"
            :key="day.short"
            type="button"
            class="h-[34px] flex-1 rounded-lg border text-[13px] transition-colors"
            :class="
              form.operatingDays.includes(day.short)
                ? 'border-brand bg-brand-light text-brand'
                : 'border-line bg-white text-ink'
            "
            :aria-pressed="form.operatingDays.includes(day.short)"
            @click="toggleDay(day.short)"
          >
            {{ day.short }}
          </button>
        </div>
      </FormField>

      <FormField label="Operating Hours" required>
        <div class="flex flex-col gap-1.5">
          <label for="biz-open" class="text-[12px] text-placeholder">Opening Time</label>
          <TimeInput id="biz-open" v-model="form.openingTime" />
          <label for="biz-close" class="mt-3 text-[12px] text-placeholder">Closing Time</label>
          <TimeInput id="biz-close" v-model="form.closingTime" />
        </div>
      </FormField>

      <FormField label="Types of Goods or Cargo" required>
        <CheckCardList v-model="form.cargoTypes" :options="cargoTypes" />
      </FormField>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Users } from 'lucide-vue-next';
import FormField from '@/components/ui/FormField.vue';
import SelectInput from '@/components/ui/SelectInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import TextInput from '@/components/ui/TextInput.vue';
import CheckCardList from '@/components/auth/CheckCardList.vue';
import StepHeading from '@/components/auth/StepHeading.vue';
import TimeInput from '@/components/auth/TimeInput.vue';
import { cargoTypes, companySizes, weekDays } from '@/data/auth';
import { useBusinessForm } from './useBusinessForm';

const form = useBusinessForm();

function toggleDay(day: string) {
  const days = form.operatingDays;
  form.operatingDays = days.includes(day) ? days.filter((d) => d !== day) : [...days, day];
}
</script>
