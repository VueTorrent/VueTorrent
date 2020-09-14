<template>
    <div style="margin-top: 30px">
        <div class="secondary_lighter--text text-uppercase caption ml-4">
            Status
        </div>
        <v-select
            v-model="select"
            color="secondary"
            flat
            class="ml-2 mr-2"
            :items="options"
            label="State"
            item-text="name"
            item-value="value"
            dense
            solo
            @input="setFilter"
        ></v-select>
    </div>
</template>

<script>
export default {
    name: 'FilterSelect',
    data: () => ({
        options: [
            { value: 'all', name: 'All' },
            { value: 'downloading', name: 'Downloading' },
            { value: 'seeding', name: 'Seeding' },
            { value: 'completed', name: 'Completed' },
            { value: 'resumed', name: 'Resumed' },
            { value: 'paused', name: 'Paused' },
            { value: 'active', name: 'Active' },
            { value: 'inactive', name: 'Inactive' },
            { value: 'stalled', name: 'Stalled' },
            { value: 'stalled_uploading', name: 'Stalled Uploading' },
            { value: 'stalled_downloading', name: 'Stalled Downloading' },
            { value: 'errored', name: 'Erorred' }
        ],
        select: { value: 'all', name: 'All' }
    }),
    methods: {
        setFilter(value) {
            this.$store.commit('UPDATE_SORT_OPTIONS', { filter: value })
        }
    }
}
</script>

<style scoped>

</style>
