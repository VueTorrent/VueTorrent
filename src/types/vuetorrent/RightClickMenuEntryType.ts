export type RightClickMenuEntryType = {
  text: string
  icon?: string
  hidden?: boolean
  disabled?: boolean
  disabledText?: string
  disabledIcon?: string
  action?: () => void
  children?: RightClickMenuEntryType[]
  slots?: {
    top?: RightClickMenuEntryType[]
    bottom?: RightClickMenuEntryType[]
  }
}
