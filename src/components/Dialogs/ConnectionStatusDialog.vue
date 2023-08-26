<script setup lang="ts">
import { useLogStore, useMaindataStore } from '@/stores'
import { ref, watch } from 'vue'

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const logStore = useLogStore()
const maindataStore = useMaindataStore()

const dialogVisible = ref(false)

const close = () => {
  dialogVisible.value = false
}

watch(() => dialogVisible.value, (value) => emit('update:modelValue', value))
</script>

<template>
  <v-dialog v-model="dialogVisible" activator="parent">
    <v-card>
      <v-card-title>{{ $t('dialogs.connectionStatus.title') }}</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item>
            Connection Status: {{ $t('constants.connectionStatus.' + maindataStore.serverState?.connection_status) }}
          </v-list-item>
          <v-list-item>
            External IP Address: {{ logStore.externalIp }}
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

<style scoped>

</style>