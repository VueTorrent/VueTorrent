const locale = {
  /** General */
  category: '分類',
  settings: '設定',
  pause: '暫停',
  delete: '刪除',
  save: '儲存',
  cancel: '取消',
  confirm: '確認',
  edit: '編輯',
  createNew: '新增',
  path: '路徑',
  create: '新增',
  url: '連結',
  directory: '目錄',
  unknown: '未知',
  status: '狀態',
  all: '所有',
  downloading: '下載中',
  seeding: '做種中',
  completed: '已完成',
  resumed: '繼續',
  paused: '暫停',
  active: '活躍',
  inactive: '不活躍',
  stalled: '停止',
  errored: '錯誤',
  login: '登入',
  logout: '登出',
  downloaded: '已下載',
  uploaded: '已上傳',
  upload: '上傳',
  download: '下載',
  ETA: '預估剩餘時間',
  peers: '下載者',
  ratio: '分享率',
  seeds: '種子',
  tags: '標籤',
  share: '分享',
  name: '名稱',
  hash: '雜湊值',
  magnet: '磁力連結',
  feed: '訂閱源',
  rule: '規則',
  then: '然後',

  /** Torrent */
  torrent: {
    title: '標題',
    added: '新增於',
    availability: '可用性',
    size: '大小',
    progress: '進度',
    directory: '目錄',
    downloaded: '已下載',
    uploaded: '已上載',
    created: '製作程式',
    comments: '註解',
    uploadedSession: '上傳會話',
    torrentTitle: '種子標題'
  },
  /** Navbar */
  navbar: {
    currentSpeed: '當前速率',
    freeSpace: '剩餘硬碟空間',
    topActions: {
      addTorrent: '新增種子',
      resumeSelected: '繼續已選中種子',
      pauseSelected: '暫停已選中種子',
      removeSelected: '刪除已選中種子',
      openSettings: '打開設定',
      searchNew: '搜尋新種子'
    },
    sessionStats: {
      tooltip: '自 qBittorrent 上次重新啟動以來'
    },
    filters: {
      stalled_uploading: '停止上傳',
      stalled_downloading: '停止下載'
    },
    action: {
      altSpeed: '替補速率限制',
      dark: '暗色介面',
      light: '亮色介面'
    }
  },

  /** Modals */
  modals: {
    newFeed: {
      feedName: '名稱',
      url: '連結'
    },
    newRule: {
      name: '名稱',
      def: {
        mustContain: '必須包含',
        affectedFeeds: '套用至以下訂閱源'
      }
    },
    pluginManager: {
      title: '外掛管理器'
    },
    search: {
      title: '搜尋',
      btnStartSearch: '搜尋',
      btnStopSearch: '停止',
      columnTitle: {
        name: '名稱',
        size: '大小',
        seeds: '種子',
        peers: '下載者',
        search_engine: '網站',
        action: ''
      }
    },
    settings: {
      tabName: {
        VueTorrent: 'VueTorrent',
        downloads: '下載',
        connection: '連線',
        bittorrent: 'bittorrent',
        rss: 'RSS',
        webUI: '網頁介面',
        tagsAndCategories: '標籤和分類'
      },
      pageVueTorrent: {
        tabName: {
          general: '一般',
          dashboard: 'Dashboard'
        },
        pageGeneral: {
          tip: '這些設定適用於自訂WebUI',
          currentSpeed: '顯示當前速率',
          speedGraph: '顯示速率圖表',
          sessionStats: '顯示會話狀態',
          allTimeStats: '顯示歷史狀態',
          freeSpace: '顯示剩餘空間',
          trackerFilter: '顯示追蹤者過濾',
          rightDrawer: '側邊欄居右顯示',
          language: '語言',
          paginationSize: '每頁展示數量',
          vueTorrentTitle: 'VueTorrent 標題',
          currentVersion: '當前版本',
          qbittorrentVersion: 'QBittorrent 版本'
        },
        pageDashboard: {
          busyTorrentTip: '未完成種子所顯示的屬性',
          completedTorrentTip: '已完成種子所顯示的屬性'
        }
      },
      pageDownloads: {
        subHeaderWhenAddTorrent: '當新增種子時',
        whenAddTorrent: {
          createSubFolder: '為包含多個檔案的種子建立子資料夾',
          donotAutoStart: '不要自動開始下載'
        },
        subHeaderPublicSettings: '公共設定',
        publicSettings: {
          preAllocateDisk: '為所有檔案事先分配硬碟空間',
          appendQBExtension: '在未完成檔案加上 .!qB 副檔名'
        },
        subHeaderSaveManagement: '存檔管理',
        saveManagement: {
          autoManagement: '自動管理種子',
          relocate: '當分類變更時重新定位種子',
          defaultSavePath: '預設儲存路徑',
          keepIncompleteIn: '保留未完成的種子於：',
          autoEnabled: '啟用自動執行：',
          autorunProgram: '自動執行的程式',
          supportParamTitle: '支援的參數 (區分大小寫)',
          supportParamN: '%N: 種子名稱',
          supportParamL: '%L: 分類',
          supportParamG: '%G: 標籤 (以逗號分隔)',
          supportParamF: '%F: 內容路徑 (與多檔案種子的根路徑相同)',
          supportParamR: '%R: 根路徑 (第一個種子的子目錄路徑)',
          supportParamD: '%D: 儲存路徑',
          supportParamC: '%C: 檔案數',
          supportParamZ: '%Z: 種子大小 (位元組 byte)',
          supportParamT: '%T: 當前的追蹤者',
          supportParamI: '%I: 資訊雜湊值'
        }
      },
      pageConnection: {
        subHeader: '連線限制',
        globalMaxConnection: '全域最大連線數',
        perTorrentMaxConnection: '單個種子的最大連線數',
        globalMaxUploadSlots: '全域上傳通道最大數',
        perTorrentMaxUploadSlots: '單個種子的上傳通道最大數',
        proxySubHeader: '代理伺服器',
        proxyPeerConnections: '使用代理伺服器來連線下載者',
        proxyTorrentOnly: '只對種子使用代理伺服器',
        proxyAuth: '驗證'
      },
      pageBittorrent: {
        subHeaderPrivacy: '隱私',
        enableDHT: '啟用 DHT (分散式網絡) 以尋找更多下載者',
        enablePeX: '啟用節點交換 (PeX) 以尋找更多下載者',
        enableLPD: '啟用本地下載者搜尋以尋找更多下載者',
        enableAnonymous: '啟用匿名模式',
        torrentQueue: '種子佇列',
        maxActiveDownload: '最大活躍下載數',
        maxActiveUpload: '最大活躍上傳數',
        maxActiveTorrent: '最大活躍種子數',
        excludeSlowTorrent: '不要在這些限制範圍內計算速率慢的種子',
        downloadRateLimit: '下載速率閾值 KiB/s',
        uploadRateLimit: '上傳速率閾值 KiB/s',
        torrentInactivityTimer: '種子不活躍計時器',
        subHeaderSeedLimits: '做種限制',
        whenRatioReaches: '當分享率達到',
        whenSeedingTimeReaches: '當做種時間達到 (分鐘)',
        maxRatioPauseTorrent: '暫停種子',
        maxRatioRemoveTorrent: '移除種子',
        maxRatioRemoveTorrentAndFiles: '移除種子與其檔案',
        maxRatioTorrentSuperseeding: '為種子啟用超級做種'
      },
      pageRss: {
        tabName: {
          general: '一般',
          feeds: '訂閱源',
          rules: '規則'
        },
        pageRules: {
          rules: '規則',
          btnCreateNew: '新增規則'
        },
        pageFeeds: {
          feeds: '訂閱源',
          btnCreateNew: '新增訂閱'
        },
        pageGeneral: {
          rssAutoProcessing: 'RSS 閱讀器',
          rssAutoDownloader: 'RSS 種子自動下載器',
          input: {
            enableRssAutoDownload: '啟用自動 RSS 種子下載',
            enableRssProcessing: '啟用抓取 RSS 訂閱',
            feedsRefreshInterval: '訂閱源更新區間',
            feedsMaxArticles: '每個訂閱源的最大文章數'
          }
        }
      },
      pageWebUI: {
        useAlternativeWebUI: '使用替補 WebUI',
        filesLocation: '檔案路徑',
        webUserInterface: '網頁介面 (遠端控制)',
        ipAddress: 'IP 位置',
        port: '埠',
        authentication: '驗證',
        username: '使用者名稱',
        password: '密碼',
        maxAttempts: '最大嘗試次數',
        banDuration: '封鎖時長 (秒)',
        sessionTimeout: '會話逾時 (秒)',
        bypassAuthenticationForClientsOnLocalhost: '跳過本機客戶端的驗證',
        bypassAuthenticationForClientsInWhitelisted: '跳過白名單內 IP 子網中客戶端的驗證',
        whiteListExample: '範例：172.17.32.0/24, fdff:ffff:c8::/40'
      },
      pageTagsAndCategories: {
        btnCreateNew: '新增',
        subHeaderTags: '可用標籤：',
        subHeaderCategories: '可用分類：'
      }
    },
    shareLimit: {
      input: {
        globalLimit: '使用全域限制',
        unlimited: '無限制'
      },
      limitRatio: '做種限制',
      titleDuration: '時長',
      titleRatio: '分享率'
    },
    newCategory: {
      categoryName: '分類名稱',
      Path: '路徑',
      tipOnNoName: '必須填寫分類名稱',
      tipOnNameTooLong: '分類名稱必須少於 15 個字符',
      tipOnNoPath: '必須填寫路徑',
      TipOnPathTooLong: '路徑必須少於 40 個字符'
    },
    newTag: {
      createNewTag: '新增標籤',
      tagName: '標籤名稱'
    },
    detail: {
      title: '種子詳情',
      tabTitleInfo: '資訊',
      tabTitleTrackers: '追蹤者',
      tabTitlePeers: '下載者',
      tabTitleContent: '內容',
      tabTitleTagsCategories: '標籤和分類',
      pageInfo: {
        pieceStates: '進度',
        torrentTitle: '種子標題',
        hash: '雜湊值',
        ratio: '分享率',
        downloadSpeed: '下載速率',
        uploadSpeed: '上傳速率',
        eta: '預估剩餘時間',
        peers: '下載者',
        seeds: '種子',
        status: '狀態',
        trackers: '追蹤者',
        createdBy: '製作器',
        firstLastPiecePriority: '優先下載首末塊',
        sequentialDownload: '順序下載',
        autoTMM: '自動種子管理',
        shareRatioLimit: '分享率限制',
        shareTimeLimit: '分享時間限制 (分鐘)',
        downloadLimit: '下載限制',
        uploadLimit: '上傳限制'
      },
      pagePeers: {
        ip: 'IP',
        connection: '連線',
        flags: '旗',
        client: '客戶端',
        progress: '進度',
        downloadSpeed: '下載速率',
        downloaded: '已下載',
        upSpeed: '上傳速率',
        uploaded: '已上傳',
        relevance: '關聯',
        files: '檔案'
      },
      pageTagsAndCategories: {
        subHeaderTag: '可用標竹：',
        subHeaderCategories: '可用分類：'
      },
      pageTrackers: {
        url: 'URL',
        status: '狀態',
        peers: '下載者',
        seeds: '種子',
        leeches: '蝗族',
        downloaded: '已下載',
        message: '訊息'
      }
    },
    add: {
      title: '新增種子',
      selectFiles: '選擇檔案',
      urlHint: '每行一個連結',
      downloadDirectory: '下載目錄',
      starttorrent: '新增後開始',
      skipHashCheck: '跳過雜湊值檢',
      createSubfolder: '建立子資料夾',
      automaticTorrentManagement: '自動種子管理 (ATM)',
      dropHereForAdd: '拖拽至此處新增',
      oneOrMoreFilesInvalidTorrent: '存在無效的種子檔案'
    },
    changeLocation: {
      title: '更改位置',
      torrentName: '種子名稱'
    },
    rename: {
      title: '重新命名',
      torrentName: '種子名稱'
    },
    sort: {
      title: '種子排序',
      reverse: '倒序',
      sortBy: {
        availability: '可得性',
        category: '分類',
        completed: '已完成',
        downloaded: '已下載',
        ETA: '預估剩餘時間',
        name: '名稱',
        peers: '下載者',
        priority: '優先級',
        progress: '進度',
        ratio: '分享率',
        size: '大小',
        state: '狀態',
        uploaded: '已上傳',
        addedOn: '新增於',
        downloadSpeed: '下載速率',
        timeActive: '經過時間',
        uploadSpeed: '上傳速率'
      }
    },
    speedLimit: {
      speedLimit: '速率限制'
    },
    delete: {
      check: '同時從儲存空間中刪除'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: '登入成功！🎉',
    loginFailed: '登入失敗…😕',
    settingsSaved: '設定儲存成功！',
    categorySaved: '分類編輯成功！',
    feedSaved: '訂閱源儲存成功！',
    ruleSaved: '規則保存成功！'
  },

  /** RightClick **/
  rightClick: {
    resume: '繼續',
    forceResume: '強制繼續',
    advanced: {
      advanced: '進階',
      changeLocation: '修改儲存位置',
      rename: '重新命名',
      forceRecheck: '強制重新檢查',
      forceReannounce: '強制重新發佈',
      sequentialDownload: '順序下載',
      firstLastPriority: '首末優先',
      automaticTorrentManagement: '自動種子管理 (ATM)'
    },
    prio: {
      prio: '設置優先級',
      top: '最高',
      bottom: '最低',
      increase: '提升',
      decrease: '降低'
    },
    category: '設定分類',
    limit: '設定限制',
    copy: '複製',
    info: '顯示詳情'
  }
}

export default locale
