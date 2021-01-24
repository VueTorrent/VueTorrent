<template>
  <v-card flat color="secondary" class="mr-2 ml-2">
    <v-layout row wrap class="pa-3 mx-auto">
      <v-flex md6>
        <div
          style="margin-top: 6px"
          :class="color + '--text'"
        >
          {{ label }}
        </div>
      </v-flex>
      <v-flex md5 class="ml-4">
        <span :class="color + '--text title'">
          {{ value | getDataValue(2) }}
          <span class="font-weight-light caption">
            {{ value | getDataUnit }}
          </span>
        </span>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'StorageCard',
  props: ['color', 'label', 'value']
}
</script>