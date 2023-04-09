import { describe, it, expect } from 'vitest'
import { titleCase, capitalize } from '@/filters'

describe('Filters', () => {
  it('titleCase', () => {
    expect(titleCase('')).toEqual('')
    expect(titleCase('-')).toEqual('-')
    expect(titleCase(' ')).toEqual(' ')
    expect(titleCase('test')).toEqual('Test')
    expect(titleCase('hello there')).toEqual('Hello There')
  })

  it('capitaliza', () => {
    expect(capitalize('')).toEqual('')
    expect(capitalize('-')).toEqual('-')
    expect(capitalize('test')).toEqual('Test')
    expect(capitalize('hello There')).toEqual('Hello there')
    expect(capitalize('i like vuetorrent')).toEqual('I like vuetorrent')
  })
})
