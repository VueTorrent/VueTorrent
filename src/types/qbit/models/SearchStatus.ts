export default interface SearchStatus {
  /** ID of the search job */
  id: number
  /** Current status of the search job (either Running or Stopped) */
  status: 'Running' | 'Stopped'
  /** Total number of results. If the status is Running this number may contineu to increase */
  total: number
}
