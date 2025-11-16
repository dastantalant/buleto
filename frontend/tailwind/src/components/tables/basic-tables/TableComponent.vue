<template>
  <div class="simple-table-container p-4 max-w-full overflow-x-auto">
    <table class="simple-table w-full border-collapse">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="bg-gray-200 font-bold p-3 text-left border-b border-gray-300"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index" class="even:bg-gray-50">
          <td
            v-for="column in columns"
            :key="column.key"
            :class="[defaultCellClass, cellClasses[column.key], getDynamicStyle(item, column.key)]"
          >
            <span class="text-gray-800">
              {{ getCellValue(item, column.key) || '—' }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'SimpleDynamicTable',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    cellClasses: {
      type: Object,
      default: () => ({}),
    },
    defaultCellClass: {
      type: String,
      default: 'p-3 border-b border-gray-200',
    },
  },
  methods: {
    getCellValue(item, key) {
      return key.split('.').reduce((obj, k) => (obj ? obj[k] : ''), item) || ''
    },
    getDynamicStyle(item, key) {
      const styleKey = `class_${key}`
      if (item[styleKey]) {
        return item[styleKey]
      }
      return ''
    },
  },
}
</script>
