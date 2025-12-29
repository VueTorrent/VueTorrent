<script setup lang="ts">
import CategoryFormDialog from '@/components/Dialogs/CategoryFormDialog.vue'
import TagFormDialog from '@/components/Dialogs/TagFormDialog.vue'
import { useI18nUtils } from '@/composables'
import { useCategoryStore, useDialogStore, useMaindataStore, useTagStore } from '@/stores'
import { Category } from '@/types/qbit/models'

const { t } = useI18nUtils()
const categoryStore = useCategoryStore()
const dialogStore = useDialogStore()
const maindataStore = useMaindataStore()
const tagStore = useTagStore()

function deleteTag(tagName: string) {
  dialogStore.confirmAction({
    title: t('dialogs.confirm.deleteTag'),
    text: tagName,
    yesColor: 'error',
    onConfirm: async () => {
      await tagStore.deleteTags([tagName])
      maindataStore.forceMaindataSync()
    },
  })
}

function deleteUnusedTags() {
  dialogStore.confirmListAction({
    title: t('dialogs.confirm.deleteUnusedTags'),
    items: tagStore.unusedTags,
    yesColor: 'error',
    onConfirm: async () => {
      await tagStore.deleteUnusedTags()
    },
  })
}

function deleteCategory(category: Category) {
  dialogStore.confirmAction({
    title: t('dialogs.confirm.deleteCategory'),
    text: category.name,
    yesColor: 'error',
    onConfirm: async () => {
      await categoryStore.deleteCategories([category.name])
      maindataStore.forceMaindataSync()
    },
  })
}

function deleteUnusedCategories() {
  dialogStore.confirmListAction({
    title: t('dialogs.confirm.deleteUnusedCategories'),
    items: categoryStore.unusedCategories,
    yesColor: 'error',
    onConfirm: async () => {
      await categoryStore.deleteUnusedCategories()
    },
  })
}

function openTagFormDialog(initialTag?: string) {
  dialogStore.createDialog(TagFormDialog, { initialTag }, maindataStore.forceMaindataSync)
}

function openCategoryFormDialog(initialCategory?: Category) {
  dialogStore.createDialog(CategoryFormDialog, { initialCategory }, maindataStore.forceMaindataSync)
}
</script>

<template>
  <v-row>
    <!-- Tags -->
    <v-col cols="12" sm="6">
      <v-list-subheader class="ml-2">
        {{ t('settings.tagsAndCategories.tagsSubheader') }}
      </v-list-subheader>

      <v-sheet v-for="tag in tagStore.tags" :key="tag" rounded="xl" class="d-flex align-center gap">
        <div class="pl-4 py-1 wrap-anywhere">{{ tag }} ({{ tagStore.torrentsByTag[tag] ?? 0 }})</div>
        <v-spacer />
        <div class="d-flex">
          <v-btn icon="mdi-pencil" variant="plain" @click="openTagFormDialog(tag)" />
          <v-btn icon="mdi-delete" color="red" variant="plain" @click="deleteTag(tag)" />
        </div>
      </v-sheet>

      <v-card v-if="tagStore.tags.length === 0">
        <v-card-text>{{ t('settings.tagsAndCategories.noTags') }}</v-card-text>
      </v-card>

      <div class="d-flex ga-2">
        <v-btn class="flex-grow-1" color="accent" prepend-icon="mdi-plus" @click="openTagFormDialog()">
          {{ t('settings.tagsAndCategories.createNewTag') }}
        </v-btn>
        <v-btn class="flex-grow-1" color="error" prepend-icon="mdi-delete" :disabled="tagStore.unusedTags.length === 0" @click="deleteUnusedTags()">
          {{ t('settings.tagsAndCategories.deleteUnusedTags') }}
        </v-btn>
      </div>
    </v-col>

    <!-- Categories -->
    <v-col cols="12" sm="6">
      <v-list-subheader class="ml-2">
        {{ t('settings.tagsAndCategories.categoriesSubheader') }}
      </v-list-subheader>

      <v-sheet v-for="category in categoryStore.categories" :key="category.name" rounded="xl" class="d-flex align-center gap">
        <div class="pl-4 py-1 wrap-anywhere">{{ category.name }} ({{ categoryStore.torrentsByCategory[category.name] ?? 0 }})</div>
        <v-spacer />
        <div class="d-flex">
          <v-btn icon="mdi-pencil" variant="plain" @click="openCategoryFormDialog(category)" />
          <v-btn icon="mdi-delete" color="red" variant="plain" @click="deleteCategory(category)" />
        </div>
      </v-sheet>

      <v-card v-if="categoryStore.categories.length === 0">
        <v-card-text>{{ t('settings.tagsAndCategories.noCategories') }}</v-card-text>
      </v-card>

      <div class="d-flex ga-2">
        <v-btn class="flex-grow-1" color="accent" prepend-icon="mdi-plus" @click="openCategoryFormDialog()">
          {{ t('settings.tagsAndCategories.createNewCategory') }}
        </v-btn>
        <v-btn class="flex-grow-1" color="error" prepend-icon="mdi-delete" :disabled="categoryStore.unusedCategories.length === 0" @click="deleteUnusedCategories()">
          {{ t('settings.tagsAndCategories.deleteUnusedCategories') }}
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.gap {
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: unset;
  }
}
</style>
