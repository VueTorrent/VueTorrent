export enum AutoDeleteMode {
  NEVER = 0,
  IF_ADDED = 1,
  ALWAYS = 2,
}

export enum BitTorrentProtocol {
  TCP_uTP = 0,
  TCP = 1,
  uTP = 2,
}

export enum ContentLayout {
  ORIGINAL = 'Original',
  SUBFOLDER = 'Subfolder',
  NO_SUBFOLDER = 'NoSubfolder',
}

export enum DynDnsService {
  USE_DYNDNS = 0,
  USE_NOIP = 1,
  USE_NONE = -1,
}

export enum Encryption {
  PREFER_ENCRYPTION = 0,
  FORCE_ON = 1,
  FORCE_OFF = 2,
}

export enum FileLogAgeType {
  DAYS = 0,
  MONTHS = 1,
  YEARS = 2,
}

export enum ShareLimitAction {
  DEFAULT = -1,
  STOP_TORRENT = 0,
  REMOVE_TORRENT = 1,
  ENABLE_SUPERSEEDING = 2,
  REMOVE_TORRENT_AND_FILES = 3,
}

export enum ProxyType {
  NONE = 'None',
  SOCKS4 = 'SOCKS4',
  SOCKS5 = 'SOCKS5',
  HTTP = 'HTTP',
}

export enum ResumeDataStorageType {
  LEGACY = 'Legacy',
  SQLITE = 'SQLite',
}

export enum ScanDirsEnum {
  MONITORED_FOLDER = 0,
  DEFAULT_SAVE_PATH = 1,
}

export type ScanDirs = ScanDirsEnum | string

export enum SchedulerDays {
  EVERY_DAY = 0,
  EVERY_WEEKDAY = 1,
  EVERY_WEEKEND = 2,
  EVERY_MONDAY = 3,
  EVERY_TUESDAY = 4,
  EVERY_WEDNESDAY = 5,
  EVERY_THURSDAY = 6,
  EVERY_FRIDAY = 7,
  EVERY_SATURDAY = 8,
  EVERY_SUNDAY = 9,
}

export enum StopCondition {
  NONE = 'None',
  METADATA_RECEIVED = 'MetadataReceived',
  FILES_CHECKED = 'FilesChecked',
}

export enum TorrentContentRemoveOption {
  DELETE = 'Delete',
  MOVE_TO_TRASH = 'MoveToTrash',
}

export enum UploadChokingAlgorithm {
  ROUND_ROBIN = 0,
  FASTEST_UPLOAD = 1,
  ANTI_LEECH = 2,
}

export enum UploadSlotsBehavior {
  FIXED_SLOTS = 0,
  UPLOAD_RATE_BASED = 1,
}

export enum UtpTcpMixedMode {
  PREFER_TCP = 0,
  PEER_PROPORTIONAL = 1,
}

export enum DiskIOType {
  DEFAULT = 0,
  MEMORY_MAPPED_FILES = 1,
  POSIX_COMPLIANT = 2,
  SIMPLE_PREAD_PWRITE = 3,
}

export enum DiskIOMode {
  DISABLE_OS_CACHE = 0,
  ENABLE_OS_CACHE = 1,
  WRITE_THROUGH = 2,
}
