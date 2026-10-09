<template>
  <AppPage>
    <PageHeader
      title="Personal Information"
      subtitle="View and update your personal details to keep your profile information accurate and up to date."
      back
      fallback="/tabs/profile"
    />

    <form id="personal-info-form" class="card flex flex-col gap-5 px-5 pt-5 pb-8" @submit.prevent="save">
      <FormField label="Full Name" for-id="full-name">
        <TextInput id="full-name" v-model="fullName" autocomplete="name" placeholder="Enter your full name" />
      </FormField>

      <FormField label="Date of Birth" for-id="birth-date">
        <label
          class="flex h-[52px] cursor-pointer items-center gap-3 rounded-xl border border-line bg-white px-4 transition-colors focus-within:border-primary"
        >
          <input
            id="birth-date"
            ref="dateInput"
            v-model="birthDate"
            type="date"
            :max="today"
            class="date-input h-full min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none"
            @click="openPicker"
          />
          <Calendar class="h-5 w-5 shrink-0 text-ink" :stroke-width="1.75" />
        </label>
      </FormField>

      <FormField label="Gender" for-id="gender">
        <SelectInput id="gender" v-model="gender" :options="genders" />
      </FormField>
    </form>

    <template #footer>
      <AppButton variant="brand" type="submit" form="personal-info-form" block>Save</AppButton>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { Calendar } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import FormField from '@/components/ui/FormField.vue';
import SelectInput from '@/components/ui/SelectInput.vue';
import TextInput from '@/components/ui/TextInput.vue';

const fullName = ref('Ken Jhi');
const birthDate = ref('');
const gender = ref('Male');
const genders = ['Male', 'Female', 'Prefer not to say'];
const today = new Date().toISOString().slice(0, 10);

const dateInput = ref<HTMLInputElement | null>(null);
function openPicker() {
  try {
    dateInput.value?.showPicker?.();
  } catch {
    /* showPicker unsupported or blocked; the native control still works */
  }
}

const ionRouter = useIonRouter();
function save() {
  ionRouter.navigate('/tabs/profile', 'back');
}
</script>

<style scoped>
/* Hide the browser's own calendar glyph; the Lucide icon replaces it. */
.date-input::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
