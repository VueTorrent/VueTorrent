import { FeedArticle } from '@/types/qbit/models'

export interface RssArticle extends FeedArticle {
  /** UID of the parent feed */
  feedIds: string[]
  /** Article publication date parsed by dayjs */
  parsedDate: Date
}
