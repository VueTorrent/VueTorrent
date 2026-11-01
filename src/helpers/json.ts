/**
 * Keys that used to be serialized as plain arrays before Sets got a dedicated marker.
 * Old localStorage/backend payloads still contain arrays, so they must be converted back.
 */
const LEGACY_SET_KEYS = ['torrentSortFavourites']

export function jsonSerialize(state: Record<string, any>): string {
  return JSON.stringify(state, (_key, value) => (value instanceof Set ? { type: '__special__set', value: [...value] } : value))
}

export function jsonDeserialize(value: string, legacySetKeys: readonly string[] = LEGACY_SET_KEYS): Record<string, any> {
  const state: Record<string, any> = JSON.parse(value)
  for (const [k, v] of Object.entries(state)) {
    if (typeof v === 'object') {
      if (v?.type === '__special__set' && Array.isArray(v.value)) {
        state[k] = new Set(v.value)
      } else if (Array.isArray(v) && legacySetKeys.includes(k)) {
        state[k] = new Set(v)
      } else {
        state[k] = v
      }
    }
  }
  return state
}
