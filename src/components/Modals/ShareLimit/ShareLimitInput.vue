<template>
  <div style="min-width: 300px">
    <h3>{{ title }}</h3>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-switch v-model="global" class="v-input--reverse pa-0 ma-0" hide-details inset :label="$t('modals.shareLimit.input.globalLimit')" @change="disableUnlimited" />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-switch v-model="unlimited" class="v-input--reverse pa-0 ma-0" hide-details inset :label="$t('modals.shareLimit.input.unlimited')" @change="disabledGlobal" />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item class="mx-2">
      <v-text-field v-model="limit" type="number" autofocus clearable dense :label="`${title} Limit`" :prepend-inner-icon="title === 'Ratio' ? mdiPercent : mdiClockTimeEight" />
    </v-list-item>
  </div>
</template>

<script>
import { mdiPercent, mdiClose, mdiClockTimeEight } from '@mdi/js'
export default {
  name: 'ShareLimitInput',
  props: ['title', 'initialLimit'],
  data() {
    return {
      mdiPercent,
      mdiClose,
      mdiClockTimeEight,
      global: false,
      unlimited: false,
      limit: ''
    }
  },
  created() {
    if (this.initialLimit === -2) {
      this.global = true

      return
    }
    if (this.initialLimit === -1) {
      this.unlimited = true

      return
    }
    this.limit = this.initialLimit
  },
  methods: {
    disableUnlimited() {
      this.unlimited = false
    },
    disabledGlobal() {
      this.global = false
    },
    export() {
      if (this.global) return -2
      if (this.unlimited) return -1

      return this.limit
    }
  }
}
</script>
