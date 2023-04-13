<script setup lang="ts">
import { mdiExitToApp } from '@mdi/js'
</script>

<template>
  <VRow noGutters>
    <VCol>
      <VTooltip>
        <template #activator="{ props }">
          <div class="d-flex justify-center fill-height">
            <VIcon v-bind="props" :icon="mdiExitToApp" />
          </div>
        </template>
      </VTooltip>
    </VCol>
  </VRow>
</template>
