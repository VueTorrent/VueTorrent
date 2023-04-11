import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
// import colors from 'vuetify/lib/util/colors'


// import variables from '@/styles/colors.scss'
// broke the variable import when updating deps
const variables = {
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

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdiSvg',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          accent: '#64CEAA',
          // background: color.grey.lighten4,
          // selected: colors.grey.lighten2,
          // red: colors.red.accent2,
          ...variables
        }
      },
      dark: {
        colors: {
          accent: '#64CEAA',
          background: '#121212',
          // selected: colors.grey.darken1,
          // red: colors.red.accent3,
          ...variables
        }
      }
    }
  }
})

export default vuetify
