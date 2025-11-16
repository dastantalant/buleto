import type { SocketVictoryJson } from '@/models/socket/json/victory.json.ts'
import type { SocketCellJson } from '@/models/socket/json/cell.json.ts'

export interface SocketRoundJson {
  bv: number
  tv: number
  sv: number
  btd: string
  bcd: string
  ed: string
  sd: string
  s: number
  id: number
  rr: SocketVictoryJson
  cls: SocketCellJson[]
}
