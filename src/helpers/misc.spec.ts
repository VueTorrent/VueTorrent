import { arrayRemove, reduceByHash } from './misc'

describe('helpers/misc', () => {
  describe('arrayRemove', () => {
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

  describe('reduceByHash', () => {
    const obj1 = { hash: 'abc', name: 'test1' }
    const obj2 = { hash: 'abc', name: 'test2' }
    const obj3 = { hash: 'abc', name: 'test3' }
    const obj4 = { hash: 'def', name: 'test4' }
    const obj5 = { hash: 'def', name: 'test5' }
    const obj6 = { hash: 'def', name: 'test6' }
    const objs = [obj1, obj2, obj3, obj4, obj5, obj6]

    it('groups all values using the hash key', () => {
      expect(objs.reduce(reduceByHash, {})).toStrictEqual({ abc: [obj1, obj2, obj3], def: [obj4, obj5, obj6] })
    })
  })
})
