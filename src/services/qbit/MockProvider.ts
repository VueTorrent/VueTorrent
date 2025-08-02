import { faker } from '@faker-js/faker/locale/en'
import { AxiosResponse } from 'axios'
import IProvider from './IProvider'
import {
  ConnectionStatus,
  DirectoryContentMode,
  FilePriority,
  LogType,
  PieceState,
  TorrentCreatorTaskStatus,
  TorrentFormat,
  TorrentOperatingMode,
  TorrentState,
} from '@/constants/qbit'
import { ContentLayout, ProxyType, ResumeDataStorageType, StopCondition, TorrentContentRemoveOption } from '@/constants/qbit/AppPreferences'
import { QBIT_MAX_ETA } from '@/constants/vuetorrent'
import type {
  ApplicationVersion,
  AppPreferences,
  BuildInfo,
  Category,
  Cookie,
  Feed,
  FeedRule,
  Log,
  QbitTorrent,
  RawQbitTorrent,
  SearchJob,
  SearchPlugin,
  SearchStatus,
  SSLParameters,
  TorrentCreatorParams,
  TorrentCreatorTask,
  TorrentFile,
  TorrentProperties,
  Tracker,
} from '@/types/qbit/models'
import { NetworkInterface } from '@/types/qbit/models/AppPreferences'
import type { AddTorrentPayload, GetTorrentPayload } from '@/types/qbit/payloads'
import { AppPreferencesPayload, CreateFeedPayload, LoginPayload } from '@/types/qbit/payloads'
import type { MaindataResponse, SearchResultsResponse, TorrentPeersResponse } from '@/types/qbit/responses'

export default class MockProvider implements IProvider {
  private static instance: MockProvider
  private static hashes: string[] = Array(parseInt(import.meta.env.VITE_FAKE_TORRENTS_COUNT || 15))
    .fill('')
    .map((_, i) => (i + 1).toString(16).padStart(40, '0'))
  private readonly categories: Record<string, Category> = {
    Movie: { name: 'Movie', savePath: faker.system.directoryPath() },
    TV: { name: 'TV', savePath: faker.system.directoryPath() },
    Other: { name: 'Other', savePath: faker.system.directoryPath() },
    ISO: { name: 'ISO', savePath: faker.system.directoryPath() },
    Music: { name: 'Music', savePath: faker.system.directoryPath() },
  }
  private readonly tags: string[] = ['pending', 'sorted', 'pending_sort']
  private readonly trackers: Record<string, string[]> = faker.helpers
    .multiple(() => faker.internet.url(), { count: 5 })
    .reduce(
      (obj, url) => {
        obj[url] = faker.helpers.arrayElements(MockProvider.hashes)
        return obj
      },
      {} as Record<string, string[]>
    )

  private constructor() {}

  static getInstance(): MockProvider {
    if (!MockProvider.instance) {
      MockProvider.instance = new MockProvider()
    }
    return MockProvider.instance
  }

  private generateMockedTorrent(hash: string): RawQbitTorrent {
    const added_on = faker.date.past()
    const last_activity = faker.date.between({ from: added_on, to: Date.now() })
    const name = faker.system.fileName()
    const num_complete = faker.number.int({ min: 0, max: 250 })
    const num_incomplete = faker.number.int({ min: 0, max: 250 })
    const total_size = faker.number.int({ min: 1_000_000, max: 1_000_000_000_000 }) // [1 Mo; 1 To]
    const completed = faker.number.int({ min: 0, max: total_size })
    const tracker = Math.random() > 0.5 ? faker.helpers.arrayElement(Object.keys(this.trackers)) : ''

    return {
      added_on: added_on.getTime() / 1000,
      amount_left: faker.number.int({ min: 0, max: total_size }),
      auto_tmm: faker.datatype.boolean(),
      availability: faker.number.float({ min: 0, max: 100, multipleOf: 0.01 }),
      category: faker.helpers.arrayElement(['', ...Object.keys(this.categories)]),
      comment: '',
      completed,
      completion_on: faker.date.between({ from: added_on, to: Date.now() }).getTime() / 1000,
      content_path: faker.system.filePath(),
      dl_limit: faker.number.float({ min: 0, max: 1, multipleOf: 0.01 }),
      dlspeed: faker.number.int({ min: 0, max: 5_000_000 }),
      download_path: faker.system.directoryPath(),
      downloaded: completed,
      downloaded_session: completed,
      eta: faker.number.int({ min: 0, max: QBIT_MAX_ETA }),
      f_l_piece_prio: faker.datatype.boolean(), // [0; 5 Mo/s]
      force_start: faker.datatype.boolean(),
      has_metadata: true,
      inactive_seeding_time_limit: -2,
      infohash_v1: hash,
      infohash_v2: '',
      last_activity: last_activity.getTime() / 1000,
      magnet_uri: `magnet:?xt=urn:btih:${hash}&dn=${name}&tr=${tracker}`,
      max_inactive_seeding_time: -1,
      max_ratio: -1,
      max_seeding_time: -1,
      name,
      num_complete,
      num_incomplete,
      num_leechs: faker.number.int({ min: 0, max: num_incomplete }),
      num_seeds: faker.number.int({ min: 0, max: num_complete }),
      popularity: -1,
      priority: 1,
      private: false,
      progress: completed / total_size,
      ratio: 0,
      ratio_limit: -2,
      reannounce: 3600,
      root_path: faker.system.filePath(),
      save_path: faker.system.directoryPath(),
      seeding_time: 0,
      seeding_time_limit: -2,
      seen_complete: faker.date.between({ from: added_on, to: last_activity }).getTime() / 1000,
      seq_dl: faker.datatype.boolean(),
      size: total_size,
      state: faker.helpers.enumValue(TorrentState),
      super_seeding: faker.datatype.boolean(),
      tags: faker.helpers.arrayElements(this.tags, { min: 0, max: this.tags.length }).join(', '),
      time_active: 0,
      total_size,
      tracker,
      trackers_count: 1,
      up_limit: 0,
      uploaded: 0,
      uploaded_session: 0,
      upspeed: 0,
    }
  }

  /**
   * Generate a configurable Promise
   * @param options Promise options
   * @param options.result Result of the Promise (required if shouldResolve is true)
   * @param options.reason Rejection reason (required if shouldResolve is false)
   * @param options.shouldResolve Should the Promise resolve or reject (default: true)
   * @param options.delay Delay in milliseconds before resolving/rejecting the Promise (default: 0)
   * @private
   */
  private async generateResponse<T, E extends Error>(
    options?: { shouldResolve?: true; result?: T; delay?: number } | { shouldResolve: false; reason: E; delay?: number }
  ): Promise<T> {
    const { result, reason, shouldResolve = true, delay = 0 } = options || ({} as any)

    return new Promise<T>((resolve, reject) => {
      function action() {
        if (shouldResolve) {
          resolve(result as T)
        } else {
          reject(reason as Error)
        }
      }

      if (delay > 0) setTimeout(action, delay)
      else action()
    })
  }

  /// AppController ///

  async getBuildInfo(): Promise<BuildInfo> {
    return this.generateResponse({
      result: {
        bitness: 64,
        boost: '1.86.0',
        libtorrent: '2.0.11.0',
        openssl: '3.3.2',
        platform: 'windows',
        qt: '6.7.3',
        zlib: '1.3.1',
      },
    })
  }

  async getVersion(): Promise<ApplicationVersion> {
    return this.generateResponse({ result: '5.1.0' })
  }

  async getPreferences(): Promise<AppPreferences> {
    return this.generateResponse({
      result: {
        // Enhanced edition
        // auto_ban_bt_player_peer: true,
        // auto_ban_unknown_peer: true,
        // auto_update_trackers_enabled: true,
        // customize_trackers_list_url: 'http://example.com/',
        // public_trackers: 'http://example.com/\nhttp://example.com/',

        add_stopped_enabled: false,
        add_to_top_of_queue: false,
        add_trackers: '',
        add_trackers_enabled: false,
        add_trackers_from_url_enabled: false,
        add_trackers_url: '',
        add_trackers_url_list: '',
        alt_dl_limit: 10240,
        alt_up_limit: 10240,
        alternative_webui_enabled: true,
        alternative_webui_path: '/vuetorrent',
        announce_ip: '',
        announce_to_all_tiers: true,
        announce_to_all_trackers: false,
        anonymous_mode: false,
        app_instance_name: 'mock',
        async_io_threads: 10,
        auto_delete_mode: 0,
        auto_tmm_enabled: true,
        autorun_enabled: false,
        autorun_on_torrent_added_enabled: false,
        autorun_on_torrent_added_program: '',
        autorun_program: '',
        banned_IPs: '',
        bdecode_depth_limit: 100,
        bdecode_token_limit: 10000000,
        bittorrent_protocol: 0,
        block_peers_on_privileged_ports: false,
        bypass_auth_subnet_whitelist: '0.0.0.0/0',
        bypass_auth_subnet_whitelist_enabled: true,
        bypass_local_auth: true,
        category_changed_tmm_enabled: false,
        checking_memory_use: 32,
        connection_speed: 30,
        current_interface_address: '',
        current_interface_name: '',
        current_network_interface: '',
        delete_torrent_content_files: true,
        dht: true,
        dht_bootstrap_nodes: '',
        disk_cache: -1,
        disk_cache_ttl: 60,
        disk_io_read_mode: 1,
        disk_io_type: 0,
        disk_io_write_mode: 1,
        disk_queue_size: 1048576,
        dl_limit: 0,
        dont_count_slow_torrents: false,
        dyndns_domain: 'changeme.dyndns.org',
        dyndns_enabled: false,
        dyndns_password: 'adqsd',
        dyndns_service: 0,
        dyndns_username: '',
        embedded_tracker_port: 9000,
        embedded_tracker_port_forwarding: false,
        enable_coalesce_read_write: false,
        enable_embedded_tracker: false,
        enable_multi_connections_from_same_ip: false,
        enable_piece_extent_affinity: false,
        enable_upload_suggestions: false,
        encryption: 0,
        excluded_file_names: '',
        excluded_file_names_enabled: false,
        export_dir: '',
        export_dir_fin: '',
        file_log_age: 1,
        file_log_age_type: 1,
        file_log_backup_enabled: true,
        file_log_delete_old: true,
        file_log_enabled: true,
        file_log_max_size: 65,
        file_log_path: '/config/qBittorrent/logs',
        file_pool_size: 100,
        hashing_threads: 1,
        i2p_address: '127.0.0.1',
        i2p_enabled: false,
        i2p_inbound_length: 3,
        i2p_inbound_quantity: 3,
        i2p_mixed_mode: false,
        i2p_outbound_length: 3,
        i2p_outbound_quantity: 3,
        i2p_port: 7656,
        idn_support_enabled: false,
        incomplete_files_ext: false,
        ip_filter_enabled: false,
        ip_filter_path: '',
        ip_filter_trackers: false,
        limit_lan_peers: true,
        limit_tcp_overhead: false,
        limit_utp_rate: true,
        listen_port: 6881,
        locale: 'en',
        lsd: true,
        mail_notification_auth_enabled: true,
        mail_notification_email: 'to',
        mail_notification_enabled: false,
        mail_notification_password: '',
        mail_notification_sender: 'from',
        mail_notification_smtp: 'smtp.changeme.com',
        mail_notification_ssl_enabled: false,
        mail_notification_username: '',
        mark_of_the_web: true,
        max_active_checking_torrents: 1,
        max_active_downloads: 3,
        max_active_torrents: 5,
        max_active_uploads: 3,
        max_concurrent_http_announces: 50,
        max_connec: 500,
        max_connec_per_torrent: 100,
        max_inactive_seeding_time: -1,
        max_inactive_seeding_time_enabled: false,
        max_ratio: -1,
        max_ratio_act: 0,
        max_ratio_enabled: false,
        max_seeding_time: -1,
        max_seeding_time_enabled: false,
        max_uploads: 20,
        max_uploads_per_torrent: 4,
        memory_working_set_limit: 512,
        merge_trackers: false,
        outgoing_ports_max: 0,
        outgoing_ports_min: 0,
        peer_tos: 4,
        peer_turnover: 4,
        peer_turnover_cutoff: 90,
        peer_turnover_interval: 300,
        performance_warning: true,
        pex: true,
        preallocate_all: false,
        proxy_auth_enabled: false,
        proxy_bittorrent: true,
        proxy_hostname_lookup: false,
        proxy_ip: '',
        proxy_misc: true,
        proxy_password: '',
        proxy_peer_connections: false,
        proxy_port: 8080,
        proxy_rss: true,
        proxy_type: ProxyType.NONE,
        proxy_username: '',
        python_executable_path: '',
        queueing_enabled: true,
        random_port: false,
        reannounce_when_address_changed: false,
        recheck_completed_torrents: false,
        refresh_interval: 1500,
        request_queue_size: 500,
        resolve_peer_countries: true,
        resume_data_storage_type: ResumeDataStorageType.LEGACY,
        rss_auto_downloading_enabled: false,
        rss_download_repack_proper_episodes: true,
        rss_fetch_delay: 60,
        rss_max_articles_per_feed: 50,
        rss_processing_enabled: false,
        rss_refresh_interval: 600,
        rss_smart_episode_filters: 's(\\d+)e(\\d+)\n(\\d+)x(\\d+)\n(\\d{4}[.\\-]\\d{1,2}[.\\-]\\d{1,2})\n(\\d{1,2}[.\\-]\\d{1,2}[.\\-]\\d{4})',
        save_path: '/downloads',
        save_path_changed_tmm_enabled: false,
        save_resume_data_interval: 60,
        scan_dirs: {},
        schedule_from_hour: 8,
        schedule_from_min: 0,
        schedule_to_hour: 20,
        schedule_to_min: 0,
        scheduler_days: 0,
        scheduler_enabled: false,
        send_buffer_low_watermark: 10,
        send_buffer_watermark: 500,
        send_buffer_watermark_factor: 50,
        slow_torrent_dl_rate_threshold: 2,
        slow_torrent_inactive_timer: 60,
        slow_torrent_ul_rate_threshold: 2,
        socket_backlog_size: 30,
        socket_receive_buffer_size: 0,
        socket_send_buffer_size: 0,
        ssl_enabled: false,
        ssl_listen_port: 443,
        ssrf_mitigation: true,
        start_paused_enabled: false,
        stop_tracker_timeout: 2,
        temp_path: '/downloads/incomplete',
        temp_path_enabled: false,
        torrent_changed_tmm_enabled: false,
        torrent_content_layout: ContentLayout.NO_SUBFOLDER,
        torrent_content_remove_option: TorrentContentRemoveOption.MOVE_TO_TRASH,
        torrent_file_size_limit: 104857600,
        torrent_stop_condition: StopCondition.METADATA_RECEIVED,
        up_limit: 0,
        upload_choking_algorithm: 1,
        upload_slots_behavior: 0,
        upnp: false,
        upnp_lease_duration: 0,
        use_category_paths_in_manual_mode: false,
        use_https: false,
        use_subcategories: false,
        use_unwanted_folder: true,
        utp_tcp_mixed_mode: 0,
        validate_https_tracker_certificate: true,
        web_ui_address: '*',
        web_ui_ban_duration: 3600,
        web_ui_clickjacking_protection_enabled: false,
        web_ui_csrf_protection_enabled: false,
        web_ui_custom_http_headers: '',
        web_ui_domain_list: '*',
        web_ui_host_header_validation_enabled: false,
        web_ui_https_cert_path: '/config/https/server.crt',
        web_ui_https_key_path: '/config/https/server.key',
        web_ui_max_auth_fail_count: 9999,
        web_ui_port: 8080,
        web_ui_reverse_proxies_list: '',
        web_ui_reverse_proxy_enabled: false,
        web_ui_secure_cookie_enabled: true,
        web_ui_session_timeout: 3600,
        web_ui_upnp: false,
        web_ui_use_custom_http_headers_enabled: false,
        web_ui_username: 'admin',
      },
    })
  }

  async setPreferences(_: AppPreferencesPayload): Promise<void> {
    return this.generateResponse({ shouldResolve: true })
  }

  async shutdownApp(): Promise<boolean> {
    return this.generateResponse({ result: true })
  }

  async getNetworkInterfaces(): Promise<NetworkInterface[]> {
    return this.generateResponse({
      result: [
        {
          name: 'lo',
          value: 'lo',
        },
        {
          name: 'eth0',
          value: 'eth0',
        },
      ],
    })
  }

  async getAddresses(iface: string = ''): Promise<string[]> {
    switch (iface) {
      case 'lo':
        return this.generateResponse({
          result: ['127.0.0.1'],
        })
      case 'eth0':
        return this.generateResponse({
          result: ['172.21.0.2'],
        })
      default:
        return this.generateResponse({ result: [] })
    }
  }

  async sendTestEmail(): Promise<void> {
    return this.generateResponse()
  }

  async getDirectoryContent(dirPath: string, _?: DirectoryContentMode): Promise<string[] | null> {
    return this.generateResponse({
      result: faker.helpers.multiple(() => `${dirPath}/${faker.system.fileName()}`, { count: { min: 0, max: 5 } }),
    })
  }

  getCookies(): Promise<Cookie[]> {
    return this.generateResponse({
      result: faker.helpers.multiple(
        () => ({
          name: faker.word.words({ count: 1 }),
          domain: faker.internet.domainName(),
          value: faker.word.words({ count: 1 }),
          path: '/',
          expirationDate: faker.date.future().getTime() / 1000,
        }),
        { count: { min: 1, max: 15 } }
      ),
    })
  }

  setCookies(_: Cookie[]): Promise<void> {
    return this.generateResponse()
  }

  /// AuthController ///

  async login(_: LoginPayload): Promise<AxiosResponse<string, string>> {
    return this.generateResponse({
      result: {
        data: 'Ok.',
        status: 200,
        statusText: 'OK',
      } as AxiosResponse<string, string>,
    })
  }

  async logout(): Promise<void> {
    return this.generateResponse({ shouldResolve: true })
  }

  /// LogController ///

  async getLogs(_0?: number, _1?: LogType): Promise<Log[]> {
    const timestamp = Math.floor(new Date().getTime() / 1000)
    return this.generateResponse({
      result: [
        {
          id: 0,
          message: 'qBittorrent v4.6.2 started',
          timestamp,
          type: LogType.NORMAL,
        },
        {
          id: 1,
          message: 'Using config directory: /config/qBittorrent',
          timestamp,
          type: LogType.INFO,
        },
        {
          id: 2,
          message: 'Trying to listen on the following list of IP addresses: "0.0.0.0:6881,[::]:6881"',
          timestamp,
          type: LogType.WARNING,
        },
        {
          id: 3,
          message: 'Peer ID: "-qB4620-"',
          timestamp,
          type: LogType.CRITICAL,
        },
        {
          id: 4,
          message: 'HTTP User-Agent: "qBittorrent/4.6.2"',
          timestamp,
          type: LogType.INFO,
        },
        {
          id: 5,
          message: 'Distributed Hash Table (DHT) support: ON',
          timestamp,
          type: LogType.INFO,
        },
        {
          id: 6,
          message: 'Local Peer Discovery support: ON',
          timestamp,
          type: LogType.INFO,
        },
        {
          id: 7,
          message: 'Peer Exchange (PeX) support: ON',
          timestamp,
          type: LogType.INFO,
        },
        {
          id: 8,
          message: 'Anonymous mode: OFF',
          timestamp,
          type: LogType.INFO,
        },
        {
          id: 9,
          message: 'Encryption support: ON',
          timestamp,
          type: LogType.INFO,
        },
        {
          id: 10,
          message: 'Successfully listening on IP. IP: "127.0.0.1". Port: "TCP/6881"',
          timestamp,
          type: LogType.INFO,
        },
        {
          id: 11,
          message: 'Successfully listening on IP. IP: "127.0.0.1". Port: "UTP/6881"',
          timestamp,
          type: LogType.INFO,
        },
        {
          id: 12,
          message: 'Successfully listening on IP. IP: "172.21.0.2". Port: "TCP/6881"',
          timestamp,
          type: LogType.INFO,
        },
        {
          id: 13,
          message: 'Successfully listening on IP. IP: "172.21.0.2". Port: "UTP/6881"',
          timestamp,
          type: LogType.INFO,
        },
        {
          id: 14,
          message: 'IP geolocation database loaded. Type: DBIP-Country-Lite. Build time: Fri Dec 1 01:11:53 2023.',
          timestamp,
          type: LogType.INFO,
        },
        {
          id: 15,
          message: 'WebUI: Now listening on IP: *, port: 8080',
          timestamp,
          type: LogType.NORMAL,
        },
      ],
    })
  }

  /// RssController ///

  async createFeed(_: CreateFeedPayload): Promise<void> {
    return this.generateResponse()
  }

  async setRule(_0: string, _1: FeedRule): Promise<void> {
    return this.generateResponse()
  }

  async getFeeds(_: boolean): Promise<Feed[]> {
    return this.generateResponse({
      result: [
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed1',
          title: 'RSS Feed 1',
          uid: '{7a458bee-856a-4c0e-b751-11fd2183dfe4}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm1',
              isRead: false,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Tristique maximus pellentesque lacinia, interdum suspendisse feugiat senectus consectetur porta.',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:47 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm1a',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 1a',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:48 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm1b',
              isRead: false,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 1b',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: true,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed2',
          title: 'RSS Feed 2',
          uid: '{1ae133e7-ee5f-41c5-a11d-e59fcad3be52}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm2',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 2',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: true,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed3',
          title: 'RSS Feed 3',
          uid: '{4d2082fb-064e-4085-a1e4-ec5fd4d7651a}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm3',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 3',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed4',
          title: 'RSS Feed 4',
          uid: '{554d2a88-b3ab-41b4-82c1-7cd06931dd97}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm4',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 4',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed5',
          title: 'RSS Feed 5',
          uid: '{c22bc325-9874-481c-8b54-c8135fef5798}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm5',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 5',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed6',
          title: 'RSS Feed 6',
          uid: '{b4ecdc88-c192-464e-a616-2844cbc69007}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm6',
              isRead: false,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 6',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed7',
          title: 'RSS Feed 7',
          uid: '{64e501a3-58c1-4397-8e90-5650e9dafe3f}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm7',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 7',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed8',
          title: 'RSS Feed 8',
          uid: '{52489995-2ac8-47f3-89da-714199693ec7}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm8',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 8',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed9',
          title: 'RSS Feed 9',
          uid: '{63e6d3eb-1fc7-4c78-a1dd-422c10631a65}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm9',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 9',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed10',
          title: 'RSS Feed 10',
          uid: '{41ca2a58-aec4-48c0-91c7-4f08e5e8318a}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm10',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 10',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed11',
          title: 'RSS Feed 11',
          uid: '{fafb2e55-979c-4188-a0a4-dc3375cc179c}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm11',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 11',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed12',
          title: 'RSS Feed 12',
          uid: '{fafb2e55-979c-4188-a0a4-dc3375cc179d}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm12',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 12',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed13',
          title: 'RSS Feed 13',
          uid: '{fafb2e55-979c-4188-a0a4-dc3375cc179e}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm13',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 13',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed14',
          title: 'RSS Feed 14',
          uid: '{fafb2e55-979c-4188-a0a4-dc3375cc179f}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm14',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 14',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed15',
          title: 'RSS Feed 15',
          uid: '{fafb2e55-979c-4188-a0a4-dc3375cc179g}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm15',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 15',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed16',
          title: 'RSS Feed 16',
          uid: '{fafb2e55-979c-4188-a0a4-dc3375cc179h}',
          url: 'https://www.example.com/feed',
          articles: [
            {
              author: 'John Doe',
              date: '02 Aug 2023 16:00:46 +0000',
              description: 'This is a <strong>sample</strong> <i>description</i>',
              id: 'SDb4v2op8wm16',
              isRead: true,
              link: 'https://www.example.com/article/SDb4v2op8wm',
              title: 'Sample title 16',
              torrentURL: 'https://www.example.com/article/SDb4v2op8wm',
            },
          ],
        },
        {
          hasError: false,
          isLoading: false,
          lastBuildDate: '02 Aug 2023 16:00:46 +0000',
          name: 'feed17',
          title: 'RSS Feed 17',
          uid: '{7ae5ac9f-4698-4638-9a99-197462c3a456}',
          url: 'https://www.example.com/feed',
          articles: [],
        },
      ],
    })
  }

  async getRules(): Promise<FeedRule[]> {
    return this.generateResponse({
      result: [
        {
          affectedFeeds: ['https://www.example.com/feed'],
          enabled: true,
          episodeFilter: '',
          ignoreDays: 0,
          lastMatch: '',
          mustContain: '',
          mustNotContain: '',
          name: 'rule1',
          previouslyMatchedEpisodes: [],
          priority: 0,
          smartFilter: false,
          torrentParams: {
            category: '',
            download_limit: -1,
            download_path: '',
            inactive_seeding_time_limit: -2,
            operating_mode: TorrentOperatingMode.AUTO_MANAGED,
            ratio_limit: -2,
            save_path: '',
            seeding_time_limit: -2,
            skip_checking: false,
            tags: [],
            upload_limit: -1,
          },
          useRegex: false,
        },
      ],
    })
  }

  async renameFeed(_0: string, _1: string): Promise<void> {
    return this.generateResponse()
  }

  async setFeedUrl(_0: string, _1: string): Promise<void> {
    return this.generateResponse()
  }

  async renameRule(_0: string, _1: string): Promise<void> {
    return this.generateResponse()
  }

  async deleteRule(_: string): Promise<void> {
    return this.generateResponse()
  }

  async deleteFeed(_: string): Promise<void> {
    return this.generateResponse()
  }

  async markAsRead(_0: string, _1?: string): Promise<void> {
    return this.generateResponse()
  }

  async refreshFeed(_: string): Promise<void> {
    return this.generateResponse({ delay: 1000 })
  }

  async getMatchingArticles(ruleName: string): Promise<Record<string, string[]>> {
    return this.generateResponse({
      result: {
        [ruleName]: ['Sample title 1'],
      },
    })
  }

  /// SearchController ///

  async startSearch(_0: string, _1: string, _2: string[]): Promise<SearchJob> {
    return this.generateResponse({ result: { id: 1 } })
  }

  async stopSearch(_: number): Promise<boolean> {
    return this.generateResponse({ result: true })
  }

  async getSearchStatus(id?: number): Promise<SearchStatus[]> {
    return this.generateResponse({
      result: [{ id: id ?? 1, status: 'Stopped', total: 1 }],
    })
  }

  async getSearchResults(_0: number, _1?: number, _2?: number): Promise<SearchResultsResponse> {
    return this.generateResponse({
      result: {
        results: [
          {
            descrLink: 'https://www.example.com/torrent/SDb4v2op8wm',
            fileName: 'Sample title 1',
            fileSize: 100,
            fileUrl: 'https://www.example.com/torrent/SDb4v2op8wm',
            nbLeechers: 0,
            nbSeeders: 0,
            siteUrl: 'https://www.example.com',
            engineName: 'Example',
            pubDate: new Date().getTime() / 1000,
          },
        ],
        status: 'Stopped',
        total: 1,
      },
    })
  }

  async deleteSearchPlugin(_: number): Promise<boolean> {
    return this.generateResponse({ result: true })
  }

  async getSearchPlugins(): Promise<SearchPlugin[]> {
    return this.generateResponse({
      result: [
        {
          enabled: true,
          fullName: 'Example',
          name: 'Example',
          supportedCategories: [{ id: '0', name: 'All' }],
          url: 'https://www.example.com',
          version: '1.0.0',
        },
      ] as SearchPlugin[],
    })
  }

  async installSearchPlugin(_: string[]): Promise<boolean> {
    return this.generateResponse({ result: true })
  }

  async uninstallSearchPlugin(_: string[]): Promise<void> {
    return this.generateResponse()
  }

  async enableSearchPlugin(_0: string[], _1: boolean): Promise<void> {
    return this.generateResponse()
  }

  async updateSearchPlugins(): Promise<void> {
    return this.generateResponse()
  }

  async downloadTorrentWithSearchPlugin(_0: string, _1: string): Promise<void> {
    return this.generateResponse()
  }

  /// SyncController ///

  async getMaindata(rid?: number): Promise<MaindataResponse> {
    const torrents = MockProvider.hashes.reduce(
      (obj, hash) => {
        obj[hash] = this.generateMockedTorrent(hash)
        return obj
      },
      {} as Record<string, RawQbitTorrent>
    )

    const alltime_dl = faker.number.int({ min: 0, max: 50_000_000_000_000 }) // [0 B; 50 TB]
    const alltime_ul = faker.number.int({ min: 0, max: 50_000_000_000_000 }) // [0 B; 50 TB]
    const dl_rate_limit = 94_000_000 // ~750 Mbps
    const up_rate_limit = 94_000_000 // ~750 Mbps
    const server_state = {
      alltime_dl,
      alltime_ul,
      average_time_queue: faker.number.int({ min: 0, max: 2_000 }),
      connection_status: faker.helpers.enumValue(ConnectionStatus),
      dht_nodes: faker.number.int({ min: 0, max: 1000 }),
      dl_info_data: faker.number.int({ min: 0, max: 100_000_000_000 }), // [0 B; 100 GB]
      dl_info_speed: faker.number.int({ min: 0, max: dl_rate_limit || 125_000_000 }), // [0 b/s; 1 Gb/s]
      dl_rate_limit,
      free_space_on_disk: faker.number.int({ min: 0, max: 500_000_000_000 }), // [0 B; 500 GB]
      global_ratio: (alltime_ul / alltime_dl).toFixed(2),
      queued_io_jobs: faker.number.int({ min: 0, max: 1500 }),
      queueing: false,
      read_cache_hits: faker.number.int({ min: 0, max: 100 }).toString(),
      read_cache_overload: faker.number.int({ min: 0, max: 100 }).toString(),
      refresh_interval: 2500,
      total_buffers_size: faker.number.int({ min: 0, max: 100_000 }), // [0B; 100 kB]
      total_peer_connections: faker.number.int({ min: 0, max: 5000 }),
      total_queued_size: faker.number.int({ min: 0, max: 100_000 }), // [0B; 100 kB]
      total_wasted_session: faker.number.int({ min: 0, max: 1_000_000 }),
      up_info_data: faker.number.int({ min: 0, max: 100_000_000_000 }), // [0 B; 100 GB]
      up_info_speed: faker.number.int({ min: 0, max: up_rate_limit || 125_000_000 }), // [0 b/s; 1 Gb/s]
      up_rate_limit,
      use_alt_speed_limits: false,
      use_subcategories: false,
      write_cache_overload: faker.number.int({ min: 0, max: 100 }).toString(),
    }

    return this.generateResponse({
      result: {
        full_update: !rid ? true : undefined,
        rid: rid ?? 1,
        server_state,
        torrents,
        categories: this.categories,
        tags: this.tags,
        trackers: this.trackers,
      },
    })
  }

  async syncTorrentPeers(_: string, rid?: number): Promise<TorrentPeersResponse> {
    function rndmConnType() {
      return faker.helpers.arrayElement(['BT', 'μTP', 'WEB'])
    }
    function rndmCountry() {
      return faker.location.country()
    }
    function rndmCountryCode() {
      return faker.location.countryCode()
    }
    function rndmSpeed() {
      return faker.number.int({ min: 0, max: 50_000_000 }) // [0; 50 MB/s]
    }
    function rndmData() {
      return faker.number.int({ min: 0, max: 5_000_000_000 }) // [0; 5 GB]
    }

    const ip1 = faker.internet.ipv4()
    const port1 = faker.internet.port()

    const ip2 = faker.internet.ipv4()
    const port2 = faker.internet.port()

    const ip3 = faker.internet.ipv4()
    const port3 = faker.internet.port()

    rid = rid ?? 0
    return this.generateResponse({
      result: {
        full_update: true,
        rid: rid + 1,
        peers: {
          [`${ip1}:${port1}`]: {
            client: 'qBittorrent v4.6.2',
            connection: rndmConnType(),
            country: rndmCountry(),
            country_code: rndmCountryCode(),
            dl_speed: rndmSpeed(),
            downloaded: rndmData(),
            files: 'ubuntu-23.10.1-desktop-amd64.iso',
            flags: 'D',
            flags_desc: 'dht',
            ip: ip1,
            peer_id_client: '-qB4620-',
            port: port1,
            progress: faker.number.float({ min: 0, max: 1, multipleOf: 0.01 }),
            relevance: faker.number.float({ min: 0, max: 1, multipleOf: 0.01 }),
            up_speed: rndmSpeed(),
            uploaded: rndmData(),
          },
          [`${ip2}:${port2}`]: {
            client: 'Tixati 2.84',
            connection: rndmConnType(),
            country: rndmCountry(),
            country_code: rndmCountryCode(),
            dl_speed: rndmSpeed(),
            downloaded: rndmData(),
            files: 'ubuntu/ubuntu-23.10.1-desktop-amd64.iso',
            flags: 'D ? S H P',
            flags_desc: 'D = Interested (local) and unchoked (peer)\n? = Not interested (peer) and unchoked (local)\nS = Peer snubbed\nH = Peer from DHT\nP = μTP',
            ip: ip2,
            peer_id_client: 'TIX0284-',
            port: port2,
            progress: faker.number.float({ min: 0, max: 1, multipleOf: 0.01 }),
            relevance: faker.number.float({ min: 0, max: 1, multipleOf: 0.01 }),
            up_speed: faker.number.int(50_000_000), // [0; 50 Mo/s]
            uploaded: rndmData(),
          },
          [`${ip3}:${port3}`]: {
            client: 'Deluge/2.1.1 libtorrent/2.0.5.0',
            connection: rndmConnType(),
            country: rndmCountry(),
            country_code: rndmCountryCode(),
            dl_speed: rndmSpeed(),
            downloaded: rndmData(),
            files: 'ubuntu2/ubuntu-23.10.1-desktop-amd64.iso',
            flags: 'U H X P',
            flags_desc: 'U = Interested (peer) and unchoked (local)\nH = Peer from DHT\nX = Peer from PEX\nP = μTP',
            ip: ip3,
            peer_id_client: '-DE211s-',
            port: port3,
            progress: faker.number.float({ min: 0, max: 1, multipleOf: 0.01 }),
            relevance: faker.number.float({ min: 0, max: 1, multipleOf: 0.01 }),
            up_speed: rndmSpeed(),
            uploaded: rndmData(),
          },
        },
        show_flags: rid <= 0 || undefined,
      },
    })
  }

  /// TorrentCreatorController //

  async addTorrentCreatorTask(_: TorrentCreatorParams): Promise<string> {
    return this.generateResponse({ result: 'id' })
  }

  async getTorrentCreatorStatus(taskID?: string): Promise<TorrentCreatorTask[]> {
    return this.generateResponse({
      result: [
        {
          taskID: taskID!,
          sourcePath: faker.system.directoryPath(),
          pieceSize: faker.number.int({ min: 0, max: 16_384_000, multipleOf: 512_000 }),
          private: faker.datatype.boolean(),
          timeAdded: faker.date.anytime().toString(),
          format: faker.helpers.enumValue(TorrentFormat),
          optimizeAlignment: faker.datatype.boolean(),
          status: faker.helpers.enumValue(TorrentCreatorTaskStatus),
          comment: faker.word.words({ count: { min: 0, max: 25 } }),
          torrentFilePath: faker.system.filePath(),
          source: faker.system.directoryPath(),
          trackers: faker.helpers.multiple(() => faker.internet.url(), {
            count: faker.number.int({
              min: 0,
              max: 5,
            }),
          }),
          urlSeeds: faker.helpers.multiple(() => faker.internet.url(), {
            count: faker.number.int({
              min: 0,
              max: 5,
            }),
          }),
          timeFinished: faker.date.recent().toString(),
          timeStarted: faker.date.past().toString(),
        },
      ],
    })
  }

  async getTorrentCreatorOutput(_: string): Promise<Blob> {
    return this.generateResponse({ result: new Blob([new ArrayBuffer(1024)], { type: 'application/x-bittorrent' }) })
  }

  async deleteTorrentCreatorTask(_: string): Promise<boolean> {
    return this.generateResponse({ result: true })
  }

  /// TorrentsController ///

  async getTorrents(_?: GetTorrentPayload): Promise<QbitTorrent[]> {
    return this.generateResponse({
      result: MockProvider.hashes.map(hash => ({ ...this.generateMockedTorrent(hash), hash })),
    })
  }

  async getTorrentTrackers(_: string): Promise<Tracker[]> {
    function getRndmValue() {
      return faker.number.int({ min: 0, max: 1000 })
    }

    return this.generateResponse({
      result: [
        {
          msg: '',
          num_downloaded: getRndmValue(),
          num_leeches: getRndmValue(),
          num_peers: getRndmValue(),
          num_seeds: getRndmValue(),
          status: 2,
          tier: -1,
          url: '** [DHT] **',
        },
        {
          msg: '',
          num_downloaded: getRndmValue(),
          num_leeches: getRndmValue(),
          num_peers: getRndmValue(),
          num_seeds: getRndmValue(),
          status: 2,
          tier: -1,
          url: '** [PeX] **',
        },
        {
          msg: '',
          num_downloaded: getRndmValue(),
          num_leeches: getRndmValue(),
          num_peers: getRndmValue(),
          num_seeds: getRndmValue(),
          status: 2,
          tier: -1,
          url: '** [LSD] **',
        },
        {
          msg: '',
          num_downloaded: -1,
          num_leeches: -1,
          num_peers: -1,
          num_seeds: -1,
          status: 1,
          tier: 0,
          url: 'https://torrent.ubuntu.com/announce',
        },
        {
          msg: '',
          num_downloaded: -1,
          num_leeches: -1,
          num_peers: -1,
          num_seeds: -1,
          status: 1,
          tier: 1,
          url: 'https://ipv6.torrent.ubuntu.com/announce',
        },
      ],
    })
  }

  async setTorrentName(_0: string, _1: string): Promise<void> {
    return this.generateResponse()
  }

  async getTorrentPieceStates(_: string): Promise<PieceState[]> {
    return this.generateResponse({ result: new Array(64).fill(PieceState.MISSING) })
  }

  async getTorrentFiles(_0: string, _1?: number[]): Promise<TorrentFile[]> {
    return this.generateResponse({
      result: [
        {
          availability: 1,
          index: 0,
          is_seed: false,
          name: 'ubuntu-23.10.1-desktop-amd64.iso',
          piece_range: [0, 63],
          priority: FilePriority.MAXIMAL,
          progress: 0,
          size: 173995520,
        },
        {
          availability: 1,
          index: 1,
          is_seed: false,
          name: 'ubuntu-24.10.1-desktop-amd64.iso',
          piece_range: [0, 63],
          priority: FilePriority.NORMAL,
          progress: 0,
          size: 1173995520,
        },
        {
          availability: 1,
          index: 2,
          is_seed: false,
          name: 'ubuntu/ubuntu-23.10.1-desktop-amd64.iso',
          piece_range: [0, 63],
          priority: FilePriority.NORMAL,
          progress: 0,
          size: 2173995520,
        },
        {
          availability: 1,
          index: 3,
          is_seed: false,
          name: 'ubuntu/ubuntu-24.10.1-desktop-amd64.iso',
          piece_range: [0, 63],
          priority: FilePriority.NORMAL,
          progress: 0,
          size: 3173995520,
        },
        {
          availability: 1,
          index: 4,
          is_seed: false,
          name: 'ubuntu2/ubuntu-23.10.1-desktop-amd64.iso',
          piece_range: [0, 63],
          priority: FilePriority.NORMAL,
          progress: 0,
          size: 4173995520,
        },
      ],
    })
  }

  async getAvailableTags(): Promise<string[]> {
    return this.generateResponse({ result: this.tags })
  }

  async getTorrentProperties(hash: string): Promise<TorrentProperties> {
    return this.generateResponse({
      result: {
        addition_date: 1702318609,
        comment: 'Ubuntu CD releases.ubuntu.com',
        completion_date: -1,
        created_by: 'mktorrent 1.1',
        creation_date: 1697466120,
        dl_limit: -1,
        dl_speed: 0,
        dl_speed_avg: 0,
        download_path: '',
        eta: 8640000,
        hash,
        has_metadata: true,
        infohash_v1: '9ecd4676fd0f0474151a4b74a5958f42639cebdf',
        infohash_v2: '',
        is_private: false,
        last_seen: -1,
        name: 'ubuntu-23.10.1-desktop-amd64.iso',
        nb_connections: 0,
        nb_connections_limit: 100,
        peers: 0,
        peers_total: 0,
        piece_size: 262144,
        pieces_have: 0,
        pieces_num: 19738,
        popularity: -1,
        private: false,
        reannounce: 0,
        save_path: '/downloads',
        seeding_time: 0,
        seeds: 0,
        seeds_total: 0,
        share_ratio: 0,
        time_elapsed: 0,
        total_downloaded: 0,
        total_downloaded_session: 0,
        total_size: 5173995520,
        total_uploaded: 0,
        total_uploaded_session: 0,
        total_wasted: 0,
        up_limit: -1,
        up_speed: 0,
        up_speed_avg: 0,
      },
    })
  }

  async addTorrents(_0: File[], _1: string, _2?: AddTorrentPayload): Promise<void> {
    return this.generateResponse()
  }

  async setTorrentFilePriority(_0: string, _1: number[], _2: FilePriority): Promise<void> {
    return this.generateResponse()
  }

  async deleteTorrents(_0: string[], _1: boolean): Promise<void> {
    return this.generateResponse()
  }

  async pauseTorrents(_: string[]): Promise<void> {
    return this.generateResponse()
  }

  async pauseAllTorrents(): Promise<void> {
    return this.generateResponse()
  }

  async stopTorrents(_: string[]): Promise<void> {
    return this.generateResponse()
  }

  async stopAllTorrents(): Promise<void> {
    return this.generateResponse()
  }

  async resumeTorrents(_: string[]): Promise<void> {
    return this.generateResponse()
  }

  async resumeAllTorrents(): Promise<void> {
    return this.generateResponse()
  }

  async startTorrents(_: string[]): Promise<void> {
    return this.generateResponse()
  }

  async startAllTorrents(): Promise<void> {
    return this.generateResponse()
  }

  async forceStartTorrents(_: string[]): Promise<void> {
    return this.generateResponse()
  }

  async toggleSequentialDownload(_: string[]): Promise<void> {
    return this.generateResponse()
  }

  async toggleFirstLastPiecePriority(_: string[]): Promise<void> {
    return this.generateResponse()
  }

  async setSuperSeeding(_0: string[], _1: boolean): Promise<void> {
    return this.generateResponse()
  }

  async setAutoTMM(_0: string[], _1: boolean): Promise<void> {
    return this.generateResponse()
  }

  async setDownloadLimit(_0: string[], _1: number): Promise<void> {
    return this.generateResponse()
  }

  async setUploadLimit(_0: string[], _1: number): Promise<void> {
    return this.generateResponse()
  }

  async getTorrentsCount(): Promise<number> {
    return this.generateResponse({ result: MockProvider.hashes.length })
  }

  async setShareLimit(_0: string[], _1: number, _2: number, _3: number): Promise<void> {
    return this.generateResponse()
  }

  async reannounceTorrents(_: string[]): Promise<void> {
    return this.generateResponse()
  }

  async recheckTorrents(_: string[]): Promise<void> {
    return this.generateResponse()
  }

  async setTorrentDownloadPath(_0: string[], _1: string): Promise<void> {
    return this.generateResponse()
  }

  async setTorrentSavePath(_0: string[], _1: string): Promise<void> {
    return this.generateResponse()
  }

  async addTorrentTrackers(_0: string, _1: string): Promise<void> {
    return this.generateResponse()
  }

  async editTorrentTracker(_0: string, _1: string, _2: string): Promise<void> {
    return this.generateResponse()
  }

  async removeTorrentTrackers(_0: string, _1: string[]): Promise<void> {
    return this.generateResponse()
  }

  async addTorrentPeers(_0: string[], _1: string[]): Promise<void> {
    return this.generateResponse()
  }

  async renameFile(_0: string, _1: string, _2: string): Promise<void> {
    return this.generateResponse()
  }

  async renameFolder(_0: string, _1: string, _2: string): Promise<void> {
    return this.generateResponse()
  }

  async setTorrentPriority(_0: string[], _1: 'increasePrio' | 'decreasePrio' | 'topPrio' | 'bottomPrio'): Promise<void> {
    return this.generateResponse()
  }

  async addTorrentTag(_0: string[], _1: string[]): Promise<void> {
    return this.generateResponse()
  }

  async removeTorrentTag(_0: string[], _1: string[]): Promise<void> {
    return this.generateResponse()
  }

  async removeTorrentAllTags(_: string[]): Promise<void> {
    return this.generateResponse()
  }

  async createTag(_: string[]): Promise<void> {
    return this.generateResponse()
  }

  async deleteTags(_: string[]): Promise<void> {
    return this.generateResponse()
  }

  async getCategories(): Promise<Category[]> {
    return this.generateResponse({ result: Object.values(this.categories) })
  }

  async deleteCategory(_: string[]): Promise<void> {
    return this.generateResponse()
  }

  async createCategory(_: Category): Promise<void> {
    return this.generateResponse()
  }

  async setCategory(_0: string[], _1: string): Promise<void> {
    return this.generateResponse()
  }

  async editCategory(_: Category): Promise<void> {
    return this.generateResponse()
  }

  async exportTorrent(_: string): Promise<Blob> {
    return this.generateResponse({ result: new Blob([new ArrayBuffer(1024)], { type: 'application/x-bittorrent' }) })
  }

  async SSLParameters(_: string): Promise<SSLParameters> {
    return this.generateResponse({
      result: {
        ssl_certificate: faker.helpers.replaceSymbols('?????????'),
        ssl_private_key: faker.helpers.replaceSymbols('?????????'),
        ssl_dh_params: faker.helpers.replaceSymbols('?????????'),
      },
    })
  }

  async setSSLParameters(_0: string, _1: SSLParameters): Promise<boolean> {
    return this.generateResponse({ result: true })
  }

  /// TransferController ///

  async toggleSpeedLimitsMode(): Promise<void> {
    return this.generateResponse()
  }

  async getGlobalDownloadLimit(): Promise<number> {
    return this.generateResponse({ result: 0 })
  }

  async getGlobalUploadLimit(): Promise<number> {
    return this.generateResponse({ result: 0 })
  }

  async setGlobalDownloadLimit(_: number): Promise<void> {
    return this.generateResponse()
  }

  async setGlobalUploadLimit(_: number): Promise<void> {
    return this.generateResponse()
  }

  async banPeers(_: string[]): Promise<void> {
    return this.generateResponse()
  }
}
