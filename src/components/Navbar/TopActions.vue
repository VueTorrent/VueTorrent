<template>
  <div class="flex-shrink-0 ml-0">
    <v-btn
      id="no-background-hover"
      class="pa-0"
      :ripple="false"
      text
    >
      <v-checkbox
        v-model="$store.state.selectMode"
        class="grey--text"
        color="grey"
        hide-details
        style="width: 5px;"
      />
    </v-btn>
    <v-btn
      text
      small
      fab
      color="grey"
      class="mr-0 ml-0"
      @click="addModal('SortModal')"
    >
      <v-icon color="grey">
        sort
      </v-icon>
    </v-btn>
    <v-btn
      text
      small
      fab
      color="grey"
      class="mr-0 ml-0"
      @click="addModal('SearchModal')"
    >
      <v-icon color="grey">
        search
      </v-icon>
    </v-btn>
    <v-btn
      text
      small
      fab
      color="grey"
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
      text
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
      text
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
      text
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
      text
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
import qbit from '@/services/qbit'
import { mapState } from 'vuex'
import { General } from '@/mixins'

export default {
  name: 'TopActions',
  mixins: [General],
  props: ['showAll'],
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

<style lang="scss">
#no-background-hover::before {
  background-color: transparent !important;
}
#no-background-hover {
  cursor: default !important;
  min-width: 1px;
  margin-right: 2em;
}
</style>
