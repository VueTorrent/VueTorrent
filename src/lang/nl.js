const locale = {
  /** General */
  category: 'categorie',
  settings: 'instellingen',

  /** Torrent */
  torrent: {
    title: 'titel',
    added: 'toegevoegd op',
    size: 'grootte',
    progress: 'vooruitgang'
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
    }
  },

  /** Modals */
  modals: {
    add: {
      title: 'Voeg torrent toe',
      selectFiles: 'Selecteer bestanden'
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
    pause: 'pauzeer',
    delete: 'verwijder',
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
