import { FeedArticle } from '@/types/qbit/models'

export interface RssArticle extends FeedArticle {
  /** Article publication date parsed by dayjs */
  parsedDate: Date
}
