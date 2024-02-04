export default interface PeerLogPayload {
  /** Exclude messages with "message id" <= last_known_id (default: -1) */
  last_known_id?: number
}
