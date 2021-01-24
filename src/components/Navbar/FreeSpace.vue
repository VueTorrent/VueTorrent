<template>
  <v-card flat color="secondary" class="mr-2 ml-2 mt-8 mb-4">
    <v-layout row wrap class="pa-3 py-6 project mx-auto">
      <v-flex md6>
        <div
          style="margin-top: 6px"
          class="upload--text"
        >
          Free Space
        </div>
      </v-flex>
      <v-flex v-if="space" md5 class="ml-4">
        <span class="upload--text title">
          {{ space | getDataValue }}
          <span class="font-weight-light caption">
            {{ space | getDataUnit }}
          </span>
        </span>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'FreeSpace',
  props: ['space']
}
</script>
