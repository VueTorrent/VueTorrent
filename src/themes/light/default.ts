import { type ThemeDefinition } from 'vuetify'
import colors from 'vuetify/lib/util/colors'
import { variables } from '../global'

export const theme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#35495E',
    secondary: '#3E556D',
    navbar: '#273845',
    download: '#5BB974',
    background: colors.grey.lighten4,
    selected: colors.grey.lighten2,
    red: colors.red.accent2,
    ...variables
  }
}

export default theme