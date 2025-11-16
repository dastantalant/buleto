// src/plugins/API.ts
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const API = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

API.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

API.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const authStore = useAuthStore()
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        console.log('Token expired, attempting to refresh...')
        const newToken = await authStore.refreshAccessToken()
        console.log('New token received:', newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return API(originalRequest)
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError)
        await authStore.logout()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default API
