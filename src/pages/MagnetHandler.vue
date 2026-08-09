<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAddTorrentStore, useDialogStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const addTorrentStore = useAddTorrentStore()
const dialogStore = useDialogStore()

onBeforeMount(async () => {
  const magnetLink = decodeURIComponent(route.params.url as string)
  if (magnetLink.startsWith('magnet:')) {
    addTorrentStore.pushTorrentToQueue(magnetLink)
    dialogStore.createDialog(defineAsyncComponent(() => import('@/components/Dialogs/AddTorrentDialog.vue')))
  }
  await router.push({ name: 'dashboard' })
})
</script>
