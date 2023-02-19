<template>
  <v-dialog v-model="dialog" scrollable max-width="750px" :content-class="phoneLayout ? 'rounded-0' : 'rounded-form'" :fullscreen="false">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>{{ $t('modals.shutdown.title') }}</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <span>{{ $t('modals.shutdown.content') }}</span>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-spacer />
        <v-btn class="accent white--text elevation-0 px-4" @click="shutdownApplication">
          {{ $t('yes') }}
        </v-btn>
        <v-btn class="error white--text elevation-0 px-4" @click="close">
          {{ $t('no') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Modal from "../../mixins/Modal";
import {FullScreenModal} from "@/mixins";
import qbit from "@/services/qbit";

export default defineComponent({
  name: 'ConfirmShutdownModal',
  mixins: [Modal, FullScreenModal],
  methods: {
    close() {
      this.dialog = false
    },
    async shutdownApplication() {
      if (!await qbit.shutdownApp()) {
        this.$toast.error(this.$t('toast.shutdownError').toString())
      }
      else {
        this.$store.state.authenticated = false
        await this.$router.push({name: 'login'})
        this.$toast.success(this.$t("toast.shutdownSuccess").toString())
      }

      this.close()
    }
  }
})
</script>
