<template>
  <TopActions v-if="!$vuetify.breakpoint.xsOnly" />
  <v-speed-dial v-else v-model="fab" transition="slide-y-transition" direction="bottom" style="position: absolute; top: 0.3em; right: 1em">
    <template #activator>
      <v-btn v-model="fab" color="grey" text small fab>
        <v-icon>
          {{ fab ? mdiClose : mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </template>
    <TopActions :mobile="true" />
  </v-speed-dial>
</template>

<script>
import TopActions from './TopActions.vue'
import { mdiDotsVertical, mdiClose } from '@mdi/js'

export default {
  name: 'TopMenu',
  components: { TopActions },
  data() {
    return {
      fab: false,
      mdiDotsVertical,
      mdiClose
    }
  }
}
</script>
