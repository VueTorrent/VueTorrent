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

    <v-list-item v-for="log in logs" :key="log.id">
      <v-list-item-content>
        <v-list-item-title :class="log.type.toString()">
          {{ log.message }}
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
  mounted() {
    document.addEventListener('keydown', this.handleKeyboardShortcut)
    this.timer = setInterval(this.updateLogs, 15000)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyboardShortcut)
    clearInterval(this.timer!)
  },
  methods: {
    async updateLogs() {
      this.logs = await qbit.getLogs()
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