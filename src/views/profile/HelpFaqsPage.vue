<template>
  <AppPage>
    <PageHeader title="Help & FAQs" subtitle="Find answers to common questions." back fallback="/tabs/profile" />

    <TextInput v-model="query" type="search" inputmode="search" placeholder="Search questions" :icon="Search" class="mb-3" />

    <section class="card px-3.5 py-2">
      <FaqItem
        v-for="faq in filtered"
        :key="faq.question"
        :question="faq.question"
        :answer="faq.answer"
        :open="openQuestion === faq.question"
        @toggle="openQuestion = openQuestion === faq.question ? null : faq.question"
      />
      <p v-if="!filtered.length" class="py-6 text-center text-[14px] text-muted">
        No questions match “{{ query.trim() }}”.
      </p>
    </section>

    <section class="mt-4 rounded-2xl bg-white px-7 pt-4 pb-5 text-center">
      <img :src="mailImg" alt="" class="mx-auto h-auto w-[180px]" />
      <h2 class="mt-2 text-[22px] font-bold text-ink">Email Support</h2>
      <p class="mt-2 text-[14px] leading-5 text-body">
        Can’t find what you’re looking for? Send us an email and we’ll get back to you as soon as possible.
      </p>

      <div class="mt-4 flex items-center gap-4 rounded-lg border border-line px-4 py-2.5 text-left">
        <Mail class="h-7 w-7 shrink-0 text-primary" :stroke-width="1.75" />
        <div>
          <p class="text-[13px] text-body">Email Address</p>
          <p class="text-[14px] font-semibold text-primary">{{ supportEmail }}</p>
        </div>
      </div>

      <AppButton class="mt-3 h-12 w-full" @click="sendEmail">
        <Mail class="h-5 w-5" :stroke-width="1.75" /> Send Email
      </AppButton>

      <p class="mt-3 flex items-center justify-center gap-2 text-[13px] text-body">
        <Clock class="h-4 w-4" /> We usually respond within 24 hours.
      </p>
    </section>
  </AppPage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Clock, Mail, Search } from 'lucide-vue-next';
import mailImg from '@/assets/images/mail.png';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import FaqItem from '@/components/profile/FaqItem.vue';
import AppButton from '@/components/ui/AppButton.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { faqs, supportEmail } from '@/data/profile-account';

const query = ref('');
const openQuestion = ref<string | null>(null);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return faqs;
  return faqs.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
});

function sendEmail() {
  window.location.href = `mailto:${supportEmail}`;
}
</script>
