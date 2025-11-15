<template>
  <ComponentCard :title="title">
    <div v-if="series && series.length > 0 && series[0].data.length > 0" class="grid grid-cols-6 gap-2">
      <div v-for="(value, index) in series[0].data" :key="index" class="p-2 border rounded">
        {{ index }}: {{ value }}
      </div>
    </div>
    <div v-else class="text-center text-gray-500">Нет данных для отображения</div>
  </ComponentCard>
</template>

<script setup lang="ts">
import ComponentCard from '@/components/common/ComponentCard.vue'
import { defineProps } from 'vue'

interface ChartSeries {
  name: string;
  data: number[];
}

interface Props {
  title: string;
  series?: ChartSeries[];
}

const props = defineProps<Props>()
</script>
