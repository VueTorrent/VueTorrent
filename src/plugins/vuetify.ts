import 'vuetify/styles'
import {createVuetify, ThemeDefinition} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'

// Labs components
import { VDataTable } from 'vuetify/labs/VDataTable'

const variables = {
  // Main colors
  primary: '#35495e',
  secondary: '#3e556d',
  download: '#64CEAA',
  upload: '#00b3fa',
  ratio: '#00b2f8',
  state: '#1e9367',
  category: '#04669a',
  tags: '#048b9a',
  tracker: '#1eb9ac',
  // Torrent status colors
  'torrent-done': '#16573e',
  'torrent-downloading': '#5bb974',
  'torrent-fail': '#f83e70',
  'torrent-errored': '#f83e70',
  'torrent-paused': '#9CA3AF',
  'torrent-queued': '#2e5eaa',
  'torrent-seeding': '#4ecde6',
  'torrent-checking': '#ff7043',
  'torrent-stalled': '#4ADE80',
  'torrent-metadata': '#7e57c2',
  'torrent-moving': '#ffaa2c'
}

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    accent: '#64CEAA',
    background: colors.grey.lighten4,
    selected: colors.grey.lighten2,
    red: colors.red.accent2,
    ...variables
  }
}

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    accent: '#64CEAA',
    background: '#121212',
    selected: colors.grey.darken1,
    red: colors.red.accent3,
    ...variables
  }
}

export enum Theme {
  LIGHT = 'lightTheme',
  DARK = 'darkTheme'
}

export default createVuetify({
  components: {
    ...components,
    VDataTable,
  },
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: Theme.LIGHT,
    themes: {
      lightTheme,
      darkTheme
    }
  }
})