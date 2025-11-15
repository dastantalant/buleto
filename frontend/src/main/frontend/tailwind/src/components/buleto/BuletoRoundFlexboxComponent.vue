<template>
  <ComponentCard :title="title">
    <div class="mb-4 flex flex-row justify-start">
      <button
        @click="toggleSort"
        class=" flex flex-row px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!canSort"
      >
        Сортировать
        <SortAscIcon class="ml-1" v-if="sortOrder === 'ascending'"/>
        <SortDescIcon class="ml-1" v-if="sortOrder === 'descending'"/>
      </button>
    </div>
    <div v-if="sortedData && sortedData.length > 0" class="flex flex-wrap gap-2">
      <div
        v-for="props in sortedData"
        :key="props.originalIndex"
        class="cell-container"
        :class="getCellStyle(props.value)"
      >
        <div v-if="props.value !== 0" class="count-indicator" :class="getCellStyle(props.value + 1)">
          {{ props.value }}
        </div>
        <div class="cell-value">{{ props.originalIndex }}</div>
      </div>
    </div>
    <div v-else class="text-center py-4 dark:bg-gray-900">Нет данных для отображения</div>
  </ComponentCard>
</template>
<script setup lang="ts">
import ComponentCard from '@/components/common/ComponentCard.vue'
import { defineProps, computed, ref } from 'vue'
import { SortAscIcon, SortDescIcon } from '@/icons'

interface ChartSeries {
  name: string
  data: number[]
}

interface Props {
  title: string
  sort?: boolean
  series?: ChartSeries[]
}

interface ProcessedDataItem {
  originalIndex: number
  value: number
}

const props = defineProps<Props>()

const sortOrder = ref<'original' | 'ascending' | 'descending'>('original')
const sortedData = computed((): ProcessedDataItem[] => {
  if (
    !props.series ||
    props.series.length === 0 ||
    !props.series[0].data ||
    props.series[0].data.length === 0
  ) {
    return []
  }
  const processableData: ProcessedDataItem[] = props.series[0].data.map((value, index) => ({
    originalIndex: index,
    value: value,
  }))
  switch (sortOrder.value) {
    case 'ascending':
      return processableData.sort((a, b) => {
        const valueDiff = a.value - b.value
        return valueDiff !== 0 ? valueDiff : a.originalIndex - b.originalIndex
      })
    case 'descending':
      return processableData.sort((a, b) => {
        const valueDiff = b.value - a.value
        return valueDiff !== 0 ? valueDiff : a.originalIndex - b.originalIndex
      })
    case 'original':
    default:
      return processableData
  }
})
const canSort = computed(() => {
  return sortedData.value.length > 0
})

const toggleSort = () => {
  if (!canSort.value) return

  switch (sortOrder.value) {
    case 'original':
      sortOrder.value = 'descending'
      break
    case 'ascending':
      sortOrder.value = 'original'
      break
    case 'descending':
      sortOrder.value = 'ascending'
      break
  }
}

const getCellStyle = (value: number) => {
  if (value === 0) {
    return 'text-gray-300 bg-white dark:bg-gray-800 dark:text-gray-600'
  }
  if (value === 1) {
    return 'text-back bg-cyan-100'
  } else if (value === 2) {
    return 'text-back bg-cyan-200'
  } else if (value === 3) {
    return 'text-back bg-cyan-300'
  } else if (value === 4) {
    return 'text-back bg-cyan-400'
  } else {
    return 'text-back bg-cyan-500'
  }
}
</script>

<style scoped>
.cell-container {
  position: relative;
  padding: 10px;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell-value {
  position: absolute;
  bottom: 20%;
  left: 30%;
  font-size: 1rem;
}

.count-indicator {
  position: absolute;
  top: 0px;
  right: 0px;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
}
</style>
