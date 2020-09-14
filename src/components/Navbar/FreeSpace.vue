<template>
    <v-card flat style="margin-top: 30px" color="secondary" class="ml-2 mr-2">
        <v-layout row wrap class="pa-3 project nav_upload mx-auto">
            <v-flex md6>
                <div
                    style="font-size: 0.95em; margin-top: 6px"
                    class="upload--text"
                >
                    Free Space
                </div>
            </v-flex>
            <v-flex v-if="space" md5 class="ml-4">
                <span class="upload--text title">
                    {{ space | getDataValue }}
                    <span class="font-weight-light caption">
                        {{ space | getDataUnit }}
                    </span>
                </span>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
export default {
    name: 'FreeSpace',
    props: { space: String }
}
</script>
