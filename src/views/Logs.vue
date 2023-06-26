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

    <v-list-item v-for="log in logs" :key="log.id" :class="getLogTypeName(log)">
      <v-list-item-content>
        <v-list-item-title>
          {{ formatLog(log) }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { General } from '@/mixins'
import { defineComponent } from 'vue'
import { mdiClose } from '@mdi/js'
import qbit from '@/services/qbit'
import { Log } from '@/types/qbit/models'
import { LogType } from '@/enums/qbit'
import dayjs from "dayjs";
import { mapState } from "vuex";

export default defineComponent({
  name: 'Logs',
  mixins: [General],
  data() {
    return {
      timer: null as NodeJS.Timer | null,
      logs: [] as Log[],
      mdiClose
    }
  },
  computed: {
    ...mapState(['webuiSettings']),
    lastFetchedId() {
      return this.logs.length > 0 ? this.logs[this.logs.length-1].id : -1
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
    getLogTypeName(log: Log) {
      return `logtype-${LogType[log.type].toLowerCase()}`
    },
    formatLog(log: Log) {
      const formattedDate = dayjs(log.timestamp * 1000).format(this.webuiSettings.dateFormat)
      return `[${formattedDate}] ${log.message}`
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

<style scoped lang="scss">
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
</style>