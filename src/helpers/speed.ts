import { formatDataUnit, formatDataValue } from './data'

export function formatSpeedValue(speed: number, isBits: boolean) {
  if (isBits) speed *= 8
  return formatDataValue(speed, false)
}

export function formatSpeedUnit(speed: number, isBits: boolean, bitUnit: string, byteUnit: string) {
  if (isBits) speed *= 8
  const baseUnit = isBits ? bitUnit : byteUnit
  const unit = formatDataUnit(speed, false, baseUnit).slice(0, -baseUnit.length)
  return `${unit}${baseUnit}`
}

export function formatSpeed(speed: number, isBits: boolean, bitUnit: string, byteUnit: string) {
  return `${formatSpeedValue(speed, isBits)} ${formatSpeedUnit(speed, isBits, bitUnit, byteUnit)}`
}
