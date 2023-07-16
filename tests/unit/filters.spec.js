import { describe, it, expect } from 'vitest'
import {titleCase, capitalize, formatData, formatSpeed} from '@/filters'

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

  it('formatData', () => {
    expect(formatData(1, false)).toEqual('1.00 B')
    expect(formatData(1000, false)).toEqual('1.00 kB')
    expect(formatData(1024, true)).toEqual('1.00 kiB')
  })

  it('formatSpeed', () => {
    expect(formatSpeed(1, false)).toEqual('1.00 B/s')
    expect(formatSpeed(1000, false)).toEqual('1.00 kB/s')
    expect(formatSpeed(1, true)).toEqual('8.00 bps')
  })
})
