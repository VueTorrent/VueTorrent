<template>
  <div :class="mobile ? '' : 'flex-shrink-0 ml-0'">
    <v-tooltip v-if="!mobile" bottom open-delay="400">
      <template #activator="{ on }">
        <v-btn small fab :text="!mobile" class="mr-0 ml-0" :aria-label="$t('navbar.topActions.addTorrent')" v-on="on" @click="createModal('AddModal')">
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
        <v-btn :text="!mobile" small fab color="grey--text" class="mr-0 ml-0" :aria-label="$t('navbar.topActions.searchNew')" v-on="on" @click="goToSearch">
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
        <v-btn :text="!mobile" small fab color="grey--text" class="mr-0 ml-0" :aria-label="$t('navbar.topActions.logs')" v-on="on" @click="goToLogs">
          <v-icon color="grey">
            {{ mdiFileDocumentMultiple }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('navbar.topActions.logs') }}</span>
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { General } from '@/mixins'
import qbit from '@/services/qbit'
import {
  mdiSort,
  mdiCog,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarked,
  mdiSearchWeb,
  mdiDelete,
  mdiPlus,
  mdiPlay,
  mdiPause,
  mdiRss,
  mdiFileDocumentMultiple,
  mdiPower
} from '@mdi/js'

export default defineComponent({
  name: 'TopActions',
  mixins: [General],
  props: {
    mobile: Boolean
  },
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
      mdiSort,
      mdiFileDocumentMultiple
    }
  },
  computed: {
    ...mapState(['selected_torrents']),
    isOnTorrentDetail() {
      return this.$route.name === 'torrentDetail'
    },
    hashes(): string[] {
      return this.isOnTorrentDetail ? [this.$route.params.hash] : this.selected_torrents
    }
  },
  methods: {
    async pauseTorrents() {
      await qbit.pauseTorrents(this.hashes)
    },
    async resumeTorrents() {
      await qbit.resumeTorrents(this.hashes)
    },
    removeTorrents() {
      if (!this.hashes.length) return

      return this.createModal('ConfirmDeleteModal', { hashes: this.hashes })
    },
    goToSearch() {
      if (this.$route.name !== 'search') this.$router.push({ name: 'search' })
    },
    goToRss() {
      if (this.$route.name !== 'rss') this.$router.push({ name: 'rss' })
    },
    goToLogs() {
      if (this.$route.name !== 'logs') this.$router.push({ name: 'logs' })
    },
    goToSettings() {
      if (this.$route.name !== 'settings') this.$router.push({ name: 'settings' })
    }
  }
})
</script>
