import { FeedArticle } from '@/types/qbit/models'

export interface RssArticle extends FeedArticle {
  feedName: string
  parsedDate: Date
}