<template>
  <AppPage>
    <PageHeader
      title="Add New Employee"
      subtitle="Create a new employee account for your business."
      back
      fallback="/profile/employees"
    />

    <form id="employee-create-form" class="flex flex-col gap-4" @submit.prevent="create">
      <!-- 1. Employee information -->
      <section class="card px-4 pt-4 pb-6">
        <StepHeader
          :step="1"
          title="Employee Information"
          subtitle="Upload a profile picture and enter the employee's information."
        />

        <div class="mx-1 mt-2 flex flex-col items-center rounded-2xl border border-line bg-slate-50 px-4 py-5 text-center">
          <div class="relative">
            <span
              class="flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full bg-brand text-[28px] font-bold text-white"
            >
              <img v-if="photo" :src="photo" alt="Employee photo" class="h-full w-full object-cover" />
              <template v-else>{{ initials }}</template>
            </span>
            <button
              type="button"
              aria-label="Upload profile picture"
              class="absolute -right-1 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white ring-2 ring-slate-50"
              @click="fileInput?.click()"
            >
              <Camera class="h-4 w-4" :stroke-width="1.75" />
            </button>
            <input ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="pickPhoto" />
          </div>
          <p class="mt-3 text-[15px] font-semibold text-ink">Employee Profile Picture</p>
          <p class="mt-1 text-[12px] leading-4 text-body">Upload a clear photo to help identify the employee. This is optional.</p>
          <p class="mt-1 text-[11px] leading-4 text-muted">Accepted formats: JPG, PNG, or WEBP. Maximum file size: 5MB.</p>
          <p v-if="photoError" class="mt-1 text-[12px] text-danger">{{ photoError }}</p>
        </div>

        <div class="mx-1 mt-6 flex flex-col gap-5">
          <FormField
            label="Employee ID / Employee Number"
            required
            for-id="emp-id"
            help="Enter the employee number used by your business."
          >
            <TextInput id="emp-id" v-model="form.employeeId" placeholder="EXAMPLE: EMP-00001" :icon="BadgeIcon" />
          </FormField>

          <FormField label="First Name" required for-id="emp-first">
            <TextInput id="emp-first" v-model="form.firstName" autocomplete="off" placeholder="Enter first name" />
          </FormField>

          <FormField label="Last Name" required for-id="emp-last">
            <TextInput id="emp-last" v-model="form.lastName" autocomplete="off" placeholder="Enter last name" />
          </FormField>

          <FormField
            label="Email Address"
            required
            for-id="emp-email"
            help="Enter the employee number used by your business."
          >
            <TextInput
              id="emp-email"
              v-model="form.email"
              type="email"
              inputmode="email"
              autocomplete="off"
              placeholder="employee@company.com"
              :icon="Mail"
            />
          </FormField>

          <FormField label="Mobile Number" required for-id="emp-mobile">
            <PlainPhoneInput id="emp-mobile" v-model="form.mobile" />
          </FormField>
        </div>
      </section>

      <!-- 2. Login credentials -->
      <section class="card px-4 pt-4 pb-6">
        <StepHeader
          :step="2"
          title="Login Credentials"
          subtitle="Create the password the employee will use to access the portal."
        />
        <div class="mx-1 mt-2 flex flex-col gap-5">
          <FormField label="Password" required for-id="emp-password">
            <TextInput
              id="emp-password"
              v-model="form.password"
              type="password"
              autocomplete="new-password"
              placeholder="Enter password"
            />
          </FormField>
          <FormField label="Confirm Password" required for-id="emp-confirm" :error="confirmError">
            <TextInput
              id="emp-confirm"
              v-model="form.confirm"
              type="password"
              autocomplete="new-password"
              placeholder="Re-enter password"
              :error="!!confirmError"
            />
          </FormField>
          <PasswordRequirements :password="form.password" class="mt-1" />
        </div>
      </section>

      <!-- 3. Account status -->
      <section class="card px-4 pt-4 pb-6">
        <StepHeader
          :step="3"
          title="Account Status"
          subtitle="Choose whether the employee can access the portal immediately"
        />
        <div class="mt-4 flex flex-col gap-3" role="radiogroup" aria-label="Account Status">
          <button
            v-for="opt in statusOptions"
            :key="opt.value"
            type="button"
            role="radio"
            :aria-checked="form.status === opt.value"
            class="flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors"
            :class="form.status === opt.value ? opt.selectedClass : 'border-line bg-white'"
            @click="form.status = opt.value"
          >
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" :class="opt.iconClass">
              <component :is="opt.icon" class="h-5 w-5" :stroke-width="1.75" />
            </span>
            <span>
              <span class="block text-[14px] font-semibold text-ink">{{ opt.value }}</span>
              <span class="mt-0.5 block text-[12px] leading-4 text-body">{{ opt.description }}</span>
            </span>
          </button>
        </div>
      </section>
    </form>

    <template #footer>
      <div class="flex justify-end gap-3">
        <AppButton variant="danger" size="md" class="h-12 px-5" @click="reset">
          <RotateCcw class="h-5 w-5" /> Reset
        </AppButton>
        <AppButton variant="brand" size="md" type="submit" form="employee-create-form" class="h-12 px-6">
          <UserPlus class="h-5 w-5" :stroke-width="1.75" /> Create
        </AppButton>
      </div>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { Badge as BadgeIcon, Camera, Mail, RotateCcw, UserCheck, UserPlus, UserX } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import PasswordRequirements from '@/components/profile/PasswordRequirements.vue';
import PlainPhoneInput from '@/components/profile/PlainPhoneInput.vue';
import AppButton from '@/components/ui/AppButton.vue';
import FormField from '@/components/ui/FormField.vue';
import StepHeader from '@/components/ui/StepHeader.vue';
import TextInput from '@/components/ui/TextInput.vue';
import type { EmployeeStatus } from '@/data/profile-account';

const blank = () => ({
  employeeId: '',
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  password: '',
  confirm: '',
  status: 'Active' as EmployeeStatus,
});

const form = reactive(blank());
const photo = ref('');
const photoError = ref('');
const confirmError = ref('');
const fileInput = ref<HTMLInputElement | null>(null);

// Placeholder initials (as in the design) until a name is entered.
const initials = computed(() => {
  const i = `${form.firstName.trim()[0] ?? ''}${form.lastName.trim()[0] ?? ''}`.toUpperCase();
  return i || 'KB';
});

const statusOptions = [
  {
    value: 'Active' as const,
    description: 'The employee can sign in and use the business portal immediately.',
    icon: UserCheck,
    iconClass: 'bg-success/10 text-success',
    selectedClass: 'border-success bg-success-light',
  },
  {
    value: 'Inactive' as const,
    description: 'The account will be created, but portal access will remain disabled.',
    icon: UserX,
    iconClass: 'bg-danger-light text-danger',
    selectedClass: 'border-danger bg-danger-light/60',
  },
];

function pickPhoto(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    photoError.value = 'File is larger than 5MB.';
    return;
  }
  photoError.value = '';
  if (photo.value) URL.revokeObjectURL(photo.value);
  photo.value = URL.createObjectURL(file);
}

function reset() {
  Object.assign(form, blank());
  if (photo.value) URL.revokeObjectURL(photo.value);
  photo.value = '';
  photoError.value = '';
  confirmError.value = '';
}

const ionRouter = useIonRouter();
function create() {
  confirmError.value = form.confirm && form.confirm !== form.password ? 'Passwords do not match.' : '';
  if (confirmError.value) return;
  ionRouter.navigate('/profile/employees', 'back');
}
</script>
