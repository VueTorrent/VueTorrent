export type RightClickMenuEntryType = {
  text: string
  icon?: string
  action?: () => void
  hidden?: boolean
  disabled?: boolean
  disabledText?: string
  disabledIcon?: string
  children?: RightClickMenuEntryType[]
}
