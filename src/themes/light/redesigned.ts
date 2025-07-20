import { grey, red } from 'vuetify/util/colors'
import { getVariables } from '@/themes/global'

export default {
  id: 'light-redesigned',
  theme: {
    dark: false,
    colors: {
      primary: '#28483E',
      secondary: '#306052',
      navbar: '#28483E',
      download: '#7ACA47',
      background: grey.lighten4,
      selected: grey.lighten2,
      red: red.accent2,
      ...getVariables(false),
    },
  },
}
