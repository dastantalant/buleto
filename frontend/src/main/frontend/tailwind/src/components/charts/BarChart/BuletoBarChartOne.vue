<template>
  <ComponentCard :title="title">
    <div class="w-full max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartOne" class="w-full -ml-5 min-w-[650px] xl:min-w-full pl-2 dark:bg-gray-900">
        <VueApexCharts
          v-if="series && chartOptions"
          type="bar"
          :options="chartOptions"
          :series="series"
          height="410"
        />
        <div v-else class="text-center text-gray-500">Нет данных для отображения</div>
      </div>
    </div>
  </ComponentCard>
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import ComponentCard from '@/components/common/ComponentCard.vue'
import { defineProps, onMounted } from 'vue'
import { type ApexOptions } from 'apexcharts'

interface ChartSeries {
  name: string
  data: number[]
}

interface Props {
  title: string
  chartOptions?: ApexOptions
  series?: ChartSeries[]
}

const props = defineProps<Props>()

onMounted(() => {
  if (!props.series || !props.chartOptions) {
    console.warn('Пропсы series или chartOptions отсутствуют или пусты для', props.title)
  }
})
</script>
