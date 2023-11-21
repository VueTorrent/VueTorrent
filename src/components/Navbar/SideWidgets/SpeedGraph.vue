<script setup lang="ts">
import { formatSpeed } from '@/helpers'
import { useNavbarStore, useVueTorrentStore } from '@/stores'
import { ApexOptions } from 'apexcharts'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const { t } = useI18n()
const theme = useTheme()
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
    width: 4
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
        const step = vuetorrentStore.refreshInterval / 1000
        const val = navbarStore.downloadData.length * step - value * step
        return t('navbar.side.speed_graph.relative_time', val)
      }
    },
    y: {
      formatter: (value: number) => {
        return formatSpeed(value, vuetorrentStore.useBitSpeed)
      }
    }
  }
}

const series = computed(() => [
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
