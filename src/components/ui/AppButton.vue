<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :form="to ? undefined : form"
    :disabled="disabled"
    class="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors select-none disabled:opacity-50"
    :class="[sizes[size], variants[variant], block && 'w-full']"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
type Variant = 'primary' | 'brand' | 'outline' | 'ghost' | 'danger' | 'soft';
type Size = 'sm' | 'md' | 'lg';

withDefaults(
  defineProps<{
    variant?: Variant;
    size?: Size;
    block?: boolean;
    to?: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
    /** id of a <form> elsewhere on the page, so a footer button can submit it */
    form?: string;
  }>(),
  { variant: 'primary', size: 'lg', block: false, type: 'button', disabled: false },
);

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white active:bg-primary-dark',
  brand: 'bg-brand text-white active:bg-brand-dark',
  outline: 'border border-line bg-white text-ink active:bg-slate-50',
  ghost: 'text-primary active:bg-primary-light',
  danger: 'border border-danger bg-white text-danger active:bg-danger-light',
  soft: 'bg-primary-light text-primary active:bg-blue-100',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-[13px]',
  md: 'h-11 px-4 text-[15px]',
  lg: 'h-14 px-5 text-[17px]',
};
</script>
