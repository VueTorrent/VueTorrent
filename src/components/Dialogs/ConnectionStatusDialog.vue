<script setup lang="ts">
import { useDialog } from '@/composables/Dialog.ts'
import { ConnectionStatus } from '@/constants/qbit'
import { useLogStore, useMaindataStore } from '@/stores'
import { computed } from 'vue'

const props = defineProps<{
  guid: string
}>()

const { isOpened } = useDialog(props.guid)
const logStore = useLogStore()
const maindataStore = useMaindataStore()

const connectionStatusColor = computed(() => {
  switch (maindataStore.serverState?.connection_status) {
    case ConnectionStatus.CONNECTED:
      return 'text-success'
    case ConnectionStatus.DISCONNECTED:
      return 'text-error'
    case ConnectionStatus.FIREWALLED:
      return 'text-warning'
    default:
      return 'text-grey'
  }
})

const close = () => {
  isOpened.value = false
}
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-text>
        <v-list>
          <v-list-item :title="$t('dialogs.connectionStatus.status')">
            <span :class="['ml-2', connectionStatusColor]">
              {{ $t('constants.connectionStatus.' + maindataStore.serverState?.connection_status) }}
            </span>
          </v-list-item>
          <v-list-item :title="$t('dialogs.connectionStatus.externalIp')">
            <span class="ml-2" v-if="logStore.externalIp">{{ logStore.externalIp }}</span>
            <span class="ml-2 text-error" v-else>No IP detected</span>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="close">{{ $t('common.close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
