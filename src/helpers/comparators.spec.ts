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

  test('invertedNumeric/asc', () => {
    const data = [3, 1, 2]
    data.sort(comparators.invertedNumeric.asc)
    expect(data).toEqual([3, 2, 1])
  })

  test('invertedNumeric/desc', () => {
    const data = [3, 1, 2]
    data.sort(comparators.invertedNumeric.desc)
    expect(data).toEqual([1, 2, 3])
  })

  test('text/asc', () => {
    const data = ['c', 'a', 'b']
    data.sort(comparators.text.asc)
    expect(data).toEqual(['a', 'b', 'c'])
  })

  test('text/desc', () => {
    const data = ['c', 'a', 'b']
    data.sort(comparators.text.desc)
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

  test('arrayNumeric/asc', () => {
    const data = [[3], [1, 2], [2]]
    data.sort(comparators.arrayNumeric.asc)
    expect(data).toEqual([[1, 2], [2], [3]])
  })

  test('arrayNumeric/desc', () => {
    const data = [[3], [1, 2], [2]]
    data.sort(comparators.arrayNumeric.desc)
    expect(data).toEqual([[3], [2], [1, 2]])
  })

  test('arrayText/asc', () => {
    const data = [['a'], ['a', 'b'], []]
    data.sort(comparators.arrayText.asc)
    expect(data).toEqual([[], ['a'], ['a', 'b']])
  })

  test('arrayText/desc', () => {
    const data = [['a'], ['a', 'b'], []]
    data.sort(comparators.arrayText.desc)
    expect(data).toEqual([['a', 'b'], ['a'], []])
  })
})