<script setup lang="ts">
import { formatSpeed } from '@/helpers'
import dayjs from '@/plugins/dayjs'
import { useMaindataStore, useNavbarStore, useVueTorrentStore } from '@/stores'
import { ApexOptions } from 'apexcharts'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const { t } = useI18n()
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
  colors: [theme.current.value.colors.upload, theme.current.value.colors.download, '#f38a09', '#f38a09'],
  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'round',
    // FIXME: array error
    // width: [4, 4, 2, 2],
    // dashArray: [0, 0, 10, 10]
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.5,
      opacityFrom: 0.6,
      opacityTo: 0.5,
      stops: [0, 50, 100]
    }
  },
  tooltip: {
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

const downloadLimitSerie = computed(() => new Array(15).fill(serverState.value?.dl_rate_limit))
const uploadLimitSerie = computed(() => new Array(15).fill(serverState.value?.up_rate_limit))

const series = computed(() => [
  {
    name: t('navbar.side.speed_graph.upload_label'),
    data: navbarStore.uploadData
  },
  {
    name: t('navbar.side.speed_graph.download_label'),
    data: navbarStore.downloadData
  },
  // {
  //   name: t('navbar.side.speed_graph.upload_limit_label'),
  //   data: uploadLimitSerie.value
  // },
  // {
  //   name: t('navbar.side.speed_graph.download_limit_label'),
  //   data: downloadLimitSerie.value
  // }
])
</script>

<template>
  <VueApexCharts ref="chart" type="area" :options="chartOptions" :series="series" />
</template>

<style scoped></style>
