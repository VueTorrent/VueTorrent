import 'vuetify/styles'
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'

// Labs components
import { VDataTable } from 'vuetify/labs/VDataTable'

const variables = {
  // Main colors
  primary: '#35495E',
  secondary: '#3E556D',
  download: '#5BB974',
  upload: '#00B3FA',
  ratio: '#00B2F8',
  state: '#1E9367',
  category: '#04669A',
  tag: '#048B9A',
  tracker: '#C97D09',

  // State filter colors
  'state-downloading': '#5BB974',
  'state-stalled_downloading': '#5BB974',
  'state-seeding': '#4ECDE6',
  'state-stalled_uploading': '#4ECDE6',
  'state-completed': '#16573E',
  'state-resumed': '#BDBDBD',
  'state-active': '#BDBDBD',
  'state-stalled': '#696969',
  'state-paused': '#696969',
  'state-inactive': '#696969',
  'state-checking': '#FF7043',
  'state-moving': '#FFAA2C',
  'state-errored': '#F83E70',

  // Torrent state colors
  'torrent-error': '#F83E70',
  'torrent-missingFiles': '#F83E70',
  'torrent-uploading': '#4E79E6',
  'torrent-forcedUP': '#4E79E6',
  'torrent-pausedUP': '#16573E',
  'torrent-queuedUP': '#2E5EAA',
  'torrent-stalledUP': '#4ECDE6',
  'torrent-checkingUP': '#FF7043',
  'torrent-allocating': '#E5A241',
  'torrent-downloading': '#5BB974',
  'torrent-forcedDL': '#5BB974',
  'torrent-metaDL': '#7E57C2',
  'torrent-pausedDL': '#9CA3AF',
  'torrent-queuedDL': '#2E5EAA',
  'torrent-stalledDL': '#4ADE80',
  'torrent-checkingDL': '#FF7043',
  'torrent-checkingResumeData': '#FF7043',
  'torrent-moving': '#FFAA2C',
  'torrent-unknown': '#000000'
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
    VDataTable
  },
  directives,
  display: {
    mobileBreakpoint: 'sm'
  },
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
