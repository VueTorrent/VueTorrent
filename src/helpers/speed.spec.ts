import { expect, test } from 'vitest'
import { formatSpeed, formatSpeedUnit, formatSpeedValue } from './speed'

const BIT_UNIT = 'bps'
const BYTE_UNIT = 'B/s'

test('helpers/speed/formatSpeedValue', () => {
  expect(formatSpeedValue(0, false)).toBe('0')
  expect(formatSpeedValue(0, true)).toBe('0')

  expect(formatSpeedValue(1, false)).toBe('1')
  expect(formatSpeedValue(1, true)).toBe('8')

  expect(formatSpeedValue(8, false)).toBe('8')
  expect(formatSpeedValue(8, true)).toBe('64')

  expect(formatSpeedValue(1000, false)).toBe('1.00')
  expect(formatSpeedValue(1000, true)).toBe('8.00')

  expect(formatSpeedValue(8000, false)).toBe('8.00')
  expect(formatSpeedValue(8000, true)).toBe('64.0')

  expect(formatSpeedValue(1000 ** 9, false)).toBe('1000')
  expect(formatSpeedValue(1000 ** 9, true)).toBe('8000')
})

test('helpers/speed/formatSpeedUnit', () => {
  expect(formatSpeedUnit(0, false, BIT_UNIT, BYTE_UNIT)).toBe('B/s')
  expect(formatSpeedUnit(0, true, BIT_UNIT, BYTE_UNIT)).toBe('bps')

  expect(formatSpeedUnit(1, false, BIT_UNIT, BYTE_UNIT)).toBe('B/s')
  expect(formatSpeedUnit(1, true, BIT_UNIT, BYTE_UNIT)).toBe('bps')

  expect(formatSpeedUnit(1000, false, BIT_UNIT, BYTE_UNIT)).toBe('kB/s')
  expect(formatSpeedUnit(8000, true, BIT_UNIT, BYTE_UNIT)).toBe('kbps')

  expect(formatSpeedUnit(1000 ** 2, false, BIT_UNIT, BYTE_UNIT)).toBe('MB/s')
  expect(formatSpeedUnit(1024 ** 2, true, BIT_UNIT, BYTE_UNIT)).toBe('Mbps')

  expect(formatSpeedUnit(1000 ** 3, false, BIT_UNIT, BYTE_UNIT)).toBe('GB/s')
  expect(formatSpeedUnit(1024 ** 3, true, BIT_UNIT, BYTE_UNIT)).toBe('Gbps')

  expect(formatSpeedUnit(1000 ** 4, false, BIT_UNIT, BYTE_UNIT)).toBe('TB/s')
  expect(formatSpeedUnit(1024 ** 4, true, BIT_UNIT, BYTE_UNIT)).toBe('Tbps')

  expect(formatSpeedUnit(1000 ** 5, false, BIT_UNIT, BYTE_UNIT)).toBe('PB/s')
  expect(formatSpeedUnit(1024 ** 5, true, BIT_UNIT, BYTE_UNIT)).toBe('Pbps')

  expect(formatSpeedUnit(1000 ** 6, false, BIT_UNIT, BYTE_UNIT)).toBe('EB/s')
  expect(formatSpeedUnit(1024 ** 6, true, BIT_UNIT, BYTE_UNIT)).toBe('Ebps')

  expect(formatSpeedUnit(1000 ** 7, false, BIT_UNIT, BYTE_UNIT)).toBe('ZB/s')
  expect(formatSpeedUnit(1024 ** 7, true, BIT_UNIT, BYTE_UNIT)).toBe('Zbps')

  expect(formatSpeedUnit(1000 ** 8, false, BIT_UNIT, BYTE_UNIT)).toBe('YB/s')
  expect(formatSpeedUnit(1024 ** 8, true, BIT_UNIT, BYTE_UNIT)).toBe('Ybps')

  expect(formatSpeedUnit(1000 ** 9, false, BIT_UNIT, BYTE_UNIT)).toBe('YB/s')
  expect(formatSpeedUnit(1024 ** 9, true, BIT_UNIT, BYTE_UNIT)).toBe('Ybps')
})

test('helpers/speed/formatSpeed', () => {
  expect(formatSpeed(0, false, BIT_UNIT, BYTE_UNIT)).toBe('0 B/s')
  expect(formatSpeed(0, true, BIT_UNIT, BYTE_UNIT)).toBe('0 bps')

  expect(formatSpeed(1, false, BIT_UNIT, BYTE_UNIT)).toBe('1 B/s')
  expect(formatSpeed(1, true, BIT_UNIT, BYTE_UNIT)).toBe('8 bps')

  expect(formatSpeed(1000, false, BIT_UNIT, BYTE_UNIT)).toBe('1.00 kB/s')
  expect(formatSpeed(1000, true, BIT_UNIT, BYTE_UNIT)).toBe('8.00 kbps')

  expect(formatSpeed(1000 ** 2, false, BIT_UNIT, BYTE_UNIT)).toBe('1.00 MB/s')
  expect(formatSpeed(1000 ** 2, true, BIT_UNIT, BYTE_UNIT)).toBe('8.00 Mbps')

  expect(formatSpeed(1000 ** 3, false, BIT_UNIT, BYTE_UNIT)).toBe('1.00 GB/s')
  expect(formatSpeed(1000 ** 3, true, BIT_UNIT, BYTE_UNIT)).toBe('8.00 Gbps')

  expect(formatSpeed(1000 ** 4, false, BIT_UNIT, BYTE_UNIT)).toBe('1.00 TB/s')
  expect(formatSpeed(1000 ** 4, true, BIT_UNIT, BYTE_UNIT)).toBe('8.00 Tbps')

  expect(formatSpeed(1000 ** 5, false, BIT_UNIT, BYTE_UNIT)).toBe('1.00 PB/s')
  expect(formatSpeed(1000 ** 5, true, BIT_UNIT, BYTE_UNIT)).toBe('8.00 Pbps')

  expect(formatSpeed(1000 ** 6, false, BIT_UNIT, BYTE_UNIT)).toBe('1.00 EB/s')
  expect(formatSpeed(1000 ** 6, true, BIT_UNIT, BYTE_UNIT)).toBe('8.00 Ebps')

  expect(formatSpeed(1000 ** 7, false, BIT_UNIT, BYTE_UNIT)).toBe('1.00 ZB/s')
  expect(formatSpeed(1000 ** 7, true, BIT_UNIT, BYTE_UNIT)).toBe('8.00 Zbps')

  expect(formatSpeed(1000 ** 8, false, BIT_UNIT, BYTE_UNIT)).toBe('1.00 YB/s')
  expect(formatSpeed(1000 ** 8, true, BIT_UNIT, BYTE_UNIT)).toBe('8.00 Ybps')

  expect(formatSpeed(1000 ** 9, false, BIT_UNIT, BYTE_UNIT)).toBe('1000 YB/s')
  expect(formatSpeed(1000 ** 9, true, BIT_UNIT, BYTE_UNIT)).toBe('8000 Ybps')
})
