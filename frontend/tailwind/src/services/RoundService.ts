import API from '@/plugins/API.ts'
import type { AxiosResponse } from 'axios'
import type { RoundJson } from '@/models/response/RoundJson.ts'

export class RoundService {
  static async getLast(): Promise<RoundJson> {
    try {
      const response: AxiosResponse<RoundJson> = await API.get('/round/last')
      return response.data
    } catch (error) {
      console.error('Failed to fetch victory between data:', error)
      throw error
    }
  }
}
