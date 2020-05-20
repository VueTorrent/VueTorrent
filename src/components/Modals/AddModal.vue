<template>
  <v-dialog
    max-width="400px"
    v-model="dialog"
    v-observe-visibility="visibilityChanged"
  >
    <v-card>
      <v-container :class="`pa-0 project done`">
        <v-card-title class="justify-center">
          <h2>Add a new Torrent</h2>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row no-gutters>
                <v-col ref="fileZone">
                  <v-file-input
                    v-show="files.length"
                    v-model="files"
                    ref="file"
                    multiple
                    chips
                    outlined
                    label="files"
                  />
                  <v-textarea
                    v-show="!files.length"
                    label="URL"
                    placeholder="dag 'n drop or paste a url"
                    prepend-icon="mdi-link"
                    append-outer-icon="mdi-attachment"
                    :rules="[(v) => !!files.length || !!v]"
                    :rows="$vuetify.breakpoint.xsOnly ? 1 : 3"
                    required
                    :autofocus="!phoneLayout"
                    :value="params.urls"
                    @input="setParams('urls', $event)"
                  />
                </v-col>
              </v-row>

              <v-text-field
                v-model="directory"
                label="Download Directory"
                prepend-icon="folder"
              ></v-text-field>
            </v-container>
          </v-form>
        </v-card-text>

        <v-spacer></v-spacer>
        <v-form>
          <v-card-actions class="justify-center">
            <v-btn
              :loading="loading"
              text
              @click="submit"
              class="blue_accent white--text mx-0 mt-3"
              >Add Torrent</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import Modal from "@/mixins/Modal";
export default {
  name: "AddModal",
  mixins: [Modal],
  data() {
    return {
      files: [],
      directory: "",
      inputRules: [
        (v) =>
          v.indexOf("magnet") > -1 ||
          v.indexOf("http") > -1 ||
          this.validFile ||
          "Not a valid magnet link",
      ],
      loading: false,
      params: {},
      file: null,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        this.$store.dispatch("ADD_TORRENT", {
          name: this.filename,
          dir: this.directory,
        });

        // reset input
        this.$refs.form.reset();
        this.filename = "";
        this.directory = "";

        this.$refs.pond.removeFiles();
        this.dialog = false;
        this.loading = false;
      }
    },

    selectFiles() {
      const input = this.$refs.file.$el.querySelector("input[type=file]");
      input.click();
    },

    onDrop(e) {
      const transfer = e.dataTransfer;
      const { files } = transfer;
      if (!files.length) {
        return;
      }

      e.preventDefault();
      this.files = files;
    },
    visibilityChanged(isVisible) {
      if (this.$refs.fileZone)
        isVisible
          ? this.$refs.fileZone.addEventListener("drop", this.onDrop, true)
          : this.$refs.fileZone.removeEventListener("drop", this.onDrop, true);
    },
  },
  computed: {
    validFile() {
      return this.Files.length > 0;
    },
    phoneLayout() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
};
</script>
