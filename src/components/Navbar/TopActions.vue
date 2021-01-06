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
        {{ $store.state.selectMode ? 'check_box' : 'check_box_outline_blank' }}
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
        sort
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
        search
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
        add
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
        remove
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
        play_arrow
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
        pause
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
        settings
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { General } from '@/mixins'
import { mapState } from 'vuex'
import qbit from '@/services/qbit'

export default {
  name: 'TopActions',
  mixins: [General],
  props: ['mobile', 'showAll'],
  data() {
    return {
      fab: false
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
