const locale = {
  /** General */
  category: 'カテゴリー',
  settings: '設定',
  pause: '停止',
  delete: '削除',
  save: '保存',
  cancel: 'キャンセル',
  confirm: '確認',
  edit: '編集',
  createNew: '新規作成',
  path: 'Path',
  create: '作成',
  url: 'URL',
  directory: 'ディレクトリー',
  unknown: '不明',
  status: 'ステータス',
  all: 'All',
  downloading: 'ダウンロード中',
  seeding: 'シード中',
  completed: '完了',
  resumed: '再開',
  paused: '一時停止',
  active: '稼働中',
  inactive: '非稼働中',
  stalled: '停滞中',
  errored: 'エラー',
  login: 'ログイン',
  logout: 'ログアウト',
  downloaded: 'ダウンロード済み',
  uploaded: 'アップロード済み',
  upload: 'アップロード',
  download: 'ダウンロード',
  ETA: '残り時間',
  peers: 'ピア',
  ratio: '比率',
  seeds: 'シード',
  tags: 'タグ',
  // tracker: 'Tracker',
  share: 'Share',
  name: '名前',
  hash: 'ハッシュ値',
  magnet: 'Magnet',
  feed: 'フィード',
  rule: 'ルール',

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
    title: 'タイトル',
    added: '追加日時',
    availability: '可用性',
    size: 'サイズ',
    progress: '進捗状況',
    directory: 'ディレクトリー',
    downloaded: 'ダウン量',
    uploaded: 'アップ量',
    created: '作成',
    comments: 'コメント',
    uploadedSession: 'アップロードセッション'
    // timeActive: 'Time Active',
    // seededFor: 'Seeded For',
    // last_activity: 'Last Activity'
  },
  /** Navbar */
  navbar: {
    currentSpeed: '速度',
    // alltimeTitle: 'All-Time Stats',
    // sessionTitle: 'Session Stats',
    freeSpace: '空き容量',
    topActions: {
      addTorrent: 'Torrentを追加',
      resumeSelected: 'Torrentの再開',
      pauseSelected: 'Torrentの一時停止',
      removeSelected: 'Torrentの削除',
      openSettings: '設定',
      searchNew: 'Torrentの検索エンジン'
    },
    sessionStats: {
      tooltip: '最後の再起動からの時間'
    },
    filters: {
      stalled_uploading: '停滞中アップロード',
      stalled_downloading: '停滞中ダウンロード'
      // uncategorized: 'Uncategorized',
      // untagged: 'Untagged',
      // not_working: 'Not Working'
    },
    action: {
      altSpeed: '代替速度制限',
      dark: 'ダークモード',
      light: 'ライトモード'
    }
  },

  /** Modals */
  modals: {
    newFeed: {
      feedName: 'フィード名',
      url: 'URL'
    },
    newRule: {
      titleCreate: 'Create new rule',
      titleEdit: 'Edit rule',
      name: 'ルール名',
      def: {
        mustContain: '必要',
        affectedFeeds: 'フィードにルールを適用'
      }
    },
    pluginManager: {
      title: 'プラグインマネージャー'
    },
    search: {
      title: '検索',
      btnStartSearch: '検索',
      btnStopSearch: '停止',
      columnTitle: {
        name: '名前',
        size: 'サイズ',
        seeds: 'シード',
        peers: 'ピア',
        search_engine: '検索エンジン',
        action: 'Action'
      }
    },
    settings: {
      tabName: {
        VueTorrent: 'vueTorrent',
        downloads: 'ダウンロード',
        connection: '接続',
        bittorrent: 'bitTorrent',
        rss: 'Rss',
        webUI: 'WEB UI',
        tagsAndCategories: 'タグ と カテゴリ'
      },
      pageVueTorrent: {
        tabName: {
          general: '一般',
          dashboard: 'ダッシュボード'
        },
        pageGeneral: {
          tip: 'これらの設定は、このカスタム WebUI に対するものです',
          currentSpeed: '現在の速度を表示する',
          speedGraph: '速度グラフを表示する',
          sessionStats: 'セッションの状態を表示する',
          allTimeStats: '今までの統計を表示する',
          freeSpace: '空き容量を表示する',
          trackerFilter: 'トラッカーフィルターを表示する',
          rightDrawer: 'メニューを右側に表示する',
          // topPagination: 'Top Pagination',
          language: '言語:',
          paginationSize: '1ページの表示数:',
          vueTorrentTitle: 'ページタイトル:',
          // dateFormat: 'Date Format',
          // openSideBarOnStart: 'Open Side Bar on launch',
          currentVersion: '現在のバージョン:',
          qbittorrentVersion: 'QBittorrentのバージョン:'
        },
        pageDashboard: {
          busyTorrentTip: '稼働中のTorrentに表示されるプロパティ',
          completedTorrentTip: '完了したTorrentに表示されるプロパティ',
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
        subHeaderWhenAddTorrent: 'Torrentを追加したとき',
        whenAddTorrent: {
          createSubFolder: '複数のファイルが有るときはサブフォルダーを作成する',
          donotAutoStart: '自動でダウンロードを開始しない'
        },
        subHeaderPublicSettings: '全体の設定',
        publicSettings: {
          preAllocateDisk: 'すべてのファイルに対して事前にディスクスペースを割り当てる',
          appendQBExtension: '未完了のファイル名に .!qB をつける'
        },
        subHeaderSaveManagement: '保存管理',
        saveManagement: {
          autoManagement: '自動Torrent管理',
          relocate: 'カテゴリが変更されたときにTorrentを移動させる',
          defaultSavePath: 'デフォルトの保存パス',
          keepIncompleteIn: '未完了のTorrentの保存先:',
          // autoEnabled_onAdded: 'Run external program on torrent added:',
          // autoLabel_onAdded: 'Command',
          autoEnabled_onFinished: '自動プログラム実行:',
          autoLabel_onFinished: 'プログラム自動実行',
          supportParamTitle: 'サポートしているパラメーター (大文字小文字を区別):',
          supportParamN: '%N: Torrentの名前',
          supportParamL: '%L: カテゴリ',
          supportParamG: '%G: タグ (コンマ区切り)',
          supportParamF: '%F: コンテンツのパス (Torrent内のファイルのルート)',
          supportParamR: '%R: ルートパス (トレントの最初のサブフォルダのパス)',
          supportParamD: '%D: 保存したパス',
          supportParamC: '%C: ファイル数',
          supportParamZ: '%Z: Torrentのサイズ (bytes)',
          supportParamT: '%T: 現在のトラッカー',
          supportParamI: '%I: info ハッシュ'
        }
      },
      pageConnection: {
        // protocol: 'Peer connection protocol',
        // listeningSubHeader: 'Listening Port',
        // useUPnP: 'Use UPnP / NAT-PMP port forwarding from my router',
        // incomingConnectionPort: 'Port used for incoming connections',
        subHeader: '接続制限',
        globalMaxConnection: '全体の最大接続数',
        perTorrentMaxConnection: 'Torrentあたりの最大接続数',
        globalMaxUploadSlots: '全体の最大アップロードスロット数',
        perTorrentMaxUploadSlots: 'Torrentあたりの最大アップロードスロット数',
        proxySubHeader: 'プロキシサーバー',
        proxyPeerConnections: 'ピアへの接続にプロキシを使う',
        proxyTorrentOnly: 'Torrentに対してのみプロキシを使う',
        proxyAuth: '認証'
      },
      pageBittorrent: {
        subHeaderPrivacy: 'プライバシー',
        enableDHT: 'より多くのピアを見つけるために DHT (分散ネットワーク) を有効にする',
        enablePeX: 'より多くのピアを見つけるために ピア交換 (PeX) を有効にする',
        enableLPD: 'より多くのピアを見つけるために ローカルピア検出 (LSD) を有効にする',
        enableAnonymous: '匿名モードを有効にする',
        torrentQueue: 'Torrentキュー',
        maxActiveDownload: '最大稼働ダウンロード数数',
        maxActiveUpload: '最大稼働アップロード数',
        maxActiveTorrent: '最大稼働Torrent数',
        excludeSlowTorrent: '遅いTorrentをカウントしない',
        downloadRateLimit: 'ダウンロード速度しきい値 KiB/s',
        uploadRateLimit: 'アップロード速度しきい値 KiB/s',
        torrentInactivityTimer: 'Torrent未稼働時間',
        subHeaderSeedLimits: 'シードの制限',
        whenRatioReaches: 'シード制限する共有比',
        whenSeedingTimeReaches: 'シード制限するシード時間 (分)'
        // maxRatioPauseTorrent: 'Pause torrent',
        // maxRatioRemoveTorrent: 'Remove torrent',
        // maxRatioRemoveTorrentAndFiles: 'Remove torrent and files',
        // maxRatioTorrentSuperseeding: 'Enable torrent super seeding'
      },
      pageRss: {
        tabName: {
          general: '一般',
          feeds: 'フィード',
          rules: 'ルール'
        },
        pageRules: {
          rules: 'ルール',
          btnCreateNew: 'ルールを作成'
        },
        pageFeeds: {
          feeds: 'フィード',
          btnCreateNew: 'フィードを追加'
        },
        pageGeneral: {
          rssAutoProcessing: 'RSSリーダー',
          rssAutoDownloader: 'RSS Torrent自動ダウンロード',
          input: {
            enableRssAutoDownload: 'RSS Torrentの自動ダウンロードを有効にする',
            enableRssProcessing: 'フィードの更新を有効にする',
            feedsRefreshInterval: 'フィードの更新間隔',
            feedsMaxArticles: 'フィードごとの記事数上限'
          }
        }
      },
      pageWebUI: {
        useAlternativeWebUI: 'カスタム WebUI を使用する',
        filesLocation: 'ファイルの場所',
        webUserInterface: 'ウェブユーザーインターフェース (遠隔操作)',
        ipAddress: 'IP アドレス:',
        port: 'ポート',
        authentication: '認証',
        username: 'ユーザー名',
        password: 'パスワード',
        maxAttempts: '最大試行回数',
        banDuration: 'アクセス禁止期間 (秒)',
        sessionTimeout: 'セッションタイムアウト (秒)',
        bypassAuthenticationForClientsOnLocalhost: 'ローカルホストではクライアントの認証を行わない',
        bypassAuthenticationForClientsInWhitelisted: 'ホワイトリストに登録された IP サブネットのクライアントは認証を行わない',
        whiteListExample: '例: 172.17.32.0/24, fdff:ffff:c8::/40'
      },
      pageTagsAndCategories: {
        btnCreateNew: '作成',
        subHeaderTags: '利用可能なタグ:',
        subHeaderCategories: '利用可能なカテゴリ:'
      }
    },
    shareLimit: {
      input: {
        globalLimit: '全体制限を使う',
        unlimited: '無制限'
      },
      limitRatio: '比率制限',
      titleDuration: '間隔',
      titleRatio: '比率'
    },
    newCategory: {
      categoryName: 'カテゴリ名',
      Path: 'パス',
      tipOnNoName: 'カテゴリ名が必要です',
      tipOnNoPath: 'パスが必要です'
    },
    newTag: {
      createNewTag: 'タグを作成',
      tagName: 'タグの名前'
    },
    detail: {
      title: 'Torrentの詳細',
      tabTitleInfo: '情報',
      tabTitleTrackers: 'トラッカー',
      tabTitlePeers: 'ピア',
      tabTitleContent: 'コンテンツ',
      tabTitleTagsCategories: 'タグ と カテゴリ',
      pageInfo: {
        pieceStates: '進捗',
        torrentTitle: 'Torrentのタイトル',
        hash: 'ハッシュ値',
        ratio: '比率',
        downloadSpeed: 'ダウン速度',
        uploadSpeed: 'アップ速度',
        eta: '残り時間',
        peers: 'ピア',
        seeds: 'シード',
        status: 'ステータス',
        trackers: 'トラッカー',
        createdBy: '作成者',
        firstLastPiecePriority: '最初と最後のデータを先に取得',
        sequentialDownload: '読み取り順にダウンロード',
        autoTMM: '自動Torrent管理',
        shareRatioLimit: '共有比率制限',
        shareTimeLimit: '共有時間制限 (分)',
        downloadLimit: 'ダウンロード制限',
        uploadLimit: 'アップロード制限'
      },
      pagePeers: {
        ip: 'IP',
        connection: '接続',
        flags: 'フラグ',
        client: 'クライアント',
        progress: '進捗',
        downloadSpeed: 'ダウンロード速度',
        downloaded: 'ダウンロード済み',
        upSpeed: 'アップロード速度',
        uploaded: 'アップロード済み',
        relevance: '関連',
        files: 'ファイル'
      },
      pageTagsAndCategories: {
        subHeaderTag: '利用可能タグ:',
        subHeaderCategories: '利用可能タグ:'
      },
      pageTrackers: {
        url: 'URL',
        status: 'ステータス',
        peers: 'ピア',
        seeds: 'シード',
        leeches: 'リーチャー',
        downloaded: 'ダウンロード済み',
        message: 'メッセージ'
      }
    },
    add: {
      title: 'Torrentの追加',
      selectFiles: 'ファイルの選択',
      urlHint: 'リンクは一行に一つずつ',
      downloadDirectory: 'ダウンロード先',
      starttorrent: 'Torrentを開始',
      skipHashCheck: 'ハッシュ値確認をしない',
      createSubfolder: 'サブフォルダ作成',
      automaticTorrentManagement: '自動Torrent管理',
      dropHereForAdd: 'ドロップして追加',
      oneOrMoreFilesInvalidTorrent: '一つまたは複数の無効なTorrentファイルが含まれています'
    },
    changeLocation: {
      title: '場所を変更'
    },
    rename: {
      title: '名前を変更',
      torrentName: 'Torrent名'
    },
    sort: {
      title: '並び替え',
      reverse: '反転',
      sortBy: {
        availability: '可用性',
        category: 'カテゴリ',
        completed: '完了',
        downloaded: 'ダウンロード済み',
        ETA: '残り時間',
        name: '名前',
        // default: 'Default',
        // last_activity: 'Last Activity',
        peers: 'ピア',
        priority: '優先度',
        progress: '進捗',
        ratio: '比率',
        // save_path: 'Directory',
        size: '大きさ',
        state: '状態',
        uploaded: 'アップロード済み',
        addedOn: '追加順',
        downloadSpeed: 'ダウンロード速度',
        timeActive: '稼働時間',
        uploadSpeed: 'アップロード速度'
      }
    },
    speedLimit: {
      speedLimit: '速度制限'
    },
    delete: {
      check: 'ファイルを削除'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: 'ログインに成功しました! 🎉',
    loginFailed: 'ログインに失敗しました 😕',
    settingsSaved: '設定の保存に成功しました!',
    categorySaved: 'カテゴリーの編集に成功しました!',
    feedSaved: 'フィードの編集に成功しました!',
    ruleSaved: 'ルールの編集に成功しました!'
    // renameFileFailed: 'Unable to rename file',
    // renameFolderFailed: 'Unable to rename file'
  },

  /** RightClick **/
  rightClick: {
    resume: '再開',
    forceResume: '強制再開',
    advanced: {
      advanced: '高度',
      changeLocation: '場所を設定',
      rename: '名前を変更',
      forceRecheck: '強制再チェック',
      forceReannounce: '強制再アナウンス',
      sequentialDownload: '読み取り順にダウンロード',
      firstLastPriority: '最初と最後のデータを先に取得',
      automaticTorrentManagement: '自動Torrent管理'
    },
    prio: {
      prio: '優先度を設定',
      top: '一番上へ',
      bottom: '一番下へ',
      increase: '上へ',
      decrease: '下へ'
    },
    category: 'カテゴリーを設定',
    // tags: 'Set Tags',
    // notags: 'No Tags',
    limit: '制限を設定',
    copy: 'コピー',
    info: '情報'
  }
}

export default locale
