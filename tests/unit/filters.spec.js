import { describe, it, expect } from 'vitest'
import { titleCase, capitalize, formatData, formatSpeed, toPrecision } from '@/filters'

describe('Filters', () => {
  it('titleCase', () => {
    expect(titleCase('')).toEqual('')
    expect(titleCase('-')).toEqual('-')
    expect(titleCase(' ')).toEqual(' ')
    expect(titleCase('test')).toEqual('Test')
    expect(titleCase('hello there')).toEqual('Hello There')
  })

  it('capitalize', () => {
    expect(capitalize('')).toEqual('')
    expect(capitalize('-')).toEqual('-')
    expect(capitalize('test')).toEqual('Test')
    expect(capitalize('hello There')).toEqual('Hello there')
    expect(capitalize('i like vuetorrent')).toEqual('I like vuetorrent')
  })

  it('toPrecision', () => {
    expect(toPrecision(1000, 3)).toEqual('1000')
    expect(toPrecision(256, 3)).toEqual('256')
    expect(toPrecision(25.6, 3)).toEqual('25.6')
    expect(toPrecision(2.56, 3)).toEqual('2.56')

    expect(toPrecision(0.12345, 3)).toEqual('0.12')
    expect(toPrecision(123.45, 3)).toEqual('123')
  })

  it('formatData: null', () => {
    expect(formatData(null, false)).toEqual('0 B')
    expect(formatData(null, true)).toEqual('0 B')
  })

  it('formatData: 0', () => {
    expect(formatData(0, false)).toEqual('0 B')
    expect(formatData(0, true)).toEqual('0 B')
  })

  it('formatData: base values', () => {
    expect(formatData(1, false)).toEqual('1 B')
    expect(formatData(1000, false)).toEqual('1.00 kB')
    expect(formatData(1000, true)).toEqual('1000 B')
    expect(formatData(1024, false)).toEqual('1.02 kB')
    expect(formatData(1024, true)).toEqual('1.00 kiB')
  })

  it('formatData: non-binary values', () => {
    expect(formatData(1_000_000, false)).toEqual('1.00 MB')
    expect(formatData(25_600_000, false)).toEqual('25.6 MB')
    expect(formatData(256_000_000, false)).toEqual('256 MB')
  })

  it('formatData: binary values', () => {
    expect(formatData(1_000_000, true)).toEqual('977 kiB')
    expect(formatData(25_600_000, true)).toEqual('24.4 MiB')
    expect(formatData(256_000_000, true)).toEqual('244 MiB')
  })

  it('formatSpeed: 0', () => {
    expect(formatSpeed(0, false)).toEqual('0 B/s')
    expect(formatSpeed(0, true)).toEqual('0 bps')
  })

  it('formatSpeed: base values', () => {
    expect(formatSpeed(1, false)).toEqual('1 B/s')
    expect(formatSpeed(1, true)).toEqual('8 bps')
    expect(formatSpeed(1000, false)).toEqual('1.00 kB/s')
    expect(formatSpeed(1000, true)).toEqual('8.00 kbps')
  })
})
