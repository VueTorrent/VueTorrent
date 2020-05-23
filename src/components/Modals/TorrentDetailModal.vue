<template>
  <v-dialog max-width="800px" v-model="dialog" scrollable>
    <v-card
      v-if="torrent"
      style="min-height: 400px; overflow:hidden !important"
    >
      <v-container :class="`pa-0 project ${torrent.state}`">
        <v-card-title class="justify-center primary">
          <h2 class="white--text">Torrent Detail</h2>
        </v-card-title>
        <v-tabs v-model="tab" background-color="primary" fixed-tabs>
          <v-tab v-for="item in items" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text style="font-size: 1.2em">
                <v-flex>
                  <span class="grey--text">Torrent title </span>
                  <span class="torrentmodaltext--text  ">{{
                    torrent.name
                  }}</span>
                </v-flex>
                <v-flex class="mt-2">
                  <span class="grey--text">hash </span>
                  <span class="torrentmodaltext--text  ">{{
                    torrent.hash
                  }}</span>
                </v-flex>
                <v-flex class="mt-2">
                  <span class="grey--text">Size </span>
                  <span class="torrentmodaltext--text  ">
                    {{ torrent.size }}
                  </span>
                </v-flex>
                <v-flex class="mt-2">
                  <span class="grey--text">Done: </span>
                  <span class="torrentmodaltext--text  ">
                    {{ torrent.dloaded }}
                  </span>
                </v-flex>
                <v-flex class="mt-2">
                  <span class="grey--text">Download </span>
                  <span class="torrentmodaltext--text  ">{{
                    torrent.dlspeed
                  }}</span>
                </v-flex>
                <v-flex class="mt-2">
                  <span class="grey--text">Upload </span>
                  <span class="torrentmodaltext--text  ">{{
                    torrent.upspeed
                  }}</span>
                </v-flex>
                <v-flex class="mt-2">
                  <span class="grey--text">ETA </span>
                  <span class="torrentmodaltext--text  ">{{
                    torrent.eta
                  }}</span>
                </v-flex>
                <v-flex class="mt-2">
                  <span class="grey--text">Peers </span>
                  <span class="torrentmodaltext--text  ">
                    {{ torrent.num_leechs
                    }}<span class="grey--text"
                      >/{{ torrent.available_peers }}</span
                    >
                  </span>
                </v-flex>
                <v-flex class="mt-2">
                  <span class=" grey--text">Seeds </span>
                  <span class="torrentmodaltext--text  ">
                    {{ torrent.num_seeds
                    }}<span class="grey--text"
                      >/{{ torrent.available_seeds }}</span
                    >
                  </span>
                </v-flex>
                <v-flex class="mt-2">
                  <span class=" grey--text">Ratio </span>
                  <span class="torrentmodaltext--text  ">
                    {{ torrent.ratio }}%
                  </span>
                </v-flex>
                <v-flex>
                  <span class="grey--text">Status </span>
                  <v-chip
                    small
                    :class="`${torrent.state} white--text my-2 caption`"
                    >{{ torrent.state }}</v-chip
                  >
                </v-flex>
                <v-flex>
                  <v-progress-linear
                    height="5"
                    stream
                    rounded
                    color="cyan darken-1"
                    background-color="cyan lighten-3"
                    :buffer-value="torrent.progress"
                  ></v-progress-linear>
                </v-flex>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
          
            <v-card flat class="scrollbar" style="overflow-y: auto !important;">
                <perfect-scrollbar>
              <v-card-text style="max-height: 500px; min-height: 400px;">
                <v-treeview
                  v-model="tree"
                  :items="fileTree"
                  activatable
                  item-key="name"
                  open-on-click
                >
                  <template v-slot:prepend="{ item, open }">
                    <v-icon v-if="!item.icon">
                      {{ open ? "mdi-folder-open" : "mdi-folder" }}
                    </v-icon>
                    <v-icon v-else>
                      {{ item.icon }}
                    </v-icon>
                  </template>
                  <template v-slot:append="{ item }">
                    <span v-if="!item.icon">
                      {{ item.children.length }} Files
                    </span>
                    <div v-else>
                      <span>[{{ item.size }}]</span>
                      <span class="ml-4">{{ item.progress }}%</span>
                    </div>
                  </template>
                </v-treeview>
              </v-card-text>
              </perfect-scrollbar>
            </v-card>
            
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import Modal from "@/mixins/Modal";
import { mapGetters } from "vuex";
import qbit from "@/services/qbit";
import { treeify } from "@/helpers";

export default {
  name: "TorrentDetailModal",
  mixins: [Modal],
  data() {
    return {
      tab: null,
      items: [{ tab: "Info" }, { tab: "Content" }],
      tempFileTree: [],
      fileTree: [],
      tree: [],
    };
  },
  methods: {
    async getTorrentProperties() {
      const { data } = await qbit.getTorrentFiles(this.hash);
      // console.log(data)
      return data;
    },
    async getTorrentFiles() {
      const { data } = await qbit.getTorrentFiles(this.hash);
      this.fileTree = treeify(data);
    },
  },
  computed: {
    ...mapGetters(["getTorrent"]),
    hash() {
      return this.$store.state.selectedDetailTorrent;
    },
    torrent() {
      return this.getTorrent(this.hash);
    },
    torrentFiles() {
      let arr = this.getTorrentFiles();
      console.log(arr);
      return arr.map(this.addnode);
    },
  },
  watch: {
    dialog(visible) {
      if (visible) {
        this.getTorrentProperties();
        this.getTorrentFiles();
      } else {
        this.fileTree = [];
      }
    },
  },
};
</script>
