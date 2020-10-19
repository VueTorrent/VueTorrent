import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import colors from 'vuetify/lib/util/colors'
import variables from '../styles/variables.scss'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        dark: false,
        themes: {
            light: {
                primary: '#35495e',
                secondary: '#3e556d',
                secondary_lighter: '#56718c',
                blue_accent: '#3cd1c2',
                info: '#ffaa2c',
                error: '#f83e70',
                green_accent: '#3cd1c2',
                download: '#64CEAA',
                upload: '#00b3fa',
                torrent: '#fff',
                torrent_selected: colors.grey.lighten2,
                background: colors.grey.lighten4,
                search: colors.grey.darken1,
                torrentmodaltext: colors.grey.darken4,
                select: colors.grey.lighten4,
                ...variables
            },
            dark: {
                primary: '#35495e',
                secondary: '#3e556d',
                secondary_lighter: '#56718c',
                blue_accent: '#3cd1c2',
                info: '#ffaa2c',
                error: '#f83e70',
                green_accent: '#3cd1c2',
                download: '#64CEAA',
                upload: '#00b3fa',
                torrent: colors.grey.darken3,
                torrent_selected: colors.blueGrey.darken1,
                background: colors.grey.darken4,
                search: colors.grey.darken3,
                torrentmodaltext: colors.grey.lighten4,
                select: colors.grey.darken3,
                ...variables
            }
        }
    }
})
