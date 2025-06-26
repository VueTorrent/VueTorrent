import { grey, red } from 'vuetify/util/colors'
import { getVariables } from '@/themes/global'

export default {
  id: 'light-legacy',
  theme: {
    dark: false,
    colors: {
      primary: '#35495E',
      secondary: '#3E556D',
      navbar: '#273845',
      download: '#5BB974',
      background: grey.lighten4,
      selected: grey.lighten2,
      red: red.accent2,
      ...getVariables(false)
    }
  }
}
