import { AppPreferences } from '.'
import { TorrentOperatingMode } from '@/constants/qbit'
import { ContentLayout, StopCondition } from '@/constants/qbit/AppPreferences'

export default interface AddTorrentParams {
  /** Whether this torrent should be added at the top of the waiting queue */
  add_to_top_of_queue?: boolean
  /** Torrent category */
  category?: string
  /** Overrides the default value of the torrent content layout */
  content_layout?: ContentLayout
  /** Torrent download limit (in kb/s), set to -1 to disable (default) */
  download_limit?: number
  /** Torrent download path */
  download_path?: string
  /**
   * Whether torrent should be started in forced state
   * @default false
   * @since 5.1.0
   */
  forced?: boolean
  /** Inactive upload seeding time limit (in minutes), -1 to disable, -2 to use global value (default) */
  inactive_seeding_time_limit?: number
  /** Torrent operating mode (used for forced state) */
  operating_mode?: TorrentOperatingMode
  /** Ratio limit, -1 to disable, -2 to use global value (default) */
  ratio_limit?: number
  /** Torrent save path */
  save_path?: string
  /** Upload seeding time limit (in minutes), -1 to disable, -2 to use global value (default) */
  seeding_time_limit?: number
  /** Skip hash checking */
  skip_checking?: boolean
  /** Overrides the default value of the torrent stop condition */
  stop_condition?: StopCondition
  /** Whether this torrent should be added in stopped state */
  stopped?: boolean
  /** List of torrent tags */
  tags?: string[]
  /** Torrent upload limit (in kb/s), set to -1 to disable (default) */
  upload_limit?: number
  /** Overrides the default value of the TMM attribute */
  use_auto_tmm?: boolean
  /** Whether the download_path attribute should be used */
  use_download_path?: boolean
}

export function getEmptyParams(prefs?: AppPreferences): AddTorrentParams {
  return {
    save_path: prefs?.save_path ?? '',
    skip_checking: false,
    add_to_top_of_queue: prefs?.add_to_top_of_queue ?? false,
    content_layout: prefs?.torrent_content_layout,
    stop_condition: prefs?.torrent_stop_condition,
    download_limit: prefs?.dl_limit,
    upload_limit: prefs?.up_limit,
    use_download_path: !!prefs?.temp_path,
    download_path: prefs?.temp_path ? prefs?.temp_path : '',
    stopped: prefs?.add_stopped_enabled ?? prefs?.start_paused_enabled,
    use_auto_tmm: prefs?.auto_tmm_enabled,
    ratio_limit: -2,
    seeding_time_limit: -2,
    inactive_seeding_time_limit: -2
  }
}
