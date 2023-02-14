import { FeedArticle } from '@/types/qbit/models'

export default interface Feed {
  name: string
  uid?: string
  url: string
  title?: string
  lastBuildDate?: string
  isLoading?: boolean
  hasError?: boolean
  articles?: FeedArticle[]
}
