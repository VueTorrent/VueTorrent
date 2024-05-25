import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'

const statusColors = {
  enabled: '#4F738D',
  disabled: '#35495E'
}

const variables = {
  // Main colors
  accent: '#64CEAA',
  upload: '#00B3FA',
  ratio: '#00B2F8',
  category: '#04669A',
  tag: '#048B9A',
  tracker: '#C97D09',
  'ratio-bad': '#eb2a2a',
  'ratio-almost': '#e78310',
  'ratio-good': '#36bd58',
  'ratio-best': '#2e78d8',

  // Active filters chip colors
  'active-global': statusColors.enabled,
  'active-global-disabled': statusColors.disabled,
  'active-text': statusColors.enabled,
  'active-text-disabled': statusColors.disabled,
  'active-status': statusColors.enabled,
  'active-status-disabled': statusColors.disabled,
  'active-category': '#04669A',
  'active-category-disabled': '#02334d',
  'active-tag': '#048B9A',
  'active-tag-disabled': '#03464f',
  'active-tracker': '#C97D09',
  'active-tracker-disabled': '#6d4504',

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
  'torrent-forcedMetaDL': '#7E57C2',
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
    primary: '#35495E',
    secondary: '#3E556D',
    navbar: '#273845',
    download: '#5BB974',
    background: colors.grey.lighten4,
    selected: colors.grey.lighten2,
    red: colors.red.accent2,
    ...variables
  }
}

const altLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#28483E',
    secondary: '#306052',
    navbar: '#28483E',
    download: '#7ACA47',
    background: colors.grey.lighten4,
    selected: colors.grey.lighten2,
    red: colors.red.accent2,
    ...variables
  }
}

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#35495E',
    secondary: '#415c75',
    navbar: '#273845',
    download: '#5BB974',
    background: '#121212',
    selected: colors.grey.darken1,
    red: colors.red.accent3,
    ...variables
  }
}

const altDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#28483E',
    secondary: '#306052',
    navbar: '#28483E',
    download: '#7ACA47',
    background: '#121212',
    selected: colors.grey.darken1,
    red: colors.red.accent3,
    ...variables
  }
}

export enum Theme {
  LIGHT = 'lightTheme',
  ALT_LIGHT = 'altLightTheme',
  DARK = 'darkTheme',
  ALT_DARK = 'altDarkTheme'
}

export default createVuetify({
  components,
  directives,
  display: {
    mobileBreakpoint: 'sm'
  },
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: Theme.ALT_DARK,
    variations: {
      colors: [
        'torrent-error',
        'torrent-missingFiles',
        'torrent-uploading',
        'torrent-forcedUP',
        'torrent-pausedUP',
        'torrent-queuedUP',
        'torrent-stalledUP',
        'torrent-checkingUP',
        'torrent-allocating',
        'torrent-downloading',
        'torrent-forcedDL',
        'torrent-metaDL',
        'torrent-forcedMetaDL',
        'torrent-pausedDL',
        'torrent-queuedDL',
        'torrent-stalledDL',
        'torrent-checkingDL',
        'torrent-checkingResumeData',
        'torrent-moving',
        'torrent-unknown'
      ],
      lighten: 3,
      darken: 3
    },
    themes: {
      lightTheme,
      altLightTheme,
      darkTheme,
      altDarkTheme
    }
  }
})
