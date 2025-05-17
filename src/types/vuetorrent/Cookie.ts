import { Cookie as QbitCookie } from '@/types/qbit/models'

export default class Cookie {
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

  constructor(cookie: Cookie | QbitCookie) {
    this.domain = cookie.domain
    this.path = cookie.path
    this.name = cookie.name
    this.value = cookie.value
    this.expirationDate = cookie.expirationDate
  }

  equals(other: Cookie | null | undefined) {
    return this.name === other?.name && this.domain === other.domain && this.path === other.path
  }
}
