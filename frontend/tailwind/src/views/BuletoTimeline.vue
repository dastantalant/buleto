<template>
  <BuletoAdminLayout>

    <div class="flex justify-center items-center space-x-3 my-4">
      <button
        @click="nextPage"
        :disabled="isLastPage || loading"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
        Предыдущая
      </button>
      <span class="text-gray-700 dark:text-gray-300"> Страница {{ page + 1 }} </span>
      <button
        @click="previousPage"
        :disabled="page <= 0 || loading"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
        Следующая
      </button>
    </div>

    <div class="space-y-5 sm:space-y-6">
      <div v-if="loading && rounds.length === 0" class="flex justify-center items-center h-64">
        <span class="loading loading-spinner loading-lg text-gray-500"></span>
      </div>
      <div v-else-if="error" class="text-red-500 text-center py-10">
        {{ error }}
      </div>
      <div v-else-if="!loading && rounds.length === 0" class="text-center text-gray-500 py-10">
        Нет данных для отображения.
      </div>
      <ComponentCard
        v-for="(round, index) in rounds"
        :key="round.round_id"
        :title="getRoundTitle(round)"
      >
        <div class="w-full max-w-full overflow-x-auto custom-scrollbar dark:bg-gray-900">
          <div class="w-full -ml-5 min-w-[650px] xl:min-w-full pl-2">
            <VueApexCharts
              type="line"
              height="310"
              :options="getChartOptions(round)"
              :series="getSeries(round)"
            />
          </div>
        </div>
      </ComponentCard>
    </div>

  </BuletoAdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BuletoAdminLayout from '../components/layout/BuletoAdminLayout.vue'
import ComponentCard from '../components/common/ComponentCard.vue'
import VueApexCharts from 'vue3-apexcharts'
import { TimelineService } from '../services/TimelineService'
import type { ApexOptions } from 'apexcharts'
import type { RoundJson } from '../models/response/RoundJson.ts'

const rounds = ref<RoundJson[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const page = ref(0)
const size = ref(10)
const isLastPage = ref(false)

const fetchData = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await TimelineService.getTimelineData(page.value, size.value)

    if (data.data) {
      rounds.value = data.data
      isLastPage.value = data.data.length < size.value
    } else {
      rounds.value = []
      isLastPage.value = true
    }
  } catch (err) {
    error.value = 'Ошибка загрузки данных.'
    console.error('Fetch error:', err)
    rounds.value = []
    isLastPage.value = true
  } finally {
    loading.value = false
  }
}
const nextPage = () => {
  if (!isLastPage.value && !loading.value) {
    page.value++
    fetchData()
  }
}
const previousPage = () => {
  if (page.value > 0 && !loading.value) {
    page.value--
    fetchData()
  }
}
const changePageSize = () => {
  page.value = 0 // Сбрасываем на первую страницу при изменении размера
  fetchData()
}

const getSeries = (round: RoundJson) => {
  const allDataPoints =
    round.timeline?.map((point) => ({
      x: point.line,
      y: point.wave,
    })) ?? []
  return [
    {
      name: 'Wave',
      data: allDataPoints,
    },
  ]
}

const getChartOptions = (round: RoundJson): ApexOptions => {
  const timelineTimes = round.timeline?.map((p) => p.line) ?? []
  const annotationTimes = [round.sd, round.bcd, round.ed].filter((t) => t !== undefined) as number[]
  const allTimes = [...timelineTimes, ...annotationTimes]

  let minTime: number | undefined
  let maxTime: number | undefined

  if (allTimes.length > 0) {
    minTime = Math.min(...allTimes)
    maxTime = Math.max(...allTimes)
    const padding = (maxTime - minTime) * 0.05
    minTime = minTime - padding
    maxTime = maxTime + padding
  } else {
    minTime = new Date().getTime() - 60000
    maxTime = new Date().getTime()
  }

  return {
    chart: {
      type: 'line',
      height: 310,
      zoom: { enabled: false, type: 'x' },
      toolbar: {
        show: false,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      // curve: 'smooth',
      width: 4,
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 10,
      min: minTime,
      max: maxTime,
      labels: {
        datetimeUTC: false,
        format: 'HH:mm:ss',
      },
      title: {
        text: 'Время',
      },
    },
    yaxis: {
      title: {
        text: 'Wave',
      },
    },
    annotations: {
      xaxis: [
        ...(round.sd !== undefined
          ? [
            {
              x: round.sd,
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: { color: '#fff', background: '#00E396' },
                text: '',
                orientation: 'horizontal',
              },
            },
          ]
          : []),
        ...(round.bcd !== undefined
          ? [
            {
              x: round.bcd,
              borderColor: '#FEB019',
              label: {
                borderColor: '#FEB019',
                style: { color: '#fff', background: '#FEB019' },
                text: '',
                orientation: 'horizontal',
              },
            },
          ]
          : []),
        ...(round.ed !== undefined
          ? [
            {
              x: round.ed,
              borderColor: '#FF4560',
              label: {
                borderColor: '#FF4560',
                text: `${round.vc ?? 'N/A'}`,
                style: { color: '#000', background: '#fff' },
                orientation: 'horizontal',
              },
            },
          ]
          : []),
      ],
    },
    tooltip: {
      x: {
        format: 'dd MMM HH:mm:ss',
      },
    },
    fill: {
      // type: 'gradient',
      // gradient: {
      //   shade: 'dark',
      //   type: 'none',
      // },
    },
    grid: {
      // borderColor: '#e7e7e7',
      // row: {
      //   colors: ['#f3f3f3', 'transparent'],
      //   opacity: 0.5,
      // },
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
  }
}

const getRoundTitle = (round: RoundJson): string => {
  let title = `Раунд ${round.round_id} `
  if (round.sd !== undefined) {
    title += `от ${formatDate(round.sd)}`
  }

  if (round.vc !== undefined) {
    title += ` (${round.vc})`
  }

  return title
}

const formatDate = (timestamp: number): string => {
  const d = new Date(timestamp)
  // Используем toLocaleString для более удобного форматирования даты и времени
  // Можно настроить опции для нужного формата
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    // hour: '2-digit', // Можно добавить время, если нужно
    // minute: '2-digit',
  })
  /* Старый вариант:
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [day, month, year].join('-')
  */
}

onMounted(() => {
  fetchData()
})
</script>
