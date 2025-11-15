// src/stores/auth.ts
import { defineStore } from 'pinia'
import API from '@/plugins/API.ts'
import { jwtDecode } from 'jwt-decode'

interface User {
  email: string
  roles: string[]
}

interface Tokens {
  access_token: string
  refresh_token: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  accessTokenExpires: number
  refreshTokenExpires: number
  isAuthenticated: boolean
}

interface Credentials {
  email: string
  password: string
}

interface DecodedToken {
  exp: number
  iat?: number
  sub?: string
  type?: string
  roles?: string[]
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    accessTokenExpires: Number(localStorage.getItem('accessTokenExpires')) || 0,
    refreshTokenExpires: Number(localStorage.getItem('refreshTokenExpires')) || 0,
    isAuthenticated: false,
  }),

  actions: {
    isTokenExpired(expirationTime: number): boolean {
      return Date.now() >= expirationTime * 1000
    },

    getTokenExpiration(token: string): number {
      try {
        const decoded: DecodedToken = jwtDecode(token)
        return decoded.exp
      } catch (error) {
        console.error('Token decode error:', error)
        return 0
      }
    },

    async login(credentials: Credentials): Promise<void> {
      try {
        const response = await API.post('/auth/login', credentials)
        const tokens: Tokens = response.data
        const decodedAccess: DecodedToken = jwtDecode(tokens.access_token)
        const decodedRefresh: DecodedToken = jwtDecode(tokens.refresh_token)

        this.accessToken = tokens.access_token
        this.refreshToken = tokens.refresh_token
        this.user = { email: decodedAccess.sub || '', roles: decodedAccess.roles || [] }
        this.accessTokenExpires = decodedAccess.exp
        this.refreshTokenExpires = decodedRefresh.exp
        this.isAuthenticated = true

        localStorage.setItem('accessToken', tokens.access_token)
        localStorage.setItem('refreshToken', tokens.refresh_token)
        localStorage.setItem('accessTokenExpires', this.accessTokenExpires.toString())
        localStorage.setItem('refreshTokenExpires', this.refreshTokenExpires.toString())
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },

    async logout(): Promise<void> {
      try {
        await API.post(
          '/auth/logout',
          {},
          {
            headers: { Authorization: `Bearer ${this.refreshToken}` },
          },
        )
      } catch (error) {
        console.error('Logout failed:', error)
      } finally {
        this.clearAuthData()
      }
    },

    async refreshAccessToken(): Promise<string> {
      if (!this.refreshToken || this.isTokenExpired(this.refreshTokenExpires)) {
        console.log('Refresh token missing or expired, logging out...')
        this.clearAuthData()
        throw new Error('Refresh token expired or missing')
      }

      try {
        console.log('Attempting to refresh token...')
        const response = await API.post(
          '/auth/refresh',
          {},
          {
            headers: { Authorization: `Bearer ${this.refreshToken}` },
          },
        )
        const tokens: Tokens = response.data
        console.log('New access token received:', tokens.access_token)

        this.accessToken = tokens.access_token
        this.accessTokenExpires = this.getTokenExpiration(tokens.access_token)
        localStorage.setItem('accessToken', tokens.access_token)
        localStorage.setItem('accessTokenExpires', this.accessTokenExpires.toString())

        return tokens.access_token
      } catch (error) {
        console.error('Token refresh failed:', error)
        this.clearAuthData()
        throw error
      }
    },

    clearAuthData(): void {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      this.accessTokenExpires = 0
      this.refreshTokenExpires = 0
      this.isAuthenticated = false
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessTokenExpires')
      localStorage.removeItem('refreshTokenExpires')
    },

    checkAuth(): boolean {
      if (!this.accessToken || !this.refreshToken) {
        console.log('No tokens found on checkAuth')
        this.clearAuthData()
        return false
      }

      if (this.isTokenExpired(this.refreshTokenExpires)) {
        console.log('Refresh token expired on checkAuth, clearing data...')
        this.clearAuthData()
        return false
      }

      if (this.isTokenExpired(this.accessTokenExpires)) {
        console.log('Access token expired, attempting to refresh...')
        try {
          this.refreshAccessToken()
        } catch (error) {
          console.error('Failed to refresh token:', error)
          this.clearAuthData()
          return false
        }
      }

      this.isAuthenticated = true
      return true
    },
  },

  getters: {
    getUser: (state): User | null => state.user,
    isLoggedIn: (state): boolean => state.isAuthenticated,
    isAccessTokenValid: (state) => (): boolean => {
      return !state.accessTokenExpires || Date.now() < state.accessTokenExpires * 1000
    },
    isRefreshTokenValid: (state) => (): boolean => {
      return !state.refreshTokenExpires || Date.now() < state.refreshTokenExpires * 1000
    },
    decodedUserInfo: (state) => {
      if (!state.accessToken) return null
      try {
        const decoded: DecodedToken = jwtDecode(state.accessToken)
        return { email: decoded.sub || '', roles: decoded.roles || [] }
      } catch (error) {
        return null
      }
    },
  },
})
