import { describe, it, expect } from 'vitest'
import { titleCase } from '@/filters'

describe('Filters', () => {
  it('titleCase', () => {
    expect(titleCase('')).toEqual('')
    expect(titleCase('-')).toEqual('-')
    expect(titleCase(' ')).toEqual(' ')
    expect(titleCase('test')).toEqual('Test')
    expect(titleCase('hello there')).toEqual('Hello There')
  })
})
