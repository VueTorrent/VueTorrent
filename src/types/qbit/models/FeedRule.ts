export default interface FeedRule {
  /** Add matched torrent in paused mode */
  addPaused: boolean
  /** The feed URLs the rule applied to */
  affectedFeeds: string[]
  /** Assign category to the torrent */
  assignedCategory: string
  /** Whether the rule is enabled */
  enabled: boolean
  /** Episode filter definition */
  episodeFilter: string
  /** Ignore sunsequent rule matches */
  ignoreDays: number
  /** The rule last match time */
  lastMatch: string
  /** The substring that the torrent name must contain */
  mustContain: string
  /** The substring that the torrent name must not contain */
  mustNotContain: string
  /** The list of episode IDs already matched by smart filter */
  previouslyMatchedEpisodes?: unknown[]
  /** Save torrent to the given directory */
  savePath: string
  /** Enable smart episode filter */
  smartFilter: boolean
  torrentContentLayout?: unknown
  /** Enable regex mode in "mustContain" and "mustNotContain" */
  useRegex: boolean
}
