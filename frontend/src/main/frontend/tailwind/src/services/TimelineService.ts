import API from '@/plugins/API.ts'
import type { AxiosResponse } from 'axios'
import type { PageJson } from '@/models/response/PageJson.ts'
import type { RoundJson } from '@/models/response/RoundJson.ts'

export class TimelineService {
  static async getTimelineData(page: number = 0, size: number = 10): Promise<PageJson<RoundJson>> {
    try {
      const url = `/timeline/page/${page}/${size}`
      const response: AxiosResponse<PageJson<RoundJson>> = await API.get(url);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch timeline data:', error);
      throw error;
    }
  }
}
