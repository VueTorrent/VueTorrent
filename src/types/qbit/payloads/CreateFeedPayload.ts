import type { BasePayload } from './index.ts'

export default interface CreateFeedPayload extends BasePayload {
  url: string
  name?: string
}
