<template>
  <v-card
    flat
    :style="{ minHeight: phoneLayout ? '' : '75vh', maxHeight: '75vh' }"
  >
    <v-card-text class="pa-0">
      <perfect-scrollbar>
        <v-data-table
          v-if="trackers"
          v-model="selectedTrackers"
          show-select
          :headers="headers"
          :items="trackers"
          item-key="url"
          :style="{ minHeight: phoneLayout ? '' : '70vh', maxHeight: '70vh' }"
        >
          <template #body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.url">
                <td>
                  <v-checkbox
                    v-if="typeof item.tier === 'number'"
                    v-model="selectedTrackers"
                    :value="item"
                    class="pa-0 mb-0"
                    color="accent" 
                  />
                </td>
                <td>{{ item.tier }}</td>
                <td>{{ item.url }}</td>
                <td>{{ item.status | formatTrackerStatus }}</td>
                <td>{{ item.num_peers | formatTrackerNum }}</td>
                <td>{{ item.num_seeds | formatTrackerNum }}</td>
                <td>{{ item.num_leeches | formatTrackerNum }}</td>
                <td>{{ item.num_downloaded | formatTrackerNum }}</td>
                <td>{{ item.msg }}</td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </perfect-scrollbar>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn
        class="error mx-2"
        dark
        @click="DeleteTrackers"
      >
        Delete
      </v-btn>
      <v-dialog v-model="dialog" persistent max-width="290">
        <template #activator="{ on, attrs }">
          <v-btn
            color="accent"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Add
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="justify-center">
            Add Trackers
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="newTrackers"
              label="Trackers"
              rows="1"
              required
              autofocus
              auto-grow
              clearable
              hint="One link per line"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="red darken-1" text @click="addTrackers">
              Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="addTrackers">
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import qbit from '@/services/qbit'
import { FullScreenModal } from '@/mixins'
export default {
  name: 'Trackers',
  filters: {
    formatTrackerStatus(status) {
      const map = [
        'Disabled',
        'Not contacted',
        'Working',
        'Updating',
        'Not working'
      ]

      return map[status]
    },
    formatTrackerNum(num) {
      if (num === -1) {
        return 'N/A'
      }

      return num.toString()
    }
  },
  mixins: [FullScreenModal],
  props: { hash: String, isActive: Boolean },
  data: () => ({
    headers: [
      { text: '#', value: 'tier' },
      { text: 'URL', value: 'url' },
      { text: 'Status', value: 'status' },
      { text: 'Peers', value: 'num_peers' },
      { text: 'Seeds', value: 'num_seeds' },
      { text: 'Leeches', value: 'num_leeches' },
      { text: 'Downloaded', value: 'num_downloaded' },
      { text: 'Message', value: 'msg' }
    ],
    tempTrackers: [],
    dialog: false,
    newTrackers: '',
    selectedTrackers: []
  }),
  computed: {
    trackers() {
      return this.tempTrackers.map(x => ({ ...x, isSelectable: typeof x.tier === 'number' }))
    }
  },
  watch: {
    isActive(active) {
      if (active) {
        this.getTorrentTrackers()
      }
    }
  },
  created() {
    this.getTorrentTrackers()
  },
  methods: {
    async getTorrentTrackers() {
      const { data } = await qbit.getTorrentTrackers(this.hash)
      this.tempTrackers = data
    },
    async addTrackers() {
      if (!this.newTrackers.length) return (this.dialog = false)

      qbit.addTorrenTrackers(this.hash, this.newTrackers)
      this.newTrackers = ''
      await this.getTorrentTrackers()
      this.dialog = false
    },
    async DeleteTrackers() {
      if (!this.selectedTrackers.length) return 
      qbit.removeTorrentTrackers(this.hash, this.selectedTrackers.map(t => t.url))
      this.selectedTrackers = []
      await this.getTorrentTrackers()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/colors.scss";

::v-deep .v-data-table thead th,
::v-deep .v-data-table tbody td {
  padding: 0 2px !important;
  height: auto;

  white-space: nowrap;

  &:first-child {
    padding: 0 0 0 8px !important;
  }
  &:last-child {
    padding-right: 8px !important;
  }
}
</style>

