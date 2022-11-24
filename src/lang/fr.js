const locale = {
  /** General */
  category: 'Catégorie',
  settings: 'Paramètres',
  pause: 'pause',
  delete: 'supprimer',
  save: 'sauver',
  cancel: 'annuler',
  confirm: 'confirmer',
  edit: 'Editer',
  createNew: 'Créer un nouveau',
  path: 'Chemin',
  create: 'Créer',
  url: 'URL',
  directory: 'Répertoire',
  unknown: 'inconnue',
  status: 'Statut',
  all: 'Tout',
  downloading: 'Téléchargement',
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
  uploaded: 'uploaded',
  upload: 'upload',
  download: 'Download',
  ETA: 'ETA',
  peers: 'Peers',
  ratio: 'Ratio',
  seeds: 'Seeds',
  tags: 'Tags',
  share: 'Partager',
  name: 'Nom',
  hash: 'Hase',
  magnet: 'Magnet',

  /** Torrent */
  torrent: {
    title: 'titre',
    added: 'ajouté le',
    availability: 'disponibilité',
    size: 'taille',
    progress: 'avancement',
    directory: 'répertoire',
    downloaded: 'téléchargé',
    uploaded: 'uploadé',
    created: 'créé par',
    comments: 'commentaires',
    uploadedSession: 'Uploaded Session',
    torrentTitle: 'Titre du torrent'
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
      altSpeed: 'Alt speeds',
      dark: 'Sombre',
      light: 'Light'
    }
  },

  /** Modals */
  modals: {
    pluginManager: {
      title: 'Gestionnaire de plugins'
    },
    search: {
      title: 'Chercher',
      btnStartSearch: 'Chercher',
      btnStopSearch: 'Arrêt',
      columnTitle: {
        name: 'Nom',
        size: 'Taille',
        seeds: 'Seeds',
        peers: 'Peers',
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
        webUI: 'WEB UI',
        tagsAndCategories: 'tags & catégories'
      },
      pageVueTorrent: {
        tabName: {
          general: 'Général',
          dashboard: 'Tableau de bord'
        },
        pageGeneral: {
          tip: 'Ces paramètres concernent WebUI personnalisée',
          currentSpeed: 'Afficher la vitesse actuelle',
          speedGraph: 'Afficher le graphique de vitesse',
          sessionStats: 'Afficher les statistiques de la session',
          allTimeStats: 'Afficher les statistiques de tous les temps',
          freeSpace: "Afficher l'espace libre",
          trackerFilter: 'Afficher le filtre de Tracker',
          rightDrawer: 'Menu à droite',
          language: 'Langue:',
          paginationSize: 'Taille de la pagination:',
          vueTorrentTitle: 'Titre VueTorrent:',
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
          preAllocateDisk: "Pré-allouer de l'espace disque pour tous les fichiers",
          appendQBExtension: "Ajouter l'extension .!qB aux fichiers incomplets"
        },
        subHeaderSaveManagement: 'Saving Management',
        saveManagement: {
          autoManagement: 'Gestion automatique des torrents',
          relocate: 'Relocaliser le torrent lorsque la catégorie change',
          defaultSavePath: 'Chemin de sauvegarde par défaut',
          keepIncompleteIn: 'Gardez les torrents incomplets dans :',
          autoEnabled: 'Autorun activé:',
          autorunProgram: "Programme d'exécution automatique",
          supportParamTitle: 'Paramètres pris en charge (sensibles à la casse):',
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
        subHeader: 'Limites de connexion',
        globalMaxConnection: 'Nombre maximal global de connexions',
        perTorrentMaxConnection: 'Nombre maximal de connexions par torrent',
        globalMaxUploadSlots: 'Global maximum number of upload slots',
        perTorrentMaxUploadSlots: 'Maximum number of upload slots per torrent'
      },
      pageBittorrent: {
        subHeaderPrivacy: 'Vie privée',
        enableDHT: 'Permettre au DHT (réseau décentralisé) de trouver plus de peers.',
        enablePeX: "Activez l'échange de peers (PeX) pour trouver d'autres peers.",
        enableLPD: 'Activez la découverte de peers locaux pour trouver plus de peers.',
        enableAnonymous: 'Activer le mode anonyme',
        torrentQueue: "Mise en file d'attente des torrents",
        maxActiveDownload: 'Téléchargements actifs maximums',
        maxActiveUpload: 'Chargements actifs maximums',
        maxActiveTorrent: 'Maximum de torrents actifs',
        excludeSlowTorrent: 'Ne pas compter les torrents lents dans ces limites.',
        downloadRateLimit: 'Seuil du taux de téléchargement KiB/s',
        uploadRateLimit: 'Seuil du débit de chargement KiB/s',
        torrentInactivityTimer: "Délai d'inactivité du torrent",
        subHeaderSeedLimits: 'Seed Limites',
        whenRatioReaches: 'Lorsque le ratio atteint',
        whenSeedingTimeReaches: 'Lorsque le temps de seeding atteint'
      },
      pageWebUI: {
        useAlternativeWebUI: 'Utiliser une interface Web alternative',
        filesLocation: 'Emplacement des fichiers',
        webUserInterface: 'Interface utilisateur Web (commande à distance)',
        ipAddress: 'Adresse IP:',
        port: 'Port',
        authentication: 'Authentification',
        username: "Nom d'utilisateur :",
        password: 'mot de passe',
        maxAttempts: 'Tentatives maximales',
        banDuration: 'Durée de ban (secondes)',
        sessionTimeout: "Délai d'expiration de la session (secondes)",
        bypassAuthenticationForClientsOnLocalhost: "Contourner l'authentification pour les clients sur localhost",
        bypassAuthenticationForClientsInWhitelisted: "Contournement de l'authentification pour les clients dans les sous-réseaux IP de la liste blanche.",
        whiteListExample: 'Exemple: 172.17.32.0/24, fdff:ffff:c8::/40'
      },
      pageTagsAndCategories: {
        btnCreateNew: 'Créer un nouveau',
        subHeaderTags: 'Tags disponibles:',
        subHeaderCategories: 'Catégories disponibles:'
      }
    },
    shareLimit: {
      input: {
        globalLimit: 'Utiliser la limite globale',
        unlimited: 'Illimité'
      },
      limitRatio: 'Limit Ratio',
      titleDuration: 'Durée',
      titleRatio: 'Ratio'
    },
    newCategory: {
      categoryName: 'Nom de la catégorie',
      Path: "Chemin d'accès",
      tipOnNoName: 'Le nom de la catégorie est obligatoire',
      tipOnNoPath: "Le chemin d'accès est requis"
    },
    newTag: {
      createNewTag: 'Créer un nouveau tag',
      tagName: 'Nom du tag'
    },
    detail: {
      title: 'Détail du torrent',
      tabTitleInfo: 'Info',
      tabTitleTrackers: 'Trackers',
      tabTitlePeers: 'Peers',
      tabTitleContent: 'Contenu',
      tabTitleTagsCategories: 'Tags et catégories',
      pageInfo: {
        pieceStates: 'Progrès',
        torrentTitle: 'Titre du torrent',
        hash: 'hash',
        ratio: 'Ratio',
        downloadSpeed: 'Vitesse de DL',
        uploadSpeed: "Vitesse d'UP",
        eta: 'ETA',
        peers: 'Peers',
        seeds: 'Seeds',
        status: 'Statut',
        trackers: 'Trackers',
        createdBy: 'Créé par',
        firstLastPiecePriority: 'Priorité de la première/dernière pièce',
        sequentialDownload: 'Téléchargement séquentiel',
        autoTMM: 'Auto TMM',
        shareRatioLimit: 'Share Ratio Limit',
        shareTimeLimit: 'Limite de temps de partage (minutes)',
        downloadLimit: 'Limite de téléchargement',
        uploadLimit: "Limite d'envoi"
      },
      pagePeers: {
        ip: 'IP',
        connection: 'Connexion',
        flags: 'Flags',
        client: 'Client',
        progress: 'Progrès',
        downloadSpeed: 'Vitesse de DL',
        downloaded: 'Téléchargé',
        upSpeed: "Vitesse d'UP",
        uploaded: 'Uploaded',
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
        peers: 'Peers',
        seeds: 'Seeds',
        leeches: 'Leeches',
        downloaded: 'Téléchargé',
        message: 'Message'
      }
    },
    add: {
      title: 'Ajouter un nouveau Torrent',
      selectFiles: 'Sélectionnez vos fichiers',
      urlHint: 'Un lien par ligne',
      downloadDirectory: 'Répertoire de téléchargement',
      starttorrent: 'Lancer le torrent',
      skipHashCheck: 'Sauter la vérification du hachage',
      createSubfolder: 'Créer un sous-dossier',
      automaticTorrentManagement: 'Gestion automatique des torrents',
      dropHereForAdd: 'Déposez ici pour ajouter',
      oneOrMoreFilesInvalidTorrent: 'Un ou plusieurs fichiers ne sont pas des torrents valides.'
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
        peers: 'Peers',
        priority: 'Priorité',
        progress: 'Progrès',
        ratio: 'Ratio',
        size: 'Taille',
        state: 'État',
        uploaded: 'Uploaded',
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
      check: 'Supprimer également les fichiers du stockage'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: 'Connexion réussie! 🎉',
    loginFailed: 'Connexion échouée 😕',
    settingsSaved: 'Paramètres enregistrés avec succès!',
    categorySaved: 'Catégorie modifiée avec succès!'
  },

  /** RightClick **/
  rightClick: {
    resume: 'reprendre',
    forceResume: 'forcer la reprise',
    advanced: {
      advanced: 'avancé',
      changeLocation: 'changer le chemin',
      rename: 'renommer',
      forceRecheck: 'Forcer la revérification',
      forceReannounce: 'Forcer la réannonce',
      sequentialDownload: 'Téléchargement séquentiel',
      firstLastPriority: 'Premièr/dernièr priorité',
      automaticTorrentManagement: 'Gestion automatique de Torrent'
    },
    prio: {
      prio: 'Définir la priorité',
      top: 'Haut',
      bottom: 'basse',
      increase: 'Augmenter',
      decrease: 'Diminuer'
    },
    category: 'Définir la catégorie',
    limit: 'Définir la limite',
    copy: 'copier',
    info: 'afficher les informations'
  }
}

export default locale
