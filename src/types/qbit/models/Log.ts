import { LogType } from '@/constants/qbit'

export default interface Log {
  id: number
  message: string
  timestamp: number
  type: LogType
}
