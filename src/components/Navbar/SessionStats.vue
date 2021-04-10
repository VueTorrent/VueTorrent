<template>
  <div v-if="status" class="mt-3 mb-3">
    <label class="text-uppercase white--text caption font-weight-medium ml-4">
      {{ $t('dashboard.left.session.stats') }}
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
      <span>{{ $t('dashboard.left.session.stats.remark') }}</span>
    </v-tooltip>
    <StorageCard
      class="mb-4 mt-4"
      :label="$t('dashboard.left.session.downloaded')"
      color="download"
      :value="status.downloaded"
    />
    <StorageCard :label="$t('dashboard.left.session.uploaded')" color="upload" :value="status.uploaded" />
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

