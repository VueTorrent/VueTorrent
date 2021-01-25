<template>
  <div v-if="status" class="mt-3">
    <label class="text-uppercase white--text caption font-weight-medium ml-4">
      Session Stats
    </label>
    <v-tooltip bottom>
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
      <span>Since the last time qBittorrent was restarted</span>
    </v-tooltip>
    <StorageCard
      class="mb-4 mt-4"
      label="Downloaded"
      color="download"
      :value="status.downloaded"
    />
    <StorageCard label="Uploaded" color="upload" :value="status.uploaded" />
  </div>
</template>

<script>
import { mdiInformationOutline } from '@mdi/js'
import StorageCard from '@/components/Core/StorageCard'
export default {
  name: 'SessionStats',
  components: { StorageCard },
  props: ['status'],
  data: () => ({ mdiInformationOutline })
}
</script>

