import { toPrecision } from './number'

const units = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

export function formatDataValue(data: number, isBinary: boolean, precision?: number) {
  const base = isBinary ? 1024 : 1000
  if (!data || data === 0) return '0'

  let unitIndex = 1
  while (data >= base ** unitIndex && unitIndex < units.length) {
    unitIndex++
  }
  return toPrecision(data / base ** (unitIndex - 1), precision ?? (unitIndex > 1 ? 3 : 1))
}

export function formatDataUnit(data: number, isBinary: boolean, baseUnit: string) {
  const base = isBinary ? 1024 : 1000

  let unitIndex = 1
  while (data >= base ** unitIndex && unitIndex < units.length) {
    unitIndex++
  }
  return `${units[unitIndex - 1]}${isBinary && unitIndex > 1 ? 'i' : ''}${baseUnit}`
}

export function formatData(data: number, isBinary: boolean, baseUnit: string, precision?: number) {
  return `${formatDataValue(data, isBinary, precision)} ${formatDataUnit(data, isBinary, baseUnit)}`
}
