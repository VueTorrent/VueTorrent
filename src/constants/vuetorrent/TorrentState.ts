import { TorrentState as QbitTorrentState } from '@/constants/qbit/TorrentState'

export enum TorrentState {
  /** Unknown status */
  UNKNOWN,
  /** Some error occurred, applies to stopped torrents */
  ERROR,
  /** Torrent data files is missing */
  MISSING_FILES,
  /** Torrent is stopped and has NOT finished downloading */
  DL_STOPPED,
  /** Torrent is stopped and has finished downloading */
  UL_STOPPED,
  /** Torrent has just started downloading and is fetching metadata */
  META_DOWNLOAD,
  /** Torrent is forced to fetch metadata */
  FORCED_META_DOWNLOAD,
  /** Queuing is enabled and torrent is queued for upload */
  UL_QUEUED,
  /** Queuing is enabled and torrent is queued for download */
  DL_QUEUED,
  /** Torrent is being seeded, but no connection were made */
  UL_STALLED,
  /** Torrent is being downloaded, but no connection were made */
  DL_STALLED,
  /** Torrent is being seeded and data is being transferred */
  UPLOADING,
  /** Torrent is forced to uploading and ignore queue limit */
  UL_FORCED,
  /** Torrent is being downloaded and data is being transferred */
  DOWNLOADING,
  /** Torrent is forced to downloading to ignore queue limit */
  DL_FORCED,
  /** Torrent pieces are being checked against data on disk */
  CHECKING_DISK,
  /** Checking resume data on qBt startup */
  CHECKING_RESUME_DATA,
  /** Torrent is moving to another location */
  MOVING
}

export const emojiStateMap: Record<TorrentState, string> = {
  [TorrentState.CHECKING_DISK]: '\uD83D\uDD0D',
  [TorrentState.CHECKING_RESUME_DATA]: '\uD83D\uDD0D',
  [TorrentState.DL_FORCED]: '\uD83D\uDCE5',
  [TorrentState.DL_QUEUED]: '⏳',
  [TorrentState.DL_STALLED]: '\uD83D\uDD54',
  [TorrentState.DL_STOPPED]: '⏹️',
  [TorrentState.DOWNLOADING]: '\uD83D\uDCE5',
  [TorrentState.ERROR]: '❌',
  [TorrentState.FORCED_META_DOWNLOAD]: '\uD83D\uDCDD',
  [TorrentState.META_DOWNLOAD]: '\uD83D\uDCDD',
  [TorrentState.MISSING_FILES]: '⚠️',
  [TorrentState.MOVING]: '\uD83D\uDE9A',
  [TorrentState.UL_FORCED]: '\uD83D\uDCE4',
  [TorrentState.UL_QUEUED]: '⏳',
  [TorrentState.UL_STALLED]: '\uD83C\uDF31',
  [TorrentState.UL_STOPPED]: '✅',
  [TorrentState.UNKNOWN]: '❓',
  [TorrentState.UPLOADING]: '\uD83D\uDCE4'
}

export function stateQbitToVt(state: QbitTorrentState): TorrentState {
  switch (state) {
    case QbitTorrentState.META_DL:
      return TorrentState.META_DOWNLOAD
    case QbitTorrentState.FORCED_META_DL:
      return TorrentState.FORCED_META_DOWNLOAD
    case QbitTorrentState.FORCED_DL:
      return TorrentState.DL_FORCED
    case QbitTorrentState.DOWNLOADING:
      return TorrentState.DOWNLOADING
    case QbitTorrentState.STALLED_DL:
    case QbitTorrentState.ALLOCATING:
      return TorrentState.DL_STALLED
    case QbitTorrentState.PAUSED_DL:
    case QbitTorrentState.STOPPED_DL:
      return TorrentState.DL_STOPPED
    case QbitTorrentState.QUEUED_DL:
      return TorrentState.DL_QUEUED
    case QbitTorrentState.FORCED_UP:
      return TorrentState.UL_FORCED
    case QbitTorrentState.UPLOADING:
      return TorrentState.UPLOADING
    case QbitTorrentState.STALLED_UP:
      return TorrentState.UL_STALLED
    case QbitTorrentState.PAUSED_UP:
    case QbitTorrentState.STOPPED_UP:
      return TorrentState.UL_STOPPED
    case QbitTorrentState.QUEUED_UP:
      return TorrentState.UL_QUEUED
    case QbitTorrentState.CHECKING_DL:
    case QbitTorrentState.CHECKING_UP:
      return TorrentState.CHECKING_DISK
    case QbitTorrentState.CHECKING_RESUME_DATA:
      return TorrentState.CHECKING_RESUME_DATA
    case QbitTorrentState.MOVING:
      return TorrentState.MOVING
    case QbitTorrentState.MISSING_FILES:
      return TorrentState.MISSING_FILES
    case QbitTorrentState.ERROR:
      return TorrentState.ERROR
    case QbitTorrentState.UNKNOWN:
    default:
      return TorrentState.UNKNOWN
  }
}

export function stateVtToQbit(state: TorrentState): QbitTorrentState {
  switch (state) {
    case TorrentState.META_DOWNLOAD:
      return QbitTorrentState.META_DL
    case TorrentState.FORCED_META_DOWNLOAD:
      return QbitTorrentState.FORCED_META_DL
    case TorrentState.DL_FORCED:
      return QbitTorrentState.FORCED_DL
    case TorrentState.DOWNLOADING:
      return QbitTorrentState.DOWNLOADING
    case TorrentState.DL_STALLED:
      return QbitTorrentState.STALLED_DL
    case TorrentState.DL_STOPPED:
      return QbitTorrentState.STOPPED_DL
    case TorrentState.DL_QUEUED:
      return QbitTorrentState.QUEUED_DL
    case TorrentState.UL_FORCED:
      return QbitTorrentState.FORCED_UP
    case TorrentState.UPLOADING:
      return QbitTorrentState.UPLOADING
    case TorrentState.UL_STALLED:
      return QbitTorrentState.STALLED_UP
    case TorrentState.UL_STOPPED:
      return QbitTorrentState.STOPPED_UP
    case TorrentState.UL_QUEUED:
      return QbitTorrentState.QUEUED_UP
    case TorrentState.CHECKING_DISK:
      return QbitTorrentState.CHECKING_DL
    case TorrentState.CHECKING_RESUME_DATA:
      return QbitTorrentState.CHECKING_RESUME_DATA
    case TorrentState.MOVING:
      return QbitTorrentState.MOVING
    case TorrentState.MISSING_FILES:
      return QbitTorrentState.MISSING_FILES
    case TorrentState.ERROR:
      return QbitTorrentState.ERROR
    default:
      return QbitTorrentState.UNKNOWN
  }
}
