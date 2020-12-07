<template>
    <v-row justify="space-between">
        <v-col>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-list-item v-on="on" @click="logout" link>
                        <v-icon class="white--text">exit_to_app</v-icon>
                    </v-list-item>
                </template>
                <span>Log out</span>
            </v-tooltip>
        </v-col>
        <v-col>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-list-item v-on="on" @click="toggleSpeed" link>
                        <v-icon
                            :color="altSpeed ? 'download' : ''"
                            class="white--text"
                            >speed</v-icon
                        >
                    </v-list-item>
                </template>
                <span>Alt speeds</span>
            </v-tooltip>
        </v-col>
        <v-col>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-list-item v-on="on" @click="toggleTheme" link>
                        <v-icon v-if="theme === 'Light'" class="white--text"
                            >brightness_7</v-icon
                        >
                        <v-icon v-else class="white--text"
                            >brightness_2</v-icon
                        >
                    </v-list-item>
                </template>
                <span>{{ theme }}</span>
            </v-tooltip>
        </v-col>
    </v-row>
</template>

<script>
import qbit from '@/services/qbit'
import { mapGetters } from 'vuex'

export default {
    name: 'BottomActions',
    methods: {
        logout() {
            this.$store.commit('LOGOUT')
            this.$router.push('/login')
        },
        toggleSpeed() {
            qbit.toggleSpeedLimitsMode()
        },
        toggleTheme() {
            this.$store.commit('TOGGLE_THEME')
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        }
    },
    computed: {
        ...mapGetters(['getTheme', 'getStatus']),
        theme() {
            return this.getTheme() ? 'Dark' : 'Light'
        },
        altSpeed() {
            const status = this.getStatus()
            if (status && status.altSpeed) return status.altSpeed

            return null
        }
    }
}
</script>

<style lang="scss" scoped>
.justify-space-between {
    bottom: 0px;
    padding: 10px;
}
</style>
