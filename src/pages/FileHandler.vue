<script setup lang="ts">
import AddTorrentDialog from '@/components/Dialogs/AddTorrentDialog.vue'
import { useAddTorrentStore, useDialogStore } from '@/stores'
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const addTorrentStore = useAddTorrentStore()
const dialogStore = useDialogStore()

onBeforeMount(async () => {
  if ("launchQueue" in window) {
    window.launchQueue.setConsumer((launchParams) => {
      if (launchParams.files && launchParams.files.length) {
        addTorrentStore.isFirstInit = false
        launchParams.files.forEach(addTorrentStore.pushTorrentToQueue);
        dialogStore.createDialog(AddTorrentDialog)
      }
    });
  }
  await router.push({ name: 'dashboard' })
})
</script>
