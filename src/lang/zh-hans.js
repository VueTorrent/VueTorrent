const locale = {
  /** General */
  category: '分类',
  settings: '设置',
  pause: '暂停',
  delete: '删除',
  save: '保存',
  cancel: '取消',
  confirm: '确认',

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
    comments: '注释'
  },
  /** Navbar */
  navbar: {
    currentSpeed: '当前速率',
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
    }
  },

  /** Modals */
  modals: {
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
        peers: '下载',
        search_engine: '搜索引擎',
        action: '操作'
      }
    },
    settings: {
      tabName: {
        VueTorrent: 'VueTorrent',
        downloads: '下载',
        connection: '连接',
        bittorrent: 'bittorrent',
        webUI: '网页界面',
        tagsAndCategories: '标签和分类'
      },
      pageVueTorrent: {
        tabName: {
          general: '常规',
          dashboard: '面板'
        },
        pageGeneral: {
          tip: '这些设置适用于自定义WebUI本身',
          currentSpeed: '显示当前速度',
          speedGraph: '显示速度图形化',
          sessionStats: '显示会话状态',
          allTimeStats: '显示历史状态',
          freeSpace: '显示剩余空间',
          trackerFilter: '显示 Tracker 过滤',
          rightDrawer: '侧边栏居右显示',
          language: '语言',
          paginationSize: '每页展示数量',
          vueTorrentTitle: 'VueTorrent 标题',
          currentVersion: '当前版本',
          qbittorrentVersion: 'QBittorrent 版本'
        },
        pageDashboard: {
          busyTorrentTip: '未完成的种子要显示的属性',
          completedTorrentTip: '已完成的种子要显示的属性'
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
        subHeader: '连接限制',
        globalMaxConnection: '全局最大连接数',
        perTorrentMaxConnection: '单个种子最大连接数',
        globalMaxUploadSlots: '全局最大上传数',
        perTorrentMaxUploadSlots: '单个种子最大上传数'
      },
      pageBittorrent: {
        subHeaderPrivacy: '隐私',
        enableDHT: '启用 DHT（分散网络）寻找更多终端',
        enablePeX: '启用 PeX （对等交换）寻找更多终端',
        enableLPD: '启用 LPD （本地终端发现）寻找更多终端',
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
        whenSeedingTimeReaches: '当做种时间达到时'
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
    add: {
      title: '添加新的种子',
      selectFiles: '选择文件'
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
    categorySaved: '分类编辑成功！'
  },

  /** RightClick **/
  rightClick: {
    resume: '继续',
    forceResume: '强制继续',
    advanced: {
      advanced: '高级',
      changeLocation: '修改保存位置',
      rename: '重命名'
    },
    prio: {
      prio: '设置优先级',
      top: '最高',
      bottom: '最低',
      increase: '提升',
      decrease: '降低'
    },
    category: '设置分类',
    limit: '设置限制',
    copy: '复制…',
    info: '显示详情'
  }
}

export default locale
