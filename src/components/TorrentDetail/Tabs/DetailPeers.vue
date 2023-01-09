<template>
  <v-card flat>
    <v-card-text class="pa-0">
      <v-data-table v-if="peers" v-model="selectedPeers" dense show-select :headers="headers" :items="peers" :items-per-page="-1" item-key="key" mobile-breakpoint="0">
        <template #body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.key">
              <td>
                <v-checkbox v-model="selectedPeers" :value="item.key" hide-details class="pa-0 ma-0" color="accent" />
              </td>
              <td class="ip">
                <template v-if="item.country_code">
                  <img v-if="isWindows" class="country-flag" :title="item.country" :alt="codeToFlag(item.country_code).char" :src="codeToFlag(item.country_code).url" />
                  <template v-else>
                    {{ codeToFlag(item.country_code).char }}
                  </template>
                </template>
                {{ item.ip }}
                <span class="grey--text">:{{ item.port }}</span>
              </td>
              <td>{{ item.connection }}</td>
              <td :title="item.flags_desc">
                {{ item.flags }}
              </td>
              <td>{{ item.client }}</td>
              <td>{{ item.progress | progress }}</td>
              <td>{{ item.dl_speed | networkSpeed }}</td>
              <td>{{ item.downloaded | networkSize }}</td>
              <td>{{ item.up_speed | networkSpeed }}</td>
              <td>{{ item.uploaded | networkSize }}</td>
              <td>{{ item.relevance | progress }}</td>
              <td>{{ item.files }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn class="error white--text elevation-0 px-4 mx-2" @click="banPeers">Ban</v-btn>
      <v-dialog v-model="peersDialog" content-class="rounded-form" persistent max-width="290">
        <template #activator="{ on, attrs }">
          <v-btn class="accent white--text elevation-0 px-4 mx-2" v-bind="attrs" v-on="on">Add</v-btn>
        </template>
        <v-card>
          <v-card-title class="justify-center">
            <h3>Add Peers</h3>
          </v-card-title>
          <v-card-text>
            <v-textarea v-model="newPeers" label="Peers" rows="1" required autofocus auto-grow clearable hint="One link per line" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="red darken-1" text @click="closeAddPeers">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="addPeers">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import { map, merge } from 'lodash'
import qbit from '@/services/qbit'
import { codeToFlag, isWindows } from '@/helpers'
import { FullScreenModal } from '@/mixins'

export default {
  name: 'DetailPeers',
  mixins: [FullScreenModal],
  props: { hash: String, isActive: Boolean },
  data: () => ({
    peersDialog: false,
    refreshTimer: '',
    peersObj: null,
    newPeers: '',
    selectedPeers: []
  }),
  computed: {
    rid: {
      get() {
        return this.$store.state.rid
      },
      set(val) {
        this.$store.state.rid = val
      }
    },
    peers() {
      return map(this.peersObj, (value, key) => merge({}, value, { key }))
    },
    headers() {
      return [
        { text: this.$i18n.t('modals.detail.pagePeers.ip'), value: 'ip' },
        { text: this.$i18n.t('modals.detail.pagePeers.connection'), value: 'connection' },
        { text: this.$i18n.t('modals.detail.pagePeers.flags'), value: 'flags' },
        { text: this.$i18n.t('modals.detail.pagePeers.client'), value: 'client' },
        { text: this.$i18n.t('modals.detail.pagePeers.progress'), value: 'progress' },
        { text: this.$i18n.t('modals.detail.pagePeers.downloadSpeed'), value: 'dl_speed' },
        { text: this.$i18n.t('modals.detail.pagePeers.downloaded'), value: 'downloaded' },
        { text: this.$i18n.t('modals.detail.pagePeers.upSpeed'), value: 'up_speed' },
        { text: this.$i18n.t('modals.detail.pagePeers.uploaded'), value: 'uploaded' },
        { text: this.$i18n.t('modals.detail.pagePeers.relevance'), value: 'relevance' },
        { text: this.$i18n.t('modals.detail.pagePeers.files'), value: 'files' }
      ]
    }
  },
  watch: {
    isActive(active) {
      if (active) {
        this.getTorrentPeers()
        this.refreshTimer = setInterval(
          function () {
            this.getTorrentPeers()
          }.bind(this),
          2000
        )
      } else {
        clearTimeout(this.refreshTimer)
      }
    }
  },
  created() {},
  beforeDestroy() {},
  methods: {
    codeToFlag(val) {
      return codeToFlag(val)
    },
    isWindows() {
      return isWindows()
    },
    async getTorrentPeers() {
      const { data } = await qbit.getTorrentPeers(this.hash, this.rid + 1 || undefined)

      this.rid = data.rid

      this.peersObj = data.peers
    },
    async addPeers() {
      if (this.newPeers.length === 0) {
        this.peersDialog = false
        return
      }

      qbit.addTorrentPeers([this.hash], this.newPeers.split('\n'))
      this.newPeers = ''
      await this.getTorrentPeers()
      this.peersDialog = false
    },
    closeAddPeers() {
      this.newPeers = ''
      this.peersDialog = false
    },
    async banPeers() {
      if (this.selectedPeers.length === 0) return

      qbit.banPeers(this.selectedPeers)
      this.selectedPeers = []
      await this.getTorrentPeers()
    }
  }
}
</script>

<style scoped>
:deep(.ip) {
  display: flex;
  align-items: center;
}

:deep(.ip .country-flag) {
  width: 1.5em;
  margin-right: 0.5em;
}
</style>
<style lang="scss" scoped>
@import '@/styles/colors.scss';

:deep(.v-data-table thead th),
:deep(.v-data-table tbody td) {
  padding: 0 3px !important;
  height: auto;

  &:first-child {
    padding: 0 0 0 8px !important;
  }
  &:last-child {
    padding-right: 8px !important;
  }
}
:deep(.v-data-table-header) {
  white-space: nowrap;
}
:deep(td) {
  white-space: nowrap;
}
</style>
