export enum FilterState {
  ALL = 'all',
  DOWNLOADING = 'downloading',
  SEEDING = 'seeding',
  COMPLETED = 'completed',
  /** @deprecated since 5.X, use stopped instead */
  PAUSED = 'paused',
  STOPPED = 'stopped',
  /** @deprecated since 5.X, use running instead */
  RESUMED = 'resumed',
  RUNNING = 'running',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  STALLED = 'stalled',
  STALLED_UPLOADING = 'stalled_uploading',
  STALLED_DOWNLOADING = 'stalled_downloading',
  CHECKING = 'checking',
  MOVING = 'moving',
  ERRORED = 'errored',
}
