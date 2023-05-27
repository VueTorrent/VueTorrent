<script setup lang="ts">
import { useSessionInfo } from '@/composables/api/info'
import { getDataUnit, getDataValue } from '@/utils/dataParse'
import type { ApexOptions } from 'apexcharts'
import { ref, watch } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

// composables
const theme = useTheme()

const sessionInfo = useSessionInfo()

// data
const uploadData = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const downloadData = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

const series = ref([
  {
    name: 'Upload',

    data: uploadData
  },
  {
    name: 'Download',
    data: downloadData
  }
])

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
  stroke: {
    curve: 'smooth',
    lineCap: 'round',
    width: 4
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

watch(
  () => sessionInfo.data.value,
  () => {
    uploadData.value.shift()
    uploadData.value.push(sessionInfo.data.value?.up_info_speed || 0)

    downloadData.value.shift()
    downloadData.value.push(sessionInfo.data.value?.dl_info_speed || 0)
  }
)
</script>

<template>
  <div class="mt-4">
    <VueApexCharts ref="chart" type="area" :options="chartOptions" :series="series" />
  </div>
</template>
