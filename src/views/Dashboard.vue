<template>
  <div class="dashboard" @click.self="resetSelected">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-4" @click.self="resetSelected">
      <!-- justify-center here in layout to center!! -->
      <v-flex xs12 sm6 md3 @click.self="resetSelected">
        <v-text-field
          flat
          label="type to sort..."
          height="50"
          clearable
          solo
          hint="eg `size desc` + enter"
          background-color="grey lighten-3"
          v-model="sort_input"
          @keyup.enter.native="sortBy"
        ></v-text-field>
      </v-flex>

      <div v-if="torrents.length >= 1">
        <v-card
          ripple
          flat
          v-for="torrent in torrents"
          :key="torrent.name"
          class="pointer"
          :class=" containsTorrent(torrent.hash) ? 'grey lighten-3' : ''"
          @click.native="selectTorrent(torrent.hash)"
        >
          <v-layout row wrap :class="`pa-3 project ${torrent.state}`">
            <v-flex xs12 sm2 md3>
              <div class="caption grey--text">Torrent title</div>
              <div>{{ torrent.name }}</div>
            </v-flex>
            <v-flex xs6 sm1 md1 class="mr-2">
              <div class="caption grey--text">Size</div>
              <div>
                {{ torrent.size.substring(0, torrent.size.indexOf(' '))}}
                <span
                  class="caption grey--text"
                >{{ torrent.size.substring(torrent.size.indexOf(' ')) }}</span>
              </div>
            </v-flex>
            <v-flex xs5 sm1 md1 class="mr-2">
              <div class="caption grey--text">Done</div>
              <div>
                {{ torrent.dloaded.substring(0, torrent.dloaded.indexOf(' ')) }}
                <span
                  class="caption grey--text"
                >{{ torrent.dloaded.substring(torrent.dloaded.indexOf(' ')) }}</span>
              </div>
            </v-flex>
            <v-flex xs6 sm1 md1 class="mr-2">
              <div class="caption grey--text">Download</div>
              <div>
                {{ torrent.dlspeed.substring(0, torrent.dlspeed.indexOf(' ')) }}
                <span
                  class="caption grey--text"
                >{{ torrent.dlspeed.substring(torrent.dlspeed.indexOf(' ')) }}</span>
              </div>
            </v-flex>
            <v-flex xs5 sm1 md1 class="mr-2">
              <div class="caption grey--text">Upload</div>
              <div>
                {{ torrent.upspeed.substring(0, torrent.upspeed.indexOf(' ')) }}
                <span
                  class="caption grey--text"
                >{{ torrent.upspeed.substring(torrent.upspeed.indexOf(' ')) }}</span>
              </div>
            </v-flex>
            <v-flex xs6 sm1 md1 class="mr-2">
              <div class="caption grey--text">ETA</div>
              <div>{{ torrent.eta }}</div>
            </v-flex>
            <v-flex xs5 sm1 md1 class="mr-2">
              <div class="caption grey--text">Peers</div>
              <div>
                {{ torrent.num_leechs }}
                <span
                  class="grey--text caption"
                >/{{torrent.available_peers}}</span>
              </div>
            </v-flex>
            <v-flex xs5 sm1 md1 class="mr-2">
              <div class="caption grey--text">Seeds</div>
              <div>
                {{ torrent.num_seeds }}
                <span class="grey--text caption">/{{torrent.available_seeds}}</span>
              </div>
            </v-flex>
            <v-flex xs4 sm12 md1>
              <div class="right">
                <v-chip
                  small
                  :class="`${torrent.state} white--text my-2 caption`"
                >{{ torrent.state }}</v-chip>
              </div>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-progress-linear
                height="3"
                color="cyan darken-1"
                background-color="cyan lighten-3"
                :value="(torrent.dloaded/torrent.size)*100"
              ></v-progress-linear>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-card>
      </div>
      <v-container v-else fill-height>
        <div style="margin: 150px auto;">
          <v-progress-circular :size="100" indeterminate color="green_accent"></v-progress-circular>
        </div>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      sort_input: ""
    };
  },
  computed: {
    ...mapState(["torrents"])
  },
  methods: {
    ...mapMutations(["SORT_TORRENTS"]),
    sortBy() {
      let name, reverse;
      //search if order was presented
      const index = this.sort_input.indexOf(" ");
      if (index > -1) {
        name = this.sort_input.substring(0, index);
        let temp = this.sort_input.substring(index);
        if (temp.indexOf("asc") > -1) {
          reverse = false;
        } else if (temp.indexOf("desc") > -1) {
          reverse = true;
        }
      } else {
        //no order so we assume input is propname
        name = this.sort_input;
        reverse = false;
      }
      //prop names
      switch (name) {
        case "title":
        case "name":
        case "Name":
        case "Title":
          name = "name";
          break;
        case "size":
        case "Size":
          name = "size";
          break;
        case "dlspeed":
        case "Dlspeed":
        case "Download":
        case "download":
        case "downloadspeed":
          name = "dlspeed";
          break;
        case "upspeed":
        case "upload":
        case "Upload":
        case "Upspeed":
        case "uploadspeed":
          name = "upspeed";
          break;
        case "leechs":
        case "leechers":
        case "leech":
        case "peers":
        case "Leechs":
        case "Leechers":
        case "Leech":
        case "Peers":
          name = "num_leechs";
          break;
        case "seeds":
        case "seeders":
        case "Seeds":
        case "Seeders":
          name = "num_seeds";
          break;
        case "remaining":
        case "time":
        case "Time":
        case "ETA":
        case "eta":
          name = "eta";
          break;
        case "done":
        case "downloaded":
        case "dloaded":
        case "Done":
        case "Downloaded":
        case "Dloaded":
          name = "downloaded";
          break;
        case "state":
        case "status":
        case "State":
        case "Status":
          name = "state";
          break;
        default:
          name = "name";
          break;
      }

      this.$store.state.sort_options = { name, reverse };
    },
    selectTorrent(hash) {
      if (this.containsTorrent(hash)) {
        this.$store.dispatch("REMOVE_SELECTED", hash);
      } else {
        this.$store.dispatch("ADD_SELECTED", hash);
      }
    },
    containsTorrent(hash) {
      return this.$store.getters["CONTAINS_TORRENT"](hash);
    },
    resetSelected() {
      this.$store.dispatch("RESET_SELECTED");
    }
  },
  created: function() {
    this.$store.dispatch("REFRESH_TORRENTS");
  }
};
</script>

<style>
.project.done {
  border-left: 4px solid #3cd1c2;
}
.project.busy {
  border-left: 4px solid #ffaa2c;
}
.project.fail {
  border-left: 4px solid #f83e70;
}
.project.paused {
  border-left: 4px solid #cfd8dc;
}
.v-chip.done {
  background: #3cd1c2;
}
.v-chip.busy {
  background: #ffaa2c;
}
.v-chip.fail {
  background: #f83e70;
}
.v-chip.paused {
  background: #cfd8dc;
}

.pointer {
  cursor: pointer;
}
</style>
