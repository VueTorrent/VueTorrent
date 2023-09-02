export type TRCMenuEntry = {
  icon?: string
  text: string
  disabled?: boolean
  divider?: boolean
} & ({ action: () => void } | { children: TRCMenuEntry[] })