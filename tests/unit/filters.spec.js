import { titleCase } from '../../src/filters'

describe('Filters', () => {
  it('titleCase', () => {
    expect(titleCase('test')).toEqual('Test')
    expect(titleCase('hello there')).toEqual('Hello There')
  })
})