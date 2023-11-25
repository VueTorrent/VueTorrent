<script setup lang="ts">
import { Torrent } from '@/types/vuetorrent'
import { computed } from 'vue'

const props = defineProps<{ torrent: Torrent; title: string; value: string; color: string }>()

const values = computed(() => {
  const val = props.torrent[props.value]
  const type = typeof val

  if (type === 'string') return val.length > 0 ? [val] : []
  else if (type === 'object' /* array */) return val
})
</script>

<template>
  <td>
    <div class="d-flex flex-row gap">
      <v-chip v-if="!values || values.length < 1" :color="color.replace('$1', torrent[value])" variant="flat">
        {{ $t(`torrent.properties.empty_${value}`) }}
      </v-chip>
      <v-chip v-else v-for="val in values" :color="color.replace('$1', torrent.state)" variant="flat">
        {{ val }}
      </v-chip>
    </div>
  </td>
<!--  <div class="d-flex flex-column">-->
<!--    <div class="text-caption text-grey">-->
<!--      {{ $t(`torrent.properties.${title}`) }}-->
<!--    </div>-->
<!--    <div class="d-flex flex-row gap">-->
<!--      <v-chip v-if="!values || values.length < 1" :color="color.replace('$1', torrent[value])" variant="flat">-->
<!--        {{ $t(`torrent.properties.empty_${value}`) }}-->
<!--      </v-chip>-->
<!--      <v-chip v-else v-for="val in values" :color="color.replace('$1', torrent.state)" variant="flat">-->
<!--        {{ val }}-->
<!--      </v-chip>-->
<!--    </div>-->
<!--  </div>-->
</template>

<style scoped>
.gap {
  gap: 8px;
}
</style>
