<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { mdiExitToApp } from '@mdi/js'

const authStore = useAuthStore()
</script>

<template>
  <VRow noGutters>
    <VCol>
      <VTooltip>
        <template #activator="{ props }">
          <VBtn :icon="mdiExitToApp" flat block v-bind="props" @click="authStore.logout()" />
        </template>
        <span>{{ $t('logout') }}</span>
      </VTooltip>
    </VCol>
  </VRow>
</template>
