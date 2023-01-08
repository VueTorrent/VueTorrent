const locale = {
  /** General */
  category: 'Категорії',
  settings: 'налаштування',
  pause: 'пауза',
  delete: 'видалити',
  save: 'зберегти',
  cancel: 'відмінити',
  confirm: 'підтвердити',
  edit: 'Редагувати',
  createNew: 'Створити новий',
  path: 'Шлях',
  create: 'Створити',
  url: 'URL',
  directory: 'Тека',
  unknown: 'невідомий',
  status: 'Стан',
  all: 'Все',
  downloading: 'Завантажуються',
  seeding: 'Роздаються',
  completed: 'Виконані',
  resumed: 'Поновлені',
  paused: 'Призупинені',
  active: 'Активні',
  inactive: 'Неактивні',
  stalled: 'Залипли',
  errored: 'З помилками',
  login: 'Увійти',
  logout: 'Вийти',
  downloaded: 'Завантажено',
  uploaded: 'Вивантажено',
  upload: 'Вивантаження',
  download: 'Завантаження',
  ETA: 'ОЧЗ',
  peers: 'Піри',
  ratio: 'Співвідношення',
  seeds: 'Сіди',
  tags: 'Теги',
  // tracker: 'Tracker',
  share: 'Поділитися',
  name: "Ім'я",
  hash: 'Хеш',
  magnet: 'Магнет',
  feed: 'стрічка',
  rule: 'правило',
  then: 'тоді',
  of: 'з',

  /** Dashboard */
  dashboard: {
    tooltips: {
      toggleSearch: 'Увімкнути фільтр пошуку',
      toggleSelect: 'Перемкнути режим вибору',
      toggleSort: 'Сортувати торренти',
      selectAll: 'Вибрати все',
      selectAllCaption: 'Вибрати / Скинути все (Ctrl + A)'
    },
    emptyTorrentList: 'Тут нічого нема! Спробуй додати торрент!'
  },
  /** Torrent */
  torrent: {
    title: 'заголовок',
    added: 'додано о:',
    availability: 'доступність',
    size: 'розмір',
    progress: 'прогрес',
    directory: 'тека',
    downloaded: 'завантажено',
    uploaded: 'Вивантажено',
    created: 'створено',
    comments: 'примітки',
    uploadedSession: 'Завантажено за сесію',
    timeActive: 'Часу активно ',
    seededFor: 'роздано для',
    last_activity: 'остання активність',
    completed_on: 'Виконано о'
  },
  /** Navbar */
  navbar: {
    currentSpeed: 'поточна швидкість',
    alltimeTitle: 'Статистика за весь час',
    sessionTitle: 'Статистика сесії',
    freeSpace: 'вільне місце',
    topActions: {
      addTorrent: 'додати торрент',
      resumeSelected: 'відновити вибрані торенти',
      pauseSelected: 'призупинити вибрані торенти',
      removeSelected: 'видалити вибрані торенти',
      openSettings: 'відкрити налаштування',
      searchNew: 'шукати нові торенти'
    },
    sessionStats: {
      tooltip: 'З моменту останнього перезапуску qBittorrent'
    },
    filters: {
      stalled_uploading: 'Залиплі вивантаження',
      stalled_downloading: 'Залиплі завантаження'
      uncategorized: 'Без категорій',
      untagged: 'Без міток',
      not_working: 'Не працюють'
    },
    action: {
      altSpeed: 'Обмеження швидкості',
      dark: 'Темна',
      light: 'Світла'
    },
    torrentsCount: 'Немає торрентів | {n} торрент | {n} торрентів'
  },

  /** Modals */
  modals: {
    newFeed: {
      feedName: "Ім'я",
      url: 'URL'
    },
    newRule: {
      titleCreate: 'Створити нове правило',
      titleEdit: 'Редагувати правило',
      name: "Ім'я",
      def: {
        mustContain: 'Має містити',
        affectedFeeds: 'Застосувати правило до стрічок'
      }
    },
    pluginManager: {
      title: 'Менеджер плагінів'
    },
    search: {
      title: 'Пошук',
      btnStartSearch: 'Пошук',
      btnStopSearch: 'Стоп',
      columnTitle: {
        name: "Ім'я",
        size: 'Розмір',
        seeds: 'Сіди',
        peers: 'Піри',
        search_engine: 'Пошуковий двигун',
        action: 'Дії'
      }
    },
    settings: {
      tabName: {
        VueTorrent: 'VueTorrent',
        downloads: 'Завантаження',
        connection: "Зв'язок",
        bittorrent: 'bittorrent',
        rss: 'Стрічки',
        webUI: 'Bеб-інтерфейс',
        tagsAndCategories: 'Теги та категорії'
      },
      pageVueTorrent: {
        tabName: {
          general: 'Загальне',
          dashboard: 'Панель'
        },
        pageGeneral: {
          tip: 'Ці налаштування призначені для користувацького веб-інтерфейсу',
          currentSpeed: 'Відобразити поточну швидкість',
          speedGraph: 'Відобразити графік швидкості',
          sessionStats: 'Відобразити статистику сесії',
          allTimeStats: 'Відобразити всю статистику',
          freeSpace: 'Відобразити вільне місцк',
          trackerFilter: 'Відобразити фільтр трекерів',
          rightDrawer: 'Панель справа',
          topPagination: 'Відображення нумерації зверху',
          language: 'Мова:',
          paginationSize: 'Розмір сторінки:',
          vueTorrentTitle: 'Заголовок VueTorrent:',
          dateFormat: 'Формат дати',
          openSideBarOnStart: 'Відкривати бокову панель при запуску',
          currentVersion: 'Поточна версія',
          qbittorrentVersion: 'Версія QBittorrent:',
          resetSettings: 'Скинути налаштування'
        },
        pageDashboard: {
          busyTorrentTip: 'Властивості для відображення зайнятих торрентів',
          completedTorrentTip: 'Властивості для відображення завершених торрентів',
          properties: {
            availability: 'Доступність',
            category: 'Категорія',
            tags: 'Мітки',
            completed: 'Завершено',
            completion_on: 'Виконано о',
            downloaded: 'Завантажено',
            ETA: 'ОЧЗ',
            name: 'Назва',
            default: 'За замовчуванням',
            last_activity: 'Остання активність',
            рeers: 'Піри',
            seeds: 'Сіди',
            priority: 'Приоритет',
            progress: 'Поступ',
            ratio: 'Співвідношення',
            save_path: 'Тека',
            size: 'Розмір',
            state: 'Стан',
            uploaded: 'Завантажено',
            addedOn: 'Додано о',
            downloadSpeed: 'Швидкість завантаження',
            timeActive: 'Час активності',
            uploadSpeed: 'Швидкість вивантаження'
          }
        }
      },
      pageDownloads: {
        subHeaderWhenAddTorrent: 'Коли додається торент',
        whenAddTorrent: {
          createSubFolder: 'Створити підпапку для торрентів з кількома файлами',
          donotAutoStart: 'Не запускати завантаження автоматично'
        },
        subHeaderPublicSettings: 'Загальні налаштування',
        publicSettings: {
          preAllocateDisk: 'Попередньо виділити місце на диску для всіх файлів',
          appendQBExtension: 'Додати розширення .!qB до неповних файлів'
        },
        subHeaderSaveManagement: 'Управління збереженням',
        saveManagement: {
          autoManagement: 'Автоматичне керування торрентами',
          relocate: 'Переміщення торенту при зміні категорії',
          defaultSavePath: 'Шлях збереження за замовчуванням',
          keepIncompleteIn: 'Зберігати незавершені торренти в:',
          autoEnabled_onAdded: 'Запуск зовнішньої програми при додаванні торренту:',
          autoLabel_onAdded: 'Команда',
          autoEnabled_onFinished: 'Запуск зовнішньої програми при завершенні торренту:',
          autoLabel_onFinished: 'Команда',
          supportParamTitle: 'Підтримувані параметри (з урахуванням регістру):',
          supportParamN: '%N: Назва торрента',
          supportParamL: '%L: Категорія',
          supportParamG: '%G: Мітки (розділені комою)',
          supportParamF: '%F: Шлях до вмісту (такий самий як кореневий шлях для багатофайлового торрента)',
          supportParamR: '%R: Кореневий шлях (шлях першого підкаталогу торрента)',
          supportParamD: '%D: Шлях збереження',
          supportParamC: '%C: Кількість файлів',
          supportParamZ: '%Z: Розмір торренту (в байтах)',
          supportParamT: '%T: Поточний трекер',
          supportParamI: '%I: Хеш інформації v1',
          supportParamI: '%I: Хеш інформації v2',
          supportParamK: '%K: ID торренту'
        }
      },
      pageConnection: {
        protocol: 'Протокол підключення пірів',
        listeningSubHeader: 'Прослуховуваний порт',
        useUPnP: 'Використовувати переспрямування портів UPnP / NAT-PMP з мого маршрутизатора',
        incomingConnectionPort: "Порти, використані для вхідних з'єднань",
        subHeader: 'Обмеження підключення',
        globalMaxConnection: "Глобальна максимальна кількість з'єднань",
        perTorrentMaxConnection: "Максимальна кількість з'єднань на торрент",
        globalMaxUploadSlots: 'Глобальна максимальна кількість слотів для завантаження',
        perTorrentMaxUploadSlots: 'Максимальна кількість слотів для завантаження на торрент',
        proxySubHeader: 'Проксі-сервер',
        proxyPeerConnections: 'Використовувати проксі для підключень пірів',
        proxyTorrentOnly: 'Використовувати проксі тільки для торрентів',
        proxyAuth: 'Аутентифікація'
      },
      pageBittorrent: {
        subHeaderPrivacy: 'Конфіденційність',
        enableDHT: 'Увімкнути DHT (децентралізовану мережу), щоб знайти більше однорангових пристроїв',
        enablePeX: 'Увімкнути Peer Exchange (PeX), щоб знайти більше однорангових партнерів',
        enableLPD: 'Увімкнути локальне виявлення однорангових пристроїв, щоб знайти більше однорангових пристроїв',
        enableAnonymous: 'Увімкнути анонімний режим',
        torrentQueue: 'Черга торрентів',
        maxActiveDownload: 'Максимальна кількість активних завантажень',
        maxActiveUpload: 'Максимальна кількість активних вивантажень',
        maxActiveTorrent: 'Максимальна кількість активних торрентів',
        excludeSlowTorrent: 'Не враховувати повільні торренти в цих межах',
        downloadRateLimit: 'Порогове значення швидкості завантаження КіБ/с',
        uploadRateLimit: 'Поріг швидкості вивантаження КіБ/с',
        torrentInactivityTimer: 'Таймер неактивності торренту',
        subHeaderSeedLimits: 'Обмеження сідування',
        whenRatioReaches: 'Коли співвідношення досягне',
        whenSeedingTimeReaches: 'Коли сідування досягне часу',
        maxRatioPauseTorrent: 'Призупинити торрент',
        maxRatioRemoveTorrent: 'Видалити торрент',
        maxRatioRemoveTorrentAndFiles: 'Видалити торрент та файли',
        maxRatioTorrentSuperseeding: 'Ввімкнути режим суперсіда'
      },
      pageRss: {
        tabName: {
          general: 'Загальні',
          feeds: 'Стрічки',
          rules: 'Правила'
        },
        pageRules: {
          rules: 'Правила',
          btnCreateNew: 'Створити правило'
        },
        pageFeeds: {
          feeds: 'Стрічки',
          btnCreateNew: 'Додати стрічку'
        },
        pageGeneral: {
          rssAutoProcessing: 'Зчитувач RSS',
          rssAutoDownloader: 'Автозавантаження торрентів через RSS',
          input: {
            enableRssAutoDownload: 'Ввімкнути автозавантаження торрентів через RSS',
            enableRssProcessing: 'Ввімкнути отримування RSS стрічок',
            feedsRefreshInterval: 'Час оновлення стрічок',
            feedsMaxArticles: 'Максимальна кількість заголовків для стрічки'
          }
        }
      },
      pageWebUI: {
        useAlternativeWebUI: 'Використовувати альтернативний веб-інтерфейс',
        filesLocation: 'Розташування файлів',
        webUserInterface: 'Веб-інтерфейс користувача (дистанційне керування)',
        ipAddress: 'IP-адреса:',
        port: 'Порт',
        authentication: 'Аутентифікація',
        username: "Ім'я користувача",
        password: 'пароль',
        maxAttempts: 'Максимальна кількість спроб',
        banDuration: 'Тривалість бану (секунди)',
        sessionTimeout: 'Час очікування сеансу (секунди)',
        bypassAuthenticationForClientsOnLocalhost: 'Обійти автентифікацію для клієнтів на локальному хості',
        bypassAuthenticationForClientsInWhitelisted: 'Обійти автентифікацію для клієнтів у підмережах IP із білого списку',
        whiteListExample: 'Приклад: 172.17.32.0/24, fdff:ffff:c8::/40'
      },
      pageTagsAndCategories: {
        btnCreateNew: 'Створити категорію',
        subHeaderTags: 'Доступні теги:',
        subHeaderCategories: 'Доступні категорії:'
      }
    },
    shareLimit: {
      input: {
        globalLimit: 'Використовувати глобальний ліміт',
        unlimited: 'Необмежено'
      },
      limitRatio: 'Обмежити співвідношення',
      titleDuration: 'Тривалість',
      titleRatio: 'Співвідношення'
    },
    newCategory: {
      categoryName: 'Назва категорії',
      Path: 'Шлях',
      tipOnNoName: 'Потрібна назва категорії',
      tipOnNoPath: 'Потрібний шлях'
    },
    newTag: {
      createNewTag: 'Створити новий тег',
      tagName: 'Назва тегу'
    },
    detail: {
      title: 'Деталі',
      tabTitleInfo: 'Інформація',
      tabTitleTrackers: 'Трекери',
      tabTitlePeers: 'Піри',
      tabTitleContent: 'Вміст',
      tabTitleTagsCategories: 'Теги та категорії',
      pageInfo: {
        pieceStates: 'Прогрес',
        torrentTitle: 'Назва',
        hash: 'хеш',
        ratio: 'Співвідношення',
        downloadSpeed: 'Швидкість завантаження',
        uploadSpeed: 'Швидкість вивантаження',
        eta: 'ОЧЗ',
        peers: 'Піри',
        seeds: 'Сіди',
        status: 'Стан',
        trackers: 'Трекери',
        createdBy: 'Створено',
        firstLastPiecePriority: 'Пріоритет першої/останньої частини',
        sequentialDownload: 'Послідовне завантаження',
        autoTMM: 'Auto TMM',
        shareRatioLimit: 'Обмеження співвідношення частки',
        shareTimeLimit: 'Ліміт часу спільного використання (хвилини)',
        downloadLimit: 'Ліміт завантаження',
        uploadLimit: 'Ліміт вивантаження'
      },
      pagePeers: {
        ip: 'IP',
        connection: 'Підключення',
        flags: 'Прапорці',
        client: 'Клієнт',
        progress: 'Прогрес',
        downloadSpeed: 'Швидкість зав.',
        downloaded: 'Завант.',
        upSpeed: 'Швидкість вивант.',
        uploaded: 'Вивант.',
        relevance: 'Відповідність',
        files: 'Файли'
      },
      pageTagsAndCategories: {
        subHeaderTag: 'Доступні теги:',
        subHeaderCategories: 'Доступні категорії:'
      },
      pageTrackers: {
        url: 'URL',
        status: 'Статус',
        peers: 'Піри',
        seeds: 'Сіди',
        leeches: 'Лічі',
        downloaded: 'Завантажено',
        message: 'Повідомлення'
      }
    },
    add: {
      title: 'Додати новий торрент',
      selectFiles: 'Виберіть файли',
      urlHint: 'Одне посилання на рядок',
      downloadDirectory: 'Завантажити теку',
      starttorrent: 'Запустити торрент',
      skipHashCheck: 'Пропустити перевірку хешування',
      createSubfolder: 'Створити підпапку',
      automaticTorrentManagement: 'Автоматичне керування торрентами',
      dropHereForAdd: 'Перетягнути для додавання',
      oneOrMoreFilesInvalidTorrent: 'Один або кілька файлів не є дійсним торрентом'
    },
    changeLocation: {
      title: 'Змінити місцезнаходження'
    },
    rename: {
      title: 'Перейменувати',
      torrentName: 'Назва'
    },
    sort: {
      title: 'Сортувати торренти',
      reverse: 'Реверс',
      sortBy: {
        availability: 'Доступність',
        category: 'Категорія',
        completed: 'Завершено',
        completion_on: 'Завершено о',
        downloaded: 'Завантажено',
        ETA: 'ОЧЗ',
        name: "Ім'я",
        default: 'Немає',
        last_activity: 'Остання активність',
        peers: 'Піри',
        priority: 'Пріоритет',
        progress: 'Прогрес',
        ratio: 'Співвідношення',
        save_path: 'Тека',
        size: 'Розмір',
        state: 'Стан',
        uploaded: 'Вивантажено',
        addOn: 'Додано',
        downloadSpeed: 'Швидкість завантаження',
        timeActive: 'Час активний',
        uploadSpeed: 'Швидкість вивантаження'
      }
    },
    speedLimit: {
      speedLimit: 'Обмеження швидкості'
    },
    delete: {
      check: 'Також видалити файли зі сховища'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: 'Успішний вхід! 🎉',
    loginFailed: 'Помилка входу 😕',
    settingsSaved: 'Налаштування успішно збережено!',
    categorySaved: 'Категорія успішно відредагована!',
    feedSaved: 'Стрічка збережена успішно!',
    ruleSaved: 'Правило збережено!',
    renameFileFailed: 'Не можу перейменувати файл',
    renameFolderFailed: 'Не можу перейменувати теку'
  },

  /** RightClick **/
  rightClick: {
    resume: 'відновити',
    forceResume: 'Примусове відновлення',
    advanced: {
      advanced: 'Розширені',
      changeLocation: 'Змінити розташування',
      rename: 'Перейменувати',
      forceRecheck: 'Примусова перевірка',
      forceReannounce: 'Примусово анонсувати',
      sequentialDownload: 'Послідовне завантаження',
      firstLastPriority: 'Перший/останній пріоритет',
      automaticTorrentManagement: 'Автоматичне керування торрентами'
    },
    prio: {
      prio: 'Встановити пріоритет',
      top: 'Наверх',
      bottom: 'Донизу',
      increase: 'Збільшити',
      decrease: 'Зменшити'
    },
    category: 'Встановити категорію',
    tags: 'Встановити мітки',
    notags: 'Без міток',
    limit: 'Встановити ліміт',
    copy: 'Копіювати',
    info: 'Деталі'
  }
}

export default locale
