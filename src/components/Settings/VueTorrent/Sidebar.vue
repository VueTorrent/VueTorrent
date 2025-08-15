<script setup lang="ts">
import draggable from 'vuedraggable'
import SidebarItem from './SidebarItem.vue'
import { useSidebarStore } from '@/stores/sidebar'

const sidebarStore = useSidebarStore()

function selectNoWidgets() {
  sidebarStore.setAllWidgets(false)
}

function selectAllWidgets() {
  sidebarStore.setAllWidgets(true)
}

function selectNoFilters() {
  sidebarStore.setAllFilters(false)
}

function selectAllFilters() {
  sidebarStore.setAllFilters(true)
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-list-item>
        <v-checkbox v-model="sidebarStore.isDrawerRight" :label="$t('settings.vuetorrent.sidebar.isDrawerRight')" />
      </v-list-item>
    </v-col>

    <v-col cols="12" md="6">
      <v-list>
        <v-list-subheader>{{ $t('settings.vuetorrent.sidebar.tip') }}</v-list-subheader>

        <v-list-item>
          <v-row>
            <v-col cols="6" class="d-flex justify-center">
              <v-btn :text="$t('common.selectAll')" color="primary" @click="selectAllWidgets" />
            </v-col>
            <v-col cols="6" class="d-flex justify-center">
              <v-btn :text="$t('common.selectNone')" color="primary" @click="selectNoWidgets" />
            </v-col>
          </v-row>
        </v-list-item>

        <v-table>
          <draggable v-model="sidebarStore.sidebarWidgets" item-key="name" tag="tbody" handle=".dnd-handle">
            <template #item="{ element }">
              <SidebarItem :property="element" @update="sidebarStore.toggleWidget(element.name)" />
            </template>
          </draggable>
        </v-table>
      </v-list>
    </v-col>
    <v-col cols="12" md="6">
      <v-list>
        <v-list-subheader>{{ $t('settings.vuetorrent.sidebar.showFilters.title') }}</v-list-subheader>

        <v-list-item>
          <v-row>
            <v-col cols="6" class="d-flex justify-center">
              <v-btn :text="$t('common.selectAll')" color="primary" @click="selectAllFilters" />
            </v-col>
            <v-col cols="6" class="d-flex justify-center">
              <v-btn :text="$t('common.selectNone')" color="primary" @click="selectNoFilters" />
            </v-col>
          </v-row>
        </v-list-item>

        <v-table>
          <draggable v-model="sidebarStore.filters" item-key="name" tag="tbody" handle=".dnd-handle">
            <template #item="{ element }">
              <tr>
                <td>
                  <v-icon icon="mdi-drag-vertical" class="dnd-handle" />
                </td>
                <td>
                  <v-checkbox v-model="element.active" hide-details :label="$t(`settings.vuetorrent.sidebar.showFilters.${element.name}`)" />
                </td>
              </tr>
            </template>
          </draggable>
        </v-table>

      </v-list>
    </v-col>
  </v-row>
</template>
