export default {
  numeric: {
    asc: (a: number, b: number) => a - b,
    desc: (a: number, b: number) => b - a
  },
  invertedNumeric: {
    asc: (a: number, b: number) => b - a,
    desc: (a: number, b: number) => a - b
  },
  text: {
    asc: (a: string, b: string) => a.localeCompare(b),
    desc: (a: string, b: string) => b.localeCompare(a)
  },
  boolean: {
    asc: (a: boolean, b: boolean) => a === b ? 0 : a ? 1 : -1,
    desc: (a: boolean, b: boolean) => a === b ? 0 : a ? -1 : 1
  }
}

export type Comparator<T> = {
  asc: (a: T, b: T) => number
  desc: (a: T, b: T) => number
}