<template>
    <perfect-scrollbar>
        <v-data-table
            v-if="peers"
            :headers="headers"
            :items="peers"
            :items-per-page="-1"
            :hide-default-footer="true"
            style="max-height: 500px; min-height: 400px"
        >
            <template v-slot:item="row">
                <tr>
                    <td class="ip">
                        <template v-if="row.item.country_code">
                            <img
                                v-if="isWindows"
                                class="country-flag"
                                :title="row.item.country"
                                :alt="codeToFlag(row.item.country_code).char"
                                :src="codeToFlag(row.item.country_code).url"
                            />
                            <template v-else>{{
                                codeToFlag(row.item.country_code).char
                            }}</template>
                        </template>
                        {{ row.item.ip }}
                        <span class="grey--text">:{{ row.item.port }}</span>
                    </td>
                    <td>{{ row.item.connection }}</td>
                    <td :title="row.item.flags_desc">{{ row.item.flags }}</td>
                    <td>{{ row.item.client }}</td>
                    <td>{{ row.item.progress | progress }}</td>
                    <td>{{ row.item.dl_speed | networkSpeed }}</td>
                    <td>{{ row.item.downloaded | networkSize }}</td>
                    <td>{{ row.item.up_speed | networkSpeed }}</td>
                    <td>{{ row.item.uploaded | networkSize }}</td>
                    <td>{{ row.item.relevance | progress }}</td>
                    <td>{{ row.item.files }}</td>
                </tr>
            </template>
        </v-data-table>
    </perfect-scrollbar>
</template>

<script>
import { map, merge } from 'lodash'
import qbit from '@/services/qbit'
import { codeToFlag, isWindows } from '@/helpers'

export default {
    name: 'Peers',
    props: { hash: String, isActive: Boolean },
    data: () => ({
        headers: [
            { text: 'IP', value: 'ip' },
            { text: 'Connection', value: 'connection' },
            { text: 'Flags', value: 'flags' },
            { text: 'Client', value: 'client' },
            { text: 'Progress', value: 'progress' },
            { text: 'DL Speed', value: 'dl_speed' },
            { text: 'Downloaded', value: 'downloaded' },
            { text: 'UP Speed', value: 'up_speed' },
            { text: 'Uploaded', value: 'uploaded' },
            { text: 'Relevance', value: 'relevance' },
            { text: 'Files', value: 'files' }
        ],
        peersObj: null
    }),
    methods: {
        codeToFlag(val) {
            return codeToFlag(val)
        },
        isWindows() {
            return isWindows()
        },
        async getTorrentPeers() {
            const { data } = await qbit.getTorrentPeers(
                this.hash,
                this.rid + 1 || undefined
            )

            this.rid = data.rid

            this.peersObj = data.peers
        }
    },
    watch: {
        isActive(active) {
            if (active) {
                this.getTorrentPeers()
            }
        }
    },
    computed: {
        rid: {
            get() {
                return this.$store.state.rid
            },
            set(val) {
                this.$store.state.rid = val
            }
        },
        peers() {
            return map(this.peersObj, (value, key) => merge({}, value, { key }))
        }
    },
    created() {
        this.getTorrentPeers()
    }
}
</script>

<style scoped>
::v-deep .ip {
    display: flex;
    align-items: center;
}

::v-deep .ip .country-flag {
    width: 1.5em;
    margin-right: 0.5em;
}
</style>
<style lang="scss" scoped>
@import '~@/assets/styles.scss';

::v-deep .v-data-table thead th,
::v-deep .v-data-table tbody td {
    padding: 0 2px !important;
    height: auto;

    white-space: nowrap;

    &:first-child {
        padding: 0 0 0 8px !important;
    }
    &:last-child {
        padding-right: 8px !important;
    }
}
</style>
