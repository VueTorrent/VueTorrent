<template>
  <v-dialog v-model="dialog" content-class="rounded-form" max-width="300px" @keydown.enter.prevent="create">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>{{ $t('modals.newTag.createNewTag') }}</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field v-model="tagname" :rules="rules" :label="$t('modals.newTag.tagName')" autofocus required />
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn class="accent white--text elevation-0 px-4" @click="create" :disabled="!isValid">
          {{ $t('create') }}
        </v-btn>
        <v-btn class="error white--text elevation-0 px-4" @click="cancel">
          {{ $t('cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapGetters} from 'vuex'
import qbit from '@/services/qbit'
import {Modal} from '@/mixins'

export default defineComponent({
  name: 'CreateTagDialog',
  mixins: [Modal],
  data() {
    return {
      tagname: '',
      tags: [] as string[],
      rules: [(v: string) => !!v || 'Tag is required', (v: string) => this.tags.indexOf(v) === -1 || 'Tag already exists']
    }
  },
  computed: {
    ...mapGetters(['getAvailableTags']),
    isValid() {
      return !!this.tagname && this.tags.indexOf(this.tagname) === -1
    }
  },
  async mounted() {
    await this.$store.commit('FETCH_TAGS')
    Object.assign(this.tags, this.getAvailableTags())
  },
  methods: {
    async create() {
      if (!this.isValid) return
      await qbit.createTag([this.tagname])
      this.cancel()
    },
    cancel() {
      this.$store.commit('FETCH_TAGS')
      this.dialog = false
    }
  }
})
</script>
