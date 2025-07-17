export class Comparator<T = any> {
  asc: (a: T, b: T) => number
  desc = (a: T, b: T) => -this.asc(a, b)

  constructor(asc: (a: T, b: T) => number) {
    this.asc = asc
  }

  compare(v1: T, v2: T, isAsc: boolean) {
    if (isAsc) {
      return this.asc(v1, v2)
    } else {
      return this.desc(v1, v2)
    }
  }
}

export function isObjectEqual(a: any, b: any) {
  if (typeof a !== 'object' && typeof b !== 'object' && a === b) return true
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key) || !isObjectEqual(a[key], b[key])) return false
  }

  return true
}

type ComparatorMap = {
  /** Compare numeric values */
  numeric: Comparator<number>
  /** Compare numeric values in reverse order */
  invertedNumeric: Comparator<number>
  /** Compare strings */
  text: Comparator<string>
  /** Compare strings while grouping numeric values */
  textWithNumbers: Comparator<string>
  /** Compare booleans */
  boolean: Comparator<boolean>
  /** Compare arrays of numeric values */
  arrayNumeric: Comparator<number[]>
  /** Compare arrays of strings */
  arrayText: Comparator<string[]>
}

const comparators: ComparatorMap = {
  numeric: new Comparator((a: number, b: number) => a - b),
  invertedNumeric: new Comparator((a: number, b: number) => b - a),
  text: new Comparator((a: string, b: string) => a.localeCompare(b)),
  textWithNumbers: new Comparator((a: string, b: string) => {
    const pattern = /(\d+)/
    const as = a.split(pattern)
    const bs = b.split(pattern)
    for (let i = 0; i < Math.min(as.length, bs.length); i++) {
      if (i % 2 === 1) {
        const diff = +as[i] - +bs[i]
        if (diff !== 0) return diff
      } else {
        if (as[i] !== bs[i]) return as[i].localeCompare(bs[i])
      }
    }
    return as.length - bs.length
  }),
  boolean: new Comparator((a: boolean, b: boolean) => (a === b ? 0 : a ? 1 : -1)),
  arrayNumeric: new Comparator((a: number[], b: number[]) => {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      const diff = a[i] - b[i]
      if (diff) return diff
    }
    return a.length - b.length
  }),
  arrayText: new Comparator((a: string[], b: string[]) => {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      const diff = a[i].localeCompare(b[i])
      if (diff) return diff
    }
    return a.length - b.length
  }),
}

export default comparators
