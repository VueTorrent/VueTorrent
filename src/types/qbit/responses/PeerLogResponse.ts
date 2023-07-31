interface PeerLog {
  // ID of the peer
  id: number
  // IP of the peer
  ip: string
  // Milliseconds since epoch
  timestamp: number
  // Whether or not the peer was blocked
  blocked: boolean
  // Reason of the block
  reason: string
}

export type PeerLogResponse = PeerLog[]
