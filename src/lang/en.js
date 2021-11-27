const locale = {
  /** General */
  category: 'category',
  settings: 'settings',

  /** Torrent */
  torrent: {
    title: 'title',
    added: 'added on',
    availability: 'availability',
    size: 'size',
    progress: 'progress'
  },
  /** Navbar */
  navbar: {
    currentSpeed: 'current speed',
    freeSpace: 'free space',
    topActions: {
      addTorrent: 'add torrent',
      resumeSelected: 'resume selected torrents',
      pauseSelected: 'pause selected torrents',
      removeSelected: 'remove selected torrents',
      openSettings: 'open settings',
      searchNew: 'search new torrent'
    }
  },

  /** Modals */
  modals: {
    add: {
      title: 'Add a new Torrent',
      selectFiles: 'Select your files'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: 'Successfully logged in! 🎉',
    loginFailed: 'Login failed 😕',
    settingsSaved: 'Settings saved successfully!',
    categorySaved: 'Category edited successfully!'
  },

  /** RightClick **/
  rightClick: {
    resume: 'resume',
    forceResume: 'force resume',
    pause: 'pause',
    delete: 'delete',
    advanced: {
      advanced: 'advanced',
      changeLocation: 'change location',
      rename: 'rename'
    },
    prio: {
      prio: 'set priority',
      top: 'top',
      bottom: 'bottom',
      increase: 'increase',
      decrease: 'decrease'
    },
    category: 'set category',
    limit: 'set limit',
    copy: 'copy',
    info: 'show info'
  }
}

export default locale
