import API from '@/plugins/API.ts'
import type { AxiosResponse } from 'axios'
import type { BetweenJson } from '@/models/response/BetweenJson.ts'
import type { VictoryJson } from '@/models/response/VictoryJson.ts'
import type { VictoryStatisticJson } from '@/models/response/VictoryStatisticJson.ts'
import type { RoundJson } from '@/models/response/RoundJson.ts'

export class VictoryService {
  static async getByBetween(from: number, to: number): Promise<BetweenJson<VictoryJson>> {
    try {
      const url = `/victory/between/${from}/${to}`
      const response: AxiosResponse<BetweenJson<VictoryJson>> = await API.get(url)
      return response.data
    } catch (error) {
      console.error('Failed to fetch victory between data:', error)
      throw error
    }
  }

  static async getStatisticByBetween(
    from: number,
    to: number,
  ): Promise<BetweenJson<VictoryStatisticJson<VictoryJson>>> {
    try {
      const url = `/victory/between/${from}/${to}/statistic`
      const response: AxiosResponse<BetweenJson<VictoryStatisticJson<VictoryJson>>> =
        await API.get(url)
      return response.data
    } catch (error) {
      console.error('Failed to fetch victory between data:', error)
      throw error
    }
  }
  static async getLineByBetween(
    from: number,
    to: number,
  ): Promise<BetweenJson<RoundJson>> {
    try {
      const url = `/victory/between/${from}/${to}/line`
      const response: AxiosResponse<BetweenJson<RoundJson>> =
        await API.get(url)
      return response.data
    } catch (error) {
      console.error('Failed to fetch victory between line:', error)
      throw error
    }
  }

  static async getByDay(day: number): Promise<BetweenJson<VictoryJson>> {
    try {
      const url = `/victory/day/${day}`
      const response: AxiosResponse<BetweenJson<VictoryJson>> = await API.get(url)
      return response.data
    } catch (error) {
      console.error('Failed to fetch victory day data:', error)
      throw error
    }
  }

  static async getStatisticByDay(
    day: number,
  ): Promise<BetweenJson<VictoryStatisticJson<VictoryJson>>> {
    try {
      const url = `/victory/day/${day}/statistic`
      const response: AxiosResponse<BetweenJson<VictoryStatisticJson<VictoryJson>>> =
        await API.get(url)
      return response.data
    } catch (error) {
      console.error('Failed to fetch victory day statistic data:', error)
      throw error
    }
  }

  static async getByHour(hour: number): Promise<BetweenJson<VictoryJson>> {
    try {
      const url = `/victory/hour/${hour}`
      const response: AxiosResponse<BetweenJson<VictoryJson>> = await API.get(url)
      return response.data
    } catch (error) {
      console.error('Failed to fetch victory hour data:', error)
      throw error
    }
  }

  static async getByHourCount(hour: number, count: number): Promise<BetweenJson<VictoryJson>> {
    try {
      const url = `/victory/hour/${hour}/${count}`
      const response: AxiosResponse<BetweenJson<VictoryJson>> = await API.get(url)
      return response.data
    } catch (error) {
      console.error('Failed to fetch victory hour count data:', error)
      throw error
    }
  }
}
