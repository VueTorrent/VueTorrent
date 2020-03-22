import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#35495e',
    secondary: '#3e556d',
    secondary_lighter: '#56718c',
    blue_accent: '#3cd1c2',
    info: '#ffaa2c',
    error: '#f83e70',
    green_accent: '#3cd1c2',
    download: '#64CEAA',
    upload: '#00b3fa',
  },
})
