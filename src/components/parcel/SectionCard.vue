<template>
  <section class="card p-5" :class="$attrs.class">
    <slot />
  </section>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>
