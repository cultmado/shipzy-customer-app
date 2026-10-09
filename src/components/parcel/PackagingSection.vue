<template>
  <SectionCard>
    <StepHeader
      step="4"
      title="Packaging Information"
      subtitle="Select the packaging and enter its dimensions for an accurate estimate."
      class="-ml-1"
    />

    <div class="flex flex-col gap-6">
      <FormField label="Packaging Type" required>
        <div class="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Packaging Type">
          <button
            v-for="opt in packagingTypes"
            :key="opt.value"
            type="button"
            class="flex h-[94px] flex-col items-center justify-end rounded-xl border pb-1.5 transition-colors"
            :class="model.packagingType === opt.value ? 'border-brand bg-[#f2f8fc]' : 'border-line bg-white active:bg-slate-50'"
            :aria-pressed="model.packagingType === opt.value"
            @click="model.packagingType = opt.value"
          >
            <img :src="opt.image" :alt="opt.value" class="h-[62px] w-[62px] object-contain" />
            <span class="mt-0.5 text-[13px] font-medium text-ink">{{ opt.value }}</span>
          </button>
        </div>
      </FormField>

      <FormField label="Package Size" required>
        <div class="grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Package Size">
          <button
            v-for="size in packageSizes"
            :key="size"
            type="button"
            class="h-[42px] rounded-xl border text-[16px] font-medium text-ink transition-colors"
            :class="model.size === size ? 'border-brand bg-[#f2f8fc]' : 'border-line bg-white active:bg-slate-50'"
            :aria-pressed="model.size === size"
            @click="selectSize(size)"
          >
            {{ size }}
          </button>
        </div>
      </FormField>

      <FormField label="Package Dimension (cm)" required>
        <div class="flex flex-col gap-2.5">
          <div v-for="dim in dims" :key="dim.key" class="flex flex-col gap-1.5">
            <label :for="`dim-${dim.key}`" class="text-[11px] text-muted">{{ dim.label }}</label>
            <UnitInput :id="`dim-${dim.key}`" v-model="model[dim.key]" @update:model-value="model.size = 'Custom'" />
          </div>
        </div>
      </FormField>

      <FormField label="Quantity" required for-id="quantity">
        <p class="-mt-1 text-[11px] text-muted">Total packages to ship.</p>
        <QuantityStepper id="quantity" v-model="model.quantity" />
      </FormField>

      <div class="rounded-xl bg-[#eef5ff] px-4 py-4">
        <p class="text-[13px] font-semibold text-ink">Estimated Total CBM (Cubic Meter)</p>
        <p class="mt-0.5 text-[10px] text-muted">Formula: L × W × H × Qty / 1,000,000</p>
        <p class="mt-2 text-[26px] leading-8 font-bold text-brand">{{ cbm.toFixed(3) }} CBM</p>
      </div>
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import StepHeader from '@/components/ui/StepHeader.vue';
import FormField from '@/components/ui/FormField.vue';
import SectionCard from './SectionCard.vue';
import UnitInput from './UnitInput.vue';
import QuantityStepper from './QuantityStepper.vue';
import {
  calcCbm,
  packageSizes,
  packagingTypes,
  sizePresets,
  type PackageSize,
  type PackagingType,
} from '@/data/parcel';

export interface PackagingForm {
  packagingType: PackagingType;
  size: PackageSize;
  length: number;
  width: number;
  height: number;
  quantity: number;
}

const model = defineModel<PackagingForm>({ required: true });

const dims = [
  { key: 'length', label: 'Length' },
  { key: 'width', label: 'Width' },
  { key: 'height', label: 'Height' },
] as const;

const cbm = computed(() =>
  calcCbm(Number(model.value.length) || 0, Number(model.value.width) || 0, Number(model.value.height) || 0, Number(model.value.quantity) || 0),
);

function selectSize(size: PackageSize) {
  model.value.size = size;
  if (size !== 'Custom') Object.assign(model.value, sizePresets[size]);
}
</script>
