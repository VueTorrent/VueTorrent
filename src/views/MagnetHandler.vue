<template>
  <h1 class="text-center mt-5">MagnetHandler</h1>
</template>

<script>
import { General } from '@/mixins'
export default {
  name: 'MagnetHandler',
  mixins: [General],
  methods: {
    decodeMagnet(url) {
      if (url.startsWith('magnet:?')) {
        return url
      } else {
        return this.decodeMagnet(decodeURIComponent(url))
      }
    }
  },
  created() {
    const regex = new RegExp('^\/download\=(.+?)(?:\/(?=$))?$', 'is')
    let magnetLink = this.decodeMagnet(regex.exec(this.$route.fullPath)[1])
    this.createModal('AddModal', { initialMagnet: magnetLink })
    this.$router.push({ name: 'dashboard' })
  }
}
</script>
