const locale = {
  /** General */
  category: 'Категория',
  settings: 'Настройки',
  pause: 'Пауза',
  delete: 'Удалить',
  save: 'Сохранить',
  cancel: 'Отменить',
  confirm: 'Подтвердить',
  edit: 'Редактировать',
  createNew: 'Создать новый',
  path: 'Путь',
  create: 'Создать',
  url: 'URL',
  directory: 'Каталог',
  unknown: 'Неизвестный',
  status: 'Статус',
  all: 'Все',
  downloading: 'Скачивание',
  seeding: 'Раздача',
  completed: 'Завершено',
  resumed: 'Возобновлено',
  paused: 'Приостановлено',
  active: 'Активный',
  inactive: 'Неактивный',
  stalled: 'Застопорился',
  errored: 'Ошибочный',
  login: 'Войти',
  logout: 'Выйти',
  download: 'Скачивание',
  downloaded: 'Скачано',
  upload: 'Отдача',
  uploaded: 'Загружено',
  ETA: 'ETA',
  peers: 'Пиры',
  ratio: 'Ратио',
  seeds: 'Сиды',
  tags: 'Теги',
  // tracker: 'Tracker',
  share: 'Поделиться',
  name: 'Имя',
  hash: 'Хэш',
  magnet: 'Магнет-ссылка',
  feed: 'Канал',
  rule: 'Правило',
  // then: 'Then',

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
    title: 'Заголовок',
    added: 'Добавлено',
    availability: 'Доступность',
    size: 'Размер',
    progress: 'Прогресс',
    directory: 'Каталог',
    downloaded: 'Скачано',
    uploaded: 'Загружено',
    created: 'Создано',
    comments: 'Комментарии',
    uploadedSession: 'Загружено за сессию'
    // timeActive: 'Time Active',
    // seededFor: 'Seeded For',
    // last_activity: 'Last Activity'
  },
  /** Navbar */
  navbar: {
    currentSpeed: 'Текущая скорость',
    // alltimeTitle: 'All-Time Stats',
    // sessionTitle: 'Session Stats',
    freeSpace: 'Свободное место',
    topActions: {
      addTorrent: 'Добавить торрент',
      resumeSelected: 'Восстановить выбранные торренты',
      pauseSelected: 'Приостановить выбранные торренты',
      removeSelected: 'Удалить выбранные торрент',
      openSettings: 'Открыть настройки',
      searchNew: 'Искать новый торрент'
    },
    sessionStats: {
      tooltip: 'С момента последнего перезапуска qBittorrent'
    },
    filters: {
      stalled_uploading: 'Остановка раздачи',
      stalled_downloading: 'Остановка скачивания'
      // uncategorized: 'Uncategorized',
      // untagged: 'Untagged',
      // not_working: 'Not Working'
    },
    action: {
      altSpeed: 'Альтернативные скорости',
      dark: 'Темный',
      light: 'Светлый'
    }
  },

  /** Modals */
  modals: {
    newFeed: {
      feedName: 'Имя',
      url: 'URL'
    },
    newRule: {
      // titleCreate: 'Create new rule',
      // titleEdit: 'Edit rule',
      name: 'Имя',
      def: {
        mustContain: 'Должен содержать',
        affectedFeeds: 'Применить правило к каналам'
      }
    },
    pluginManager: {
      title: 'Менеджер плагинов'
    },
    search: {
      title: 'Поиск',
      btnStartSearch: 'Найти',
      btnStopSearch: 'Остановить',
      columnTitle: {
        name: 'Имя',
        size: 'Размер',
        seeds: 'Сиды',
        peers: 'Пиры',
        search_engine: 'Поисковый движок',
        action: 'Действия'
      }
    },
    settings: {
      tabName: {
        VueTorrent: 'vuetorrent',
        downloads: 'Отдача',
        connection: 'Соединение',
        bittorrent: 'Bittorrent',
        rss: 'RSS',
        webUI: 'Веб-интерфейс',
        tagsAndCategories: 'Теги и категории'
      },
      pageVueTorrent: {
        tabName: {
          general: 'Общее',
          dashboard: 'Панель'
        },
        pageGeneral: {
          tip: 'Эти настройки предназначены для пользовательского веб-интерфейса',
          currentSpeed: 'Отображать текущую скорость',
          speedGraph: 'Отображать график скорости',
          sessionStats: 'Отображать статистику сессии',
          allTimeStats: 'Отображать всю статистику',
          freeSpace: 'Отображать свободное место',
          trackerFilter: 'Отображать фильтр трекеров',
          rightDrawer: 'Панель справа',
          // topPagination: 'Top Pagination',
          language: 'Язык:',
          paginationSize: 'Размер страницы:',
          vueTorrentTitle: 'Заголовок VueTorrent:',
          // dateFormat: 'Date Format',
          // openSideBarOnStart: 'Open Side Bar on launch',
          currentVersion: 'Текущая версия',
          qbittorrentVersion: 'Версия QBittorrent:'
        },
        pageDashboard: {
          busyTorrentTip: 'Свойства для отображения занятых торрентов',
          completedTorrentTip: 'Свойства для отображения завершенных торрентов',
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
        subHeaderWhenAddTorrent: 'Когда добавляется торрент',
        whenAddTorrent: {
          createSubFolder: 'Создать подкаталог для торрентов с несколькими файлами',
          donotAutoStart: 'Не запускать раздачу автоматически'
        },
        subHeaderPublicSettings: 'Общие настройки',
        publicSettings: {
          preAllocateDisk: 'Предварительно выделить место на диске для всех файлов',
          appendQBExtension: 'Добавить расширение .!qB к неполным файлам'
        },
        subHeaderSaveManagement: 'Управление сохранением',
        saveManagement: {
          autoManagement: 'Автоматическое управление торрентами',
          relocate: 'Перемещение торрента при изменении категории',
          defaultSavePath: 'Путь сохранения по умолчанию',
          keepIncompleteIn: 'Хранить не завершенные торренты в:',
          autoEnabled: 'Автозапуск включен:',
          autorunProgram: 'Программа автозапуска',
          supportParamTitle: 'Поддерживаемые параметры (с учетом регистра):',
          supportParamN: '%N: Имя торрента',
          supportParamL: '%L: Категория',
          supportParamG: '% G: Теги (разделенные запятой)',
          supportParamF: '% F: Путь к содержимому (такой же как корневой путь для многофайлового торрента)',
          supportParamR: '%R: Корневой путь (путь первого подкаталога торрента)',
          supportParamD: '%D: Путь сохранения',
          supportParamC: '%C: Количество файлов',
          supportParamZ: '%Z: Размер торрента (байты)',
          supportParamT: '%T: Текущий трекер',
          supportParamI: '%I: Хэш информации'
        }
      },
      pageConnection: {
        // protocol: 'Peer connection protocol',
        // listeningSubHeader: 'Listening Port',
        // useUPnP: 'Use UPnP / NAT-PMP port forwarding from my router',
        // incomingConnectionPort: 'Port used for incoming connections',
        subHeader: 'Ограничение соединений',
        globalMaxConnection: 'Глобальное максимальное количество соединений',
        perTorrentMaxConnection: 'Максимальное количество соединений на торрент',
        globalMaxUploadSlots: 'Глобальное максимальное количество слотов для раздачи',
        perTorrentMaxUploadSlots: 'Максимальное количество слотов для раздачи на торрент',
        proxySubHeader: 'Прокси сервер',
        proxyPeerConnections: 'Использовать прокси для одноранговых (пир) соединений',
        proxyTorrentOnly: 'Использовать прокси только для торрентов',
        proxyAuth: 'Аутентификация'
      },
      pageBittorrent: {
        subHeaderPrivacy: 'Конфиденциальность',
        enableDHT: 'Включить DHT (децентрализованную сеть), чтобы найти больше одноранговых устройств (пиров)',
        enablePeX: 'Включить Peer Exchange (PeX), чтобы найти больше одноранговых устройств (пиров)',
        enableLPD: 'Включить локальное обнаружение одноранговых устройств, чтобы найти больше одноранговых устройств (пиров)',
        enableAnonymous: 'Включить анонимный режим',
        torrentQueue: 'Очередь торрентов',
        maxActiveDownload: 'Максимальное количество активных скачиваний',
        maxActiveUpload: 'Максимальное количество активных отдач',
        maxActiveTorrent: 'Максимальное количество активных торрентов',
        excludeSlowTorrent: 'Не учитывать медленные торренты в этих пределах',
        downloadRateLimit: 'Пороговое значение скорости скачивания Киб/с',
        uploadRateLimit: 'Порог скорости отдачи Киб/с',
        torrentInactivityTimer: 'Таймер неактивности торрента',
        subHeaderSeedLimits: 'Ограничение раздачи',
        whenRatioReaches: 'По достижении рейтинга раздачи',
        whenSeedingTimeReaches: 'По достижении времени раздачи'
        // maxRatioPauseTorrent: 'Pause torrent',
        // maxRatioRemoveTorrent: 'Remove torrent',
        // maxRatioRemoveTorrentAndFiles: 'Remove torrent and files',
        // maxRatioTorrentSuperseeding: 'Enable torrent super seeding'
      },
      pageRss: {
        tabName: {
          general: 'Общие',
          feeds: 'Каналы',
          rules: 'Правила'
        },
        pageRules: {
          rules: 'Правила',
          btnCreateNew: 'Создать правило'
        },
        pageFeeds: {
          feeds: 'Каналы',
          btnCreateNew: 'Добавить ленту'
        },
        pageGeneral: {
          rssAutoProcessing: 'Чтение RSS',
          rssAutoDownloader: 'Автозагрузчик Торрентов RSS',
          input: {
            enableRssAutoDownload: 'Включить автоматическую загрузку торрентов через RSS',
            enableRssProcessing: 'Включить получение RSS-каналов',
            feedsRefreshInterval: 'Интервал обновления каналов',
            feedsMaxArticles: 'Максимальное количество статей в ленте'
          }
        }
      },
      pageWebUI: {
        useAlternativeWebUI: 'Использовать альтернативный веб-интерфейс',
        filesLocation: 'Расположение файла',
        webUserInterface: 'Веб-интерфейс (удаленное управление)',
        ipAddress: 'IP-адрес',
        port: 'Порт',
        authentication: 'Авторизация',
        username: 'Имя пользователя',
        password: 'Пароль',
        maxAttempts: 'Максимальное количество попыток',
        banDuration: 'Продолжительность блокировки (секунды)',
        sessionTimeout: 'Время ожидания сеанса (секунды)',
        bypassAuthenticationForClientsOnLocalhost: 'Пропустить аутентификацию для клиентов на локальном хосте',
        bypassAuthenticationForClientsInWhitelisted: 'Пропустить аутентификацию для клиентов в подсетях IP из белого списка',
        whiteListExample: 'Пример: 172.17.32.0/24, fdff:ffff:c8::/40'
      },
      pageTagsAndCategories: {
        btnCreateNew: 'Создать категорию',
        subHeaderTags: 'Доступные теги:',
        subHeaderCategories: 'Доступные категории:'
      }
    },
    shareLimit: {
      input: {
        globalLimit: 'Использовать глобальный лимит',
        unlimited: 'Неограниченно'
      },
      limitRatio: 'Ограничение рейтинга',
      titleDuration: 'Продолжительность',
      titleRatio: 'Рейтинг'
    },
    newCategory: {
      categoryName: 'Название категории',
      Path: 'Путь',
      tipOnNoName: 'Требуется название категории',
      tipOnNoPath: 'Нужный путь'
    },
    newTag: {
      createNewTag: 'Создать новый тег',
      tagName: 'тег'
    },
    detail: {
      title: 'Детали',
      tabTitleInfo: 'Информация',
      tabTitleTrackers: 'Трекеры',
      tabTitlePeers: 'Пиры',
      tabTitleContent: 'Файлы',
      tabTitleTagsCategories: 'Теги и категории',
      pageInfo: {
        pieceStates: 'Прогресс',
        torrentTitle: 'Название',
        hash: 'хэш',
        ratio: 'Рейтинг',
        downloadSpeed: 'Скорость скачивания',
        uploadSpeed: 'Скорость раздачи',
        eta: 'ETA',
        peers: 'Пиры',
        seeds: 'Сиды',
        status: 'Состояние',
        trackers: 'Трекеры',
        createdBy: 'Создано',
        firstLastPiecePriority: 'Приоритет первой/последней части',
        sequentialDownload: 'Последовательное скачивание',
        autoTMM: 'Авто TMM',
        shareRatioLimit: 'Лимит по рейтингу',
        shareTimeLimit: 'Лимит времени раздачи (минуты)',
        downloadLimit: 'Лимит скачивания',
        uploadLimit: 'Лимит отдачи'
      },
      pagePeers: {
        ip: 'IP',
        connection: 'Соединение',
        flags: 'Флаги',
        client: 'Клиент',
        progress: 'Прогресс',
        downloadSpeed: 'Скорость скачивания',
        downloaded: 'Загружено',
        upSpeed: 'Скорость отдачи',
        uploaded: 'Отдано',
        relevance: 'Актуальность',
        files: 'Файлы'
      },
      pageTagsAndCategories: {
        subHeaderTag: 'Доступные таги:',
        subHeaderCategories: 'Доступные категории:'
      },
      pageTrackers: {
        url: 'URL',
        status: 'Статус',
        peers: 'Пиры',
        seeds: 'Сиды',
        leeches: 'Личи',
        downloaded: 'Скачано',
        message: 'Сообщение'
      }
    },
    add: {
      title: 'Добавить новый торрент',
      selectFiles: 'Выберите файл',
      urlHint: 'Одна ссылка на строку',
      downloadDirectory: 'Скачать папку',
      starttorrent: 'Запустить торрент',
      skipHashCheck: 'Пропустить проверку хэша',
      createSubfolder: 'Создать подпапку',
      automaticTorrentManagement: 'Автоматическое управление торрентами',
      dropHereForAdd: 'Перетащить сюда для добавления',
      oneOrMoreFilesInvalidTorrent: 'Один или несколько файлов не являются действительным торрентом'
    },
    changeLocation: {
      title: 'Изменить местоположение',
      torrentName: 'Название торрента'
    },
    rename: {
      title: 'Переименовать',
      torrentName: 'Название'
    },
    sort: {
      title: 'Сортировать торренты',
      reverse: 'Обратный порядок',
      sortBy: {
        availability: 'Доступность',
        category: 'Категория',
        completed: 'Завершено',
        downloaded: 'Загружено',
        ETA: 'ETA',
        name: 'Имя',
        // default: 'Default',
        // last_activity: 'Last Activity',
        peers: 'Пиры',
        priority: 'Приоритет',
        progress: 'Прогресс',
        ratio: 'Ратио',
        // save_path: 'Directory',
        size: 'Размер',
        state: 'Состояние',
        uploaded: 'Отдано',
        addedOn: 'Добавлено',
        downloadSpeed: 'Скорость загрузки',
        timeActive: 'Активен',
        uploadSpeed: 'Скорость отдачи'
      }
    },
    speedLimit: {
      speedLimit: 'Ограничение скорости'
    },
    delete: {
      check: 'Удалить файлы из хранилища'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: 'Успешный вход! 🎉',
    loginFailed: 'Ошибка входа 😕',
    settingsSaved: 'Настройки успешно сохранены!',
    categorySaved: 'Категория успешно отредактирована!',
    feedSaved: 'Канал успешно сохранен!',
    ruleSaved: 'Правила сохранены!'
  },

  /** RightClick **/
  rightClick: {
    resume: 'Возобновить',
    forceResume: 'Принудительное возобновление',
    advanced: {
      advanced: 'Расширенные',
      changeLocation: 'Изменить расположение',
      rename: 'Переименовать',
      forceRecheck: 'Принудительная проверка',
      forceReannounce: 'Принудительно анонсировать',
      sequentialDownload: 'Последовательное скачивание',
      firstLastPriority: 'Первый/последний приоритет',
      automaticTorrentManagement: 'Автоматическое управление торрентами'
    },
    prio: {
      prio: 'Установить приоритет',
      top: 'Максимальный',
      bottom: 'Минимальный',
      increase: 'Увеличить',
      decrease: 'Уменьшить'
    },
    category: 'Задать категорию',
    // tags: 'Set Tags',
    // notags: 'No Tags',
    limit: 'Задать лимит',
    copy: 'Копировать',
    info: 'Детали'
  }
}

export default locale
