<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 100"
    preserveAspectRatio="none"
    style="position:absolute; width:300px; height:30%; bottom:0"
  >
    <defs>
      <linearGradient id="fadeGrad" x1="100%" x2="0%">
        <stop offset="0" stop-color="white" stop-opacity="0" />
        <stop offset="1" stop-color="white" stop-opacity="1" />
      </linearGradient>
      <mask id="fade" maskContentUnits="objectBoundingBox">
        <rect width="1" height="1" fill="url(#fadeGrad)" />
      </mask>
    </defs>
    <g mask="url(#fade)">
      <path class="UploadCanvas" />
      <path class="UploadCanvas" />
      <path class="UploadCanvas" />
      <path class="DownloadCanvas" />
      <path class="DownloadCanvas" />
      <path class="DownloadCanvas" />
    </g>
  </svg>
</template>
<script>
export default {
  name: 'LineGraph',
  props: ['data'],
  data() {
    return {
      svgGraph: null,
      uploadCanvas: null,
      downloadCanvas: null
    }
  },
  watch: {
    'data'() {
      this.update()
    }
  },
  mounted() {
    this.downloadCanvas = this.getCanvas('DownloadCanvas')
    this.uploadCanvas = this.getCanvas('UploadCanvas')
  },
  methods: {
    update() {
      this.updateGraph(this.data.download, this.downloadCanvas)
      this.updateGraph(this.data.upload, this.uploadCanvas)
    },
    getCanvas(name) {
      return this.$el.getElementsByClassName(name)
    },
    rescaleValue(arr, val) {
      const max = Math.max(...arr)

      const floored = Math.floor(100 - val / max * 100)

      return Number.isNaN(floored) ? 100 : floored

    },
    updateGraph(val, cvs) {
      let i, v, v2
      const d_dat = [], b_dat = [], c_dat = []

      v = this.rescaleValue(val, val[0])

      d_dat.push(['M0', 100])
      d_dat.push(['L0', v])

      for (i = 1; i < val.length - 1; i++) {
        v = this.rescaleValue(val, val[i])
        v2 = this.rescaleValue(val, val[i + 1])
        v2 = (v + v2) / 2

        d_dat.push(['Q' + i, v])
        d_dat.push([i + 0.5, v2])
      }

      v = this.rescaleValue(val, val[i])
      d_dat.push(['L14', v])

      for (i = d_dat.length - 1; i > 1; i--) {
        b_dat.push([d_dat[i][0], Math.floor(d_dat[i][1] + (100 - d_dat[i][1]) / 1.3)])
        c_dat.push([d_dat[i][0], Math.floor(d_dat[i][1] + (100 - d_dat[i][1]) / 2.3)])
      }

      b_dat.push([0, Math.floor(d_dat[1][1] + (100 - d_dat[1][1]) / 1.3)])
      c_dat.push([0, Math.floor(d_dat[1][1] + (100 - d_dat[1][1]) / 2.3)])

      d_dat.push([14, 100])
      cvs[0].setAttribute('d', d_dat)
      cvs[1].setAttribute('d', d_dat.concat(b_dat))
      cvs[2].setAttribute('d', d_dat.concat(c_dat))
    }
  }
}
</script>

<style lang="scss" scoped>
.DownloadCanvas {
  fill: var(--v-download-base);
  opacity: .23;
}
.UploadCanvas {
  fill: var(--v-upload-base);
  opacity: .23;
}
</style>
