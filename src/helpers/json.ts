export function jsonSerialize(state: Record<string, any>): string {
  return JSON.stringify(state, (_key, value) => (value instanceof Set ? { type: '__special__set', value: [...value] } : value))
}

export function jsonDeserialize(value: string): Record<string, any> {
  const state = JSON.parse(value)
  for (const [k, v] of Object.entries(state)) {
    if (typeof v === 'object') {
      if (v?.type === '__special__set' && Array.isArray(v.value)) {
        state[k] = new Set(v.value)
      } else {
        state[k] = v
      }
    }
  }
  return state
}
