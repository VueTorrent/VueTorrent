import { useSearchQuery } from './SearchQuery'
import { expect, test, describe } from 'vitest'

describe('composables/SearchQuery', () => {
  test('should return all items when search query is empty', () => {
    const { results } = useSearchQuery(['foo', 'bar', 'baz'], '', (item: string) => item)
    expect(results.value).toEqual(['foo', 'bar', 'baz'])
  })

  test('should return all items when search query is null', () => {
    const { results } = useSearchQuery(['foo', 'bar', 'baz'], null, (item: string) => item)
    expect(results.value).toEqual(['foo', 'bar', 'baz'])
  })

  test('should return no items when search query does not match any item', () => {
    const { results } = useSearchQuery(['foo', 'bar', 'baz'], 'qux', (item: string) => item)
    expect(results.value).toEqual([])
  })

  test('should return items that match search query partially', () => {
    const { results } = useSearchQuery(['foobar', 'barfoo', 'baz'], 'foo', (item: string) => item)
    expect(results.value).toEqual(['foobar', 'barfoo'])
  })

  test('should return items that match search query with multiple words', () => {
    const { results } = useSearchQuery(['foo bar', 'bar foo', 'baz'], 'foo bar', (item: string) => item)
    expect(results.value).toEqual(['foo bar', 'bar foo'])
  })

  test('should return items that match search query with postProcess applied', () => {
    const { results } = useSearchQuery(
      ['foo', 'bar', 'baz'],
      'foo',
      (item: string) => item,
      (items: string[]) => items.map(item => item.toUpperCase())
    )
    expect(results.value).toEqual(['FOO'])
  })

  test('should exclude items that start with a minus sign in the search query', () => {
    const { results } = useSearchQuery(['foo', 'foobar', 'bar', 'baz'], '-foo', (item: string) => item)
    expect(results.value).toEqual(['bar', 'baz'])
  })

  test('should include items that do not start with a minus sign and exclude those that do', () => {
    const { results } = useSearchQuery(['foo', 'foobar', 'bar', 'baz'], 'foo -bar', (item: string) => item)
    expect(results.value).toEqual(['foo'])
  })

  test('should return no items when all tokens in the search query are filtered out', () => {
    const { results } = useSearchQuery(['foo', 'bar', 'baz'], '-foo -bar -baz', (item: string) => item)
    expect(results.value).toEqual([])
  })

  test('should return items when using multiple values in getter', () => {
    const item1 = { title: 'abcdef', hash: '01234'}
    const item2 = { title: 'abcdef', hash: '56789'}
    const { results: res1 } = useSearchQuery([item1, item2], 'abc', item => [item.title, item.hash])
    const { results: res2 } = useSearchQuery([item1, item2], '567', item => [item.title, item.hash])
    expect(res1.value).toEqual([item1, item2])
    expect(res2.value).toEqual([item2])
  })
})
