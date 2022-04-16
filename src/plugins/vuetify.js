import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

import colors from 'vuetify/lib/util/colors'

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

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg'
  },
  theme: {
    options: {
      customProperties: true
    },
    dark: false,
    themes: {
      light: {
        accent: variables.download,
        background: colors.grey.lighten4,
        selected: colors.grey.lighten2,
        red: colors.red.accent2,
        ...variables
      },
      dark: {
        accent: variables.download,
        background: colors.black,
        selected: colors.grey.darken1,
        red: colors.red.accent3,
        ...variables
      }
    }
  }
})
