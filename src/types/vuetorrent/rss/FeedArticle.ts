import { FeedArticle as QbitFeedArticle } from '@/types/qbit/models'

export default interface FeedArticle extends QbitFeedArticle {
  feedName: string
  parsedDate: Date
}
