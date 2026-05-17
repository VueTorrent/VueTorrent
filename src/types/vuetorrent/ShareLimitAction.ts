export enum ShareLimitAction {
  DEFAULT = -1,
  STOP_TORRENT = 0,
  REMOVE_TORRENT = 1,
  ENABLE_SUPERSEEDING = 2,
  REMOVE_TORRENT_AND_FILES = 3,
}

export type ShareLimitActionString = 'Default' | 'Stop' | 'Remove' | 'RemoveWithContent' | 'EnableSuperSeeding'

export { ShareLimitAction as default }
