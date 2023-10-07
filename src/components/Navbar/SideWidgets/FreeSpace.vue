<script setup lang="ts">
import DataCard from '@/components/Core/DataCard.vue'
import { useMaindataStore } from '@/stores'

const maindataStore = useMaindataStore()
</script>

<template>
  <DataCard title="Free Space" :value="maindataStore.serverState?.free_space_on_disk ?? 0" color="upload" />
</template>

<style scoped></style>
