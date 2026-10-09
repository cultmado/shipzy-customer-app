<template>
  <AppPage>
    <PageHeader
      title="Business Verification Documents"
      subtitle="Accepted formats: PDF, JPG, JPEG, and PNG. Maximum size: 5 MB per file."
      back
      fallback="/tabs/profile"
    />

    <div class="flex flex-col gap-3">
      <DocumentUploadCard
        v-for="doc in documents"
        :key="doc.id"
        v-model:file="doc.file"
        :title="doc.title"
        :description="doc.description"
      />
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import AppPage from '@/components/layout/AppPage.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import DocumentUploadCard from '@/components/profile/DocumentUploadCard.vue';
import { verificationDocuments } from '@/data/business';

const documents = reactive(verificationDocuments.map((d) => ({ ...d, file: d.file && { ...d.file } })));
</script>
