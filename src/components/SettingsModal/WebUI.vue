<template>
    <v-container>
        <v-card flat>
            <v-card-text class="pa-0" style="font-size: 1.1em;">
                <div class="box">
                    <v-subheader>Use Alternative WebUI</v-subheader>
                    <v-checkbox dense :label="`Use Alternative WebUI`" />
                    <v-text-field dense solo :label="`Files location`" />
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'WebUI',
    props: { },
    computed: {
        ...mapGetters(['getTorrent']),
        torrent() {
            return this.getTorrent(this.hash)
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid black;
}

</style>
