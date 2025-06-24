<script setup lang="ts">
import { computed } from 'vue'
import StatSection from './StatSection.vue'
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
  <StatSection :title="title">
    <div class="d-flex flex-row flex-gap-column">
      <DataCard :value="download" color="download" icon="mdi-download" />
      <DataCard :value="upload" color="upload" icon="mdi-upload" />
      <StringCard v-if="!session" :value="ratio" color="ratio" icon="mdi-compare-horizontal" />
    </div>
  </StatSection>
</template>
