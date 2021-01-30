<template>
  <h1 class="text-center mt-5">
    MagnetHandler
  </h1>
</template>
<script>
import { General } from '@/mixins'
export default {
  name: 'MagnetHandler',
  mixins: [General],
  props: ['magnet'],
  created() {
    this.createModal('AddModal', { initialMagnet: this.magnet })
    this.$router.push('/')
  }
}
</script>