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
  },
  arrayNumeric: {
    asc: (a: number[], b: number[]) => {
      for (let i = 0; i < Math.min(a.length, b.length); i++) {
        const diff = a[i] - b[i];
        if (diff) return diff;
      }
      return a.length - b.length;
    },
    desc: (a: number[], b: number[]) => {
      for (let i = 0; i < Math.min(a.length, b.length); i++) {
        const diff = b[i] - a[i];
        if (diff) return diff;
      }
      return b.length - a.length;
    }
  },
  arrayText: {
    asc: (a: string[], b: string[]) => {
      for (let i = 0; i < Math.min(a.length, b.length); i++) {
        const diff = a[i].localeCompare(b[i]);
        if (diff) return diff;
      }
      return a.length - b.length;
    },
    desc: (a: string[], b: string[]) => {
      for (let i = 0; i < Math.min(a.length, b.length); i++) {
        const diff = b[i].localeCompare(a[i]);
        if (diff) return diff;
      }
      return b.length - a.length;
    }
  }
}

export type Comparator<T = any> = {
  asc: (a: T, b: T) => number
  desc: (a: T, b: T) => number
}