import type { QbBasePayload } from '.'

export default interface QbCreateFeedPayload extends QbBasePayload {
  url: string
  name?: string
}
