import comparators, { Comparator } from '@/helpers/comparators'
import Torrent from '@/types/vuetorrent/Torrent'

const comparatorMap: Record<keyof Torrent, Comparator> = {
  added_on: comparators.numeric,
  amount_left: comparators.numeric,
  availability: comparators.numeric,
  avgDownloadSpeed: comparators.numeric,
  avgUploadSpeed: comparators.numeric,
  available_peers: comparators.numeric,
  available_seeds: comparators.numeric,
  category: comparators.text,
  completed_on: comparators.numeric,
  content_path: comparators.text,
  dl_limit: comparators.numeric,
  dlspeed: comparators.numeric,
  download_path: comparators.text,
  downloaded: comparators.numeric,
  downloaded_session: comparators.numeric,
  eta: comparators.numeric,
  globalSpeed: comparators.numeric,
  globalVolume: comparators.numeric,
  hash: comparators.text,
  inactive_seeding_time_limit: comparators.numeric,
  infohash_v1: comparators.text,
  infohash_v2: comparators.text,
  last_activity: comparators.invertedNumeric,
  name: comparators.numeric,
  num_leechs: comparators.numeric,
  num_seeds: comparators.numeric,
  priority: comparators.numeric,
  progress: comparators.numeric,
  ratio: comparators.numeric,
  ratio_limit: comparators.numeric,
  savePath: comparators.text,
  seeding_time: comparators.numeric,
  seeding_time_limit: comparators.numeric,
  seen_complete: comparators.numeric,
  size: comparators.numeric,
  state: comparators.text,
  tags: comparators.arrayText,
  time_active: comparators.numeric,
  total_size: comparators.numeric,
  tracker_domain: comparators.text,
  trackers_count: comparators.numeric,
  up_limit: comparators.numeric,
  uploaded: comparators.numeric,
  uploaded_session: comparators.numeric,
  upspeed: comparators.numeric
}

export default comparatorMap
