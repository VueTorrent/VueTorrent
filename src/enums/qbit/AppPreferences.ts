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
  USE_NOIP
}

export enum Encryption {
  PREFER_ENCRYPTION,
  FORCE_ON,
  FORCE_OFF
}

export enum MaxRatioAction {
  PAUSE_TORRENT = 0,
  REMOVE_TORRENT = 1,
  REMOVE_TORRENT_AND_FILES = 3,
  ENABLE_SUPERSEEDING = 2
}

export enum ProxyType {
  DISABLED = -1,
  HTTP_WITHOUT_AUTH = 1,
  SOCKS5_WITHOUT_AUTH,
  HTTP_WITH_AUTH,
  SOCKS5_WITH_AUTH,
  SOCKS4_WITHOUT_AUTH
}

enum ScanDirsEnum {
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
