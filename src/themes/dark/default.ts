import { type ThemeDefinition } from 'vuetify'
import colors from 'vuetify/lib/util/colors'
import { variables } from '../global'

const theme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#35495E',
    secondary: '#415c75',
    navbar: '#273845',
    download: '#5BB974',
    background: '#121212',
    selected: colors.grey.darken1,
    red: colors.red.accent3,
    ...variables
  }
}

export default theme