import 'vuetify/styles'
import themes, { DarkRedesigned } from '@/themes'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { VTimePicker } from 'vuetify/labs/VTimePicker'

export default createVuetify({
  components: {
    ...components,
    VTimePicker
  },
  directives,
  display: {
    mobileBreakpoint: 'sm'
  },
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: DarkRedesigned.id,
    variations: {
      colors: [
        'primary',
        'secondary',
        'torrent-allocating',
        'torrent-checking_disk',
        'torrent-checking_resume_data',
        'torrent-dl_forced',
        'torrent-dl_stopped',
        'torrent-dl_queued',
        'torrent-dl_stalled',
        'torrent-downloading',
        'torrent-error',
        'torrent-forced_meta_download',
        'torrent-meta_download',
        'torrent-missing_files',
        'torrent-moving',
        'torrent-ul_forced',
        'torrent-ul_stopped',
        'torrent-ul_queued',
        'torrent-ul_stalled',
        'torrent-unknown',
        'torrent-uploading'
      ],
      lighten: 3,
      darken: 3
    },
    themes
  }
})
