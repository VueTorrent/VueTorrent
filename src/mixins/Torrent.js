import {mapGetters} from 'vuex'

export default {
    props: {
        torrent: Object,
        index: Number,
        length: Number
    },
    computed: {
        ...mapGetters(['getTheme']),
        theme() {
            return this.getTheme() ? 'dark' : 'light'
        },
        state() {
            return this.torrent.state.toLowerCase()
        },
        style() {
            let base = `pa-4 ml-0 sideborder ${this.state} `
            if (this.index === this.length) base += ' bottomBorderRadius'
            if (this.index === 0) base += ' topBorderRadius'
            return base
        },
        phoneLayout() {
            return this.$vuetify.breakpoint.xsOnly
        }
    },
    methods: {
        selectTorrent(hash) {
            if (this.containsTorrent(hash)) {
                this.$store.commit('SET_SELECTED', { type: 'remove', hash })
            } else {
                this.$store.commit('SET_SELECTED', { type: 'add', hash })
            }
        },
        containsTorrent(hash) {
            return this.$store.getters.containsTorrent(hash)
        },
        showInfo(hash) {
            this.createModal('TorrentDetailModal', { hash })
        }
    }
}
