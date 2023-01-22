import type { BasePayload } from '.'

export default interface LoginPayload extends BasePayload {
  /** Username used to access the WebUI */
  username: string
  /** Password used to access the WebUI */
  password: string
}
