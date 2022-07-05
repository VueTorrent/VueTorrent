const locale = {
  /** General */
  category: 'Категорії',
  settings: 'Налаштування',
  pause: 'Пауза',
  delete: 'Видалити',
  save: 'Зберегти',
  cancel: 'Відмінити',
  confirm: 'Підтвердити',
  edit: 'Редагувати',
  createNew: 'Створити новий',
  path: 'Шлях',
  create: 'Створити',
  url: 'URL',
  directory: 'Тека',
  unknown: 'Невідомий',
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
  share: 'Поділитися',
  name: 'Ім\'я',
  hash: 'Хеш',
  magnet: 'Магнет',

  /** Torrent */
  torrent: {
    title: 'Заголовок',
    added: 'Додано о:',
    availability: 'Доступність',
    size: 'Розмір',
    progress: 'Прогрес',
    directory: 'Тека',
    downloaded: 'Завантаж.',
    uploaded: 'Вивантаж.',
    created: 'Створено',
    comments: 'примітки',
    uploadedSession: 'Завантажено за сесію',
    torrentTitle: 'Ім\'я'
  },
  /** Navbar */
  navbar: {
    currentSpeed: 'поточна швидкість',
    freeSpace: 'вільне місце',
    topActions: {
      addTorrent: 'додати торрент',
      resumeSelected: 'Відновити вибрані торенти',
      pauseSelected: 'Призупинити вибрані торенти',
      removeSelected: 'Видалити вибрані торенти',
      openSettings: 'Відкрити налаштування',
      searchNew: 'Шукати нові торенти'
    },
    sessionStats: {
      tooltip: 'З моменту останнього перезапуску qBittorrent'
    },
    filters: {
      stalled_uploading: 'Залиплі вивантаження',
      stalled_downloading: 'Залиплі завантаження'
    },
    action: {
      altSpeed: 'Обмеження швидкості',
      dark: 'Темна',
      light: 'Світла'
    }
  },

  /** Modals */
  modals: {
    pluginManager: {
      title: 'Менеджер плагінів'
    },
    search: {
      title: 'Пошук',
      btnStartSearch: 'Пошук',
      btnStopSearch: 'Стоп',
      columnTitle: {
        name: 'Ім\'я',
        size: 'Розмір',
        seeds: 'Сіди',
        peers: 'Піри',
        search_engine: 'Пошуковий двигун',
        action: 'Дії'
      }
    },
    settings: {
      tabName: {
        VueTorrent: 'Vuetorrent',
        downloads: 'Завантаження',
        connection: 'Зв\'язок',
        bittorrent: 'Bittorrent',
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
          language: 'Мова:',
          paginationSize: 'Розмір сторінки:',
          vueTorrentTitle: 'Заголовок VueTorrent:',
          currentVersion: 'Поточна версія',
          qbittorrentVersion: 'Версія QBittorrent:'
        },
        pageDashboard: {
          busyTorrentTip: 'Властивості для відображення зайнятих торрентів',
          completedTorrentTip: 'Властивості для відображення завершених торрентів'
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
          keepIncompleteIn: 'Зберігати неповні торренти в:',
          autoEnabled: 'Автозапуск увімкнено:',
          autorunProgram: 'Програма автозапуску',
          supportParamTitle: 'Підтримувані параметри (з урахуванням регістру):',
          supportParamN: '%N: назва торрента',
          supportParamL: '%L: Категорія',
          supportParamG: '%G: теги (розділені комою)',
          supportParamF: '%F: шлях до вмісту (такий самий як кореневий шлях для багатофайлового торрента)',
          supportParamR: '%R: кореневий шлях (шлях першого підкаталогу торрента)',
          supportParamD: '%D: шлях збереження',
          supportParamC: '%C: кількість файлів',
          supportParamZ: '%Z: розмір торрента (байти)',
          supportParamT: '%T: поточний трекер',
          supportParamI: '%I: хеш інформації'
        }
      },
      pageConnection: {
        subHeader: 'Обмеження підключення',
        globalMaxConnection: 'Глобальна максимальна кількість з\'єднань',
        perTorrentMaxConnection: 'Максимальна кількість з\'єднань на торрент',
        globalMaxUploadSlots: 'Глобальна максимальна кількість слотів для завантаження',
        perTorrentMaxUploadSlots: 'Максимальна кількість слотів для завантаження на торрент'
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
        whenSeedingTimeReaches: 'Коли сідування досягне часу'
      },
      pageWebUI: {
        useAlternativeWebUI: 'Використовувати альтернативний веб-інтерфейс',
        filesLocation: 'Розташування файлів',
        webUserInterface: 'Веб-інтерфейс користувача (дистанційне керування)',
        ipAddress: 'IP-адреса:',
        port: 'Порт',
        authentication: 'Аутентифікація',
        username: 'Ім\'я користувача',
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
      tipOnNameTooLong: 'Назва категорії має містити менше 15 символів',
      tipOnNoPath: 'Потрібний шлях',
      TipOnPathTooLong: 'Шлях має бути менше 40 символів'
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
      title: 'Змінити місцезнаходження',
      torrentName: 'Назва торренту'
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
        downloaded: 'Завантажено',
        ETA: 'ОЧЗ',
        name: 'Ім\'я',
        peers: 'Піри',
        priority: 'Пріоритет',
        progress: 'Прогрес',
        ratio: 'Співвідношення',
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

  /** Toast  */
  toast: {
    loginSuccess: 'Успішний вхід! 🎉',
    loginFailed: 'Помилка входу 😕',
    settingsSaved: 'Налаштування успішно збережено!',
    categorySaved: 'Категорія успішно відредагована!'
  },

  /** RightClick  **/
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
    limit: 'Встановити ліміт',
    copy: 'Копіювати',
    info: 'Деталі'
  }
}

export default locale
