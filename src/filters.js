import dayjs from 'dayjs'
import Vue from 'vue'

/* eslint-disable no-param-reassign */
export function toPrecision(value, precision) {
  if (value >= 10 ** precision) {
    return value.toString()
  }
  if (value >= 1) {
    return value.toPrecision(precision)
  }

  return value.toFixed(precision - 1)
}

export function formatSize(value) {
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

export function formatTimestamp(timestamp) {
  if (timestamp == null || timestamp === -1) {
    return ''
  }

  const m = dayjs.unix(timestamp)

  return m.format('YYYY-MM-DD HH:mm:ss')
}

Vue.filter('formatTimestamp', formatTimestamp)

export function formatProgress(progress) {
  progress *= 100

  return `${toPrecision(progress, 3)}%`
}

Vue.filter('progress', formatProgress)

export function parseDate(str) {
  if (!str) {
    return null
  }

  return Date.parse(str) / 1000
}

Vue.filter('parseDate', parseDate)

export function formatNetworkSpeed(speed) {
  if (speed === 0) {
    return null
  }

  return `${formatSize(speed)}/s`
}

Vue.filter('networkSpeed', formatNetworkSpeed)

export function networkSize(size) {
  if (size === 0) {
    return null
  }

  return formatSize(size)
}

Vue.filter('networkSize', networkSize)

export function getDataUnit(a, b) {
  if (a === -1) return null
  if (!a) return 'B'
  const c = 1024
  const e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const f = Math.floor(Math.log(a) / Math.log(c))

  return `${e[f]}`
}

Vue.filter('getDataUnit', getDataUnit)

export function getDataValue(a, b) {
  if (a === -1) return 'None'
  if (!a) return '0'
  const c = 1024
  const d = b || 2
  const f = Math.floor(Math.log(a) / Math.log(c))

  return `${parseFloat((a / Math.pow(c, f)).toFixed(d))}`
}

Vue.filter('getDataValue', getDataValue)


export function titleCase(str) {
  return str.split(' ')
    .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(' ')
}

Vue.filter('titleCase', titleCase)

export function limitToValue(value) {
  if (value === -2) {
    return 'global'
  }
  if (value === -1) {
    return 'unlimited'
  }

  return value
}

Vue.filter('limitToValue', limitToValue)
