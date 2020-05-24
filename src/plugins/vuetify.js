import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
    icons: {
        iconfont: 'fa'
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
                torrentmodaltext: colors.grey.darken4
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
                torrent_selected: colors.grey,
                background: colors.grey.darken4,
                search: colors.grey.darken3,
                torrentmodaltext: colors.grey.lighten4
            }
        }
    }
})
