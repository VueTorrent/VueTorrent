<template>
    <div v-if="status">
        <div class="secondary_lighter--text text-uppercase caption ml-4">
            current speed
        </div>
        <v-card color="secondary" flat class="mr-2 ml-2">
            <v-layout row wrap class="pa-3 project nav_download mx-auto">
                <v-icon color="download">keyboard_arrow_down</v-icon>
                <span class="download--text title">
                    {{ status.dlspeed | getDataValue }}
                    <span class="font-weight-light caption">
                        {{ status.dlspeed | getDataUnit }}/s
                    </span>
                </span>
                <v-icon class="pl-5" color="upload">keyboard_arrow_up</v-icon>
                <span class="upload--text title">
                    {{ status.upspeed | getDataValue }}
                    <span class="font-weight-light caption">
                        {{ status.upspeed | getDataUnit }}/s
                    </span>
                </span>
            </v-layout>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'CurrentSpeed',
    props: ['status']
}
</script>

<style scoped></style>
