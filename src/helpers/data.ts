import { toPrecision } from './number'

const units = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

export function formatDataValue(data: number, isBinary: boolean) {
  const base = isBinary ? 1024 : 1000
  if (!data || data === 0) return '0'

  let i = 1
  while (data >= base ** i && i < units.length) {
    i++
  }
  return toPrecision(data / base ** (i - 1), i > 1 ? 3 : 1)
}

export function formatDataUnit(data: number, isBinary: boolean) {
  const base = isBinary ? 1024 : 1000

  let i = 1
  while (data >= base ** i && i < units.length) {
    i++
  }
  return `${units[i - 1]}${isBinary && i > 1 ? 'i' : ''}B`
}

export function formatData(data: number, isBinary: boolean) {
  return `${formatDataValue(data, isBinary)} ${formatDataUnit(data, isBinary)}`
}
