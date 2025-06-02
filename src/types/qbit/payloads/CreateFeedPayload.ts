export default interface CreateFeedPayload {
  url: string
  name: string
  /**
   * @default 0 (use global setting)
   * @since NOT YET RELEASED
   */
  refreshInterval?: number
}
