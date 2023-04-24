<template>
  <div v-if="status" class="mt-3 mb-3">
    <label class="text-uppercase white--text caption font-weight-medium ml-4">
      {{ $t('navbar.alltimeTitle') }}
    </label>
    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-icon color="white" style="opacity: 0.3" small v-on="on">
          {{ mdiInformationOutline }}
        </v-icon>
      </template>
      <span>{{ $t('navbar.sessionStats.tooltip') }}</span>
    </v-tooltip>
    <StorageCard class="mb-4 mt-4" :label="titleCase($t('downloaded'))" color="download" :value="getDownload" />
    <StorageCard class="mb-4 mt-4" :label="titleCase($t('uploaded'))" color="upload" :value="getUpload" />
    <StringCard :label="titleCase($t('ratio'))" color="ratio" :value="getRatio" />
  </div>
</template>

<script>
import { mdiInformationOutline } from '@mdi/js'
import { titleCase } from '@/filters'
import StorageCard from '../Core/StorageCard.vue'
import StringCard from "../Core/StringCard.vue";

export default {
  name: 'TransferStats',
  components: { StorageCard, StringCard },
  props: ['status'],
  data: () => ({
    mdiInformationOutline
  }),
  computed: {
    getDownload() {
      return this.status.alltimeDownloaded
    },
    getUpload() {
      return this.status.alltimeUploaded
    },
    getRatio() {
      return this.status.alltimeRatio
    }
  },
  methods: {
    titleCase(str) {
      return titleCase(str)
    }
  }
}
</script>
