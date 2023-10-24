import { FeedArticle } from '@/types/qbit/models'

export interface RssArticle extends FeedArticle {
  parsedDate: Date
}
