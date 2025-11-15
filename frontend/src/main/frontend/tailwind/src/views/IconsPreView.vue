<template>
  <buleto-admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6 p-4">
      <div class="col-span-12">
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          <div
            v-for="(IconComponent, name) in iconComponents"
            :key="name"
            class="flex flex-col items-center p-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <component :is="IconComponent" class="w-8 h-8 text-gray-500 dark:text-gray-400" />
            <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">{{ name }}</span>
          </div>
        </div>
      </div>
    </div>
  </buleto-admin-layout>
</template>

<script setup lang="ts">
import { type DefineComponent } from 'vue'
import * as icons from '@/icons'
import BuletoAdminLayout from '@/components/layout/BuletoAdminLayout.vue'

const iconComponents = icons as unknown as Record<string, DefineComponent>
</script>
