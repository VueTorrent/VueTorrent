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

function getDataUnit(value) {
  if (!value) return ''
  
  return value.substring(value.indexOf(' '))
}

Vue.filter('getDataUnit', getDataUnit)

function getDataValue(value) {
  if (!value) return ''
  
  return value.substring(0, value.indexOf(' '))
}

Vue.filter('getDataValue', getDataValue)
