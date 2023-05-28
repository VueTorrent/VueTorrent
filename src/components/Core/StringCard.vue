<template>
  <v-card flat color="secondary" class="mr-2 ml-2">
    <v-row class="px-3">
      <v-col cols="6" class="d-flex align-center">
        <div :class="color + '--text'" data-testid="StringCard-label">
          {{ label }}
        </div>
      </v-col>
      <v-col cols="6" class="d-flex align-center">
        <span data-testid="StringCard-Wrapper" :class="color + '--text title'">
          <span data-testid="StringCard-value">{{ value }}</span>
        </span>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
export default {
  name: 'StringCard',
  props: ['color', 'label', 'value']
}
</script>
