const locale = {
  /** General */
  category: 'Catégorie',
  settings: 'Paramètres',
  pause: 'pause',
  delete: 'supprimer',
  save: 'sauvegarder',
  cancel: 'annuler',
  confirm: 'confirmer',
  edit: 'Editer',
  createNew: 'Créer un nouveau',
  path: 'Chemin',
  create: 'Créer',
  url: 'URL',
  directory: 'Répertoire',
  unknown: 'inconnu',
  status: 'statut',
  all: 'tout',
  downloading: 'téléchargement',
  seeding: 'Seeding',
  completed: 'Complété',
  resumed: 'A repris',
  paused: 'En pause',
  active: 'Actif',
  inactive: 'Inactif',
  stalled: 'Bloqué',
  errored: 'Erreur',
  login: 'Se connecter',
  logout: 'Se déconnecter',
  downloaded: 'téléchargé',
  uploaded: 'téléversé',
  upload: 'téléversement',
  download: 'téléchargement',
  ETA: 'ETA',
  peers: 'Pairs',
  ratio: 'Ratio',
  seeds: 'Seeds',
  tags: 'Tags',
  share: 'Partager',
  name: 'Nom',
  hash: 'Hash',
  magnet: 'Magnet',
  feed: 'flux',
  rule: 'règles',
  then: 'alors',

  /** Torrent */
  torrent: {
    title: 'titre',
    added: 'ajouté le',
    availability: 'disponibilité',
    size: 'taille',
    progress: 'progression',
    directory: 'dossier',
    downloaded: 'téléchargé',
    uploaded: 'uploadé',
    created: 'créé par',
    comments: 'commentaires',
    uploadedSession: 'Session de téléversement',
    timeActive: "temps d'activité",
    seededFor: 'seed depuis',
    last_activity: 'dernière activité'
  },
  /** Navbar */
  navbar: {
    currentSpeed: 'vitesse actuelle',
    freeSpace: 'espace libre',
    topActions: {
      addTorrent: 'ajouter un Torrent',
      resumeSelected: 'reprendre les Torrents sélectionnés',
      pauseSelected: 'mettre en pause les Torrents sélectionnés',
      removeSelected: 'supprimer les Torrents sélectionnés',
      openSettings: 'ouvrir les paramètres',
      searchNew: 'rechercher un nouveau Torrent'
    },
    sessionStats: {
      tooltip: 'Depuis le dernier redémarrage de qBittorrent'
    },
    filters: {
      stalled_uploading: 'Chargement bloqué',
      stalled_downloading: 'Téléchargement bloqué'
    },
    action: {
      altSpeed: 'Vitesse Alternative',
      dark: 'Sombre',
      light: 'Clair'
    }
  },

  /** Modals */
  modals: {
    newFeed: {
      feedName: 'Nom',
      url: 'URL'
    },
    newRule: {
      name: 'Nom',
      def: {
        mustContain: 'Doit contenir',
        affectedFeeds: 'Appliquer la règle aux flux'
      }
    },
    pluginManager: {
      title: 'Gestionnaire de plugins'
    },
    search: {
      title: 'Recherche',
      btnStartSearch: 'Chercher',
      btnStopSearch: 'Arrêter',
      columnTitle: {
        name: 'Nom',
        size: 'Taille',
        seeds: 'Seeds',
        peers: 'Pairs',
        search_engine: 'Moteur de recherche',
        action: 'Action'
      }
    },
    settings: {
      tabName: {
        VueTorrent: 'vuetorrent',
        downloads: 'téléchargements',
        connection: 'connexion',
        bittorrent: 'bittorrent',
        rss: 'RSS',
        webUI: 'WEB UI',
        tagsAndCategories: 'tags & catégories'
      },
      pageVueTorrent: {
        tabName: {
          general: 'Général',
          dashboard: 'Tableau de bord'
        },
        pageGeneral: {
          tip: 'Ces paramètres concernent la WebUI',
          currentSpeed: 'Afficher la vitesse actuelle',
          speedGraph: 'Afficher le graphique de vitesse',
          sessionStats: 'Afficher les statistiques de la session',
          allTimeStats: 'Afficher les statistiques globales',
          freeSpace: "Afficher l'espace libre",
          trackerFilter: 'Afficher le filtre des trackers',
          rightDrawer: 'Menu à droite',
          topPagination: 'Pagination du haut',
          language: 'Langue:',
          paginationSize: 'Taille de la pagination:',
          vueTorrentTitle: 'Titre de VueTorrent:',
          dateFormat: 'Format de date',
          openSideBarOnStart: 'Ouvrir la barre latérale au lancement',
          currentVersion: 'Version actuelle:',
          qbittorrentVersion: 'Version de QBittorrent:'
        },
        pageDashboard: {
          busyTorrentTip: 'Propriétés à afficher pour les torrents occupés',
          completedTorrentTip: 'Propriétés à afficher pour les torrents terminés'
        }
      },
      pageDownloads: {
        subHeaderWhenAddTorrent: "Lors de l'ajout d'un torrent",
        whenAddTorrent: {
          createSubFolder: 'Créer un sous-dossier pour les torrents avec plusieurs fichiers',
          donotAutoStart: 'Ne pas lancer le téléchargement automatiquement'
        },
        subHeaderPublicSettings: 'Paramètres publics',
        publicSettings: {
          preAllocateDisk: "Pré-allouer l'espace disque pour tous les fichiers",
          appendQBExtension: "Ajouter l'extension .!qB aux fichiers incomplets"
        },
        subHeaderSaveManagement: 'Gestion de la sauvegarde',
        saveManagement: {
          autoManagement: 'Gestion automatique des torrents',
          relocate: 'Déplacer le torrent lorsque la catégorie change',
          defaultSavePath: 'Chemin de sauvegarde par défaut',
          keepIncompleteIn: 'Gardez les torrents incomplets dans :',
          autoEnabled: 'Autorun activé:',
          autorunProgram: "Programme de l'autorun",
          supportParamTitle: 'Paramètres pris en charge (sensibles à la casse) :',
          supportParamN: '%N: Nom du torrent ',
          supportParamL: '%L: Catégorie',
          supportParamG: '%G: Tags (séparés par une virgule)',
          supportParamF: "%F: Chemin d'accès au contenu (identique au chemin d'accès racine pour les torrents multi-fichiers)",
          supportParamR: '%R: Chemin racine (chemin du premier sous-répertoire de torrent)',
          supportParamD: '%D: Chemin de sauvegarde',
          supportParamC: '%C: Nombre de fichiers',
          supportParamZ: '%Z: Taille du torrent (bytes)',
          supportParamT: '%T: Traqueur actuel',
          supportParamI: '%I: Info hash'
        }
      },
      pageConnection: {
        protocol: 'Protocol de connexion aux pairs',
        listeningSubHeader: "Port d'écoute",
        useUPnP: 'Utiliser la redirection de port UPnP / NAT-PMP de mon routeur',
        incomingConnectionPort: 'Port utilisé pour les connexions entrantes',
        subHeader: 'Limites de connexion',
        globalMaxConnection: 'Nombre max de connexions globales',
        perTorrentMaxConnection: 'Nombre max de connexions par torrent',
        globalMaxUploadSlots: "Nombre maximum de slots d'upload global",
        perTorrentMaxUploadSlots: "Nombre maximum de slots d'upload par torrent",
        proxySubHeader: 'Serveur proxy',
        proxyPeerConnections: 'Utiliser un proxy pour les connexions aux pairs',
        proxyTorrentOnly: 'Utiliser le proxy uniquement pour les torrents',
        proxyAuth: 'Authentification'
      },
      pageBittorrent: {
        subHeaderPrivacy: 'Vie privée',
        enableDHT: 'Activer le DHT (réseau décentralisé) pour trouver plus de pairs',
        enablePeX: "Activer l'échange de pairs (PeX) pour trouver plus de pairs",
        enableLPD: 'Activer la découverte de peers locaux pour trouver plus de pairs',
        enableAnonymous: 'Activer le mode anonyme',
        torrentQueue: "File d'attente des torrents",
        maxActiveDownload: 'Téléchargements actifs maximums',
        maxActiveUpload: 'Chargements actifs maximums',
        maxActiveTorrent: 'Maximum de torrents actifs',
        excludeSlowTorrent: 'Ne pas compter les torrents lents dans ces limites.',
        downloadRateLimit: 'Seuil du taux de téléchargement en KiB/s',
        uploadRateLimit: 'Seuil du débit de chargement en KiB/s',
        torrentInactivityTimer: "Délai d'inactivité du torrent",
        subHeaderSeedLimits: 'Limites de seed',
        whenRatioReaches: 'Lorsque le ratio atteint',
        whenSeedingTimeReaches: 'Lorsque le temps de seeding atteint',
        maxRatioPauseTorrent: 'Mettre en pause le torrent',
        maxRatioRemoveTorrent: 'Supprimer le torrent',
        maxRatioRemoveTorrentAndFiles: 'Suprimer le torrent & son contenu',
        maxRatioTorrentSuperseeding: 'Activer le mode super seeding'
      },
      pageRss: {
        tabName: {
          general: 'Général',
          feeds: 'Flux',
          rules: 'Règles'
        },
        pageRules: {
          rules: 'Règles',
          btnCreateNew: 'Créer une règle'
        },
        pageFeeds: {
          feeds: 'Flux',
          btnCreateNew: 'Ajouter un flux'
        },
        pageGeneral: {
          rssAutoProcessing: 'Lecteur RSS',
          rssAutoDownloader: 'Downloader automatique des torrents RSS',
          input: {
            enableRssAutoDownload: 'Activer le téléchargement automatique des torrents RSS',
            enableRssProcessing: 'Activer la récupération des flux RSS',
            feedsRefreshInterval: 'Intervalle de rafraichissement des flux',
            feedsMaxArticles: "Nombre maximum d'articles par flux"
          }
        }
      },
      pageWebUI: {
        useAlternativeWebUI: 'Utiliser une interface Web alternative',
        filesLocation: "Emplacement de l'interface",
        webUserInterface: 'Interface utilisateur Web (accès à distance)',
        ipAddress: 'Adresse IP:',
        port: 'Port',
        authentication: 'Authentification',
        username: "Nom d'utilisateur",
        password: 'mot de passe',
        maxAttempts: 'Tentatives maximales',
        banDuration: 'Durée de ban (secondes)',
        sessionTimeout: "Délai d'expiration de la session (secondes)",
        bypassAuthenticationForClientsOnLocalhost: "Désactiver l'authentification pour les clients sur le localhost",
        bypassAuthenticationForClientsInWhitelisted: "Désactiver l'authentification pour les clients dans les sous-réseaux IP de la liste blanche",
        whiteListExample: 'Exemple: 172.17.32.0/24, fdff:ffff:c8::/40'
      },
      pageTagsAndCategories: {
        btnCreateNew: 'Créer un nouveau',
        subHeaderTags: 'Tags disponibles :',
        subHeaderCategories: 'Catégories disponibles :'
      }
    },
    shareLimit: {
      input: {
        globalLimit: 'Utiliser la limite globale',
        unlimited: 'Illimité'
      },
      limitRatio: 'Limiter le ratio',
      titleDuration: 'Durée',
      titleRatio: 'Ratio'
    },
    newCategory: {
      categoryName: 'Nom de la catégorie',
      Path: "Chemin d'accès",
      tipOnNoName: 'Le nom de la catégorie est obligatoire',
      tipOnNoPath: "Le chemin d'accès est obligatoire"
    },
    newTag: {
      createNewTag: 'Créer un nouveau tag',
      tagName: 'Nom du tag'
    },
    detail: {
      title: 'Détail du torrent',
      tabTitleInfo: 'Info',
      tabTitleTrackers: 'Traqueurs',
      tabTitlePeers: 'Pairs',
      tabTitleContent: 'Contenu',
      tabTitleTagsCategories: 'Tags & Catégories',
      pageInfo: {
        pieceStates: 'Progression',
        torrentTitle: 'Titre du torrent',
        hash: 'hash',
        ratio: 'Ratio',
        downloadSpeed: 'Vitesse de Téléchargement',
        uploadSpeed: "Vitesse de téléversement",
        eta: 'ETA',
        peers: 'Pairs',
        seeds: 'Seeds',
        status: 'Statut',
        trackers: 'Traqueurs',
        createdBy: 'Créé par',
        firstLastPiecePriority: 'Priorité de la première/dernière pièce',
        sequentialDownload: 'Téléchargement séquentiel',
        autoTMM: 'Gestion des torrents automatique',
        shareRatioLimit: 'Limite de ratio',
        shareTimeLimit: 'Limite de temps de partage (minutes)',
        downloadLimit: 'Limite de téléchargement',
        uploadLimit: "Limite de téléversement"
      },
      pagePeers: {
        ip: 'IP',
        connection: 'Connexion',
        flags: 'Flags',
        client: 'Client',
        progress: 'Progression',
        downloadSpeed: 'Vitesse de réception',
        downloaded: 'Volume reçu',
        upSpeed: "Vitesse d'envoi",
        uploaded: 'Volume envoyé',
        relevance: 'Pertinence',
        files: 'Fichiers'
      },
      pageTagsAndCategories: {
        subHeaderTag: 'Tags disponibles:',
        subHeaderCategories: 'Catégories disponibles:'
      },
      pageTrackers: {
        url: 'URL',
        status: 'Statut',
        peers: 'Pairs',
        seeds: 'Seeds',
        leeches: 'Leeches',
        downloaded: 'Téléchargé',
        message: 'Message'
      }
    },
    add: {
      title: 'Ajouter un nouveau Torrent',
      selectFiles: 'Sélectionnez les fichiers',
      urlHint: 'Un lien par ligne',
      downloadDirectory: 'Répertoire de téléchargement',
      starttorrent: 'Lancer le torrent',
      skipHashCheck: 'Passer la vérification du hash',
      createSubfolder: 'Créer un sous-dossier',
      automaticTorrentManagement: 'Gestion automatique des torrents',
      dropHereForAdd: 'Déposez ici pour ajouter',
      oneOrMoreFilesInvalidTorrent: 'Un ou plusieurs fichiers ne sont pas des torrents valides'
    },
    changeLocation: {
      title: "Changement d'emplacement",
      torrentName: 'Nom du torrent'
    },
    rename: {
      title: 'Renommer',
      torrentName: 'Nom du torrent'
    },
    sort: {
      title: 'Trier les torrents',
      reverse: 'Inverser',
      sortBy: {
        availability: 'Disponibilité',
        category: 'Catégorie',
        completed: 'Complété',
        downloaded: 'Téléchargé',
        ETA: 'ETA',
        name: 'Nom',
        none: 'Aucun',
        last_activity: 'Dernière activité',
        peers: 'Pairs',
        priority: 'Priorité',
        progress: 'Progression',
        ratio: 'Ratio',
        save_path: 'Emplacement',
        size: 'Taille',
        state: 'État',
        uploaded: 'Téléversé',
        addedOn: 'Ajouté le',
        downloadSpeed: 'Vitesse de téléchargement',
        timeActive: 'Temps actif',
        uploadSpeed: "Vitesse d'upload"
      }
    },
    speedLimit: {
      speedLimit: 'Limite de vitesse'
    },
    delete: {
      check: 'Supprimer également les fichiers du disque'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: 'Connexion réussie! 🎉',
    loginFailed: 'Connexion échouée 😕',
    settingsSaved: 'Paramètres enregistrés avec succès!',
    categorySaved: 'Catégorie modifiée avec succès!',
    feedSaved: 'Flux enregistré !',
    ruleSaved: 'Règle enregistrée !'
  },

  /** RightClick **/
  rightClick: {
    resume: 'reprendre',
    forceResume: 'forcer la reprise',
    advanced: {
      advanced: 'avancé',
      changeLocation: "changer l'emplacement",
      rename: 'renommer',
      forceRecheck: 'Forcer la revérification',
      forceReannounce: 'Forcer la réannonce',
      sequentialDownload: 'Téléchargement séquentiel',
      firstLastPriority: 'priorité de la Première/dernière pièce',
      automaticTorrentManagement: 'Gestion automatique des torrents'
    },
    prio: {
      prio: 'Définir la priorité',
      top: 'Max',
      bottom: 'Min',
      increase: 'Augmenter',
      decrease: 'Diminuer'
    },
    category: 'Définir la catégorie',
    tags: 'Définir les tags',
    notags: 'Aucun tag',
    limit: 'Définir la limite',
    copy: 'copier',
    info: 'afficher les informations'
  }
}

export default locale
