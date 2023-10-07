import { formatEta } from '@/helpers/datetime.ts'
import { expect, test } from 'vitest'

test('helpers/datetime/formatEta', () => {
  // seconds
  expect(formatEta(0)).toBe('0s')
  expect(formatEta(1)).toBe('1s')
  expect(formatEta(59)).toBe('59s')

  // minutes
  expect(formatEta(60)).toBe('1m')
  expect(formatEta(61)).toBe('1m 1s')
  expect(formatEta(3599)).toBe('59m 59s')

  // hours
  expect(formatEta(3600)).toBe('1h')
  expect(formatEta(3601)).toBe('1h 1s')
  expect(formatEta(3660)).toBe('1h 1m')
  expect(formatEta(3661)).toBe('1h 1m')
  expect(formatEta(86399)).toBe('23h 59m')

  // days
  expect(formatEta(86400)).toBe('1d')
  expect(formatEta(86401)).toBe('1d 1s')
  expect(formatEta(86460)).toBe('1d 1m')
  expect(formatEta(86461)).toBe('1d 1m')
  expect(formatEta(90000)).toBe('1d 1h')
  expect(formatEta(90001)).toBe('1d 1h')
  expect(formatEta(90060)).toBe('1d 1h')
})