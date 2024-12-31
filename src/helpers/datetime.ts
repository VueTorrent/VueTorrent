import dayjs from '@/plugins/dayjs'
import { DurationUnitType } from 'dayjs/plugin/duration'

export const QBIT_MAX_ETA = 8_640_000 // 100 days
export const INFINITY_SYMBOL = '∞'

export function formatEta(value: number, isForced: boolean = false): string {
  const MAX_UNITS = 2 // Will display 2 units max, from highest to lowest

  if (value >= QBIT_MAX_ETA || (isForced && value === 0)) {
    return INFINITY_SYMBOL
  }

  const minute = 60
  const hour = minute * 60
  const day = hour * 24
  const year = day * 365

  const durations = [year, day, hour, minute, 1]
  const units = 'ydhms'

  let index = 0
  let unitSize = 0
  const parts = []

  while (unitSize < MAX_UNITS && index !== durations.length) {
    const duration = durations[index]
    if (value < duration) {
      index++
      continue
    }

    const result = Math.floor(value / duration)
    parts.push(result + units[index])

    value %= duration
    index++
    unitSize++
  }

  if (!parts.length) {
    return '0' + units[durations.length - 1]
  }

  return parts.join(' ')
}

export function formatTimeMs(value: number, format: string): string {
  return dayjs(value).format(format)
}

export function formatTimeSec(value: number, format: string): string {
  return formatTimeMs(value * 1000, format)
}

export function formatDuration(value: number, unit: DurationUnitType, format: string): string {
  return dayjs.duration(value, unit).format(format)
}
