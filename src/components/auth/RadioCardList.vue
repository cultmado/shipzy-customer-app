<template>
  <div class="flex flex-col gap-3">
    <label
      v-for="opt in options"
      :key="opt.value"
      class="flex cursor-pointer items-start gap-4 rounded-lg border px-3.5 py-3 transition-colors"
      :class="model === opt.value ? 'border-primary bg-primary-light' : 'border-line bg-white'"
    >
      <input v-model="model" type="radio" :name="name" :value="opt.value" class="peer sr-only" />
      <span
        class="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30"
        :class="model === opt.value ? 'border-primary' : 'border-line bg-white'"
      >
        <span v-if="model === opt.value" class="h-3 w-3 rounded-full bg-primary" />
      </span>
      <span>
        <span class="block text-[16px] leading-6 text-ink">{{ opt.label }}</span>
        <span class="mt-0.5 block text-[12px] leading-4 text-muted">{{ opt.description }}</span>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string; options: readonly { value: string; label: string; description: string }[] }>();
const model = defineModel<string>({ required: true });
</script>
