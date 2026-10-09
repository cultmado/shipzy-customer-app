<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" :for="forId" class="text-[15px] font-semibold text-ink">
      {{ label }}<span v-if="hint" class="font-normal">{{ ' ' + hint.trim() }}</span><span v-if="required" class="text-danger"> *</span>
    </label>
    <slot />
    <p v-if="error" class="text-[12px] text-danger">{{ error }}</p>
    <p v-else-if="help" class="text-[12px] text-muted">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  /** Inline, non-bold text after the label, e.g. "(Optional)" */
  hint?: string;
  required?: boolean;
  help?: string;
  error?: string;
  forId?: string;
}>();
</script>
