import timezoneMock from 'timezone-mock'
import { expect, test } from 'vitest'
import { formatDuration, formatEta, formatTimeMs, formatTimeSec } from './datetime'

beforeAll(() => {
  timezoneMock.register('UTC')
})

afterAll(() => {
  timezoneMock.unregister()
})

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

test('helpers/datetime/formatTimeMs', () => {
  expect(formatTimeMs(1626739200000, 'YYYY-MM-DD')).toBe('2021-07-20')
})

test('helpers/datetime/formatTimeSec', () => {
  expect(formatTimeSec(1626739200, 'YYYY-MM-DD')).toBe('2021-07-20')
})

test('helpers/datetime/formatDuration', () => {
  expect(formatDuration(60, 's', 'HH:mm:ss')).toBe('00:01:00')
  expect(formatDuration(1, 'm', 'HH:mm:ss')).toBe('00:01:00')
  expect(formatDuration(1, 'h', 'HH:mm:ss')).toBe('01:00:00')
  expect(formatDuration(1, 'd', 'D [days], HH:mm:ss')).toBe('1 days, 00:00:00')
  expect(formatDuration(0, 's', 'HH:mm:ss')).toBe('00:00:00')
  expect(formatDuration(1000000, 's', 'D [days], HH:mm:ss')).toBe('11 days, 13:46:40')
})
