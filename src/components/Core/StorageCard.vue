<template>
  <v-card flat color="secondary" class="mr-2 ml-2">
    <v-row class="px-3">
      <v-col cols="6" class="d-flex align-center">
        <div :class="color + '--text'" data-testid="StorageCard-label">
          {{ label }}
        </div>
      </v-col>
      <v-col cols="6" class="d-flex align-center">
        <span data-testid="StorageCard-Wrapper" :class="color + '--text title'">
          <span data-testid="StorageCard-value">{{ value | formatDataValue(shouldUseBinaryData()) }} </span>
          <span data-testid="StorageCard-unit" class="caption">{{ value | formatDataUnit(shouldUseBinaryData()) }}</span>
        </span>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'StorageCard',
  props: ['color', 'label', 'value'],
  computed: {
    ...mapGetters(['shouldUseBinaryData'])
  }
})
</script>
