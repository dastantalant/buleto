import type { TimelineJson } from '@/models/response/TimelineJson.ts'

export interface RoundJson {
  round_id: number
  sd?: number
  bcd?: number
  btd?: number
  ed?: number
  bv?: number
  tv?: number
  sv?: number
  vd?: number
  vc?: number
  vv?: number
  cls?: number[]
  timeline?: TimelineJson[]
}
