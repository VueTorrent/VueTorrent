type PluginCategory = { id: string; name: string }

export default interface SearchPlugin {
  /** Whether the plugin is enabled */
  enabled: boolean
  /** Full name of the plugin */
  fullName: string
  /** Short name of the plugin */
  name: string
  /** List of category objects */
  supportedCategories: PluginCategory[]
  /** URL of the torrent site */
  url: string
  /** Installed version of the plugin */
  version: string
}
