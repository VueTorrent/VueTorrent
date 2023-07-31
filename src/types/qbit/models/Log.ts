import { LogType } from '@/enums/qbit'

export default interface Log {
  id: number
  message: string
  timestamp: number
  type: LogType
}
