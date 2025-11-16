<template>
  <buleto-admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <div class="space-y-5 sm:space-y-6">
          <ComponentCard title="">
            <Alert
              :variant="lastRound ? 'success' : 'error'"
              :title="lastRoundTitle"
              :message="lastRoundMessage"
              :showLink="false"
            />
            <Button @click="fetchLastRound" size="sm" variant="primary"> Обновить</Button>
          </ComponentCard>
        </div>
      </div>
    </div>
  </buleto-admin-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BuletoAdminLayout from '../components/layout/BuletoAdminLayout.vue'
import Alert from '../components/ui/Alert.vue'
import ComponentCard from '../components/common/ComponentCard.vue'
import { RoundService } from '../services/RoundService.ts'
import type { RoundJson } from '../models/response/RoundJson.ts'
import Button from '../components/ui/Button.vue'

const lastRound = ref<RoundJson | null>(null)
const lastRoundTitle = ref<string>('')
const lastRoundMessage = ref<string>('')

function formatTimestamp(timestamp: number | string | null): string {
  if (!timestamp) return 'Н/Д'
  const d = new Date(timestamp)
  let day = '' + d.getDate()
  let month = '' + (d.getMonth() + 1)
  const year = d.getFullYear()
  let hour = '' + d.getHours()
  let minute = '' + d.getMinutes()
  const second = '' + d.getSeconds()
  if (day.length < 2) day = '0' + day
  if (month.length < 2) month = '0' + month
  if (hour.length < 2) hour = '0' + hour
  if (minute.length < 2) minute = '0' + minute
  return [day, month, year].join('.') + ', ' + [hour, minute, second].join(':')
}

function formatMessage(round: RoundJson | null): string {
  if (!round) return 'Данные отсутствуют'
  const victoryValue: string = round.vv ? round.vv.toString() : '00'
  // const bdv: string = round.bv ? (round.bv+'').slice(0, 1) + '.' + (round.bv+'').slice(1) : '0.0'
  // const edv: string = round.tv ? (round.tv+'').slice(0, 1) + '.' + (round.tv+'').slice(1) : '0.0'
  const vdv: string = victoryValue.slice(0, 1) + '.' + victoryValue.slice(1)

  return `${round.vc} - ${vdv}`
}

async function fetchLastRound() {
  try {
    lastRound.value = await RoundService.getLast()
    if (lastRound.value) {
      lastRoundTitle.value = formatTimestamp(lastRound.value.vd || 0)
      lastRoundMessage.value = formatMessage(lastRound.value)
    } else {
      lastRoundTitle.value = 'Нет данных'
      lastRoundMessage.value = 'Последний раунд не найден'
    }
  } catch (error) {
    console.error('Ошибка при загрузке последнего раунда:', error)
    lastRoundTitle.value = 'Ошибка'
    lastRoundMessage.value = 'Не удалось загрузить данные'
  }
}

onMounted(() => {
  fetchLastRound()
})
</script>
