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

export function formatProgress(progress: number): string {
  return `${toPrecision(progress, 3)} %`
}
Vue.filter('progress', formatProgress)

export function formatDataValue(data: number, isBinary: boolean) {
  const base = isBinary ? 1024 : 1000
  if (!data || data === 0) return '0'

  let i = 1
  while (data >= base ** i) {
    i++
  }
  return toPrecision(data / base ** (i - 1), i > 1 ? 3 : 1)
}
Vue.filter('formatDataValue', formatDataValue)

export function formatDataUnit(data: number, isBinary: boolean) {
  const base = isBinary ? 1024 : 1000
  const units = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  if (data === 0) return 'B'

  let i = 1
  while (data >= base ** i) {
    i++
  }
  return `${units[i - 1]}${isBinary && i > 1 ? 'i' : ''}B`
}
Vue.filter('formatDataUnit', formatDataUnit)

export function formatData(data: number, isBinary: boolean) {
  return `${formatDataValue(data, isBinary)} ${formatDataUnit(data, isBinary)}`
}
Vue.filter('formatData', formatData)

export function formatSpeedValue(speed: number, isBits: boolean) {
  if (isBits) speed *= 8
  return formatDataValue(speed, false)
}
Vue.filter('formatSpeedValue', formatSpeedValue)

export function formatSpeedUnit(speed: number, isBits: boolean) {
  if (isBits) speed *= 8
  const unit = formatDataUnit(speed, false).slice(0, -1)
  return `${unit}${isBits ? 'bps' : 'B/s'}`
}
Vue.filter('formatSpeedUnit', formatSpeedUnit)

export function formatSpeed(speed: number, isBits: boolean) {
  return `${formatSpeedValue(speed, isBits)} ${formatSpeedUnit(speed, isBits)}`
}
Vue.filter('formatSpeed', formatSpeed)

export function titleCase(str: string): string {
  if (str.length == 0) return str

  return str
    .split(' ')
    .map(w => w[0] && w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ')
}

Vue.filter('titleCase', titleCase)

export function capitalize(str: string): string {
  if (str.length == 0) return str

  str = str.toLowerCase()

  return str.charAt(0).toUpperCase() + str.slice(1)
}

Vue.filter('capitalize', capitalize)

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
