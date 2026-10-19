import { arrayRemove, compareVersions } from './misc'

describe('helpers/misc/compareVersions', () => {
  it('returns 0 for equal versions', () => {
    expect(compareVersions('2.16.0', '2.16.0')).toBe(0)
  })

  it('compares each numeric part instead of using string comparison', () => {
    expect(compareVersions('2.16.0', '2.9.0') > 0).toBe(true)
    expect(compareVersions('2.9.0', '2.16.0') >= 0).toBe(false)
  })

  it('handles versions with a different number of parts', () => {
    expect(compareVersions('2.16', '2.16.0')).toBe(0)
    expect(compareVersions('2.16.1', '2.16') > 0).toBe(true)
    expect(compareVersions('2.16', '2.16.1') >= 0).toBe(false)
  })

  it('supports the 2.16.0 threshold used for the Peer ID option', () => {
    expect(compareVersions('2.16.0', '2.16.0') >= 0).toBe(true)
    expect(compareVersions('2.16.2', '2.16.0') >= 0).toBe(true)
    expect(compareVersions('2.15.1', '2.16.0') >= 0).toBe(false)
  })
})

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
