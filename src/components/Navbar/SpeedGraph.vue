<script setup lang="ts">
import { useSessionInfoStore } from '@/stores/info'
import { getDataUnit, getDataValue } from '@/utils/dataParse'
import type { ApexOptions } from 'apexcharts'
import VueApexCharts, { type VueApexChartsComponent } from 'vue3-apexcharts'
import { useTheme } from 'vuetify/lib/framework.mjs'

// composables
const theme = useTheme()

const sessionInfo = useSessionInfoStore()

const series = [
  {
    name: 'Download',
    data: [...sessionInfo.data.dl]
  },
  {
    name: 'Upload',
    data: [...sessionInfo.data.up]
  }
]

const chartOptions: ApexOptions = {
  chart: {
    sparkline: {
      enabled: true
    },
    animations: {
      enabled: false,
      dynamicAnimation: {
        speed: 1000
      }
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
      shade: theme.global.current.value.dark ? 'dark' : 'light',
      type: 'vertical',
      shadeIntensity: 0.5,
      opacityFrom: 0.6,
      opacityTo: 0.5,
      stops: [0, 50, 100]
    }
  },
  tooltip: {
    theme: theme.global.current.value.dark ? 'dark' : 'light',
    x: {
      formatter: (value: number) => {
        const val = 32 - value * 2

        return val + ' seconds ago'
      }
    },
    y: {
      formatter: (value: number) => {
        return `${getDataValue(value, 0)} ${getDataUnit(value)}/s`
      }
    }
  }
}
</script>

<template>
  <div class="mt-4">
    <VueApexCharts ref="chart" type="line" :options="chartOptions" :series="series" />
  </div>
</template>
