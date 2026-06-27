import type { RssArticle } from './RssArticle'
import type { Feed } from '@/types/qbit/models'

export interface RssFeed extends Feed {
  articles?: RssArticle[]
}
