declare module 'array.prototype.tosorted' {
  export default function toSorted<T>(arr: T[], compareFn: (a: T, b: T) => number): T[]
}

interface ObjectConstructor {
  /**
   * Returns an array of key/values of the enumerable properties of an object
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   */
  entries<T>(o: T): [keyof T, T[keyof T]][]
}
