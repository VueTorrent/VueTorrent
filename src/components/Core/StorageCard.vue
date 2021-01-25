<template>
  <v-card flat color="secondary" class="mr-2 ml-2">
    <v-layout row wrap class="pa-3 mx-auto">
      <v-flex md6>
        <div
          style="margin-top: 6px"
          :class="color + '--text'"
          data-testid="StorageCard-label"
        >
          {{ label }}
        </div>
      </v-flex>
      <v-flex md5 class="ml-4">
        <span data-testid="StorageCard-Wrapper" :class="color + '--text title'">
          <span data-testid="StorageCard-value"> {{ value | getDataValue(2) }} </span>
          <span data-testid="StorageCard-unit" class="font-weight-light caption">
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