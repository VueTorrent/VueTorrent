import type {
  BitTorrentProtocol,
  ContentLayout,
  DynDnsService,
  Encryption,
  MaxRatioAction,
  ProxyType,
  ScanDirs,
  SchedulerDays,
  StopCondition,
  UploadChokingAlgorithm,
  UploadSlotsBehavior,
  UtpTcpMixedMode,
  DiskIOType
} from '@/enums/qbit/AppPreferences'
import { DiskIOMode } from '@/enums/qbit/AppPreferences'

export interface NetworkInterface {
  name: string
  value: string
}

export default interface AppPreferences {
  /** List of trackers to add to new torrent */
  add_trackers: string
  /** Enable automatic adding of trackers to new torrents */
  add_trackers_enabled: boolean
  /** Alternative global download speed limit in KiB/s */
  alt_dl_limit: number
  /** Alternative global upload speed limit in KiB/s */
  alt_up_limit: number
  /** True if an alternative WebUI should be used */
  alternative_webui_enabled: boolean
  /** File path to the alternative WebUI */
  alternative_webui_path: string
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
  auto_delete_mode: number
  /** True if Automatic Torrent Management is enabled by default */
  auto_tmm_enabled: boolean
  /** True if external program should be run after torrent has finished downloading */
  autorun_enabled: boolean
  /** Program path/name/arguments to run if autorun_enabled is enabled; path is separated by slashes; you can use %f and %n arguments, which will be expanded by qBittorent as path_to_torrent_file and torrent_name (from the GUI; not the .torrent file name) respectively */
  autorun_program: string
  /** True if external program should be run after torrent has been added */
  autorun_on_torrent_added_enabled: boolean
  /** Program path/name/arguments to run if autorun_on_torrent_added_enabled is enabled; path is separated by slashes; you can use %f and %n arguments, which will be expanded by qBittorent as path_to_torrent_file and torrent_name (from the GUI; not the .torrent file name) respectively */
  autorun_on_torrent_added_program: string
  /** List of banned IPs */
  banned_IPs: string
  /** Bittorrent Protocol to use (see list of possible values below) */
  bittorrent_protocol: BitTorrentProtocol
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
  connection_speed: number
  /** IP Address to bind to. Empty String means All addresses */
  current_interface_address: string
  /** Network Interface used */
  current_network_interface: string
  /** True if DHT is enabled */
  dht: boolean
  /** Disk cache used in MiB */
  disk_cache: number
  /** Disk cache expiry interval in seconds */
  disk_cache_ttl: number
  disk_io_read_mode: DiskIOMode
  disk_io_type: DiskIOType
  disk_io_write_mode: DiskIOMode
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
  excluded_file_names: string
  excluded_file_names_enabled: boolean
  /** Path to directory to copy .torrent files to. Slashes are used as path separators */
  export_dir: string
  /** Path to directory to copy .torrent files of completed downloads to. Slashes are used as path separators */
  export_dir_fin: string
  /** File pool size */
  file_pool_size: number
  hashing_threads: number
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
  max_active_checking_torrents: number
  /** Maximum number of active simultaneous downloads */
  max_active_downloads: number
  /** Maximum number of active simultaneous downloads and uploads */
  max_active_torrents: number
  /** Maximum number of active simultaneous uploads */
  max_active_uploads: number
  max_concurrent_http_announces: number
  /** Maximum global number of simultaneous connections */
  max_connec: number
  /** Maximum number of simultaneous connections per torrent */
  max_connec_per_torrent: number
  /** Get the global share ratio limit */
  max_ratio: number
  /** Action performed when a torrent reaches the maximum share ratio. See list of possible values here below. */
  max_ratio_act: MaxRatioAction
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
  memory_working_set_limit: number
  /** Maximal outgoing port (0: Disabled) */
  outgoing_ports_max: number
  /** Minimal outgoing port (0: Disabled) */
  outgoing_ports_min: number
  peer_tos: number
  peer_turnover: number
  peer_turnover_cutoff: number
  peer_turnover_interval: number
  performance_warning: boolean
  /** True if PeX is enabled */
  pex: boolean
  /** True if disk space should be pre-allocated for all files */
  preallocate_all: boolean
  /** True proxy requires authentication; doesn't apply to SOCKS4 proxies */
  proxy_auth_enabled: boolean
  proxy_hostname_lookup: boolean
  /** Proxy IP address or domain name */
  proxy_ip: string
  /** Password for proxy authentication */
  proxy_password: string
  /** True if peer and web seed connections should be proxified; this option will have any effect only in qBittorent built against libtorrent version 0.16.X and higher */
  proxy_peer_connections: boolean
  /** Proxy port */
  proxy_port: number
  /** True if proxy is only used for torrents */
  proxy_torrents_only: boolean
  /** See list of possible values here below */
  proxy_type: ProxyType
  /** Username for proxy authentication */
  proxy_username: string
  /** True if torrent queuing is enabled */
  queueing_enabled: boolean
  /** True if the port is randomly selected */
  random_port: boolean
  reannounce_when_address_changed: boolean
  /** True rechecks torrents on completion */
  recheck_completed_torrents: boolean
  refresh_interval: number
  request_queue_size: number
  /** True resolves peer countries */
  resolve_peer_countries: boolean
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
  ssrf_mitigation: boolean
  /** True if torrents should be added in a Paused state */
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
  use_category_paths_in_manual_mode: boolean
  /** True if WebUI HTTPS access is enabled */
  use_https: boolean
  /** μTP-TCP mixed mode algorithm (see list of possible values below) */
  utp_tcp_mixed_mode: UtpTcpMixedMode
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
  web_ui_reverse_proxies_list: string
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
}
