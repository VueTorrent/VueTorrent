<script setup lang="ts">
import { useMaindataStore, usePreferenceStore } from '@/stores'

const maindataStore = useMaindataStore()
const preferenceStore = usePreferenceStore()
</script>

<template>
  <v-menu :close-on-content-click="true"
          max-height="500"
          transition="slide-y-transition"
          z-index="999">
    <v-list>
      <v-list-item>
        <div class="d-flex justify-space-around">
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn density="compact" variant="plain" icon="mdi-play" v-bind="props"/>
            </template>
            <span>Resume</span>
          </v-tooltip>

          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn density="compact" variant="plain" icon="mdi-fast-forward" v-bind="props"/>
            </template>
            <span>Force Resume</span>
          </v-tooltip>

          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn density="compact" variant="plain" icon="mdi-pause" v-bind="props"/>
            </template>
            <span>Pause</span>
          </v-tooltip>

          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn color="red" density="compact" variant="plain" icon="mdi-delete-forever" v-bind="props"/>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </div>
      </v-list-item>

      <v-list-item class="px-1">
        <div class="d-flex">
          <v-icon class="mr-2">mdi-head-cog</v-icon>
          <span>Advanced</span>
          <v-spacer />
          <v-icon>mdi-chevron-right</v-icon>
        </div>
        <v-menu activator="parent"
                :open-on-hover="true"
                close-delay="0"
                open-delay="0"
                location="right">
          <v-list>
            <v-list-item>Change Location</v-list-item>
            <v-list-item>Rename Torrent</v-list-item>
            <v-list-item>Force Recheck</v-list-item>
            <v-list-item>Force Reannounce</v-list-item>
            <v-list-item>Sequential Download</v-list-item>
            <v-list-item>First / Last Priority</v-list-item>
            <v-list-item>Auto TMM</v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>

      <v-list-item class="px-1" v-if="preferenceStore.preferences!.queueing_enabled">
        <div class="d-flex">
          <v-icon class="mr-2">mdi-head-cog</v-icon>
          <span>Set Priority</span>
          <v-spacer />
          <v-icon>mdi-chevron-right</v-icon>
        </div>
        <v-menu activator="parent"
                :open-on-hover="true"
                close-delay="0"
                open-delay="0"
                location="right">
          <v-list>
            <v-list-item>Top Prio</v-list-item>
            <v-list-item>Increase Prio</v-list-item>
            <v-list-item>Decrease Prio</v-list-item>
            <v-list-item>Bottom Prio</v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>

      <v-list-item class="px-1" v-if="maindataStore.tags.length > 0">
        <div class="d-flex">
          <v-icon class="mr-2">mdi-tag</v-icon>
          <span>Set tags</span>
          <v-spacer />
          <v-icon>mdi-chevron-right</v-icon>
        </div>
        <v-menu activator="parent"
                :open-on-hover="true"
                close-delay="0"
                open-delay="0"
                location="right">
          <v-list>
            <v-list-item v-for="tag in maindataStore.tags">
              {{ tag }}
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>
      <v-list-item v-else>
        No tags
      </v-list-item>

      <v-list-item class="px-1" v-if="maindataStore.categories.length > 0">
        <div class="d-flex">
          <v-icon class="mr-2">mdi-label</v-icon>
          <span>Set category</span>
          <v-spacer />
          <v-icon>mdi-chevron-right</v-icon>
        </div>
        <v-menu activator="parent"
                :open-on-hover="true"
                close-delay="0"
                open-delay="0"
                location="right">
          <v-list>
            <v-list-item v-for="category in maindataStore.categories">
              {{ category.name }}
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>
      <v-list-item v-else>
        No Category
      </v-list-item>

      <v-list-item class="px-1">
        <div class="d-flex">
          <v-icon class="mr-2">mdi-speedometer-slow</v-icon>
          <span>Set speed limit</span>
          <v-spacer />
          <v-icon>mdi-chevron-right</v-icon>
        </div>
        <v-menu activator="parent"
                :open-on-hover="true"
                close-delay="0"
                open-delay="0"
                location="right">
          <v-list>
            <v-list-item>Set download limit</v-list-item>
            <v-list-item>Set upload limit</v-list-item>
            <v-list-item>Set share limit</v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>

      <v-list-item class="px-1">
        <div class="d-flex">
          <v-icon class="mr-2">mdi-content-copy</v-icon>
          <span>Copy</span>
          <v-spacer />
          <v-icon>mdi-chevron-right</v-icon>
        </div>
        <v-menu activator="parent"
                :open-on-hover="true"
                close-delay="0"
                open-delay="0"
                location="right">
          <v-list>
            <v-list-item>Name</v-list-item>
            <v-list-item>Hash</v-list-item>
            <v-list-item>Magnet</v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>

      <v-divider />

      <v-list-item>Export torrent(s)</v-list-item>
      <v-list-item>Show Info</v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped lang="scss">
.menu-scrollable {
  max-height: 500px;
  overflow: visible;
}
</style>