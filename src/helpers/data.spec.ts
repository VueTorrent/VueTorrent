import { expect, test } from 'vitest'
import { formatDataValue, formatDataUnit, formatData } from './data'

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
})

test('helpers/data/formatDataUnit', () => {
  expect(formatDataUnit(0, false)).toBe('B')
  expect(formatDataUnit(0, true)).toBe('B')

  expect(formatDataUnit(1, false)).toBe('B')
  expect(formatDataUnit(1, true)).toBe('B')

  expect(formatDataUnit(1000, false)).toBe('kB')
  expect(formatDataUnit(1000, true)).toBe('B')

  expect(formatDataUnit(1024, false)).toBe('kB')
  expect(formatDataUnit(1024, true)).toBe('kiB')

  expect(formatDataUnit(1000 ** 2, false)).toBe('MB')
  expect(formatDataUnit(1024 ** 2, true)).toBe('MiB')

  expect(formatDataUnit(1000 ** 3, false)).toBe('GB')
  expect(formatDataUnit(1024 ** 3, true)).toBe('GiB')

  expect(formatDataUnit(1000 ** 4, false)).toBe('TB')
  expect(formatDataUnit(1024 ** 4, true)).toBe('TiB')

  expect(formatDataUnit(1000 ** 5, false)).toBe('PB')
  expect(formatDataUnit(1024 ** 5, true)).toBe('PiB')

  expect(formatDataUnit(1000 ** 6, false)).toBe('EB')
  expect(formatDataUnit(1024 ** 6, true)).toBe('EiB')

  expect(formatDataUnit(1000 ** 7, false)).toBe('ZB')
  expect(formatDataUnit(1024 ** 7, true)).toBe('ZiB')

  expect(formatDataUnit(1000 ** 8, false)).toBe('YB')
  expect(formatDataUnit(1024 ** 8, true)).toBe('YiB')

  expect(formatDataUnit(1000 ** 9, false)).toBe('YB')
  expect(formatDataUnit(1024 ** 9, true)).toBe('YiB')
})

test('helpers/data/formatData', () => {
  expect(formatData(0, false)).toBe('0 B')
  expect(formatData(0, true)).toBe('0 B')

  expect(formatData(1, false)).toBe('1 B')
  expect(formatData(1, true)).toBe('1 B')

  expect(formatData(1000, false)).toBe('1.00 kB')
  expect(formatData(1000, true)).toBe('1000 B')

  expect(formatData(1024, false)).toBe('1.02 kB')
  expect(formatData(1024, true)).toBe('1.00 kiB')
})
