import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'
import variables from '@/styles/colors.scss'

Vue.use(Vuetify)

console.log(variables)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg'
  },
  theme: {
    options: {
      customProperties: true
    },
    dark: false,
    themes: {
      light: {
        accent: variables.download,
        background: colors.grey.lighten4,
        selected: colors.grey.lighten2,
        red: colors.red.accent2,
        ...variables
      },
      dark: {
        accent: variables.download,
        background: colors.black,
        selected: colors.grey.darken1,
        red: colors.red.accent3,
        ...variables
      }
    }
  }
})
