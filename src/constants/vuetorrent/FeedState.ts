/** RSS Feed state values ordered by priority of display */
export enum FeedState {
  /** Feed is updating */
  LOADING,
  /** Feed has encountered an error */
  ERROR,
  /** At least one article is unread */
  UNREAD,
  /** All articles are read */
  READ
}
