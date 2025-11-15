<template>
  <BuletoAdminLayout>
    <div class="space-y-5 sm:space-y-6 ">
      <BuletoBarChartOne :title="chartTitle" :chart-options="chartOptions" :series="chartSeries" />
      <BuletoRoundFlexboxComponent
        :title="chartTitle"
        :series="chartSeries"
      />
      <div class="p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
        <div class="flex flex-col items-center gap-4 ">
          <div class="flex flex-row items-center gap-4">
            <VueDatePicker
              v-model="fromDate"
              :min-date="minDate"
              :max-date="maxDate"
              single
              is-24hour
              auto-apply
              time-picker-inline
              vertical
              prevent-min-max-navigation
              locale="ru"
              format="dd.MM.yyyy HH:mm"
            />
            <VueDatePicker
              v-model="toDate"
              :min-date="minDate"
              :max-date="maxDate"
              single
              is-24hour
              auto-apply
              time-picker-inline
              vertical
              prevent-min-max-navigation
              locale="ru"
              format="dd.MM.yyyy HH:mm"
            />
          </div>
          <button
            @click="updateDateRange"
            class="items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Обновить
          </button>
        </div>
      </div>
    </div>
  </BuletoAdminLayout>
</template>

<script setup lang="ts">
import BuletoAdminLayout from '@/components/layout/BuletoAdminLayout.vue'
import BuletoBarChartOne from '@/components/charts/BarChart/BuletoBarChartOne.vue'
import { onMounted, ref } from 'vue'
import { VictoryService } from '@/services/VictoryService.ts'
import type { BetweenJson } from '@/models/response/BetweenJson.ts'
import type { VictoryJson } from '@/models/response/VictoryJson.ts'
import type { ApexOptions } from 'apexcharts'
import BuletoRoundFlexboxComponent from '@/components/buleto/BuletoRoundFlexboxComponent.vue'

const DAY = 86400000
const today = Date.now() - DAY
const minDate = ref<Date>(new Date(1743024643110))
const maxDate = ref<Date>(new Date(Date.now()))
const from = ref<number>(today - (today % DAY))
const to = ref<number>(today - (today % DAY) + DAY)
const fromDate = ref<Date>(new Date(from.value))
const toDate = ref<Date>(new Date(to.value))
const chartTitle = ref<string>('Chart')
const cellMap = ref<Map<number, number>>(getMap())
const cells = ref<Array<number>>(Array.from(cellMap.value.keys()))

function getMap(): Map<number, number> {
  const map = new Map<number, number>()
  for (let i = 0; i < 37; i++) {
    map.set(i, 0)
  }
  return map
}

function getTitle(count: number): string {
  // const fromString = formatDate(from.value)
  // const toString = formatDate(to.value)
  const diff = to.value - from.value
  const hour = Math.floor(diff / 1000 / 60 / 60)
  // return `от [${fromString}] до [${toString}] (Всего: ${count} раундов за ${hour} часов)`
  return `Всего: ${count} раундов за ${hour} часов`
}

function formatDate(timestamp: number): string {
  const d = new Date(timestamp)
  let day = '' + d.getDate()
  let month = '' + (d.getMonth() + 1)
  const year = d.getFullYear()
  let hour = '' + d.getHours()
  let minute = '' + d.getMinutes()

  if (day.length < 2) day = '0' + day
  if (month.length < 2) month = '0' + month
  if (hour.length < 2) hour = '0' + hour
  if (minute.length < 2) minute = '0' + minute

  return [day, month, year].join('.') + ', ' + [hour, minute].join(':')
}

function updateDateRange() {
  if (fromDate.value && toDate.value) {
    from.value = fromDate.value.getTime()
    to.value = toDate.value.getTime()
    fetchData()
  }
}

const chartOptions = ref<ApexOptions>({
  chart: {
    // height: 700,
    zoom: { enabled: false },
    toolbar: { show: true },
  },
  plotOptions: {
    bar: {
      // horizontal: true,
      borderRadius: 5,
      columnWidth: '70%',
      dataLabels: {
        position: 'top',
      },
    },
  },
  dataLabels: {
    enabled: true,
    offsetY: -20,
    // offsetX: 10,
    style: {
      fontSize: '14px',
      colors: ['#018ffb'],
    },
  },
  xaxis: {
    categories: cells,
    tooltip: {
      enabled: true,
    },
  },
})

const chartSeries = ref<Array<{ name: string; data: number[] }>>([])

const fetchData = async () => {
  try {
    const data: BetweenJson<VictoryJson> = await VictoryService.getByBetween(from.value, to.value)
    cellMap.value.forEach((value: number, key: number) => {
      cellMap.value.set(key, 0)
    })
    let count = 0
    cellMap.value.forEach((value: number, key: number) => {
      data.data?.forEach((item) => {
        if (item.c === key) {
          cellMap.value.set(key, item.count)
          count = count + item.count
        }
        if (item.c === 37 && key === 36) {
          const zero = cellMap.value.get(0)
          cellMap.value.set(0, (zero || 0) + item.count)
          count = count + item.count
        }
      })
    })
    chartSeries.value = [
      {
        name: 'Cell',
        data: Array.from(cellMap.value.values()),
      },
    ]
    chartTitle.value = getTitle(count)
  } catch (error) {
    console.error('Не удалось получить данные:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style>
.red-color {
  color: red;
}
</style>
