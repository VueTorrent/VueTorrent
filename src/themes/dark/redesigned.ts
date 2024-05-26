import colors from 'vuetify/lib/util/colors'
import { variables } from '../global'

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
      selected: colors.grey.darken1,
      red: colors.red.accent3,
      ...variables
    }
  }
}