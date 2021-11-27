const locale = {
  /** General */
  category: 'categorie',
  settings: 'instellingen',
  pause: 'pauzeer',
  delete: 'verwijder',
  save: 'opslaan',
  cancel: 'annuleren',
  confirm: 'bevestig',


  /** Torrent */
  torrent: {
    title: 'titel',
    added: 'toegevoegd op',
    size: 'grootte',
    progress: 'vooruitgang',
    directory: 'map',
    downloaded: 'gedownload',
    uploaded: 'geüpload',
    created: 'gemaakt door',
    comments: 'opmerkingen'
  },

  /** Navbar */
  navbar: {
    currentSpeed: 'huidige snelheid',
    freeSpace: 'vrije ruimte',
    topActions: {
      addTorrent: 'voeg torrent toe',
      resumeSelected: 'hervat geselecteerde torrents',
      pauseSelected: 'pauzeer geselecteerde torrents',
      removeSelected: 'verwijder geselecteerde torrents',
      openSettings: 'open instellingen',
      searchNew: 'zoek nieuwe torrent'
    },
    sessionStats: {
      tooltip: 'Sinds qBitorrent is opgestart'
    }
  },

  /** Modals */
  modals: {
    add: {
      title: 'Voeg torrent toe',
      selectFiles: 'Selecteer bestanden'
    },
    delete: {
      check: 'Ook bestanden verwijderen'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: 'Inloggen gelukt! 🎉',
    loginFailed: 'Inloggen mislukt 😕',
    settingsSaved: 'Instellingen successvol opgeslagen!',
    categorySaved: 'Categorie successvol opgeslagen!'
  },

  /** RightClick **/
  rightClick: {
    resume: 'hervat',
    forceResume: 'geforceerd hervatten',
    advanced: {
      advanced: 'geavanceerd',
      changeLocation: 'verander locatie',
      rename: 'hernoem'
    },
    prio: {
      prio: 'zet prioriteit',
      top: 'top',
      bottom: 'bottom',
      increase: 'verhoog',
      decrease: 'verlaag'
    },
    category: 'zet categorie',
    limit: 'zet limiet',
    copy: 'kopieer',
    info: 'toon info'
  }
}

export default locale
