<script setup lang="ts">
import { ApexOptions } from 'apexcharts'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { useI18nUtils } from '@/composables'
import { formatSpeed } from '@/helpers'
import dayjs from '@/plugins/dayjs'
import { useMaindataStore, useNavbarStore, useVueTorrentStore } from '@/stores'

const { t } = useI18nUtils()
const theme = useTheme()
const { serverState } = storeToRefs(useMaindataStore())
const navbarStore = useNavbarStore()
const vuetorrentStore = useVueTorrentStore()
const chart = ref<ApexCharts>()

const chartOptions: ApexOptions = {
  chart: {
    sparkline: {
      enabled: true
    },
    animations: {
      enabled: false
    }
  },
  colors: [theme.current.value.colors.upload, theme.current.value.colors.download],
  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'round',
    width: 3,
    dashArray: [20, 20, 0, 0]
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.5,
      opacityFrom: [0, 0, 0.6, 0.6],
      opacityTo: [0, 0, 0.5, 0.5],
      stops: [0, 50, 100]
    }
  },
  tooltip: {
    fixed: {
      enabled: true,
      position: 'topLeft'
    },
    theme: 'dark',
    x: {
      formatter: (value: number) => {
        return dayjs(value).fromNow()
      }
    },
    y: {
      formatter: (value: number) => {
        return formatSpeed(value, vuetorrentStore.useBitSpeed)
      }
    }
  }
}

const downloadLimitSerie = computed(() => navbarStore.downloadData.map(([x]) => [x, serverState.value?.dl_rate_limit]))
const uploadLimitSerie = computed(() => navbarStore.uploadData.map(([x]) => [x, serverState.value?.up_rate_limit]))

const series = computed(() => [
  {
    name: t('navbar.side.speed_graph.upload_limit_label'),
    data: vuetorrentStore.displayGraphLimits && serverState.value?.up_rate_limit ? uploadLimitSerie.value : []
  },
  {
    name: t('navbar.side.speed_graph.download_limit_label'),
    data: vuetorrentStore.displayGraphLimits && serverState.value?.dl_rate_limit ? downloadLimitSerie.value : []
  },
  {
    name: t('navbar.side.speed_graph.upload_label'),
    data: navbarStore.uploadData
  },
  {
    name: t('navbar.side.speed_graph.download_label'),
    data: navbarStore.downloadData
  }
])
</script>

<template>
  <VueApexCharts ref="chart" type="area" :options="chartOptions" :series="series" />
</template>

<style scoped></style>
