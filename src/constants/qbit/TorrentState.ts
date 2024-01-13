export enum TorrentState {
  /** Torrent has just started downloading and is fetching metadata */
  META_DL = '下载元数据',
  /** Torrent is forced to downloading to ignore queue limit */
  FORCED_DL = '[F] 下载',
  /** Torrent is being downloaded and data is being transferred */
  DOWNLOADING = '下载',
  /** Torrent is being downloaded, but no connection were made */
  STALLED_DL = '停滞',
  /** Torrent is paused and has NOT finished downloading */
  PAUSED_DL = '暂停',
  /** Queuing is enabled and torrent is queued for download */
  QUEUED_DL = '排队',
  /** Torrent is forced to uploading and ignore queue limit */
  FORCED_UP = '[F] 做种',
  /** Torrent is being seeded and data is being transferred */
  UPLOADING = '做种',
  /** Torrent is being seeded, but no connection were made */
  STALLED_UP = '等待',
  /** Torrent is paused and has finished downloading */
  PAUSED_UP = '完成',
  /** Queuing is enabled and torrent is queued for upload */
  QUEUED_UP = '排队',
  /** Same as checkingUP, but torrent has NOT finished downloading */
  CHECKING_DL = '校验',
  /** Torrent has finished downloading and is being checked */
  CHECKING_UP = '校验',
  /** Checking resume data on qBt startup */
  CHECKING_RESUME_DATA = '校验恢复数据',
  /** Torrent is allocating disk space for download */
  ALLOCATING = '分配中',
  /** Torrent is moving to another location */
  MOVING = '移动中',
  /** Torrent data files is missing */
  MISSING_FILES = '丢失文件',
  /** Some error occurred, applies to paused torrents */
  ERROR = '错误',
  /** Unknown status */
  UNKNOWN = '未知'
}
