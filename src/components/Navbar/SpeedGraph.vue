<template>
  <div class="mt-4" style="position:relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 100"
      preserveAspectRatio="none"
      class="updlGraph"
      style="position:relative; width:274px; height:120px; left:0"
    >
      <!-- style="position:relative; width:256px; height:120px;" -->
      <polygon class="hWndIndex" />
      <polygon class="hWndUpload" />
      <polygon class="hWndUpload" />
      <polygon class="hWndUpload" />
      <polygon class="hWndDownload" />
      <polygon class="hWndDownload" />
      <polygon class="hWndDownload" />
    </svg>
    <v-slide-x-transition>
      <div
        v-if="dataIndex >= 0"
        style="pointer-events: none; position:absolute; top: 3px; left: 3px;"
      >
        <v-card flat class="rounded-0 rounded-t-lg" style="opacity: .5;">
          <span class="caption mx-2">
            {{ 28 - dataIndex * 2 }} seconds ago
          </span>
        </v-card>
        <v-card flat class="pl-1 pr-2 rounded-0 rounded-b-lg" style="opacity: .8;">
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
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'

export default {
  name: 'SpeedGraph',
  data() {
    return {
      mdiChevronUp, mdiChevronDown,
      svgGraph: null, hWndDownload: null, hWndUpload: null, hWndIndex: null, cvsLeft: 0,
      indexTimeout: 0, dataIndex: -1, svgGraphTimer: 0
    }
  },
  computed: {
    ...mapGetters(['getTheme']),
    theme() {
      return this.getTheme() ? 'Dark' : 'Light'
    },
    indexDownload() {
      const d = this.$store.state.download_data[this.dataIndex]

      return getDataValue(d) + ' ' + getDataUnit(d) + '/s'
    },
    indexUpload() {
      const d = this.$store.state.upload_data[this.dataIndex]

      return getDataValue(d) + ' ' + getDataUnit(d) + '/s'
    }
  },
  watch: {
    '$store.state.download_data'(val) {
      this.updateGraph(val, this.hWndDownload)
      this.svgGraph.style.left = this.cvsLeft = 0
    },
    '$store.state.upload_data'(val) {
      this.updateGraph(val, this.hWndUpload)
    }
  },
  mounted() {
    const
      getCanvas = s => this.$el.getElementsByClassName(s)
    this.hWndDownload = getCanvas('hWndDownload')
    this.hWndUpload = getCanvas('hWndUpload')
    this.hWndIndex = getCanvas('hWndIndex')[0]

    this.svgGraph = getCanvas('updlGraph')[0]
    this.svgGraphTimer = setInterval(function () {
      this.cvsLeft -= 3.6
      this.svgGraph.style.left = this.cvsLeft
    }.bind(this), 400)
    
    this.svgGraph.addEventListener('mousemove', function (event) {
      //const svgWidth = 255
      const svgWidth = 274
      const calcIndex = Math.floor(event.layerX / svgWidth * 14)
      if (this.dataIndex != calcIndex) {
        this.dataIndex = calcIndex
        this.hWndIndex.setAttribute('points',
          calcIndex + ',100 ' + (calcIndex + 1) + ',100 ' + (calcIndex + 1) + ',0 ' + calcIndex + ',0'
        )
        this.reDraw(this.hWndUpload); this.reDraw(this.hWndDownload)
        clearTimeout(this.indexTimeout)
        this.indexTimeout = setTimeout(function () {
          this.hWndIndex.setAttribute('points', '')
          this.reDraw(this.hWndUpload); this.reDraw(this.hWndDownload)
          this.dataIndex = -1
        }.bind(this), 10000)
      }
    }.bind(this), false)

    this.svgGraph.addEventListener('mouseleave', function (event) {
      clearTimeout(this.indexTimeout)
      this.hWndIndex.setAttribute('points', '')
      this.reDraw(this.hWndUpload); this.reDraw(this.hWndDownload)
      this.dataIndex = -1
    }.bind(this), false)

  },
  beforeDestroy() {
    clearInterval(this.svgGraphTimer)
  },
  methods: {
    setChartTooltipTheme(theme) {
      this.chartOptions.tooltip.theme = theme.toLowerCase()
      this.$refs.chart.updateOptions(this.chartOptions)
    },
    reDraw(obj) {
      if (typeof obj.length === 'undefined') {
        obj.setAttribute('points', obj.getAttribute('points'))
      } else {
        for (var i = 0; i < obj.length; i++) {
          obj[i].setAttribute('points', obj[i].getAttribute('points'))
        }
      }
    },
    updateGraph(val, cvs) {
      const
        max = Math.max.apply(null, val)
      var
        i, v, d_dat = '', b_dat = '', c_dat = ''

      for (i = 0; i < val.length; i++) {
        v = 100 - val[i] / max * 100
        d_dat += i + ',' + (Number.isNaN(v) ? 100 : v) + ' '
        b_dat = i + ',' + (Number.isNaN(v) ? 100 : v + (100 - v) / 1.3) + ' ' + b_dat
        c_dat = i + ',' + (Number.isNaN(v) ? 100 : v + (100 - v) / 2.3) + ' ' + c_dat
      }
      cvs[0].setAttribute('points', d_dat + b_dat)
      cvs[1].setAttribute('points', d_dat + c_dat)
      cvs[2].setAttribute('points', '0,100 ' + d_dat + '14,100')
    }
  }
}
</script>

<style lang="scss" scoped>

.hWndIndex {
  fill: var(--v-secondary-base);
}
.hWndDownload {
  fill: var(--v-download-base);
  opacity: .23;
}
.hWndUpload {
  fill: var(--v-upload-base);
  opacity: .23;
}

</style>