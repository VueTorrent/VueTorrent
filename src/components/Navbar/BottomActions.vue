<script setup lang="ts">
import { mdiExitToApp } from '@mdi/js'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <VRow noGutters>
    <VCol>
      <VTooltip>
        <template #activator="{ props }">
          <div class="d-flex justify-center fill-height">
            <VIcon v-bind="props" :icon="mdiExitToApp"  @click="authStore.logout()" />
          </div>
        </template>
        <span>{{ $t('logout') }}</span>
      </VTooltip>
    </VCol>
  </VRow>
</template>
