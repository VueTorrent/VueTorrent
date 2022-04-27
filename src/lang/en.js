const locale = {
  /** General */
  category: 'category',
  settings: 'settings',
  pause: 'pause',
  delete: 'delete',
  save: 'save',
  cancel: 'cancel',
  confirm: 'confirm',

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
    comments: 'comments'
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
    add: {
      title: 'Add a new Torrent',
      selectFiles: 'Select your files'
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
      rename: 'rename'
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
