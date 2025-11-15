// components/charts/TimelineChart.vue
<template>
  <ComponentCard :title="title || 'Выбор временного интервала'">
    <div
      class=" mx-auto my-[70px] mb-[50px] relative pt-[10px]"
    >
      <div
        ref="verticalLabelsContainerRef"
        class="absolute top-[-50px] left-0 w-full h-[40px] pointer-events-none z-20 overflow-hidden select-none"
      />
      <div
        ref="timelineRef"
        class="h-[10px] bg-gray-300 dark:bg-gray-600 rounded-[5px] relative cursor-pointer touch-none"
        @click="onTimelineClick"
      >
        <div
          ref="progressRef"
          class="h-full bg-blue-600 dark:bg-blue-500 rounded-[5px] absolute top-0 cursor-move select-none touch-none min-w-[5px]"
          :style="progressStyle"
          @pointerdown="onPointerDown"
          @dragstart.prevent
        >
          <div
            ref="handleLeftRef"
            class="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-5 bg-blue-800 dark:bg-blue-400 border border-blue-900 dark:border-blue-300 rounded-[3px] cursor-ew-resize z-10"
            @pointerdown="onPointerDown"
            @dragstart.prevent
          />
          <div
            ref="handleRightRef"
            class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-5 bg-blue-800 dark:bg-blue-400 border border-blue-900 dark:border-blue-300 rounded-[3px] cursor-ew-resize z-10"
            @pointerdown="onPointerDown"
            @dragstart.prevent
          />
        </div>
      </div>

      <div
        ref="timeLabelsRef"
        class="mt-2 absolute top-[15px] left-0 w-full h-5 text-xs text-gray-500 dark:text-gray-400 pointer-events-none select-none overflow-hidden"
      />
    </div>
    <div class="mt-2.5 text-center font-sans text-sm text-gray-700 dark:text-gray-300">
      {{ `${formattedStartTime} - ${formattedEndTime} (${intervalMinute} минут)` }}
    </div>
  </ComponentCard>
</template>
<script lang="ts">
const TOTAL_MINUTES_IN_DAY = 24 * 60
const MINUTES_IN_HOUR = 60
const DEFAULT_START_MINUTE = 0
const DEFAULT_END_MINUTE = Math.floor(0.3 * TOTAL_MINUTES_IN_DAY)
const DEFAULT_MIN_RANGE_MINUTES = 5
</script>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ComponentCard from '@/components/common/ComponentCard.vue'

interface Props {
  title: string
  initialStartMinute?: number
  initialEndMinute?: number
  minRangeMinutes?: number
}
const props = withDefaults(defineProps<Props>(), {
  initialStartMinute: DEFAULT_START_MINUTE,
  initialEndMinute: DEFAULT_END_MINUTE,
  minRangeMinutes: DEFAULT_MIN_RANGE_MINUTES,
})

const emit = defineEmits<{
  (e: 'rangeChange', startMinute: number, endMinute: number): void
}>()

const timelineRef = ref<HTMLElement | null>(null)
const progressRef = ref<HTMLElement | null>(null)
const handleLeftRef = ref<HTMLElement | null>(null)
const handleRightRef = ref<HTMLElement | null>(null)
const timeLabelsRef = ref<HTMLElement | null>(null)
const verticalLabelsContainerRef = ref<HTMLElement | null>(null)

const validatedInitialStart = Math.max(
  0,
  Math.min(props.initialStartMinute, TOTAL_MINUTES_IN_DAY - props.minRangeMinutes),
)
const validatedInitialEnd = Math.max(
  validatedInitialStart + props.minRangeMinutes,
  Math.min(props.initialEndMinute, TOTAL_MINUTES_IN_DAY),
)

const selectionStartMinute = ref<number>(validatedInitialStart)
const selectionEndMinute = ref<number>(validatedInitialEnd)

const isDragging = ref(false)
const isResizingLeft = ref(false)
const isResizingRight = ref(false)

let initialPointerX = 0
let initialStartMinuteInternal = 0
let initialEndMinuteInternal = 0
let currentTimelineRect: DOMRect | null = null

const formattedStartTime = computed(() => formatMinuteToHM(selectionStartMinute.value))
const formattedEndTime = computed(() => formatMinuteToHM(selectionEndMinute.value))
const intervalMinute = computed(() =>
  Math.round(selectionEndMinute.value - selectionStartMinute.value),
)

const progressStyle = computed(() => {
  const startPercent = minuteToPercent(selectionStartMinute.value)
  const endPercent = minuteToPercent(selectionEndMinute.value)
  const widthPercent = Math.max(0, endPercent - startPercent)
  const minWidthPx = 5
  const minWidthPercent = currentTimelineRect?.width
    ? (minWidthPx / currentTimelineRect.width) * 100
    : 0
  return {
    left: `${startPercent}%`,
    width: `${Math.max(widthPercent, minWidthPercent)}%`,
  }
})

function minuteToPercent(minute: number): number {
  const percent = (minute / TOTAL_MINUTES_IN_DAY) * 100
  return Math.max(0, Math.min(100, percent))
}

function percentToMinute(percent: number): number {
  const minute = (percent / 100) * TOTAL_MINUTES_IN_DAY
  return Math.round(Math.max(0, Math.min(TOTAL_MINUTES_IN_DAY, minute)))
}

function formatMinuteToHM(minute: number): string {
  if (minute === null || minute === undefined) return '--:--'
  const totalMinutes = Math.round(minute) % TOTAL_MINUTES_IN_DAY
  const hours = Math.floor(totalMinutes / MINUTES_IN_HOUR)
  const mins = totalMinutes % MINUTES_IN_HOUR

  if (minute === TOTAL_MINUTES_IN_DAY) return '24:00'

  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

function createTimeLabels() {
  const container = timeLabelsRef.value
  if (!container || !currentTimelineRect) return
  container.innerHTML = ''
  const timelineWidth = currentTimelineRect.width

  const minSpacingPx = 40
  const maxLabels = Math.floor(timelineWidth / minSpacingPx)
  const idealStepHours = Math.max(1, Math.ceil(24 / maxLabels))
  const labelStepMinutes = idealStepHours * MINUTES_IN_HOUR

  const labelStart = document.createElement('div')
  labelStart.className = 'absolute top-0 left-0 translate-x-0 whitespace-nowrap'
  labelStart.textContent = formatMinuteToHM(0)
  container.appendChild(labelStart)

  for (let minute = labelStepMinutes; minute < TOTAL_MINUTES_IN_DAY; minute += labelStepMinutes) {
    const percent = minuteToPercent(minute)
    if (percent < 5 || percent > 95) continue

    const label = document.createElement('div')
    label.className = 'absolute top-0 -translate-x-1/2 whitespace-nowrap'
    label.style.left = `${percent}%`
    label.textContent = formatMinuteToHM(minute)
    container.appendChild(label)
  }
  const labelEnd = document.createElement('div')
  labelEnd.className = 'absolute top-0 right-0 translate-x-0 whitespace-nowrap'
  labelEnd.style.left = '100%'
  labelEnd.style.transform = 'translateX(-100%)'
  labelEnd.textContent = formatMinuteToHM(TOTAL_MINUTES_IN_DAY)
  container.appendChild(labelEnd)
}

function createVerticalHourLabels() {
  const container = verticalLabelsContainerRef.value
  if (!container) return
  container.innerHTML = ''

  for (let minute = MINUTES_IN_HOUR; minute < TOTAL_MINUTES_IN_DAY; minute += MINUTES_IN_HOUR) {
    const percent = minuteToPercent(minute)
    const label = document.createElement('div')
    label.className = `
      absolute bottom-0 -translate-x-1/2
      [writing-mode:sideways-lr] origin-center-bottom
      text-[11px] font-semibold text-gray-600 dark:text-gray-400
      bg-gray-200/70 dark:bg-gray-700/70 px-0.5 py-1 rounded-[2px]
      select-none whitespace-nowrap
    `
    label.style.left = `${percent}%`
    label.textContent = formatMinuteToHM(minute)
    container.appendChild(label)
  }
}

function updateSelectionAndEmit(newStartMinute: number, newEndMinute: number) {
  let start = Math.round(newStartMinute)
  let end = Math.round(newEndMinute)

  if (start > end) {
    ;[start, end] = [end, start]
  }

  const minRange = props.minRangeMinutes
  if (end - start < minRange) {
    if (isResizingLeft.value) {
      end = start + minRange
    } else {
      start = end - minRange
    }
  }

  start = Math.max(0, start)
  end = Math.min(TOTAL_MINUTES_IN_DAY, end)

  if (end - start < minRange) {
    if (start === 0) {
      end = Math.min(minRange, TOTAL_MINUTES_IN_DAY)
    }
    else if (end === TOTAL_MINUTES_IN_DAY) {
      start = Math.max(0, TOTAL_MINUTES_IN_DAY - minRange)
    }
    else {
      end = start + minRange;
    }
  }
  start = Math.max(0, start)
  end = Math.min(TOTAL_MINUTES_IN_DAY, end)

  let changed = false
  if (selectionStartMinute.value !== start) {
    selectionStartMinute.value = start
    changed = true
  }
  if (selectionEndMinute.value !== end) {
    selectionEndMinute.value = end
    changed = true
  }

  if (changed) {
    emit('rangeChange', selectionStartMinute.value, selectionEndMinute.value)
  }
}

function getPointerPercent(clientX: number): number | null {
  if (!currentTimelineRect || currentTimelineRect.width === 0) return null
  const percent = ((clientX - currentTimelineRect.left) / currentTimelineRect.width) * 100
  return Math.max(0, Math.min(100, percent))
}

function onPointerDown(e: PointerEvent) {
  if (e.button !== 0 || !timelineRef.value) return
  const target = e.target as HTMLElement

  if (
    target !== handleLeftRef.value &&
    target !== handleRightRef.value &&
    target !== progressRef.value
  ) {
    return
  }

  e.stopPropagation()

  currentTimelineRect = timelineRef.value.getBoundingClientRect()
  if (!currentTimelineRect) return

  initialPointerX = e.clientX
  initialStartMinuteInternal = selectionStartMinute.value
  initialEndMinuteInternal = selectionEndMinute.value

  if (target === handleLeftRef.value) {
    isResizingLeft.value = true
    document.body.style.cursor = 'ew-resize'
  } else if (target === handleRightRef.value) {
    isResizingRight.value = true
    document.body.style.cursor = 'ew-resize'
  } else if (target === progressRef.value) {
    isDragging.value = true
    document.body.style.cursor = 'move'
  } else {
    return
  }

  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerup', onPointerUp)
  document.addEventListener('pointercancel', onPointerUp)
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value && !isResizingLeft.value && !isResizingRight.value) return
  if (!currentTimelineRect) return

  const currentPointerPercent = getPointerPercent(e.clientX)
  if (currentPointerPercent === null) return

  const initialPointerPercent = getPointerPercent(initialPointerX)
  if (initialPointerPercent === null) return

  const deltaPercent = currentPointerPercent - initialPointerPercent
  const deltaMinutes = (deltaPercent / 100) * TOTAL_MINUTES_IN_DAY

  let newStartMinute = selectionStartMinute.value
  let newEndMinute = selectionEndMinute.value

  if (isDragging.value) {
    const currentDuration = initialEndMinuteInternal - initialStartMinuteInternal
    newStartMinute = initialStartMinuteInternal + deltaMinutes
    newEndMinute = initialEndMinuteInternal + deltaMinutes
    if (newStartMinute < 0) {
      newStartMinute = 0
      newEndMinute = currentDuration
    }
    if (newEndMinute > TOTAL_MINUTES_IN_DAY) {
      newEndMinute = TOTAL_MINUTES_IN_DAY
      newStartMinute = TOTAL_MINUTES_IN_DAY - currentDuration
    }
    newStartMinute = Math.max(0, newStartMinute);

  } else if (isResizingLeft.value) {
    newStartMinute = percentToMinute(currentPointerPercent)
    newEndMinute = selectionEndMinute.value
  } else if (isResizingRight.value) {
    newStartMinute = selectionStartMinute.value
    newEndMinute = percentToMinute(currentPointerPercent)
  }

  updateSelectionAndEmit(newStartMinute, newEndMinute)
}

function onPointerUp() {
  if (!isDragging.value && !isResizingLeft.value && !isResizingRight.value) return

  isDragging.value = false
  isResizingLeft.value = false
  isResizingRight.value = false
  document.body.style.cursor = 'default'

  document.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerup', onPointerUp)
  document.removeEventListener('pointercancel', onPointerUp)
}

function onTimelineClick(e: MouseEvent) {
  if (!timelineRef.value) return

  const target = e.target as HTMLElement
  if (
    target === progressRef.value ||
    target === handleLeftRef.value ||
    target === handleRightRef.value
  ) {
    return
  }

  currentTimelineRect = timelineRef.value.getBoundingClientRect()
  const clickedPercent = getPointerPercent(e.clientX)
  if (clickedPercent === null) return

  const clickedMinute = percentToMinute(clickedPercent)
  const currentDuration = selectionEndMinute.value - selectionStartMinute.value
  const durationToUse = Math.max(currentDuration, props.minRangeMinutes)

  let newStartMinute = clickedMinute - durationToUse / 2
  let newEndMinute = clickedMinute + durationToUse / 2

  if (newStartMinute < 0) {
    newStartMinute = 0;
    newEndMinute = durationToUse;
  }
  if (newEndMinute > TOTAL_MINUTES_IN_DAY) {
    newEndMinute = TOTAL_MINUTES_IN_DAY;
    newStartMinute = TOTAL_MINUTES_IN_DAY - durationToUse;
  }
  newStartMinute = Math.max(0, newStartMinute);

  updateSelectionAndEmit(newStartMinute, newEndMinute)
}

function onResize() {
  if (!timelineRef.value) return
  currentTimelineRect = timelineRef.value.getBoundingClientRect()
  createTimeLabels()
  createVerticalHourLabels()
}

onMounted(() => {
  if (!timelineRef.value) {
    console.error('Timeline reference is not available.')
    return
  }
  emit('rangeChange', selectionStartMinute.value, selectionEndMinute.value)
  currentTimelineRect = timelineRef.value.getBoundingClientRect()
  createTimeLabels()
  createVerticalHourLabels()

  updateSelectionAndEmit(selectionStartMinute.value, selectionEndMinute.value)

  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  document.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerup', onPointerUp)
  document.removeEventListener('pointercancel', onPointerUp)
  if (isDragging.value || isResizingLeft.value || isResizingRight.value) {
    document.body.style.cursor = 'default';
  }
})
</script>

<style scoped>
.touch-none {
  touch-action: none;
}
</style>
