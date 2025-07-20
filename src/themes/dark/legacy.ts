import { grey, red } from 'vuetify/util/colors'
import { getVariables } from '@/themes/global'

export default {
  id: 'dark-legacy',
  theme: {
    dark: true,
    colors: {
      primary: '#35495E',
      secondary: '#415c75',
      navbar: '#273845',
      download: '#5BB974',
      background: '#121212',
      selected: grey.darken1,
      red: red.accent3,
      ...getVariables(true),
    },
  },
}
