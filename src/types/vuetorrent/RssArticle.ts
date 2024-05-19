import { FeedArticle } from '@/types/qbit/models'

export interface RssArticle extends FeedArticle {
  /** UID of the parent feed */
  feedId: string
  /** Article publication date parsed by dayjs */
  parsedDate: Date
}
