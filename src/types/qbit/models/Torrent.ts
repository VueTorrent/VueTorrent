import type { TorrentState } from '@/enums/qbit'

export default interface Torrent {
  // Time (Unix Epoch) when the torrent was added to the client
  added_on: number
  // Amount of data left to download (bytes)
  amount_left: number
  // Whether this torrent is managed by Automatic Torrent Management
  auto_tmm: boolean
  // Percentage of file pieces currently available
  availability: number
  // Category of the torrent
  category: string
  // Amount of transfer data completed (bytes)
  completed: number
  // Time (Unix Epoch) when the torrent completed
  completion_on: number
  // Absolute path of torrent content (root path for multifile torrents, absolute file path for singlefile torrents)
  content_path: string
  // Torrent download speed limit (bytes/s). -1 if ulimited.
  dl_limit: number
  // Torrent download speed (bytes/s)
  dlspeed: number
  // Amount of data downloaded
  downloaded: number
  // Amount of data downloaded this session
  downloaded_session: number
  // Torrent ETA (seconds)
  eta: number
  // True if first last piece are prioritized
  f_l_piece_prio: boolean
  // True if force start is enabled for this torrent
  force_start: boolean
  // Torrent hash
  hash: string
  // Last time (Unix Epoch) when a chunk was downloaded/uploaded
  last_activity: number
  // Magnet URI corresponding to this torrent
  magnet_uri: string
  // Maximum share ratio until torrent is stopped from seeding/uploading
  max_ratio: number
  // Maximum seeding time (seconds) until torrent is stopped from seeding
  max_seeding_time: number
  // Torrent name
  name: string
  // Number of seeds in the swarm
  num_complete: number
  // Number of leechers in the swarm
  num_incomplete: number
  // Number of leechers connected to
  num_leechs: number
  // Number of seeds connected to
  num_seeds: number
  // Torrent priority. Returns -1 if queuing is disabled or torrent is in seed mode
  priority: number
  // Torrent progress (percentage/100)
  progress: number
  // Torrent share ratio. Max ratio value: 9999.
  ratio: number
  ratio_limit: number
  // Path where this torrent's data is stored
  save_path: string
  // Torrent elapsed time while complete (seconds)
  seeding_time: number
  seeding_time_limit: number
  // Time (Unix Epoch) when this torrent was last seen complete
  seen_complete: number
  // True if sequential download is enabled
  seq_dl: boolean
  // Total size (bytes) of files selected for download
  size: number
  // Torrent state. See table here below for the possible values
  state: TorrentState
  // True if super seeding is enabled
  super_seeding: boolean
  // Comma-concatenated tag list of the torrent
  tags: string
  // Total active time (seconds)
  time_active: number
  // Total size (bytes) of all file in this torrent (including unselected ones)
  total_size: number
  // The first tracker with working status. Returns empty string if no tracker is working.
  tracker: string
  // Torrent upload speed limit (bytes/s). -1 if unlimited.
  up_limit: number
  // Amount of data uploaded
  uploaded: number
  // Amount of data uploaded this session
  uploaded_session: number
  // Torrent upload speed (bytes/s)
  upspeed: number
}
