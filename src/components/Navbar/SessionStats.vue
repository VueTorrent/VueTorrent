<template>
  <div v-if="status" class="mt-3">
    <label class="text-uppercase white--text caption font-weight-medium ml-4">
      Session Stats
    </label>
    <v-card flat color="secondary" class="mr-2 ml-2 mb-4">
      <v-layout row wrap class="pa-3 mt-1 project mx-auto">
        <v-flex md6>
          <div
            style="margin-top: 6px"
            class="download--text"
          >
            Downloaded
          </div>
        </v-flex>
        <v-flex md5 class="ml-4">
          <span class="download--text title">
            {{ status.downloaded | getDataValue }}
            <span class="font-weight-light caption">
              {{ status.downloaded | getDataUnit }}
            </span>
          </span>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card flat color="secondary" class="ml-2 mr-2">
      <v-layout row wrap class="pa-3 mt-1 project mx-auto">
        <v-flex md6>
          <div
            style="margin-top: 6px"
            class="upload--text"
          >
            Uploaded
          </div>
        </v-flex>
        <v-flex md5 class="ml-4">
          <span class="upload--text title">
            {{ status.uploaded | getDataValue(1) }}
            <span class="font-weight-light caption">
              {{ status.uploaded | getDataUnit(1) }}
            </span>
          </span>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'SessionStats',
  props: ['status']
}
</script>

