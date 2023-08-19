import type { BasePayload } from './index'

export default interface CreateFeedPayload extends BasePayload {
  url: string
  name: string
}
