import './assets/main.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from './plugins/API.ts'
import { useAuthStore } from './stores/auth'
import VueApexCharts from 'vue3-apexcharts'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// const app = createApp(App)
// const pinia = createPinia()
// app.use(pinia)
// app.use(router)
// app.use(VueApexCharts)
// app.component('VueDatePicker', VueDatePicker);
//
// app.config.globalProperties.$axios = axios
// const authStore = useAuthStore()
// if (!authStore.checkAuth()) {
//   console.log('Initial auth check failed, redirecting to login')
//   router.push('/login')
// }
//
// app.mount('#app')

async function initializeApp() {
  const app = createApp(App);
  const pinia = createPinia();
  app.use(pinia);
  const authStore = useAuthStore();

  app.use(router);
  app.use(VueApexCharts);
  app.component('VueDatePicker', VueDatePicker);
  app.config.globalProperties.$axios = axios;

  try {
    const isAuthenticated = authStore.checkAuth();

    if (!isAuthenticated) {
      console.log('Initial auth check failed or required logout, redirecting to login');
      if (router.currentRoute.value.path !== '/login') {
        await router.replace('/login');
      }
    } else {
      console.log('Initial auth check successful.');
    }
  } catch (error) {
    console.error("Error during initial auth check:", error);
    authStore.clearAuthData();
    if (router.currentRoute.value.path !== '/login') {
      await router.replace('/login');
    }
  }
  app.mount('#app');
}

initializeApp();
