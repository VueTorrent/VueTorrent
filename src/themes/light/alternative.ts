import { type ThemeDefinition } from 'vuetify'
import colors from 'vuetify/lib/util/colors'
import { variables } from '../global'

const theme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#28483E',
    secondary: '#306052',
    navbar: '#28483E',
    download: '#7ACA47',
    background: colors.grey.lighten4,
    selected: colors.grey.lighten2,
    red: colors.red.accent2,
    ...variables
  }
}

export default theme