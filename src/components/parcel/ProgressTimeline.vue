<template>
  <ol>
    <li v-for="(step, i) in steps" :key="step.title" class="relative flex gap-4 pb-6 last:pb-0">
      <span
        v-if="i < steps.length - 1"
        class="absolute top-[37px] bottom-0 left-[18px] w-px"
        :class="steps[i + 1].state === 'pending' ? 'bg-slate-300' : 'bg-brand'"
      />
      <span
        class="relative z-10 flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full"
        :class="step.state === 'pending' ? 'bg-slate-200 text-muted' : 'bg-brand text-white'"
      >
        <Check v-if="step.state === 'done'" class="h-[18px] w-[18px]" :stroke-width="2" />
        <component :is="currentIcon" v-else-if="step.state === 'current'" class="h-[18px] w-[18px]" :stroke-width="1.75" />
        <span v-else class="text-[15px] font-medium">{{ i + 1 }}</span>
      </span>
      <div class="min-w-0 flex-1 pt-px">
        <p class="text-[13.5px] leading-5 font-semibold" :class="step.state === 'pending' ? 'text-placeholder' : 'text-ink'">
          {{ step.title }}
        </p>
        <p class="text-[10.5px] leading-4 font-semibold text-muted">
          {{ step.state === 'pending' ? 'Pending' : step.time }}
        </p>
        <p class="mt-0.5 text-[10.5px] leading-4 text-body">{{ step.description }}</p>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { Check, Truck } from 'lucide-vue-next';
import type { TimelineStep } from '@/data/parcel';

withDefaults(defineProps<{ steps: TimelineStep[]; currentIcon?: Component }>(), { currentIcon: () => Truck });
</script>
