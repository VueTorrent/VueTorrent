<template>
  <v-card flat color="secondary" class="mr-2 ml-2">
    <v-layout row wrap class="pa-3 mx-auto">
      <v-flex md6>
        <div style="margin-top: 6px" :class="color + '--text'" data-testid="StringCard-label">
          {{ label }}
        </div>
      </v-flex>
      <v-flex md6>
        <span data-testid="StringCard-Wrapper" :class="color + '--text title'">
          <span data-testid="StringCard-value"> {{ value }} </span>
        </span>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'StringCard',
  props: ['color', 'label', 'value']
}
</script>
