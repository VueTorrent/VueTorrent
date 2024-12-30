import { comparators, QBIT_MAX_ETA } from '@/helpers'
import { Torrent } from '@/types/vuetorrent'

const comparatorMap: Record<keyof Torrent, (a: Torrent, b: Torrent, isAsc: boolean) => number> = {
  added_on: (a, b, isAsc) => comparators.numeric.compare(a.added_on, b.added_on, isAsc),
  amount_left: (a, b, isAsc) => comparators.numeric.compare(a.amount_left, b.amount_left, isAsc),
  auto_tmm: (a, b, isAsc) => comparators.boolean.compare(a.auto_tmm, b.auto_tmm, isAsc),
  availability: (a, b, isAsc) => comparators.numeric.compare(a.availability, b.availability, isAsc),
  available_peers: (a, b, isAsc) => comparators.numeric.compare(a.available_peers, b.available_peers, isAsc),
  available_seeds: (a, b, isAsc) => comparators.numeric.compare(a.available_seeds, b.available_seeds, isAsc),
  avgDownloadSpeed: (a, b, isAsc) => comparators.numeric.compare(a.avgDownloadSpeed, b.avgDownloadSpeed, isAsc),
  avgUploadSpeed: (a, b, isAsc) => comparators.numeric.compare(a.avgUploadSpeed, b.avgUploadSpeed, isAsc),
  basename_content_path: (a, b, isAsc) => comparators.textWithNumbers.compare(a.basename_content_path, b.basename_content_path, isAsc),
  basename_download_path: (a, b, isAsc) => comparators.textWithNumbers.compare(a.basename_download_path, b.basename_download_path, isAsc),
  basename_save_path: (a, b, isAsc) => comparators.textWithNumbers.compare(a.basename_save_path, b.basename_save_path, isAsc),
  category: (a, b, isAsc) => comparators.textWithNumbers.compare(a.category, b.category, isAsc),
  completed_on: (a, b, isAsc) => comparators.numeric.compare(a.completed_on, b.completed_on, isAsc),
  content_path: (a, b, isAsc) => comparators.textWithNumbers.compare(a.content_path, b.content_path, isAsc),
  dl_limit: (a, b, isAsc) => comparators.numeric.compare(a.dl_limit, b.dl_limit, isAsc),
  dlspeed: (a, b, isAsc) => comparators.numeric.compare(a.dlspeed, b.dlspeed, isAsc),
  download_path: (a, b, isAsc) => comparators.textWithNumbers.compare(a.download_path, b.download_path, isAsc),
  downloaded: (a, b, isAsc) => comparators.numeric.compare(a.downloaded, b.downloaded, isAsc),
  downloaded_session: (a, b, isAsc) => comparators.numeric.compare(a.downloaded_session, b.downloaded_session, isAsc),
  eta: (a, b, isAsc) => comparators.numeric.compare(a.eta === 0 && a.forced ? QBIT_MAX_ETA : a.eta, b.eta === 0 && b.forced ? QBIT_MAX_ETA : b.eta, isAsc),
  f_l_piece_prio: (a, b, isAsc) => comparators.boolean.compare(a.f_l_piece_prio, b.f_l_piece_prio, isAsc),
  forced: (a, b, isAsc) => comparators.boolean.compare(a.forced, b.forced, isAsc),
  globalSpeed: (a, b, isAsc) => comparators.numeric.compare(a.globalSpeed, b.globalSpeed, isAsc),
  globalVolume: (a, b, isAsc) => comparators.numeric.compare(a.globalVolume, b.globalVolume, isAsc),
  hash: (a, b, isAsc) => comparators.text.compare(a.hash, b.hash, isAsc),
  inactive_seeding_time_limit: (a, b, isAsc) => comparators.numeric.compare(a.inactive_seeding_time_limit, b.inactive_seeding_time_limit, isAsc),
  infohash_v1: (a, b, isAsc) => comparators.text.compare(a.infohash_v1, b.infohash_v1, isAsc),
  infohash_v2: (a, b, isAsc) => comparators.text.compare(a.infohash_v2, b.infohash_v2, isAsc),
  last_activity: (a, b, isAsc) => comparators.invertedNumeric.compare(a.last_activity, b.last_activity, isAsc),
  magnet: (a, b, isAsc) => comparators.text.compare(a.magnet, b.magnet, isAsc),
  name: (a, b, isAsc) => comparators.textWithNumbers.compare(a.name, b.name, isAsc),
  num_leechs: (a, b, isAsc) => comparators.numeric.compare(a.num_leechs, b.num_leechs, isAsc) || comparators.numeric.compare(a.available_peers, b.available_peers, isAsc),
  num_seeds: (a, b, isAsc) => comparators.numeric.compare(a.num_seeds, b.num_seeds, isAsc) || comparators.numeric.compare(a.available_seeds, b.available_seeds, isAsc),
  priority: (a, b, isAsc) => {
    if (a.priority > 0 && b.priority > 0) return comparators.numeric.compare(a.priority, b.priority, isAsc)
    else if (a.priority <= 0 && b.priority <= 0) return comparators.numeric.compare(a.added_on, b.added_on, isAsc)
    else if (a.priority <= 0) return 1
    else return -1
  },
  progress: (a, b, isAsc) => comparators.numeric.compare(a.progress, b.progress, isAsc),
  ratio: (a, b, isAsc) => comparators.numeric.compare(a.ratio, b.ratio, isAsc),
  ratio_limit: (a, b, isAsc) => comparators.numeric.compare(a.ratio_limit, b.ratio_limit, isAsc),
  savePath: (a, b, isAsc) => comparators.textWithNumbers.compare(a.savePath, b.savePath, isAsc),
  seeding_time: (a, b, isAsc) => comparators.numeric.compare(a.seeding_time, b.seeding_time, isAsc),
  seeding_time_limit: (a, b, isAsc) => comparators.numeric.compare(a.seeding_time_limit, b.seeding_time_limit, isAsc),
  seen_complete: (a, b, isAsc) => comparators.numeric.compare(a.seen_complete, b.seen_complete, isAsc),
  seq_dl: (a, b, isAsc) => comparators.boolean.compare(a.seq_dl, b.seq_dl, isAsc),
  size: (a, b, isAsc) => comparators.numeric.compare(a.size, b.size, isAsc),
  state: (a, b, isAsc) => comparators.numeric.compare(a.state, b.state, isAsc),
  super_seeding: (a, b, isAsc) => comparators.boolean.compare(a.super_seeding, b.super_seeding, isAsc),
  tags: (a, b, isAsc) => comparators.arrayText.compare(a.tags, b.tags, isAsc),
  time_active: (a, b, isAsc) => comparators.numeric.compare(a.time_active, b.time_active, isAsc),
  total_size: (a, b, isAsc) => comparators.numeric.compare(a.total_size, b.total_size, isAsc),
  tracker: (a, b, isAsc) => comparators.text.compare(a.tracker, b.tracker, isAsc),
  trackerDomain: (a, b, isAsc) => comparators.text.compare(a.trackerDomain, b.trackerDomain, isAsc),
  trackers_count: (a, b, isAsc) => comparators.numeric.compare(a.trackers_count, b.trackers_count, isAsc),
  truncated_hash: (a, b, isAsc) => comparators.text.compare(a.truncated_hash, b.truncated_hash, isAsc),
  up_limit: (a, b, isAsc) => comparators.numeric.compare(a.up_limit, b.up_limit, isAsc),
  uploaded: (a, b, isAsc) => comparators.numeric.compare(a.uploaded, b.uploaded, isAsc),
  uploaded_session: (a, b, isAsc) => comparators.numeric.compare(a.uploaded_session, b.uploaded_session, isAsc),
  upspeed: (a, b, isAsc) => comparators.numeric.compare(a.upspeed, b.upspeed, isAsc)
}

export default comparatorMap
