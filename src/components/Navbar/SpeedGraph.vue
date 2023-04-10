<script setup lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs'
import VueApexCharts, { type VueApexChartsComponent } from 'vue3-apexcharts'
import { getDataUnit, getDataValue } from '@/utils/dataParse'
import { useQuery } from '@tanstack/vue-query'

// composables
const theme = useTheme()

const globalInfo = useQuery({
  queryKey: ['globalInfo']
})

// pull from vue-query to get the latest speed data

const series = [
  {
    name: 'Download',
    data: [0, 0]
  },
  {
    name: 'Upload',
    data: [0, 0]
  }
]

const chartOptions = {
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
    theme: 'dark',
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
