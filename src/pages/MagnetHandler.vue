<script setup lang="ts">
import { useNavbarStore } from '@/stores'
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onBeforeMount(async () => {
  const magnetLink = decodeURIComponent(route.params.url as string)
  if (magnetLink.startsWith('magnet:')) {
    useNavbarStore().pushTorrentToQueue(magnetLink)
  }
  await router.push({ name: 'dashboard' })
})
</script>