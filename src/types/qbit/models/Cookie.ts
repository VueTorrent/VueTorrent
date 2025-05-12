export default interface Cookie {
  /** Cookie domain */
  domain: string
  /** Cookie path */
  path: string
  /** Cookie name */
  name: string
  /** Cookie value */
  value: string
  /**
   * Cookie expiration date
   * In seconds since Epoch (local server time)
   */
  expirationDate: number
}
