export enum AutoDeleteMode {
  NEVER,
  IF_ADDED,
  ALWAYS
}

export enum BitTorrentProtocol {
  TCP_uTP,
  TCP,
  uTP
}

export enum ContentLayout {
  ORIGINAL = 'Original',
  SUBFOLDER = 'Subfolder',
  NO_SUBFOLDER = 'NoSubfolder'
}

export enum DynDnsService {
  USE_DYNDNS,
  USE_NOIP,
  USE_NONE = -1
}

export enum Encryption {
  PREFER_ENCRYPTION,
  FORCE_ON,
  FORCE_OFF
}

export enum FileLogAgeType {
  DAYS,
  MONTHS,
  YEARS
}

export enum ShareLimitAction {
  DEFAULT = -1,
  STOP_TORRENT = 0,
  REMOVE_TORRENT = 1,
  ENABLE_SUPERSEEDING = 2,
  REMOVE_TORRENT_AND_FILES = 3
}

export enum ProxyType {
  NONE = 'None',
  SOCKS4 = 'SOCKS4',
  SOCKS5 = 'SOCKS5',
  HTTP = 'HTTP'
}

export enum ResumeDataStorageType {
  LEGACY = 'Legacy',
  SQLITE = 'SQLite'
}

export enum ScanDirsEnum {
  MONITORED_FOLDER,
  DEFAULT_SAVE_PATH
}

export type ScanDirs = ScanDirsEnum | string

export enum SchedulerDays {
  EVERY_DAY,
  EVERY_WEEKDAY,
  EVERY_WEEKEND,
  EVERY_MONDAY,
  EVERY_TUESDAY,
  EVERY_WEDNESDAY,
  EVERY_THURSDAY,
  EVERY_FRIDAY,
  EVERY_SATURDAY,
  EVERY_SUNDAY
}

export enum StopCondition {
  NONE = 'None',
  METADATA_RECEIVED = 'MetadataReceived',
  FILES_CHECKED = 'FilesChecked'
}

export enum TorrentContentRemoveOption {
  DELETE = 'Delete',
  MOVE_TO_TRASH = 'MoveToTrash'
}

export enum UploadChokingAlgorithm {
  ROUND_ROBIN,
  FASTEST_UPLOAD,
  ANTI_LEECH
}

export enum UploadSlotsBehavior {
  FIXED_SLOTS,
  UPLOAD_RATE_BASED
}

export enum UtpTcpMixedMode {
  PREFER_TCP,
  PEER_PROPORTIONAL
}

export enum DiskIOType {
  DEFAULT,
  MEMORY_MAPPED_FILES,
  POSIX_COMPLIANT,
  SIMPLE_PREAD_PWRITE
}

export enum DiskIOMode {
  DISABLE_OS_CACHE,
  ENABLE_OS_CACHE,
  WRITE_THROUGH
}
