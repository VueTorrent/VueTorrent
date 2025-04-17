import { arrayRemove } from './misc'

describe('helpers/misc/arrayRemove', () => {
  it('removes a single occurrence of a value', () => {
    const arr = [1, 2, 3, 4]
    expect(arrayRemove(arr, 3)).toEqual([1, 2, 4])
  })

  it('removes multiple occurrences of a value', () => {
    const arr = [1, 2, 3, 3, 4]
    expect(arrayRemove(arr, 3)).toEqual([1, 2, 4])
  })

  it('does nothing if the value is not in the array', () => {
    const arr = [1, 2, 3, 4]
    expect(arrayRemove(arr, 5)).toEqual([1, 2, 3, 4])
  })

  it('works with an empty array', () => {
    const arr: any[] = []
    expect(arrayRemove(arr, 1)).toEqual([])
  })

  it('works with arrays containing only the value to remove', () => {
    const arr = [3, 3, 3]
    expect(arrayRemove(arr, 3)).toEqual([])
  })

  it('works with arrays containing different data types', () => {
    const arr = [1, '2', true, null]
    expect(arrayRemove(arr, '2')).toEqual([1, true, null])
  })
})
