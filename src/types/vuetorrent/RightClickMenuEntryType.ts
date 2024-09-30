type ClassicEntry = {
  text: string
  icon?: string
  hidden?: boolean
  disabled?: boolean
  disabledText?: string
  disabledIcon?: string
  action?: () => void
  children?: RightClickMenuEntryType[]
}

type DividerEntry = {
  type: 'divider'
  props?: Record<string, any>
}

type SpecialEntry = DividerEntry

export type RightClickMenuEntryType = ClassicEntry | SpecialEntry

export function isClassicEntry(entry: RightClickMenuEntryType): entry is ClassicEntry {
  return !isSpecialEntry(entry)
}

export function isSpecialEntry(entry: RightClickMenuEntryType): entry is SpecialEntry {
  return 'type' in entry
}

export function isDividerEntry(entry: RightClickMenuEntryType): entry is DividerEntry {
  return isSpecialEntry(entry) && entry.type === 'divider'
}
