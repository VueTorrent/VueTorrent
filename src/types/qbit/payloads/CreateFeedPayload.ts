import type { BasePayload } from '.'

export default interface CreateFeedPayload extends BasePayload {
  url: string
  name?: string
}
