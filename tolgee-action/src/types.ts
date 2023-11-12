export interface LanguageResponse {
  _embedded: Embedded
  _links: { self: { href: string } }
  page: Page
}

export interface Embedded {
  languages: {
    /** Language ID */
    id: number
    /** English language Name */
    name: string
    /** Locale tag */
    tag: string
    /** Local language name */
    originalName: string
    /** Unicode flag emoji */
    flagEmoji: string
    /** Whether this locale is the project's base locale */
    base: boolean
  }[]
}

export interface Page {
  size: number
  totalElements: number
  totalPages: number
  number: number
}
