import {FeedArticle} from "@/types/qbit/models"

export default interface Feed {
  uid: string
  url: string
  title?: string
  lastBuildDate?: string
  isLoading?: boolean
  hasError?: boolean
  articles?: FeedArticle[]
}
