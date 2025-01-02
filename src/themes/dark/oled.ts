import colors from 'vuetify/util/colors'
import { getVariables } from '../global'

export default {
  id: 'dark-oled',
  theme: {
    dark: true,
    colors: {
      primary: '#35495E',
      secondary: '#415c75',
      navbar: '#273845',
      download: '#5BB974',
      background: '#121212',
      selected: colors.grey.darken1,
      red: colors.red.accent3,
      ...getVariables(true)
    }
  }
}
