<template>
  <div class="mt-4">
    <apexcharts ref="chart" type="line" :options="chartOptions" :series="series" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
import { formatSpeed } from '@/filters'

export default defineComponent({
  name: 'SpeedGraph',
  components: {
    apexcharts: VueApexCharts
  },
  data() {
    return {
      chartOptions: {
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
        colors: [this.$vuetify.theme.currentTheme.upload, this.$vuetify.theme.currentTheme.download],
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
          theme: 'light',
          x: {
            formatter: (value: number) => {
              const val = 32 - value * 2

              return val + ' seconds ago'
            }
          },
          y: {
            formatter: (value: number) => {
              return formatSpeed(value, this.shouldUseBitSpeed())
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getTheme', 'shouldUseBitSpeed']),
    series() {
      return [
        {
          name: 'upload',
          type: 'area',
          data: this.$store.state.upload_data
        },
        {
          name: 'download',
          type: 'area',
          data: this.$store.state.download_data
        }
      ]
    },
    theme() {
      return this.getTheme()
    }
  },
  watch: {
    theme(newValue) {
      this.setChartTooltipTheme(newValue)
    }
  },
  mounted() {
    this.setChartTooltipTheme(this.theme)
  },
  methods: {
    setChartTooltipTheme(theme: string) {
      this.chartOptions.tooltip.theme = theme.toLowerCase()
      this.$refs.chart.updateOptions(this.chartOptions)
    }
  }
})
</script>
