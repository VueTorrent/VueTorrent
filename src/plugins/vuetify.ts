import 'vuetify/styles'
import { DarkTheme, LightTheme } from '@/constants/vuetorrent'
import { DarkAlternative, DarkDefault, LightAlternative, LightDefault } from '@/themes'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

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
    defaultTheme: DarkTheme.ALT,
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
      [LightTheme.DEFAULT]: LightDefault,
      [LightTheme.ALT]: LightAlternative,
      [DarkTheme.DEFAULT]: DarkDefault,
      [DarkTheme.ALT]: DarkAlternative
    }
  }
})
