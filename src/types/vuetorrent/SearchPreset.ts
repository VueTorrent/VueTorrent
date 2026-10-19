/** Which parts of a search tab a preset captures and restores. */
export interface SearchPresetCapture {
  sortBy: boolean
  itemsPerPage: boolean
  categoryAndPlugin: boolean
  /**
   * The title filter is query-specific, so it is opt-in: restoring "1080p" onto an
   * unrelated search is rarely what the user wants.
   */
  titleFilter: boolean
}

export interface SearchPreset {
  /** Stable identity, so the default survives renames and reordering. */
  id: string
  name: string
  capture: SearchPresetCapture
  sortBy: { key: string; order: 'asc' | 'desc' }[]
  itemsPerPage: number
  category: string
  plugin: string
  title: string
}

export function defaultSearchPresetCapture(): SearchPresetCapture {
  return {
    sortBy: true,
    itemsPerPage: true,
    categoryAndPlugin: true,
    titleFilter: false,
  }
}
