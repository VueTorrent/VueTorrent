/**
 * Compare two dotted version strings numerically (e.g. `2.9.0` is lower than `2.16.0`).
 * @returns -1 if `a` is lower than `b`, 0 if they are equal, 1 if `a` is greater than `b`
 */
export function compareVersions(a: string, b: string): number {
  const aParts = a.split('.').map(Number)
  const bParts = b.split('.').map(Number)
  const length = Math.max(aParts.length, bParts.length)

  for (let i = 0; i < length; i++) {
    const diff = (aParts[i] || 0) - (bParts[i] || 0)
    if (diff !== 0) {
      return diff
    }
  }

  return 0
}

export function arrayRemove<T>(arr: T[], value: T) {
  let i = 0
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1)
    } else {
      ++i
    }
  }
  return arr
}
