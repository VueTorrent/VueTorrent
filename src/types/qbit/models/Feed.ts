import FeedArticle from './FeedArticle'

export default interface Feed {
  name: string
  uid: string
  url: string
  /**
   * Refresh interval override, in seconds
   * @since NOT YET RELEASED
   */
  refreshInterval?: number
  title?: string
  lastBuildDate?: string
  isLoading?: boolean
  hasError?: boolean
  articles?: FeedArticle[]
}
