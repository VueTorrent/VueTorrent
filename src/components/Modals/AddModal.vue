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
                                    <div
                                        @drop.prevent="addDropFile"
                                        @dragover.prevent
                                    >
                                        <v-file-input
                                            v-if="!urls"
                                            v-model="files"
                                            color="deep-purple accent-4"
                                            counter
                                            label="File input"
                                            multiple
                                            placeholder="Select your files"
                                            prepend-icon="mdi-paperclip"
                                            :rules="fileInputRules"
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
                                    </div>
                                    <v-textarea
                                        v-if="files.length == 0"
                                        label="URL"
                                        prepend-icon="mdi-link"
                                        rows="1"
                                        required
                                        :autofocus="!phoneLayout"
                                        v-model="urls"
                                        auto-grow
                                        clearable
                                        hint="One link per line"
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
                                        v-model="start"
                                        label="Start torrent"
                                    ></v-checkbox>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-checkbox
                                        v-model="skip_checking"
                                        label="Skip hash check"
                                    ></v-checkbox>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-checkbox
                                        v-model="root_folder"
                                        label="Create subfolder"
                                    ></v-checkbox>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-checkbox
                                        v-model="autoTMM"
                                        label="Automatic Torrent Management"
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
    props: ['initialMagnet'],
    mixins: [Modal],
    data() {
        return {
            files: [],
            category: null,
            directory: '',
            start: true,
            skip_checking: false,
            root_folder: true,
            autoTMM: true,
            fileInputRules: [
                v => {
                    const result = v.every(f => {
                        if (f.type) return f.type === 'application/x-bittorrent'
                        else return /^.*\.torrent$/.test(f.name)
                    })
                    return result ? result : 'One or more files is not a valid torrent'
                }
            ],
            loading: false,
            urls: null,
            valid: false
        }
    },
    methods: {
        addDropFile(e) {
            this.files.push(...Array.from(e.dataTransfer.files))
        },
        submit() {
            if (this.files.length || this.urls) {
                const torrents = []
                const params = {
                    urls: null,
                    paused: !this.start,
                    skip_checking: this.skip_checking,
                    root_folder: this.root_folder,
                    autoTMM: this.autoTMM
                }
                if (this.files.length) torrents.push(...this.files)
                if (this.urls) params.urls = this.urls
                if (this.category) params.category = this.category
                if (!this.autoTMM) params.savepath = this.directory

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
            this.directory = this.savepath
            this.skip_checking = null
        }
    },
    computed: {
        ...mapGetters(['getSettings', 'getCategories']),
        settings() {
            return this.getSettings()
        },
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
                const category = this.getCategories()[this.category]
                if (category && category.savePath) savePath = category.savePath
            }
            return savePath
        },
        availableCategories() {
            return Object.keys(this.getCategories())
        }
    },
    watch: {
        settings(newvalue) {
            this.directory = newvalue.save_path
        }
    },
    created() {
        this.$store.commit('FETCH_SETTINGS')
        this.$store.commit('FETCH_CATEGORIES')
        this.urls = this.initialMagnet
    }
}
</script>
