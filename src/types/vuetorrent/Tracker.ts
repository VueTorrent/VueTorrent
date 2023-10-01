import type { Tracker as QbitTracker } from '../qbit/models'

export default interface Tracker extends QbitTracker {
  isSelectable: boolean
}
