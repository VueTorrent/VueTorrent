import type { Category, RawQbitTorrent, ServerState } from '@/types/qbit/models'

export type MaindataResponse = FullUpdate | PartialUpdate

export function isFullUpdate(response: MaindataResponse): response is FullUpdate {
  return 'full_update' in response && response.full_update
}

interface FullUpdate {
  /** Whether the response contains all or partial data */
  full_update: true
  /**
   * Response ID
   * Will cycle between 1 and 1,000,000
   **/
  rid: number
  /** Current state of the server */
  server_state: ServerState
  /** Categories data of the server */
  categories?: Record<string, Category>
  /** Tags list of the server */
  tags?: string[]
  /** Torrents data of the server */
  torrents?: Record<string, RawQbitTorrent>
  /**
   * Trackers data of the server
   *
   * Key: Tracker URL
   *
   * Value: Torrents hash array
   */
  trackers?: Record<string, string[]>
}

interface PartialUpdate {
  /**
   * Response ID
   * Will cycle between 1 and 1,000,000
   **/
  rid: number
  /** Diff state of the server since last snapshot */
  server_state?: Partial<ServerState>
  /** Added or updated categories since last snapshot */
  categories?: Record<string, Partial<Category>>
  /** Removed categories' name since last snapshot */
  categories_removed?: string[]
  /** Added tags since last snapshot */
  tags?: string[]
  /** Removed tags since last snapshot */
  tags_removed?: string[]
  /** Added or updated torrents since last snapshot */
  torrents?: Record<string, Partial<RawQbitTorrent>>
  /** Removed torrents' hash since last snapshot */
  torrents_removed?: string[]
  /**
   * Added or updated trackers since last snapshot
   *
   * Key: Tracker URL
   *
   * Value: Torrents hash array
   */
  trackers?: Record<string, string[]>
  /** Removed trackers' URL since last snapshot */
  trackers_removed?: string[]
}
