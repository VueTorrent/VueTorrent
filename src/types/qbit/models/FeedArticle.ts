export default interface FeedArticle {
  /** Article author */
  author: string
  /** Article category */
  category?: string
  /** Article publication date */
  date: string
  /** Article description */
  description?: string
  /** Article ID */
  id: string
  /** Whether the article has already been read */
  isRead?: boolean
  /** Article link */
  link: string
  /** Article title */
  title: string
  /** Torrent download URL */
  torrentURL: string
}
