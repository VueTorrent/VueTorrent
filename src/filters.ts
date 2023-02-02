import Vue from 'vue'

export function toPrecision(value: number, precision: number): string {
  if (value >= 10 ** precision) {
    return value.toString()
  }
  if (value >= 1) {
    return value.toPrecision(precision)
  }

  return value.toFixed(precision - 1)
}

export function formatSize(value: number): string {
  const units = 'KMGTP'
  let index = -1

  while (value >= 1000) {
    value /= 1024
    index++
  }

  const unit = index < 0 ? 'B' : `${units[index]}iB`

  if (index < 0) {
    return `${value} ${unit}`
  }

  return `${toPrecision(value, 3)} ${unit}`
}

Vue.filter('formatSize', formatSize)
Vue.filter('size', formatSize)

export function formatProgress(progress: number): string {
  progress *= 100

  return `${toPrecision(progress, 3)}%`
}

Vue.filter('progress', formatProgress)

export function formatNetworkSpeed(speed: number): string | null {
  if (speed === 0) {
    return null
  }

  return `${formatSize(speed)}/s`
}

Vue.filter('networkSpeed', formatNetworkSpeed)

export function networkSize(size: number) {
  if (size === 0) {
    return null
  }

  return formatSize(size)
}

Vue.filter('networkSize', networkSize)

export function getDataUnit(data: number) {
  if (data === -1) return null
  if (!data) return 'B'
  const c = 1024
  const e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const f = Math.floor(Math.log(data) / Math.log(c))

  return `${e[f]}`
}

Vue.filter('getDataUnit', getDataUnit)

export function getDataValue(data: number, precision: number = 2) {
  if (data === -1) return 'None'
  if (!data) return '0'
  const c = 1024
  const f = Math.floor(Math.log(data) / Math.log(c))

  return `${parseFloat((data / Math.pow(c, f)).toFixed(precision))}`
}

Vue.filter('getDataValue', getDataValue)

export function titleCase(str: string): string {
  if (str.length == 0) return str

  return str
    .split(' ')
    .map(w => w[0] && w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ')
}

Vue.filter('titleCase', titleCase)

export function limitToValue(value: number): string {
  if (value === -2) {
    return 'global'
  }
  if (value === -1) {
    return 'unlimited'
  }

  return value.toString()
}

Vue.filter('limitToValue', limitToValue)
