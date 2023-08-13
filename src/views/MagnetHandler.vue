<template>
  <h1 class="text-center mt-5">MagnetHandler</h1>
</template>

<script>
import { General } from '@/mixins'
export default {
  name: 'MagnetHandler',
  mixins: [General],
  created() {
    const regex = new RegExp('^\/download\=(.+?)(?:\/(?=$))?$', 'is')
    this.createModal('AddModal', { initialMagnet: regex.exec(this.$route.fullPath)[1] })
    this.$router.push({ name: 'dashboard' })
  }
}
</script>
