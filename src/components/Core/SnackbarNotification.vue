<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSnackbarStore } from '@/stores'

const snackbarStore = useSnackbarStore()
const { visible, message, actionText, color } = storeToRefs(snackbarStore)
</script>

<template>
  <v-snackbar v-model="visible" :color="color" :timeout="-1" location="bottom right" variant="flat" @update:model-value="!$event && snackbarStore.hide()">
    <div class="d-flex align-center ga-4">
      <span class="text-body-1">{{ message }}</span>
      <v-btn v-if="actionText" color="white" variant="text" @click.stop="snackbarStore.runAction()">
        {{ actionText }}
      </v-btn>
    </div>
  </v-snackbar>
</template>
