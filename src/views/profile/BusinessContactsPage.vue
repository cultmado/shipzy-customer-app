<template>
  <AppPage>
    <PageHeader
      title="Business Contacts"
      subtitle="Contact persons responsible for operations, finance, and COD."
      back
      fallback="/tabs/profile"
    />

    <div class="flex flex-col gap-6">
      <BusinessFormCard v-for="contact in contacts" :key="contact.kind">
        <template #header>
          <div class="-mx-[5px] mb-4 flex items-center gap-3">
            <span class="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-brand text-white">
              <component :is="icons[contact.kind]" class="h-[18px] w-[18px]" :stroke-width="1.75" />
            </span>
            <div class="min-w-0">
              <h2 class="text-[16px] leading-6 font-semibold text-ink">{{ contact.title }}</h2>
              <p class="text-[12px] leading-4 text-muted">{{ contact.subtitle }}</p>
            </div>
          </div>
        </template>
        <BusinessContactFields v-model="contactModels[contact.kind]" :id-prefix="contact.kind" />
      </BusinessFormCard>
    </div>

    <template #footer>
      <BusinessSaveButton />
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { CircleDollarSign, HandCoins, User } from 'lucide-vue-next';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import BusinessContactFields from '@/components/profile/BusinessContactFields.vue';
import BusinessFormCard from '@/components/profile/BusinessFormCard.vue';
import BusinessSaveButton from '@/components/profile/BusinessSaveButton.vue';
import { businessContacts, type ContactKind } from '@/data/business';

const contacts = businessContacts;
const icons = { primary: User, finance: CircleDollarSign, cod: HandCoins } as const;

const contactModels = reactive(
  Object.fromEntries(
    businessContacts.map((c) => [c.kind, { person: c.person, designation: c.designation, email: c.email, mobile: c.mobile }]),
  ) as Record<ContactKind, { person: string; designation: string; email: string; mobile: string }>,
);
</script>
