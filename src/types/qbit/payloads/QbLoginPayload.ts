import type { QbBasePayload } from '.'

export default interface QbLoginPayload extends QbBasePayload {
  /** Username used to access the WebUI */
  username: string
  /** Password used to access the WebUI */
  password: string
}
