import { expect, test } from 'vitest'
import { formatData, formatDataUnit, formatDataValue } from './data'

const BASE_UNIT = 'B'

test('helpers/data/formatDataValue', () => {
  expect(formatDataValue(0, false)).toBe('0')
  expect(formatDataValue(0, true)).toBe('0')

  expect(formatDataValue(1, false)).toBe('1')
  expect(formatDataValue(1, true)).toBe('1')

  expect(formatDataValue(1000, false)).toBe('1.00')
  expect(formatDataValue(1000, true)).toBe('1000')

  expect(formatDataValue(1024, false)).toBe('1.02')
  expect(formatDataValue(1024, true)).toBe('1.00')

  expect(formatDataValue(1000 ** 9, false)).toBe('1000')
  expect(formatDataValue(1000 ** 9, true)).toBe('827')

  expect(formatDataValue(123_456, false, 0)).toBe('123')
  expect(formatDataValue(123_678, false, 0)).toBe('123')
  expect(formatDataValue(123_456, false, 1)).toBe('123')
  expect(formatDataValue(123_456, false, 2)).toBe('123')
  expect(formatDataValue(123_456, false, 3)).toBe('123')
  expect(formatDataValue(123_456, false, 4)).toBe('123.4')
  expect(formatDataValue(123_456, false, 5)).toBe('123.45')
  expect(formatDataValue(123_456, false, 6)).toBe('123.456')
})

test('helpers/data/formatDataUnit', () => {
  expect(formatDataUnit(0, false, BASE_UNIT)).toBe('B')
  expect(formatDataUnit(0, true, BASE_UNIT)).toBe('B')

  expect(formatDataUnit(1, false, BASE_UNIT)).toBe('B')
  expect(formatDataUnit(1, true, BASE_UNIT)).toBe('B')

  expect(formatDataUnit(1000, false, BASE_UNIT)).toBe('kB')
  expect(formatDataUnit(1000, true, BASE_UNIT)).toBe('B')

  expect(formatDataUnit(1024, false, BASE_UNIT)).toBe('kB')
  expect(formatDataUnit(1024, true, BASE_UNIT)).toBe('kiB')

  expect(formatDataUnit(1000 ** 2, false, BASE_UNIT)).toBe('MB')
  expect(formatDataUnit(1024 ** 2, true, BASE_UNIT)).toBe('MiB')

  expect(formatDataUnit(1000 ** 3, false, BASE_UNIT)).toBe('GB')
  expect(formatDataUnit(1024 ** 3, true, BASE_UNIT)).toBe('GiB')

  expect(formatDataUnit(1000 ** 4, false, BASE_UNIT)).toBe('TB')
  expect(formatDataUnit(1024 ** 4, true, BASE_UNIT)).toBe('TiB')

  expect(formatDataUnit(1000 ** 5, false, BASE_UNIT)).toBe('PB')
  expect(formatDataUnit(1024 ** 5, true, BASE_UNIT)).toBe('PiB')

  expect(formatDataUnit(1000 ** 6, false, BASE_UNIT)).toBe('EB')
  expect(formatDataUnit(1024 ** 6, true, BASE_UNIT)).toBe('EiB')

  expect(formatDataUnit(1000 ** 7, false, BASE_UNIT)).toBe('ZB')
  expect(formatDataUnit(1024 ** 7, true, BASE_UNIT)).toBe('ZiB')

  expect(formatDataUnit(1000 ** 8, false, BASE_UNIT)).toBe('YB')
  expect(formatDataUnit(1024 ** 8, true, BASE_UNIT)).toBe('YiB')

  expect(formatDataUnit(1000 ** 9, false, BASE_UNIT)).toBe('YB')
  expect(formatDataUnit(1024 ** 9, true, BASE_UNIT)).toBe('YiB')
})

test('helpers/data/formatData', () => {
  expect(formatData(0, false, BASE_UNIT)).toBe('0 B')
  expect(formatData(0, true, BASE_UNIT)).toBe('0 B')

  expect(formatData(1, false, BASE_UNIT)).toBe('1 B')
  expect(formatData(1, true, BASE_UNIT)).toBe('1 B')

  expect(formatData(1000, false, BASE_UNIT)).toBe('1.00 kB')
  expect(formatData(1000, true, BASE_UNIT)).toBe('1000 B')

  expect(formatData(1024, false, BASE_UNIT)).toBe('1.02 kB')
  expect(formatData(1024, true, BASE_UNIT)).toBe('1.00 kiB')

  expect(formatData(1052804121, true, BASE_UNIT)).toBe('1004 MiB')
  expect(formatData(1066436574, true, BASE_UNIT)).toBe('1017 MiB')

  expect(formatData(123_456, false, BASE_UNIT, 0)).toBe('123 kB')
  expect(formatData(123_678, false, BASE_UNIT, 0)).toBe('123 kB')
  expect(formatData(123_456, false, BASE_UNIT, 1)).toBe('123 kB')
  expect(formatData(123_456, false, BASE_UNIT, 2)).toBe('123 kB')
  expect(formatData(123_456, false, BASE_UNIT, 3)).toBe('123 kB')
  expect(formatData(123_456, false, BASE_UNIT, 4)).toBe('123.4 kB')
  expect(formatData(123_456, false, BASE_UNIT, 5)).toBe('123.45 kB')
  expect(formatData(123_456, false, BASE_UNIT, 6)).toBe('123.456 kB')
})
