<script setup lang="ts">
import AddTorrentDialog from '@/components/Dialogs/AddTorrentDialog.vue'
import { useDialogStore } from '@/stores/dialog'
import { useNavbarStore } from '@/stores/navbar'
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onBeforeMount(async () => {
  const magnetLink = decodeURIComponent(route.params.url as string)
  if (magnetLink.startsWith('magnet:')) {
    const navbarStore = useNavbarStore()
    navbarStore.isAddTorrentDialogFirstInit = false
    navbarStore.pushTorrentToQueue(magnetLink)
    useDialogStore().createDialog(AddTorrentDialog, {})
  }
  await router.push({ name: 'dashboard' })
})
</script>