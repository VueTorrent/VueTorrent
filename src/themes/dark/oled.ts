import colors from 'vuetify/util/colors'
//import { getVariables } from '../global'
import DarkLegacy from './legacy'

export default {
  id: 'dark-oled',
  theme: {
    dark: true,
    colors: {
      ...DarkLegacy.theme.colors,
      'torrent-ul_stalled': colors.blue.darken4,
      'torrent-uploading': colors.teal.darken2
    }
  }
}
