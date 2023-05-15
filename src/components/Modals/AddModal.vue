<script setup lang="ts">
import { useModal } from '@/composables/modal';
import { ref } from 'vue';
import { useDisplay } from 'vuetify'

// TODO : implement the component based on the one already present on the legacy

const props = defineProps<{
  guid: string
}>()

const { dialog } = useModal(props.guid)
const display = useDisplay()

const dTransition = ref('scale-transition')

</script>

<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      :transition="dTransition"
      :content-class="display.xs ? 'rounded-0' : 'rounded-form'"
      max-width="500px"
      :fullscreen="display.xs.value"
      persistent
    >
      <v-card>
        <v-card-text>
          AddModal.vue
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.wrap-drag {
  pointer-events: none;
}

.wrap-drag .align {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  color: #fff;
  padding: 0;
}

.flex-gap {
  column-gap: 8px;
}
</style>