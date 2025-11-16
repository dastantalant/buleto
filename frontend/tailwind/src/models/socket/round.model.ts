import type { SocketVictoryModel } from '@/models/socket/victory.model.ts'
import type { SocketCellModel } from '@/models/socket/cell.model.ts'

export interface SocketRoundModel {
  begin_value: number
  target_value: number
  start_value: number
  bet_target_datetime: Date
  bet_close_datetime: Date
  end_datetime: Date
  start_datetime: Date
  turn: number
  round_id: number
  victory: SocketVictoryModel
  cells: SocketCellModel[]
}
