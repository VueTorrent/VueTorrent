<template>
  <div class="px-1 px-sm-5 background noselect">
    <v-row no-gutters class="grey--text" align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ $t('modals.logs.title') }}
        </h1>
      </v-col>
      <v-col class="align-center justify-center">
        <v-card-actions class="justify-end">
          <v-btn small elevation="0" @click="close">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0">
      <v-data-table
        id="logsTable"
        :headers="headers"
        :footer-props="{itemsPerPageOptions: [50, 100, 250, 500, 1000, -1]}"
        :items="filteredLogs"
        :items-per-page="50"
        item-key="id"
        multi-sort
        :sort-by="['id']"
        :sort-desc="[true]"
        :item-class="getLogTypeClassName">
        <template #top>
          <div class="mx-4 mb-5">
            <v-select v-model="logTypeFilter" :items="logTypeOptions" :label="$t('modals.logs.filters.type')" multiple chips>
              <template v-slot:prepend-item>
                <v-list-item ripple @mousedown.prevent @click="toggleSelectAll">
                  <v-list-item-action>
                    <v-icon>{{ selectAllIcon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t('selectAll') }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-select>
          </div>
          <v-divider />
        </template>
        <template #[`item.type`]="{ item }">
          {{ getLogTypeName(item) }}
        </template>
        <template #[`item.timestamp`]="{ item }">
          {{ formatLogTimestamp(item) }}
        </template>
      </v-data-table>
    </v-row>
  </div>
</template>

<script lang="ts">
import {General} from '@/mixins'
import {defineComponent} from 'vue'
import {mdiClose, mdiCloseBox, mdiMinusBox, mdiCheckboxBlankOutline} from '@mdi/js'
import qbit from '@/services/qbit'
import {Log} from '@/types/qbit/models'
import {LogType} from '@/enums/qbit'
import dayjs from "dayjs";
import {mapState} from "vuex";

export default defineComponent({
  name: 'Logs',
  mixins: [General],
  data() {
    return {
      headers: [
        { text: this.$t('modals.logs.table.id'), value: 'id', sortable: true },
        { text: this.$t('modals.logs.table.type'), value: 'type', sortable: true },
        { text: this.$t('modals.logs.table.message'), value: 'message', sortable: true },
        { text: this.$t('modals.logs.table.timestamp'), value: 'timestamp', sortable: true },
      ],
      logTypeOptions: [
        { text: LogType[LogType.NORMAL], value: LogType.NORMAL },
        { text: LogType[LogType.INFO], value: LogType.INFO },
        { text: LogType[LogType.WARNING], value: LogType.WARNING },
        { text: LogType[LogType.CRITICAL], value: LogType.CRITICAL }
      ],
      logTypeFilter: [1, 2, 4, 8] as LogType[],
      timer: null as NodeJS.Timer | null,
      logs: [] as Log[],
      mdiClose
    }
  },
  computed: {
    ...mapState(['webuiSettings']),
    lastFetchedId() {
      return this.logs.length > 0 ? this.logs[this.logs.length-1].id : -1
    },
    filteredLogs() {
      return this.logs.filter(log => this.logTypeFilter.includes(log.type))
    },
    selectAllIcon() {
      if (this.logTypeFilter.length === 0) {
        return mdiCheckboxBlankOutline
      } else if (this.logTypeFilter.length === this.logTypeOptions.length) {
        return mdiCloseBox
      } else {
        return mdiMinusBox
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyboardShortcut)
    this.timer = setInterval(this.updateLogs, 15000)
    this.updateLogs()
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyboardShortcut)
    clearInterval(this.timer!)
  },
  methods: {
    async updateLogs() {
      this.logs.push(...await qbit.getLogs(this.lastFetchedId))
      await this.$nextTick()
    },
    getLogTypeClassName(log: Log) {
      return `logtype-${LogType[log.type].toLowerCase()}`
    },
    getLogTypeName(log: Log) {
      return LogType[log.type]
    },
    formatLogTimestamp(log: Log) {
      return dayjs(log.timestamp * 1000).format(this.webuiSettings.dateFormat)
    },
    async toggleSelectAll() {
      if (this.logTypeFilter.length === this.logTypeOptions.length) {
        this.logTypeFilter = []
      } else {
        this.logTypeFilter = this.logTypeOptions.map(option => option.value)
      }
      await this.$nextTick()
    },
    close() {
      this.$router.back()
    },
    handleKeyboardShortcut(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        this.close()
      }
    }
  }
})
</script>

<style lang="scss">
.theme--dark {
  .logtype-normal {
    color: white !important;
  }
  .logtype-info {
    color: grey !important;
  }
  .logtype-warning {
    color: darkgoldenrod !important;
  }
  .logtype-critical {
    color: darkred !important;
  }
}

.theme--light {
  .logtype-normal {
    color: black !important;
  }
  .logtype-info {
    color: grey !important;
  }
  .logtype-warning {
    color: goldenrod !important;
  }
  .logtype-critical {
    color: red !important;
  }
}
</style>