import type { Optional } from '@/global'
import type { QbBasePayload } from '.'

export default interface QbPeerLogPayload extends QbBasePayload {
  // Exclude messages with "message id" <= last_known_id (default: -1)
  last_known_id: Optional<number>
}
