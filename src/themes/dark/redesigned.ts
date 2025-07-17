import { grey, red } from 'vuetify/util/colors'
import { getVariables } from '@/themes/global'

export default {
  id: 'dark-redesigned',
  theme: {
    dark: true,
    colors: {
      primary: '#28483E',
      secondary: '#306052',
      navbar: '#28483E',
      download: '#7ACA47',
      background: '#121212',
      selected: grey.darken1,
      red: red.accent3,
      ...getVariables(true),
    },
  },
}
