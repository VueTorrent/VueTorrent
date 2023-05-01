export enum TorrentState {
  DOWNLOADING = 'downloading',
  SEEDING = 'seeding',
  PAUSED = 'paused',
  STALLED = 'stalled',
  METADATA = 'metadata',
  DONE = 'done',
  QUEUED = 'queued',
  CHECKING = 'checking',
  MOVING = 'moving',
  FAIL = 'fail',
  UNKNOWN = 'unknown'
}
