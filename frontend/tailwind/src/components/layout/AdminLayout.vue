<template>
  <div class="min-h-screen xl:flex">
<!--    <buleto-app-sidebar />-->
    <app-sidebar />
    <Backdrop />
    <div
      class="flex-1 transition-all duration-300 ease-in-out"
      :class="[isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]']"
    >
<!--      <buleto-app-header />-->
      <app-header />
      <div class="p-4 mx-auto max-w-screen-2xl md:p-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
// import BuletoAppSidebar from './BuletoAppSidebar.vue'
import AppSidebar from './AppSidebar.vue'
// import BuletoAppHeader from './BuletoAppHeader.vue'
import AppHeader from './AppHeader.vue'
import { useSidebar } from '../../composables/useSidebar.ts'
import Backdrop from './Backdrop.vue'
const { isExpanded, isHovered } = useSidebar()
</script>
