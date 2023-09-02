export type TRCMenuEntry = {
  text: string
  icon?: string | boolean
  action?: () => void
  hidden?: boolean
  disabled?: boolean
  disabledText?: string
  disabledIcon?: string
  divider?: boolean
  children?: TRCMenuEntry[]
}