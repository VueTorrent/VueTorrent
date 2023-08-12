<script setup lang="ts">
import { useAppStore, useAuthStore, useVueTorrentStore } from '@/stores'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const {t} = useI18n()
const appStore = useAppStore()
const authStore = useAuthStore()
const vueTorrentStore = useVueTorrentStore()

const dialogVisible = ref(false)

const close = () => {
  dialogVisible.value = false
}
const shutdown = async () => {
  if (await appStore.shutdownQbit()) {
    authStore.setAuthStatus(false)
    await vueTorrentStore.redirectToLogin()
    toast.success(t('dialogs.shutdown.success'))
  } else {
    toast.error(t('dialogs.shutdown.error'))
  }

  close()
}

watch(() => dialogVisible.value, (value) => emit('update:modelValue', value))
</script>

<template>
  <v-dialog v-model="dialogVisible" width="auto" activator="parent">
    <v-card :title="$t('dialogs.shutdown.title')" :text="$t('dialogs.shutdown.content')">
      <v-card-actions class="justify-end">
        <v-spacer />
        <v-btn class="accent white--text elevation-0 px-4" variant="elevated" color="error" @click="shutdown">
          {{ $t('common.yes') }}
        </v-btn>
        <v-btn class="error white--text elevation-0 px-4" @click="close">
          {{ $t('common.no') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>