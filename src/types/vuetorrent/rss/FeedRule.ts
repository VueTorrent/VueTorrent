import { FeedRule as QbitFeedRule } from '@/types/qbit/models'

export default interface FeedRule extends Partial<QbitFeedRule> {
  name: string
}
