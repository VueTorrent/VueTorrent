<script setup lang="ts">
import { computed } from 'vue'
import DataCard from '@/components/Core/DataCard.vue'
import StringCard from '@/components/Core/StringCard.vue'
import { useI18nUtils } from '@/composables'
import { useMaindataStore } from '@/stores'

const props = defineProps<{ session: boolean }>()

const { t } = useI18nUtils()
const maindataStore = useMaindataStore()

const title = computed(() => (props.session ? t('navbar.side.stats.session.title') : t('navbar.side.stats.alltime.title')))
const download = computed(() => (props.session ? maindataStore.serverState?.dl_info_data : maindataStore.serverState?.alltime_dl) ?? 0)
const upload = computed(() => (props.session ? maindataStore.serverState?.up_info_data : maindataStore.serverState?.alltime_ul) ?? 0)
const ratio = computed(() => (props.session ? undefined : maindataStore.serverState?.global_ratio) ?? 0)
</script>

<template>
  <v-card variant="flat" class="inherit-bg">
    <v-card-title class="px-0 text-uppercase text-white ml-1 font-weight-light text-subtitle-2">
      {{ title }}
    </v-card-title>
    <v-card-text class="px-0 pb-0">
      <div class="d-flex flex-column flex-gap-row">
        <DataCard :title="$t('navbar.side.stats.downloaded')" :value="download" color="download" icon="mdi-arrow-down" />
        <DataCard :title="$t('navbar.side.stats.uploaded')" :value="upload" color="upload" icon="mdi-arrow-up" />
        <StringCard v-if="!session" :title="$t('navbar.side.stats.ratio')" :value="ratio" color="ratio" />
      </div>
    </v-card-text>
  </v-card>
</template>
