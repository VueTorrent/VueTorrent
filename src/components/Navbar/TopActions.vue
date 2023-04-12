<script setup lang="ts">
import { useDisplay } from 'vuetify'
import {
  mdiCheckboxBlankOutline,
  mdiCheckboxMarked,
  mdiCog,
  mdiDelete,
  mdiPause,
  mdiPlay,
  mdiPlus,
  mdiPower,
  mdiRss,
  mdiSearchWeb,
  mdiSort
} from '@mdi/js'
import { useAxios } from '@vueuse/integrations/useAxios'

// composables
const { mobile } = useDisplay()

// methods
const torrentAction = async (action: string, hashes: string[]) => {}
const pauseTorrents = async (hashes: string[]) => {}
const resumeTorrents = async (hashes: string[]) => {}
</script>

<template>
  <VDialog> </VDialog>
</template>
