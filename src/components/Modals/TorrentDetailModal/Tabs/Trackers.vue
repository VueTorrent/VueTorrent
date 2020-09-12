<template>
    <perfect-scrollbar>
        <v-data-table
            v-if="trackers"
            :headers="headers"
            :items="trackers"
            :hide-default-footer="true"
            style="max-height: 500px; min-height: 400px"
        >
            <template v-slot:item="row">
                <tr>
                    <td>{{ row.item.tier }}</td>
                    <td>{{ row.item.url }}</td>
                    <td>{{ row.item.status | formatTrackerStatus }}</td>
                    <td>{{ row.item.num_peers | formatTrackerNum }}</td>
                    <td>{{ row.item.num_seeds | formatTrackerNum }}</td>
                    <td>{{ row.item.num_leeches | formatTrackerNum }}</td>
                    <td>{{ row.item.num_downloaded | formatTrackerNum }}</td>
                    <td>{{ row.item.msg }}</td>
                </tr>
            </template>
        </v-data-table>
    </perfect-scrollbar>
</template>

<script>
import qbit from '@/services/qbit'
export default {
    name: 'Trackers',
    props: { hash: String, isActive: Boolean },
    data: () => ({
        headers: [
            { text: '#', value: 'tier' },
            { text: 'URL', value: 'url' },
            { text: 'Status', value: 'status' },
            { text: 'Peers', value: 'num_peers' },
            { text: 'Seeds', value: 'num_seeds' },
            { text: 'Leeches', value: 'num_leeches' },
            { text: 'Downloaded', value: 'num_downloaded' },
            { text: 'Message', value: 'msg' }
        ],
        tempTrackers: []
    }),
    methods: {
        async getTorrentTrackers() {
            const { data } = await qbit.getTorrentTrackers(this.hash)
            this.tempTrackers = data
        }
    },
    watch: {
        isActive(active) {
            if (active) {
                this.getTorrentTrackers()
            }
        }
    },
    filters: {
        formatTrackerStatus(status) {
            const map = [
                'Disabled',
                'Not contacted',
                'Working',
                'Updating',
                'Not working'
            ]

            return map[status]
        },
        formatTrackerNum(num) {
            if (num === -1) {
                return 'N/A'
            }

            return num.toString()
        }
    },
    computed: {
        trackers() {
            return this.tempTrackers
        }
    }
}
</script>

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
