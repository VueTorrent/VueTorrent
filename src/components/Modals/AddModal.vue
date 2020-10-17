<template>
    <v-dialog max-width="500px" v-model="dialog">
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
                                        v-if="!url"
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
                                        <template
                                            v-slot:selection="{ index, text }"
                                        >
                                            <v-chip
                                                v-if="index < 2"
                                                color="deep-purple accent-4"
                                                dark
                                                label
                                                small
                                                >{{ text }}</v-chip
                                            >

                                            <span
                                                v-else-if="index === 2"
                                                class="overline grey--text text--darken-3 mx-2"
                                                >+{{
                                                    files.length - 2
                                                }}
                                                File(s)</span
                                            >
                                        </template>
                                    </v-file-input>
                                    <v-text-field
                                        v-if="files.length == 0"
                                        label="URL"
                                        prepend-icon="mdi-link"
                                        :rows="
                                            $vuetify.breakpoint.xsOnly ? 1 : 3
                                        "
                                        required
                                        :autofocus="!phoneLayout"
                                        v-model="url"
                                    />
                                </v-col>
                            </v-row>

                            <v-combobox
                                v-model="category"
                                :items="availableCategories"
                                clearable
                                label="Category"
                                prepend-icon="tag"
                                @input="categoryChanged"
                            ></v-combobox>

                            <v-text-field
                                :disabled="autoTMM"
                                v-model="directory"
                                label="Download Directory"
                                prepend-icon="folder"
                            ></v-text-field>
                            <v-row no-gutters>
                                <v-flex xs12 sm6>
                                    <v-checkbox
                                        v-model="autoTMM"
                                        label="Automatic Torrent Management"
                                    ></v-checkbox>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-checkbox
                                        v-model="skip_checking"
                                        label="Skip hash check"
                                    ></v-checkbox>
                                </v-flex>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>

                <v-spacer></v-spacer>
                <v-form>
                    <v-card-actions class="justify-center">
                        <v-btn
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
import { mapGetters } from 'vuex'
import Modal from '@/mixins/Modal'
import qbit from '@/services/qbit'
export default {
    name: 'AddModal',
    mixins: [Modal],
    data() {
        return {
            files: [],
            category: null,
            directory: '',
            autoTMM: true,
            skip_checking: false,
            inputRules: [
                v =>
                    v.indexOf('magnet') > -1 ||
                    v.indexOf('http') > -1 ||
                    this.validFile ||
                    'Not a valid magnet link'
            ],
            loading: false,
            url: null,
            valid: false
        }
    },
    methods: {
        submit() {
            if (this.files.length || this.url) {
                let torrents = []
                let params = { urls: null, autoTMM: this.autoTMM }
                if (this.files.length) torrents.push(...this.files)
                if (this.url) params.urls = this.url
                if (this.category) params.category = this.category
                if (!this.autoTMM) params.savepath = this.directory
                if (this.skip_checking) params.skip_checking = this.skip_checking

                qbit.addTorrents(params, torrents)

                this.resetForm()

                this.$store.commit('DELETE_MODAL', this.guid)
            }
        },
        categoryChanged() {
            if (this.autoTMM) this.directory = this.savepath
        },
        resetForm() {
            this.url = null
            this.files = []
            this.category = null
            this.directory = null
            this.skip_checking = null
        }
    },
    computed: {
        ...mapGetters(['getSettings', 'getCategories']),
        validFile() {
            return this.Files.length > 0
        },
        phoneLayout() {
            return this.$vuetify.breakpoint.xsOnly
        },
        savepath() {
            let savePath = this.getSettings().save_path
            if (this.category) {
                savePath += this.category
                let category = this.getCategories()[this.category]
                if (category && category.savePath) savePath = category.savePath
            }
            return savePath
        },
        availableCategories() {
            return Object.keys(this.getCategories())
        }
    },
    created() {
        this.$store.commit('FETCH_SETTINGS')
        this.$store.commit('FETCH_CATEGORIES')
        this.directory = this.savepath
    }
}
</script>
