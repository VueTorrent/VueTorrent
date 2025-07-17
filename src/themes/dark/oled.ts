import { blue, teal } from 'vuetify/util/colors'
import DarkLegacy from './legacy'

export default {
  id: 'dark-oled',
  theme: {
    dark: true,
    colors: {
      ...DarkLegacy.theme.colors,
      'torrent-ul_stalled': blue.darken4,
      'torrent-uploading': teal.darken2,
    },
  },
}
