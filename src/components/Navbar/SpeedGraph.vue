<template>
  <div class="mt-4" style="position:relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 100"
      preserveAspectRatio="none"
      class="updlGraph"
      style="width:256px; height:140px;"
    >
      <g class="indexBar">
        <polygon class="hWndIndex" />
      </g>
      <g class="uploadSVG">
        <polygon class="hWndUpload" />
      </g>
      <g class="downloadSVG">
        <polygon class="hWndDownload" />
      </g>
    </svg>
    <v-slide-x-transition>
      <div
        v-if="dataIndex >= 0"
        style="pointer-events: none; position:absolute; top: 3px; left: 3px;"
      >
        <v-card
          flat
          class="rounded-0"
          style="opacity: .5;"
        >
          <span class="caption mx-2">
            {{ 28 - dataIndex * 2 }} seconds ago
          </span>
        </v-card>
        <v-card
          flat
          class="pl-1 pr-2 rounded-0"
          style="opacity: .8;"
        >
          <p class="caption download--text ma-0 pa-0">
            <v-icon class="download--text">
              {{ mdiChevronDown }}
            </v-icon>
            {{ indexDownload }}
          </p>
          <p class="caption upload--text ma-0 pa-0">
            <v-icon class="upload--text">
              {{ mdiChevronUp }}
            </v-icon>
            {{ indexUpload }}
          </p>
        </v-card>
      </div>
    </v-slide-x-transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDataUnit, getDataValue } from '@/filters'
import { 
  mdiChevronUp, mdiChevronDown
} from '@mdi/js'

export default {
  name: 'SpeedGraph',
  data() {
    return {
      mdiChevronUp, mdiChevronDown,
      hWndDownload: null,
      hWndUpload: null,
      hWndIndex: null,
      indexTimeout: 0,
      dataIndex: -1
    }
  },
  computed: {
    ...mapGetters(['getTheme']),
    theme() {
      return this.getTheme() ? 'Dark' : 'Light'
    },
    indexDownload() {
      console.log(getDataUnit)

      return getDataValue(this.$store.state.download_data[this.dataIndex]) + ' ' +
        getDataUnit(this.$store.state.download_data[this.dataIndex]) + '/s'
    },
    indexUpload() {

      return getDataValue(this.$store.state.upload_data[this.dataIndex]) + ' ' +
        getDataUnit(this.$store.state.upload_data[this.dataIndex]) + '/s'
    }
  },
  watch: {
    theme(newValue) {
      this.setChartTooltipTheme(newValue)
    },
    '$store.state.download_data'(val) {
      var 
        max = Math.max.apply(null, val),
        i, v, d_dat = ''
      for (i = 0; i < val.length; i++) {
        v = 100 - val[i] / max * 100
        d_dat += i + ',' + (Number.isNaN(v) ? 100 : v) + ' '
      }
      this.hWndDownload.setAttribute('points', '0,100 ' + d_dat + '14,100')
    },
    '$store.state.upload_data'(val) {
      var 
        max = Math.max.apply(null, val),
        i, v, d_dat = ''
      for (i = 0; i < val.length; i++) {
        v = 100 - val[i] / max * 100
        d_dat += i + ',' + (Number.isNaN(v) ? 100 : v) + ' '
      }
      this.hWndUpload.setAttribute('points', '0,100 ' + d_dat + '14,100')
    }
  },
  mounted() {
    this.hWndDownload = this.$el.getElementsByClassName('hWndDownload')[0]
    this.hWndUpload = this.$el.getElementsByClassName('hWndUpload')[0]
    this.hWndIndex = this.$el.getElementsByClassName('hWndIndex')[0]

    const svgGraph = this.$el.getElementsByClassName('updlGraph')[0]
    svgGraph.addEventListener('mousemove', function (event) {
      const svgWidth = 255
      const calcIndex = Math.floor(event.layerX / svgWidth * 14)
      if (this.dataIndex != calcIndex) {
        this.dataIndex = calcIndex
        this.hWndIndex.setAttribute('points',
          calcIndex + ',100 ' + (calcIndex + 1) + ',100 ' + (calcIndex + 1) + ',0 ' + calcIndex + ',0'
        )
        this.hWndUpload.setAttribute('points', this.hWndUpload.getAttribute('points'))
        this.hWndDownload.setAttribute('points', this.hWndDownload.getAttribute('points'))
        clearTimeout(this.indexTimeout)
        this.indexTimeout = setTimeout(function () {
          this.hWndIndex.setAttribute('points', '')
          this.hWndUpload.setAttribute('points', this.hWndUpload.getAttribute('points'))
          this.hWndDownload.setAttribute('points', this.hWndDownload.getAttribute('points'))
          this.dataIndex = -1
        }.bind(this), 10000)
      }
    }.bind(this), false)
    svgGraph.addEventListener('mouseleave', function (event) {
      clearTimeout(this.indexTimeout)
      this.hWndIndex.setAttribute('points', '')
      this.hWndUpload.setAttribute('points', this.hWndUpload.getAttribute('points'))
      this.hWndDownload.setAttribute('points', this.hWndDownload.getAttribute('points'))
      this.dataIndex = -1
    }.bind(this), false)

  },
  methods: {
    setChartTooltipTheme(theme) {
      this.chartOptions.tooltip.theme = theme.toLowerCase()
      this.$refs.chart.updateOptions(this.chartOptions)
    }
  }
}
</script>

<style lang="scss" scoped>

.indexBar {
  fill: var(--v-secondary-base);
  //opacity: .5;
}
.downloadSVG {
  fill: var(--v-download-base);
  opacity: .5;
}
.uploadSVG {
  fill: var(--v-upload-base);
  opacity: .5;
}

</style>