import { type ThemeDefinition } from 'vuetify'
import colors from 'vuetify/lib/util/colors'
import { variables } from '../global'

const theme: ThemeDefinition = {
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

export default theme