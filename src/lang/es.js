const locale = {
  /** General */
  category: 'categoría',
  settings: 'ajustes',
  pause: 'pausar',
  delete: 'borrar',
  save: 'guardar',
  cancel: 'cancelar',
  confirm: 'confirmar',
  // edit: 'Edit',
  // createNew: 'Create New',
  // path: 'Path',
  // create: 'Create',
  // url: 'URL',
  // directory: 'Directory',
  // unknown: 'Unknown',
  // status: 'Status',
  // all: 'All',
  // downloading: 'Downloading',
  // seeding: 'Seeding',
  // completed: 'Completed',
  // resumed: 'Resumed',
  // paused: 'Paused',
  // active: 'Active',
  // inactive: 'Inactive',
  // stalled: 'Stalled',
  // errored: 'Errored',
  // login: 'Login in',
  // logout: 'Log out',
  // download: 'Download',
  // downloaded: 'Downloaded',
  // upload: 'Upload',
  // uploaded: 'Uploaded',
  // ETA: 'ETA',
  // peers: 'Peers',
  // ratio: 'Ratio',
  // seeds: 'Seeds',
  // tags: 'Tags',
  // tracker: 'Tracker',
  // share: 'Share',
  // name: 'Name',
  // hash: 'Hash',
  // magnet: 'Magnet',
  // feed: 'Feed',
  // rule: 'Rule',
  // then: 'Then',

  // /** Dashboard */
  // dashboard: {
  //   tooltips: {
  //     toggleSearch: 'Toggle Search Filter',
  //     toggleSelect: 'Toggle Select Mode',
  //     toggleSort: 'Sort Torrents',
  //     selectAll: 'Select All',
  //     selectAllCaption: 'Select / Release All (Ctrl + A)'
  //   },
  //   emptyTorrentList: 'Nothing to see here!'
  // },

  /** Torrent */
  torrent: {
    title: 'título',
    added: 'agregado el',
    availability: 'disponibilidad',
    size: 'tamaño',
    progress: 'progreso',
    directory: 'directorio',
    downloaded: 'descargado',
    uploaded: 'subido',
    created: 'creado por',
    comments: 'comentarios'
    // uploadedSession: 'Uploaded Session',
    // timeActive: 'Time Active',
    // seededFor: 'Seeded For',
    // last_activity: 'Last Activity',
    // completed_on: 'Completed On',
    // globalSpeed: 'Global Speed',
    // globalVolume: 'Global Volume'
  },
  /** Navbar */
  navbar: {
    currentSpeed: 'velocidad actual',
    // alltimeTitle: 'All-Time Stats',
    // sessionTitle: 'Session Stats',
    freeSpace: 'espacio libre',
    topActions: {
      addTorrent: 'agregar torrrent',
      resumeSelected: 'resumir torrents seleccionados',
      pauseSelected: 'pausar torrents seleccionados',
      removeSelected: 'quitar torrents seleccionados',
      openSettings: 'abrir ajustes',
      searchNew: 'buscar nuevo torrent'
    },
    sessionStats: {
      tooltip: 'Desde la última vez que se reinició qBittorrent'
    }
    // filters: {
    //   stalled_uploading: 'Stalled Uploading',
    //   stalled_downloading: 'Stalled Downloading',
    //   uncategorized: 'Uncategorized',
    //   untagged: 'Untagged',
    //   not_working: 'Not Working'
    // },
    // action: {
    //   altSpeed: 'Alt Speeds',
    //   dark: 'Dark',
    //   light: 'Light'
    // }
  },

  /** Modals */
  modals: {
    newFeed: {
      // feedName: 'Name',
      // url: 'URL'
    },
    newRule: {
      // titleCreate: 'Create new rule',
      // titleEdit: 'Edit rule',
      // name: 'Name',
      def: {
        // mustContain: 'Must Contain',
        // affectedFeeds: 'Apply Rule to Feeds'
      }
    },
    pluginManager: {
      // title: 'Plugin manager'
    },
    search: {
      // title: 'Search',
      // btnStartSearch: 'Search',
      // btnStopSearch: 'Stop',
      columnTitle: {
        // name: 'Name',
        // size: 'Size',
        // seeds: 'Seeds',
        // peers: 'Peers',
        // search_engine: 'Site',
        // action: ''
      }
    },
    settings: {
      tabName: {
        // VueTorrent: 'VueTorrent',
        // downloads: 'Downloads',
        // connection: 'Connection',
        // bittorrent: 'BitTorrent',
        // rss: 'RSS',
        // webUI: 'WebUI',
        // tagsAndCategories: 'Tags & Categories'
      },
      pageVueTorrent: {
        tabName: {
          // general: 'General',
          // dashboard: 'Dashboard'
        },
        pageGeneral: {
          // tip: 'These settings are for the custom WebUI itself',
          // currentSpeed: 'Show Current Speed',
          // speedGraph: 'Show Speed Graph',
          // sessionStats: 'Show Session Stats',
          // allTimeStats: 'Show All-Time Stats',
          // freeSpace: 'Show Free Space',
          // trackerFilter: 'Show Tracker Filter',
          // rightDrawer: 'Right Drawer',
          // topPagination: 'Top Pagination',
          // language: 'Language:',
          // paginationSize: 'Pagination size:',
          // vueTorrentTitle: 'VueTorrent title:',
          // dateFormat: 'Date Format',
          // openSideBarOnStart: 'Open Side Bar on launch',
          // currentVersion: 'Current Version:',
          // qbittorrentVersion: 'QBittorrent Version:'
        },
        pageDashboard: {
          // busyTorrentTip: 'Properties to display for busy torrents',
          // completedTorrentTip: 'Properties to display for completed torrents',
          properties: {
            // availability: 'Availability',
            // category: 'Category',
            // tags: 'Tags',
            // completed: 'Completed',
            // downloaded: 'Downloaded',
            // ETA: 'ETA',
            // name: 'Name',
            // default: 'Default',
            // last_activity: 'Last Activity',
            // peers: 'Peers',
            // seeds: 'Seeds',
            // priority: 'Priority',
            // progress: 'Progress',
            // ratio: 'Ratio',
            // save_path: 'Directory',
            // size: 'Size',
            // state: 'State',
            // uploaded: 'Uploaded',
            // addedOn: 'Added On',
            // downloadSpeed: 'Download Speed',
            // timeActive: 'Time Active',
            // uploadSpeed: 'Upload Speed'
          }
        }
      },
      pageDownloads: {
        // subHeaderWhenAddTorrent: 'When adding a torrent',
        whenAddTorrent: {
          // createSubFolder: 'Create subfolder for torrents with multiple files',
          // donotAutoStart: 'Do not start the download automatically'
        },
        // subHeaderPublicSettings: 'Public Settings',
        publicSettings: {
          // preAllocateDisk: 'Pre-allocate disk space for all files',
          // appendQBExtension: 'Append .!qB extension to incomplete files'
        },
        // subHeaderSaveManagement: 'Saving Management',
        saveManagement: {
          // autoManagement: 'Automatic Torrent Management',
          // relocate: 'Relocate torrent when category changes',
          // defaultSavePath: 'Default Save Path',
          // keepIncompleteIn: 'Keep incomplete torrents in:',
          // autoEnabled_onAdded: 'Run external program on torrent added:',
          // autoLabel_onAdded: 'Command',
          // autoEnabled_onFinished: 'Autorun enabled:',
          // autoEnabled_onFinished: 'Autorun program',
          // supportParamTitle: 'Supported parameters (case sensitive):',
          // supportParamN: '%N: Torrent name ',
          // supportParamL: '%L: Category',
          // supportParamG: '%G: Tags (separated by comma)',
          // supportParamF: '%F: Content path (same as root path for multi-file torrent)',
          // supportParamR: '%R: Root path (first torrent subdirectory path)',
          // supportParamD: '%D: Save path',
          // supportParamC: '%C: Number of files',
          // supportParamZ: '%Z: Torrent size (bytes)',
          // supportParamT: '%T: Current tracker',
          // supportParamI: '%I: Info hash'
        }
      },
      pageConnection: {
        // protocol: 'Peer connection protocol',
        // listeningSubHeader: 'Listening Port',
        // useUPnP: 'Use UPnP / NAT-PMP port forwarding from my router',
        // incomingConnectionPort: 'Port used for incoming connections',
        // subHeader: 'Connection Limits (-1 to disable)',
        // globalMaxConnection: 'Global maximum number of connections',
        // perTorrentMaxConnection: 'Maximum number of connections per torrent',
        // globalMaxUploadSlots: 'Global maximum number of upload slots',
        // perTorrentMaxUploadSlots: 'Maximum number of upload slots per torrent',
        // proxySubHeader: 'Proxy Server',
        // proxyPeerConnections: 'Use proxy for peer connections',
        // proxyTorrentOnly: 'Use proxy only for torrents',
        // proxyAuth: 'Authentication'
      },
      pageBittorrent: {
        // subHeaderPrivacy: 'Privacy',
        // enableDHT: 'Enable DHT (decentralized network) to find more peers',
        // enablePeX: 'Enable Peer Exchange (PeX) to find more peers',
        // enableLPD: 'Enable Local Peer Discovery to find more peers',
        // enableAnonymous: 'Enable anonymous mode',
        // torrentQueue: 'Torrent Queueing',
        // maxActiveDownload: 'Maximum active downloads',
        // maxActiveUpload: 'Maximum active uploads',
        // maxActiveTorrent: 'Maximum active torrents',
        // excludeSlowTorrent: 'Do not count slow torrents in these limits',
        // downloadRateLimit: 'Download rate threshold KiB/s',
        // uploadRateLimit: 'Upload rate threshold KiB/s',
        // torrentInactivityTimer: 'Torrent inactivity timer',
        // subHeaderSeedLimits: 'Seed Limits',
        // whenRatioReaches: 'When ratio reaches',
        // whenSeedingTimeReaches: 'When seeding time reaches',
        // maxRatioPauseTorrent: 'Pause torrent',
        // maxRatioRemoveTorrent: 'Remove torrent',
        // maxRatioRemoveTorrentAndFiles: 'Remove torrent and files',
        // maxRatioTorrentSuperseeding: 'Enable torrent super seeding'
      },
      pageRss: {
        tabName: {
          // general: 'General',
          // feeds: 'Feeds',
          // rules: 'Rules'
        },
        pageRules: {
          // rules: 'Rules',
          // btnCreateNew: 'Create Rule'
        },
        pageFeeds: {
          // feeds: 'Feeds',
          // btnCreateNew: 'Add feed'
        },
        pageGeneral: {
          // rssAutoProcessing: 'RSS Reader',
          // rssAutoDownloader: 'RSS Torrent Auto Downloader',
          input: {
            // enableRssAutoDownload: 'Enable auto downloading of RSS torrents',
            // enableRssProcessing: 'Enable fetching RSS feeds',
            // feedsRefreshInterval: 'Feeds refresh interval (in minutes)',
            // feedsMaxArticles: 'Maximum number of articles per feed'
          }
        }
      },
      pageWebUI: {
        // useAlternativeWebUI: 'Use Alternative WebUI',
        // filesLocation: 'Files location',
        // webUserInterface: 'Web User Interface (Remote Control)',
        // ipAddress: 'IP Address:',
        // port: 'Port',
        // authentication: 'Authentication',
        // username: 'Username',
        // password: 'Password',
        // maxAttempts: 'Max attempts',
        // banDuration: 'Ban Duration (seconds)',
        // sessionTimeout: 'Session timeout (seconds)',
        // bypassAuthenticationForClientsOnLocalhost: 'Bypass authentication for clients on localhost',
        // bypassAuthenticationForClientsInWhitelisted: 'Bypass authentication for clients in whitelisted IP subnets',
        // whiteListExample: 'Example: 172.17.32.0/24, fdff:ffff:c8::/40'
      },
      pageTagsAndCategories: {
        // btnCreateNew: 'Create new',
        // subHeaderTags: 'Available Tags:',
        // subHeaderCategories: 'Available Categories:'
      }
    },
    shareLimit: {
      input: {
        // globalLimit: 'Use global limit',
        // unlimited: 'Unlimited'
      }
      // limitRatio: 'Limit Ratio',
      // titleDuration: 'Duration',
      // titleRatio: 'Ratio'
    },
    newCategory: {
      // categoryName: 'Category name',
      // Path: 'Path',
      // tipOnNoName: 'Category name is required',
      // tipOnNoPath: 'Path is required'
    },
    newTag: {
      // createNewTag: 'Create New Tag',
      // tagName: 'Tag name'
    },
    detail: {
      // title: 'Torrent Detail',
      // tabTitleInfo: 'Info',
      // tabTitleTrackers: 'Trackers',
      // tabTitlePeers: 'Peers',
      // tabTitleContent: 'Content',
      // tabTitleTagsCategories: 'Tags & Categories',
      pageInfo: {
        // pieceStates: 'Progress',
        // torrentTitle: 'Torrent title',
        // hash: 'Hash',
        // ratio: 'Ratio',
        // downloadSpeed: 'DL Speed',
        // uploadSpeed: 'UP Speed',
        // eta: 'ETA',
        // peers: 'Peers',
        // seeds: 'Seeds',
        // status: 'Status',
        // trackers: 'Trackers',
        // createdBy: 'Created By',
        // firstLastPiecePriority: 'First/Last Piece Priority',
        // sequentialDownload: 'Sequential Download',
        // autoTMM: 'Automatic Torrent Management',
        // shareRatioLimit: 'Share Ratio Limit',
        // shareTimeLimit: 'Share Time Limit (minutes)',
        // downloadLimit: 'Download Limit',
        // uploadLimit: 'Upload Limit'
      },
      pagePeers: {
        // ip: 'IP',
        // connection: 'Connection',
        // flags: 'Flags',
        // client: 'Client',
        // progress: 'Progress',
        // downloadSpeed: 'DL Speed',
        // downloaded: 'Downloaded',
        // upSpeed: 'UP Speed',
        // uploaded: 'Uploaded',
        // relevance: 'Relevance',
        // files: 'Files'
      },
      pageTagsAndCategories: {
        // subHeaderTag: 'Available Tags:',
        // subHeaderCategories: 'Available Categories:'
      },
      pageTrackers: {
        // url: 'URL',
        // status: 'Status',
        // peers: 'Peers',
        // seeds: 'Seeds',
        // leeches: 'Leeches',
        // downloaded: 'Downloaded',
        // message: 'Message'
      }
    },
    add: {
      title: 'Agregar nuevo torrent',
      selectFiles: 'Selecciona tus archivos'
      // urlHint: 'One link per line',
      // downloadDirectory: 'Download Directory',
      // starttorrent: 'Start torrent',
      // skipHashCheck: 'Skip hash check',
      // createSubfolder: 'Create subfolder',
      // automaticTorrentManagement: 'Automatic Torrent Management',
      // dropHereForAdd: 'Drop here for add',
      // oneOrMoreFilesInvalidTorrent: 'One or more files are not valid torrents'
    },
    changeLocation: {
      // title: 'Change Location'
    },
    rename: {
      // title: 'Rename',
      // torrentName: 'Torrent Name'
    },
    sort: {
      // title: 'Sort Torrents',
      // reverse: 'Reverse',
      sortBy: {
        // availability: 'Availability',
        // category: 'Category',
        // completed: 'Completed',
        // downloaded: 'Downloaded',
        // ETA: 'ETA',
        // name: 'Name',
        // default: 'Default',
        // last_activity: 'Last Activity',
        // peers: 'Peers',
        // priority: 'Priority',
        // progress: 'Progress',
        // ratio: 'Ratio',
        // save_path: 'Directory',
        // size: 'Size',
        // state: 'State',
        // uploaded: 'Uploaded',
        // addedOn: 'Added On',
        // downloadSpeed: 'Download Speed',
        // timeActive: 'Time Active',
        // uploadSpeed: 'Upload Speed',
        // globalSpeed: 'Global Speed',
        // globalVolume: 'Global Volume'
      }
    },
    speedLimit: {
      // speedLimit: 'Speed Limit'
    },
    delete: {
      check: 'También borrar archivos del disco'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: '¡Inicio de sesión correcto! 🎉',
    loginFailed: 'Inicio de sesión fallido 😕',
    settingsSaved: '¡Los ajustes se guardaron correctamente!',
    categorySaved: '¡Categoría guardada correctamente!'
    // feedSaved: 'Feed saved successfully!',
    // ruleSaved: 'Rule saved!',
    // renameFileFailed: 'Unable to rename file',
    // renameFolderFailed: 'Unable to rename file'
  },

  /** RightClick **/
  rightClick: {
    resume: 'reanudar',
    forceResume: 'forzar reanudado',
    advanced: {
      advanced: 'avanzado',
      changeLocation: 'cambiar directorio',
      rename: 'renombrar'
      // forceRecheck: 'Force recheck',
      // forceReannounce: 'Force reannounce',
      // sequentialDownload: 'Sequential download',
      // firstLastPriority: 'First/Last priority',
      // automaticTorrentManagement: 'Automatic Torrent Management'
    },
    prio: {
      prio: 'prioridad',
      top: 'arriba',
      bottom: 'abajo',
      increase: 'incrementar',
      decrease: 'reducir'
    },
    category: 'categoría',
    // tags: 'Set Tags',
    // notags: 'No Tags',
    limit: 'poner límite',
    copy: 'copiar',
    info: 'mostrar información'
  }
}

export default locale
