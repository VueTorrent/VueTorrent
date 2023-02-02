<template>
  <div :class="mobile ? '' : 'flex-shrink-0 ml-0'">
    <v-tooltip bottom open-delay="400">
      <template #activator="{ on }">
        <v-btn :text="!mobile" small fab color="grey--text" class="mr-0 ml-0" :aria-label="$t('navbar.topActions.addTorrent')" v-on="on" @click="addModal('AddModal')">
          <v-icon color="grey">
            {{ mdiPlus }}
          </v-icon>
        </v-btn>
      </template>
      <span> {{ $t('navbar.topActions.addTorrent') }}</span>
    </v-tooltip>
    <v-tooltip bottom open-delay="400">
      <template #activator="{ on }">
        <v-btn small fab :text="!mobile" class="mr-0 ml-0" :aria-label="$t('navbar.topActions.resumeSelected')" v-on="on" @click="resumeTorrents">
          <v-icon color="grey">
            {{ mdiPlay }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('navbar.topActions.resumeSelected') }}</span>
    </v-tooltip>
    <v-tooltip bottom open-delay="400">
      <template #activator="{ on }">
        <v-btn small fab :text="!mobile" class="mr-0 ml-0" :aria-label="$t('navbar.topActions.pauseSelected')" v-on="on" @click="pauseTorrents">
          <v-icon color="grey">
            {{ mdiPause }}
          </v-icon>
        </v-btn>
      </template>
      <span> {{ $t('navbar.topActions.pauseSelected') }}</span>
    </v-tooltip>
    <v-tooltip bottom open-delay="400">
      <template #activator="{ on }">
        <v-btn :text="!mobile" small fab class="mr-0 ml-0" :aria-label="$t('navbar.topActions.removeSelected')" v-on="on" @click="removeTorrents">
          <v-icon color="grey">
            {{ mdiDelete }}
          </v-icon>
        </v-btn>
      </template>
      <span> {{ $t('navbar.topActions.removeSelected') }}</span>
    </v-tooltip>
    <v-tooltip bottom open-delay="400">
      <template #activator="{ on }">
        <v-btn :text="!mobile" small fab color="grey--text" class="mr-0 ml-0" :aria-label="$t('navbar.topActions.searchNew')" v-on="on" @click="addModal('SearchModal')">
          <v-icon color="grey">
            {{ mdiSearchWeb }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('navbar.topActions.searchNew') }}</span>
    </v-tooltip>
    <v-tooltip bottom open-delay="400">
      <template #activator="{ on }">
        <v-btn :text="!mobile" small fab color="grey--text" class="mr-0 ml-0" :aria-label="$t('navbar.topActions.rssArticles')" v-on="on" @click="goToRss">
          <v-icon color="grey">
            {{ mdiRss }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('navbar.topActions.rssArticles') }}</span>
    </v-tooltip>
    <v-tooltip bottom open-delay="400">
      <template #activator="{ on }">
        <v-btn small fab :text="!mobile" class="mr-0 ml-0" :aria-label="$t('navbar.topActions.openSettings')" v-on="on" @click="goToSettings">
          <v-icon color="grey">
            {{ mdiCog }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('navbar.topActions.openSettings') }}</span>
    </v-tooltip>
    <v-tooltip bottom open-delay="400">
      <template #activator="{ on }">
        <v-btn :text="!mobile" small fab color="grey--text" class="mr-0 ml-0" :aria-label="$t('navbar.topActions.shutdownApp')" v-on="on" @click="shutdownApplication">
          <v-icon color="grey">
            {{ mdiPower }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('navbar.topActions.shutdownApp') }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import { General } from '@/mixins'
import { mapState } from 'vuex'
import qbit from '@/services/qbit'
import { mdiSort, mdiCog, mdiCheckboxBlankOutline, mdiCheckboxMarked, mdiSearchWeb, mdiDelete, mdiPlus, mdiPlay, mdiPause, mdiRss, mdiPower } from '@mdi/js'

export default {
  name: 'TopActions',
  mixins: [General],
  props: ['mobile'],
  data() {
    return {
      fab: false,
      mdiCheckboxBlankOutline,
      mdiCheckboxMarked,
      mdiCog,
      mdiDelete,
      mdiPause,
      mdiPlay,
      mdiPlus,
      mdiPower,
      mdiRss,
      mdiSearchWeb,
      mdiSort
    }
  },
  computed: {
    ...mapState(['selected_torrents'])
  },
  methods: {
    pauseTorrents() {
      qbit.pauseTorrents(this.selected_torrents)
    },
    resumeTorrents() {
      qbit.resumeTorrents(this.selected_torrents)
    },
    removeTorrents() {
      if (!this.selected_torrents.length) return

      return this.createModal('ConfirmDeleteModal')
    },
    addModal(name) {
      this.createModal(name)
    },
    goToRss() {
      if (this.$route.name !== 'rss') this.$router.push({ name: 'rss' })
    },
    goToSettings() {
      if (this.$route.name !== 'settings') this.$router.push({ name: 'settings' })
    },
    async shutdownApplication() {
      if (!await qbit.shutdownApp()) {
        this.$toast.error(this.$t('toast.shutdownError').toString())
        return
      }

      this.$store.state.authenticated = false
      await this.$router.push({name: 'login'})
      this.$toast.success(this.$t("toast.shutdownSuccess").toString())
    }
  }
}
</script>
