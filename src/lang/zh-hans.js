const locale = {
  /** General */
  category: '分类',
  settings: '设置',
  pause: '暂停',
  delete: '删除',
  save: '保存',
  cancel: '取消',
  confirm: '确认',
  edit: '编辑',
  createNew: '新增',
  path: '路径',
  create: '新增',
  url: '链接',
  directory: '目录',
  unknown: '未知',
  status: '状态',
  all: '所有',
  downloading: '下载中',
  seeding: '做种中',
  completed: '已完成',
  resumed: '恢复',
  paused: '暂停',
  active: '活动',
  inactive: '空闲',
  stalled: '低速',
  errored: '错误',
  login: '登录',
  logout: '退出',
  downloaded: '已下载',
  uploaded: '已上传',
  upload: '上传',
  download: '下载',
  ETA: '剩余时间',
  peers: '用户',
  ratio: '比率',
  seeds: '做种',
  tags: '标签',
  // tracker: 'Tracker',
  share: '分享',
  name: '名称',
  hash: '哈希值',
  magnet: '磁力链接',
  feed: '订阅源',
  rule: '规则',
  then: '则',

  /** Dashboard */
  dashboard: {
    tooltips: {
      // toggleSearch: 'Toggle Search Filter',
      // toggleSelect: 'Toggle Select Mode',
      // toggleSort: 'Sort Torrents',
      // selectAll: 'Select All',
      // selectAllCaption: 'Select / Release All (Ctrl + A)'
    }
    // emptyTorrentList: 'Nothing to see here!'
  },
  /** Torrent */
  torrent: {
    title: '标题',
    added: '添加时间',
    availability: '可用性',
    size: '大小',
    progress: '进度',
    directory: '目录',
    downloaded: '下载量',
    uploaded: '上传量',
    created: '制作程序',
    comments: '注释',
    uploadedSession: '上传会话',
    timeActive: '活跃时间',
    seededFor: '做种',
    last_activity: '上次活跃'
  },
  /** Navbar */
  navbar: {
    currentSpeed: '当前速率',
    // alltimeTitle: 'All-Time Stats',
    // sessionTitle: 'Session Stats',
    freeSpace: '剩余磁盘空间',
    topActions: {
      addTorrent: '打开种子',
      resumeSelected: '继续选中种子',
      pauseSelected: '暂停选中种子',
      removeSelected: '删除选中种子',
      openSettings: '打开设置',
      searchNew: '搜索新种子'
    },
    sessionStats: {
      tooltip: '自 qBittorrent 上次重启以来'
    },
    filters: {
      stalled_uploading: '低速上传',
      stalled_downloading: '低速下载'
      // uncategorized: 'Uncategorized',
      // untagged: 'Untagged',
      // not_working: 'Not Working'
    },
    action: {
      altSpeed: '备用速率限制',
      dark: '暗色界面',
      light: '亮色界面'
    }
  },

  /** Modals */
  modals: {
    newFeed: {
      feedName: '名称',
      url: '地址'
    },
    newRule: {
      // titleCreate: 'Create new rule',
      // titleEdit: 'Edit rule',
      name: '名称',
      def: {
        mustContain: '必须包含',
        affectedFeeds: '应用于以下订阅源'
      }
    },
    pluginManager: {
      title: '插件管理器'
    },
    search: {
      title: '搜索',
      btnStartSearch: '搜索',
      btnStopSearch: '停止',
      columnTitle: {
        name: '名称',
        size: '大小',
        seeds: '上传',
        peers: '用户',
        search_engine: '站点',
        action: '操作'
      }
    },
    settings: {
      tabName: {
        VueTorrent: 'VueTorrent',
        downloads: '下载',
        connection: '连接',
        bittorrent: 'bittorrent',
        rss: 'RSS',
        webUI: '网页界面',
        tagsAndCategories: '标签和分类'
      },
      pageVueTorrent: {
        tabName: {
          general: '常规',
          dashboard: '面板'
        },
        pageGeneral: {
          tip: '这些设置适用于自定义 WebUI 本身',
          currentSpeed: '显示当前速度',
          speedGraph: '显示速度图形化',
          sessionStats: '显示会话状态',
          allTimeStats: '显示历史状态',
          freeSpace: '显示剩余空间',
          trackerFilter: '显示 Tracker 过滤',
          rightDrawer: '侧边栏居右显示',
          topPagination: '置顶分页按钮',
          language: '语言',
          paginationSize: '每页展示数量',
          vueTorrentTitle: 'VueTorrent 标题',
          dateFormat: '日期格式',
          openSideBarOnStart: '启动时打开侧栏',
          currentVersion: '当前版本',
          qbittorrentVersion: 'QBittorrent 版本'
        },
        pageDashboard: {
          busyTorrentTip: '未完成的种子要显示的属性',
          completedTorrentTip: '已完成的种子要显示的属性',
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
        subHeaderWhenAddTorrent: '当添加种子时',
        whenAddTorrent: {
          createSubFolder: '为包含多个文件的种子创建子文件夹',
          donotAutoStart: '不要自动开始下载'
        },
        subHeaderPublicSettings: '公共设置',
        publicSettings: {
          preAllocateDisk: '为所有文件预分配磁盘空间',
          appendQBExtension: '为未完成的文件添加 .!qB 后缀'
        },
        subHeaderSaveManagement: '存储管理器',
        saveManagement: {
          autoManagement: '自动管理种子',
          relocate: '当分类变化时更改种子保存的路径',
          defaultSavePath: '默认保存路径',
          keepIncompleteIn: '将未完成的种子保存在：',
          autoEnabled: '启用自动运行：',
          autorunProgram: '自动运行的程序',
          supportParamTitle: '支持的参数（大小写敏感）：',
          supportParamN: '%N: 种子名称',
          supportParamL: '%L: 分类',
          supportParamG: '%G: 标签（用逗号分隔）',
          supportParamF: '%F: 内容路径（多文件种子同根路径）',
          supportParamR: '%R: 根路径（首个种子子目录的路径）',
          supportParamD: '%D: 保存路径',
          supportParamC: '%C: 文件数量',
          supportParamZ: '%Z: 种子大小（单位为字节 byte）',
          supportParamT: '%T: 当前 tracker',
          supportParamI: '%I: 信息哈希值'
        }
      },
      pageConnection: {
        protocol: '对等连接协议',
        listeningSubHeader: '监听端口',
        useUPnP: '使用路由器的 UPnP/NAT-PMP 端口转发',
        incomingConnectionPort: '用于传入连接的端口',
        subHeader: '连接限制',
        globalMaxConnection: '全局最大连接数',
        perTorrentMaxConnection: '单个种子最大连接数',
        globalMaxUploadSlots: '全局最大上传数',
        perTorrentMaxUploadSlots: '单个种子最大上传数',
        proxySubHeader: '代理服务器',
        proxyPeerConnections: '使用代理服务器进行用户连接',
        proxyTorrentOnly: '只对 torrents 使用代理',
        proxyAuth: '认证'
      },
      pageBittorrent: {
        subHeaderPrivacy: '隐私',
        enableDHT: '启用 DHT（分散网络）寻找更多终端',
        enablePeX: '启用 PeX（对等交换）寻找更多终端',
        enableLPD: '启用 LPD（本地终端发现）寻找更多终端',
        enableAnonymous: '启用匿名模式',
        torrentQueue: '种子队列',
        maxActiveDownload: '最大活跃下载数',
        maxActiveUpload: '最大活跃上传数',
        maxActiveTorrent: '最大活跃种子数',
        excludeSlowTorrent: '不要在这些限制范围内计算慢速种子',
        downloadRateLimit: '下载速率限制为 KiB/s',
        uploadRateLimit: '上传速率限制为 KiB/s',
        torrentInactivityTimer: '种子不活跃计数器',
        subHeaderSeedLimits: '做种限制',
        whenRatioReaches: '当比率达到时',
        whenSeedingTimeReaches: '当做种时间达到时',
        maxRatioPauseTorrent: '暂停种子',
        maxRatioRemoveTorrent: '移除种子',
        maxRatioRemoveTorrentAndFiles: '移除种子和文件',
        maxRatioTorrentSuperseeding: '启用超级做种'
      },
      pageRss: {
        tabName: {
          general: '常规',
          feeds: '订阅源',
          rules: '规则'
        },
        pageRules: {
          rules: '规则',
          btnCreateNew: '创建规则'
        },
        pageFeeds: {
          feeds: '订阅源',
          btnCreateNew: '添加订阅'
        },
        pageGeneral: {
          rssAutoProcessing: 'RSS 阅读器',
          rssAutoDownloader: 'RSS Torrent 自动下载器',
          input: {
            enableRssAutoDownload: '启用 RSS Torrents 自动下载',
            enableRssProcessing: '启用获取 RSS 订阅',
            feedsRefreshInterval: '订阅源更新间隔',
            feedsMaxArticles: '每个订阅源文章数目最大值'
          }
        }
      },
      pageWebUI: {
        useAlternativeWebUI: '使用其他的网页界面',
        filesLocation: '文件路径',
        webUserInterface: '网页用户界面（远程控制）',
        ipAddress: 'IP 地址',
        port: '端口号',
        authentication: '认证',
        username: '用户名',
        password: '密码',
        maxAttempts: '最大尝试次数',
        banDuration: '禁用时长（秒）',
        sessionTimeout: '会话持续时间（秒）',
        bypassAuthenticationForClientsOnLocalhost: '绕过本地主机上客户端的身份验证',
        bypassAuthenticationForClientsInWhitelisted: '绕过白名单IP子网中客户端的身份验证',
        whiteListExample: '示例：172.17.32.0/24, fdff:ffff:c8::/40'
      },
      pageTagsAndCategories: {
        btnCreateNew: '新增',
        subHeaderTags: '可用标签：',
        subHeaderCategories: '可用分类：'
      }
    },
    shareLimit: {
      input: {
        globalLimit: '使用全局限制',
        unlimited: '无限制'
      },
      limitRatio: '做种限制',
      titleDuration: '做种时间',
      titleRatio: '分享率'
    },
    newCategory: {
      categoryName: '分类名称',
      Path: '路径',
      tipOnNoName: '分类名称是必须的',
      tipOnNoPath: '路径是必须的'
    },
    newTag: {
      createNewTag: '新建标签',
      tagName: '标签名称'
    },
    detail: {
      title: '种子详情',
      tabTitleInfo: '信息',
      tabTitleTrackers: 'Trackers',
      tabTitlePeers: '用户',
      tabTitleContent: '内容',
      tabTitleTagsCategories: '标签和分类',
      pageInfo: {
        pieceStates: '进度',
        torrentTitle: '种子标题',
        hash: '哈希值',
        ratio: '比率',
        downloadSpeed: '下载速度',
        uploadSpeed: '上传速度',
        eta: '剩余时间',
        peers: '用户',
        seeds: '上传',
        status: '状态',
        trackers: 'Trackers',
        createdBy: '创建者',
        firstLastPiecePriority: '首末块优先',
        sequentialDownload: '顺序下载',
        autoTMM: '自动种子管理',
        shareRatioLimit: '分享率限制',
        shareTimeLimit: '分享时间限制（分钟）',
        downloadLimit: '下载限制',
        uploadLimit: '上传限制'
      },
      pagePeers: {
        ip: 'IP',
        connection: '连接',
        flags: '标志',
        client: '客户端',
        progress: '进度',
        downloadSpeed: '下载速率',
        downloaded: '下载量',
        upSpeed: '上传速率',
        uploaded: '上传量',
        relevance: '关联',
        files: '文件'
      },
      pageTagsAndCategories: {
        subHeaderTag: '可用标签：',
        subHeaderCategories: '可用分类：'
      },
      pageTrackers: {
        url: '连接地址',
        status: '状态',
        peers: '用户',
        seeds: '做种',
        leeches: '下载',
        downloaded: '下载量',
        message: '消息'
      }
    },
    add: {
      title: '添加新的种子',
      selectFiles: '选择文件',
      urlHint: '每行一个链接',
      downloadDirectory: '下载目录',
      starttorrent: '添加后立即开始',
      skipHashCheck: '跳过哈希值检查',
      createSubfolder: '建立子目录',
      automaticTorrentManagement: '自动种子管理（ATM）',
      dropHereForAdd: '拖拽到此处即可添加',
      oneOrMoreFilesInvalidTorrent: '存在无效的种子文件'
    },
    changeLocation: {
      title: '更改位置'
    },
    rename: {
      title: '重命名',
      torrentName: '种子名称'
    },
    sort: {
      title: '种子排序',
      reverse: '逆序',
      sortBy: {
        availability: '可用性',
        category: '分类',
        completed: '已完成',
        downloaded: '下载量',
        ETA: '剩余时间',
        name: '名称',
        default: '无',
        last_activity: '最后活跃',
        peers: '用户',
        priority: '优先级',
        progress: '进度',
        ratio: '比率',
        save_path: '目录',
        size: '大小',
        state: '状态',
        uploaded: '上传量',
        addedOn: '添加时间',
        downloadSpeed: '下载速率',
        timeActive: '活跃时间',
        uploadSpeed: '上传速率'
      }
    },
    speedLimit: {
      speedLimit: '速率限制'
    },
    delete: {
      check: '同时从存储中删除'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: '登录成功！🎉',
    loginFailed: '登录失败…😕',
    settingsSaved: '设置保存成功！',
    categorySaved: '分类编辑成功！',
    feedSaved: '订阅源保存成功！',
    ruleSaved: '规则保存成功！'
  },

  /** RightClick **/
  rightClick: {
    resume: '继续',
    forceResume: '强制继续',
    advanced: {
      advanced: '高级',
      changeLocation: '修改保存位置',
      rename: '重命名',
      forceRecheck: '强制重新检查',
      forceReannounce: '强制重新汇报',
      sequentialDownload: '顺序下载',
      firstLastPriority: '首尾优先',
      automaticTorrentManagement: '自动种子管理（ATM）'
    },
    prio: {
      prio: '设置优先级',
      top: '最高',
      bottom: '最低',
      increase: '提升',
      decrease: '降低'
    },
    category: '设置分类',
    // tags: 'Set Tags',
    // notags: 'No Tags',
    limit: '设置限制',
    copy: '复制',
    info: '显示详情'
  }
}

export default locale
