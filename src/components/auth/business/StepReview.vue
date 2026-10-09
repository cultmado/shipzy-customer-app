<template>
  <div>
    <StepHeading
      title="Review Your Information"
      subtitle="Confirm that all information is correct before creating the account."
    />
    <div class="mt-6 flex flex-col gap-3.5">
      <ReviewCard
        v-for="card in cards"
        :key="card.title"
        :icon="card.icon"
        :title="card.title"
        :items="card.items"
        @edit="$emit('edit', card.step)"
      />
    </div>
    <CheckBox v-model="form.agreed" class="mt-8">
      <span class="text-[13px] leading-5 text-muted">I confirm that the information provided is accurate and I agree to Shipzy's
      <a href="#" class="font-semibold text-primary" @click.prevent>Terms and Conditions</a> and
      <a href="#" class="font-semibold text-primary" @click.prevent>Privacy Policy</a></span>
    </CheckBox>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Building2, CreditCard, FilePenLine, KeyRound, SquareUser } from 'lucide-vue-next';
import CheckBox from '@/components/ui/CheckBox.vue';
import StepHeading from '@/components/auth/StepHeading.vue';
import { cargoTypes, formatTime, paymentMethods, paymentOptions, weekDays, type ContactPerson } from '@/data/auth';
import ReviewCard from './ReviewCard.vue';
import { useBusinessForm } from './useBusinessForm';

defineEmits<{ edit: [step: number] }>();

const form = useBusinessForm();

/** Keep multi-select values in the order they are listed in the form. */
const ordered = (selected: string[], all: string[]) => all.filter((o) => selected.includes(o)).join(', ');

const contactLines = (c: ContactPerson) => {
  const lines = [c.name, c.email, c.mobile ? `+63 ${c.mobile}` : ''];
  return lines.some(Boolean) ? lines.filter(Boolean) : [''];
};

const cards = computed(() => {
  const days = weekDays.filter((d) => form.operatingDays.includes(d.short)).map((d) => d.long);
  const hours =
    form.openingTime || form.closingTime
      ? `${formatTime(form.openingTime) || '—'} – ${formatTime(form.closingTime) || '—'}`
      : '';
  return [
    {
      step: 0,
      icon: KeyRound,
      title: 'Account',
      items: [
        { label: 'Email', lines: [form.email] },
        { label: 'Password', lines: [form.password ? '•'.repeat(8) : ''] },
      ],
    },
    {
      step: 1,
      icon: Building2,
      title: 'Business Information',
      items: [
        { label: 'Business Name', lines: [form.businessName] },
        { label: 'Company Size', lines: [form.companySize] },
        { label: 'Operating Days', lines: [days.join(', ')] },
        { label: 'Operating Hours', lines: [hours] },
        { label: 'Cargo Types', lines: [ordered(form.cargoTypes, cargoTypes)] },
      ],
    },
    {
      step: 2,
      icon: SquareUser,
      title: 'Business Contacts',
      items: [
        { label: 'Primary Contact', lines: contactLines(form.contacts.primary) },
        { label: 'Finance Contact', lines: contactLines(form.contacts.finance) },
        { label: 'COD Contact', lines: contactLines(form.contacts.cod) },
      ],
    },
    {
      step: 3,
      icon: CreditCard,
      title: 'Payment and Tax',
      items: [
        { label: 'Payment Options', lines: [ordered(form.paymentOptions, paymentOptions)] },
        {
          label: 'Payment Method',
          lines: [paymentMethods.find((m) => m.value === form.paymentMethod)?.label ?? ''],
        },
        { label: 'Company TIN', lines: [form.tin] },
        { label: 'Tax Classification', lines: [form.taxClassification] },
      ],
    },
    {
      step: 4,
      icon: FilePenLine,
      title: 'Bank and Legal Information',
      items: [
        { label: 'Bank', lines: [form.bankName] },
        { label: 'Beneficiary', lines: [form.accountName] },
        { label: 'Legal Business Name', lines: [form.legalName] },
        { label: 'Authorized Signatory', lines: [form.signatoryName] },
      ],
    },
  ];
});
</script>
