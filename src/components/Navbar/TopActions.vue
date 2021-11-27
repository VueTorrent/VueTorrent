<template>
  <div :class="mobile ? '' : 'flex-shrink-0 ml-0'">
    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-btn
          :text="!mobile"
          small
          fab
          color="grey--text"
          class="mr-0 ml-0"
          :aria-label="$t('navbar.topActions.addTorrent')"
          v-on="on"
          @click="addModal('AddModal')"
        >
          <v-icon color="grey">
            {{ mdiPlus }}
          </v-icon>
        </v-btn>
      </template>
      <span> {{ $t('navbar.topActions.addTorrent') | titleCase }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-btn
          small
          fab
          :text="!mobile"
          class="mr-0 ml-0"
          :aria-label="$t('navbar.topActions.resumeSelected')"
          v-on="on"
          @click="resumeTorrents"
        >
          <v-icon color="grey">
            {{ mdiPlay }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('navbar.topActions.resumeSelected') | titleCase }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-btn
          small
          fab
          :text="!mobile"
          class="mr-0 ml-0"
          :aria-label="$t('navbar.topActions.pauseSelected')"
          v-on="on"
          @click="pauseTorrents"
        >
          <v-icon color="grey">
            {{ mdiPause }}
          </v-icon>
        </v-btn>
      </template>
      <span> {{ $t('navbar.topActions.pauseSelected') | titleCase }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-btn
          small
          fab
          :text="!mobile"
          class="mr-0 ml-0"
          :aria-label="$t('navbar.topActions.removeSelected')"
          v-on="on"
          @click="removeTorrents"
        >
          <v-icon color="grey">
            {{ mdiDelete }}
          </v-icon>
        </v-btn>
      </template>
      <span> {{ $t('navbar.topActions.removeSelected') | titleCase }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-btn
          :text="!mobile"
          small
          fab
          color="grey--text"
          class="mr-0 ml-0"
          :aria-label="$t('navbar.topActions.searchNew')"
          v-on="on"
          @click="addModal('SearchModal')"
        >
          <v-icon color="grey">
            {{ mdiSearchWeb }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('navbar.topActions.searchNew') | titleCase }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-btn
          small
          fab
          :text="!mobile"
          class="mr-0 ml-0"
          :aria-label="$t('navbar.topActions.openSettings')"
          v-on="on"
          @click="addModal('SettingsModal')"
        >
          <v-icon color="grey">
            {{ mdiCog }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('navbar.topActions.openSettings') | titleCase }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import { General } from '@/mixins'
import { mapState } from 'vuex'
import qbit from '@/services/qbit'
import {
  mdiSort, mdiCog, mdiCheckboxBlankOutline, mdiCheckboxMarked,
  mdiSearchWeb, mdiDelete, mdiPlus, mdiPlay, mdiPause
} from '@mdi/js'

export default {
  name: 'TopActions',
  mixins: [General],
  props: ['mobile'],
  data() {
    return {
      fab: false,
      mdiSort,
      mdiPlus,
      mdiSearchWeb,
      mdiPlay,
      mdiPause,
      mdiDelete,
      mdiCog,
      mdiCheckboxMarked,
      mdiCheckboxBlankOutline
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
    }
  }
}
</script>
