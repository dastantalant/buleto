<template>
  <ComponentCard :title="title">
    <div v-if="series && series.length > 0 && series[0].data.length > 0" class="overflow-x-auto">
      <table>
        <thead>
        <tr>
          <th v-for="cell in cellLabels" :key="cell">{{ cell }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td v-for="value in series[0].data" :key="value">{{ value }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center text-gray-500">Нет данных для отображения</div>
  </ComponentCard>
</template>

<script setup lang="ts">
import ComponentCard from '@/components/common/ComponentCard.vue'
import { defineProps, computed } from 'vue'

interface ChartSeries {
  name: string;
  data: number[];
}

interface Props {
  title: string;
  series?: ChartSeries[];
}

const props = defineProps<Props>()

const cellLabels = computed(() => Array.from({ length: 37 }, (_, i) => i))
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}
</style>
