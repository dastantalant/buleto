<template>
  <BuletoAdminLayout>
    <div class="space-y-5 sm:space-y-6">
      <TimelineChart :title="todayTitle" @rangeChange="handleTimelineUpdate" />
      <div class="p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
        <div class="flex flex-col sm:flex-col md:flex-col items-center gap-4">
          <div class="flex flex-row items-center gap-4">
            <VueDatePicker
              class=""
              v-model="selectedDate"
              :min-date="minDate"
              :max-date="maxDate"
              :enable-time-picker="false"
              :clearable="false"
              locale="ru"
              format="dd.MM.yyyy"
              auto-apply
              vertical
              single
              @update:model-value="updateTitle"
            />
            <button
              @click="fetchData"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Обновить
            </button>
          </div>
        </div>
      </div>
      <div class="p-4 bg-gray-100 rounded-lg dark:bg-gray-800 flex">
        <div class="flex flex-col w-full items-center" id="data">
          <BuletoFlexBoxComponent2
            id="flexbox"
            v-if="chartSeries"
            :title="formatDate(selected)"
            :series="chartSeries"
            class="w-full mt-10"
          />
          <div
            v-for="(item, index) in data"
            :key="index"
            class="flex flex-row items-center gap-2 w-80 p-1 mt-1 mb-1 rounded"
            :class="getCellStyle(item.vc)"
          >
            <div class="ml-3 cell-value flex-grow font-bold">
              {{ `${getCell(item.vc)}` }}
            </div>
            <div class="flex-grow ">
              {{ `${formatTime(item.vd)} ` }}
            </div>
            <div
              class="count-indicator flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs font-semibold rounded-full italic"
              :class="getCellStyle(item.vc)"
            >
              {{ getCount(index, item.vc) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </BuletoAdminLayout>
</template>
<script setup lang="ts">
import BuletoAdminLayout from '@/components/layout/BuletoAdminLayout.vue'
import TimelineChart from '@/components/charts/TimelineChart.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { onMounted, onUpdated, ref } from 'vue'
import { VictoryService } from '@/services/VictoryService.ts'
import type { BetweenJson } from '@/models/response/BetweenJson.ts'
import type { RoundJson } from '@/models/response/RoundJson.ts'
import BuletoFlexBoxComponent2 from '@/components/buleto/BuletoFlexBoxComponent2.vue'

const DAY = 86400000
const minDate = ref<Date>(new Date(1743024643110))
const maxDate = ref<Date>(new Date())
const selected = maxDate.value.getTime() - (maxDate.value.getTime() % DAY)
const selectedDate = ref<Date>(new Date(selected))
const todayTitle = ref<string>(formatDate(selected))
const data = ref<RoundJson[]>([])
const cellCountMap = getMap()
const cellMap = getMap()
const chartSeries = ref<ChartSeries[]>()

interface ChartSeries {
  name: string
  data: number[]
}

function getMap(): Map<number, number> {
  const map = new Map<number, number>()
  for (let i = 0; i < 38; i++) {
    map.set(i, 0)
  }
  return map
}

function resetMap() {
  for (let i = 0; i < 38; i++) {
    cellCountMap.set(i, 0)
    cellMap.set(i, 0)
  }
}

function getCell(victoryCell: number | undefined): number {
  if (victoryCell===undefined) return 0
  return victoryCell === 37 ? 0 : victoryCell
}

function getCount(index: number, victoryCell: number | undefined): number {
  if (index === 0) {
    for (let i = 0; i < 38; i++) {
      cellCountMap.set(i, 0)
    }
  }
  if (victoryCell === undefined) return 0
  if (victoryCell === 37) {
    const count = (cellCountMap.get(0) || 0) + 1
    cellCountMap.set(0, count)
    return count
  }
  const count = (cellCountMap.get(victoryCell) || 0) + 1
  cellCountMap.set(victoryCell, count)
  return count
}

const updateTitle = () => {
  if (selectedDate.value) {
    todayTitle.value = formatDate(selectedDate.value.getTime())
  }
}

const selectedStart = ref<number | null>(null)
const selectedEnd = ref<number | null>(null)

const handleTimelineUpdate = (startMinute: number, endMinute: number) => {
  const selected = selectedDate.value.getTime()
  const offset = selectedDate.value.getTimezoneOffset()
  selectedStart.value = selected + (startMinute + offset) * 60 * 1000
  selectedEnd.value = selected + (endMinute + offset) * 60 * 1000
}

const fetchData = async () => {
  if (!selectedDate.value || selectedStart.value === null || selectedEnd.value === null) return
  resetMap()

  try {
    const response: BetweenJson<RoundJson> = await VictoryService.getLineByBetween(
      selectedStart.value,
      selectedEnd.value,
    )
    data.value = response.data || []
    initFlex()
  } catch (error) {
    console.error('Failed to fetch data:', error)
    data.value = []
  }
}

function initFlex(): void {
  if (data.value.length === 0) return
  for (const item of data.value) {
    const cellValue: number | undefined = item.vc === 37 ? 0 : item.vc
    if (cellValue === undefined) continue
    cellMap.set(cellValue, (cellMap.get(cellValue) || 0) + 1)
  }
  const chartData: number[] = Array.from({ length: 37 }, (_, i) => cellMap.get(i) || 0)
  chartSeries.value = [
    {
      name: 'Кол-во',
      data: chartData,
    },
  ]
}

const formatTime = (timestampMs: number | undefined): string => {
  if (timestampMs === undefined) return '--:--:--'
  const d = new Date(timestampMs)
  let hour = '' + d.getHours()
  let minute = '' + d.getMinutes()
  let second = '' + d.getSeconds()
  if (hour.length < 2) hour = '0' + hour
  if (minute.length < 2) minute = '0' + minute
  if (second.length < 2) second = '0' + second

  return [hour, minute, second].join(':')
}

function formatDate(timestampMs: number | undefined): string {
  if (timestampMs === undefined) return '--.--.----'
  const d = new Date(timestampMs)
  let day = '' + d.getDate()
  let month = '' + (d.getMonth() + 1)
  const year = d.getFullYear()

  if (day.length < 2) day = '0' + day
  if (month.length < 2) month = '0' + month

  return [day, month, year].join('.')
}

function getCellStyle(value: number | undefined): string {
  if (value === undefined) return 'text-black bg-cyan-50 dark:text-gray-900'
  const count = cellCountMap.get(value === 37 ? 0 : value)
  if (count === 0) {
    return 'text-black bg-cyan-50 dark:text-gray-900'
  } else if (count === 1) {
    return 'text-black bg-cyan-100 dark:text-gray-900'
  } else if (count === 2) {
    return 'text-black bg-cyan-200 dark:text-gray-900'
  } else if (count === 3) {
    return 'text-black bg-cyan-300 dark:text-gray-900'
  } else if (count === 4) {
    return 'text-black bg-cyan-400 dark:text-gray-900'
  } else {
    return 'text-black bg-cyan-500 dark:text-gray-900'
  }
}

// const formatDateTime = (timestampMs: number | null): string => {
//   if (timestampMs === null) return '--.--.----, --:--:--'
//   const d = new Date(timestampMs)
//   let day = '' + d.getDate()
//   let month = '' + (d.getMonth() + 1)
//   const year = d.getFullYear()
//   let hour = '' + d.getHours()
//   let minute = '' + d.getMinutes()
//   let second = '' + d.getSeconds()
//
//   if (day.length < 2) day = '0' + day
//   if (month.length < 2) month = '0' + month
//   if (hour.length < 2) hour = '0' + hour
//   if (minute.length < 2) minute = '0' + minute
//   if (second.length < 2) second = '0' + second
//
//   return [day, month, year].join('.') + ', ' + [hour, minute, second].join(':')
// }

onUpdated(() => {
  document.getElementById('flexbox')
})
onMounted(() => {
  resetMap()
})
</script>

<style scoped>
#flexbox {
  @apply sticky top-20 left-0 z-10 w-full;
}

.cell-value {
  @apply overflow-hidden text-ellipsis;
}
</style>
