type ClassicRightClickMenuEntry = {
  text: string
  icon?: string
  action?: () => void
  hidden?: boolean
  disabled?: boolean
  disabledText?: string
  disabledIcon?: string
  children?: RightClickMenuEntryType[]
}

type SpecialRightClickMenuEntry = {
  type: 'divider'
}

export type RightClickMenuEntryType = ClassicRightClickMenuEntry | SpecialRightClickMenuEntry

export function isClassicEntry(entry: RightClickMenuEntryType): entry is ClassicRightClickMenuEntry {
  return !isSpecialEntry(entry)
}

export function isSpecialEntry(entry: RightClickMenuEntryType): entry is SpecialRightClickMenuEntry {
  return "type" in entry
}
