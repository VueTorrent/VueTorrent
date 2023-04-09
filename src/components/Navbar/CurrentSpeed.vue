<script setup lang="ts">
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'

// props
const props = defineProps<{
  status: boolean
}>()
</script>

<template>
  <div v-if="status">
    <div class="text-uppercase white--text caption ml-4 font-weight-medium">
      {{ $t('navbar.currentSpeed') }}
    </div>
    <VRow dense class="mx-1 pt-1">
      <VCol>
        <SpeedCard :icon="mdiChevronDown" color="download" value="231" />
      </VCol>
      <VCol>
        <SpeedCard :icon="mdiChevronUp" color="upload" value="23" />
      </VCol>
    </VRow>
  </div>
</template>
