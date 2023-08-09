<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="pa-3">
    <v-row no-gutters class="grey--text" align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ t('dashboard.title') }}
        </h1>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

</style>