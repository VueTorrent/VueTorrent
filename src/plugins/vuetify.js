import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

//import colors from 'vuetify/lib/util/colors'
import variables from '../styles/variables.scss'

Vue.use(Vuetify)

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
        primary: '#35495e',
        secondary: '#3e556d',
        download: '#64CEAA',
        upload: '#00b3fa',
        ...variables
      },
      dark: {
        primary: '#35495e',
        secondary: '#3e556d',
        download: '#64CEAA',
        upload: '#00b3fa',
        ...variables
      }
    }
  }
})
