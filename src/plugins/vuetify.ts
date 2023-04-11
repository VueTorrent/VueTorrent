/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'vuetify/styles'
import { md3 } from 'vuetify/blueprints'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

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

// @ts-expect-error
import colors from 'vuetify/lib/util/colors'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          accent: '#64CEAA',
          background: colors.grey.lighten4,
          selected: colors.grey.lighten2,
          red: colors.red.accent2,
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
      },
      dark: {
        colors: {
          accent: '#64CEAA',
          background: '#121212',
          selected: colors.grey.darken1,
          red: colors.red.accent3,
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
      }
    }
  }
})
