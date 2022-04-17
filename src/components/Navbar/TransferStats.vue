<template>
  <div v-if="status" class="mt-3 mb-3">
    <label class="text-uppercase white--text caption font-weight-medium ml-4">
      {{ getTitle }}
    </label>
    <v-tooltip v-if="isSession" bottom>
      <template #activator="{ on }">
        <v-icon
          color="white"
          style="opacity: 0.3;"
          small
          v-on="on"
        >
          {{ mdiInformationOutline }}
        </v-icon>
      </template>
      <span>{{ $t('navbar.sessionStats.tooltip') }}</span>
    </v-tooltip>
    <StorageCard
      class="mb-4 mt-4"
      label="Downloaded"
      color="download"
      :value="getDownload"
    />
    <StorageCard label="Uploaded" color="upload" :value="getUpload" />
  </div>
</template>

<script>
import { mdiInformationOutline } from '@mdi/js'
import StorageCard from '@/components/Core/StorageCard'
export default {
  name: 'TransferStats',
  components: { StorageCard },
  props: ['status', 'session'],
  data: () => ({ 
    mdiInformationOutline,
    sessionTitle: 'session stats',
    alltimeTitle: 'all-time stats'
  }),
  computed: {
    isSession() {
      return this.session
    },
    getTitle() {
      return this.isSession ? this.sessionTitle : this.alltimeTitle
    },
    getDownload() {
      return this.isSession ? this.status.sessionDownloaded : this.status.alltimeDownloaded
    },
    getUpload() {
      return this.isSession ? this.status.sessionUploaded : this.status.alltimeUploaded
    }
  }
}
</script>

