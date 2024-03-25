import { defaultDateFormat } from '@/constants/vuetorrent'
import dayjs from '@/plugins/dayjs'

export function formatEta(value: number): string {
  const options = { dayLimit: 100 }
  const minute = 60
  const hour = minute * 60
  const day = hour * 24
  const year = day * 365

  const durations = [year, day, hour, minute, 1]
  const units = 'ydhms'

  let index = 0
  let unitSize = 0
  const parts = []

  const defaultOptions = {
    maxUnitSize: 2,
    dayLimit: 0,
    minUnit: 0
  }

  const opt = options ? Object.assign(defaultOptions, options) : defaultOptions

  if (opt.dayLimit && value >= opt.dayLimit * day) {
    return '∞'
  }

  while ((!opt.maxUnitSize || unitSize !== opt.maxUnitSize) && index !== durations.length) {
    const duration = durations[index]
    if (value < duration) {
      index++
      continue
    } else if (opt.minUnit && durations.length - index <= opt.minUnit) {
      break
    }

    const result = Math.floor(value / duration)
    parts.push(result + units[index])

    value %= duration
    index++
    unitSize++
  }

  if (!parts.length) {
    return '0' + units[durations.length - 1 - opt.minUnit]
  }

  return parts.join(' ')
}

export function formatTimeMs(value: number, format: string): string {
  return dayjs(value).format(format ?? defaultDateFormat)
}

export function formatTimeSec(value: number, format: string): string {
  return formatTimeMs(value * 1000, format)
}
