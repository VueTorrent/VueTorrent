import { ApplyTo } from '@/constants/vuetorrent'

export interface BulkRenameConfig {
  useRegex: boolean
  matchAll: boolean
  caseSensitive: boolean
  applyTo: ApplyTo
  includeFiles: boolean
  includeFolders: boolean
  includeChildren: boolean
}
