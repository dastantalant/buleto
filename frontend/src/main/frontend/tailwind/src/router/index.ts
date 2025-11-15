import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type RouteLocationNormalized,
  type NavigationGuardNext,
} from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Главная',
    component: () => import('../views/BuletoEcommerce.vue'),
    meta: {
      title: 'Главная',
      requiresAuth: true,
    },
  },
  {
    path: '/timeline/chart',
    name: 'Chart',
    component: () => import('../views/Chart/LineChart/BuletoTimelineLineChart.vue'),
    meta: {
      title: 'Chart',
      requiresAuth: true,
    },
  },
  {
    path: '/cell/between',
    name: 'Between',
    component: () => import('../views/Chart/BarChart/BuletoVictoryBetweenBarChart.vue'),
    meta: {
      title: 'Between',
      requiresAuth: true,
    },
  },
  {
    path:   '/cell/victory',
    name: 'Victory',
    component: () => import('../views/Chart/BarChart/BuletoVictoryDayStatisticBarChart.vue'),
    meta: {
      title: 'Victory',
    },
  },
  {
    path:   '/cell/victory/line',
    name: 'Victory line',
    component: () => import('../views/BuletoVictoryDayStatisticTimeline.vue'),
    meta: {
      title: 'Victory line',
    },
  },
  {
    path: '/error-404',
    name: '404 Error',
    component: () => import('../views/Errors/FourZeroFour.vue'),
    meta: {
      title: '404 Error',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Auth/BuletoLogin.vue'),
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/icons',
    name: 'Icons',
    component: () => import('../views/IconsPreView.vue'),
    meta: {
      title: 'Icons',
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes,
})

router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    document.title = (to.meta.title as string) || 'Главная'
    const authStore = useAuthStore()

    if (to.meta.requiresAuth === true) {
      if (!authStore.isAuthenticated || authStore.isTokenExpired(authStore.refreshTokenExpires)) {
        authStore.clearAuthData()
        next('/login')
      } else if (authStore.isTokenExpired(authStore.accessTokenExpires)) {
        try {
          await authStore.refreshAccessToken()
          next()
        } catch (error) {
          authStore.clearAuthData()
          next('/login')
        }
      } else {
        next()
      }
    } else {
      next()
    }
  }
)

export default router
