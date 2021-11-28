const locale = {
  /** General */
  category: 'Catégorie',
  settings: 'Paramètres',
  pause: 'pause',
  delete: 'supprimer',
  save: 'sauver',
  cancel: 'annuler',
  confirm: 'confirmer',

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
    comments: 'commentaires'
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
    }
  },

  /** Modals */
  modals: {
    add: {
      title: 'Ajouter un nouveau Torrent',
      selectFiles: 'Sélectionnez vos fichiers'
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
      rename: 'renommer'
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
