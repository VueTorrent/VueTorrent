<template>
  <TopActions v-if="!$vuetify.breakpoint.xsOnly" :show-all="showAll" />
  <v-speed-dial
    v-else
    v-model="fab"
    transition="slide-y-transition"
    direction="bottom"
    style="position: absolute; top: 0.3em; right: 1em"
  >
    <template #activator>
      <v-btn
        v-model="fab"
        color="grey"
        text
        small
        fab
      >
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </template>
    <TopActions :show-all="showAll" :mobile="true" />
  </v-speed-dial>
</template>

<script>
import TopActions from './TopActions'

export default {
  name: 'TopMenu',
  components: { TopActions },
  props: ['showAll'],
  data() {
    return {
      fab: false
    }
  }
}
</script>

