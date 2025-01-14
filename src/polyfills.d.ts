declare module 'array.prototype.tosorted' {
  export default function toSorted<T>(arr: T[], compareFn: (a: T, b: T) => number): T[]
}
