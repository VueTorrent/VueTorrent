<template>
    <div class="mt-4">
        <apexcharts
            ref="chart"
            type="line"
            :options="chartOptions"
            :series="series"
        ></apexcharts>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { mapGetters } from 'vuex'
export default {
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
                colors: ['#00b3fa', '#64CEAA'],
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
                        formatter: value => {
                            let val = 32 - value * 2
                            return val + ' seconds ago'
                        }
                    }
                }
            }
        }
    },
    computed: {
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
        ...mapGetters(['getTheme']),
        theme() {
            return this.getTheme() ? 'Dark' : 'Light'
        }
    },
    methods: {
        setChartTooltipTheme(theme) {
            this.chartOptions.tooltip.theme = theme.toLowerCase()
            this.$refs.chart.updateOptions(this.chartOptions)
        }
    },
    watch: {
        theme(newValue) {
            this.setChartTooltipTheme(newValue)
        }
    },
    mounted() {
        this.setChartTooltipTheme(this.theme)
    }
}
</script>
