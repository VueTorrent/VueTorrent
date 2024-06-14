import comparators from './comparators'

describe('helpers/comparators', () => {
  test('numeric/asc', () => {
    const data = [3, 1, 2]
    data.sort(comparators.numeric.asc)
    expect(data).toEqual([1, 2, 3])
  })

  test('numeric/desc', () => {
    const data = [3, 1, 2]
    data.sort(comparators.numeric.desc)
    expect(data).toEqual([3, 2, 1])
  })

  test('string/asc', () => {
    const data = ['c', 'a', 'b']
    data.sort(comparators.string.asc)
    expect(data).toEqual(['a', 'b', 'c'])
  })

  test('string/desc', () => {
    const data = ['c', 'a', 'b']
    data.sort(comparators.string.desc)
    expect(data).toEqual(['c', 'b', 'a'])
  })

  test('boolean/asc', () => {
    const data = [true, false, true]
    data.sort(comparators.boolean.asc)
    expect(data).toEqual([false, true, true])
  })

  test('boolean/desc', () => {
    const data = [true, false, true]
    data.sort(comparators.boolean.desc)
    expect(data).toEqual([true, true, false])
  })
})