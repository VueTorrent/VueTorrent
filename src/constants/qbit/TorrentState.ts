export enum TorrentState {
  /** Torrent has just started downloading and is fetching metadata */
  META_DL = 'metaDL',
  /** Torrent is forced to fetch metadata */
  FORCED_META_DL = 'forcedMetaDL',
  /** Torrent is forced to downloading to ignore queue limit */
  FORCED_DL = 'forcedDL',
  /** Torrent is being downloaded and data is being transferred */
  DOWNLOADING = 'downloading',
  /** Torrent is being downloaded, but no connection were made */
  STALLED_DL = 'stalledDL',
  /** Torrent is stopped and has NOT finished downloading
   * @deprecated since 5.X, use STOPPED_DL instead
   */
  PAUSED_DL = 'pausedDL',
  /** Torrent is stopped and has NOT finished downloading */
  STOPPED_DL = 'stoppedDL',
  /** queueing is enabled and torrent is queued for download */
  QUEUED_DL = 'queuedDL',
  /** Torrent is forced to uploading and ignore queue limit */
  FORCED_UP = 'forcedUP',
  /** Torrent is being seeded and data is being transferred */
  UPLOADING = 'uploading',
  /** Torrent is being seeded, but no connection were made */
  STALLED_UP = 'stalledUP',
  /**
   * Torrent is stopped and has finished downloading
   * @deprecated since 5.X, use `STOPPED_UP` instead
   */
  PAUSED_UP = 'pausedUP',
  /** Torrent is stopped and has finished downloading */
  STOPPED_UP = 'stoppedUP',
  /** queueing is enabled and torrent is queued for upload */
  QUEUED_UP = 'queuedUP',
  /** Same as checkingUP, but torrent has NOT finished downloading */
  CHECKING_DL = 'checkingDL',
  /** Torrent has finished downloading and is being checked */
  CHECKING_UP = 'checkingUP',
  /** Checking resume data on qBt startup */
  CHECKING_RESUME_DATA = 'checkingResumeData',
  /** Torrent is allocating disk space for download
   * @deprecated since 4.4.0, libtorrent 2.X
   */
  ALLOCATING = 'allocating',
  /** Torrent is moving to another location */
  MOVING = 'moving',
  /** Torrent data files is missing */
  MISSING_FILES = 'missingFiles',
  /** Some error occurred, applies to stopped torrents */
  ERROR = 'error',
  /** Unknown status */
  UNKNOWN = 'unknown',
}
