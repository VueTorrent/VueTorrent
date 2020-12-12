<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-container style="min-height: 200px" :class="`pa-0 project done`">
        <v-card-title class="justify-center">
          <h2>Delete Tag</h2>
        </v-card-title>

        <v-list
          v-if="availableTags && availableTags.length"
          rounded
          class="text-center mx-auto"
          style="max-width: 200px"
        >
          <v-list-item
            v-for="(t, i) in availableTags"
            :key="i"
            @click="deleteTag(t)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="t" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-subtitle
          v-else
          class="text-center mx-auto"
          style="font-size: 1.5em; margin-top: 20px"
        >
          No tags found
        </v-card-subtitle>
      </v-container>
      <v-card-actions class="justify-center pb-5 project done">
        <v-btn
          text
          class="error white--text mt-3"
          @click="cancel"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import qbit from '@/services/qbit'
import { Modal } from '@/mixins'
import { mapGetters } from 'vuex'
export default {
  name: 'DeleteTagDialog',
  mixins: [Modal],
  computed: {
    ...mapGetters(['getTorrent', 'getAvailableTags']),
    availableTags() {
      return this.getAvailableTags()
    }
  },
  methods: {
    deleteTag(tag) {
      qbit.deleteTag(tag)
      this.cancel()
    },
    cancel() {
      this.deleteModal()
    }
  }
}
</script>

<style></style>
