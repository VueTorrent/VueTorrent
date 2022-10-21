const locale = {
  /** General */
  category: 'kategori',
  settings: 'pengaturan',
  pause: 'jeda',
  delete: 'hapus',
  save: 'simpan',
  cancel: 'batalkan',
  confirm: 'konfirmasi',
  edit: 'Edit',
  createNew: 'Buat Baru',
  path: 'Path',
  create: 'Buat',
  url: 'URL',
  directory: 'Direktori',
  unknown: 'tidak diketahui',
  status: 'Status',
  all: 'Semua',
  downloading: 'Men-download',
  seeding: 'Seeding',
  completed: 'Selesai',
  resumed: 'Dilanjutkan',
  paused: 'Terjeda',
  active: 'Aktif',
  inactive: 'Tidak Aktif',
  stalled: 'Ter-stall',
  errored: 'Bermasalah',
  login: 'Masuk',
  logout: 'Keluar',
  downloaded: 'Ter-download',
  uploaded: 'Ter-upload',
  upload: 'Upload',
  download: 'Download',
  ETA: 'Estimasi',
  peers: 'Peer',
  ratio: 'Rasio',
  seeds: 'Seed',
  tags: 'Tag',
  share: 'Bagikan',
  name: 'Nama',
  hash: 'Hash',
  magnet: 'Magnet',
  feed: 'feed',
  rule: 'rule',

  /** Torrent */
  torrent: {
    title: 'judul',
    added: 'ditambahkan pada',
    availability: 'ketersediaan',
    size: 'ukuran',
    progress: 'progres',
    directory: 'direktori',
    downloaded: 'di-download',
    uploaded: 'di-upload',
    created: 'dibuat dengan',
    comments: 'komentar',
    uploadedSession: 'Sesi Ter-upload',
    torrentTitle: 'Judul Torrent'
  },

  /** Navbar */
  navbar: {
    currentSpeed: 'kecepatan saat ini',
    freeSpace: 'kosong',
    topActions: {
      addTorrent: 'tambah torrent',
      resumeSelected: 'lanjut torrent terpilih',
      pauseSelected: 'jeda torrent terpilih',
      removeSelected: 'hapus torrent terpilih',
      openSettings: 'buka pengaturan',
      searchNew: 'cari torrent baru'
    },
    sessionStats: {
      tooltip: 'Sejak terakhir kali qBittorrent dijalankan ulang'
    },
    filters: {
      stalled_uploading: 'Upload ter-stall',
      stalled_downloading: 'Download ter-stall'
    },
    action: {
      altSpeed: 'Kecepatan alt',
      dark: 'Dark',
      light: 'Light'
    }
  },

  /** Modals */
  modals: {
    newFeed: {
      feedName: 'Nama',
      url: 'URL'
    },
    newRule: {
      name: 'Nama',
      def: {
        mustContain: 'Harus mengandung',
        affectedFeeds: 'Terapkan Aturan ke Feeds'
      }
    },
    pluginManager: {
      title: 'Manajer plugin'
    },
    search: {
      title: 'Cari',
      btnStartSearch: 'Cari',
      btnStopSearch: 'Berhenti',
      columnTitle: {
        name: 'Nama',
        size: 'Ukuran',
        seeds: 'Seeds',
        peers: 'Peers',
        search_engine: 'Situs',
        action: ''
      }
    },
    settings: {
      tabName: {
        VueTorrent: 'vuetorrent',
        downloads: 'Download',
        connection: 'koneksi',
        bittorrent: 'bittorrent',
        rss: 'Rss',
        webUI: 'WEBUI',
        tagsAndCategories: 'tag & kategori'
      },
      pageVueTorrent: {
        tabName: {
          general: 'Umum',
          dashboard: 'Dashboard'
        },
        pageGeneral: {
          tip: 'Pengaturan berikut hanya untuk WebUI kustom',
          currentSpeed: 'Tampilkan Kec. Terkini',
          speedGraph: 'Tampilkan Grafik Kecepatan',
          sessionStats: 'Tampilakn Statistik Sesi',
          allTimeStats: 'Tampilkan Semua Statistik',
          freeSpace: 'Tampilkan Ruang Kosong',
          trackerFilter: 'Tampilkan Filter Tracker',
          rightDrawer: 'Drawer di Kanan',
          language: 'Bahasa:',
          paginationSize: 'Ukuran halaman:',
          vueTorrentTitle: 'Judul VueTorrent:',
          currentVersion: 'Versi saat ini:',
          qbittorrentVersion: 'Versi qBittorrent:'
        },
        pageDashboard: {
          busyTorrentTip: 'Properti ditampilkan pada torrent yang sibuk',
          completedTorrentTip: 'Properti ditampilkan pada torrent yang selesai'
        }
      },
      pageDownloads: {
        subHeaderWhenAddTorrent: 'Saat menambahkan torrent',
        whenAddTorrent: {
          createSubFolder: 'Buat subfolder untuk torrent dengan banyak file',
          donotAutoStart: 'Jangan mulai download secara otomatis'
        },
        subHeaderPublicSettings: 'Pengaturan Publik',
        publicSettings: {
          preAllocateDisk: 'Pra-alokasi disk untuk semua file',
          appendQBExtension: 'Satukan ekstensi .!qB extension pada file yang belum selesai'
        },
        subHeaderSaveManagement: 'Manajemen Penyimpanan',
        saveManagement: {
          autoManagement: 'Manajemen Penyimpanan Otomatis',
          relocate: 'Relokasi Torrent saat kategori berubah',
          defaultSavePath: 'Path Simpan Default',
          keepIncompleteIn: 'Simpan yang torrent belum selesai di:',
          autoEnabled: 'Nyalakan Autorun:',
          autorunProgram: 'Program Autorun',
          supportParamTitle: 'Parameter yang didukung (case sensitive):',
          supportParamN: '%N: Nama Torrent ',
          supportParamL: '%L: Kategori',
          supportParamG: '%G: Tag (dipisahkan dengan koma)',
          supportParamF: '%F: Path konten (sama dengan path root untuk torrent dengan banyak file)',
          supportParamR: '%R: Path root (path subdirektori torrent pertama)',
          supportParamD: '%D: Path simpan',
          supportParamC: '%C: Jumlah file',
          supportParamZ: '%Z: Ukuran torrent (bytes)',
          supportParamT: '%T: Tracker saat ini',
          supportParamI: '%I: Info hash'
        }
      },
      pageConnection: {
        subHeader: 'Batas Koneksi',
        globalMaxConnection: 'Jumlah maksimum koneksi global',
        perTorrentMaxConnection: 'Jumlah maksimum koneksi per torrent',
        globalMaxUploadSlots: 'Jumlah maksimum slot upload global',
        perTorrentMaxUploadSlots: 'Jumlah maksimum slot upload per torrent',
        proxySubHeader: 'Server Proxy',
        proxyPeerConnections: 'Gunakan proxy untuk koneksi peer',
        proxyTorrentOnly: 'Gunakan proxy hanya untuk torrent',
        proxyAuth: 'Autentikasi'
      },
      pageBittorrent: {
        subHeaderPrivacy: 'Privasi',
        enableDHT: 'Aktifkan DHT (jaringan terdesentralisasi) untuk menemukan banyak peer',
        enablePeX: 'Aktifkan Peer Exchange (PeX) untuk menemukan banyak peer',
        enableLPD: 'Aktifkan Local Peer Discovery untuk menemukan banyak peer',
        enableAnonymous: 'Aktifkan mode anonymous',
        torrentQueue: 'Antrean Torrent',
        maxActiveDownload: 'Maksimum download aktif',
        maxActiveUpload: 'Maksimum upload aktif',
        maxActiveTorrent: 'Maksimum torrent aktif',
        excludeSlowTorrent: 'Jangan tampilkan torrent lambat pada batasan tersebut',
        downloadRateLimit: 'Batas kecepatan download KiB/s',
        uploadRateLimit: 'Batas kecepatan upload KiB/s',
        torrentInactivityTimer: 'Pengatur waktu tidak aktif torrent',
        subHeaderSeedLimits: 'Batas Seed',
        whenRatioReaches: 'Saat rasio mencapai',
        whenSeedingTimeReaches: 'Ketika waktu seeding mencapai'
      },
      pageRss: {
        tabName: {
          general: 'Umum',
          feeds: 'Feed',
          rules: 'Aturan'
        },
        pageRules: {
          rules: 'Aturan',
          btnCreateNew: 'Buat Aturan'
        },
        pageFeeds: {
          feeds: 'Feed',
          btnCreateNew: 'Tambah feed'
        },
        pageGeneral: {
          rssAutoProcessing: 'RSS Reader',
          rssAutoDownloader: 'RSS Torrent Auto Downloader',
          input: {
            enableRssAutoDownload: 'Aktifkan download otomatis RSS torrent',
            enableRssProcessing: 'Aktifkan pengambilan feed RSS',
            feedsRefreshInterval: 'Selang waktu refresh feed',
            feedsMaxArticles: 'Jumlah maksimum artikel per feed'
          }
        }
      },
      pageWebUI: {
        useAlternativeWebUI: 'Gunakan WebUI Alternatif',
        filesLocation: 'Lokasi file',
        webUserInterface: 'Web User Interface (Remote Control)',
        ipAddress: 'IP Address:',
        port: 'Port',
        authentication: 'Autentikasi',
        username: 'Username',
        password: 'Password',
        maxAttempts: 'Percobaan Maks.',
        banDuration: 'Durasi Ban (detik)',
        sessionTimeout: 'Waktu sesi (detik)',
        bypassAuthenticationForClientsOnLocalhost: 'Bypass autentikasi untuk klien pada localhost',
        bypassAuthenticationForClientsInWhitelisted: 'Bypass autentikasi untuk klien pada whitelist subnet IP',
        whiteListExample: 'Contoh: 172.17.32.0/24, fdff:ffff:c8::/40'
      },
      pageTagsAndCategories: {
        btnCreateNew: 'Buat baru',
        subHeaderTags: 'Tag Tersedia:',
        subHeaderCategories: 'Kategori Tersedia:'
      }
    },
    shareLimit: {
      input: {
        globalLimit: 'Gunakan batas global',
        unlimited: 'Unlimited'
      },
      limitRatio: 'Batas Rasio',
      titleDuration: 'Durasi',
      titleRatio: 'Rasio'
    },
    newCategory: {
      categoryName: 'Nama kategori',
      Path: 'Path',
      tipOnNoName: 'Nama kategori diperlukan',
      tipOnNameTooLong: 'Nama kategori harus kurang dari 15 karakter',
      tipOnNoPath: 'Path is required',
      TipOnPathTooLong: 'Path harus kurang dari 40 karakter'
    },
    newTag: {
      createNewTag: 'Buat Tag Baru',
      tagName: 'Nama tag'
    },
    detail: {
      title: 'Detail Torrent',
      tabTitleInfo: 'Info',
      tabTitleTrackers: 'Tracker',
      tabTitlePeers: 'Peer',
      tabTitleContent: 'Konten',
      tabTitleTagsCategories: 'Tag & Kategori',
      pageInfo: {
        pieceStates: 'Progres',
        torrentTitle: 'Judul torrent',
        hash: 'hash',
        ratio: 'Rasio',
        downloadSpeed: 'Kec. DL',
        uploadSpeed: 'Kec. UP',
        eta: 'Estimasi',
        peers: 'Peer',
        seeds: 'Seed',
        status: 'Status',
        trackers: 'Tracker',
        createdBy: 'Dibuat Oleh',
        firstLastPiecePriority: 'Prioritas Potongan Pertama/Terakhir',
        sequentialDownload: 'Download Sekuensial',
        autoTMM: 'TMM Oto.',
        shareRatioLimit: 'Batas Ratio Berbagi',
        shareTimeLimit: 'Batas Waktu Berbagi (menit)',
        downloadLimit: 'Batas Upload',
        uploadLimit: 'Batas Download'
      },
      pagePeers: {
        ip: 'IP',
        connection: 'Koneksi',
        flags: 'Bendera',
        client: 'Klien',
        progress: 'Progres',
        downloadSpeed: 'Kecepatan Und.',
        downloaded: 'Ter-download',
        upSpeed: 'Kecepatan Ung.',
        uploaded: 'Ter-upload',
        relevance: 'Relevansi',
        files: 'File'
      },
      pageTagsAndCategories: {
        subHeaderTag: 'Tag Tersedia:',
        subHeaderCategories: 'Kategori Tersedia:'
      },
      pageTrackers: {
        url: 'URL',
        status: 'Status',
        peers: 'Peer',
        seeds: 'Seed',
        leeches: 'Leeches',
        downloaded: 'Ter-download',
        message: 'Pesan'
      }
    },
    add: {
      title: 'Tambahkan Torrent baru',
      selectFiles: 'Pilih berkas anda'
    },
    delete: {
      check: 'Dan hapus berkas dari penyimpanan'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: 'Berhasil masuk! 🎉',
    loginFailed: 'Gagal masuk 😕',
    settingsSaved: 'Pengaturan sukses disimpan!',
    categorySaved: 'Kategori sukses diubah!',
    feedSaved: 'Feed berhasil disimpan!',
    ruleSaved: 'Rule disimpan!'
  },

  /** RightClick **/
  rightClick: {
    resume: 'resume',
    forceResume: 'force resume',
    advanced: {
      advanced: 'lebih lanjut',
      changeLocation: 'ubah lokasi',
      rename: 'ubah nama',
      forceRecheck: 'Paksa periksa ulang',
      forceReannounce: 'Paksa umumkan ulang',
      sequentialDownload: 'Download Sekuensial',
      firstLastPriority: 'Priotitas Pertama/Terakhir',
      automaticTorrentManagement: 'Manajemen Torrent Otomatis'
    },
    prio: {
      prio: 'atur prioritas',
      top: 'atas',
      bottom: 'bawah',
      increase: 'naikkan',
      decrease: 'turunkan'
    },
    category: 'atur kategori',
    limit: 'atur batas',
    copy: 'salin',
    info: 'tampilak info'
  }
}

export default locale
