import colors from 'vuetify/util/colors'
import { getVariables } from '../global'

export default {
  id: 'light-legacy',
  theme: {
    dark: false,
    colors: {
      primary: '#35495E',
      secondary: '#3E556D',
      navbar: '#273845',
      download: '#5BB974',
      background: colors.grey.lighten4,
      selected: colors.grey.lighten2,
      red: colors.red.accent2,
      ...getVariables(false)
    }
  }
}
