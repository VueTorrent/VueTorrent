<template>
  <div :class="mobile ? '' : 'flex-shrink-0 ml-0'">
    <v-btn
      :text="!mobile"
      small
      fab
      class="mr-0 ml-0"
      @click="$store.state.selectMode = !$store.state.selectMode"
    >
      <v-icon color="grey">
        {{ $store.state.selectMode ? mdiCheckboxMarked : mdiCheckboxBlankOutline }}
      </v-icon>
    </v-btn>
    <v-btn
      :text="!mobile"
      small
      fab
      class="mr-0 ml-0"
      @click="addModal('SortModal')"
    >
      <v-icon color="grey">
        {{ mdiSort }}
      </v-icon>
    </v-btn>
    <v-btn
      :text="!mobile"
      small
      fab
      color="grey--text"
      class="mr-0 ml-0"
      @click="addModal('SearchModal')"
    >
      <v-icon color="grey">
        {{ mdiSearchWeb }}
      </v-icon>
    </v-btn>
    <v-btn
      :text="!mobile"
      small
      fab
      color="grey--text"
      class="mr-0 ml-0"
      @click="addModal('AddModal')"
    >
      <v-icon color="grey">
        {{ mdiPlus }}
      </v-icon>
    </v-btn>
    <v-btn
      v-if="showAll"
      small
      fab
      :text="!mobile"
      class="mr-0 ml-0"
      @click="removeTorrents"
    >
      <v-icon color="grey">
        {{ mdiDelete }}
      </v-icon>
    </v-btn>
    <v-btn
      v-if="showAll"
      small
      fab
      :text="!mobile"
      class="mr-0 ml-0"
      @click="resumeTorrents"
    >
      <v-icon color="grey">
        {{ mdiPlay }}
      </v-icon>
    </v-btn>
    <v-btn
      v-if="showAll"
      small
      fab
      :text="!mobile"
      class="mr-0 ml-0"
      @click="pauseTorrents"
    >
      <v-icon color="grey">
        {{ mdiPause }}
      </v-icon>
    </v-btn>
    <v-btn
      small
      fab
      :text="!mobile"
      class="mr-0 ml-0"
      @click="addModal('SettingsModal')"
    >
      <v-icon color="grey">
        {{ mdiCog }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { General } from '@/mixins'
import { mapState } from 'vuex'
import qbit from '@/services/qbit'
import {
  mdiCheckboxBlankOutline, mdiCheckboxMarked, mdiSort, mdiCog,
  mdiSearchWeb, mdiDelete, mdiPlus, mdiPlay, mdiPause
} from '@mdi/js'

export default {
  name: 'TopActions',
  mixins: [General],
  props: ['mobile', 'showAll'],
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
      mdiCheckboxBlankOutline,
      mdiCheckboxMarked
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
