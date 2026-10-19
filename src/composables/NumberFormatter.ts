import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { formatData, formatDataUnit, formatDataValue, formatRawNumber, formatSpeed, formatSpeedUnit, formatSpeedValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores/vuetorrent'

export function useNumberFormatter() {
  const { t } = useI18n()
  const { thousandSeparator, useBinarySize, useBitSpeed } = storeToRefs(useVueTorrentStore())

  function getBitPerSecondUnit() {
    return t('units.bit_per_second')
  }

  function getBytePerSecondUnit() {
    return t('units.byte_per_second')
  }

  function getByteShortUnit() {
    return t('units.byte_short')
  }

  function formatDataValueWithSettings(options: Partial<{ data: number; precision: number; isBinary: boolean }> = {}) {
    const { data = 0, isBinary = useBinarySize.value, precision } = options
    return formatDataValue(data, isBinary, precision)
  }

  function formatDataUnitWithSettings(options: Partial<{ data: number; isBinary: boolean; baseUnit: string }> = {}) {
    const { data = 0, isBinary = useBinarySize.value, baseUnit = getByteShortUnit() } = options
    return formatDataUnit(data, isBinary, baseUnit)
  }

  function formatDataWithSettings(options: Partial<{ data: number; isBinary: boolean; baseUnit: string; precision: number }> = {}) {
    const { data = 0, isBinary = useBinarySize.value, baseUnit = getByteShortUnit(), precision } = options
    return formatData(data, isBinary, baseUnit, precision)
  }

  function formatSpeedValueWithSettings(options: Partial<{ speed: number; isBits: boolean }> = {}) {
    const { speed = 0, isBits = useBitSpeed.value } = options
    return formatSpeedValue(speed, isBits)
  }

  function formatSpeedUnitWithSettings(options: Partial<{ speed: number; isBits: boolean }> = {}) {
    const { speed = 0, isBits = useBitSpeed.value } = options
    return formatSpeedUnit(speed, isBits, getBitPerSecondUnit(), getBytePerSecondUnit())
  }

  function formatSpeedWithSettings(options: Partial<{ speed: number; isBits: boolean }> = {}) {
    const { speed = 0, isBits = useBitSpeed.value } = options
    return formatSpeed(speed, isBits, getBitPerSecondUnit(), getBytePerSecondUnit())
  }

  function formatRawNumberWithSettings(options: Partial<{ value: number; unit: string; thoSep: string }> = {}) {
    const { value = 0, unit, thoSep = thousandSeparator.value } = options

    return formatRawNumber(value, thoSep, '.') + (unit ? ` ${unit}` : '')
  }

  return {
    formatDataValue: formatDataValueWithSettings,
    formatDataUnit: formatDataUnitWithSettings,
    formatData: formatDataWithSettings,
    formatSpeedValue: formatSpeedValueWithSettings,
    formatSpeedUnit: formatSpeedUnitWithSettings,
    formatSpeed: formatSpeedWithSettings,
    formatRawNumber: formatRawNumberWithSettings,
  }
}
