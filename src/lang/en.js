const locale = {
  /** General */
  category: 'category',
  settings: 'settings',
  pause: 'pause',
  delete: 'delete',
  save: 'save',
  cancel: 'cancel',
  confirm: 'confirm',
  edit: 'Edit',
  createNew: 'Create New',
  path: 'Path',
  create: 'Create',
  url: 'URL',
  directory: 'Directory',
  unknown: 'unknown',
  status: 'Status',
  all: 'All',
  downloading: 'downloading',
  seeding: 'Seeding',
  completed: 'Completed',
  resumed: 'Resumed',
  paused: 'Paused',
  active: 'Active',
  inactive: 'Inactive',
  stalled: 'Stalled',
  errored: 'Errored',
  login: 'Login in',
  logout: 'Log out',
  downloaded: 'downloaded',
  uploaded: 'uploaded',
  upload: 'upload',
  download: 'Download',
  ETA: 'ETA',
  peers: 'Peers',
  ratio: 'Ratio',
  seeds: 'Seeds',
  tags: 'Tags',
  share: 'Share',
  name: 'Name',
  hash: 'Hase',
  magnet: 'Magnet',

  /** Torrent */
  torrent: {
    title: 'title',
    added: 'added on',
    availability: 'availability',
    size: 'size',
    progress: 'progress',
    directory: 'directory',
    downloaded: 'downloaded',
    uploaded: 'uploaded',
    created: 'created by',
    comments: 'comments',
    uploadedSession: 'Uploaded Session',
    torrentTitle: 'Torrent Title'
  },
  /** Navbar */
  navbar: {
    currentSpeed: 'current speed',
    freeSpace: 'free space',
    topActions: {
      addTorrent: 'add torrent',
      resumeSelected: 'resume selected torrents',
      pauseSelected: 'pause selected torrents',
      removeSelected: 'remove selected torrents',
      openSettings: 'open settings',
      searchNew: 'search new torrent'
    },
    sessionStats: {
      tooltip: 'Since the last time qBittorrent was restarted'
    },
    filters: {
      stalled_uploading: 'Stalled Uploading',
      stalled_downloading: 'Stalled Downloading'
    },
    action: {
      altSpeed: 'Alt speeds',
      dark: 'Dark',
      light: 'Light'
    }
  },

  /** Modals */
  modals: {
    pluginManager: {
      title: 'Plugin manager'
    },
    search: {
      title: 'Search',
      btnStartSearch: 'Search',
      btnStopSearch: 'Stop',
      columnTitle: {
        name: 'Name',
        size: 'Size',
        seeds: 'Seeds',
        peers: 'Peers',
        search_engine: 'Search_engine',
        action: 'Action'
      }
    },
    settings: {
      tabName: {
        VueTorrent: 'vuetorrent',
        downloads: 'downloads',
        connection: 'connection',
        bittorrent: 'bittorrent',
        webUI: 'WEB UI',
        tagsAndCategories: 'tags & categories'
      },
      pageVueTorrent: {
        tabName: {
          general: 'General',
          dashboard: 'Dashboard'
        },
        pageGeneral: {
          tip: 'These settings are for the custom WebUI itself',
          currentSpeed: 'Show Current Speed',
          speedGraph: 'Show Speed Graph',
          sessionStats: 'Show Session Stats',
          allTimeStats: 'Show All-Time Stats',
          freeSpace: 'Show Free Space',
          trackerFilter: 'Show Tracker Filter',
          rightDrawer: 'Right Drawer',
          language: 'Language:',
          paginationSize: 'Pagination size:',
          vueTorrentTitle: 'VueTorrent title:',
          currentVersion: 'Current Version:',
          qbittorrentVersion: 'QBittorrent Version:'
        },
        pageDashboard: {
          busyTorrentTip: 'Properties to display for busy torrents',
          completedTorrentTip: 'Properties to display for completed torrents'
        }
      },
      pageDownloads: {
        subHeaderWhenAddTorrent: 'When adding a torrent',
        whenAddTorrent: {
          createSubFolder: 'Create subfolder for torrents with multiple files',
          donotAutoStart: 'Do not start the download automatically'
        },
        subHeaderPublicSettings: 'Public Settings',
        publicSettings: {
          preAllocateDisk: 'Pre-allocate disk space for all files',
          appendQBExtension: 'Append .!qB extension to incomplete files'
        },
        subHeaderSaveManagement: 'Saving Management',
        saveManagement: {
          autoManagement: 'Automatic Torrent Management',
          relocate: 'Relocate Torrent when category changes',
          defaultSavePath: 'Default Save Path',
          keepIncompleteIn: 'Keep incomplete torrents in:',
          autoEnabled: 'Autorun enabled:',
          autorunProgram: 'Autorun program',
          supportParamTitle: 'Supported parameters (case sensitive):',
          supportParamN: '%N: Torrent name ',
          supportParamL: '%L: Category',
          supportParamG: '%G: Tags (separated by comma)',
          supportParamF: '%F: Content path (same as root path for multi-file torrent)',
          supportParamR: '%R: Root path (first torrent subdirectory path)',
          supportParamD: '%D: Save path',
          supportParamC: '%C: Number of files',
          supportParamZ: '%Z: Torrent size (bytes)',
          supportParamT: '%T: Current tracker',
          supportParamI: '%I: Info hash'
        }
      },
      pageConnection: {
        subHeader: 'Connection Limits',
        globalMaxConnection: 'Global maximum number of connections',
        perTorrentMaxConnection: 'Maximum number of connections per torrent',
        globalMaxUploadSlots: 'Global maximum number of upload slots',
        perTorrentMaxUploadSlots: 'Maximum number of upload slots per torrent'
      },
      pageBittorrent: {
        subHeaderPrivacy: 'Privacy',
        enableDHT: 'Enable DHT (decentralized network) to find more peers',
        enablePeX: 'Enable Peer Exchange (PeX) to find more peers',
        enableLPD: 'Enable Local Peer Discovery to find more peers',
        enableAnonymous: 'Enable anonymous mode',
        torrentQueue: 'Torrent Queueing',
        maxActiveDownload: 'Maximum active downloads',
        maxActiveUpload: 'Maximum active uploads',
        maxActiveTorrent: 'Maximum active torrents',
        excludeSlowTorrent: 'Do not count slow torrents in these limits',
        downloadRateLimit: 'Download rate threshold KiB/s',
        uploadRateLimit: 'Upload rate threshold KiB/s',
        torrentInactivityTimer: 'Torrent inactivity timer',
        subHeaderSeedLimits: 'Seed Limits',
        whenRatioReaches: 'When ratio reaches',
        whenSeedingTimeReaches: 'When seeding time reaches'
      },
      pageWebUI: {
        useAlternativeWebUI: 'Use Alternative WebUI',
        filesLocation: 'Files location',
        webUserInterface: 'Web User Interface (Remote Control)',
        ipAddress: 'IP Address:',
        port: 'Port',
        authentication: 'Authentication',
        username: 'Username',
        password: 'password',
        maxAttempts: 'Max attempts',
        banDuration: 'Ban Duration (seconds)',
        sessionTimeout: 'Session timeout (seconds)',
        bypassAuthenticationForClientsOnLocalhost: 'Bypass authentication for clients on localhost',
        bypassAuthenticationForClientsInWhitelisted: 'Bypass authentication for clients in whitelisted IP subnets',
        whiteListExample: 'Example: 172.17.32.0/24, fdff:ffff:c8::/40'
      },
      pageTagsAndCategories: {
        btnCreateNew: 'Create new',
        subHeaderTags: 'Available Tags:',
        subHeaderCategories: 'Available Categories:'
      }
    },
    shareLimit: {
      input: {
        globalLimit: 'Use global limit',
        unlimited: 'Unlimited'
      },
      limitRatio: 'Limit Ratio',
      titleDuration: 'Duration',
      titleRatio: 'Ratio'
    },
    newCategory: {
      categoryName: 'Category name',
      Path: 'Path',
      tipOnNoName: 'Category name is required',
      tipOnNameTooLong: 'Category name must be less than 15 characters',
      tipOnNoPath: 'Path is required',
      TipOnPathTooLong: 'Path must be less than 40 characters'
    },
    newTag: {
      createNewTag: 'Create New Tag',
      tagName: 'Tag name'
    },
    detail: {
      title: 'Torrent Detail',
      tabTitleInfo: 'Info',
      tabTitleTrackers: 'Trackers',
      tabTitlePeers: 'Peers',
      tabTitleContent: 'Content',
      tabTitleTagsCategories: 'Tags & Categories',
      pageInfo: {
        torrentTitle: 'Torrent title',
        hash: 'hash',
        ratio: 'Ratio',
        downloadSpeed: 'DL Speed',
        uploadSpeed: 'UP Speed',
        eta: 'ETA',
        peers: 'Peers',
        seeds: 'Seeds',
        status: 'Status',
        trackers: 'Trackers',
        createdBy: 'Created By',
        firstLastPiecePriority: 'First/Last Piece Priority',
        sequentialDownload: 'Sequential Download',
        autoTMM: 'Auto TMM',
        shareRatioLimit: 'Share Ratio Limit',
        shareTimeLimit: 'Share Time Limit (minutes)',
        downloadLimit: 'Download Limit',
        uploadLimit: 'Upload Limit'
      },
      pagePeers: {
        ip: 'IP',
        connection: 'Connection',
        flags: 'Flags',
        client: 'Client',
        progress: 'Progress',
        downloadSpeed: 'DL Speed',
        downloaded: 'Downloaded',
        upSpeed: 'UP Speed',
        uploaded: 'Uploaded',
        relevance: 'Relevance',
        files: 'Files'
      },
      pageTagsAndCategories: {
        subHeaderTag: 'Available Tags:',
        subHeaderCategories: 'Available Categories:'
      },
      pageTrackers: {
        url: 'URL',
        status: 'Status',
        peers: 'Peers',
        seeds: 'Seeds',
        leeches: 'Leeches',
        downloaded: 'Downloaded',
        message: 'Message'
      }
    },
    add: {
      title: 'Add a new Torrent',
      selectFiles: 'Select your files',
      urlHint: 'One link per line',
      downloadDirectory: 'Download Directory',
      starttorrent: 'Start torrent',
      skipHashCheck: 'Skip hash check',
      createSubfolder: 'Create subfolder',
      automaticTorrentManagement: 'Automatic Torrent Management',
      dropHereForAdd: 'Drop here for add',
      oneOrMoreFilesInvalidTorrent: 'One or more files is not a valid torrent'
    },
    changeLocation: {
      title: 'Change Location',
      torrentName: 'Torrent Name'
    },
    rename: {
      title: 'Rename',
      torrentName: 'Torrent Name'
    },
    sort: {
      title: 'Sort Torrents',
      reverse: 'Reverse',
      sortBy: {
        availability: 'Availability',
        category: 'Category',
        completed: 'Completed',
        downloaded: 'Downloaded',
        ETA: 'ETA',
        name: 'Name',
        peers: 'Peers',
        priority: 'Priority',
        progress: 'Progress',
        ratio: 'Ratio',
        size: 'Size',
        state: 'State',
        uploaded: 'Uploaded',
        addedOn: 'Added On',
        downloadSpeed: 'Download Speed',
        timeActive: 'Time Active',
        uploadSpeed: 'Upload Speed'
      }
    },
    speedLimit: {
      speedLimit: 'Speed Limit'
    },
    delete: {
      check: 'Also delete files from storage'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: 'Successfully logged in! 🎉',
    loginFailed: 'Login failed 😕',
    settingsSaved: 'Settings saved successfully!',
    categorySaved: 'Category edited successfully!'
  },

  /** RightClick **/
  rightClick: {
    resume: 'resume',
    forceResume: 'force resume',
    advanced: {
      advanced: 'advanced',
      changeLocation: 'change location',
      rename: 'rename',
      forceRecheck: 'Force recheck',
      forceReannounce: 'Force reannounce',
      sequentialDownload: 'Sequential Download',
      firstLastPriority: 'First/Last priority',
      automaticTorrentManagement: 'Automatic Torrent Management'
    },
    prio: {
      prio: 'set priority',
      top: 'top',
      bottom: 'bottom',
      increase: 'increase',
      decrease: 'decrease'
    },
    category: 'set category',
    limit: 'set limit',
    copy: 'copy',
    info: 'show info'
  }
}

export default locale
