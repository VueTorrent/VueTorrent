import { describe } from 'vitest'
import comparators, { isObjectEqual } from './comparators'

describe('helpers/comparators', () => {
  describe('numeric', () => {
    test('asc', () => {
      const data = [3, 1, 2]
      data.sort(comparators.numeric.asc)
      expect(data).toEqual([1, 2, 3])
    })

    test('desc', () => {
      const data = [3, 1, 2]
      data.sort(comparators.numeric.desc)
      expect(data).toEqual([3, 2, 1])
    })
  })

  describe('invertedNumeric', () => {
    test('asc', () => {
      const data = [3, 1, 2]
      data.sort(comparators.invertedNumeric.asc)
      expect(data).toEqual([3, 2, 1])
    })

    test('desc', () => {
      const data = [3, 1, 2]
      data.sort(comparators.invertedNumeric.desc)
      expect(data).toEqual([1, 2, 3])
    })
  })

  describe('text', () => {
    test('asc', () => {
      const data = ['c', 'a', 'b']
      data.sort(comparators.text.asc)
      expect(data).toEqual(['a', 'b', 'c'])
    })

    test('desc', () => {
      const data = ['c', 'a', 'b']
      data.sort(comparators.text.desc)
      expect(data).toEqual(['c', 'b', 'a'])
    })
  })

  describe('boolean', () => {
    test('asc', () => {
      const data = [true, false, true]
      data.sort(comparators.boolean.asc)
      expect(data).toEqual([false, true, true])
    })

    test('desc', () => {
      const data = [true, false, true]
      data.sort(comparators.boolean.desc)
      expect(data).toEqual([true, true, false])
    })
  })

  describe('arrayNumeric', () => {
    test('asc', () => {
      const data = [[3], [1, 2], [2]]
      data.sort(comparators.arrayNumeric.asc)
      expect(data).toEqual([[1, 2], [2], [3]])
    })

    test('desc', () => {
      const data = [[3], [1, 2], [2]]
      data.sort(comparators.arrayNumeric.desc)
      expect(data).toEqual([[3], [2], [1, 2]])
    })
  })

  describe('arrayText', () => {
    test('asc', () => {
      const data = [['a'], ['a', 'b'], []]
      data.sort(comparators.arrayText.asc)
      expect(data).toEqual([[], ['a'], ['a', 'b']])
    })

    test('desc', () => {
      const data = [['a'], ['a', 'b'], []]
      data.sort(comparators.arrayText.desc)
      expect(data).toEqual([['a', 'b'], ['a'], []])
    })
  })

  describe('objects', () => {
    test('copy', () => {
      const a = { a: 1, b: 2 }
      const b = structuredClone(a)
      expect(isObjectEqual(a, b)).toBe(true)
    })

    test('keys length not equal', () => {
      const a = { a: 1, b: 2 }
      const b = { a: 1, b: 2, c: 3 }
      expect(isObjectEqual(a, b)).toBe(false)
    })

    test('shallow', () => {
      const a = { a: 1, b: 2 }
      const b = { a: 1, b: 2 }
      expect(isObjectEqual(a, b)).toBe(true)
    })

    test('not shallow', () => {
      const a = { a: 1, b: 2 }
      const b = { a: 1, b: 3 }
      expect(isObjectEqual(a, b)).toBe(false)
    })

    test('deep', () => {
      const a = { a: 1, b: { c: 2 } }
      const b = { a: 1, b: { c: 2 } }
      expect(isObjectEqual(a, b)).toBe(true)
    })

    test('not deep', () => {
      const a = { a: 1, b: { c: 2 } }
      const b = { a: 1, b: { c: 3 } }
      expect(isObjectEqual(a, b)).toBe(false)
    })

    test('null', () => {
      const a = { a: 1, b: 2 }
      expect(isObjectEqual(a, null!)).toBe(false)
      expect(isObjectEqual(null!, a)).toBe(false)
    })
  })
})
