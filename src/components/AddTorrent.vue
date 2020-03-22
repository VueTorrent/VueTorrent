<template>
  <v-dialog max-width="400px" v-model="dialog">
    <v-btn flat small fab slot="activator" color="grey" class="mr-0 ml-0">
      <v-icon color="grey">add</v-icon>
    </v-btn>
    <v-card>
      <v-container :class="`pa-0 project done`">
        <v-card-title class="justify-center">
          <h2>Add a new Torrent</h2>
        </v-card-title>
        <div class="mr-5 ml-5">
          <file-pond
            name="file"
            ref="pond"
            label-idle="Drop file here..."
            accepted-file-types="application/x-bittorrent"
            data-max-file-size="1MB"
            server="/upload"
            v-model="Files"
          />
        </div>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <!-- <v-text-field
            v-model="filename"
            label="File"
            prepend-icon="attach_file"
            :rules="inputRules"
            ></v-text-field>-->
            <v-text-field v-model="directory" label="Download Directory" prepend-icon="folder"></v-text-field>
            <v-spacer></v-spacer>
            <v-card-actions class="justify-center">
              <v-btn
                :loading="loading"
                flat
                @click="submit"
                class="blue_accent white--text mx-0 mt-3"
              >Add Torrent</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>


<script>
// Import Vue FilePond
import vueFilePond from 'vue-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
)

export default {
  data() {
    return {
      filename: '',
      directory: '',
      inputRules: [
        (v) => v.indexOf('magnet') > -1
          || v.indexOf('http') > -1
          || this.validFile
          || 'Not a valid magnet link',
      ],
      loading: false,
      dialog: false,
      Files: [],
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true

        this.$store.dispatch('ADD_TORRENT', {
          name: this.filename,
          dir: this.directory,
        })

        // reset input
        this.$refs.form.reset()
        this.filename = ''
        this.directory = ''

        this.$refs.pond.removeFiles()
        this.dialog = false
        this.loading = false
      }
    },
  },
  computed: {
    validFile() {
      return this.Files.length > 0
    },
  },
  components: {
    vueFilePond,
  },
}
</script>
