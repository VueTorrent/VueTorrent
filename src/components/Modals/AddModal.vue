<template>
  <v-dialog
    max-width="500px"
    v-model="dialog"
  >
    <v-card>
      <v-container :class="`pa-0 project done`">
        <v-card-title class="justify-center">
          <h2>Add a new Torrent</h2>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-container>
               
              <v-row no-gutters>
                <v-col ref="fileZone">
                  <v-file-input
                    v-model="files"
                    color="deep-purple accent-4"
                    counter
                    label="File input"
                    multiple
                    placeholder="Select your files"
                    prepend-icon="mdi-paperclip"
                    outlined
                    :show-size="1000"
                  >
                    <template v-slot:selection="{ index, text }">
                      <v-chip
                        v-if="index < 2"
                        color="deep-purple accent-4"
                        dark
                        label
                        small
                      >
                        {{ text }}
                      </v-chip>

                      <span
                        v-else-if="index === 2"
                        class="overline grey--text text--darken-3 mx-2"
                      >
                        +{{ files.length - 2 }} File(s)
                      </span>
                    </template>
                  </v-file-input>
                  <v-text-field       
                   label="URL"                
                    prepend-icon="mdi-link"
                    :rows="$vuetify.breakpoint.xsOnly ? 1 : 3"
                    required
                    :autofocus="!phoneLayout"
                    v-model="url"
                  />
                </v-col>
              </v-row>

              <v-text-field
                v-model="directory"
                :placeholder="savepath"
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
              :disabled="!valid"
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
import {  mapGetters  } from 'vuex'
import Modal from "@/mixins/Modal";
import qbit from '@/services/qbit'
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
      url: null,
      valid: false
    };
  },
  methods: {
    submit() {
      if(this.files.length || this.url){
        let torrents = []
        let params=  { urls: null};
        if(this.files.length) torrents.push(...this.files)
        if(this.url) params.urls = this.url
        if(this.directory) params.savepath = this.directory
        
        qbit.addTorrents(params, torrents)

        this.url = null

        this.$store.commit('TOGGLE_MODAL', 'addmodal')
      }
    },
  },
  computed: {
    ...mapGetters(['getSettings']),
    validFile() {
      return this.Files.length > 0;
    },
    phoneLayout() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    savepath(){
      return this.getSettings().savePath
    }
  },
};
</script>
