<template>
<v-flex xs12 sm1 md1 class="mr-4">
<div class="caption grey--text">Done</div>
<v-progress-linear
    v-model="torrent.progress"
    height="20"
    :style="phoneLayout ? '' : 'width: 80%;'"
    :color="`torrent-${state}-color`" >
                    <span
                        class="caption"
                    >
                        {{ torrent.progress }}%
                    </span>
</v-progress-linear>
</v-flex>
</template>

<script>
export default {
    name: 'Size',
    computed:{
        phoneLayout() {
            return this.$vuetify.breakpoint.xsOnly
        }
    }
}
</script>