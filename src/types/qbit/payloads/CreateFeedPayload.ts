import type BasePayload from './BasePayload'

export default interface CreateFeedPayload extends BasePayload {
  url: string
  name: string
}
