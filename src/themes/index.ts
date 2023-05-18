export const baseColors = {
  // Main colors
  primary: '#35495e',
  secondary: '#3e556d',
  download: '#64CEAA',
  upload: '#00b3fa',

  // Torrent status colors
  'torrent-done': '#16573e',
  'torrent-downloading': '#5bb974',
  'torrent-fail': '#f83e70',
  'torrent-paused': '#9CA3AF',
  'torrent-queued': '#2e5eaa',
  'torrent-seeding': '#4ecde6',
  'torrent-checking': '#ff7043',
  'torrent-stalled': '#4ADE80',
  'torrent-metadata': '#7e57c2',
  'torrent-moving': '#ffaa2c'
}

export const lightTheme = {
  colors: {
    ...baseColors,
    accent: '#64CEAA',
    background: '#f5f5f5',
    selected: '#e0e0e0',
    red: '#ff5252',
  }
}

export const darkTheme = {
  colors: {
    ...baseColors,
    accent: '#64CEAA',
    background: '#121212',
    selected: '#757575',
    red: '#ff1744',
  }
}