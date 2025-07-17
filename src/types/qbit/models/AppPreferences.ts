import type {
  BitTorrentProtocol,
  ContentLayout,
  DiskIOMode,
  DiskIOType,
  DynDnsService,
  Encryption,
  ProxyType,
  ScanDirs,
  SchedulerDays,
  ShareLimitAction,
  StopCondition,
  UploadChokingAlgorithm,
  UploadSlotsBehavior,
  UtpTcpMixedMode,
} from '@/constants/qbit/AppPreferences'
import { AutoDeleteMode, FileLogAgeType, ResumeDataStorageType, TorrentContentRemoveOption } from '@/constants/qbit/AppPreferences'

export interface NetworkInterface {
  name: string
  value: string
}

export default interface AppPreferences {
  /** Whether torrents should be placed at the top of the queue when added */
  add_to_top_of_queue: boolean
  /** List of trackers to add to new torrent */
  add_trackers: string
  /** Enable automatic adding of trackers to new torrents */
  add_trackers_enabled: boolean
  /**
   * Enable automatic adding of trackers from provided url to new torrents
   * @since 5.1.0
   */
  add_trackers_from_url_enabled?: boolean
  /**
   * URL to fetch trackers from
   * @since 5.1.0
   */
  add_trackers_url?: string
  /**
   * List of trackers fetched from URL
   * @since 5.1.0
   */
  readonly add_trackers_url_list?: string
  /** Alternative global download speed limit in KiB/s */
  alt_dl_limit: number
  /** Alternative global upload speed limit in KiB/s */
  alt_up_limit: number
  /** True if an alternative WebUI should be used */
  alternative_webui_enabled: boolean
  /** File path to the alternative WebUI */
  alternative_webui_path: string
  /** IP address reported to trackers */
  announce_ip: string
  /** True always announce to all tiers */
  announce_to_all_tiers: boolean
  /** True always announce to all trackers in a tier */
  announce_to_all_trackers: boolean
  /** If true anonymous mode will be enabled; read more here; this option is only available in qBittorent built against libtorrent version 0.16.X and higher */
  anonymous_mode: boolean
  /** Number of asynchronous I/O threads */
  async_io_threads: number
  /** Delete .torrent files afterwards */
  auto_delete_mode: AutoDeleteMode
  /** True if Automatic Torrent Management is enabled by default */
  auto_tmm_enabled: boolean
  /** True if external program should be run after torrent has finished downloading */
  autorun_enabled: boolean
  /** True if external program should be run after torrent has been added */
  autorun_on_torrent_added_enabled: boolean
  /** Program path/name/arguments to run if autorun_on_torrent_added_enabled is enabled; path is separated by slashes; you can use %f and %n arguments, which will be expanded by qBittorent as path_to_torrent_file and torrent_name (from the GUI; not the .torrent file name) respectively */
  autorun_on_torrent_added_program: string
  /** Program path/name/arguments to run if autorun_enabled is enabled; path is separated by slashes; you can use %f and %n arguments, which will be expanded by qBittorent as path_to_torrent_file and torrent_name (from the GUI; not the .torrent file name) respectively */
  autorun_program: string
  /** List of banned IPs */
  banned_IPs: string
  /** depth limit used when decoding bencoded torrent files */
  bdecode_depth_limit: number
  /** token limit used when decoding bencoded torrent files */
  bdecode_token_limit: number
  /** Bittorrent Protocol to use */
  bittorrent_protocol: BitTorrentProtocol
  /** Whether peers connection should be blocked on privileged ports (< 1024) */
  block_peers_on_privileged_ports: boolean
  /** (White)list of ipv4/ipv6 subnets for which webui authentication should be bypassed; list entries are separated by commas */
  bypass_auth_subnet_whitelist: string
  /** True if webui authentication should be bypassed for clients whose ip resides within (at least) one of the subnets on the whitelist */
  bypass_auth_subnet_whitelist_enabled: boolean
  /** True if authentication challenge for loopback address (127.0.0.1) should be disabled */
  bypass_local_auth: boolean
  /** True if torrent should be relocated when its Category's save path changes */
  category_changed_tmm_enabled: boolean
  /** Outstanding memory when checking torrents in MiB */
  checking_memory_use: number
  /** Outgoing connections per second */
  connection_speed: number
  /** IP Address to bind to. Empty String means All addresses */
  current_interface_address: string
  /** Current network interface name used. readonly field */
  readonly current_interface_name: string
  /** Network Interface used */
  current_network_interface: string
  /** True if DHT is enabled */
  dht: boolean
  /** Disk cache used in MiB */
  disk_cache: number
  /** Disk cache expiry interval in seconds */
  disk_cache_ttl: number
  /** Disk IO read mode */
  disk_io_read_mode: DiskIOMode
  /** Disk IO type */
  disk_io_type: DiskIOType
  /** Disk IO write mode */
  disk_io_write_mode: DiskIOMode
  /** Disk queue size */
  disk_queue_size: number
  /** Global download speed limit in KiB/s; -1 means no limit is applied */
  dl_limit: number
  /** If true torrents w/o any activity (stalled ones) will not be counted towards max_active_* limits; see dont_count_slow_torrents for more information */
  dont_count_slow_torrents: boolean
  /** Your DDNS domain name */
  dyndns_domain: string
  /** True if server DNS should be updated dynamically */
  dyndns_enabled: boolean
  /** Password for DDNS service */
  dyndns_password: string
  /** See list of possible values here below */
  dyndns_service: DynDnsService
  /** Username for DDNS service */
  dyndns_username: string
  /** Port used for embedded tracker */
  embedded_tracker_port: number
  /** Enable port forwarding for embedded tracker */
  embedded_tracker_port_forwarding: boolean
  /** True enables coalesce reads & writes */
  enable_coalesce_read_write: boolean
  /** True enables embedded tracker */
  enable_embedded_tracker: boolean
  /** True allows multiple connections from the same IP address */
  enable_multi_connections_from_same_ip: boolean
  /** True if the advanced libtorrent option piece_extent_affinity is enabled */
  enable_piece_extent_affinity: boolean
  /** True enables sending of upload piece suggestions */
  enable_upload_suggestions: boolean
  /** See list of possible values here below */
  encryption: Encryption
  /** File name patterns to automatically exclude on added torrents */
  excluded_file_names: string
  /** Whether to use the `excluded_file_names` patterns */
  excluded_file_names_enabled: boolean
  /** Path to directory to copy .torrent files to. Slashes are used as path separators */
  export_dir: string
  /** Path to directory to copy .torrent files of completed downloads to. Slashes are used as path separators */
  export_dir_fin: string
  /** Max backup log files retention time */
  file_log_age: number
  /** File log age unit */
  file_log_age_type: FileLogAgeType
  /** Enable log file backup */
  file_log_backup_enabled: boolean
  /** Enable log file auto-delete after a certain period of time */
  file_log_delete_old: boolean
  /** Enable log files */
  file_log_enabled: boolean
  /** Log file max size before backing up */
  file_log_max_size: number
  /** Log files save path */
  file_log_path: string
  /** File pool size */
  file_pool_size: number
  /**
   * Number of disk I/O threads to use for piece hash verification
   * These threads are in addition to the regular disk I/O threads.
   *
   * These are only used when force rechecking torrent.
   * The hash checking done while downloading are done by the regular disk I/O threads
   */
  hashing_threads: number
  /** Support internationalized domain name (IDN) */
  idn_support_enabled: boolean
  /** True if ".!qB" should be appended to incomplete files */
  incomplete_files_ext: boolean
  /** True if external IP filter should be enabled */
  ip_filter_enabled: boolean
  /** Path to IP filter file (.dat, .p2p, .p2b files are supported); path is separated by slashes */
  ip_filter_path: string
  /** True if IP filters are applied to trackers */
  ip_filter_trackers: boolean
  /** True if [du]l_limit should be applied to peers on the LAN */
  limit_lan_peers: boolean
  /** True if [du]l_limit should be applied to estimated TCP overhead (service data: e.g. packet headers) */
  limit_tcp_overhead: boolean
  /** True if [du]l_limit should be applied to uTP connections; this option is only available in qBittorent built against libtorrent version 0.16.X and higher */
  limit_utp_rate: boolean
  /** Port for incoming connections */
  listen_port: number
  /** Currently selected language (e.g. en_GB for English) */
  locale: string
  /** True if LSD is enabled */
  lsd: boolean
  /** True if smtp server requires authentication */
  mail_notification_auth_enabled: boolean
  /** e-mail to send notifications to */
  mail_notification_email: string
  /** True if e-mail notification should be enabled */
  mail_notification_enabled: boolean
  /** Password for smtp authentication */
  mail_notification_password: string
  /** e-mail where notifications should originate from */
  mail_notification_sender: string
  /** smtp server for e-mail notifications */
  mail_notification_smtp: string
  /** True if smtp server requires SSL connection */
  mail_notification_ssl_enabled: boolean
  /** Username for smtp authentication */
  mail_notification_username: string
  /** Max active checking torrents */
  max_active_checking_torrents: number
  /** Maximum number of active simultaneous downloads */
  max_active_downloads: number
  /** Maximum number of active simultaneous downloads and uploads */
  max_active_torrents: number
  /** Maximum number of active simultaneous uploads */
  max_active_uploads: number
  /** Limits the number of concurrent HTTP tracker announces */
  max_concurrent_http_announces: number
  /** Maximum global number of simultaneous connections */
  max_connec: number
  /** Maximum number of simultaneous connections per torrent */
  max_connec_per_torrent: number
  /** Number of minutes to keep seeding a torrent while inactive */
  max_inactive_seeding_time: number
  /** True enables max inactive seeding time */
  max_inactive_seeding_time_enabled: boolean
  /** Get the global share ratio limit */
  max_ratio: number
  /** Action performed when a torrent reaches the maximum share ratio. See list of possible values here below. */
  max_ratio_act: ShareLimitAction
  /** True if share ratio limit is enabled */
  max_ratio_enabled: boolean
  /** Number of minutes to seed a torrent */
  max_seeding_time: number
  /** True enables max seeding time */
  max_seeding_time_enabled: boolean
  /** Maximum number of upload slots */
  max_uploads: number
  /** Maximum number of upload slots per torrent */
  max_uploads_per_torrent: number
  /** Physical memory (RAM) usage limit */
  memory_working_set_limit: number
  /** Whether trackers should be merged when adding a duplicate torrent */
  merge_trackers: boolean
  /** Maximal outgoing port (0: Disabled) */
  outgoing_ports_max: number
  /** Minimal outgoing port (0: Disabled) */
  outgoing_ports_min: number
  /** Type of service (ToS) for connections to peers */
  peer_tos: number
  /** Peer turnover disconnect percentage */
  peer_turnover: number
  /** Peer turnover threshold percentage */
  peer_turnover_cutoff: number
  /** Peer turnover disconnect interval */
  peer_turnover_interval: number
  /** Whether to log performance warnings */
  performance_warning: boolean
  /** True if PeX is enabled */
  pex: boolean
  /** True if disk space should be pre-allocated for all files */
  preallocate_all: boolean
  /** True proxy requires authentication; doesn't apply to SOCKS4 proxies */
  proxy_auth_enabled: boolean
  /** Whether to use proxy for BitTorrent purposes */
  proxy_bittorrent: boolean
  /** Perform hostname lookup via proxy */
  proxy_hostname_lookup: boolean
  /** Proxy IP address or domain name */
  proxy_ip: string
  /** Whether to use proxy for general purposes */
  proxy_misc: boolean
  /** Password for proxy authentication */
  proxy_password: string
  /** Whether to use proxy for peer connections */
  proxy_peer_connections: boolean
  /** Proxy port */
  proxy_port: number
  /** Whether to use proxy for RSS purposes */
  proxy_rss: boolean
  /** See list of possible values here below */
  proxy_type: ProxyType
  /** Username for proxy authentication */
  proxy_username: string
  /** True if torrent queuing is enabled */
  queueing_enabled: boolean
  /** True if the port is randomly selected */
  random_port: boolean
  /** Reannounce to all trackers when IP or port changed */
  reannounce_when_address_changed: boolean
  /** True rechecks torrents on completion */
  recheck_completed_torrents: boolean
  /** Refresh interval (in ms) */
  refresh_interval: number
  /** Maximum outstanding requests to a single peer */
  request_queue_size: number
  /** True resolves peer countries */
  resolve_peer_countries: boolean
  /** Resume data storage type */
  resume_data_storage_type: ResumeDataStorageType
  /** Enable auto-downloading of torrents from the RSS feeds */
  rss_auto_downloading_enabled: boolean
  /** For API ≥ v2.5.1: Enable downloading of repack/proper Episodes */
  rss_download_repack_proper_episodes: boolean
  /** Max stored articles per RSS feed */
  rss_max_articles_per_feed: number
  /** Enable processing of RSS feeds */
  rss_processing_enabled: boolean
  /** RSS refresh interval */
  rss_refresh_interval: number
  /** For API ≥ v2.5.1: List of RSS Smart Episode Filters */
  rss_smart_episode_filters: string
  /** Default save path for torrents, separated by slashes */
  save_path: string
  /** True if torrent should be relocated when the default save path changes */
  save_path_changed_tmm_enabled: boolean
  /** Save resume data interval in min */
  save_resume_data_interval: number
  /** Property: directory to watch for torrent files, value: where torrents loaded from this directory should be downloaded to (see list of possible values below). Slashes are used as path separators; multiple key/value pairs can be specified */
  scan_dirs: Record<string, ScanDirs>
  /** Scheduler starting hour */
  schedule_from_hour: number
  /** Scheduler starting minute */
  schedule_from_min: number
  /** Scheduler ending hour */
  schedule_to_hour: number
  /** Scheduler ending minute */
  schedule_to_min: number
  /** Scheduler days. See possible values here below */
  scheduler_days: SchedulerDays
  /** True if alternative limits should be applied according to schedule */
  scheduler_enabled: boolean
  /** Send buffer low watermark in KiB */
  send_buffer_low_watermark: number
  /** Send buffer watermark in KiB */
  send_buffer_watermark: number
  /** Send buffer watermark factor in percent */
  send_buffer_watermark_factor: number
  /** Download rate in KiB/s for a torrent to be considered "slow" */
  slow_torrent_dl_rate_threshold: number
  /** Seconds a torrent should be inactive before considered "slow" */
  slow_torrent_inactive_timer: number
  /** Upload rate in KiB/s for a torrent to be considered "slow" */
  slow_torrent_ul_rate_threshold: number
  /** Socket backlog size */
  socket_backlog_size: number
  /** Socket receive buffer size */
  socket_receive_buffer_size: number
  /** Socket send buffer size */
  socket_send_buffer_size: number
  /** Server-side request forgery (SSRF) mitigation **/
  ssrf_mitigation: boolean
  /**
   * True if torrents should be added in a stopped state
   * @deprecated since 5.X, replaced by `add_stopped_enabled`
   */
  start_paused_enabled: boolean
  /** Timeout in seconds for a stopped announce request to trackers */
  stop_tracker_timeout: number
  /** Path for incomplete torrents, separated by slashes */
  temp_path: string
  /** True if folder for incomplete torrents is enabled */
  temp_path_enabled: boolean
  /** True if torrent should be relocated when its Category changes */
  torrent_changed_tmm_enabled: boolean
  /** Default content layout to select when adding a new torrent */
  torrent_content_layout: ContentLayout
  /** .torrent file size limit */
  torrent_file_size_limit: number
  /** Default stop condition to select when adding a new torrent */
  torrent_stop_condition: StopCondition
  /** Global upload speed limit in KiB/s; 0 means no limit is applied */
  up_limit: number
  /** Upload choking algorithm used (see list of possible values below) */
  upload_choking_algorithm: UploadChokingAlgorithm
  /** Upload slots behavior used (see list of possible values below) */
  upload_slots_behavior: UploadSlotsBehavior
  /** True if UPnP/NAT-PMP is enabled */
  upnp: boolean
  /** UPnP lease duration (0: Permanent lease) */
  upnp_lease_duration: number
  /** Whether to use category save path when autoTMM isn't enabled */
  use_category_paths_in_manual_mode: boolean
  /** True if WebUI HTTPS access is enabled */
  use_https: boolean
  /** Whether to use subcategories */
  use_subcategories: boolean
  /** μTP-TCP mixed mode algorithm (see list of possible values below) */
  utp_tcp_mixed_mode: UtpTcpMixedMode
  /** Validate HTTPS tracker certificates */
  validate_https_tracker_certificate: boolean
  /** IP address to use for the WebUI */
  web_ui_address: string
  /** WebUI access ban duration in seconds */
  web_ui_ban_duration: number
  /** True if WebUI clickjacking protection is enabled */
  web_ui_clickjacking_protection_enabled: boolean
  /** True if WebUI CSRF protection is enabled */
  web_ui_csrf_protection_enabled: boolean
  /** For API ≥ v2.5.1: List of custom http headers */
  web_ui_custom_http_headers: string
  /** Comma-separated list of domains to accept when performing Host header validation */
  web_ui_domain_list: string
  /** True if WebUI host header validation is enabled */
  web_ui_host_header_validation_enabled: boolean
  /** For API ≥ v2.0.1: Path to SSL certificate */
  web_ui_https_cert_path: string
  /** For API ≥ v2.0.1: Path to SSL keyfile */
  web_ui_https_key_path: string
  /** Maximum number of authentication failures before WebUI access ban */
  web_ui_max_auth_fail_count: number
  /** For API ≥ v2.3.0: Plaintext WebUI password, not readable, write-only. For API < v2.3.0: MD5 hash of WebUI password, hash is generated from the following string: username:Web UI Access:plain_text_web_ui_password */
  web_ui_password?: string
  /** WebUI port */
  web_ui_port: number
  /** Trusted proxies list */
  web_ui_reverse_proxies_list: string
  /** Enable reverse proxy support */
  web_ui_reverse_proxy_enabled: boolean
  /** True if WebUI cookie Secure flag is enabled */
  web_ui_secure_cookie_enabled: boolean
  /** Seconds until WebUI is automatically signed off */
  web_ui_session_timeout: number
  /** True if UPnP is used for the WebUI port */
  web_ui_upnp: boolean
  /** For API ≥ v2.5.1: Enable custom http headers */
  web_ui_use_custom_http_headers_enabled: boolean
  /** WebUI username */
  web_ui_username: string

  /** TODO: Should qBittorrent listen on ssl ports */
  ssl_enabled?: boolean
  /** TODO: SSL port to use when `ssl_enabled` is enabled */
  ssl_listen_port?: number
  /** Which action will be taken when removing torrent content */
  torrent_content_remove_option?: TorrentContentRemoveOption
  /** Whether to move unwanted files to a separate folder */
  use_unwanted_folder?: boolean
  /** Same host request delay, in seconds */
  rss_fetch_delay?: number
  /** Delete torrent contents files on torrent removal, for WebUI */
  delete_torrent_content_files?: boolean
  /** True if torrents should be added in a Stopped state */
  add_stopped_enabled?: boolean
  /** qBittorrent instance name */
  app_instance_name?: string
  /** Should the MotW be enabled and handled by qBittorrent */
  mark_of_the_web?: boolean
  /** Custom Python executable path, for search engines */
  python_executable_path?: string
  /** Backup nodes to use if unknown */
  dht_bootstrap_nodes?: string

  /** Whether to enable I2P torrents mode */
  i2p_enabled?: boolean
  /** Address to bind to for I2P torrents */
  i2p_address?: string
  /** Port to bind to for I2P torrents */
  i2p_port?: number
  /** Whether to use mixed mode for I2P torrents */
  i2p_mixed_mode?: boolean
  /** SAM session quantity of I2P inbound tunnels */
  i2p_inbound_quantity?: number
  /** SAM session quantity of I2P outbound tunnels */
  i2p_outbound_quantity?: number
  /** SAM session number of hops for I2P inbound tunnels */
  i2p_inbound_length?: number
  /** SAM session number of hops for I2P outbound tunnels */
  i2p_outbound_length?: number
}

/** Preferences extension from Enhanced qBittorrent edition */
export interface EnhancedAppPreferences extends AppPreferences {
  auto_ban_bt_player_peer: boolean
  auto_ban_unknown_peer: boolean
  auto_update_trackers_enabled: boolean
  customize_trackers_list_url: string
  readonly public_trackers: string
}
