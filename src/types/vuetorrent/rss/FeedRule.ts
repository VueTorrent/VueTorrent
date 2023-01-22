export default interface FeedRule {
  addPaused?: boolean
  affectedFeeds?: string[]
  assignedCategory?: string
  enabled: boolean
  episodeFilter?: string
  ignoreDays?: number
  lastMatch?: string
  mustContain?: string
  mustNotContain?: string
  name: string
  previouslyMatchedEpisodes?: unknown[]
  savePath?: string
  smartFilter?: boolean
  useRegex?: boolean
}
