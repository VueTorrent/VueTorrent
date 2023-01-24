export enum TorrentState {
  /** Some error occurred, applies to paused torrents */
  ERROR = 'error',
  /** Torrent data files is missing */
  MISSING_FILES = 'missingFiles',
  /** Torrent is being seeded and data is being transferred */
  UPLOADING = 'uploading',
  /** Torrent is paused and has finished downloading */
  PAUSED_UP = 'pausedUP',
  /** Queuing is enabled and torrent is queued for upload */
  QUEUED_UP = 'queuedUP',
  /** Torrent is being seeded, but no connection were made */
  STALLED_UP = 'stalledUP',
  /** Torrent has finished downloading and is being checked */
  CHECKING_UP = 'checkingUP',
  /** Torrent is forced to uploading and ignore queue limit */
  FORCED_UP = 'forcedUP',
  /** Torrent is allocating disk space for download */
  ALLOCATING = 'allocating',
  /** Torrent is being downloaded and data is being transferred */
  DOWNLOADING = 'downloading',
  /** Torrent has just started downloading and is fetching metadata */
  META_DL = 'metaDL',
  /** Torrent is paused and has NOT finished downloading */
  PAUSED_DL = 'pausedDL',
  /** Queuing is enabled and torrent is queued for download */
  QUEUED_DL = 'queuedDL',
  /** Torrent is being downloaded, but no connection were made */
  STALLED_DL = 'stalledDL',
  /** Same as checkingUP, but torrent has NOT finished downloading */
  CHECKING_DL = 'checkingDL',
  /** Torrent is forced to downloading to ignore queue limit */
  FORCED_DL = 'forcedDL',
  /** Checking resume data on qBt startup */
  CHECKING_RESUME_DATA = 'checkingResumeData',
  /** Torrent is moving to another location */
  MOVING = 'moving',
  /** Unknown status */
  UNKNOWN = 'unknown'
}
