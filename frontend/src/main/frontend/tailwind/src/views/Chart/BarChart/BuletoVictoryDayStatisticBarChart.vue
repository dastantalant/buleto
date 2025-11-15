<template>
  <BuletoAdminLayout>
    <div class="space-y-5 sm:space-y-6">
      <div class="p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
        <div class="flex flex-col sm:flex-row items-center gap-4">
          <VueDatePicker
            class=""
            v-model="selectedDate"
            :min-date="minDate"
            :max-date="maxDate"
            :start-date="startDate"
            :enable-time-picker="false"
            :clearable="false"
            locale="ru"
            format="dd.MM.yyyy"
            auto-apply
            vertical
            single
          />
          <button
            @click="fetchDayStatistics"
            :disabled="!selectedDate || isLoading"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">Загрузка...</span>
            <span v-else>Обновить</span>
          </button>
        </div>
      </div>
      <div v-if="isLoading" class="text-center text-gray-500 mt-10 dark:text-gray-400">
        Загрузка данных...
      </div>
      <div
        v-else-if="!isLoading && chartDataList.length === 0"
        class="text-center text-gray-500 mt-10 dark:text-gray-400"
      >
        Нет данных за выбранный день ({{ formatDate(selectedDate) }}).
      </div>
      <div v-else class="space-y-8">
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Статистика за день: {{ formatDate(selectedDate) }}
          </h2>
          <div
            class="overflow-x-auto custom-scrollbar relative shadow-md sm:rounded-lg mb-8 border border-gray-200 dark:border-gray-700"
            style="max-height: 75vh"
          >
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse"
              style="min-width: 800px"
            >
              <thead class="text-xs text-gray-700 uppercase sticky-header">
                <tr class="text-center">
                  <th scope="col" class="sticky-col header-cell p-1 whitespace-nowrap"></th>
                  <th
                    v-for="header in tableHeaders"
                    :key="header.key"
                    scope="col"
                    class="header-cell bg-cyan-500 p-1 font-bold text-white whitespace-nowrap time-header text-center"
                  >
                    <span>{{ header.label }}</span>
                  </th>
                  <th
                    scope="col"
                    class="sticky-col-last header-cell p-1 text-center font-bold whitespace-nowrap"
                  ></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, rowIndex) in tableRows"
                  :key="row.cell"
                  class="text-center border-b data-row"
                >
                  <th
                    scope="row"
                    class="bg-cyan-500 p-1 font-bold text-white whitespace-nowrap sticky-col data-cell"
                  >
                    {{ row.cell }}
                  </th>
                  <td
                    v-for="header in tableHeaders"
                    :key="header.key"
                    class="data-cell p-1 text-center"
                    :class="{
                      'font-semibold text-blue-600 dark:text-black': row[header.key] > 0,
                    }"
                  >
                    <div :class="getCellStyle(row[header.key])">
                      {{ row[header.key] > 0 ? row[header.key] : '-' }}
                    </div>
                  </td>
                  <td
                    class="bg-cyan-500 p-1 font-bold text-white whitespace-nowrap sticky-col-last data-cell text-center"
                  >
                    {{ row.total }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Почасовая статистика
          </h3>
        </div>
        <div v-for="chartData in chartDataList" :key="chartData.line">
          <BuletoRoundFlexboxComponent
            :title="chartData.title"
            :chart-options="chartData.options"
            :series="chartData.series"
          />
        </div>
      </div>
    </div>
  </BuletoAdminLayout>
</template>

<script setup lang="ts">
import BuletoAdminLayout from '@/components/layout/BuletoAdminLayout.vue'
import { onMounted, ref, computed } from 'vue'
import { VictoryService } from '@/services/VictoryService.ts'
import type { BetweenJson } from '@/models/response/BetweenJson.ts'
import type { VictoryJson } from '@/models/response/VictoryJson.ts'
import type { VictoryStatisticJson } from '@/models/response/VictoryStatisticJson.ts'
import { type ApexOptions } from 'apexcharts'
import BuletoRoundFlexboxComponent from '@/components/buleto/BuletoRoundFlexboxComponent.vue'

const DAY = 86400000
const HOUR = 3600000

const isLoading = ref<boolean>(false)
const minDate = ref<Date>(new Date(1743024643110))
const maxDate = ref<Date>(new Date())
const startDate = ref<Date>(new Date())
const selectedDate = ref<Date>(new Date())

type ChartSeries = {
  name: string
  data: number[]
}
const chartDataList = ref<
  Array<{
    line: number
    title: string
    options: ApexOptions
    series: ChartSeries[]
  }>
>([])

const cells = ref<Array<number>>(Array.from({ length: 37 }, (_, i) => i))
const tableHeaders = ref<Array<{ key: string; label: string }>>([])

interface TableRowData {
  cell: number
  total: number

  [key: string]: number
}

const tableRows = ref<Array<TableRowData>>([])
const cellCountsByLine = ref<Map<number, Map<number, number>>>(new Map())
const fetchDayStatistics = async () => {
  if (!selectedDate.value) {
    console.warn('Дата не выбрана.')
    chartDataList.value = []
    tableHeaders.value = []
    tableRows.value = []
    cellCountsByLine.value.clear()
    return
  }
  isLoading.value = true
  chartDataList.value = []
  tableHeaders.value = []
  tableRows.value = []
  cellCountsByLine.value.clear()
  const date = new Date(selectedDate.value)
  date.setHours(0, 0, 0, 0)
  const timezone = date.getTime()
  const start = timezone - (timezone % DAY) + date.getTimezoneOffset() * 60 * 1000 + DAY
  const end = start + DAY
  try {
    const response: BetweenJson<VictoryStatisticJson<VictoryJson>> =
      await VictoryService.getStatisticByBetween(start, end)
    const processedCharts: typeof chartDataList.value = []
    const linesMap = new Map<number, VictoryStatisticJson<VictoryJson>>()
    if (response.data && response.data.length > 0) {
      const filteredData = response.data.filter((statItem) => {
        return statItem.line >= start && statItem.line < end
      })
      filteredData.sort((a, b) => a.line - b.line)
      filteredData.forEach((item) => linesMap.set(item.line, item))
      linesMap.forEach((statItem) => {
        const lineTimestamp = statItem.line
        const cellMapForHour = getInitializedCellMap()
        let currentLineTotalCount = 0
        statItem.cls.forEach((victoryItem: VictoryJson) => {
          const cellNumber = victoryItem.c
          const count = victoryItem.count
          if (cellNumber >= 0 && cellNumber <= 36) {
            cellMapForHour.set(cellNumber, (cellMapForHour.get(cellNumber) || 0) + count)
          } else if (cellNumber === 37) {
            cellMapForHour.set(0, (cellMapForHour.get(0) || 0) + count)
          }
          currentLineTotalCount += count
        })
        cellCountsByLine.value.set(lineTimestamp, cellMapForHour)
        const seriesData: ChartSeries[] = [
          {
            name: 'Выпадений',
            data: Array.from(cellMapForHour.values()),
          },
        ]
        const chartTitle = generateChartTitle(lineTimestamp, currentLineTotalCount)
        processedCharts.push({
          line: lineTimestamp,
          title: chartTitle,
          options: JSON.parse(JSON.stringify(baseChartOptions.value)),
          series: seriesData,
        })
      })
      const sortedLines = Array.from(linesMap.keys()).sort((a, b) => a - b)
      tableHeaders.value = sortedLines.map((line) => ({
        key: String(line),
        label: formatHour(line),
      }))
      const rows: Array<TableRowData> = []
      for (let cell = 0; cell <= 36; cell++) {
        const row: TableRowData = {
          cell: cell,
          total: 0,
        }
        let totalForCell = 0
        sortedLines.forEach((line) => {
          const count = cellCountsByLine.value.get(line)?.get(cell) ?? 0
          row[String(line)] = count
          totalForCell += count
        })
        row.total = totalForCell
        rows.push(row)
      }
      tableRows.value = rows
    } else {
      console.log(`API не вернул данных для выбранного дня: ${formatDate(selectedDate.value)}`)
    }

    chartDataList.value = processedCharts
  } catch (error) {
    console.error('Не удалось получить данные статистики по дням:', error)
    chartDataList.value = []
    tableHeaders.value = []
    tableRows.value = []
    cellCountsByLine.value.clear()
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDayStatistics()
})

const baseChartOptions = computed<ApexOptions>(() => ({
  chart: {
    height: 350,
    type: 'bar',
    zoom: { enabled: false },
    toolbar: { show: true },
    animations: {
      enabled: false,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      dataLabels: {
        position: 'top',
      },
      columnWidth: '85%',
    },
  },
  dataLabels: {
    enabled: true,
    offsetY: -18,
    style: {
      fontSize: '10px',
      colors: ['#304758'],
    },
    formatter: function (val: number) {
      return val > 0 ? val.toString() : ''
    },
  },
  xaxis: {
    categories: cells.value,
    tooltip: {
      enabled: true,
    },
    labels: {
      style: {
        fontSize: '10px',
      },
      rotate: 0,
    },
    tickPlacement: 'on',
    axisBorder: {},
    axisTicks: {},
  },
  yaxis: {
    title: {
      text: 'Кол-во',
      style: {
        fontSize: '11px',
        fontWeight: 500,
      },
    },
    labels: {
      style: {
        fontSize: '10px',
      },
      formatter: function (val: number) {
        return Math.floor(val) === val ? val.toString() : ''
      },
    },
    tickAmount: 5,
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return val + ' раз(а)'
      },
    },
  },
  grid: {
    padding: {
      right: 10,
      left: 5,
    },
    borderColor: '#e5e7eb',
  },
}))

function getInitializedCellMap(): Map<number, number> {
  const map = new Map<number, number>()
  for (let i = 0; i <= 36; i++) {
    map.set(i, 0)
  }
  return map
}

const getCellStyle = (value: number) => {
  if (value === 0) return
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

function formatDate(timestamp: Date | number | undefined): string {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  let day = '' + date.getDate()
  let month = '' + (date.getMonth() + 1)
  const year = date.getFullYear()
  if (day.length < 2) day = '0' + day
  if (month.length < 2) month = '0' + month
  return [day, month, year].join('.')
}

function formatHourRange(timestamp: number): string {
  const d = new Date(timestamp)
  const startHour = ('0' + d.getHours()).slice(-2)
  const startMinute = '00'
  const nextHourDate = new Date(timestamp + HOUR)
  const nextHour = ('0' + nextHourDate.getHours()).slice(-2)
  const nextMinute = '00'
  return `${startHour}:${startMinute}-${nextHour}:${nextMinute}`
}

function formatHour(timestamp: number): string {
  const d = new Date(timestamp)
  return ('0' + d.getHours()).slice(-2)
}

function generateChartTitle(lineTimestamp: number, totalCount: number): string {
  const timeString = formatHourRange(lineTimestamp)
  return `${timeString} (Всего: ${totalCount})`
}
</script>

<style scoped>
.overflow-x-auto {
  max-height: 75vh;
}

.header-cell,
.data-cell {
  @apply align-middle p-2;
  border: 1px solid #e5e7eb;
}

.dark .header-cell {
  background-color: #162042;
}

.dark .header-cell,
.dark .data-cell {
  border-color: #4b5563;
}

.sticky-header th {
  @apply sticky top-0 z-20;
  background-color: #90a1b9;
}

.dark .sticky-header th {
  background-color: #162042;
}

.sticky-col {
  @apply sticky left-0 z-10;
}

.data-row .sticky-col {
  background-color: #90a1b9;
}

.dark .data-row .sticky-col {
  background-color: #162042;
}

.data-row.bg-gray-50 .sticky-col {
  background-color: #90a1b9;
}

.dark .data-row.dark\:bg-gray-750 .sticky-col {
  background-color: #162042;
}

.sticky-header .sticky-col {
  @apply z-30;
}

.sticky-col-last {
  @apply sticky right-0 z-10;
  background-color: #90a1b9;
}

.dark .sticky-col-last {
  background-color: #162042;
}

.sticky-header .sticky-col-last {
  @apply z-20;
}

.data-row .sticky-col-last {
  color: white;
  background-color: #90a1b9;
}

.dark .data-row .sticky-col-last {
  color: white;
  background-color: #162042;
}

.time-header {
  white-space: nowrap;
  @apply pt-3 pb-3;
  min-width: 30px;
}

.dark .dark\:bg-gray-750 {
  background-color: #2b3648;
}
</style>
