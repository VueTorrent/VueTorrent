import { jsonDeserialize, jsonSerialize } from './json'

describe('helpers/json', () => {
  describe('jsonSerialize', () => {
    test('should serialize a Set', () => {
      const state = { mySet: new Set([1, 2, 3]) }
      const serialized = jsonSerialize(state)
      expect(serialized).toBe('{"mySet":{"type":"__special__set","value":[1,2,3]}}')
    })

    test('should serialize a normal object', () => {
      const state = { myObject: { a: 1, b: 2 } }
      const serialized = jsonSerialize(state)
      expect(serialized).toBe('{"myObject":{"a":1,"b":2}}')
    })

    test('should serialize a normal array', () => {
      const state = { myArray: [1, 2, 3] }
      const serialized = jsonSerialize(state)
      expect(serialized).toBe('{"myArray":[1,2,3]}')
    })

    test('should serialize mixed types', () => {
      const state = { mySet: new Set([1, 2]), myObject: { a: 1 }, myArray: [1, 2, 3] }
      const serialized = jsonSerialize(state)
      expect(serialized).toBe('{"mySet":{"type":"__special__set","value":[1,2]},"myObject":{"a":1},"myArray":[1,2,3]}')
    })

    test('should serialize malformed set special object', () => {
      const state = { mySet: { type: '__special__set', value: 'not-an-array' } }
      const serialized = jsonSerialize(state)
      expect(serialized).toBe('{"mySet":{"type":"__special__set","value":"not-an-array"}}')
    })
  })

  describe('jsonDeserialize', () => {
    test('should deserialize a Set', () => {
      const serialized = '{"mySet":{"type":"__special__set","value":[1,2,3]}}'
      const state = jsonDeserialize(serialized)
      expect(state.mySet).toBeInstanceOf(Set)
      expect([...state.mySet]).toEqual([1, 2, 3])
    })

    test('should deserialize a normal object', () => {
      const serialized = '{"myObject":{"a":1,"b":2}}'
      const state = jsonDeserialize(serialized)
      expect(state.myObject).toEqual({ a: 1, b: 2 })
    })

    test('should deserialize a normal array', () => {
      const serialized = '{"myArray":[1,2,3]}'
      const state = jsonDeserialize(serialized)
      expect(state.myArray).toEqual([1, 2, 3])
    })

    test('should deserialize malformed set special object', () => {
      const serialized = '{"mySet":{"type":"__special__set","value":"not-an-array"}}'
      const state = jsonDeserialize(serialized)
      expect(state.mySet).toEqual({ type: '__special__set', value: 'not-an-array' })
    })

    test('should deserialize legacy set arrays', () => {
      const serialized = '{"torrentSortFavourites":["name","size"],"myArray":[1,2,3]}'
      const state = jsonDeserialize(serialized)
      expect(state.torrentSortFavourites).toBeInstanceOf(Set)
      expect([...state.torrentSortFavourites]).toEqual(['name', 'size'])
      expect(state.myArray).toEqual([1, 2, 3])
    })

    test('should support additional legacy set keys', () => {
      const serialized = '{"customSet":["a","b"]}'
      const state = jsonDeserialize(serialized, ['customSet'])
      expect(state.customSet).toBeInstanceOf(Set)
      expect([...state.customSet]).toEqual(['a', 'b'])
    })

    test('should deserialize mixed types', () => {
      const serialized = '{"mySet":{"type":"__special__set","value":[1,2]},"myObject":{"a":1},"myArray":[1,2,3]}'
      const state = jsonDeserialize(serialized)
      expect(state.mySet).toBeInstanceOf(Set)
      expect([...state.mySet]).toEqual([1, 2])
      expect(state.myObject).toEqual({ a: 1 })
      expect(state.myArray).toEqual([1, 2, 3])
    })
  })
})
