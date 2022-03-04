const locale = {
  /** General */
  category: 'categoría',
  settings: 'ajustes',
  pause: 'pausar',
  delete: 'borrar',
  save: 'guardar',
  cancel: 'cancelar',
  confirm: 'confirmar',

  /** Torrent */
  torrent: {
    title: 'título',
    added: 'agregado el',
    availability: 'disponibilidad',
    size: 'tamaño',
    progress: 'progreso',
    directory: 'directorio',
    downloaded: 'descargado',
    uploaded: 'subido',
    created: 'creado por',
    comments: 'comentarios'
  },
  /** Navbar */
  navbar: {
    currentSpeed: 'velocidad actual',
    freeSpace: 'espacio libre',
    topActions: {
      addTorrent: 'agregar torrrent',
      resumeSelected: 'resumir torrents seleccionados',
      pauseSelected: 'pausar torrents seleccionados',
      removeSelected: 'quitar torrents seleccionados',
      openSettings: 'abrir ajustes',
      searchNew: 'buscar nuevo torrent'
    },
    sessionStats: {
      tooltip: 'Desde la última vez que se reinició qBittorrent'
    }
  },

  /** Modals */
  modals: {
    add: {
      title: 'Agregar nuevo torrent',
      selectFiles: 'Selecciona tus archivos'
    },
    delete: {
      check: 'También borrar archivos del disco'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: '¡Inicio de sesión correcto! 🎉',
    loginFailed: 'Inicio de sesión fallido 😕',
    settingsSaved: '¡Los ajustes se guardaron correctamente!',
    categorySaved: '¡Categoría guardada correctamente!'
  },

  /** RightClick **/
  rightClick: {
    resume: 'reanudar',
    forceResume: 'forzar reanudado',
    advanced: {
      advanced: 'avanzado',
      changeLocation: 'cambiar directorio',
      rename: 'renombrar'
    },
    prio: {
      prio: 'prioridad',
      top: 'arriba',
      bottom: 'abajo',
      increase: 'incrementar',
      decrease: 'reducir'
    },
    category: 'categoría',
    limit: 'poner límite',
    copy: 'copiar',
    info: 'mostrar información'
  }
}

export default locale
